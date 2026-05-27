/* ============================================================
   ALLTECH — Tawk.to Chat Configuration
   Chat ao vivo para atendimento em tempo real
   ============================================================

   PASSO A PASSO PARA ATIVAR:
   ─────────────────────────────────────────────────────────
   1. Acesse https://www.tawk.to/ e crie uma conta gratuita
   2. Crie uma propriedade para o site alltech.com.br
   3. No painel, vá em Administration → Chat Widget
   4. Copie o código de incorporação — você vai encontrar:
      → Property ID (ex: 64abc123def456789)
      → Widget ID   (ex: 1h2i3j4k5)
   5. Cole os valores nos campos abaixo
   6. Mude enabled para true
   ─────────────────────────────────────────────────────────
   ⚠️  O chat aparece em todas as páginas que carregam este arquivo
   ============================================================ */

window.chatConfig = {

  // ↓ Cole aqui o Property ID do Tawk.to
  tawkId: 'SUBSTITUA_POR_SEU_TAWK_ID',

  // ↓ Cole aqui o Widget ID do Tawk.to
  widgetId: 'SUBSTITUA_POR_SEU_WIDGET_ID',

  // ← Mude para true após preencher os IDs acima
  enabled: false

};

// ── Inicialização automática ─────────────────────────────────
(function () {
  var cfg = window.chatConfig;
  if (!cfg || !cfg.enabled) return;
  if (cfg.tawkId === 'SUBSTITUA_POR_SEU_TAWK_ID') return;

  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();

  (function () {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://embed.tawk.to/' + cfg.tawkId + '/' + cfg.widgetId;
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    document.head.appendChild(s);
  })();
})();
