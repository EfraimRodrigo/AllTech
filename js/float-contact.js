/* ============================================================
   ALLTECH — float-contact.js
   Botões flutuantes: WhatsApp, Instagram, Email (EmailJS)
   ============================================================ */

(function () {

  /* ── Configurações — preencher quando tiver os dados reais ── */
  var CONFIG = {
    whatsapp:  '5511974051804',
    instagram: 'alltech.tecnologia',   /* ← substituir pelo @ real */
    email: {
      serviceId:  'service_xxx',       /* ← EmailJS Service ID    */
      templateId: 'template_xxx',      /* ← EmailJS Template ID   */
      publicKey:  'user_xxx'           /* ← EmailJS Public Key    */
    },
    /* Mensagem padrão do WhatsApp */
    waMessage: window.alltechWaMessage || 'Olá! Gostaria de saber mais sobre as soluções AllTech.'
  };

  /* ── HTML do sistema flutuante ── */
  var HTML = '\
  <div class="float-contact" id="float-contact" aria-label="Canais de contato rápido">\
    <!-- Botões filhos -->\
    <div class="float-items" id="float-items">\
\
      <!-- WhatsApp -->\
      <a href="https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.waMessage) + '"\
         class="float-btn float-btn-wa"\
         target="_blank" rel="noopener noreferrer"\
         aria-label="Falar pelo WhatsApp">\
        <span class="float-btn-label">WhatsApp</span>\
        <span class="float-btn-icon">\
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">\
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>\
          </svg>\
        </span>\
      </a>\
\
      <!-- Instagram -->\
      <a href="https://instagram.com/' + CONFIG.instagram + '"\
         class="float-btn float-btn-ig"\
         target="_blank" rel="noopener noreferrer"\
         aria-label="Seguir no Instagram">\
        <span class="float-btn-label">Instagram</span>\
        <span class="float-btn-icon">\
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">\
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>\
          </svg>\
        </span>\
      </a>\
\
      <!-- Email -->\
      <button class="float-btn float-btn-email"\
              id="float-email-btn"\
              aria-label="Enviar e-mail para AllTech"\
              type="button">\
        <span class="float-btn-label">E-mail</span>\
        <span class="float-btn-icon">\
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22" aria-hidden="true">\
            <rect width="20" height="16" x="2" y="4" rx="2"/>\
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>\
          </svg>\
        </span>\
      </button>\
\
    </div>\
\
    <!-- Botão toggle principal -->\
    <button class="float-toggle" id="float-toggle" aria-label="Abrir canais de contato" aria-expanded="false" type="button">\
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="22" height="22" aria-hidden="true">\
        <line x1="12" y1="5" x2="12" y2="19"/>\
        <line x1="5" y1="12" x2="19" y2="12"/>\
      </svg>\
    </button>\
  </div>\
\
  <!-- Modal de Email -->\
  <div class="email-modal-overlay" id="email-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="email-modal-title">\
    <div class="email-modal">\
      <div class="email-modal-header">\
        <h3 id="email-modal-title">Enviar mensagem</h3>\
        <button class="email-modal-close" id="email-modal-close" aria-label="Fechar" type="button">\
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\
        </button>\
      </div>\
      <form id="email-modal-form">\
        <div class="form-group">\
          <label class="label-white" for="em-nome">Seu nome</label>\
          <input type="text" id="em-nome" name="from_name" class="input-dark" placeholder="João Silva" required autocomplete="name">\
        </div>\
        <div class="form-group">\
          <label class="label-white" for="em-email">Seu e-mail</label>\
          <input type="email" id="em-email" name="reply_to" class="input-dark" placeholder="joao@empresa.com.br" required autocomplete="email">\
        </div>\
        <div class="form-group">\
          <label class="label-white" for="em-msg">Mensagem</label>\
          <textarea id="em-msg" name="message" class="input-dark" placeholder="Como podemos ajudar?" required></textarea>\
        </div>\
        <button type="submit" class="btn btn-primary" style="width:100%;" id="email-modal-submit">Enviar mensagem</button>\
        <div class="email-modal-status" id="email-modal-status" aria-live="polite"></div>\
      </form>\
    </div>\
  </div>';

  /* ── Injetar HTML no body ── */
  function inject() {
    var div = document.createElement('div');
    div.innerHTML = HTML;
    while (div.firstChild) { document.body.appendChild(div.firstChild); }
  }

  /* ── Lógica do toggle ── */
  function initToggle() {
    var container = document.getElementById('float-contact');
    var toggle    = document.getElementById('float-toggle');
    if (!container || !toggle) return;

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = container.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Fecha ao clicar fora */
    document.addEventListener('click', function (e) {
      if (container.classList.contains('open') &&
          !container.contains(e.target)) {
        container.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    /* Fecha ao pressionar Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        container.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        closeModal();
      }
    });
  }

  /* ── Lógica do Modal de Email ── */
  function initEmailModal() {
    var overlay   = document.getElementById('email-modal-overlay');
    var closeBtn  = document.getElementById('email-modal-close');
    var emailBtn  = document.getElementById('float-email-btn');
    var form      = document.getElementById('email-modal-form');
    var submitBtn = document.getElementById('email-modal-submit');
    var status    = document.getElementById('email-modal-status');

    if (!overlay || !emailBtn || !form) return;

    /* Abre o modal */
    emailBtn.addEventListener('click', function () {
      openModal();
      /* Fecha o menu flutuante */
      var container = document.getElementById('float-contact');
      var toggle    = document.getElementById('float-toggle');
      if (container) container.classList.remove('open');
      if (toggle)    toggle.setAttribute('aria-expanded', 'false');
    });

    /* Fecha o modal */
    closeBtn && closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    /* Envio do formulário */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      status.className = 'email-modal-status';

      /* Verificar se EmailJS está configurado */
      var cfg = window.emailjsConfig || CONFIG.email;
      if (!cfg || cfg.serviceId === 'service_xxx') {
        /* Modo demo — simula envio */
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        setTimeout(function () {
          status.textContent = '✓ Mensagem enviada! Retornaremos em breve.';
          status.className = 'email-modal-status success';
          submitBtn.textContent = 'Enviar mensagem';
          submitBtn.disabled = false;
          form.reset();
          setTimeout(closeModal, 2500);
        }, 1200);
        return;
      }

      /* EmailJS real */
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      /* Mapeamento de Conversões: Captura a origem da página e adiciona à mensagem */
      var msgField = form.querySelector('[name="message"]');
      var originalMsg = msgField.value;
      var pageTitle = document.title.split('|')[0].trim();
      msgField.value = originalMsg + '\n\n---\nOrigem do Lead: ' + pageTitle;

      if (typeof emailjs !== 'undefined') {
        emailjs.init(cfg.publicKey);
        emailjs.sendForm(cfg.serviceId, cfg.templateId, form)
          .then(function () {
            status.textContent = '✓ Mensagem enviada! Retornaremos em breve.';
            status.className = 'email-modal-status success';
            form.reset();
            setTimeout(closeModal, 2500);
          })
          .catch(function () {
            status.textContent = '✗ Erro ao enviar. Tente pelo WhatsApp.';
            status.className = 'email-modal-status error';
            msgField.value = originalMsg; /* Restaura a mensagem para não exibir a tag de origem pro usuário */
          })
          .finally(function () {
            submitBtn.textContent = 'Enviar mensagem';
            submitBtn.disabled = false;
          });
      } else {
        status.textContent = '✗ Serviço indisponível. Tente pelo WhatsApp.';
        status.className = 'email-modal-status error';
        msgField.value = originalMsg;
        submitBtn.textContent = 'Enviar mensagem';
        submitBtn.disabled = false;
      }
    });
  }

  function openModal() {
    var overlay = document.getElementById('email-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    /* Foco no primeiro campo */
    setTimeout(function () {
      var first = overlay.querySelector('input, textarea');
      if (first) first.focus();
    }, 100);
  }

  function closeModal() {
    var overlay = document.getElementById('email-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    var status = document.getElementById('email-modal-status');
    if (status) { status.textContent = ''; status.className = 'email-modal-status'; }
  }

  /* ── Init ── */
  function init() {
    inject();
    initToggle();
    initEmailModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
