# ✅ PRÉ-DEPLOY CHECKLIST — AllTech Site

## 📋 Validação Obrigatória (antes de subir no GitHub)

### **1. Estrutura de Arquivos**
- [ ] Pasta `alltech/site/` contém tudo (não tem subpasta extra)
- [ ] `index.html` na raiz de `site/`
- [ ] `css/` com `style.css`
- [ ] `js/` com `main.js`
- [ ] `assets/` com todas imagens (PNG + WebP)
- [ ] `sitemap.xml` presente
- [ ] `robots.txt` presente

### **2. Caminhos (URLs)**
- [ ] NÃO há caminhos absolutos (`C:\...` ou `/alltech/...`)
- [ ] Todos os links internos são relativos: `zeus-barber.html`, `css/style.css`, `js/main.js`
- [ ] Imagens: `src="assets/logo.png"` (NÃO `/assets/...` com barra inicial)
- [ ] Testar local: `cd alltech/site && python -m http.server 8000`
  - [ ] Home carrega
  - [ ] Todas páginas abrem (clicar em todos links do menu)
  - [ ] CSS aplica (site não está sem estilo)
  - [ ] JS funciona (scroll, mobile menu)

### **3. SEO**
- [ ] `sitemap.xml` acessível em `http://localhost:8000/sitemap.xml`
- [ ] `robots.txt` acessível em `http://localhost:8000/robots.txt`
- [ ] Checar `<title>` em todas páginas (não vazio)
- [ ] Checar OG tags (view source → search "og:title")
- [ ] Checar JSON-LD (search "application/ld+json")

### **4. Performance**
- [ ] Imagens possuem `loading="lazy"` (exceto hero)
- [ ] Hero image tem `loading="eager"` e `fetchpriority="high"`
- [ ] Todas imagens têm `width` e `height` (evita CLS)
- [ ] WebP files existem em `assets/` (logo.webp, hero-visual.webp, etc)
- [ ] PNGs servem como fallback (funciona sem WebP)

### **5. Funcionalidades**
- [ ] Formulário de contato aparece em `contato.html`
- [ ] Campos: Nome, E-mail, WhatsApp, Solução, Mensagem
- [ ] Botão "Enviar" funcional (validação client-side)
- [ ] Mobile menu abre/fecha (hamburger)
- [ ] Scroll reveal animations funcionam (GSAP)
- [ ] Back-to-top button aparece após scroll

### **6. Configurações (não versionadas)**
**IMPORTANTE:** Arquivos abaixo devem existir mas NÃO vão pro GitHub (no .gitignore):

- [ ] `js/emailjs-config.js` (com dados do EmailJS)
- [ ] `js/analytics-config.js` (com GA4 + Clarity IDs)
- [ ] `js/chat-config.js` (com Tawk.to IDs)
- [ ] Se não existirem, criar vazios (template) → usuário preenche depois

### **7. .gitignore**
- [ ] Arquivo `.gitignore` existe na pasta `site/`
- [ ] Contém excluções: `js/emailjs-config.js`, `js/analytics-config.js`, `js/chat-config.js`
- [ ] NÃO exclui pastas importantes (`css/`, `js/main.js`, `assets/`)

### **8. Teste de Navegação**
Abrir site local e testar:
- [ ] Home → Solutions cards clicáveis
- [ ] Menu dropdown funcional (desktop)
- [ ] Mobile menu (todas seções)
- [ ] Formulário validação (deixar campo vazio)
- [ ] Scroll até footer (stats animam)
- [ ] Click em CTA buttons
- [ ] Voltar ao topo (botão flutuante)

### **9. Mobile Responsivo**
Chrome DevTools (F12) → Toggle device toolbar:
- [ ] iPhone SE (375px) — não quebra layout
- [ ] iPad (768px) — grid adapta
- [ ] Desktop (1440px) — tudo alinhado
- [ ] Hamburger menu aparece em <1024px
- [ ] Touch targets >= 44×44px

### **10. Console (Nenhum erro)**
Abrir DevTools → Console:
- [ ] Nenhum erro vermelho (404 de arquivos?)
- [ ] GSAP carregado (console → gsap exists)
- [ ] Nenhum `Uncaught ReferenceError`
- [ ] Nenhum CORS error

---

## 🚀 DEPLOY QUICK

Se tudo marcado above:

```powershell
cd "C:\Desenvolvimento\Criador de Sites\Construtor de projeto 10k\alltech\site"

# Inicializar Git (se primeiro deploy)
git init
git config user.name "Seu Nome"
git config user.email "seu@email.com"

# Commit
git add .
git commit -m "Deploy: AllTech site v1.0 — SEO, forms, images optimized"

# Criar remote no GitHub (primeira vez only)
git remote add origin https://github.com/SEU_USERNAME/alltech-site.git
git branch -M main
git push -u origin main
```

**Pronto!** GitHub Pages ativa em Settings → Pages.

---

## 🔍 PÓS-DEPLOY VALIDATION

Após 2 minutos, testar URL:
```
https://SEU_USERNAME.github.io/alltech-site/
```

Checar:
- [ ] Página carrega (não 404 do GitHub)
- [ ] CSS aplica (não sem estilo)
- [ ] JS funciona (animações)
- [ ] Imagens carregam (WebP + fallback PNG)
- [ ] Form envia (EmailJS modo teste)
- [ ] Chat NÃO aparece (config não preenchida) — correto
- [ ] Sitemap acessível: `/sitemap.xml`
- [ ] Robots acessível: `/robots.txt`

---

## 📊 SEO PÓS-DEPLOY

1. **Google Search Console** — Adicionar property (URL prefix)
2. **Bing Webmaster Tools** — Adicionar também
3. **Testar URLs:**
   - https://search.google.com/test/rich-results (testar index.html)
   - https://cards-dev.twitter.com/validator (testar OG tags)
   - https://developers.facebook.com/tools/debug/ (testar compartilhamento)

---

## 🐛 Se Der Erro

```powershell
# Ver status Git
git status

# Ver logs
git log --oneline -5

# Desfazer mudanças não commitadas
git checkout .

# Ver remotes
git remote -v

# Remover remote (se URL errada)
git remote remove origin
```

---

**Última atualização do checklist:** 29/04/2025  
**Versão:** 1.0
