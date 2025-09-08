import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default function ProdutosPage() {
  return (
    <section className="container py-12">
      <h1 className="mb-6 text-3xl font-semibold">Produtos</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Agendador 10eQuinze</h3>
          <p className="mt-2 text-sm text-muted">Automação de agendamentos para saúde.</p>
          <Link href="/produtos/10equinze" className="mt-4 inline-block text-primary underline">
            Explorar
          </Link>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Agendador MSA</h3>
          <p className="mt-2 text-sm text-muted">Micro-SaaS de agendamentos para PMEs.</p>
          <Link href="/produtos/msa" className="mt-4 inline-block text-primary underline">
            Explorar
          </Link>
        </Card>
      </div>
    </section>
  )
}
