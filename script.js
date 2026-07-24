window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1500);
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

const WHATSAPP_NUMERO = '5579998015026';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/5H5LGBYKBYNPN1?autoload=1&app_absent=0&utm_source=ig';

const form = document.getElementById('contatoForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const tel = form.tel.value.trim();

  if (!nome || !tel) {
    form.reportValidity();
    return;
  }

  const turno = form.turno.options[form.turno.selectedIndex].text;
  const msg = form.msg.value.trim();

  let destino = WHATSAPP_URL;

  if (WHATSAPP_NUMERO) {
    const texto =
      'Olá! Quero agendar uma aula experimental no MetconCross.\n\n' +
      `*Nome:* ${nome}\n` +
      `*WhatsApp:* ${tel}\n` +
      `*Turno:* ${turno}` +
      (msg ? `\n*Mensagem:* ${msg}` : '');
    destino = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  }

  feedback.hidden = false;
  window.open(destino, '_blank', 'noopener');

  setTimeout(() => { form.reset(); feedback.hidden = true; }, 4000);
});

document.getElementById('year').textContent = new Date().getFullYear();
