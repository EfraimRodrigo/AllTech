# ANALYTICS_SETUP.md

## Visão Geral

Este diretório contém a implementação de analgesia Analytics para o site AllTech, incluindo:

- **Google Analytics 4** (GA4) — métricas de tráfego, comportamento e conversões
- **Microsoft Clarity** — gravação de sessões, mapas de calor e análise de cliques

A configuração é **totalmente externa** através do arquivo `js/analytics-config.js`, que **NÃO** é versionado (gitignore).

---

## Estrutura de Arquivos

```
alltech/site/
├── js/
│   ├── main.js                  ← tracking events (scroll, clicks, forms)
│   └── analytics-config.js      ← *** VOCÊ configura aqui ***
├── index.html                   ← + todas as demais páginas HTML
└── ANALYTICS_SETUP.md           ← este arquivo
```

---

## 1. Google Analytics 4 — Obtaining Measurement ID

1. Acesse <https://analytics.google.com/>
2. Faça login com sua conta Google (Gmail)
3. Clique em **"Começar a coletar"** ou **"Admin"** > **"Criar propriedade"**
4. Selecione **Web** > **"Medir uma stream da web"**
5. Preencha:
   - **URL do site**: `https://alltech.com.br`
   - **Stream name**: `AllTech Main Site` (ou nome de sua escolha)
6. Clique em **"Criar stream"**
7. Na próxima tela, você verá o **Measurement ID** no formato `G-XXXXXXXXXX`
8. Copie esse ID para o campo no `analytics-config.js`

```javascript
window.analyticsConfig = {
  ga4: {
    measurementId: 'G-1A2B3C4D5E',  // ← seu ID aqui
    enabled: true
  },
  ...
};
```

---

## 2. Microsoft Clarity — Obtendo o Project ID

Microsoft Clarity é gratuito e ilimitado.

1. Acesse <https://clarity.microsoft.com/>
2. Faça login com sua conta Microsoft
3. Clique em **"+ Add project"**
4. Dê um nome ao projeto (ex: "AllTech Site")
5. Escolha o domínio: `alltech.com.br`
6. Clique em **"Create project"**
7. Após criar, você será levado a uma página com um **script snippet**
8. O Project ID é o número que aparece na URL do snippet:
   ```html
   <!-- Exemplo do snippet da Microsoft -->
   <script type="text/javascript">
     (function(c,l,a,r,i,t,y){
       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
       ...
     })(window, document, "clarity", "script", " **12345678** ");
   </script>
   ```
   No exemplo acima, o Project ID é `12345678`.

9. Cole esse número (apenas os dígitos) no `analytics-config.js`:

```javascript
window.analyticsConfig = {
  clarity: {
    projectId: '12345678',  // ← seu Project ID aqui
    enabled: true
  }
};
```

---

## 3. Testando Localmente (sem publicar)

Durante o desenvolvimento, você pode ativar o **modo debug** para ver todos os eventos no console do navegador:

Abra o console do navegador (F12) e execute:

```javascript
window.analyticsDebug = true;
```

Recarregue a página. Você verá logs como:

```
[Analytics] Tracking inicializado | GA4: true | Clarity: true
[GA4] page_view { ... }
[GA4] scroll_depth { percent: 25 }
[Clarity] scroll_depth "25"
```

### Verificar GA4 no DebugView

1. Abra o site em uma nova aba (com debug ativado)
2. No Google Analytics, vá em **"Admin" > "DebugView"**
3. Você verá os eventos aparecendo em tempo real

⚠️ O DebugView só funciona se:
- `window.analyticsDebug = true` **ou**
- Você adiciona `?gtm_debug=x` na URL

---

## 4. Verificação no Dashboard

### Google Analytics 4

Após publicar e com o Measurement ID correto:

1. Acesse <https://analytics.google.com/>
2. Selecione sua propriedade
3. No menu esquerdo, veja:
   - **Relatórios** > **Engajamento** > **Eventos**
   - **Relatórios** > **Aquisição** > **Tráfego**
   - ** Explorar ** para criar painéis personalizados

