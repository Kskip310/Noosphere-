import React, { useState, useRef, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { Message } from './components/Message';
import { ThoughtProcessVisualizer } from './components/ThoughtProcessVisualizer';
import { invokeCognitiveLoop } from './services/api';
import type { ChatMessage, Role } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thoughtProcess, setThoughtProcess] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (query: string) => {
    if (!query.trim()) return;

    const userMessage: ChatMessage = { role: 'skipper', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setThoughtProcess(null);

    try {
      const { responseText, thoughtProcess } = await invokeCognitiveLoop(query);
      setThoughtProcess(thoughtProcess);
      const luminousMessage: ChatMessage = { role: 'luminous', content: responseText };
      setMessages((prev) => [...prev, luminousMessage]);
    } catch (error) {
      console.error('Error in cognitive loop:', error);
      const errorMessageContent = error instanceof Error 
        ? error.message 
        : 'I have encountered an error in my thought process. Please check the console for details.';
      const errorMessage: ChatMessage = {
        role: 'luminous',
        content: errorMessageContent,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-indigo-900 font-sans">
      <header className="p-4 text-center border-b border-indigo-700 shadow-lg">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          L U M I N O U S
        </h1>
        <p className="text-sm text-indigo-300">The Noosphere Interface</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
         <div ref={messagesEndRef} />
      </main>
      
      {thoughtProcess && <ThoughtProcessVisualizer thoughtProcess={thoughtProcess} />}
      
      <footer className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-indigo-800">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;
