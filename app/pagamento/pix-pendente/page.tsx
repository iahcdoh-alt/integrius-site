'use client'

import { QrCode, Copy, Clock, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PixPendentePage() {
  const [copiado, setCopiado] = useState(false)
  
  // PIX fictício para demonstração
  const pixCode = '00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540597.005802BR5925INTEGRIUS SOLUCOES LTDA6009SAO PAULO62070503***63041D3D'

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCode)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-6">
            <QrCode className="w-10 h-10 text-blue-400" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            PIX Gerado com Sucesso!
          </h1>

          <p className="text-xl text-slate-400">
            Escaneie o QR Code ou use o código PIX copia e cola
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white p-8 rounded-lg mb-6 flex items-center justify-center">
          <div className="w-64 h-64 bg-slate-200 rounded-lg flex items-center justify-center">
            <QrCode className="w-32 h-32 text-slate-400" />
            <p className="absolute text-sm text-slate-500 mt-40">QR Code aqui</p>
          </div>
        </div>

        {/* Código PIX */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Código PIX Copia e Cola:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pixCode}
              readOnly
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-mono"
            />
            <button
              onClick={copiarPix}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
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

        {/* Informações */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Valor</div>
            <div className="text-2xl font-bold text-white">R$ 197,00</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Válido por
            </div>
            <div className="text-2xl font-bold text-white">30 minutos</div>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-blue-400 font-semibold mb-3">Após o pagamento:</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>✅ Confirmação automática e instantânea</li>
            <li>✅ Acesso liberado imediatamente</li>
            <li>✅ Email de boas-vindas enviado</li>
            <li>✅ Pode começar a usar o sistema</li>
          </ul>
        </div>

        {/* Como Pagar */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
          <h3 className="text-white font-semibold mb-4">Como pagar via PIX:</h3>
          <ol className="text-sm text-slate-400 space-y-3 list-decimal list-inside">
            <li>Abra o app do seu banco</li>
            <li>Escolha a opção <strong className="text-white">Pagar com PIX</strong></li>
            <li>Escaneie o QR Code ou cole o código acima</li>
            <li>Confirme o valor de <strong className="text-white">R$ 197,00</strong></li>
            <li>Finalize o pagamento</li>
            <li>Aguarde a confirmação (geralmente instantânea)</li>
          </ol>
        </div>

        {/* Botões */}
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
          <p className="mb-2">Dúvidas sobre o pagamento?</p>
          <Link href="/contato" className="text-blue-400 hover:underline">
            Fale com nosso suporte →
          </Link>
        </div>
      </div>
    </div>
  )
}
