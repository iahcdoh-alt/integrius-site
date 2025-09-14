// app/api/debug-env/route.ts
export async function GET() {
  const key = process.env.OPENAI_API_KEY || "";
  return Response.json({
    OPENAI_API_KEY_loaded: key.length > 0,
    prefix: key ? key.slice(0, 7) : null,   // ex.: "sk-proj"
    length: key.length,                     // só para conferir tamanho, sem vazar a chave
    envsLoaded: process.env.__NEXT_PRIVATE_PREBUNDLED_REACT ? ["env.local loaded"] : []
  });
}
