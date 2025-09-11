"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Position = "br" | "bl"; // bottom-right | bottom-left
type Msg = { role: "user" | "assistant"; content: string; sources?: string[]; lowConfidence?: boolean };

const WA = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER : undefined;

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-slate-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Sources({ items }: { items?: string[] }) {
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

export default function WidgetFloating({
  position = "br",
  size = 320,
  compactHeader = false,
}: {
  position?: Position;
  size?: 320 | 420;
  compactHeader?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const posClass = position === "bl" ? "left-6" : "right-6";
  const widthClass = size === 420 ? "w-[420px]" : "w-[320px]";
  const waHref = useMemo(() => {
    const n = WA || "5524XXXXXXXXX";
    const text = encodeURIComponent("Olá! Tenho uma dúvida sobre os produtos Integrius.");
    return `https://wa.me/${n}?text=${text}`;
  }, []);

  function openWidget() {
    setIsClosing(false);
    setOpen(true);
  }
  function closeWidget() {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 250); // 200–300ms
  }

  async function send() {
    const q = input.trim();
    if (!q || sending) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setSending(true);
    try {
      const r = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await r.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer ?? "Não consegui responder agora.", sources: data.sources, lowConfidence: data.lowConfidence },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Falha ao processar a pergunta. Tente novamente." }]);
    } finally {
      setSending(false);
    }
  }

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;
    // focus no input ao abrir
    const inputEl = el.querySelector("input") as HTMLInputElement | null;
    inputEl?.focus();
  }, [open]);

  return (
    <div className={`fixed bottom-6 ${posClass} z-[60]`}>
      {open ? (
        <div
          ref={containerRef}
          className={`${widthClass} max-h-[80vh] flex flex-col rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 overflow-hidden transform transition-all duration-300 ease-out ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
        >
          {/* Header */}
          {compactHeader ? (
            <div className="flex items-center justify-between p-2">
              <span className="font-semibold text-gray-900 dark:text-slate-100 pl-1">Integrius Q&A</span>
              <button
                onClick={closeWidget}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 px-2"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-slate-700">
              <span className="font-semibold text-gray-900 dark:text-slate-100">Integrius Q&A</span>
              <button
                onClick={closeWidget}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && (
              <Bubble role="assistant">
                Olá! Sou o Q&A da Integrius. Pergunte algo como: <br />
                <ul className="list-disc list-inside mt-2">
                  <li>“O que a Integrius faz?”</li>
                  <li>“Como funciona o Dentech?”</li>
                  <li>“Quais são os canais de contato?”</li>
                </ul>
              </Bubble>
            )}
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                <div className="whitespace-pre-wrap">{m.content}</div>
                {m.sources && <Sources items={m.sources} />}
                {m.lowConfidence && (
                  <div className="text-xs mt-2">
                    Não encontrou o que precisava?{" "}
                    <a className="underline text-blue-600 dark:text-blue-400" href={waHref} target="_blank" rel="noreferrer">
                      Fale no WhatsApp
                    </a>
                  </div>
                )}
              </Bubble>
            ))}
          </div>

          {/* Footer */}
          <div className={`p-2 border-t border-gray-200 dark:border-slate-700 flex gap-2`}>
            <input
              type="text"
              placeholder="Digite sua pergunta…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 border rounded-lg px-2 py-2 text-sm focus:ring-1 focus:ring-blue-500 bg-white dark:bg-slate-800"
            />
            <button
              onClick={send}
              disabled={sending}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-60"
            >
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={openWidget}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform duration-300 ease-out hover:scale-105"
          aria-label="Abrir chat Integrius"
        >
          💬
        </button>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(6px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.25s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
