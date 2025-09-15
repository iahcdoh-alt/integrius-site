'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ======================
   Configuração
   ====================== */
const CONFIG = {
  company: {
    name: 'Integrius',
    whatsapp: '+5524998821709',
    email: 'ia.hcdoh@gmail.com',
  },
  assistantNames: [
    'Sofia','Ana','Carla','Beatriz','Camila',
    'Diana','Fernanda','Gabriela','Helena','Isabela'
  ],
  timing: {
    welcomeToAssistant: 5000,   // 5s da tela de boas-vindas até a atendente
    inactivityWarning: 180000,  // 3 min
    inactivityTimeout: 60000,   // +1 min após o aviso
    typingDelay: 1200,          // efeito visual
    requestTimeoutMs: 25000,    // timeout do fetch
  },
  messages: {
    welcome: 'Olá! Bem-vindo à Integrius. Seu atendimento já vai começar.',
    inactivityWarning: 'Você ainda está aí? Se não responder em 1 minuto, vou encerrar nosso atendimento.',
    timeout: 'Por inatividade, estou encerrando nosso atendimento. Foi um prazer ajudar! Até logo!',
    priceInquiry: 'Para informações sobre preços e orçamentos, preciso de seus dados para que nossos especialistas entrem em contato. Pode me informar?',
    fallbackError: 'Não consegui conectar agora. Você pode tentar novamente ou falar pelo WhatsApp 😉',
  },
  priceKeywords: ['preço','precos','valor','valores','custo','custos','investimento','orçamento','orcamento','quanto custa'],
  farewellKeywords: ['não','nao','obrigado','obrigada','tchau','até logo','ate logo','só isso','so isso','é só','eh so','nada mais','finalizar','encerrar','sair','fechar','dispensar','não preciso','nao preciso','não quero','nao quero'],
  colors: {
    primary: '#0066CC',
    primaryHover: '#0052A3',
    background: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    border: '#E0E0E0',
  },
};

/* ======================
   Tipos
   ====================== */
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'system' | 'assistant' | 'user' | 'lead-request';
}

interface ChatSession {
  id: string;
  assistantName: string;
  startTime: Date;
  lastActivity: Date;
  messages: Message[];
  state: 'welcome' | 'active' | 'warning' | 'timeout' | 'ended';
  leadCaptured: boolean;
}

interface LeadFormData { name: string; phone: string; email: string; }

interface WidgetFloatingProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

/* ======================
   Helpers
   ====================== */
const getRandomAssistantName = (): string => {
  const names = CONFIG.assistantNames;
  const idx = Math.floor(Math.random() * (names?.length ?? 0));
  return names?.[idx] ?? 'Sofia'; // fallback seguro
};

const containsPriceKeywords = (t: string) =>
  CONFIG.priceKeywords.some(k => t.toLowerCase().includes(k));

const containsFarewellKeywords = (t: string) =>
  CONFIG.farewellKeywords.some(k => t.toLowerCase().includes(k));

const getAssistantGreeting = (name: string) =>
  `Oi! Eu sou a ${name}, sua atendente virtual da Integrius. Como posso ajudar você hoje?`;

/* ======================
   Componente
   ====================== */
