'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'

type Etapa = 1 | 2 | 3 | 4

export default function CadastroAgendaPage() {
  const [etapa, setEtapa] = useState<Etapa>(1)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    // Etapa 1 - Dados Pessoais
    nome: '',
    email: '',
    telefone: '',
    cpfCnpj: '',
    senha: '',
    senhaConfirma: '',
    
    // Etapa 2 - Dados da Empresa
    nomeEmpresa: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    numeroProfissionais: '',
    
    // Etapa 3 - Plano
    plano: 'profissional',
    cupom: '',
    
    // Etapa 4 - Pagamento
    metodoPagamento: 'cartao',
    numeroCartao: '',
    nomeCartao: '',
    validadeCartao: '',
    cvvCartao: '',
    aceitaTermos: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const proximaEtapa = () => {
    if (etapa < 4) setEtapa((etapa + 1) as Etapa)
  }

  const etapaAnterior = () => {
    if (etapa > 1) setEtapa((etapa - 1) as Etapa)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirecionar para página de sucesso
    window.location.href = '/pagamento/sucesso'
  }

  const planos = {
    basico: { nome: 'Básico', preco: 97 },
    profissional: { nome: 'Profissional', preco: 197 },
    enterprise: { nome: 'Enterprise', preco: 397 }
  }

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

      {/* Progresso */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  etapa >= num 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {etapa > num ? <Check className="w-5 h-5" /> : num}
                </div>
                {num < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    etapa > num ? 'bg-blue-600' : 'bg-slate-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {etapa === 1 && 'Seus Dados'}
              {etapa === 2 && 'Dados da Clínica'}
              {etapa === 3 && 'Escolha seu Plano'}
              {etapa === 4 && 'Pagamento'}
            </h1>
            <p className="text-slate-400">
              {etapa === 1 && 'Vamos começar com suas informações pessoais'}
              {etapa === 2 && 'Nos conte sobre sua clínica'}
              {etapa === 3 && 'Selecione o melhor plano para você'}
              {etapa === 4 && 'Último passo - Configure o pagamento'}
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            
            {/* Etapa 1 - Dados Pessoais */}
            {etapa === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Dr. João Silva"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="joao@clinica.com.br"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CPF ou CNPJ *
                  </label>
                  <input
                    type="text"
                    name="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Senha *
                    </label>
                    <input
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="Mínimo 8 caracteres"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirmar Senha *
                    </label>
                    <input
                      type="password"
                      name="senhaConfirma"
                      value={formData.senhaConfirma}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="Digite novamente"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 2 - Dados da Empresa */}
            {etapa === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nome da Clínica *
                  </label>
                  <input
                    type="text"
                    name="nomeEmpresa"
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Clínica São Paulo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Endereço Completo *
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="São Paulo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Estado *
                    </label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="MG">MG</option>
                      {/* Adicionar outros estados */}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      CEP *
                    </label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="00000-000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Número de Profissionais (estimativa)
                  </label>
                  <select
                    name="numeroProfissionais"
                    value={formData.numeroProfissionais}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="1-2">1-2 profissionais</option>
                    <option value="3-5">3-5 profissionais</option>
                    <option value="6-10">6-10 profissionais</option>
                    <option value="11+">Mais de 10</option>
                  </select>
                </div>
              </div>
            )}

            {/* Etapa 3 - Plano */}
            {etapa === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(planos).map(([key, plano]) => (
                    <label
                      key={key}
                      className={`block p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.plano === key
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="plano"
                            value={key}
                            checked={formData.plano === key}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600"
                          />
                          <div>
                            <div className="font-semibold text-white">{plano.nome}</div>
                            <div className="text-sm text-slate-400">
                              {key === 'basico' && '1 clínica • 2 profissionais • 500 agendamentos/mês'}
                              {key === 'profissional' && '3 clínicas • 10 profissionais • 2.000 agendamentos/mês'}
                              {key === 'enterprise' && 'Ilimitado • API completa • Suporte 24/7'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">R$ {plano.preco}</div>
                          <div className="text-sm text-slate-400">/mês</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">14 dias de teste grátis</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Você não será cobrado durante o período de teste. Cancele quando quiser.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Cupom de Desconto (opcional)
                  </label>
                  <input
                    type="text"
                    name="cupom"
                    value={formData.cupom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="PRIMEIRA20"
                  />
                </div>
              </div>
            )}

            {/* Etapa 4 - Pagamento */}
            {etapa === 4 && (
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">Plano selecionado:</span>
                    <span className="text-white font-semibold">
                      {planos[formData.plano as keyof typeof planos].nome}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xl">
                    <span className="text-white font-semibold">Total:</span>
                    <span className="text-white font-bold">
                      R$ {planos[formData.plano as keyof typeof planos].preco}/mês
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Primeira cobrança após 14 dias de teste grátis
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Método de Pagamento
                  </label>
                  <div className="space-y-3">
                    {['cartao', 'pix', 'boleto'].map((metodo) => (
                      <label
                        key={metodo}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.metodoPagamento === metodo
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="metodoPagamento"
                          value={metodo}
                          checked={formData.metodoPagamento === metodo}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="text-white font-medium">
                          {metodo === 'cartao' && '💳 Cartão de Crédito'}
                          {metodo === 'pix' && '🏦 PIX (instantâneo)'}
                          {metodo === 'boleto' && '📄 Boleto (1-3 dias)'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.metodoPagamento === 'cartao' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Número do Cartão *
                      </label>
                      <input
                        type="text"
                        name="numeroCartao"
                        value={formData.numeroCartao}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nome no Cartão *
                      </label>
                      <input
                        type="text"
                        name="nomeCartao"
                        value={formData.nomeCartao}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="Como está no cartão"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Validade *
                        </label>
                        <input
                          type="text"
                          name="validadeCartao"
                          value={formData.validadeCartao}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="MM/AA"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvvCartao"
                          value={formData.cvvCartao}
                          onChange={handleChange}
                          required
                          maxLength={4}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="000"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg">
                  <input
                    type="checkbox"
                    name="aceitaTermos"
                    checked={formData.aceitaTermos}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 mt-0.5"
                  />
                  <label className="text-sm text-slate-400">
                    Aceito os{' '}
                    <Link href="/termos" className="text-blue-400 hover:underline">
                      Termos de Uso
                    </Link>{' '}
                    e{' '}
                    <Link href="/privacidade" className="text-blue-400 hover:underline">
                      Política de Privacidade
                    </Link>
                    . Autorizo a cobrança recorrente após o período de teste.
                  </label>
                </div>
              </div>
            )}

            {/* Botões de Navegação */}
            <div className="flex gap-4 mt-8">
              {etapa > 1 && (
                <button
                  type="button"
                  onClick={etapaAnterior}
                  className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}

              {etapa < 4 ? (
                <button
                  type="button"
                  onClick={proximaEtapa}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !formData.aceitaTermos}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Finalizar Cadastro
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
