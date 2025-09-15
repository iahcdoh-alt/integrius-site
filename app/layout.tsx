// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WidgetFloating from "@/components/qa/WidgetFloating";

// SEO básico
export const metadata: Metadata = {
  metadataBase: new URL("https://integrius.com.br"),
  title: "Integríus – Automação de atendimento e inteligência aplicada",
  description:
    "Agendador 10eQuinze e Agendador MSA: automação inteligente de atendimentos no WhatsApp e web.",
  alternates: { canonical: "/" },
};

// Viewport com safe-area (evita cortes em aparelhos com notch/gestos)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      {/* overflow-x-hidden evita “estouro” horizontal global */}
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <Navbar />
        {/* se alguma seção interna estourar, este também segura */}
        <main className="overflow-x-hidden">{children}</main>
        <Footer />

        {/* Widget flutuante disponível em todo o site */}
        <WidgetFloating position="bottom-right" />
      </body>
    </html>
  );
}
