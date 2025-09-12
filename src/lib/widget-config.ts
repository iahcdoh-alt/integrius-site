// src/lib/widget-config.ts
export const WIDGET_CONFIG = {
  // Configurações da empresa
  company: {
    name: 'Integrius',
    whatsapp: '+5524998821709',
    email: 'ia.hcdoh@gmail.com',
  },

  // Nomes para a atendente virtual
  assistantNames: [
    'Sofia', 'Ana', 'Carla', 'Beatriz', 'Camila',
    'Diana', 'Fernanda', 'Gabriela', 'Helena', 'Isabela',
    'Julia', 'Larissa', 'Marina', 'Natália', 'Patrícia'
  ],

  // Tempos em milissegundos
  timing: {
    welcomeToAssistant: 5000,      // 5 segundos para transição
    inactivityWarning: 180000,     // 3 minutos - aviso
    inactivityTimeout: 240000,     // 4 minutos - desconexão
    typingDelay: 1500,             // Simular digitação
  },

  // Mensagens padrão
  messages: {
    welcome: 'Olá! Bem-vindo à Integrius. Seu atendimento já vai começar.',
    getAssistantGreeting: (name: string) => 
      `Oi! Eu sou a ${name}, sua atendente virtual da Integrius. Como posso ajudar você hoje?`,
    outOfScope: 'Desculpe, eu posso ajudar apenas com questões sobre a Integrius, nossos produtos e serviços. Posso esclarecer algo sobre nossa empresa?',
    inactivityWarning: 'Você ainda está aí? Se não responder em 1 minuto, vou encerrar nosso atendimento.',
    timeout: 'Por inatividade, estou encerrando nosso atendimento. Foi um prazer ajudar! Até logo!',
    priceInquiry: 'Para informações sobre preços e orçamentos, preciso de seus dados para que nossos especialistas entrem em contato. Pode me informar?',
  },

  // Palavras-chave para captura de leads
  priceKeywords: [
    'preço', 'precos', 'valor', 'valores', 'custo', 'custos',
    'investimento', 'orçamento', 'orcamento', 'quanto custa',
    'quanto fica', 'tabela de preços', 'cotação', 'cotacao'
  ],

  // Tópicos permitidos (para validação de escopo)
  allowedTopics: [
    'integrius', 'automação', 'automacao', 'n8n', 'fluxos',
    'sites', 'desenvolvimento', 'ia', 'inteligencia artificial',
    'serviços', 'servicos', 'produtos', 'tecnologia', 'node.js',
    'react', 'next.js', 'vercel', 'github', 'git'
  ],

  // Cores da Integrius
  colors: {
    primary: '#0066CC',
    primaryHover: '#0052A3',
    secondary: '#00AA66',
    background: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    border: '#E0E0E0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },

  // Configurações de estilo
  style: {
    borderRadius: '12px',
    shadow: '0 10px 25px rgba(0, 102, 204, 0.15)',
    maxWidth: '380px',
    maxHeight: '600px',
  }
} as const;

// Função para obter nome aleatório da atendente
export const getRandomAssistantName = (): string => {
  const names = WIDGET_CONFIG.assistantNames;
  return names[Math.floor(Math.random() * names.length)];
};

// Função para verificar se contém palavras-chave de preço
export const containsPriceKeywords = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return WIDGET_CONFIG.priceKeywords.some(keyword => 
    lowerText.includes(keyword)
  );
};

// Função para verificar se está no escopo
export const isInScope = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return WIDGET_CONFIG.allowedTopics.some(topic => 
    lowerText.includes(topic)
  );
};