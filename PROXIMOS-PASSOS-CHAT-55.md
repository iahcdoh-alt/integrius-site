# 📋 PLANEJAMENTO CHAT #55
## Sistema de Pagamentos e Arquitetura Multi-SaaS

**Data prevista:** 14/11/2025  
**Chat anterior:** #54 - Site institucional completo ✅  
**Objetivo:** Implementar pagamentos + Arquitetura de login direto

---

## 🎯 OBJETIVOS PRINCIPAIS

1. **Sistema completo de pagamentos** (cadastro, assinaturas, controle)
2. **Arquitetura de login direto** (sem complicadores)
3. **Portal administrativo** (SuperAdmin)
4. **Estrutura escalável** para novos SaaS

---

## 🏗️ ARQUITETURA FINAL APROVADA

### Estrutura de Domínios
```
integrius.com.br (Site Institucional)
├─ / (home, produtos, blog)
├─ /cadastro/agenda (trial + pagamento)
├─ /cadastro/imoveis (trial + pagamento)
└─ Marketing e conversão

agenda.integrius.com.br (SaaS Agenda)
├─ /login (login DIRETO do Agenda)
├─ /dashboard
├─ /agendamentos
└─ App completo Agenda

imoveis.integrius.com.br (SaaS Imóveis)
├─ /login (login DIRETO do Imóveis)
├─ /dashboard
├─ /imoveis
└─ App completo Imóveis

portal.integrius.com.br (Portal Admin)
├─ /admin (SuperAdmin central)
├─ Métricas consolidadas
├─ Gestão de clientes
└─ Financeiro global
```

**Benefícios:**
- ✅ Login simples e direto
- ✅ UX excelente
- ✅ Fácil escalar (novos SaaS)
- ✅ SuperAdmin tem lugar próprio
- ✅ Zero complexidade de redirecionamento

---

## 👥 FLUXOS POR TIPO DE USUÁRIO

### 1. Novo Cliente (Trial)
```
1. Google Ads → integrius.com.br/produtos
2. Lê sobre Integrius Agenda
3. Clica "Começar Teste Grátis"
4. Redireciona: integrius.com.br/cadastro/agenda
5. Preenche dados + escolhe plano
6. Pagamento aprovado (cartão/PIX/boleto)
7. Sistema cria:
   ├─ Usuário no Cognito
   ├─ Grupo: "Clinicas"
   ├─ Tenant no DynamoDB
   └─ Envia email com link
8. Email: "Acesse agenda.integrius.com.br/login"
9. Cliente faz primeiro login
10. Bookmark: agenda.integrius.com.br/login
```

**Próximos logins:** Sempre direto em agenda.integrius.com.br/login

---

### 2. Clínica Existente (Login Recorrente)
```
1. Acessa bookmark: agenda.integrius.com.br/login
2. Email + senha
3. Cognito valida:
   ├─ Grupo: "Clinicas"
   ├─ TenantId: "clinic-123"
   └─ Assinatura: ativa
4. Redireciona: /dashboard
5. Trabalha normalmente
```

**Nunca passa pelo site principal** (a menos que queira ver blog/novidades)

---

### 3. SuperAdmin (Você)
```
1. Acessa: portal.integrius.com.br/admin
2. Login com hans@integrius.com.br
3. Cognito valida grupo: "SuperAdmins"
4. Dashboard SuperAdmin:
   ├─ 📊 Métricas Gerais
   │   ├─ 145 clientes ativos
   │   ├─ R$ 28.450 MRR
   │   ├─ 98.5% uptime
   │   └─ 23 novos trials esta semana
   │
   ├─ 🎯 Acesso Rápido aos SaaS
   │   ├─ [Abrir Integrius Agenda como Admin] → SSO automático
   │   ├─ [Abrir Integrius Imóveis como Admin] → SSO automático
   │   └─ [Ver todos os SaaS]
   │
   ├─ 👥 Clientes
   │   ├─ Lista completa
   │   ├─ Filtros por SaaS/plano/status
   │   └─ Ações: editar, cancelar, reativar
   │
   ├─ 💰 Financeiro
   │   ├─ Cobranças do mês
   │   ├─ Inadimplências
   │   └─ Receita por produto
   │
   └─ ⚙️ Sistema
       ├─ Logs de erros
       ├─ Performance
       └─ Backups
```

