// ChatHistory.tsx
import React from 'react';
import Markdown from 'markdown-to-jsx';
import { motion } from 'framer-motion';
import LyraAvatar from './LyraAvatar';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'lyra';
  content: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

const bubbleStyles = {
  user: 'bg-gradient-to-br from-deepred to-deepred/90 text-offwhite self-end',
  lyra: 'bg-gradient-to-br from-charcoal to-charcoal/90 text-offwhite self-start',
};

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.01 },
};

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="flex flex-col gap-4 py-4 px-2">
      {messages.map((msg, i) => (
        <motion.div
          key={msg.id}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={messageVariants}
          transition={{ duration: 0.3, delay: i === messages.length - 1 ? 0 : 0 }}
          className={`relative flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {msg.sender === 'lyra' && (
            <div className="mb-1">
              <LyraAvatar 
                size="sm" 
                mood={msg.content.includes('😊') ? 'happy' : 
                      msg.content.includes('🤔') ? 'thinking' : 
                      msg.content.includes('😟') ? 'concerned' : 'neutral'} 
              />
            </div>
          )}
          
          <div className="flex flex-col max-w-[80%] md:max-w-[70%] group">
            <motion.div
              className={`
                relative rounded-2xl px-4 py-3
                shadow-lg transition-all duration-200
                ${bubbleStyles[msg.sender]}
                ${msg.sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}
                hover:shadow-xl
              `}
            >
              <div className="prose prose-sm prose-invert max-w-none">
                <Markdown 
                  options={{ 
                    forceBlock: true,
                    overrides: {
                      code: {
                        component: ({ children }) => (
                          <code className="bg-black/20 px-1.5 py-0.5 rounded text-sm">{children}</code>
                        )
                      }
                    }
                  }}
                >
                  {msg.content}
                </Markdown>
              </div>
              <div 
                className={`
                  absolute bottom-1 ${msg.sender === 'user' ? 'left-2' : 'right-2'}
                  text-xs opacity-0 group-hover:opacity-60 transition-opacity
                `}
              >
                {formatTime(msg.timestamp)}
              </div>
            </motion.div>
            <span className={`text-xs text-charcoal/60 mt-1 mx-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              {msg.sender === 'lyra' ? 'Lyra AI' : 'You'}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatHistory;
