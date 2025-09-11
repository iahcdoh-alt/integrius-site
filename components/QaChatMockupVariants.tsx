"use client";

import { useState } from "react";

// Reusable chat bubble
function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  const outer = `flex ${isUser ? "justify-end" : "justify-start"}`;
  const innerBase = "inline-block max-w-[85%] rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed";
  const innerTone = isUser
    ? "bg-blue-600 text-white"
    : "bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-slate-100";
  return (
    <div className={outer}>
      <div className={`${innerBase} ${innerTone}`}>{children}</div>
    </div>
  );
}

// Sources list
function Sources({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-2 text-xs opacity-80">
      <div className="font-medium">Fontes</div>
      <ul className="list-disc list-inside space-y-0.5">
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

// Chat window (visual mock only)
function ChatWindow({ title }: { title: string }) {
  return (
    <div className="w-full max-w-2xl p-6 rounded-2xl shadow-md bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 border border-gray-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-xs opacity-70">Mockup visual</div>
      </div>
      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 mb-4">
        <Bubble role="user">O que a Integrius faz?</Bubble>
        <Bubble role="assistant">
          A Integrius desenvolve soluções de automação e inteligência aplicada, como assistentes de agendamento odontológico (Dentech) e integrações personalizadas com n8n, WhatsApp e IA generativa.
          <Sources items={["[[1]] Integrius — O que fazemos"]} />
        </Bubble>
        <Bubble role="assistant">
          Não encontrei informações suficientes. <a href="#" className="ml-1 underline text-blue-600 dark:text-blue-400">Fale no WhatsApp</a>
        </Bubble>
      </div>
      <div className="flex gap-2">
        <input type="text" placeholder="Digite sua pergunta..." className="flex-1 border border-gray-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-900" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700">Enviar</button>
      </div>
    </div>
  );
}

// Variant frame with live theme toggle
function VariantCard({ variant }: { variant: "light" | "dark" }) {
  const [isDark, setIsDark] = useState(variant === "dark");
  return (
    <div className={isDark ? "relative dark" : "relative"}>
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={() => setIsDark(v => !v)}
          className="text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur hover:opacity-90"
        >
          {isDark ? "Tema: Escuro" : "Tema: Claro"}
        </button>
      </div>
      <div className={isDark ? "rounded-3xl p-6 bg-slate-950" : "rounded-3xl p-6 bg-gray-50"}>
        <ChatWindow title={isDark ? "Q&A - Tema Escuro" : "Q&A - Tema Claro"} />
      </div>
    </div>
  );
}

// Floating widget
function WidgetFloating({ position = "br", size = 320, compactHeader = false }: { position?: "br" | "bl"; size?: 320 | 420; compactHeader?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const posClass = position === "bl" ? "left-6" : "right-6";
  const widthClass = size === 420 ? "w-[420px]" : "w-[320px]";

  function openWidget() {
    setIsClosing(false);
    setOpen(true);
  }
  function closeWidget() {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 250);
  }

  return (
    <div className={`fixed bottom-6 ${posClass} z-50`}>
      {open ? (
        <div className={`${widthClass} max-h-[80vh] flex flex-col rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 overflow-hidden transform transition-all duration-300 ease-out ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}>
          {compactHeader ? (
            <div className="flex items-center justify-between p-2">
              <span className="font-semibold text-gray-900 dark:text-slate-100 pl-1">Integrius Q&A</span>
              <button onClick={closeWidget} className="text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 px-2">✕</button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-slate-700">
              <span className="font-semibold text-gray-900 dark:text-slate-100">Integrius Q&A</span>
              <button onClick={closeWidget} className="text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200">✕</button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <Bubble role="user">Como falar com suporte?</Bubble>
            <Bubble role="assistant">Você pode falar pelo WhatsApp em horário comercial.<Sources items={["[[2]] Suporte — Contato"]} /></Bubble>
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-slate-700 flex gap-2">
            <input type="text" placeholder="Digite sua pergunta..." className="flex-1 border rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 bg-white dark:bg-slate-800" />
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Enviar</button>
          </div>
        </div>
      ) : (
        <button onClick={openWidget} className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform duration-300 ease-out hover:scale-105">💬</button>
      )}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(6px); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
        .animate-fadeOut { animation: fadeOut 0.25s ease-in forwards; }
      `}</style>
    </div>
  );
}

export default function QaChatMockupVariants() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-8 items-center justify-center p-6 bg-gradient-to-b from-white to-gray-100 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Mockup - Caixa de Perguntas & Respostas</h1>
        <p className="text-sm opacity-70">Compare as variações: Claro, Escuro e Widget flutuante</p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-8">
        <VariantCard variant="light" />
        <VariantCard variant="dark" />
      </div>

      {/* Floating widgets */}
      <WidgetFloating position="br" size={320} compactHeader={false} />
      <WidgetFloating position="bl" size={420} compactHeader={true} />

      <div className="max-w-4xl text-xs text-gray-600 dark:text-slate-300 text-center">
        <p>
          Este é um mockup estático apenas para avaliação visual. No projeto real, o componente usará a rota
          <code className="mx-1 px-1 py-0.5 rounded bg-gray-100 dark:bg-slate-800">/api/qa</code> e exibirá as fontes e o CTA do WhatsApp
          conforme a confiança da busca.
        </p>
      </div>
    </main>
  );
}
