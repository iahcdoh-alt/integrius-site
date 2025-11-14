'use client'

import { FileText, Download, Barcode, Clock, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function BoletoPendentePage() {
  const [copiado, setCopiado] = useState(false)
  
  // Código de barras fictício
  const codigoBarras = '34191.79001 01043.510047 91020.150008 1 96610000019700'

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoBarras.replace(/\s/g, ''))
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-6">
            <FileText className="w-10 h-10 text-orange-400" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Boleto Gerado com Sucesso!
          </h1>

          <p className="text-xl text-slate-400">
            Seu boleto foi gerado e enviado por email
          </p>
        </div>

        {/* Informações do Boleto */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Valor</div>
            <div className="text-2xl font-bold text-white">R$ 197,00</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Vencimento
            </div>
            <div className="text-2xl font-bold text-white">3 dias úteis</div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => window.open('#', '_blank')}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-4 rounded-lg font-semibold transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Baixar Boleto PDF
          </button>

          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-lg font-semibold transition-all"
          >
            <FileText className="w-5 h-5" />
            Imprimir Boleto
          </button>
        </div>

        {/* Código de Barras */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <Barcode className="w-4 h-4" />
            Código de Barras:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={codigoBarras}
              readOnly
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-mono"
            />
            <button
              onClick={copiarCodigo}
              className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              {copiado ? (
                <>
                  <Check className="w-5 h-5" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Como Pagar */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-white font-semibold mb-4">Como pagar o boleto:</h3>
          <ol className="text-sm text-slate-400 space-y-3 list-decimal list-inside">
            <li>Faça o download do boleto em PDF</li>
            <li>Pague em qualquer banco, lotérica ou internet banking</li>
            <li>Use o código de barras acima se necessário</li>
            <li>Aguarde a confirmação do pagamento (1-3 dias úteis)</li>
          </ol>
        </div>

        {/* Após o Pagamento */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-orange-400 font-semibold mb-3">Após a confirmação do pagamento:</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>✅ Confirmação em até 2 dias úteis</li>
            <li>✅ Email de liberação de acesso</li>
            <li>✅ Credenciais de login enviadas</li>
            <li>✅ Acesso completo ao sistema</li>
          </ul>
        </div>

        {/* Informações Importantes */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-blue-400 font-semibold mb-3">⚠️ Importante:</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Não pague boletos vencidos</li>
            <li>• Guarde o comprovante de pagamento</li>
            <li>• O boleto também foi enviado para seu email</li>
            <li>• Se houver problemas, entre em contato</li>
          </ul>
        </div>

        {/* Botões Secundários */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href="/"
            className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Voltar ao Início
          </Link>

          <Link
            href="/cadastro/agenda"
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Escolher Outro Método
          </Link>
        </div>

        {/* Suporte */}
        <div className="text-center text-sm text-slate-400">
          <p className="mb-2">Dúvidas sobre o boleto?</p>
          <Link href="/contato" className="text-blue-400 hover:underline">
            Fale com nosso suporte →
          </Link>
        </div>
      </div>
    </div>
  )
}
