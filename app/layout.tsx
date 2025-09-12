// src/app/layout.tsx
//<WidgetFloating position="br" size={320} compactHeader />
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WidgetFloating from "@/components/qa/WidgetFloating";

export const metadata: Metadata = {
  metadataBase: new URL("https://integrius.com.br"),
  title: "Integríus – Automação de atendimento e inteligência aplicada",
  description:
    "Agendador 10eQuinze e Agendador MSA: automação inteligente de atendimentos no WhatsApp e web.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Widget flutuante disponível em todo o site */}
        <WidgetFloating position="bottom-right" />
      </body>
    </html>
  );
}
