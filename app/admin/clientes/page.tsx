'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  MoreVertical,
  Calendar,
  Home,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Users,
  DollarSign,
  BarChart3,
  Settings
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

interface Cliente {
  id: string
  nome: string
  email: string
  saas: 'Agenda' | 'Imóveis'
  plano: string
  status: 'Ativo' | 'Trial' | 'Inadimplente' | 'Cancelado'
  mrr: number
  dataInicio: string
}

const clientesMock: Cliente[] = [
  {
    id: '1',
    nome: 'Dr. João Silva',
    email: 'joao@clinica.com',
    saas: 'Agenda',
    plano: 'Profissional',
    status: 'Ativo',
    mrr: 197,
    dataInicio: '2025-08-15'
  },
  {
    id: '2',
    nome: 'Imobiliária XYZ',
    email: 'contato@imobxyz.com',
    saas: 'Imóveis',
    plano: 'Growth',
    status: 'Ativo',
    mrr: 297,
    dataInicio: '2025-09-01'
  },
  {
    id: '3',
    nome: 'Clínica ABC',
    email: 'clinica@abc.com',
    saas: 'Agenda',
    plano: 'Básico',
    status: 'Trial',
    mrr: 0,
    dataInicio: '2025-11-10'
  },
  {
    id: '4',
    nome: 'Dr. Maria Santos',
    email: 'maria@dental.com',
    saas: 'Agenda',
    plano: 'Enterprise',
    status: 'Ativo',
    mrr: 397,
    dataInicio: '2025-07-20'
  },
  {
    id: '5',
    nome: 'Real Estate BR',
    email: 'info@realstatebr.com',
    saas: 'Imóveis',
    plano: 'Starter',
    status: 'Inadimplente',
    mrr: 147,
    dataInicio: '2025-10-05'
  }
]

export default function ClientesPage() {
  const pathname = usePathname()
  const [busca, setBusca] = useState('')
  const [filtroSaas, setFiltroSaas] = useState('todos')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/clientes', label: 'Clientes', icon: Users },
    { href: '/admin/financeiro', label: 'Financeiro', icon: DollarSign },
    { href: '/admin/sistema', label: 'Sistema', icon: Settings },
  ]

  const clientesFiltrados = clientesMock.filter(cliente => {
    // Filtro de busca por texto (case insensitive)
    const buscaLower = busca.toLowerCase().trim()
    const matchBusca = buscaLower === '' || 
                       cliente.nome.toLowerCase().includes(buscaLower) ||
                       cliente.email.toLowerCase().includes(buscaLower)
    
    // Filtro de SaaS
    const matchSaas = filtroSaas === 'todos' || cliente.saas === filtroSaas
    
    // Filtro de Status
    const matchStatus = filtroStatus === 'todos' || cliente.status === filtroStatus
    
    return matchBusca && matchSaas && matchStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ativo':
        return <Badge className="bg-green-600 text-white hover:bg-green-700"><CheckCircle2 className="h-3 w-3 mr-1" />Ativo</Badge>
      case 'Trial':
        return <Badge className="bg-blue-600 text-white hover:bg-blue-700"><Clock className="h-3 w-3 mr-1" />Trial</Badge>
      case 'Inadimplente':
        return <Badge className="bg-red-600 text-white hover:bg-red-700"><AlertCircle className="h-3 w-3 mr-1" />Inadimplente</Badge>
      case 'Cancelado':
        return <Badge className="bg-slate-600 text-white hover:bg-slate-700"><XCircle className="h-3 w-3 mr-1" />Cancelado</Badge>
      default:
        return null
    }
  }

  const getSaasIcon = (saas: string) => {
    return saas === 'Agenda' ? 
      <Calendar className="h-4 w-4 text-blue-400" /> : 
      <Home className="h-4 w-4 text-green-400" />
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
          <h2 className="text-2xl font-bold text-white">Gestão de Clientes</h2>
          <p className="text-sm text-slate-400">
            {busca || filtroSaas !== 'todos' || filtroStatus !== 'todos' 
              ? `${clientesFiltrados.length} de ${clientesMock.length} clientes`
              : `Total: ${clientesMock.length} clientes`
            }
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-6 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Filtros</CardTitle>
            <CardDescription className="text-slate-400">Buscar e filtrar clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <Select value={filtroSaas} onValueChange={setFiltroSaas}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Filtrar por SaaS" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="todos" className="text-white">Todos os SaaS</SelectItem>
                  <SelectItem value="Agenda" className="text-white">Agenda</SelectItem>
                  <SelectItem value="Imóveis" className="text-white">Imóveis</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Filtrar por Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="todos" className="text-white">Todos os Status</SelectItem>
                  <SelectItem value="Ativo" className="text-white">Ativo</SelectItem>
                  <SelectItem value="Trial" className="text-white">Trial</SelectItem>
                  <SelectItem value="Inadimplente" className="text-white">Inadimplente</SelectItem>
                  <SelectItem value="Cancelado" className="text-white">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(busca || filtroSaas !== 'todos' || filtroStatus !== 'todos') && (
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setBusca('')
                    setFiltroSaas('todos')
                    setFiltroStatus('todos')
                  }}
                  className="border-slate-600 text-slate-300 hover:text-white"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabela de Clientes */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Cliente</TableHead>
                  <TableHead className="text-slate-300">SaaS</TableHead>
                  <TableHead className="text-slate-300">Plano</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">MRR</TableHead>
                  <TableHead className="text-slate-300">Data Início</TableHead>
                  <TableHead className="text-right text-slate-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesFiltrados.length > 0 ? (
                  clientesFiltrados.map((cliente) => (
                    <TableRow key={cliente.id} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{cliente.nome}</div>
                          <div className="text-sm text-slate-400">{cliente.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-200">
                          {getSaasIcon(cliente.saas)}
                          <span>{cliente.saas}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-200">{cliente.plano}</TableCell>
                      <TableCell>{getStatusBadge(cliente.status)}</TableCell>
                      <TableCell className="text-white font-medium">
                        {cliente.mrr > 0 ? `R$ ${cliente.mrr}` : '-'}
                      </TableCell>
                      <TableCell className="text-slate-300">{new Date(cliente.dataInicio).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                      Nenhum cliente encontrado com os filtros aplicados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