export default function WidgetFloating({ position = 'bottom-right' }: WidgetFloatingProps) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>({ name: '', phone: '', email: '' });

  // responsividade / teclado
  const [bottomOffset, setBottomOffset] = useState(0);
  const [isNarrow, setIsNarrow] = useState(false);

  // reconexão
  const [canReconnect, setCanReconnect] = useState(false);
  const pendingQuestionRef = useRef<string | null>(null);

  // refs e timers
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left' : 'bottom-4 left-4',
    'top-right'   : 'top-4 right-4',
    'top-left'    : 'top-4 left-4',
  };

  /* ===== mensagens utilitárias ===== */
  const addSystemMessage = useCallback((text: string, type: Message['type'] = 'system') => {
    const msg: Message = { id: String(Date.now()), text, isUser: false, timestamp: new Date(), type };
    setSession(prev => prev ? { ...prev, messages: [...prev.messages, msg], lastActivity: new Date() } : prev);
  }, []);

  const addAssistantMessage = useCallback((text: string) => {
    addSystemMessage(text, 'assistant');
  }, [addSystemMessage]);

  const addUserMessage = useCallback((text: string) => {
    const msg: Message = { id: String(Date.now()), text, isUser: true, timestamp: new Date(), type: 'user' };
    setSession(prev => prev ? {
      ...prev,
      messages: [...prev.messages, msg],
      lastActivity: new Date(),
      state: 'active'
    } : prev);
  }, []);

  /* ===== timers de inatividade ===== */
  const clearInactivity = () => {
    if (warningTimerRef.current) { clearTimeout(warningTimerRef.current); warningTimerRef.current = null; }
    if (inactivityTimerRef.current) { clearTimeout(inactivityTimerRef.current); inactivityTimerRef.current = null; }
  };

  const resetInactivityTimer = useCallback(() => {
    clearInactivity();
    if (session?.state === 'active') {
      warningTimerRef.current = setTimeout(() => {
        addSystemMessage(CONFIG.messages.inactivityWarning);
        setSession(prev => prev ? { ...prev, state: 'warning' } : prev);

        inactivityTimerRef.current = setTimeout(() => {
          addSystemMessage(CONFIG.messages.timeout);
          setSession(prev => prev ? { ...prev, state: 'timeout' } : prev);
          setTimeout(() => setIsOpen(false), 3000);
        }, CONFIG.timing.inactivityTimeout);
      }, CONFIG.timing.inactivityWarning);
    }
  }, [session?.state, addSystemMessage]);

  /* ===== chamada ao backend com timeout + retry ===== */
  async function askBackend(question: string) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.timing.requestTimeoutMs);
    let lastErr: unknown;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch('/api/qa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data as { answer: string; sources?: string[]; lowConfidence?: boolean; policyRefusal?: boolean; };
      } catch (e) {
        lastErr = e;
        await new Promise(r => setTimeout(r, attempt * 800)); // pequeno backoff
      }
    }
    throw lastErr;
  }

  /* ===== envio de mensagem ===== */
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !session) return;
    if (session.state !== 'active' && session.state !== 'warning') return;

    const messageText = inputText.trim();
    setInputText('');
    addUserMessage(messageText);
    resetInactivityTimer();

    // despedidas → encerra sem bater na IA
    if (containsFarewellKeywords(messageText)) {
      const farewell = [
        'Foi um prazer atender você! Se precisar de mais alguma coisa sobre a Integrius, estarei sempre aqui. Tenha um ótimo dia!',
        'Obrigada pelo contato! Fico feliz em ter ajudado. Até a próxima!',
        'Que bom que pude ajudar! Se surgir alguma dúvida sobre nossos serviços, é só voltar aqui. Até logo!',
        'Perfeito! Foi um prazer conversar com você. A Integrius está sempre à disposição. Até mais!'
      ];
      addAssistantMessage(farewell[Math.floor(Math.random() * farewell.length)]);
      setTimeout(() => setSession(prev => prev ? { ...prev, state: 'ended' } : prev), 1200);
      setTimeout(() => setIsOpen(false), 3000);
      return;
    }

    // orçamento/preço → lead form
    if (containsPriceKeywords(messageText)) {
      addSystemMessage(CONFIG.messages.priceInquiry, 'lead-request');
      setShowLeadForm(true);
      return;
    }

    // IA
    setIsTyping(true);
    pendingQuestionRef.current = messageText;
    try {
      const data = await askBackend(messageText);
      setIsTyping(false);
      pendingQuestionRef.current = null;

      if (data?.answer) addAssistantMessage(data.answer);
      if (data?.lowConfidence) {
        addAssistantMessage('Se preferir, posso te encaminhar para nosso WhatsApp para um atendimento humano.');
      }
    } catch {
      setIsTyping(false);
      addAssistantMessage(
        CONFIG.messages.fallbackError +
        `\n\n☎️ WhatsApp: https://wa.me/${CONFIG.company.whatsapp.replace('+','')}`
      );
      setCanReconnect(true); // deixamos pendente para tentar novamente
    }
  }, [inputText, session, addUserMessage, addAssistantMessage, resetInactivityTimer]);

  /* ===== lead ===== */
  const handleLeadSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || (!leadForm.phone && !leadForm.email)) {
      alert('Por favor, preencha pelo menos nome e telefone ou email.');
      return;
    }
    setShowLeadForm(false);
    setSession(prev => prev ? { ...prev, leadCaptured: true } : prev);
    addAssistantMessage(`Obrigada, ${leadForm.name}! Nossos especialistas entrarão em contato em breve. Posso ajudar com mais alguma coisa sobre a Integrius?`);
    setLeadForm({ name: '', phone: '', email: '' });
  }, [leadForm, addAssistantMessage]);

  /* ===== sessão / boas-vindas ===== */
  const startNewSession = useCallback(() => {
    const assistantName = getRandomAssistantName();
    const newSession: ChatSession = {
      id: String(Date.now()),
      assistantName,
      startTime: new Date(),
      lastActivity: new Date(),
      messages: [],
      state: 'welcome',
      leadCaptured: false,
    };
    setSession(newSession);
    setIsOpen(true);

    setTimeout(() => {
      const welcome: Message = { id: 'welcome', text: CONFIG.messages.welcome, isUser: false, timestamp: new Date(), type: 'system' };
      setSession(prev => prev ? { ...prev, messages: [welcome], state: 'welcome' } : prev);

      setTimeout(() => {
        const greet: Message = { id: 'assistant-greeting', text: getAssistantGreeting(assistantName), isUser: false, timestamp: new Date(), type: 'assistant' };
        setSession(prev => prev ? { ...prev, messages: [...prev.messages, greet], state: 'active' } : prev);
      }, CONFIG.timing.welcomeToAssistant);
    }, 400);
  }, []);

  /* ===== efeitos ===== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.messages, isTyping]);

  useEffect(() => {
    if (session?.state === 'active') resetInactivityTimer();
    return () => clearInactivity();
  }, [session?.state, resetInactivityTimer]);

  // responsividade / tela estreita
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth <= 380);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // teclado móvel (visualViewport)
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

  // reconectar quando voltar rede/aba
  useEffect(() => {
    const onOnline = () => setCanReconnect(true);
    const onVisible = () => { if (document.visibilityState === 'visible') setCanReconnect(true); };
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    if (canReconnect && pendingQuestionRef.current) {
      const q = pendingQuestionRef.current;
      setCanReconnect(false);
      (async () => {
        setIsTyping(true);
        try {
          const data = await askBackend(q);
          setIsTyping(false);
          pendingQuestionRef.current = null;
          if (data?.answer) addAssistantMessage(data.answer);
        } catch {
          setIsTyping(false);
        }
      })();
    }
  }, [canReconnect, addAssistantMessage]);

  /* ======================
     Render
     ====================== */
  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button
          onClick={startNewSession}
          className="fixed z-50"
          style={{
            // respeita safe-area
            ...(position.endsWith('right')
              ? { right: 'max(16px, env(safe-area-inset-right))' }
              : { left:  'max(16px, env(safe-area-inset-left))'  }),
            ...(position.startsWith('bottom')
              ? { bottom: 'max(16px, env(safe-area-inset-bottom))' }
              : { top:    'max(16px, env(safe-area-inset-top))'    }),
            width: 60, height: 60,
            borderRadius: '50%',
            backgroundColor: CONFIG.colors.primary,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0, 102, 204, 0.15)',
            transition: 'all .25s ease',
          }}
          onMouseEnter={(e) => { const t = e.currentTarget; t.style.backgroundColor = CONFIG.colors.primaryHover; t.style.transform = 'scale(1.08)'; }}
          onMouseLeave={(e) => { const t = e.currentTarget; t.style.backgroundColor = CONFIG.colors.primary;      t.style.transform = 'scale(1)'; }}
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

      {/* Janela do chat */}
      {isOpen && session && (
        <div
          className={`fixed z-50 ${isNarrow ? 'inset-0' : ''}`}
          style={{
            width:  isNarrow ? '100vw' : 'clamp(320px, 92vw, 420px)',
            height: isNarrow ? '100vh' : 'clamp(360px, 78vh, 86vh)',
            backgroundColor: CONFIG.colors.background,
            borderRadius: isNarrow ? 0 : 12,
            boxShadow: '0 10px 25px rgba(0, 102, 204, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            // respeita safe-area quando não está em full
            ...(!isNarrow && (position.endsWith('right')
              ? { right: 'max(16px, env(safe-area-inset-right))' }
              : { left:  'max(16px, env(safe-area-inset-left))'  })),
            ...(!isNarrow && (position.startsWith('bottom')
              ? { bottom: `calc(max(16px, env(safe-area-inset-bottom)) + ${bottomOffset}px)` }
              : { top:    'max(16px, env(safe-area-inset-top))' })),
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {/* Header */}
          <div style={{
            backgroundColor: CONFIG.colors.primary, color: '#fff',
            padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 600 }}>{CONFIG.company.name}</h3>
              <p style={{ margin: 0, fontSize: 12, opacity: .9 }}>
                {session.state === 'active' ? `${session.assistantName} - Online` : 'Conectando...'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4, borderRadius: 4 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>

          {/* Form de Lead */}
          {showLeadForm && (
            <div style={{ padding: 16, backgroundColor: '#f8f9fa', borderBottom: `1px solid ${CONFIG.colors.border}` }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: CONFIG.colors.text }}>Dados para contato:</h4>
              <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  type="text" placeholder="Seu nome *" value={leadForm.name}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  style={{ padding: '10px 12px', border: `1px solid ${CONFIG.colors.border}`, borderRadius: 8, fontSize: 14, color: '#111', background: '#fff' }}
                  required
                />
                <input
                  type="tel" placeholder="WhatsApp" value={leadForm.phone}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                  style={{ padding: '10px 12px', border: `1px solid ${CONFIG.colors.border}`, borderRadius: 8, fontSize: 14, color: '#111', background: '#fff' }}
                />
                <input
                  type="email" placeholder="E-mail" value={leadForm.email}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                  style={{ padding: '10px 12px', border: `1px solid ${CONFIG.colors.border}`, borderRadius: 8, fontSize: 14, color: '#111', background: '#fff' }}
                />
                <button type="submit" style={{
                  backgroundColor: CONFIG.colors.primary, color: '#fff', border: 'none',
                  padding: '10px 16px', borderRadius: 8, fontSize: 14, cursor: 'pointer'
                }}>
                  Enviar
                </button>
              </form>
            </div>
          )}

          {/* Mensagens */}
          <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
            {session.messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.isUser ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                <div style={{
                  maxWidth: '80%', padding: '8px 12px', borderRadius: 12, fontSize: 14, lineHeight: 1.4,
                  backgroundColor: m.isUser ? CONFIG.colors.primary : '#f1f3f4',
                  color: m.isUser ? '#fff' : CONFIG.colors.text,
                  wordBreak: 'break-word',
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                <div style={{ padding: '8px 12px', borderRadius: 12, backgroundColor: '#f1f3f4', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: CONFIG.colors.textLight }}>
                    {session.assistantName} está digitando...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {(session.state === 'active' || session.state === 'warning') && !showLeadForm && (
            <div style={{ padding: 12, borderTop: `1px solid ${CONFIG.colors.border}` }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    border: `1px solid ${CONFIG.colors.border}`,
                    borderRadius: 20,
                    fontSize: 15,
                    outline: 'none',
                    color: '#111',
                    background: '#fff',
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  style={{
                    backgroundColor: inputText.trim() ? CONFIG.colors.primary : CONFIG.colors.border,
                    color: '#fff', border: 'none', borderRadius: '50%',
                    width: 42, height: 42, cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M15.854.146a.5.5 0 01.11.54l-5.819 14.547a.75.75 0 01-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 01.124-1.33L15.314.037a.5.5 0 01.54.11z" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* Encerrado */}
          {session.state === 'ended' && (
            <div style={{ padding: 16, borderTop: `1px solid ${CONFIG.colors.border}`, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
              <p style={{ margin: 0, fontSize: 14, color: CONFIG.colors.textLight, fontStyle: 'italic' }}>
                Atendimento finalizado. Feche a janela ou inicie um novo chat.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}