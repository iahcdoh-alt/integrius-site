'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

export default function AgendaPlanosPage() {
  const planos = [
    {
      nome: 'Básico',
      preco: 97,
      descricao: 'Ideal para pequenas clínicas',
      destaque: false,
      features: [
        '1 clínica',
        '2 profissionais',
        '500 agendamentos/mês',
        'WhatsApp automático',
        'Suporte email',
        'Dashboard básico'
      ]
    },
    {
      nome: 'Profissional',
      preco: 197,
      descricao: 'Mais popular para clínicas em crescimento',
      destaque: true,
      features: [
        '3 clínicas',
        '10 profissionais',
        '2.000 agendamentos/mês',
        'WhatsApp + SMS',
        'Suporte prioritário',
        'Relatórios avançados',
        'Múltiplos usuários',
        'API básica'
      ]
    },
    {
      nome: 'Enterprise',
      preco: 397,
      descricao: 'Para redes e grandes operações',
      destaque: false,
      features: [
        'Clínicas ilimitadas',
        'Profissionais ilimitados',
        'Agendamentos ilimitados',
        'WhatsApp + SMS + Email',
        'Suporte 24/7',
        'Account Manager dedicado',
        'API completa',
        'Integrações customizadas',
        'Treinamento incluso'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-500">
            Integrius
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Planos Integrius Agenda
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
          Escolha o plano ideal para sua clínica. Todos incluem <strong className="text-white">14 dias de teste grátis</strong>.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">Sem compromisso - Cancele quando quiser</span>
        </div>
      </div>

      {/* Planos */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {planos.map((plano, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plano.destaque
                  ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500 scale-105'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              {plano.destaque && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plano.nome}</h3>
                <p className="text-slate-400 text-sm mb-4">{plano.descricao}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-white">R$ {plano.preco}</span>
                  <span className="text-slate-400">/mês</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">+ impostos</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plano.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 ${plano.destaque ? 'text-blue-400' : 'text-green-400'} flex-shrink-0 mt-0.5`} />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/cadastro/agenda"
                className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                  plano.destaque
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                Começar Teste Grátis
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Rápido */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Perguntas Frequentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-2">📅 O teste grátis é realmente grátis?</h3>
              <p className="text-slate-400 text-sm">
                Sim! 14 dias completos sem cobrança. Cancele antes do fim do período e não pague nada.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">💳 Preciso cadastrar cartão no teste?</h3>
              <p className="text-slate-400 text-sm">
                Sim, mas você não será cobrado durante os 14 dias. Pode cancelar a qualquer momento.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">🔄 Posso trocar de plano depois?</h3>
              <p className="text-slate-400 text-sm">
                Sim! Faça upgrade ou downgrade a qualquer momento. Ajustamos o valor proporcionalmente.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">❌ Como cancelo se não gostar?</h3>
              <p className="text-slate-400 text-sm">
                Direto no painel, em 2 cliques. Sem burocracia, sem taxas, sem perguntas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="container mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ainda com dúvidas?
        </h2>
        <p className="text-slate-400 mb-8">
          Fale com nosso time comercial
        </p>
        <Link
          href="/contato"
          className="inline-block bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
        >
          Falar com Especialista
        </Link>
      </div>
    </div>
  )
}
