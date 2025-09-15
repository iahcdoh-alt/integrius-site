'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type MsgRole = 'system' | 'assistant' | 'user';
type ChatMsg = { id: string; role: MsgRole; text: string; ts: number };

interface WidgetFloatingProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

/** Config mínima (cores e textos) */
const CONFIG = {
  brand: 'Integrius',
  colors: {
    primary: '#0066CC',
    primaryHover: '#0052A3',
    surface: '#FFFFFF',
    text: '#111111',
    textMuted: '#666666',
    border: '#E0E0E0',
    bubble: '#F1F3F4',
  },
  timings: {
    typingDelayMs: 250,            // atraso visual antes de mostrar "digitando..."
    requestTimeoutMs: 25000,       // timeout do fetch
    reconnectBackoffMs: 900,       // backoff simples para retry
    welcomeDelayMs: 500,           // atraso para 1a msg
    handoverDelayMs: 5000,         // “Seu atendimento já vai começar.” → atendente
  },
  greetings: {
    welcome: 'Que bom ver você aqui! O seu atendimento já vai começar.',
    agentName: 'Sofia', // nome feminino brasileiro (fixo p/ consistência)
    handover: (name: string) => `Olá, eu sou a ${name}. Em que posso ajudar?`,
  },
};

export default function WidgetFloating({ position = 'bottom-right' }: WidgetFloatingProps) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [requeue, setRequeue] = useState<string | null>(null); // última pergunta pendente (p/ reconectar)

  const scrollRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  // ===== helpers
  const isNarrow = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 380;
  }, []);

  const pushMsg = useCallback((role: MsgRole, text: string) => {
    setMsgs(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text, ts: Date.now() }]);
  }, []);

  // ===== bem-vindo + atendente
  const startChat = useCallback(() => {
    setOpen(true);
    setMsgs([]);
    // mensagem 1 (bem-vindo)
    setTimeout(() => {
      pushMsg('system', CONFIG.greetings.welcome);
      // mensagem 2 (atendente)
      setTimeout(() => {
        pushMsg('assistant', CONFIG.greetings.handover(CONFIG.greetings.agentName));
      }, CONFIG.timings.handoverDelayMs);
    }, CONFIG.timings.welcomeDelayMs);
  }, [pushMsg]);

  // ===== integração com API /api/qa (timeout + retry)
  const askAPI = useCallback(async (question: string) => {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), CONFIG.timings.requestTimeoutMs);

    try {
      const res = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: { answer?: string; sources?: string[]; lowConfidence?: boolean; policyRefusal?: boolean } = await res.json();
      return data;
    } catch (err) {
      clearTimeout(t);
      throw err;
    }
  }, []);

  const sendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;

    setInput('');
    pushMsg('user', q);
    setTyping(true);
    setRequeue(q); // guarda p/ retry automático se cair rede

    // tentativa 1
    try {
      const data = await askAPI(q);
      setTyping(false);
      setRequeue(null);

      if (data?.answer) {
        pushMsg('assistant', data.answer);
      } else {
        pushMsg('assistant', 'Não consegui encontrar uma resposta agora. Pode tentar reformular sua pergunta?');
      }

      if (data?.lowConfidence) {
        pushMsg('assistant', 'Se preferir, posso te encaminhar para nosso WhatsApp para um atendimento humano.');
      }
    } catch {
      // pequeno backoff e 2ª tentativa
      await new Promise(r => setTimeout(r, CONFIG.timings.reconnectBackoffMs));
      try {
        const data2 = await askAPI(q);
        setTyping(false);
        setRequeue(null);
        if (data2?.answer) {
          pushMsg('assistant', data2.answer);
        } else {
          pushMsg('assistant', 'Não consegui encontrar uma resposta agora. Pode tentar reformular sua pergunta?');
        }
      } catch {
        setTyping(false);
        // mensagem amigável + CTA
        pushMsg(
          'assistant',
          'Não consegui conectar agora. Por favor, tente novamente em instantes.\n\nSe preferir, fale conosco no WhatsApp: https://wa.me/5524998821709'
        );
      }
    }
  }, [input, askAPI, pushMsg]);

  // ===== reconectar quando rede voltar / aba voltar ao foco
  useEffect(() => {
    const onOnline = () => {
      if (requeue) {
        setTyping(true);
        askAPI(requeue)
          .then((d) => {
            if (d?.answer) pushMsg('assistant', d.answer);
            setTyping(false);
            setRequeue(null);
          })
          .catch(() => setTyping(false));
      }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible' && requeue) onOnline();
    };
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [requeue, askAPI, pushMsg]);

  // ===== scroll para a última mensagem
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  // ===== teclado móvel (visualViewport) → empurra para cima
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      const offset = Math.max(0, window.innerHeight - vv.height);
      setBottomOffset(offset);
    };
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);

  // ===== estilos inline com safe-area
  const fabStyle: React.CSSProperties = {
    ...(position.endsWith('right')
      ? { right: 'max(16px, env(safe-area-inset-right))' }
      : { left: 'max(16px, env(safe-area-inset-left))' }),
    ...(position.startsWith('bottom')
      ? { bottom: 'max(16px, env(safe-area-inset-bottom))' }
      : { top: 'max(16px, env(safe-area-inset-top))' }),
    width: 60, height: 60, borderRadius: '50%',
    backgroundColor: CONFIG.colors.primary,
    border: 'none', cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(0, 102, 204, 0.15)',
    transition: 'all .25s ease',
  };

  const panelStyle: React.CSSProperties = {
    width: isNarrow ? '100vw' : 'clamp(320px, 92vw, 420px)',
    height: isNarrow ? '100vh' : 'clamp(360px, 78vh, 86vh)',
    backgroundColor: CONFIG.colors.surface,
    borderRadius: isNarrow ? 0 : 12,
    boxShadow: '0 10px 25px rgba(0, 102, 204, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingBottom: 'env(safe-area-inset-bottom)',
    ...(!isNarrow && (position.endsWith('right')
      ? { right: 'max(16px, env(safe-area-inset-right))' }
      : { left: 'max(16px, env(safe-area-inset-left))' })),
    ...(!isNarrow && (position.startsWith('bottom')
      ? { bottom: `calc(max(16px, env(safe-area-inset-bottom)) + ${bottomOffset}px)` }
      : { top: 'max(16px, env(safe-area-inset-top))' })),
  };

  return (
    <>
      {/* FAB (botão flutuante) */}
      {!open && (
        <button
          className="fixed z-50"
          style={fabStyle}
          onClick={startChat}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = CONFIG.colors.primaryHover; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = CONFIG.colors.primary; }}
          aria-label="Abrir chat de suporte"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: 'auto', display: 'block' }}>
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
            <circle cx="8" cy="10" r="1.5" fill={CONFIG.colors.primary}/>
            <circle cx="12" cy="10" r="1.5" fill={CONFIG.colors.primary}/>
            <circle cx="16" cy="10" r="1.5" fill={CONFIG.colors.primary}/>
          </svg>
        </button>
      )}

      {/* Painel do chat */}
      {open && (
        <div className={`fixed z-50 ${isNarrow ? 'inset-0' : ''}`} style={panelStyle}>
          {/* Header */}
          <div
            style={{
              backgroundColor: CONFIG.colors.primary,
              color: '#fff',
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{CONFIG.brand}</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>
                {typing ? 'Digitando…' : 'Online'}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18 }}
              aria-label="Fechar chat"
            >
              ✕
            </button>
          </div>

          {/* Mensagens */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: CONFIG.colors.surface }}>
            {msgs.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div key={m.id} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '8px 12px',
                      borderRadius: 12,
                      fontSize: 14,
                      lineHeight: 1.4,
                      backgroundColor: isUser ? CONFIG.colors.primary : CONFIG.colors.bubble,
                      color: isUser ? '#fff' : CONFIG.colors.text,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Digitando */}
            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: 12,
                    backgroundColor: CONFIG.colors.bubble,
                    color: CONFIG.colors.textMuted,
                    fontSize: 12,
                  }}
                >
                  {CONFIG.greetings.agentName} está digitando…
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8, padding: 12, borderTop: `1px solid ${CONFIG.colors.border}`, background: CONFIG.colors.surface }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem…"
              style={{
                flex: 1,
                padding: '12px 14px',
                border: `1px solid ${CONFIG.colors.border}`,
                borderRadius: 20,
                outline: 'none',
                background: '#fff',
                color: CONFIG.colors.text,
                fontSize: 15,
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: 'none',
                background: input.trim() ? CONFIG.colors.primary : CONFIG.colors.border,
                color: '#fff',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Enviar mensagem"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15.854.146a.5.5 0 01.11.54l-5.819 14.547a.75.75 0 01-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 01.124-1.33L15.314.037a.5.5 0 01.54.11z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
