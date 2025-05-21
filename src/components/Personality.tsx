import React from 'react';
import { motion } from 'framer-motion';
import LyraAvatar from './LyraAvatar';
import type { LyraEmotion } from './LyraAvatar';

const personas = [
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Neutral expression with a centered appearance, bringing balance to conversations.',
    emotion: 'balanced' as LyraEmotion
  },
  {
    id: 'cheerful',
    name: 'Cheerful',
    description: 'Optimistic and warm personality, brightening up every interaction.',
    emotion: 'cheerful' as LyraEmotion
  },
  {
    id: 'thoughtful',
    name: 'Thoughtful',
    description: 'Calm and introspective, providing deep and meaningful insights.',
    emotion: 'thoughtful' as LyraEmotion
  },
  {
    id: 'curious',
    name: 'Curious',
    description: 'Inquisitive and observant, always eager to learn and explore.',
    emotion: 'curious' as LyraEmotion
  }
];

interface PersonalityProps {
  selectedPersona?: string;
  onSelectPersona?: (id: string) => void;
}

const Personality: React.FC<PersonalityProps> = ({
  selectedPersona,
  onSelectPersona
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#222222]">
          Choose Your AI Personality
        </h2>
        <p className="text-[#6B7280]">
          Select a personality that matches your preferences and communication style
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {personas.map((persona) => (
          <motion.div
            key={persona.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelectPersona?.(persona.id)}
            className={`
              cursor-pointer rounded-xl bg-[#C8E3F4] p-6
              transition-all duration-200 hover:shadow-lg
              ${selectedPersona === persona.id ? 'ring-2 ring-[#D32F2F]' : ''}
            `}
          >
            <div className="flex justify-center">
              <LyraAvatar
                emotion={persona.emotion}
                showNameTag={true}
                size="lg"
              />
            </div>
            <div className="mt-4 space-y-2 text-center">
              <h3 className="text-[#D44F4F] text-lg font-semibold">
                {persona.name}
              </h3>
              <p className="text-[#6B7280] text-sm">
                {persona.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => onSelectPersona?.(selectedPersona || personas[0].id)}
          className="rounded-2xl bg-black px-6 py-2 text-white 
                   shadow-md transition-all duration-200 
                   hover:bg-[#1F1F1F] hover:shadow-lg"
        >
          Continue with Selected Personality
        </button>
      </div>
    </motion.div>
  );
};

export default Personality;
