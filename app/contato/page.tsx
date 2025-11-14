import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContatoPage() {
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
            <Link href="/contato" className="text-sm font-medium text-white transition-colors">
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
            Entre em Contato
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Nossa equipe está pronta para ajudar você a transformar seu negócio
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulário */}
            <Card className="border-slate-600 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Envie uma Mensagem</CardTitle>
                <CardDescription className="text-slate-300">
                  Preencha o formulário e entraremos em contato em até 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Interesse
                    </label>
                    <select className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Selecione uma opção</option>
                      <option value="agenda">Integrius Agenda</option>
                      <option value="imoveis">Integrius Imóveis</option>
                      <option value="ambos">Ambos os produtos</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Conte-nos mais sobre suas necessidades..."
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 gap-2">
                    Enviar Mensagem <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <div className="space-y-6">
              <Card className="border-slate-600 bg-slate-900/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">E-mail</h3>
                      <p className="text-slate-300">contato@integrius.com.br</p>
                      <p className="text-slate-300">suporte@integrius.com.br</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-600 bg-slate-900/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Telefone</h3>
                      <p className="text-slate-300">(21) 99999-9999</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Seg à Sex: 9h às 18h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-600 bg-slate-900/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Localização</h3>
                      <p className="text-slate-300">
                        Rio de Janeiro, RJ<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-blue-500/10 to-slate-700/30 rounded-lg p-6 border border-blue-500/20">
                <h3 className="font-semibold text-white mb-3">Horário de Atendimento</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta:</span>
                    <span className="text-blue-400">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span className="text-slate-400">Fechado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="text-slate-400">Fechado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prefere conhecer nossos produtos primeiro?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Veja todas as funcionalidades e benefícios das nossas soluções
          </p>
          <Link href="/produtos">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Ver Produtos
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
