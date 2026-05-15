# AllTech — Site Institucional

> Tecnologia de Resultados | Automação Comercial Premium

Site oficial da AllTech, líder em soluções de automação comercial há mais de 40 anos.

---

## 📁 Estrutura do Projeto

```
alltech/site/
├── index.html              # Home
├── zeus-barber.html        # Zeus Barber (Barbearias)
├── zeus-retail.html        # Zeus Retail (Supermercados)
├── zeus-crm.html           # Zeus CRM (Fidelização)
├── zeus-commerce.html      # Zeus Commerce (E-commerce)
├── zapp.html               # Zapp (App White-label)
├── quem-somos.html         # Quem Somos
├── cases.html              # Cases de Sucesso
├── blog.html               # Blog
├── contato.html            # Contato
├── privacidade.html        # Política de Privacidade
├── termos.html             # Termos de Uso
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots
├── css/
│   └── style.css           # Design system (765 linhas)
├── js/
│   ├── main.js             # GSAP animations + interatividade
│   ├── emailjs-config.js   # Config EmailJS (NÃO versionar)
│   ├── analytics-config.js # Config GA4/Clarity (NÃO versionar)
│   └── chat-config.js      # Config Tawk.to (NÃO versionar)
└── assets/
    ├── logo.png / .webp
    ├── hero-visual.png / .webp
    ├── office-view.png / .webp
    ├── dashboard-preview.png / .webp
    ├── commerce-preview.png / .webp
    ├── crm-preview.png / .webp
    └── zapp-preview.png / .webp
```

---

## 🎯 Funcionalidades

### ✅ SEO Completo
- Meta tags (Open Graph, Twitter Cards)
- JSON-LD Schema (WebPage + Organization)
- Canonical URLs
- Sitemap XML + robots.txt
- Lazy loading nativo em imagens

### ✅ Performance
- Imagens otimizadas (PNG → WebP, 44.6% redução)
- Critical CSS embutido
- Fontes pré-carregadas (preconnect)
- Zero dependências (Vanilla JS + GSAP CDN)

### ✅ Conversão
- Formulário funcional (EmailJS)
- Chatbot Tawk.to (30s trigger + 3ª visita)
- Lead magnet (ebook + popup exit-intent)
- CTA estratégicos

### ✅ Analytics
- Google Analytics 4 (event tracking)
- Microsoft Clarity (heatmaps)
- Scroll depth, cliques, conversões

### ✅ Design
- Mobile-first responsive
- Dark mode (default)
- GSAP scroll animations
- Glassmorphism + mesh gradients
- Custom cursor (desktop)

---

## 🚀 Deploy no GitHub Pages

**Passo 1:** Criar repositório no GitHub (público)

**Passo 2:** Inicializar Git local
```powershell
cd "C:\...\alltech\site"
git init
git add .
git commit -m "Initial commit — AllTech site v1.0"
```

**Passo 3:** Conectar e enviar
```powershell
git remote add origin https://github.com/SEU_USERNAME/alltech-site.git
git branch -M main
git push -u origin main
```

**Passo 4:** Ativar GitHub Pages
- Settings → Pages
- Source: `main` branch, `/root`
- Salvar

**Site online em:** `https://SEU_USERNAME.github.io/alltech-site/`

📖 **Guia completo:** [GITHUB_PAGES_DEPLOY.md](./GITHUB_PAGES_DEPLOY.md)

---

## ⚙️ Configuração Pós-Deploy

### 1. EmailJS (Formulário de Contato)
1. Criar conta em https://emailjs.com
2. Criar Service (Gmail/Outlook SMTP)
3. Criar Template (campos: from_name, reply_to, phone, interest, message)
4. Obter: `service_id`, `template_id`, `public_key`
5. Editar `js/emailjs-config.js`:
```javascript
window.emailjsConfig = {
  serviceId: 'service_xxx',
  templateId: 'template_xxx',
  publicKey: 'user_xxx'
};
```

### 2. Google Analytics 4
1. Criar property no https://analytics.google.com
2. Obter Measurement ID: `G-XXXXXXXXXX`
3. Editar `js/analytics-config.js`:
```javascript
window.analyticsConfig = {
  ga4: { measurementId: 'G-XXXXXXXXXX', enabled: true },
  clarity: { projectId: 'XXXXXXXXXX', enabled: true }
};
```

### 3. Microsoft Clarity
1. Criar projeto em https://clarity.microsoft.com
2. Obter Project ID
3. Colocar em `analytics-config.js` (já integrado)

### 4. Tawk.to Chat
1. Cadastrar em https://tawk.to
2. Criar Property + Widget
3. Obter IDs
4. Editar `js/chat-config.js`:
```javascript
window.chatConfig = {
  tawkId: 'SUBSTITUA_POR_SEU_TAWK_ID',
  widgetId: 'SUBSTITUA_POR_SEU_WIDGET_ID',
  enabled: true
};
```

📖 **Instruções detalhadas:** ver arquivos `_SETUP.md` na pasta `site/`

---

## 🧪 Testes Locais

```bash
# Servidor local (Python)
cd alltech/site
python -m http.server 8000
# Acesse: http://localhost:8000

# Ou com Node.js
npx serve alltech/site
```

**Checklist de validação:**
- [ ] Todas páginas carregam (sem 404)
- [ ] CSS aplica corretamente
- [ ] Formulário valida e envia (modo teste EmailJS)
- [ ] Imagens carregam (WebP + PNG fallback)
- [ ] Navegação funciona (links internos)
- [ ] Mobile responsivo (Chrome DevTools)
- [ ] Lighthouse score >80

---

## 📊 Performance Atual

| Métrica | Valor | Status |
|---------|-------|--------|
| Tamanho total | ~350 KB (otimizado) | ✅ Excelente |
| Imagens WebP | 7 arquivos | ✅ 44.6% menor |
| Requests | ~15 (crítica) | ✅ Bom |
| LCP estimado | <2.5s | ✅ Rápido |
| SEO score | 95+ | ✅ Ótimo |

---

## 🛠️ Tecnologias

- **HTML5** — Semântico, acessível
- **CSS3** — Custom properties, flexbox, grid
- **JavaScript (ES6+)** — Vanilla, sem frameworks
- **GSAP 3.12** — Animações (ScrollTrigger)
- **EmailJS** — Formulários sem backend
- **Tawk.to** — Chat gratuito
- **GA4 + Clarity** — Analytics

---

## 📝 Workflow de Desenvolvimento

```bash
# 1. Fazer alterações nos arquivos (HTML/CSS/JS)
# 2. Testar localmente
python -m http.server 8000

# 3. Commit
git add .
git commit -m "feat: descrição da mudança"

# 4. Push
git push origin main

# 5. GitHub Pages atualiza automaticamente (~1min)
```

---

## 🐛 Problemas Comuns

| Erro | Solução |
|------|---------|
| 404 no GitHub Pages | Branch deve ser `main`, source = `/root` |
| CSS não carrega | Verificar caminhos relativos (não usar `/css/...`) |
| Form não envia | Configurar EmailJS (emailjs-config.js) |
| Chat não aparece | Verificar chat-config.js IDs |
| Site quebrado | `git status` → `git checkout .` (descartar mudanças) |

---

## 📄 Licença

Este projeto é propriedade da **AllTech Tecnologia**. Todos os direitos reservados.

---

## 📞 Suporte

Dúvidas técnicas: `alves.efraimrodrigo@gmail.com`  
Assunto: [AllTech Site] ...

---

**Última atualização:** 29 de abril de 2025  
**Versão:** 1.0.0 (SEO + Form + Analytics + Chat)
