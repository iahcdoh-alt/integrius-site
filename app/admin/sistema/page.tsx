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
  Activity,
  Server,
  Database,
  AlertCircle,
  CheckCircle2,
  Zap,
  HardDrive,
  Wifi,
  Users,
  DollarSign,
  BarChart3,
  Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warn' | 'error'
  service: string
  message: string
}

const logsMock: LogEntry[] = [
  {
    id: '1',
    timestamp: '2025-11-14 10:45:23',
    level: 'info',
    service: 'Lambda - Appointments',
    message: 'Appointment created successfully'
  },
  {
    id: '2',
    timestamp: '2025-11-14 10:43:15',
    level: 'warn',
    service: 'API Gateway',
    message: 'Rate limit approaching for tenant clinic-123'
  },
  {
    id: '3',
    timestamp: '2025-11-14 10:40:08',
    level: 'error',
    service: 'Lambda - Notifications',
    message: 'Failed to send email: Connection timeout'
  },
  {
    id: '4',
    timestamp: '2025-11-14 10:38:50',
    level: 'info',
    service: 'DynamoDB',
    message: 'Batch write completed: 50 items'
  },
  {
    id: '5',
    timestamp: '2025-11-14 10:35:12',
    level: 'info',
    service: 'Cognito',
    message: 'User login successful: hans@integrius.com.br'
  }
]

export default function SistemaPage() {
  const pathname = usePathname()
  
  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/clientes', label: 'Clientes', icon: Users },
    { href: '/admin/financeiro', label: 'Financeiro', icon: DollarSign },
    { href: '/admin/sistema', label: 'Sistema', icon: Settings },
  ]

  const getLogBadge = (level: string) => {
    switch (level) {
      case 'info':
        return <Badge className="bg-blue-600 text-white hover:bg-blue-700">INFO</Badge>
      case 'warn':
        return <Badge className="bg-yellow-600 text-white hover:bg-yellow-700">WARN</Badge>
      case 'error':
        return <Badge className="bg-red-600 text-white hover:bg-red-700">ERROR</Badge>
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
          <h2 className="text-2xl font-bold text-white">Sistema e Monitoramento</h2>
          <p className="text-sm text-slate-400">Performance, logs e health checks</p>
        </div>

        {/* Status dos Serviços */}
        <Card className="mb-8 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Status dos Serviços</CardTitle>
            <CardDescription className="text-slate-400">Todos os sistemas operacionais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-900/30 rounded-lg border border-green-700">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
                <div>
                  <div className="font-medium text-white">API Gateway</div>
                  <div className="text-sm text-green-400">Operacional</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-900/30 rounded-lg border border-green-700">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
                <div>
                  <div className="font-medium text-white">Lambda Functions</div>
                  <div className="text-sm text-green-400">Operacional</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-900/30 rounded-lg border border-green-700">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
                <div>
                  <div className="font-medium text-white">DynamoDB</div>
                  <div className="text-sm text-green-400">Operacional</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-900/30 rounded-lg border border-green-700">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
                <div>
                  <div className="font-medium text-white">Cognito</div>
                  <div className="text-sm text-green-400">Operacional</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Latência API</CardTitle>
              <Zap className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">245ms</div>
              <p className="text-xs text-green-400">
                -15ms vs ontem
              </p>
              <div className="mt-2 text-xs text-slate-400">
                P95: 380ms | P99: 520ms
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Requisições/hora</CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12,450</div>
              <p className="text-xs text-green-400">
                +8% vs semana passada
              </p>
              <div className="mt-2 text-xs text-slate-400">
                Pico: 18.2k/hora
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Taxa de Erro</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0.2%</div>
              <p className="text-xs text-green-400">
                Dentro do esperado
              </p>
              <div className="mt-2 text-xs text-slate-400">
                24 erros nas últimas 24h
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Uso de Recursos AWS */}
        <Card className="mb-8 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Uso de Recursos AWS</CardTitle>
            <CardDescription className="text-slate-400">Consumo mensal estimado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-slate-200">Lambda Invocations</span>
                  </div>
                  <span className="text-sm font-bold text-white">2.4M / 1M free</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '100%' }}></div>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Custo estimado: R$ 15/mês
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-slate-200">DynamoDB Requests</span>
                  </div>
                  <span className="text-sm font-bold text-white">1.2M / ilimitado</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: '30%' }}></div>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Custo estimado: R$ 25/mês
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-slate-200">S3 Storage</span>
                  </div>
                  <span className="text-sm font-bold text-white">2.1GB / 5GB free</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: '42%' }}></div>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Custo estimado: R$ 0 (free tier)
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
              <div className="font-medium text-blue-200">Custo Total Mensal Estimado</div>
              <div className="text-2xl font-bold text-blue-400 mt-1">R$ 55,00</div>
              <div className="text-sm text-blue-300 mt-1">
                Dentro do orçamento previsto (R$ 100/mês)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Recentes */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Logs Recentes</CardTitle>
                <CardDescription className="text-slate-400">Últimas 50 entradas do sistema</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                <Wifi className="h-4 w-4 mr-2" />
                Atualizar ao Vivo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Timestamp</TableHead>
                  <TableHead className="text-slate-300">Level</TableHead>
                  <TableHead className="text-slate-300">Serviço</TableHead>
                  <TableHead className="text-slate-300">Mensagem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logsMock.map((log) => (
                  <TableRow key={log.id} className="border-slate-700 hover:bg-slate-800/50">
                    <TableCell className="font-mono text-sm text-slate-300">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      {getLogBadge(log.level)}
                    </TableCell>
                    <TableCell className="font-medium text-slate-200">
                      {log.service}
                    </TableCell>
                    <TableCell className="text-sm text-slate-400">
                      {log.message}
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
