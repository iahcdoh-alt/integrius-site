// /components/QABot.tsx
"use client";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function QABot() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    const q = input.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      const answer: string =
        json.answer || 'Não consegui responder. Use "Fale no WhatsApp".';
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: 'Tive um problema agora. Clique em "Fale no WhatsApp".',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-3">
      <div className="border rounded-2xl p-3 h-96 overflow-y-auto bg-white/5">
        {messages.length === 0 && (
          <p className="text-sm opacity-70">
            Faça uma pergunta sobre os produtos da Integrius…
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-2 ${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-2xl ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-xs opacity-60">Gerando resposta…</p>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          placeholder="Digite sua pergunta"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
        />
        <button
          className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
          onClick={ask}
          disabled={loading}
        >
          Perguntar
        </button>
        <a
          className="px-4 py-2 rounded-xl border"
          href="https://wa.me/55249988461709"
          target="_blank"
          rel="noreferrer"
        >
          Fale no WhatsApp
        </a>
      </div>
    </div>
  );
}
