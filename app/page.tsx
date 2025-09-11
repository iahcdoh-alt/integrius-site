import Hero from '@/components/hero'
import Pricing from '@/components/pricing'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="container grid gap-6 py-8 md:grid-cols-3">
        {['Agendamento', 'Confirmação', 'Relatórios'].map((f) => (
          <Card key={f} className="p-6">
            <h3 className="text-xl font-semibold">{f}</h3>
            <p className="mt-2 text-sm text-muted">
              Automação inteligente para reduzir faltas, acelerar respostas e aumentar conversões.
            </p>
          </Card>
        ))}
      </section>
      <section className="container grid gap-6 py-8 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Agendador 10eQuinze</h3>
          <p className="mt-2 text-sm text-muted">
            Foco em clínicas e consultórios. Confirmações automáticas, lembretes e
            troca/cancelamento simples.
          </p>
          <Link className="mt-4 inline-block text-primary underline" href="/produtos/10equinze">
            Ver mais
          </Link>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Agendador MSA</h3>
          <p className="mt-2 text-sm text-muted">
            Micro-SaaS de agendamentos e automações para PMEs. Simples, rápido e escalável.
          </p>
          <Link className="mt-4 inline-block text-primary underline" href="/produtos/msa">
            Ver mais
          </Link>
        </Card>
      </section>
      <Pricing />
    </>
  )
}
