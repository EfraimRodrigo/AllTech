# Guia de Configuração do Chat Tawk.to

Este guia fornece instruções passo a passo para configurar e personalizar o chat Tawk.to no site AllTech.

## 1. Criar Conta no Tawk.to (Gratuito)

1. Acesse [tawk.to](https://tawk.to/)
2. Clique em **"Sign Up"** no canto superior direito
3. Escolha um dos planos gratuitos
4. Preencha seus dados (nome, e-mail, senha)
5. Confirme seu e-mail clicando no link enviado

---

## 2. Obter Property ID e Widget ID

### Passo a Passo:

1. Após o login, você será redirecido para o **Dashboard**
2. Selecione o seu site (ou crie um novo clicando em **Add New Site**)
3. No menu lateral esquerdo, clique em **Settings** ⚙️
4. Na seção **General**, copie os seguintes valores:
   - **Property ID**: é o código alfanumérico (ex: `67abc1234def567890123456`)
   - **Widget ID**: geralmente é `default` ou um código específico

5. No menu lateral, clique em **Channel Settings** (ícone de engrenagem)
6. Selecione **Widgets** no menu superior
7. Aqui você pode visualizar e copiar os IDs necessários

### Onde Encontrar:

- **Property ID**: Configurações ⚙️ > General > Property ID
- **Widget ID**: Channel Settings > Widgets > Selecione o widget > Widget ID

---

## 3. Configurar o arquivo chat-config.js

1. Abra o arquivo `chat-config.js` na raiz do site
2. Substitua os valores de placeholder pelos seus IDs:

```javascript
window.chatConfig = {
  tawkId: 'SEU_PROPERTY_ID_AQUI',      // Ex: '67abc1234def567890123456'
  widgetId: 'SEU_WIDGET_ID_AQUI',      // Ex: 'default'
  enabled: true                        // false para desativar
};
```

**⚠️ Importante:**
- Não use aspas duplas ("), use apenas aspas simples (') internamente
- Mantenha os nomes das propriedades exatamente como estão
- O Property ID é sensível a maiúsculas/minúsculas

---

## 4. Personalizar Avatar e Agentes

### Configurar Avatar da Empresa:

1. No dashboard do Tawk.to, clique em **Team** no menu lateral
2. Selecione **Add New Profile** para criar um novo agente
3. Preencha as informações:
   - **Profile Name**: Nome do agente (ex: "Suporte AllTech")
   - **Display Name**: Nome exibido no chat (ex: "AllTech")
   - **Profile Picture**: Upload do logo/logo redondo (512x512px recomendado)
   - **Email**: E-mail do agente
   - **Mobile Number**: Número de WhatsApp (opcional)
   - **Job Title**: Cargo (ex: "Especialista em Automação")

4. Clique em **Save**

### Configurar Respostas Automáticas:

1. No menu lateral, clique em **Settings** ⚙️
2. Selecione **Canned Responses**
3. Clique em **Add New Response**
4. Crie respostas pré-definidas para:
   - Saudações iniciais
   - Horários de atendimento
   - Links úteis (termos, privacidade, contato)
   - Perguntas frequentes

### Configurar Horários de Atendimento:

1. No menu lateral, clique em **Settings** ⚙️
2. Selecione **Business Hours**
3. Defina os horários de funcionamento:
   - Segunda a Sexta: 08:00 - 18:00
   - Sábado: 08:00 - 12:00 (opcional)
   - Domingo: Fechado
4. Ative o fuso horário correto (America/Sao_Paulo)

### Configurar Mensagem de Ausência:

1. No menu lateral, clique em **Settings** ⚙️
2. Selecione **Away Message**
3. Defina uma mensagem personalizada:
   ```
   Olá! Obrigado por entrar em contato com a AllTech.
   
   Nossos especialistas estão offline no momento.
   Respondermos em até 2 horas úteis durante o horário comercial.
   
   Para atendimento imediato, ligue: (11) 97405-1804
   ```

---

## 5. Testar em Desenvolvimento

### Ambiente Local:

1. O chat só aparecerá se:
   - `chatConfig.enabled = true`
   - IDs estiverem configurados (não sendo placeholders)

2. Adicione este código temporário para forçar exibição:

```javascript
// Apenas para testes locais - REMOVER em produção
window.chatConfig = {
  tawkId: 'SEU_ID_REAL',
  widgetId: 'default',
  enabled: true
};
```

3. Acesse `http://localhost` ou seu servidor local
4. Verifique o botão no canto inferior direito
5. Abra o chat e teste o envio de mensagens

### Verificação de Erros:

Abra o console do navegador (F12) e verifique:
- ✅ Nenhum erro 404 no arquivo `chat-config.js`
- ✅ Tawk_API carregada sem erros
- ✅ Widget ID válido
- ❌ Se houver erro "Invalid Property ID", verifique os IDs
- ❌ Se o chat não abrir, verifique o `console.log` para depuração

### Modo Debug:

Adicione ao seu HTML temporariamente:

```javascript
<script>
window.chatDebug = true;
</script>
```

Isso exibirá logs no console sobre o status do chat.

---

## 6. Como Desativar o Chat

Existem três formas de desativar:

### Opção 1: Via Configuração (Recomendado)

No arquivo `chat-config.js`:

```javascript
window.chatConfig = {
  tawkId: 'SEU_PROPERTY_ID_AQUI',
  widgetId: 'SEU_WIDGET_ID_AQUI',
  enabled: false  // <-- Mude para false
};
```

### Opção 2: Via Dashboard Tawk.to

1. Acesse o dashboard
2. Vá em **Channel Settings** > **Widgets**
3. Desative o widget atual
4. O chat não aparecerá mesmo com o script carregado

### Opção 3: Remoção Completa

Remova as linhas do HTML (não recomendado para manutenção futura):

```html
<!-- REMOVER estas linhas -->
<script src="chat-config.js"></script>
<script type="text/javascript">
  // ... script do Tawk.to ...
</script>
```

---

## 7. Recursos Adicionais

### Controle de Cookies (GDPR):

O chat respeita a preferência do usuário. No nosso sistema:

1. O chat **não carrega** se o usuário recusar cookies
2. Implementação futura: verificar consentimento via `localStorage.getItem('alltech_cookie_ok')`

Para implementar controle de consentimento:

```javascript
// Atualize o chat-config.js para:
window.chatConfig = {
  tawkId: 'SEU_ID',
  widgetId: 'SEU_WIDGET',
  enabled: localStorage.getItem('alltech_cookie_ok') === '1'
};
```

### Triggers Inteligentes:

O chat já possui configurado:
- Abertura automática após **30 segundos**
- Abertura na **3ª página** visitada da sessão

Para modificar, edite o arquivo `js/main.js`, função `initChatTrigger()`:

```javascript
// Ajuste o tempo (em milissegundos)
setTimeout(() => {
  // Código da abertura
}, 30000); // 30000 = 30 segundos

// Ajuste o número de páginas
if (pageCount >= 3) {  // Mude o 3 para o valor desejado
```

---

## 8. Personalização Visual

### Cores do Botão:

As cores já estão configuradas no CSS (`css/style.css`):

```css
#tawkchat-minimize-button {
  background-color: var(--cyan) !important;  /* Cor principal */
}
```

Para alterar:
1. Edite o arquivo `css/style.css`
2. Busque por "TAWK.TO CHAT CUSTOMIZATION"
3. Mude os valores de `var(--cyan)` para a cor desejada

### Posição do Botão:

```css
#tawkchat {
  bottom: 20px !important;
  right: 20px !important;
}
```

Mude os valores para posicionar o chat em outros cantos.

### Tamanho da Janela:

```css
#tawkchat {
  width: 400px !important;   /* Largura */
  height: 500px !important;  /* Altura */
}
```

---

## 9. Checklist de Configuração

- [ ] Conta Tawk.to criada
- [ ] Property ID obtido e configurado
- [ ] Widget ID obtido e configurado
- [ ] Arquivo `chat-config.js` atualizado
- [ ] Chat aparecendo em pelo menos 1 página
- [ ] Avatar e agentes configurados
- [ ] Respostas automáticas criadas
- [ ] Horários de atendimento definidos
- [ ] Mensagem de ausência configurada
- [ ] Testes locais realizados
- [ ] Smart triggers configurados (opcional)
- [ ] Cores personalizadas (opcional)
- [ ] GDPR integrado (futuro)

---

## 10. Suporte

### Documentação Oficial:
- [Tawk.to Help Center](https://help.tawk.to/)
- [API Documentation](https://help.tawk.to/article/1304-api)

### Problemas Comuns:

**Chat não aparece:**
- Verifique se `enabled: true`
- Confirme que os IDs estão corretos
- Limpe o cache do navegador (Ctrl + F5)
- Verifique bloqueios de adblocker

**Chat abre mas fica vazio:**
- Confirme que há agentes online
- Verifique o status no dashboard
- Cheque a conexão com a internet

**Erro "Invalid Property ID":**
- Re-copie o ID da seção General
- Remova espaços em branco extras
- Verifique se a conta está ativa

### Contato Suporte Tawk.to:
- Email: support@tawk.to
- Live Chat: No próprio dashboard
- Status da API: [status.tawk.to](https://status.tawk.to/)

---

## 11. Manutenção

### Backup das Configurações:

1. Salve os IDs em local seguro
2. Exporte as configurações do Tawk.to:
   - Settings > Export Settings
3. Faça screenshots das configurações importantes

### Atualizações:

O Tawk.to é atualizado automaticamente. Nosso script não requer manutenção frequente.

### Monitoramento:

Verifique periodicamente:
- Status do chat no dashboard
- Mensagens não respondidas
- Horários de pico de atendimento
- Avaliações dos usuários

---

*Última atualização: Abril 2026*
*Versão: 1.0*