**Quando precisa acessar um SaaS:**
- Clica no botão
- SSO automático (já logado)
- Abre em nova aba com privilégios admin

---

### 4. Cliente Multi-Produto
```
Dr. João contratou Agenda E Imóveis

Login Agenda:
├─ agenda.integrius.com.br/login
└─ Dashboard com banner: "Você também tem Integrius Imóveis"

Login Imóveis:
├─ imoveis.integrius.com.br/login
└─ Dashboard com banner: "Você também tem Integrius Agenda"

Bookmarks salvos:
├─ agenda.integrius.com.br/login
└─ imoveis.integrius.com.br/login
```

**Cada SaaS independente, sem complicação**

---

## 💰 SISTEMA DE PAGAMENTOS

### Gateway Escolhido: Asaas (Brasileiro)

**Por quê Asaas?**
- ✅ Cartão, PIX e Boleto
- ✅ Assinaturas recorrentes
- ✅ Split payment (multi-tenant)
- ✅ Webhooks confiáveis
- ✅ Dashboard completo
- ✅ Taxas competitivas

**Taxas:**
- Cartão: 1.99% + R$ 0,69
- PIX: R$ 1,99 fixo
- Boleto: R$ 3,49 fixo

---

### Planos e Preços

#### Integrius Agenda

**Básico - R$ 97/mês**
- 1 clínica
- 2 profissionais
- 500 agendamentos/mês
- WhatsApp automático
- Suporte email

**Profissional - R$ 197/mês** ⭐ Mais Popular
- 3 clínicas
- 10 profissionais
- 2.000 agendamentos/mês
- WhatsApp + SMS
- Suporte prioritário
- Relatórios avançados

**Enterprise - R$ 397/mês**
- Clínicas ilimitadas
- Profissionais ilimitados
- Agendamentos ilimitados
- Todos canais (WhatsApp, SMS, Email)
- Suporte 24/7
- Account Manager
- API completa

#### Integrius Imóveis

**Starter - R$ 147/mês**
- 1 usuário
- 100 imóveis cadastrados
- 500 leads/mês
- CRM básico
- Suporte email

**Growth - R$ 297/mês** ⭐ Mais Popular
- 5 usuários
- 500 imóveis cadastrados
- 2.000 leads/mês
- CRM completo
- Automações
- Relatórios avançados
- Suporte prioritário

**Enterprise - R$ 597/mês**
- Usuários ilimitados
- Imóveis ilimitados
- Leads ilimitados
- CRM + Automações
- API completa
- Integrações
- Suporte 24/7
- Account Manager

---

## 🎯 TAREFAS DO CHAT #55

### FASE 1: Páginas de Pricing (1h)

**Criar:**
- `/produtos/agenda/planos` - 3 cards de planos
- `/produtos/imoveis/planos` - 3 cards de planos

**Design:**
- Cards com destaque para plano mais popular
- Comparação de features
- FAQ de planos
- Botões "Começar Agora"

---

### FASE 2: Sistema de Cadastro (2h)

**Páginas:**
- `/cadastro/agenda`
- `/cadastro/imoveis`

