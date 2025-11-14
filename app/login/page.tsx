import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="Integrius" width={300} height={109} className="mx-auto mb-4 h-auto w-auto max-w-[300px]" />
          </Link>
          <p className="text-slate-400">Acesse sua conta</p>
        </div>

        {/* Card de Login */}
        <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Login</CardTitle>
            <CardDescription className="text-slate-300 text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-300">
                  <input type="checkbox" className="mr-2" />
                  Lembrar-me
                </label>
                <Link href="/recuperar-senha" className="text-blue-400 hover:text-blue-300">
                  Esqueci minha senha
                </Link>
              </div>
              
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Ainda não tem conta?{' '}
                <Link href="/contato" className="text-blue-400 hover:text-blue-300 font-medium">
                  Entre em contato
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Links de Produtos */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400 mb-4">Acesso direto aos produtos:</p>
          <div className="flex gap-4 justify-center">
            <Link href="/produtos/agenda">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Integrius Agenda
              </Button>
            </Link>
            <Link href="/produtos/imoveis">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Integrius Imóveis
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-400">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </main>
  )
}
