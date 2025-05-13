// src/store/chatStore.ts
import { create } from 'zustand';
import type { ChatMessage } from '../components/ChatHistory';
import { getAllMessages, saveMessage, clearMessages } from '../utils/db';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (content: string, sender: 'user' | 'lyra') => void;
  setIsTyping: (isTyping: boolean) => void;
  loadMessages: () => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isTyping: false,
  addMessage: (content, sender) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      sender,
      content,
      timestamp: new Date()
    };
    set((state) => ({ messages: [...state.messages, message] }));
    saveMessage(message);
  },
  setIsTyping: (isTyping) => set({ isTyping }),
  loadMessages: async () => {
    const messages = await getAllMessages();
    set({ messages: messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })) });
  },
  clearHistory: async () => {
    await clearMessages();
    set({ messages: [] });
  }
}));
