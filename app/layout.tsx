// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://integrius.com.br'),   // 👈 base para canonical, sitemap etc.
  title: 'Integríus – Automação de atendimento e inteligência aplicada',
  description:
    'Agendador 10eQuinze e Agendador MSA: automação inteligente de atendimentos no WhatsApp e web.',
  alternates: { canonical: '/' },                      // 👈 canonical vira https://integrius.com.br/rota
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
