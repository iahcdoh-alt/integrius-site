'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Configurações inline para evitar problemas de import
const CONFIG = {
  company: {
    name: 'Integrius',
    whatsapp: '+5524998821709',
    email: 'ia.hcdoh@gmail.com',
  },
  assistantNames: [
    'Sofia', 'Ana', 'Carla', 'Beatriz', 'Camila',
    'Diana', 'Fernanda', 'Gabriela', 'Helena', 'Isabela'
  ],
  timing: {
    welcomeToAssistant: 5000,    // 5 segundos
    inactivityWarning: 180000,   // 3 minutos
    inactivityTimeout: 60000,    // 1 minuto adicional após aviso
    typingDelay: 1500,
  },
  messages: {
    welcome: 'Olá! Bem-vindo à Integrius. Seu atendimento já vai começar.',
    inactivityWarning: 'Você ainda está aí? Se não responder em 1 minuto, vou encerrar nosso atendimento.',
    timeout: 'Por inatividade, estou encerrando nosso atendimento. Foi um prazer ajudar! Até logo!',
    priceInquiry: 'Para informações sobre preços e orçamentos, preciso de seus dados para que nossos especialistas entrem em contato. Pode me informar?',
  },
  priceKeywords: [
    'preço', 'precos', 'valor', 'valores', 'custo', 'custos',
    'investimento', 'orçamento', 'orcamento', 'quanto custa'
  ],
  farewellKeywords: [
    'não', 'nao', 'obrigado', 'obrigada', 'tchau', 'até logo', 'ate logo',
    'só isso', 'so isso', 'é só', 'eh so', 'nada mais', 'finalizar',
    'encerrar', 'sair', 'fechar', 'dispensar', 'pode fechar',
    'não preciso', 'nao preciso', 'não quero', 'nao quero'
  ],
  colors: {
    primary: '#0066CC',
    primaryHover: '#0052A3',
    background: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    border: '#E0E0E0',
  },
};

// Tipos básicos
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

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
}

interface WidgetFloatingProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

// Funções auxiliares
const getRandomAssistantName = (): string => {
  const names = CONFIG.assistantNames;
  return names[Math.floor(Math.random() * names.length)];
};

const containsPriceKeywords = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return CONFIG.priceKeywords.some((keyword: string) =>
    lowerText.includes(keyword)
  );
};

const containsFarewellKeywords = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return CONFIG.farewellKeywords.some((keyword: string) =>
    lowerText.includes(keyword)
  );
};

const getAssistantGreeting = (name: string): string =>
  `Oi! Eu sou a ${name}, sua atendente virtual da Integrius. Como posso ajudar você hoje?`;

