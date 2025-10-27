
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { chatWithBot } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SendIcon, CloseIcon, BrainIcon, LoaderIcon, BotIcon } from './icons';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await chatWithBot(messages, input, isThinkingMode);
      setMessages(prev => [...prev, { role: 'model', content: botResponse }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, isThinkingMode]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-6 w-full max-w-md h-[70vh] flex flex-col bg-secondary shadow-2xl rounded-lg border border-highlight z-50">
      <header className="flex items-center justify-between p-4 border-b border-highlight">
        <h3 className="text-lg font-bold text-text-primary">AI Assistant</h3>
        <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsThinkingMode(!isThinkingMode)}
              className={`flex items-center space-x-2 p-2 rounded-md transition-colors text-xs ${isThinkingMode ? 'bg-accent/80 text-primary' : 'bg-highlight text-text-secondary hover:bg-highlight/70'}`}
              title={isThinkingMode ? "Disable Thinking Mode (Faster, less powerful)" : "Enable Thinking Mode (Slower, more powerful)"}
            >
              <BrainIcon size={4} />
              <span>{isThinkingMode ? 'Thinking On' : 'Thinking Off'}</span>
            </button>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
              <CloseIcon />
            </button>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && <div className="flex-shrink-0 bg-accent text-primary rounded-full p-2"><BotIcon size={4} /></div>}
            <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-accent text-primary rounded-br-none' : 'bg-highlight text-text-secondary rounded-bl-none'}`}>
              <p className="text-sm break-words">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                <div className="flex-shrink-0 bg-accent text-primary rounded-full p-2"><BotIcon size={4}/></div>
                <div className="bg-highlight rounded-2xl rounded-bl-none px-4 py-3">
                    <LoaderIcon size={4} />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-highlight">
        <div className="flex items-center bg-highlight rounded-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="w-full bg-transparent p-3 focus:outline-none text-text-secondary"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 text-accent disabled:text-gray-500"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
