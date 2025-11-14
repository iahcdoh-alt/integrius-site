import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Users, Zap, Shield } from 'lucide-react'

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Integrius" width={400} height={145} className="h-20 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/produtos" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Produtos
            </Link>
            <Link href="/sobre" className="text-sm font-medium text-white transition-colors">
              Sobre
            </Link>
            <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/contato" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Contato
            </Link>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90">Acessar</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sobre a Integrius
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Transformando complexidade em simplicidade através da tecnologia
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Nossa História
            </h2>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                A Integrius nasceu da necessidade de simplificar processos complexos em negócios que 
                dependem de alta organização e comunicação eficiente. Percebemos que clínicas médicas 
                e empresas imobiliárias enfrentavam desafios similares: gestão de agendamentos, 
                comunicação com clientes e organização de dados.
              </p>
              <p>
                Com experiência em desenvolvimento de software e profundo conhecimento em automação, 
                criamos soluções SaaS que não apenas resolvem problemas, mas transformam completamente 
                a forma como nossos clientes trabalham.
              </p>
              <p>
                Hoje, ajudamos dezenas de empresas a aumentarem sua produtividade, reduzirem custos 
                operacionais e oferecerem uma experiência superior aos seus clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Nossos Valores
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Foco no Cliente</h3>
                <p className="text-slate-300">
                  Suas necessidades guiam cada decisão que tomamos
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Inovação</h3>
                <p className="text-slate-300">
                  Buscamos sempre as melhores tecnologias e práticas
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Segurança</h3>
                <p className="text-slate-300">
                  Seus dados são protegidos com os mais altos padrões
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Parceria</h3>
                <p className="text-slate-300">
                  Crescemos junto com nossos clientes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Integrius em Números
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-slate-300">Cloud Native</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-slate-300">Disponibilidade</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">+40%</div>
              <div className="text-slate-300">Produtividade</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-slate-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Quer Conhecer Melhor Nossas Soluções?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Entre em contato e descubra como podemos ajudar seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/produtos">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Ver Produtos
              </Button>
            </Link>
            <Link href="/contato">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-blue-800">
                Falar Conosco
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold mb-4">Integrius</div>
              <p className="text-slate-400 text-sm">
                Transformando complexidade em simplicidade
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/produtos/agenda" className="hover:text-white transition-colors">Integrius Agenda</Link></li>
                <li><Link href="/produtos/imoveis" className="hover:text-white transition-colors">Integrius Imóveis</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Acesso</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 Integrius - Soluções e Automações. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