**Formulário (ambos):**
```
Etapa 1: Dados Pessoais
├─ Nome completo
├─ Email
├─ Telefone
├─ CPF/CNPJ
└─ Criar senha

Etapa 2: Dados da Empresa
├─ Nome da empresa/clínica
├─ Endereço completo
└─ Número de profissionais (estimativa)

Etapa 3: Plano Escolhido
├─ [Mostrar plano selecionado]
├─ Cupom de desconto (opcional)
└─ Trial: 14 dias grátis

Etapa 4: Pagamento
├─ Forma de pagamento:
│   ├─ 💳 Cartão de crédito
│   ├─ 🏦 PIX (instantâneo)
│   └─ 📄 Boleto (1-3 dias)
└─ Termos de uso + aceite
```

**Validações:**
- Email único (verificar se já existe)
- CPF/CNPJ válido
- Senha forte (min 8 caracteres)
- Cartão válido (via Asaas)

---

### FASE 3: Backend Pagamentos (3h)

**Lambdas a criar:**

#### 1. `jom-customer-create`
```javascript
// POST /api/customers
{
  name, email, cpf, phone,
  company, plan, paymentMethod
}

Função:
1. Validar dados
2. Criar cliente no Asaas
3. Criar assinatura recorrente
4. Criar usuário no Cognito (status: PENDENTE)
5. Criar tenant no DynamoDB
6. Retornar: { customerId, subscriptionId, paymentLink }
```

#### 2. `jom-payment-webhook`
```javascript
// POST /webhooks/asaas
// Recebe eventos do Asaas

Eventos:
├─ PAYMENT_CONFIRMED
│   ├─ Ativar usuário no Cognito
│   ├─ Marcar tenant como ATIVO
│   ├─ Enviar email boas-vindas
│   └─ Enviar credenciais de acesso
│
├─ PAYMENT_RECEIVED
│   └─ Renovar data de expiração
│
├─ PAYMENT_OVERDUE
│   ├─ Marcar tenant como INADIMPLENTE
│   ├─ Enviar email cobrança
│   └─ Bloquear acesso após 7 dias
│
└─ PAYMENT_DELETED
    ├─ Cancelar assinatura
    ├─ Desativar tenant
    └─ Enviar email confirmação
```

#### 3. `jom-subscription-manager`
```javascript
// GET /api/subscriptions
// GET /api/subscriptions/:id
// PATCH /api/subscriptions/:id (upgrade/downgrade)
// DELETE /api/subscriptions/:id (cancelar)

Funções:
├─ Listar assinaturas
├─ Ver detalhes
├─ Upgrade de plano
├─ Downgrade de plano
└─ Cancelamento
```

**Tabelas DynamoDB:**
```javascript
// jom-subscriptions
{
  subscriptionId: "sub_abc123",
  tenantId: "tenant_xyz",
  customerId: "cus_123",
  asaasSubscriptionId: "sub_asaas_456",
  plan: "profissional",
  status: "active", // active, past_due, canceled
  currentPeriodStart: "2025-11-14",
  currentPeriodEnd: "2025-12-14",
  createdAt: "2025-11-14T10:00:00Z",
  updatedAt: "2025-11-14T10:00:00Z"
}

// jom-invoices
{
  invoiceId: "inv_abc123",
  subscriptionId: "sub_abc123",
  tenantId: "tenant_xyz",
  amount: 19700, // centavos
  status: "paid", // pending, paid, failed
  dueDate: "2025-12-14",
  paidAt: "2025-12-14T08:30:00Z",
  paymentMethod: "credit_card",
  asaasPaymentId: "pay_asaas_789",
  createdAt: "2025-11-14T10:00:00Z"
}
```

---

### FASE 4: Páginas de Confirmação (30min)

**Criar:**

#### `/pagamento/processando`
```
🔄 Processando seu pagamento...

[Spinner animado]

Aguarde enquanto confirmamos seu pagamento.
Isso pode levar alguns segundos.

Forma de pagamento: Cartão de Crédito
Plano: Integrius Agenda - Profissional
Valor: R$ 197,00/mês
```

