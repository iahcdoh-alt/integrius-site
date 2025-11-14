'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Home,
  Clock,
  ExternalLink,
  BarChart3,
  AlertCircle,
  Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminDashboard() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/clientes', label: 'Clientes', icon: Users },
    { href: '/admin/financeiro', label: 'Financeiro', icon: DollarSign },
    { href: '/admin/sistema', label: 'Sistema', icon: Settings },
  ]

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
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">MRR Total</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ 28.450</div>
              <p className="text-xs text-green-400">
                +12.5% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">145</div>
              <p className="text-xs text-green-400">
                +8 novos este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Trials Ativos</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">23</div>
              <p className="text-xs text-green-400">
                +5 esta semana
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Taxa de Churn</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2.3%</div>
              <p className="text-xs text-green-400">
                -0.5% melhor que meta
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Receita por Produto */}
        <Card className="mb-8 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Receita por Produto</CardTitle>
            <CardDescription className="text-slate-400">Distribuição do MRR por SaaS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-slate-200">Integrius Agenda</span>
                  </div>
                  <span className="font-bold text-white">R$ 18.920 (65%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full transition-all" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-slate-200">Integrius Imóveis</span>
                  </div>
                  <span className="font-bold text-white">R$ 9.530 (35%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acesso Rápido aos SaaS */}
        <Card className="mb-8 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Acesso Rápido aos SaaS</CardTitle>
            <CardDescription className="text-slate-400">Acessar dashboards dos produtos (em desenvolvimento)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                className="h-24 text-lg bg-blue-600 hover:bg-blue-700 text-white" 
                disabled
              >
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Abrir Integrius Agenda</span>
                  <span className="text-xs opacity-70">(Em breve)</span>
                </div>
              </Button>

              <Button 
                className="h-24 text-lg bg-green-600 hover:bg-green-700 text-white" 
                disabled
              >
                <div className="flex flex-col items-center gap-2">
                  <Home className="h-6 w-6" />
                  <span>Abrir Integrius Imóveis</span>
                  <span className="text-xs opacity-70">(Em breve)</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card className="border-yellow-600 bg-yellow-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <AlertCircle className="h-5 w-5" />
              Atenção Necessária
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-200">
            <ul className="list-disc list-inside space-y-1">
              <li>3 clientes com pagamento vencido há mais de 5 dias</li>
              <li>5 trials terminando nos próximos 3 dias</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
