# Integrius Site — Next.js 14 + Tailwind + MDX

Site corporativo para **Integrius**, com páginas de produtos **Agendador 10eQuinze** e **Agendador MSA**.

## 🚀 Stack

- Next.js 14 (App Router) • React • TypeScript
- Tailwind CSS • componentes UI leves
- MDX para docs/blog
- Zod + RHF • API `/api/lead`
- Dockerfile pronto para Cloud Run / Docker Compose

## 🔧 Setup

```bash
cp .env.example .env
# edite NEXT_PUBLIC_SITE_URL e WHATSAPP_WEBHOOK_URL
npm install
npm run dev
```

Acesse: http://localhost:3000

## 🧪 Scripts

- `npm run dev` — ambiente de dev
- `npm run build` — produção
- `npm start` — start server
- `npm run lint`, `npm run format`, `npm run typecheck`

## 🧩 Estrutura

- `app/` rotas (App Router), MDX em `app/docs` e `app/blog`
- `components/` UI (button, card, inputs), layout (navbar/footer)
- `lib/` validações e config
- `app/api/lead/route.ts` — endpoint que valida dados e reencaminha ao `WHATSAPP_WEBHOOK_URL`

## 🔒 Segurança

Headers de segurança (CSP, XFO, XCTO) em `next.config.mjs` (ajuste conforme necessidade).

## 🐳 Docker

```bash
docker build -t integrius/site .
docker run -p 3000:3000 --env-file .env integrius/site
```

## ☁️ Deploy rápido (Cloud Run)

1. `gcloud builds submit --tag gcr.io/SEU_PROJETO/integrius-site`
2. `gcloud run deploy integrius-site --image gcr.io/SEU_PROJETO/integrius-site --platform managed --allow-unauthenticated --region southamerica-east1`
3. Configurar variável `NEXT_PUBLIC_SITE_URL` e `WHATSAPP_WEBHOOK_URL` no serviço.

## ✅ Próximos passos

- Integrar **shadcn/ui** completo (se desejar) e tokens de design detalhados.
- Criar páginas de **Status** (externa) e **Preços** com tabela real.
- Adicionar testes E2E (Playwright) e CI (GitHub Actions).
