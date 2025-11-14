'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Users,
  BarChart3,
  Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Cobranca {
  id: string
  cliente: string
  saas: string
  valor: number
  status: 'Pago' | 'Pendente' | 'Vencido' | 'Cancelado'
  dataVencimento: string
  dataPagamento?: string
  metodoPagamento: string
}

const cobrancasMock: Cobranca[] = [
  {
    id: '1',
    cliente: 'Dr. João Silva',
    saas: 'Agenda',
    valor: 197,
    status: 'Pago',
    dataVencimento: '2025-11-10',
    dataPagamento: '2025-11-09',
    metodoPagamento: 'Cartão de Crédito'
  },
  {
    id: '2',
    cliente: 'Imobiliária XYZ',
    saas: 'Imóveis',
    valor: 297,
    status: 'Pago',
    dataVencimento: '2025-11-12',
    dataPagamento: '2025-11-12',
    metodoPagamento: 'PIX'
  },
  {
    id: '3',
    cliente: 'Real Estate BR',
    saas: 'Imóveis',
    valor: 147,
    status: 'Vencido',
    dataVencimento: '2025-11-05',
    metodoPagamento: 'Boleto'
  },
  {
    id: '4',
    cliente: 'Clínica ABC',
    saas: 'Agenda',
    valor: 97,
    status: 'Pendente',
    dataVencimento: '2025-11-20',
    metodoPagamento: 'Cartão de Crédito'
  },
  {
    id: '5',
    cliente: 'Dr. Maria Santos',
    saas: 'Agenda',
    valor: 397,
    status: 'Pago',
    dataVencimento: '2025-11-08',
    dataPagamento: '2025-11-08',
    metodoPagamento: 'PIX'
  }
]

export default function FinanceiroPage() {
  const pathname = usePathname()
  
  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/clientes', label: 'Clientes', icon: Users },
    { href: '/admin/financeiro', label: 'Financeiro', icon: DollarSign },
    { href: '/admin/sistema', label: 'Sistema', icon: Settings },
  ]

  const totalRecebido = cobrancasMock
    .filter(c => c.status === 'Pago')
    .reduce((acc, c) => acc + c.valor, 0)

  const totalPendente = cobrancasMock
    .filter(c => c.status === 'Pendente')
    .reduce((acc, c) => acc + c.valor, 0)

  const totalVencido = cobrancasMock
    .filter(c => c.status === 'Vencido')
    .reduce((acc, c) => acc + c.valor, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pago':
        return <Badge className="bg-green-600 text-white hover:bg-green-700"><CheckCircle2 className="h-3 w-3 mr-1" />Pago</Badge>
      case 'Pendente':
        return <Badge className="bg-blue-600 text-white hover:bg-blue-700"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>
      case 'Vencido':
        return <Badge className="bg-red-600 text-white hover:bg-red-700"><AlertCircle className="h-3 w-3 mr-1" />Vencido</Badge>
      case 'Cancelado':
        return <Badge className="bg-slate-600 text-white hover:bg-slate-700">Cancelado</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header com Menu */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-xl font-bold text-white">Portal SuperAdmin</h1>
                <p className="text-xs text-slate-400">Integrius</p>
              </div>
              
              {/* Menu de Navegação */}
              <nav className="hidden md:flex items-center gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button 
                        variant={isActive ? "default" : "ghost"} 
                        size="sm"
                        className={isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-slate-300 hover:text-white"}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">hans@integrius.com.br</span>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:text-white">Sair</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Gestão Financeira</h2>
          <p className="text-sm text-slate-400">Cobranças e receitas do mês atual</p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Recebido</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                R$ {totalRecebido.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-slate-400">
                {cobrancasMock.filter(c => c.status === 'Pago').length} pagamentos
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Pendente</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                R$ {totalPendente.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-slate-400">
                {cobrancasMock.filter(c => c.status === 'Pendente').length} cobranças
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Vencido</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                R$ {totalVencido.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-slate-400">
                {cobrancasMock.filter(c => c.status === 'Vencido').length} inadimplentes
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">94.2%</div>
              <p className="text-xs text-green-400">
                +2.1% vs mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Inadimplências */}
        {totalVencido > 0 && (
          <Card className="mb-8 border-red-600 bg-red-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                Atenção: Cobranças Vencidas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-red-200">
              <p>
                {cobrancasMock.filter(c => c.status === 'Vencido').length} clientes com pagamento vencido.
                Total de R$ {totalVencido.toLocaleString('pt-BR')} a receber.
              </p>
              <Button className="mt-4 bg-red-600 hover:bg-red-700" size="sm">
                Enviar Notificações de Cobrança
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tabela de Cobranças */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Cobranças Recentes</CardTitle>
            <CardDescription className="text-slate-400">Últimas 30 cobranças do sistema</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Cliente</TableHead>
                  <TableHead className="text-slate-300">SaaS</TableHead>
                  <TableHead className="text-slate-300">Valor</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Vencimento</TableHead>
                  <TableHead className="text-slate-300">Pagamento</TableHead>
                  <TableHead className="text-slate-300">Método</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cobrancasMock.map((cobranca) => (
                  <TableRow key={cobranca.id} className="border-slate-700 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-white">{cobranca.cliente}</TableCell>
                    <TableCell className="text-slate-200">{cobranca.saas}</TableCell>
                    <TableCell className="font-bold text-white">R$ {cobranca.valor}</TableCell>
                    <TableCell>{getStatusBadge(cobranca.status)}</TableCell>
                    <TableCell className="text-slate-300">
                      {new Date(cobranca.dataVencimento).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {cobranca.dataPagamento ? 
                        new Date(cobranca.dataPagamento).toLocaleDateString('pt-BR') : 
                        '-'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <CreditCard className="h-4 w-4 text-slate-400" />
                        {cobranca.metodoPagamento}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
