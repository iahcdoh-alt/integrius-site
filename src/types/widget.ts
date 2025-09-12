// src/types/widget.ts
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'system' | 'assistant' | 'user' | 'lead-request';
}

export interface LeadData {
  name: string;
  phone?: string;
  email?: string;
  message: string;
  timestamp: Date;
}

export type WidgetState = 
  | 'closed'           // Widget fechado
  | 'opening'          // Animação de abertura  
  | 'welcome'          // Mensagem de boas-vindas
  | 'active'           // Atendimento ativo
  | 'lead-capture'     // Coletando dados de contato
  | 'warning'          // Aviso de timeout
  | 'timeout'          // Desconectado por inatividade
  | 'ended';           // Atendimento finalizado

export interface ChatSession {
  id: string;
  assistantName: string;
  startTime: Date;
  lastActivity: Date;
  messages: Message[];
  state: WidgetState;
  leadCaptured: boolean;
}

export interface WidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  customColors?: {
    primary?: string;
    background?: string;
    text?: string;
  };
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
}

export interface APIResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

export interface ChatResponse extends APIResponse {
  answer?: string;
  requiresLead?: boolean;
  outOfScope?: boolean;
}

export interface NotificationPayload {
  type: 'lead' | 'support';
  leadData?: LeadData;
  chatHistory?: Message[];
  timestamp: Date;
}