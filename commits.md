# 📌 Guia de Commits — Padrão Conventional Commits

Este projeto segue o padrão **[Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)** para manter o histórico organizado e semântico.

---

## 🔑 Prefixos principais

- **feat:**  
  Quando adicionamos **uma nova funcionalidade**.  
  _Exemplo:_  


- **fix:**  
Para **correção de bugs** ou ajustes que resolvem erros.  
_Exemplo:_  

- **docs:**  
Alterações apenas em **documentação**.  
_Exemplo:_  

- **style:**  
Mudanças que não afetam o comportamento do código (formatação, indentação, aspas, etc).  
_Exemplo:_  

- **refactor:**  
Quando o código é **reestruturado** sem mudar a funcionalidade.  
_Exemplo:_  

- **test:**  
Alterações relacionadas a **testes** (adição, correção ou remoção).  
_Exemplo:_  

- **chore:**  
Mudanças de manutenção que **não afetam o código da aplicação** (dependências, configs, scripts).  
_Exemplo:_  

---

## 🔄 Prefixos opcionais (quando necessário)

- **perf:**  
Melhorias de **performance**.  
_Exemplo:_  

- **ci:**  
Alterações em **pipelines de CI/CD** (GitHub Actions, Vercel, etc).  
_Exemplo:_  

- **build:**  
Alterações em **configs de build** ou dependências.  
_Exemplo:_  

- **revert:**  
Quando precisamos **reverter** um commit anterior.  
_Exemplo:_  

---

## ✅ Boas práticas

1. Sempre escreva a mensagem no **imperativo** (ex.: "adicionar", "corrigir").  
2. Use **mensagens curtas e descritivas** (até ~72 caracteres).  
3. Se precisar detalhar mais, use corpo do commit:  
 ```bash
 git commit -m "feat: adicionar integração com WhatsApp" -m "Permite enviar mensagens automáticas pelo fluxo n8n usando Twilio."

📌 Exemplo de histórico esperado
feat: criar página de preços
fix: corrigir erro no envio de formulário
docs: adicionar guia de deploy no README
style: ajustar espaçamento da Navbar
