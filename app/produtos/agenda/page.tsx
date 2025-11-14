import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, CheckCircle2, ArrowRight, Zap, TrendingUp, Users, BarChart } from 'lucide-react'

export default function AgendaPage() {
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <Image src="/logo agenda.png" alt="Integrius Agenda" width={300} height={100} className="mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Agendamento Médico Inteligente
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Reduza no-show em até 40% com lembretes automáticos via WhatsApp e otimize a gestão da sua clínica
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contato">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                    Começar Teste Grátis <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                    Solicitar Demonstração
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 backdrop-blur border border-slate-600">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <span>Redução de 40% no no-show</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <span>Aumento de 30% na produtividade</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <span>Economia de 20h/mês em gestão</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <span>ROI de 400%+ no primeiro mês</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Simples, rápido e eficiente em 3 passos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-slate-600 bg-slate-900/50 backdrop-blur text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Agendamento</h3>
                <p className="text-slate-300">
                  Paciente agenda consulta via web, WhatsApp ou telefone de forma rápida e intuitiva
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-900/50 backdrop-blur text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-blue-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Confirmação</h3>
                <p className="text-slate-300">
                  Sistema envia lembretes automáticos T-1 e T-0 via WhatsApp com confirmação inteligente
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-900/50 backdrop-blur text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-blue-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Atendimento</h3>
                <p className="text-slate-300">
                  Paciente comparece pontualmente e você acompanha tudo pelo dashboard em tempo real
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Recursos Completos
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua clínica com eficiência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6">
                <Zap className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Automação Total</h3>
                <p className="text-sm text-slate-300">
                  Lembretes, confirmações e reagendamentos 100% automatizados
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Multi-clínica</h3>
                <p className="text-sm text-slate-300">
                  Gerencie múltiplas clínicas e profissionais em um só lugar
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6">
                <BarChart className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Relatórios</h3>
                <p className="text-sm text-slate-300">
                  Análises detalhadas de produtividade e no-show
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6">
                <TrendingUp className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Escalável</h3>
                <p className="text-sm text-slate-300">
                  Cresce junto com seu negócio sem perder performance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronto para Reduzir No-show?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Comece seu teste grátis hoje e veja os resultados em até 7 dias
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-slate-100">
                Começar Agora <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-blue-800">
                Falar com Especialista
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