#### `/pagamento/sucesso`
```
✅ Pagamento Confirmado!

Bem-vindo ao Integrius Agenda!

📧 Enviamos um email para você com:
   - Link de acesso
   - Suas credenciais
   - Guia de primeiros passos

🚀 Comece agora:
   [Acessar Integrius Agenda →]
   
   agenda.integrius.com.br/login
```

#### `/pagamento/pix-pendente`
```
🏦 PIX Gerado com Sucesso!

Escaneie o QR Code abaixo:
[QR CODE]

Ou use o código PIX copia e cola:
[INPUT copiável]

⏰ Válido por: 30 minutos
💰 Valor: R$ 197,00

Após o pagamento:
✅ Acesso liberado automaticamente
📧 Email de confirmação enviado
```

#### `/pagamento/boleto-pendente`
```
📄 Boleto Gerado com Sucesso!

[Botão: Visualizar Boleto PDF]
[Botão: Copiar Código de Barras]

⏰ Vencimento: 3 dias úteis
💰 Valor: R$ 197,00

Após o pagamento:
✅ Confirmação em até 2 dias úteis
📧 Email de liberação de acesso
```

#### `/pagamento/falha`
```
❌ Pagamento Não Aprovado

Motivo: Cartão recusado

O que fazer:
├─ Verificar dados do cartão
├─ Verificar limite disponível
├─ Tentar outro cartão
└─ Escolher PIX (instantâneo)

[Tentar Novamente]
[Escolher Outro Método]
```

---

### FASE 5: Portal Admin (2h)

**Criar:**

#### Rota: `portal.integrius.com.br/admin`

**Dashboard:**
```
📊 VISÃO GERAL

┌─────────────────────────────────────────┐
│  MRR: R$ 28.450    Clientes: 145       │
│  Churn: 2.3%       Trial: 23           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  RECEITA POR PRODUTO                    │
│  📅 Agenda:   R$ 18.920 (65%)          │
│  🏠 Imóveis:  R$ 9.530  (35%)          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ACESSO RÁPIDO                          │
│  [Abrir Agenda como Admin]             │
│  [Abrir Imóveis como Admin]            │
└─────────────────────────────────────────┘
```

**Clientes:**
```
📋 LISTA DE CLIENTES

Filtros:
├─ SaaS: [Todos | Agenda | Imóveis]
├─ Plano: [Todos | Básico | Pro | Enterprise]
├─ Status: [Todos | Ativo | Trial | Inadimplente | Cancelado]

Tabela:
┌─────────────┬────────────┬────────┬──────────┬───────┐
│ Cliente     │ SaaS       │ Plano  │ Status   │ Ações │
├─────────────┼────────────┼────────┼──────────┼───────┤
│ Dr. Silva   │ Agenda     │ Pro    │ ✅ Ativo  │ [...] │
│ Imob XYZ    │ Imóveis    │ Growth │ ✅ Ativo  │ [...] │
│ Clínica ABC │ Agenda     │ Basic  │ ⏸️ Trial  │ [...] │
└─────────────┴────────────┴────────┴──────────┴───────┘
```

**Ações por cliente:**
- Ver detalhes completos
- Editar informações
- Alterar plano
- Suspender temporariamente
- Cancelar assinatura
- Ver faturas
- Acessar como admin (impersonate)

---

### FASE 6: Integrações (1h30)

**Asaas:**
- Criar conta sandbox
- Obter API keys
- Configurar webhooks
- Testar criação de cliente
- Testar criação de assinatura
- Testar geração PIX
- Testar geração boleto
- Testar webhooks

**Cognito:**
- Configurar custom attributes:
  - `custom:tenantId`
  - `custom:planId`
  - `custom:subscriptionId`
  - `custom:expiresAt`
- Criar grupos por SaaS:
  - `AgendaClinics`
  - `AgendaDoctors`
  - `AgendaOperators`
  - `ImobiliariaAdmins`
  - `ImobiliariaCorretores`

**AWS SES:**
- Configurar templates de email:
  - Boas-vindas
  - Credenciais de acesso
  - Cobrança
  - Pagamento confirmado
  - Cancelamento

