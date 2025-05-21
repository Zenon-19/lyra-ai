// MainChat.tsx
import { useRef, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import InputBar from './InputBar';
import StreamingAssistantResponse from './StreamingAssistantResponse';
import { useChatStore } from '../store/chatStore';

const MainChat: React.FC = () => {
  const { messages, isTyping, addMessage, setIsTyping } = useChatStore();
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    addMessage(text, 'user');
    setIsTyping(true);

    // Simulate Lyra response
    setTimeout(() => {
      addMessage(`You said: **${text}**\n\nI can help you with that! 😊`, 'lyra');
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);
  return (
    <main className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4">
        <ChatHistory messages={messages} />
        <StreamingAssistantResponse isTyping={isTyping} />
      </div>
      <div className="border-t border-gray-200 bg-white p-2 shadow-sm">
        <InputBar onSend={handleSend} />
      </div>
    </main>
  );
};

export default MainChat;
