import { Card } from '@/components/ui/card'

export default function SolucoesPage() {
  const items = [
    { title: 'Clínicas', desc: 'Agendamentos confiáveis e redução de faltas.' },
    { title: 'Consultórios', desc: 'Fluxos simples e integrados ao WhatsApp.' },
    { title: 'PMEs', desc: 'Automação que libera sua equipe.' },
  ]
  return (
    <section className="container py-12">
      <h1 className="mb-6 text-3xl font-semibold">Soluções</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <Card key={i.title} className="p-6">
            <h3 className="text-lg font-semibold">{i.title}</h3>
            <p className="mt-2 text-sm text-muted">{i.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
