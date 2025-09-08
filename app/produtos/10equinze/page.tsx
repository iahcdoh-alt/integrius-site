import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DezEQuinzePage() {
  return (
    <section className="container py-12">
      <h1 className="mb-4 text-3xl font-semibold">Agendador 10eQuinze</h1>
      <p className="mb-8 text-muted">Automação de agendamentos para clínicas e consultórios.</p>
      <div className="grid gap-6 md:grid-cols-3">
        {['Confirmação automática', 'Lembretes inteligentes', 'Relatórios'].map((f) => (
          <Card key={f} className="p-6">
            {f}
          </Card>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Link href="/precos">
          <Button>Ver planos</Button>
        </Link>
        <Link href="/demo">
          <Button variant="secondary">Agendar demo</Button>
        </Link>
      </div>
    </section>
  )
}