**Eventos padrão implementados:**

| Evento | Parâmetros | Quando dispara |
|--------|------------|----------------|
| `page_view` | `page_title`, `page_location` | Carregamento da página (automático) |
| `scroll_depth` | `percent` (25, 50, 75, 90) | Atingir milestones de scroll |
| `click` | `event_category='CTA'`, `event_label` | Clique em botões (.btn, .sol-link, .nav-cta) |
| `form_submit` | `form_name='Contato'` | Submit do formulário de contato |
| `file_download` | `file_name`, `file_extension` | Clique em link para PDF/DOC/XLS |
| `phone_call` | `phone_number` | Clique em links `tel:` |

### Microsoft Clarity

1. Acesse <https://clarity.microsoft.com/>
2. Selecione seu projeto
3. Painéis principais:
   - **Recordings** → gravações de sessões de usuários
   - **Heatmaps** → mapa de cliques e movimentos
   - **Dashboard** → métricas agregadas

Os dados podem demorar até **24h** para aparecer.

---

## 5. Desabilitando Temporariamente

Caso precise pausar a coleta:

```javascript
window.analyticsConfig = {
  ga4:    { enabled: false, measurementId: 'G-XXXXXXXXXX' },
  clarity:{ enabled: false, projectId: 'XXXXXXXXXX' }
};
```

Ou simplesmente remova/renomeie o arquivo `js/analytics-config.js` (o site continuará funcionando, apenas sem analytics).

---

## 6. Solução de Problemas

### "Analytics não aparece no console"

1. Verifique se `js/analytics-config.js` está sendo carregado (Network tab)
2. Confirme que `window.analyticsDebug = true` está definido
3. Certifique-se de que `enabled: true` e IDs não são os placeholders

### "Eventos não chegam no GA4"

- Use o plugin **Google Analytics Debugger** (Chrome)
- Verifique se `gtag` está definido: `console.log(typeof gtag)`
- Cheque se não há erros de JavaScript no console

### "Clarity não grava sessões"

- O Project ID deve ser numérico (apenas dígitos)
- O domínio no projeto Clarity deve conter `alltech.com.br`
- Sessões podem demorar alguns minutos para aparecer

---

## 7. .gitignore (importante!)

Para **não commitar** as chaves de analytics, adicione ao `.gitignore`:

```
# Analytics config — contém IDs secreto
alltech/site/js/analytics-config.js
```

Caso o projeto ainda não tenha `.gitignore`, crie um na raiz com o conteúdo acima.

---

## 8. Performance

- Ambos os scripts são **assíncronos** e não bloqueiam renderização
- GA4 carrega de `www.googletagmanager.com` (cacheado em muitos navegadores)
- Clarity carrega de `www.clarity.ms` (leve, ~7 KB)
- Em modo `enabled: false`, **nenhum script é injetado**

---

## 9. Privacidade e LGPD

- Os dados coletados são **anonimizados** por padrão no GA4
- No Clarity, você pode configurar máscaras de dados sensíveis no painel
- Informe aos usuários na Política de Privacidade que você utiliza essas ferramentas (vide `privacidade.html`)
- Permita opt-out se necessário (pode ser feito via configuração do navegador ou extensões)

---

## 10. Perguntas Frequentes

**Preciso de ambos os serviços?**
Sim. GA4 fornece métricas quantitativas; Clarity oferece insights qualitativos (gravações, heatmaps). Complementares.

**Posso usar apenas um?**
Pode, mas recomendamos ambos para visão completa.

**Impacto na velocidade do site?**
Mínimo. GA4 + Clarity juntos adicionam ~30 KB e chamadas assíncronas. A pontuação PageSpeed Insights deve permanecer alta.

**Como rastrear eventos customizados?**
Adicione no `main.js` dentro da função `initAnalytics()`:
```javascript
gtag('event', 'video_play', { video_title: 'Introdução' });
clarity('set', 'video_play', 'Introdução');
```

---

**Última atualização deste guia:** 29 de abril de 2025
