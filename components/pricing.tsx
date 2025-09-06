import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const plans = [
  { name: 'Start', price: 'R$ 99/mês', features: ['1 agenda', 'WhatsApp Básico', 'Suporte por e-mail'] },
  { name: 'Pro', price: 'R$ 299/mês', features: ['3 agendas', 'WhatsApp Avançado', 'Relatórios', 'Suporte chat'] },
  { name: 'Enterprise', price: 'Fale conosco', features: ['Agendas ilimitadas', 'SLA', 'Integrações sob medida'] }
]

export default function Pricing() {
  return (
    <section className="container py-12">
      <h2 className="mb-6 text-center text-3xl font-semibold">Planos</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name}>
            <CardTitle>{p.name}</CardTitle>
            <CardDescription className="mt-2">{p.price}</CardDescription>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {p.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <div className="mt-6">
              <Button className="w-full">Selecionar</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
