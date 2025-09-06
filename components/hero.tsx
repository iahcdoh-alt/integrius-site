import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="container flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="max-w-3xl text-4xl font-bold md:text-5xl">
        Automação que dá <span className="text-primary">escala</span> ao seu atendimento
      </h1>
      <p className="max-w-2xl text-lg text-muted">
        Agende e confirme consultas pelo WhatsApp e web. Reduza no-shows, libere sua equipe e encante pacientes.
      </p>
      <div className="flex gap-3">
        <Link href="/precos"><Button size="lg">Começar agora</Button></Link>
        <Link href="/contato"><Button variant="secondary" size="lg">Solicitar demo</Button></Link>
      </div>
    </section>
  )
}
