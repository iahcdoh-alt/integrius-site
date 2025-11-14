'use client'

import { Check, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function PagamentoSucessoPage() {
  useEffect(() => {
    // Animação de confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
        
        {/* Ícone de Sucesso */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
          <Check className="w-10 h-10 text-green-400" />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Pagamento Confirmado!
        </h1>

        <p className="text-xl text-slate-400 mb-8">
          Bem-vindo à Integrius! Sua conta foi criada com sucesso.
        </p>

        {/* Card de Informações */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-start gap-3 mb-4">
            <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-2">
                Enviamos um email para você com:
              </h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>✅ Link de acesso ao sistema</li>
                <li>✅ Suas credenciais de login</li>
                <li>✅ Guia de primeiros passos</li>
                <li>✅ Tutorial em vídeo</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 mt-4">
            <p className="text-sm text-slate-400">
              <strong className="text-white">Não recebeu o email?</strong> Verifique sua caixa de spam ou aguarde alguns minutos.
            </p>
          </div>
        </div>

        {/* Período de Trial */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
            <Check className="w-5 h-5" />
            <span className="font-semibold text-lg">14 dias de teste grátis ativados</span>
          </div>
          <p className="text-sm text-slate-400">
            Você não será cobrado durante o período de teste. Aproveite todos os recursos!
          </p>
        </div>

        {/* Botão de Acesso */}
        <Link
          href="https://agenda.integrius.com.br/login"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-blue-500/50 mb-6"
        >
          Acessar Sistema Agora
          <ExternalLink className="w-5 h-5" />
        </Link>

        {/* Suporte */}
        <div className="text-sm text-slate-400">
          <p className="mb-2">Precisa de ajuda?</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/contato" className="text-blue-400 hover:underline">
              Fale com o suporte
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/" className="text-blue-400 hover:underline">
              Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
