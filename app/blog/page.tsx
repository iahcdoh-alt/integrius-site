import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Building2, Zap, ArrowRight } from 'lucide-react'

export default function BlogPage() {
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
            <Link href="/blog" className="text-sm font-medium text-white transition-colors">
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
            Blog Integrius
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Dicas, tendências e novidades sobre gestão, tecnologia e automação
          </p>
        </div>
      </section>

      {/* Artigos */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Artigo 1 */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-48 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Calendar className="h-16 w-16 text-blue-400" />
                </div>
                <div className="text-sm text-slate-400 mb-2">15 Nov 2025 • 5 min de leitura</div>
                <CardTitle className="text-xl text-white">Como Reduzir No-show em Clínicas</CardTitle>
                <CardDescription className="text-slate-300">
                  Estratégias comprovadas para diminuir faltas e otimizar sua agenda médica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Descubra as melhores práticas para reduzir no-show em até 40% utilizando 
                  lembretes automáticos e confirmações inteligentes...
                </p>
                <Link href="/blog/reduzir-no-show" className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-2">
                  Ler artigo completo <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Artigo 2 */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-48 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Building2 className="h-16 w-16 text-blue-400" />
                </div>
                <div className="text-sm text-slate-400 mb-2">12 Nov 2025 • 7 min de leitura</div>
                <CardTitle className="text-xl text-white">CRM: O Segredo das Imobiliárias de Sucesso</CardTitle>
                <CardDescription className="text-slate-300">
                  Como um CRM pode transformar completamente sua gestão imobiliária
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Entenda por que as melhores imobiliárias do mercado utilizam CRM e como 
                  isso pode aumentar suas vendas em 30%...
                </p>
                <Link href="/blog/crm-imobiliarias" className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-2">
                  Ler artigo completo <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Artigo 3 */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-48 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Zap className="h-16 w-16 text-blue-400" />
                </div>
                <div className="text-sm text-slate-400 mb-2">10 Nov 2025 • 6 min de leitura</div>
                <CardTitle className="text-xl text-white">Automação: O Futuro é Agora</CardTitle>
                <CardDescription className="text-slate-300">
                  Descubra como a automação pode revolucionar seu negócio hoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  A automação não é mais uma tendência futura - é uma necessidade presente. 
                  Veja como implementar no seu negócio...
                </p>
                <Link href="/blog/automacao-futuro" className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-2">
                  Ler artigo completo <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Artigo 4 */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-48 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Calendar className="h-16 w-16 text-blue-400" />
                </div>
                <div className="text-sm text-slate-400 mb-2">08 Nov 2025 • 4 min de leitura</div>
                <CardTitle className="text-xl text-white">WhatsApp Business: Potencialize seu Atendimento</CardTitle>
                <CardDescription className="text-slate-300">
                  Como usar o WhatsApp para melhorar o relacionamento com seus pacientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  O WhatsApp Business é uma ferramenta poderosa para clínicas. Aprenda a 
                  utilizá-lo da forma correta...
                </p>
                <Link href="/blog/whatsapp-business" className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-2">
                  Ler artigo completo <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Artigo 5 */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-48 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Building2 className="h-16 w-16 text-blue-400" />
                </div>
                <div className="text-sm text-slate-400 mb-2">05 Nov 2025 • 8 min de leitura</div>
                <CardTitle className="text-xl text-white">Pipeline de Vendas: Guia Completo</CardTitle>
                <CardDescription className="text-slate-300">
                  Estruture um funil de vendas eficiente para sua imobiliária
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Um pipeline bem estruturado é essencial para converter leads em clientes. 
                  Veja o passo a passo completo...
                </p>
                <Link href="/blog/pipeline-vendas" className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-2">
                  Ler artigo completo <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Artigo 6 */}
            <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-slate-600 bg-slate-900/50">
              <CardHeader>
                <div className="bg-blue-500/10 rounded-lg h-48 mb-4 flex items-center justify-center border border-blue-500/20">
                  <Zap className="h-16 w-16 text-blue-400" />
                </div>
                <div className="text-sm text-slate-400 mb-2">01 Nov 2025 • 5 min de leitura</div>
                <CardTitle className="text-xl text-white">Produtividade: 10 Dicas Práticas</CardTitle>
                <CardDescription className="text-slate-300">
                  Aumente a produtividade da sua equipe com técnicas simples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Pequenas mudanças podem gerar grandes resultados. Confira 10 dicas para 
                  melhorar a produtividade hoje mesmo...
                </p>
                <Link href="/blog/produtividade-dicas" className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-2">
                  Ler artigo completo <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Quer Receber Nossos Artigos?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Cadastre-se e receba dicas exclusivas direto no seu email
          </p>
          <Link href="/contato">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Cadastrar Email
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
