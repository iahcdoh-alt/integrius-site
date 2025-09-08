import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="w-full border-b border-border bg-background">
      {/* Barra de navegação */}
      <div className="container flex h-16 items-center justify-between">
        <nav className="flex gap-6 mx-auto">
          <Link href="/produtos">Produtos</Link>
          <Link href="/solucoes">Soluções</Link>
          <Link href="/precos">Preços</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        <Link
          href="https://wa.me/55SEUNUMERO"
          className="hidden md:inline-block px-4 py-2 rounded-2xl bg-primary text-primary-foreground font-medium"
        >
          Fale no WhatsApp
        </Link>
      </div>

      {/* Logo centralizada abaixo */}
      <div className="w-full py-6 flex justify-center">
        <Link href="/">
          <Image src="/logo-integrius.svg" alt="Integrius" width={100} height={60} priority />
        </Link>
      </div>
    </header>
  )
}
