// VoiceInterface.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LyraAvatar from './LyraAvatar';

interface VoiceInterfaceProps {
  onSpeechResult?: (text: string) => void;
  onListeningChange?: (isListening: boolean) => void;
  isProcessing?: boolean;
  avatarColor?: string;
  agentName?: string;
}

const VoiceVisualizer: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const bars = 5;
  
  return (
    <div className="flex items-end justify-center gap-1 h-12">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-white rounded-full"
          initial={{ height: 4 }}
          animate={{ 
            height: isActive 
              ? Math.random() * 24 + 8 // Random height between 8px and 32px when active
              : 4 // Fixed small height when inactive
          }}
          transition={{
            duration: 0.2,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.1 % 0.5, // Staggered animation
          }}
        />
      ))}
    </div>
  );
};

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  onSpeechResult,
  onListeningChange,
  isProcessing = false,
  avatarColor = '#FF5757',
  agentName = 'Lyra'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if browser supports speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setError('');
          if (onListeningChange) onListeningChange(true);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (onListeningChange) onListeningChange(false);
        };
        
        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          // Update the transcript state
          setTranscript(finalTranscript || interimTranscript);
          
          // If we have a final transcript and a callback, send it
          if (finalTranscript && onSpeechResult) {
            onSpeechResult(finalTranscript);
          }
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setError(event.error);
          setIsListening(false);
          if (onListeningChange) onListeningChange(false);
        };
      } else {
        setIsSupported(false);
        setError('Speech recognition is not supported in this browser.');
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onListeningChange, onSpeechResult]);

  const toggleListening = () => {
    if (!isSupported) return;
    
    if (isListening) {
      recognitionRef.current?.abort();
      setIsListening(false);
      if (onListeningChange) onListeningChange(false);
    } else {
      try {
        setTranscript(''); // Clear previous transcript
        recognitionRef.current?.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setError('Failed to start speech recognition.');
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div className="relative">
      {/* Main voice control button */}
      <motion.div 
        className="relative"
        initial={{ scale: 1 }}
        animate={{ 
          scale: isListening ? [1, 1.05, 1] : 1,
          boxShadow: isListening 
            ? [
                '0 0 0 0 rgba(255, 87, 87, 0)',
                '0 0 0 15px rgba(255, 87, 87, 0.2)',
                '0 0 0 0 rgba(255, 87, 87, 0)'
              ] 
            : '0 0 0 0 rgba(255, 87, 87, 0)'
        }}
        transition={{ 
          duration: 2,
          repeat: isListening ? Infinity : 0,
          repeatType: "loop"
        }}
      >
        <button
          onClick={toggleListening}
          disabled={!isSupported || isProcessing}
          className={`relative flex items-center justify-center w-16 h-16 rounded-full ${
            isListening 
              ? 'bg-gradient-to-br from-crimson to-red-500' 
              : isProcessing
                ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
                : 'bg-gradient-to-br from-crimson/80 to-red-400/80 hover:from-crimson hover:to-red-500'
          } text-white shadow-lg transition-all duration-300 ${
            !isSupported ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isListening ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
          ) : isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </motion.div>
      
      {/* Agent avatar and status */}
      <AnimatePresence>
        {(isListening || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 transform -translate-x-1/2 top-24 flex flex-col items-center"
          >
            <div className="mb-2">
              <LyraAvatar size="md" color={avatarColor} name={agentName[0]} />
            </div>
            <div className="text-center">
              <div className="font-semibold text-charcoal">{agentName}</div>
              <div className="text-sm text-charcoal/70">
                {isListening ? 'Listening...' : isProcessing ? 'Processing...' : ''}
              </div>
            </div>
            {isListening && (
              <div className="mt-3 p-2 bg-white/90 rounded-lg shadow">
                <VoiceVisualizer isActive={isListening} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Transcript display */}
      <AnimatePresence>
        {transcript && isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-1/2 transform -translate-x-1/2 top-44 w-full max-w-lg"
          >
            <div className="bg-white/90 rounded-xl p-4 shadow-lg backdrop-blur-sm">
              <p className="text-center text-charcoal/80">{transcript}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Additional controls */}
      <div className="absolute top-20 -right-6">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full shadow ${
            isMuted ? 'bg-red-500 text-white' : 'bg-white/80 text-charcoal/70 hover:bg-white hover:text-charcoal'
          } transition-all`}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 w-full max-w-xs"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center text-red-600 text-sm shadow-lg">
              {error === 'not-allowed' 
                ? 'Microphone access denied. Please allow microphone access and try again.' 
                : isSupported ? error : 'Voice input is not supported in this browser.'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInterface;
