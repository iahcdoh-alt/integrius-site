'use client'

import { Check, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoSucessoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
        
        {/* Ícone de Sucesso */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-xl text-slate-300 mb-8">
          Bem-vindo ao Integrius Agenda!
        </p>

        {/* Card de Informações */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8 text-left">
          <div className="flex items-start gap-3 mb-4">
            <Mail className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-2">📧 Email Enviado</h3>
              <p className="text-slate-400 text-sm">
                Enviamos um email para você com:
              </p>
              <ul className="text-slate-400 text-sm mt-2 space-y-1">
                <li>• Link de acesso à plataforma</li>
                <li>• Suas credenciais de login</li>
                <li>• Guia de primeiros passos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botão de Acesso */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-3">🚀 Comece Agora</h3>
          <p className="text-slate-300 text-sm mb-4">
            Acesse sua conta e comece a usar o Integrius Agenda
          </p>
          <Link 
            href="https://agenda.integrius.com.br/login"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Acessar Integrius Agenda
            <ExternalLink className="w-4 h-4" />
          </Link>
          <p className="text-slate-400 text-xs mt-3">
            agenda.integrius.com.br/login
          </p>
        </div>

        {/* Informações Adicionais */}
        <div className="text-slate-400 text-sm space-y-2">
          <p>Dúvidas? Entre em contato conosco:</p>
          <p className="text-blue-400">suporte@integrius.com.br</p>
        </div>

      </div>
    </div>
  )
}
