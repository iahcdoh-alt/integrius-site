import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-semibold">Integrius</h4>
          <p className="mt-2 text-sm text-muted">
            Automação de atendimento e inteligência aplicada.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h5 className="font-medium">Empresa</h5>
            <Link href="/sobre" className="block text-muted hover:text-white">
              Sobre
            </Link>
            <Link href="/seguranca" className="block text-muted hover:text-white">
              Segurança
            </Link>
            <Link href="/lgpd" className="block text-muted hover:text-white">
              LGPD
            </Link>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium">Recursos</h5>
            <Link href="/docs" className="block text-muted hover:text-white">
              Documentação
            </Link>
            <Link href="/status" className="block text-muted hover:text-white">
              Status
            </Link>
            <Link href="/contato" className="block text-muted hover:text-white">
              Contato
            </Link>
          </div>
        </div>
        <div className="text-sm text-muted md:text-right">
          © {new Date().getFullYear()} Integrius
        </div>
      </div>
    </footer>
  )
}
