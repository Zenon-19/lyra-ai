// StreamingAssistantResponse.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface StreamingAssistantResponseProps {
  isTyping: boolean;
}

const StreamingAssistantResponse: React.FC<StreamingAssistantResponseProps> = ({ isTyping }) => {
  if (!isTyping) return null;
  return (
    <motion.div
      className="flex items-center gap-2 mt-2 mb-4 self-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-3 h-3 rounded-full bg-deepred animate-bounce" />
      <div className="w-3 h-3 rounded-full bg-deepred animate-bounce delay-150" />
      <div className="w-3 h-3 rounded-full bg-deepred animate-bounce delay-300" />
      <span className="ml-2 text-charcoal text-xs">Lyra is typing…</span>
    </motion.div>
  );
};

export default StreamingAssistantResponse;
