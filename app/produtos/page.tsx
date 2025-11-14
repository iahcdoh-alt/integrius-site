import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ProdutosPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Integrius" width={400} height={145} className="h-20 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/produtos" className="text-sm font-medium text-white transition-colors">
              Produtos
            </Link>
            <Link href="/sobre" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
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
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Escolha Sua Solução
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Plataformas SaaS completas para transformar a gestão do seu negócio
          </p>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Integrius Agenda */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border-slate-600 bg-slate-900/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl text-white">Integrius Agenda</CardTitle>
                <CardDescription className="text-lg text-slate-300">
                  Sistema de agendamento médico inteligente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-500/10 to-slate-700/30 rounded-lg p-6 mb-6 border border-blue-500/20">
                  <p className="text-lg font-semibold text-blue-400 mb-3">Benefícios Comprovados</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Redução de 40% no no-show</li>
                    <li>• Aumento de 30% na produtividade</li>
                    <li>• Economia de 20h/mês em gestão</li>
                  </ul>
                </div>
                
                <h3 className="font-semibold text-white mb-4">Recursos Principais</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Agendamento online 24/7 via web e WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Lembretes automáticos T-1 e T-0 dias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Gestão multi-clínica e multi-profissional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Dashboard completo com relatórios detalhados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Controle de pacientes e histórico</span>
                  </li>
                </ul>
                
                <div className="flex gap-3">
                  <Link href="/produtos/agenda" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                      Testar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Integrius Imóveis */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border-slate-600 bg-slate-900/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl text-white">Integrius Imóveis</CardTitle>
                <CardDescription className="text-lg text-slate-300">
                  CRM imobiliário completo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-500/10 to-slate-700/30 rounded-lg p-6 mb-6 border border-blue-500/20">
                  <p className="text-lg font-semibold text-blue-400 mb-3">Resultados Reais</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Aumento de 30% nas vendas</li>
                    <li>• Redução de 50% no tempo de gestão</li>
                    <li>• Melhor acompanhamento de leads</li>
                  </ul>
                </div>
                
                <h3 className="font-semibold text-white mb-4">Recursos Principais</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Cadastro completo de clientes e imóveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Pipeline de vendas visual e intuitivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Gestão de corretores e equipes comerciais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Relatórios e análises personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Integração com portais de imóveis</span>
                  </li>
                </ul>
                
                <div className="flex gap-3">
                  <Link href="/produtos/imoveis" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                      Testar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Não sabe qual escolher?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Fale com nossos especialistas e descubra a melhor solução para seu negócio
          </p>
          <Link href="/contato">
            <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-slate-100">
              Falar com Especialista <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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
