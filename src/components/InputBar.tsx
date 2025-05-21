// InputBar.tsx
import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';

interface InputBarProps {
  onSend: (text: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(1);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSend(input.trim());
        setInput('');
        setRows(1);
      }
    } else if (e.key === 'e' && e.ctrlKey) {
      e.preventDefault();
      setShowEmoji(prev => !prev);
    } else if (e.key === 'v' && e.ctrlKey && e.altKey) {
      e.preventDefault();
      toggleVoiceRecording();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const lines = e.target.value.split('\n').length;
    setRows(Math.min(5, Math.max(1, lines)));
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const cursor = textareaRef.current?.selectionStart || input.length;
    const newInput = input.slice(0, cursor) + emojiData.emoji + input.slice(cursor);
    setInput(newInput);
    setShowEmoji(false);
    textareaRef.current?.focus();
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput(prev => prev + " [Voice message placeholder]");
      }, 2000);
    }
  };

  return (
    <div className="relative flex items-end gap-2 p-2 glass-effect">
      <motion.div 
        className="flex-1 relative"
        animate={{ height: `${Math.max(40, rows * 24)}px` }}
      >        <textarea
          ref={textareaRef}
          className="absolute inset-0 w-full resize-none rounded-xl border border-gray-200 p-2 pr-20
            focus:outline-none focus:ring-2 focus:ring-[#8AB9CE]/50 bg-white text-[#222222] placeholder-[#6B7280]"
          placeholder="Message Lyra..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={rows}
          style={{ minHeight: '40px' }}
        />
        <div className="absolute right-2 bottom-2 flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 hover:bg-[#F9FAFB] rounded-lg transition-colors text-[#6B7280] hover:text-[#8AB9CE]"
            onClick={() => setShowEmoji(prev => !prev)}
            title="Add emoji (Ctrl+E)"
          >
            😊
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-1.5 rounded-lg transition-colors ${
              isRecording ? 'text-[#8AB9CE] animate-pulse' : 'text-[#6B7280] hover:text-[#8AB9CE]'
            }`}
            onClick={toggleVoiceRecording}
            title="Voice input (Ctrl+Alt+V)"
          >
            🎤
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showEmoji && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full right-0 mb-2"
          >
            <div className="shadow-xl rounded-lg overflow-hidden">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-black text-white rounded-xl shadow-sm hover:bg-[#1F1F1F] 
          transition-all disabled:opacity-50 disabled:cursor-not-allowed h-10"
        onClick={() => {
          if (input.trim()) {
            onSend(input.trim());
            setInput('');
            setRows(1);
          }
        }}
        disabled={!input.trim()}
      >
        Send
      </motion.button>
    </div>
  );
};

export default InputBar;
