import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp, Newspaper } from 'lucide-react'

export default function Home() {
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Transformando complexidade em{' '}
                <span className="text-primary bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">simplicidade</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Soluções SaaS inteligentes para gestão médica e imobiliária. 
                Automatize processos e aumente sua produtividade em +40%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/produtos">
                  <Button size="lg" className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Conhecer Soluções <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800">
                    Falar com Especialista
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-slate-700">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">100%</div>
                  <div className="text-sm text-slate-400">Cloud Native</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                  <div className="text-sm text-slate-400">Disponível</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">+40%</div>
                  <div className="text-sm text-slate-400">Produtividade</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 backdrop-blur border border-slate-600">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-slate-600 bg-slate-800/50 shadow-xl">
                    <CardContent className="p-6">
                      <Zap className="h-8 w-8 text-blue-400 mb-3" />
                      <h3 className="font-semibold text-white mb-2">Automação</h3>
                      <p className="text-sm text-slate-400">Processos automatizados</p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-600 bg-slate-800/50 shadow-xl">
                    <CardContent className="p-6">
                      <Shield className="h-8 w-8 text-blue-400 mb-3" />
                      <h3 className="font-semibold text-white mb-2">Segurança</h3>
                      <p className="text-sm text-slate-400">Dados protegidos</p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-600 bg-slate-800/50 shadow-xl col-span-2">
                    <CardContent className="p-6">
                      <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
                      <h3 className="font-semibold text-white mb-2">Crescimento</h3>
                      <p className="text-sm text-slate-400">Escalável para seu negócio</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 md:py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Nossas Soluções
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Escolha a plataforma ideal para transformar seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Integrius Agenda */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border-slate-600 bg-slate-900/50 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-white">Integrius Agenda</CardTitle>
                <CardDescription className="text-base text-slate-300">
                  Sistema de agendamento médico inteligente com automação via WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-500/10 to-slate-700/30 rounded-lg p-4 mb-6 border border-blue-500/20">
                  <p className="text-sm font-semibold text-blue-400 mb-2">Reduza no-show em até 40%</p>
                  <p className="text-sm text-slate-300">Com lembretes automáticos e confirmações inteligentes</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Agendamento online 24/7 via web e WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Lembretes automáticos T-1 e T-0</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Gestão multi-clínica e multi-profissional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Dashboard completo com relatórios</span>
                  </li>
                </ul>
                
                <Link href="/produtos/agenda" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Conhecer Integrius Agenda
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Integrius Imóveis */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border-slate-600 bg-slate-900/50 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-white">Integrius Imóveis</CardTitle>
                <CardDescription className="text-base text-slate-300">
                  CRM imobiliário completo para gestão de vendas e relacionamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-500/10 to-slate-700/30 rounded-lg p-4 mb-6 border border-blue-500/20">
                  <p className="text-sm font-semibold text-blue-400 mb-2">Aumente suas vendas em 30%</p>
                  <p className="text-sm text-slate-300">Com pipeline visual e gestão inteligente</p>
                </div>
                
                <ul className="space-y-3 mb-6">
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
                    <span className="text-sm text-slate-300">Gestão de corretores e equipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Relatórios e análises personalizadas</span>
                  </li>
                </ul>
                
                <Link href="/produtos/imoveis" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Conhecer Integrius Imóveis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sobre a Integrius */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quem Somos
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                A Integrius é especializada em desenvolver soluções tecnológicas que 
                simplificam processos complexos. Nossos produtos SaaS são projetados 
                para maximizar a eficiência operacional de clínicas médicas e imobiliárias, 
                permitindo que você foque no que realmente importa: seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Notícias */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper className="h-6 w-6 text-blue-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Blog & Novidades
              </h2>
            </div>
            <p className="text-lg text-slate-300">
              Dicas, tendências e novidades sobre gestão e tecnologia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-40 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Image src="/logo agenda.png" alt="Agenda" width={120} height={40} className="h-auto w-auto max-h-16" />
                </div>
                <CardTitle className="text-lg text-white">Como reduzir no-show em clínicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Estratégias comprovadas para diminuir faltas e otimizar sua agenda
                </p>
                <Link href="/blog/reduzir-no-show" className="text-sm text-blue-400 font-medium hover:text-blue-300">
                  Ler mais →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-40 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Image src="/logo imoveis.png" alt="Imóveis" width={120} height={40} className="h-auto w-auto max-h-16" />
                </div>
                <CardTitle className="text-lg text-white">CRM: O segredo das imobiliárias de sucesso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Como um CRM pode transformar sua gestão imobiliária
                </p>
                <Link href="/blog/crm-imobiliarias" className="text-sm text-blue-400 font-medium hover:text-blue-300">
                  Ler mais →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-40 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Zap className="h-12 w-12 text-blue-400" />
                </div>
                <CardTitle className="text-lg text-white">Automação: O futuro é agora</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Descubra como a automação pode revolucionar seu negócio
                </p>
                <Link href="/blog/automacao-futuro" className="text-sm text-blue-400 font-medium hover:text-blue-300">
                  Ler mais →
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-700">
                Ver todos os artigos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Comece hoje mesmo a automatizar seus processos e aumentar sua produtividade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-slate-100">
                Solicitar Demonstração <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/produtos">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-blue-800">
                Ver Produtos
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
