import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LyraAvatar from './LyraAvatar';

interface PersonalityOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const Personality: React.FC = () => {
  const [selectedPersonality, setSelectedPersonality] = useState<string>('balanced');
  const [selectedExpression, setSelectedExpression] = useState<string>('thoughtful');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [communicationStyle, setCommunicationStyle] = useState<string>('friendly');

  const personalityOptions: PersonalityOption[] = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal and efficient, focused on productivity',
      icon: <motion.span className="text-2xl">👔</motion.span>
    },
    {
      id: 'friendly',
      name: 'Friendly',
      description: 'Warm, casual, and approachable conversationalist',
      icon: <motion.span className="text-2xl">😊</motion.span>
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Imaginative with unique perspectives and ideas',
      icon: <motion.span className="text-2xl">🎨</motion.span>
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Versatile and adaptable to different situations',
      icon: <motion.span className="text-2xl">⚖️</motion.span>
    },
    {
      id: 'zen',
      name: 'Zen',
      description: 'Calm, mindful, and minimalist in communication',
      icon: <motion.span className="text-2xl">🧘</motion.span>
    }
  ];

  const expressionOptions = ['balanced', 'cheerful', 'thoughtful', 'curious'];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Avatar preview */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6">Avatar Preview</h2>
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <LyraAvatar
                size={96}
                emotion={selectedExpression === 'balanced' ? 'balanced' :
                  selectedExpression === 'cheerful' ? 'cheerful' :
                  selectedExpression === 'thoughtful' ? 'thoughtful' : 'curious'}
                showNameTag={true}
              />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
              Analytical and contemplative approach
            </p>
            <div className="w-full max-w-xs space-y-3 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm">Personality:</span>
                <span className="font-medium">{selectedPersonality}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Expression:</span>
                <span className="font-medium">{selectedExpression}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Voice:</span>
                <span className="font-medium">{voiceEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Communication:</span>
                <span className="font-medium">{communicationStyle}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right side - Personality options */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6">Personality Style</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {personalityOptions.map(option => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedPersonality(option.id)}
                className={`p-4 rounded-xl cursor-pointer border flex flex-col items-center text-center
                  ${selectedPersonality === option.id
                    ? 'border-dusty-rose bg-dusty-rose/10 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                <div className="mb-2">{option.icon}</div>
                <h3 className="font-medium text-sm">{option.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
              </motion.div>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-4">Avatar Expression</h2>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {expressionOptions.map(expression => (
              <motion.div
                key={expression}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedExpression(expression)}
                className={`p-2 rounded-full cursor-pointer flex items-center justify-center
                  ${selectedExpression === expression
                    ? 'bg-dusty-rose text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <LyraAvatar
                  size={32}
                  emotion={expression === 'balanced' ? 'balanced' :
                    expression === 'cheerful' ? 'cheerful' :
                    expression === 'thoughtful' ? 'thoughtful' : 'curious'}
                  showNameTag={false}
                />
                <span className="ml-2 text-xs capitalize">{expression}</span>
              </motion.div>
            ))}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-md font-medium">Voice</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={voiceEnabled}
                    onChange={() => setVoiceEnabled(!voiceEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-dusty-rose/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dusty-rose"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {voiceEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Voice is currently unavailable in this build</p>
            </div>
            <div>
              <h3 className="text-md font-medium mb-2">Communication Style</h3>
              <select
                value={communicationStyle}
                onChange={(e) => setCommunicationStyle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dusty-rose focus:border-dusty-rose block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          className="bg-dusty-rose hover:bg-coral text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Personality;
