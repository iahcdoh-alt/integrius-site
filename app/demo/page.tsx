import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DemoPage() {
  return (
    <section className="container py-12">
      <h1 className="mb-4 text-3xl font-semibold">Agendar uma Demo</h1>
      <p className="text-muted">Fale com nossa equipe e veja o produto em ação.</p>
      <div className="mt-6">
        <Link href="/contato"><Button>Solicitar pelo formulário</Button></Link>
      </div>
    </section>
  )
}
