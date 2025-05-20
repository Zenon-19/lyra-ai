import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const skills = [
    {
      name: 'Calendar Integration',
      desc: 'Connect to your calendar to schedule events, get reminders, and manage your time.',
      icon: '📅',
      category: 'Productivity',
      enabled: true,
      lastUsed: 'Yesterday',
    },
    {
      name: 'Code Assistant',
      desc: 'Get help with coding tasks, debugging, and code explanations.',
      icon: '💻',
      category: 'Developer',
      enabled: true,
      lastUsed: '2 hours ago',
    },
    {
      name: 'Weather Updates',
      desc: 'Get current weather conditions and forecasts for any location.',
      icon: '☁️',
      category: 'Lifestyle',
      enabled: false,
      lastUsed: '',
    },
    {
      name: 'Email Summarizer',
      desc: 'Automatically summarize long emails and extract key information.',
      icon: '✉️',
      category: 'Productivity',
      enabled: false,
      lastUsed: '',
    },
    {
      name: 'Language Translation',
      desc: 'Translate text between over 50 languages in real-time conversation.',
      icon: '🌐',
      category: 'Communication',
      enabled: true,
      lastUsed: '',
    },
    {
      name: 'Knowledge Base',
      desc: 'Access to extensive knowledge across various domains without requiring search.',
      icon: '📚',
      category: 'Research',
      enabled: true,
      lastUsed: '',
    },
  ];
  const categories = [
    'All Skills',
    'Productivity',
    'Developer',
    'Lifestyle',
    'Communication',
    'Research',
  ];
  const [selectedCategory, setSelectedCategory] = React.useState('All Skills');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-blue-500">Skills & Plugins</span>
        <span className="text-base font-normal text-charcoal/60">Extend Lyra's capabilities with powerful modules</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-64 bg-white dark:bg-charcoal/40 rounded-xl p-6 shadow-md mb-4 md:mb-0">
          <h2 className="font-semibold mb-4 text-charcoal/80">Filters</h2>
          <input
            type="text"
            placeholder="Search skills"
            className="w-full mb-4 p-2 rounded-lg border border-charcoal/10 dark:border-offwhite/10 bg-offwhite dark:bg-charcoal"
          />
          <div className="mb-4">
            <div className="font-medium mb-2">Categories</div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all border
                    ${selectedCategory === cat
                      ? 'bg-blue-500 text-white border-blue-500 scale-105 shadow-lg'
                      : 'bg-offwhite dark:bg-charcoal border-charcoal/10 dark:border-offwhite/10 text-charcoal/70 dark:text-offwhite/70 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* ...existing code for status, etc. ... */}
        </div>
        {/* Skills Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills
            .filter(skill => selectedCategory === 'All Skills' || skill.category === selectedCategory)
            .map((skill, i) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
                className="rounded-2xl p-6 bg-white dark:bg-charcoal/60 shadow-md flex flex-col border border-charcoal/10 dark:border-offwhite/10 transition-all relative"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl bg-blue-100 dark:bg-blue-900 rounded-lg p-2">{skill.icon}</span>
                  <span className="text-base font-semibold">{skill.name}</span>
                  <motion.span
                    animate={{ backgroundColor: skill.enabled ? '#d1fae5' : '#fee2e2', color: skill.enabled ? '#059669' : '#b91c1c' }}
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-bold transition-colors border border-opacity-30
                      ${skill.enabled ? 'border-green-400' : 'border-red-400'}`}
                  >
                    {skill.enabled ? 'Enabled' : 'Disabled'}
                  </motion.span>
                </div>
                <div className="text-charcoal/80 dark:text-offwhite/80 mb-2 flex-1">{skill.desc}</div>
                <div className="flex items-center justify-between text-xs text-charcoal/50 dark:text-offwhite/50 mt-2">
                  <span>{skill.category}</span>
                  {skill.lastUsed && <span>Used {skill.lastUsed}</span>}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
