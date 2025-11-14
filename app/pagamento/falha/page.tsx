'use client'

import { XCircle, ArrowLeft, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoFalhaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
        
        {/* Ícone de Erro */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Pagamento Não Aprovado
        </h1>

        <p className="text-xl text-slate-400 mb-8">
          Não conseguimos processar seu pagamento.
        </p>

        {/* Card de Motivos */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 text-left">
          <h3 className="text-white font-semibold mb-4">Motivos comuns:</h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li>❌ Cartão recusado pelo banco emissor</li>
            <li>❌ Limite insuficiente no cartão</li>
            <li>❌ Dados do cartão incorretos</li>
            <li>❌ Cartão vencido ou bloqueado</li>
            <li>❌ Problema temporário no processamento</li>
          </ul>
        </div>

        {/* O que fazer */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8 text-left">
          <h3 className="text-blue-400 font-semibold mb-3">O que você pode fazer:</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>✓ Verificar os dados do cartão e tentar novamente</li>
            <li>✓ Tentar com outro cartão</li>
            <li>✓ Escolher PIX (confirmação instantânea)</li>
            <li>✓ Escolher Boleto (1-3 dias úteis)</li>
            <li>✓ Entrar em contato com seu banco</li>
          </ul>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href="/cadastro/agenda"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-lg font-semibold transition-all"
          >
            <CreditCard className="w-5 h-5" />
            Tentar Novamente
          </Link>

          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-lg font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>

        {/* Suporte */}
        <div className="text-sm text-slate-400">
          <p className="mb-2">Precisa de ajuda?</p>
          <Link href="/contato" className="text-blue-400 hover:underline">
            Fale com nosso suporte →
          </Link>
        </div>
      </div>
    </div>
  )
}
