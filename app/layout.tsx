import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"   // <-- sem chaves
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Integrius — Automação de atendimento e inteligência aplicada",
  description: "Agendador 10eQuinze e Agendador MSA: automação inteligente de atendimentos no WhatsApp e web.",
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
