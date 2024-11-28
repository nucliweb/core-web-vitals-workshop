import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatBot } from './ChatBot';
import { MessageCircle, X } from 'lucide-react';
import { tagging } from '@/lib/analytics';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Track chat open/close
    tagging.storeEvent({
      type: 'chat_toggle',
      timestamp: Date.now(),
      path: window.location.pathname,
      action: !isOpen ? 'open' : 'close'
    });
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
        onClick={toggleChat}
        data-analytics="chat-toggle"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      {isOpen && <ChatBot onClose={toggleChat} />}
    </>
  );
}