export default function WidgetFloating({ position = 'bottom-right' }: WidgetFloatingProps) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>({ name: '', phone: '', email: '' });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Posicionamento
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  // Adicionar mensagem do sistema
  const addSystemMessage = useCallback((text: string, type: Message['type'] = 'system') => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser: false,
      timestamp: new Date(),
      type,
    };

    setSession((prev) => prev ? {
      ...prev,
      messages: [...prev.messages, message],
      lastActivity: new Date()
    } : null);
  }, []);

  // Resetar timers de inatividade
  const resetInactivityTimer = useCallback(() => {
    console.log('🔄 Resetando timer, estado atual:', session?.state);
    
    // Limpar timers existentes
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
      console.log('🗑️ Timer de timeout limpo');
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
      console.log('🗑️ Timer de aviso limpo');
    }

    // Criar novos timers apenas se sessão estiver ativa
    if (session?.state === 'active') {
      console.log('⏰ Criando timer de aviso (10 segundos)');
      
      // Timer de aviso (10 segundos para teste)
      warningTimerRef.current = setTimeout(() => {
        console.log('⚠️ AVISO: 10 segundos passaram - mostrando aviso');
        addSystemMessage(CONFIG.messages.inactivityWarning);
        setSession((prev) => prev ? { ...prev, state: 'warning' } : null);
        
        console.log('⏰ Criando timer de timeout (5 segundos após aviso)');
        // Timer de timeout (5 segundos adicional após aviso)
        inactivityTimerRef.current = setTimeout(() => {
          console.log('💥 TIMEOUT: 15 segundos total - desconectando!');
          addSystemMessage(CONFIG.messages.timeout);
          setSession((prev) => prev ? { ...prev, state: 'timeout' } : null);
          setTimeout(() => {
            console.log('👋 Fechando widget');
            setIsOpen(false);
          }, 3000);
        }, CONFIG.timing.inactivityTimeout);
        
      }, CONFIG.timing.inactivityWarning);
    }
  }, [session?.state, addSystemMessage]);

  // Adicionar mensagem do usuário
  const addUserMessage = useCallback((text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
      type: 'user',
    };

    setSession((prev) => prev ? {
      ...prev,
      messages: [...prev.messages, message],
      lastActivity: new Date(),
      state: 'active' // Voltar para ativo se estava em warning
    } : null);

    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Simular resposta da assistente
  const simulateAssistantResponse = useCallback((userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      // Verificar se é despedida
      if (containsFarewellKeywords(userMessage)) {
        const farewellResponses = [
          'Foi um prazer atender você! Se precisar de mais alguma coisa sobre a Integrius, estarei sempre aqui. Tenha um ótimo dia!',
          'Obrigada pelo contato! Fico feliz em ter ajudado. Até a próxima!',
          'Que bom que pude ajudar! Se surgir alguma dúvida sobre nossos serviços, é só voltar aqui. Até logo!',
          'Perfeito! Foi um prazer conversar com você. A Integrius está sempre à disposição. Até mais!'
        ];
        
        const randomFarewell = farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
        addSystemMessage(randomFarewell, 'assistant');
        
        // Finalizar sessão após 3 segundos
        setTimeout(() => {
          setSession((prev) => prev ? { ...prev, state: 'ended' } : null);
          setTimeout(() => setIsOpen(false), 2000);
        }, 3000);
        return;
      }

      // Verificar se é pergunta sobre preços
      if (containsPriceKeywords(userMessage)) {
        addSystemMessage(CONFIG.messages.priceInquiry, 'lead-request');
        setShowLeadForm(true);
        return;
      }

      // Resposta padrão (será substituída pela IA)
      const responses = [
        'Obrigada por sua pergunta! A Integrius é especializada em automação inteligente com IA.',
        'Desenvolvemos soluções personalizadas com n8n e tecnologias modernas como Node.js e React.',
        'Nossos serviços incluem automação de processos, desenvolvimento de sites e integração com IA.',
        'Ficou com alguma dúvida específica sobre nossos serviços?',
        'Posso te ajudar com informações sobre automação, desenvolvimento de sites ou nossa tecnologia!',
        'A Integrius une IA com as melhores tecnologias do mercado. O que gostaria de saber?'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addSystemMessage(randomResponse, 'assistant');
    }, CONFIG.timing.typingDelay);
  }, [addSystemMessage]);

  // Iniciar nova sessão
  const startNewSession = useCallback(() => {
    const assistantName = getRandomAssistantName();
    const newSession: ChatSession = {
      id: Date.now().toString(),
      assistantName,
      startTime: new Date(),
      lastActivity: new Date(),
      messages: [],
      state: 'welcome',
      leadCaptured: false,
    };

    setSession(newSession);
    setIsOpen(true);

    // Mensagem de boas-vindas
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: CONFIG.messages.welcome,
        isUser: false,
        timestamp: new Date(),
        type: 'system',
      };

      setSession((prev) => prev ? {
        ...prev,
        messages: [welcomeMessage],
        state: 'welcome'
      } : null);

      // Transição para atendente após 5 segundos
      setTimeout(() => {
        const assistantGreeting: Message = {
          id: 'assistant-greeting',
          text: getAssistantGreeting(assistantName),
          isUser: false,
          timestamp: new Date(),
          type: 'assistant',
        };

        setSession((prev) => prev ? {
          ...prev,
          messages: [...prev.messages, assistantGreeting],
          state: 'active'
        } : null);
      }, CONFIG.timing.welcomeToAssistant);
    }, 500);
  }, []);

  // Enviar mensagem
  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim() || !session) return;
    if (session.state !== 'active' && session.state !== 'warning') return;

    const messageText = inputText.trim();
    setInputText('');

    addUserMessage(messageText);
    simulateAssistantResponse(messageText);
  }, [inputText, session, addUserMessage, simulateAssistantResponse]);

  // Enviar dados de lead
  const handleLeadSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!leadForm.name || (!leadForm.phone && !leadForm.email)) {
      alert('Por favor, preencha pelo menos nome e telefone ou email.');
      return;
    }

    console.log('Lead capturado:', leadForm);

    setShowLeadForm(false);
    setSession((prev) => prev ? { ...prev, leadCaptured: true } : null);

    addSystemMessage(
      `Obrigada, ${leadForm.name}! Nossos especialistas entrarão em contato em breve. ` +
      `Posso ajudar com mais alguma coisa sobre a Integrius?`,
      'assistant'
    );

    setLeadForm({ name: '', phone: '', email: '' });
  }, [leadForm, addSystemMessage]);

  // Scroll para o final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.messages]);

  // Inicializar timers quando sessão fica ativa
  useEffect(() => {
    if (session?.state === 'active') {
      resetInactivityTimer();
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };
  }, [session?.state]);

  return (
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={startNewSession}
          className={`fixed ${positionClasses[position]} z-50`}
          style={{
            backgroundColor: CONFIG.colors.primary,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0, 102, 204, 0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = CONFIG.colors.primaryHover;
            target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = CONFIG.colors.primary;
            target.style.transform = 'scale(1)';
          }}
          aria-label="Abrir chat de suporte"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ margin: 'auto', display: 'block' }}
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
              fill="white"
            />
            <circle cx="8" cy="10" r="1.5" fill={CONFIG.colors.primary} />
            <circle cx="12" cy="10" r="1.5" fill={CONFIG.colors.primary} />
            <circle cx="16" cy="10" r="1.5" fill={CONFIG.colors.primary} />
          </svg>
        </button>
      )}

      {/* Janela do chat */}
      {isOpen && session && (
        <div
          className={`fixed ${positionClasses[position]} z-50`}
          style={{
            width: '380px',
            height: '600px',
            backgroundColor: CONFIG.colors.background,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 102, 204, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: CONFIG.colors.primary,
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                {CONFIG.company.name}
              </h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                {session.state === 'active' ? `${session.assistantName} - Online` : 'Conectando...'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>

          {/* Formulário de Lead */}
          {showLeadForm && (
            <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderBottom: `1px solid ${CONFIG.colors.border}` }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: CONFIG.colors.text }}>
                Dados para contato:
              </h4>
              <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${CONFIG.colors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                  required
                />
                <input
                  type="tel"
                  placeholder="WhatsApp"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${CONFIG.colors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${CONFIG.colors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: CONFIG.colors.primary,
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Enviar
                </button>
              </form>
            </div>
          )}

          {/* Mensagens */}
          <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
            {session.messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    backgroundColor: message.isUser
                      ? CONFIG.colors.primary
                      : '#f1f3f4',
                    color: message.isUser ? 'white' : CONFIG.colors.text,
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Indicador de digitação */}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#f1f3f4',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: CONFIG.colors.textLight }}>
                    {session.assistantName} está digitando...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensagem */}
          {(session.state === 'active' || session.state === 'warning') && !showLeadForm && (
            <div style={{ padding: '16px', borderTop: `1px solid ${CONFIG.colors.border}` }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: `1px solid ${CONFIG.colors.border}`,
                    borderRadius: '20px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  style={{
                    backgroundColor: inputText.trim() ? CONFIG.colors.primary : CONFIG.colors.border,
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M15.854.146a.5.5 0 01.11.54l-5.819 14.547a.75.75 0 01-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 01.124-1.33L15.314.037a.5.5 0 01.54.11z" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* Mensagem quando chat finalizado */}
          {session.state === 'ended' && (
            <div style={{
              padding: '16px',
              borderTop: `1px solid ${CONFIG.colors.border}`,
              textAlign: 'center',
              backgroundColor: '#f8f9fa'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: CONFIG.colors.textLight,
                fontStyle: 'italic'
              }}>
                Atendimento finalizado. Feche a janela ou inicie um novo chat.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}