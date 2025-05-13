// MainChat.tsx
import { useRef, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import type { ChatMessage } from './ChatHistory';
import InputBar from './InputBar';
import StreamingAssistantResponse from './StreamingAssistantResponse';
import { useChatStore } from '../store/chatStore';

const MainChat: React.FC = () => {
  const { messages, isTyping, addMessage, setIsTyping } = useChatStore();
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
    };
    addMessage(userMsg);
    setIsTyping(true);

    // Simulate Lyra response
    setTimeout(() => {
      const lyraMsg: ChatMessage = {
        id: Date.now().toString() + '-lyra',
        sender: 'lyra',
        content: `You said: **${text}**\n\nI can help you with that! 😊`,
      };
      addMessage(lyraMsg);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col h-full bg-offwhite">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4">
        <ChatHistory messages={messages} />
        <StreamingAssistantResponse isTyping={isTyping} />
      </div>
      <div className="border-t border-charcoal/10 p-2">
        <InputBar onSend={handleSend} />
      </div>
    </main>
  );
};

export default MainChat;