---

### FASE 7: Testes End-to-End (1h)

**Fluxo Completo - Cartão:**
1. Acessar integrius.com.br/produtos/agenda
2. Clicar "Começar Agora" (Plano Profissional)
3. Preencher cadastro completo
4. Escolher cartão de crédito
5. Preencher dados do cartão (sandbox)
6. Confirmar pagamento
7. Verificar página de sucesso
8. Verificar email recebido
9. Fazer login em agenda.integrius.com.br/login
10. Confirmar acesso ao dashboard

**Fluxo Completo - PIX:**
1-4. (mesmo acima)
5. Escolher PIX
6. Gerar QR Code
7. Simular pagamento (sandbox)
8. Webhook recebido
9. Verificar email
10. Login e acesso

**Fluxo Completo - Boleto:**
1-4. (mesmo acima)
5. Escolher boleto
6. Gerar boleto
7. Simular confirmação (sandbox)
8. Webhook recebido após "3 dias"
9. Verificar email
10. Login e acesso

**Testar Inadimplência:**
1. Cliente ativo
2. Simular falha de pagamento
3. Webhook `PAYMENT_OVERDUE`
4. Verificar email de cobrança
5. Verificar bloqueio após 7 dias
6. Simular pagamento recuperado
7. Verificar reativação

---

## 📁 ESTRUTURA DE ARQUIVOS

### Projeto Next.js (integrius.com.br)
```
integrius-platform/
├─ app/
│  ├─ produtos/
│  │  ├─ agenda/
│  │  │  └─ planos/
│  │  │     └─ page.tsx (NOVA)
│  │  └─ imoveis/
│  │     └─ planos/
│  │        └─ page.tsx (NOVA)
│  │
│  ├─ cadastro/
│  │  ├─ agenda/
│  │  │  └─ page.tsx (NOVA)
│  │  └─ imoveis/
│  │     └─ page.tsx (NOVA)
│  │
│  └─ pagamento/
│     ├─ sucesso/
│     │  └─ page.tsx (NOVA)
│     ├─ falha/
│     │  └─ page.tsx (NOVA)
│     ├─ pix-pendente/
│     │  └─ page.tsx (NOVA)
│     └─ boleto-pendente/
│        └─ page.tsx (NOVA)
│
├─ lib/
│  ├─ asaas.ts (NOVA - SDK Asaas)
│  └─ cognito.ts (NOVA - helpers Cognito)
│
└─ api/ (Next.js API Routes)
   └─ webhooks/
      └─ asaas/
         └─ route.ts (NOVA)
```

### Backend AWS (Lambdas)
```
lambdas/
├─ jom-customer-create/
│  ├─ index.js (NOVA)
│  ├─ package.json
│  └─ __tests__/
│
├─ jom-payment-webhook/
│  ├─ index.js (NOVA)
│  ├─ package.json
│  └─ __tests__/
│
└─ jom-subscription-manager/
   ├─ index.js (NOVA)
   ├─ package.json
   └─ __tests__/
```

### Portal Admin (Novo Projeto)
```
integrius-portal/
├─ app/
│  └─ admin/
│     ├─ page.tsx (dashboard)
│     ├─ clientes/
│     │  └─ page.tsx
│     ├─ financeiro/
│     │  └─ page.tsx
│     └─ sistema/
│        └─ page.tsx
│
└─ Novo projeto Next.js separado
```

---

## 💰 CUSTOS OPERACIONAIS

### Gateway Asaas (50 clientes, média R$ 197/mês)
```
Volume mensal: R$ 9.850
Taxa média (1.99% + R$ 0,69): ~R$ 196/mês
```

### AWS
```
Lambda executions: R$ 15/mês
DynamoDB: R$ 25/mês
SES (emails): R$ 5/mês
CloudWatch: R$ 10/mês
Total: R$ 55/mês
```

