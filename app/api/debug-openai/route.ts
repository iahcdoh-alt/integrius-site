// app/api/debug-openai/route.ts
import OpenAI from "openai";
export const runtime = "nodejs";

export async function GET() {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const r = await client.models.list();
    return Response.json({
      ok: true,
      count: r.data?.length ?? 0,
      sample: r.data?.slice(0, 3).map(m => m.id) ?? []
    });
  } catch (e: any) {
    console.error("debug-openai error:", e?.message || e);
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
