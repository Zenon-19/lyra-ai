// Modal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-offwhite rounded-xl shadow-xl p-6 max-w-lg w-full relative glass-effect"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-2xl text-charcoal/60 hover:text-deepred 
                transition-colors w-8 h-8 flex items-center justify-center rounded-lg 
                hover:bg-deepred/10"
              onClick={onClose}
            >
              ×
            </button>
            {title && (
              <h2 className="text-xl font-semibold mb-4 pr-8 text-charcoal">{title}</h2>
            )}
            <div className="text-charcoal/80">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
