import { NextRequest } from "next/server";
import OpenAI from "openai";

console.log("OPENAI_API_KEY carregada?", process.env.OPENAI_API_KEY ? "sim" : "não");
console.log("OPENAI_API_KEY existe?", !!process.env.OPENAI_API_KEY);


// Roda no runtime Node.js (não no Edge)
export const runtime = "nodejs";

const OUT_OF_SCOPE_MSG =
  "Desculpe, esta ferramenta atende apenas dúvidas sobre a Integrius e seus produtos. Para outros assuntos, use nossos canais gerais.";

const KEYWORDS = (process.env.INTEGRIUS_KEYWORDS ??
  "integrius,dentech,10equinze,msa,n8n,whatsapp,automação,agendador")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 🔑 vem do .env.local
});

function inScope(q: string) {
  const t = q.toLowerCase();
  return KEYWORDS.some((kw) => t.includes(kw));
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string" || question.trim().length < 2) {
      return Response.json({ error: "Pergunta inválida." }, { status: 400 });
    }

    // Política: só responde se for sobre Integrius/produtos
    if (!inScope(question)) {
      return Response.json({
        answer: OUT_OF_SCOPE_MSG,
        sources: [],
        lowConfidence: true,
        policyRefusal: true,
      });
    }

    // Chamada ao GPT-4o mini
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
Você é uma atendente da Integrius (nome feminino, brasileiro).
Responda de forma simpática e clara em 3–6 frases.
Só fale sobre Integrius, seus produtos e serviços.
Se a pergunta for fora de escopo, use exatamente:
"${OUT_OF_SCOPE_MSG}"
        `.trim(),
        },
        { role: "user", content: question },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() || OUT_OF_SCOPE_MSG;

    return Response.json({
      answer,
      sources: [], // no futuro podemos adicionar docs/links se quiser
      lowConfidence: false,
      policyRefusal: answer === OUT_OF_SCOPE_MSG,
    });
  } catch (err: any) {
  console.error("Erro detalhado:", err);
  return Response.json(
    { error: "Falha ao processar a pergunta. Tente novamente." },
    { status: 500 }
  );
}
}