### Domínios (Registro.br)
```
integrius.com.br: R$ 40/ano
agenda.integrius.com.br: R$ 40/ano
imoveis.integrius.com.br: R$ 40/ano
portal.integrius.com.br: R$ 40/ano
Total: R$ 160/ano (R$ 13,33/mês)
```

### Vercel (Hospedagem)
```
Plano Hobby: Grátis
(3 projetos: site, portal, futuros dashboards)
```

### TOTAL MENSAL
```
R$ 196 (gateway)
+ R$ 55 (AWS)
+ R$ 13 (domínios)
= R$ 264/mês

Com 50 clientes pagando média R$ 197:
Receita: R$ 9.850/mês
Custo: R$ 264/mês
Lucro bruto: R$ 9.586/mês (97,3% de margem!)
```

---

## ⚡ DECISÕES PENDENTES

### 1. Trial Gratuito
- [ ] **14 dias grátis** (recomendado)
- [ ] 7 dias grátis
- [ ] Sem trial (risco maior)

**Recomendação:** 14 dias - melhor conversão

### 2. Desconto Anual
- [ ] **20% off para anual** (recomendado)
- [ ] 15% off para anual
- [ ] Sem desconto anual

**Exemplo:** 
- Mensal: R$ 197/mês = R$ 2.364/ano
- Anual: R$ 1.891/ano (economia R$ 473)

### 3. Forma de Recusa
- [ ] **Cancelar a qualquer momento** (recomendado - menor fricção)
- [ ] Cancelar só no fim do ciclo
- [ ] Penalidade por cancelamento antecipado

**Recomendação:** Sem penalidades - aumenta confiança

### 4. Limite de Trial Simultâneos
- [ ] Ilimitado (risco de abuso)
- [ ] **5 trials por SaaS/dia** (recomendado)
- [ ] Exigir cartão mesmo no trial

**Recomendação:** Limite + não exigir cartão = melhor conversão

---

## 🎯 CRONOGRAMA CHAT #55

**Total estimado: 9h**
```
[1h]   Fase 1: Páginas de pricing
[2h]   Fase 2: Cadastro e formulários
[3h]   Fase 3: Backend pagamentos
[30m]  Fase 4: Páginas de confirmação
[2h]   Fase 5: Portal admin
[1h30] Fase 6: Integrações (Asaas + Cognito)
[1h]   Fase 7: Testes end-to-end
```

**Dividir em 2 chats se necessário (limite de tokens)**

---

## ✅ RESULTADO ESPERADO

Ao final do Chat #55:

**Sistema completo de vendas:**
- ✅ Páginas de planos para ambos SaaS
- ✅ Cadastro com 3 métodos de pagamento
- ✅ Integração Asaas funcionando
- ✅ Webhooks processando eventos
- ✅ Criação automática no Cognito
- ✅ Portal admin operacional
- ✅ Emails transacionais configurados
- ✅ Fluxo testado end-to-end

**Arquitetura escalável:**
- ✅ Login direto por SaaS
- ✅ Portal admin separado
- ✅ Pronto para novos produtos
- ✅ Zero complexidade de redirecionamento

---

## 📝 MENSAGEM PARA INICIAR CHAT #55
```markdown
Chat #55 - Sistema de Pagamentos + Arquitetura Multi-SaaS

Continuando do Chat #54 (site completo ✅)

Objetivos:
1. Implementar sistema de pagamentos completo
2. Criar páginas de planos
3. Formulários de cadastro
4. Integração com Asaas
5. Portal administrativo
6. Arquitetura de login direto

Buscar: PROXIMOS-PASSOS-CHAT-55.md
```

---

**Status:** ✅ PRONTO PARA INÍCIO  
**Arquitetura:** ✅ APROVADA  
**Planejamento:** ✅ COMPLETO

---

**Integrius - Soluções e Automações**  
*Transformando complexidade em simplicidade* 🚀
