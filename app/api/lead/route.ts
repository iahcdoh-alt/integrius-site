import { NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const parsed = leadSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.flatten() }, { status: 400 })
    }
    const url = process.env.WHATSAPP_WEBHOOK_URL
    if (url) {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'site', event: 'lead', payload: parsed.data })
      })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
