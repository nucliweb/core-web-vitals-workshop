import { useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { tagging } from '@/lib/analytics';
import { X, Send } from 'lucide-react';

interface ChatMessage {
  message: string;
  sentTime: string;
  sender: 'user' | 'bot';
  direction: 'incoming' | 'outgoing';
}

interface ChatBotProps {
  onClose: () => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  message: "¡Hola! Soy el asistente virtual de la tienda. ¿En qué puedo ayudarte?",
  sentTime: new Date().toLocaleTimeString(),
  sender: 'bot',
  direction: 'incoming',
};

const FAQ_RESPONSES: Record<string, string> = {
  envio: "Nuestros envíos suelen tardar entre 2-4 días laborables. Ofrecemos envío gratuito en pedidos superiores a 50€.",
  devolucion: "Tienes 30 días para devolver tu pedido. La devolución es gratuita en nuestras tiendas o con nuestra etiqueta de envío.",
  pago: "Aceptamos tarjetas de crédito/débito, PayPal y pago contra reembolso.",
  talla: "Puedes encontrar nuestra guía de tallas en cada página de producto. Si tienes dudas específicas, indícame el producto.",
  stock: "Si un producto está agotado, puedes registrarte para recibir una notificación cuando vuelva a estar disponible.",
};

export function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (message: string) => {
    const newMessage: ChatMessage = {
      message,
      sentTime: new Date().toLocaleTimeString(),
      sender: 'user',
      direction: 'outgoing',
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Track chat interaction
    tagging.storeEvent({
      type: 'chat_interaction',
      timestamp: Date.now(),
      path: window.location.pathname,
      message,
    });

    // Simulate bot response
    setTimeout(() => {
      const response = generateResponse(message.toLowerCase());
      const botResponse: ChatMessage = {
        message: response,
        sentTime: new Date().toLocaleTimeString(),
        sender: 'bot',
        direction: 'incoming',
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (message: string): string => {
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
      if (message.includes(keyword)) {
        return response;
      }
    }

    // Default response if no keyword matches
    return "Lo siento, no he entendido tu pregunta. ¿Podrías reformularla? Puedo ayudarte con envíos, devoluciones, pagos, tallas y disponibilidad de stock.";
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 h-[500px] w-[350px] rounded-lg border bg-white shadow-lg">
      {/* Custom header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-semibold">Asistente Virtual</span>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Cerrar chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator={isTyping ? <TypingIndicator /> : null}>
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Escribe tu mensaje aquí..."
            onSend={handleSend}
            attachButton={false}
            sendButton={true}
            sendButtonProps={{
              children: <Send className="h-5 w-5" />,
            }}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
