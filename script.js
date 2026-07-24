window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1500);
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const overlay  = document.getElementById('navOverlay');

function setMenuOpen(open) {
  toggle.classList.toggle('open', open);
  navLinks.classList.toggle('open', open);
  overlay.classList.toggle('open', open);

  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  overlay.setAttribute('aria-hidden', open ? 'false' : 'true');

  document.body.style.overflow = open ? 'hidden' : '';
}

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('open');
  setMenuOpen(!isOpen);
});

overlay.addEventListener('click', () => setMenuOpen(false));

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    setMenuOpen(false);
    toggle.focus();
  }
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

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}`;

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
