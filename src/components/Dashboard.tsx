// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import LyraAvatar from './LyraAvatar';

interface DashboardProps {
  onGetStarted?: () => void;
}

const personas = [
  {
    name: 'Violette, Data Analyst',
    description: 'Analyzes complex data sets and provides data-driven recommendations.',
    img: '/personas/female-analyst.jpg', // Use a realistic photo in public/personas/
    bg: 'bg-persona-pink',
  },
  {
    name: 'Marcus, VP Strategy',
    description: 'Formulates long-term strategic plans and identifies growth opportunities.',
    img: '/personas/male-vp.jpg', // Use a realistic photo in public/personas/
    bg: 'bg-persona-blue',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ onGetStarted }) => {
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState('');

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header/Nav */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <img src="/lyra-logo.png" alt="Lyra Logo" className="h-10 w-10" />
          <span className="font-bold text-2xl tracking-tight">LYRA</span>
        </div>
        <nav className="hidden md:flex gap-8 font-medium text-base">
          <a href="#platform" className="hover:text-accent">Platform</a>
          <a href="#features" className="hover:text-accent">Features</a>
          <a href="#memory" className="hover:text-accent">Memory</a>
          <a href="#voice" className="hover:text-accent">Voice</a>
          <button onClick={onGetStarted} className="hover:text-accent bg-transparent border-none outline-none">Login</button>
        </nav>
        <button onClick={onGetStarted} className="cta px-6 py-3 font-bold text-lg">Get Started</button>
      </header>

      {/* AI Assistant Chat Bubble */}
      <div className="absolute left-8 top-8 z-30 flex items-start gap-2">
        <img src="/personas/female-analyst.jpg" alt="AI Assistant" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow px-6 py-4 text-base font-medium text-primary max-w-xs border border-gray-100"
        >
          Hi, I'm Lyra, your AI assistant. How can I help you today?
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 py-32 gap-12 relative">
        <div className="flex-1 max-w-xl z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Create Your Own <span className="text-accent">AI Personas</span>
          </h1>
          <p className="text-xl text-primary/80 mb-10">
            Empower your workflow with AI-driven teammates. Lyra helps you automate, analyze, and strategize—streamlining your business and boosting productivity.
          </p>
          <button onClick={onGetStarted} className="cta px-8 py-4 text-lg font-bold rounded-2xl">Get Started</button>
        </div>
        <div className="flex flex-col gap-8 z-10">
          {personas.map((p, i) => (
            <div key={i} className={`flex items-center gap-4 p-6 rounded-2xl shadow-card ${p.bg} min-w-[320px] max-w-xs`}>
              <img src={p.img} alt={p.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow" />
              <div className="text-left">
                <div className="font-bold text-lg text-primary mb-1">{p.name}</div>
                <div className="text-primary/70 text-base">{p.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Lyra Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center" id="platform">
        <h2 className="text-4xl font-bold mb-4">Why Lyra?</h2>
        <p className="text-lg text-charcoal/70 mb-10">Lyra delivers unparalleled accuracy, transparency, and privacy, giving you complete data ownership and confidence in your network of AI personas.</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <img src="/screenshots/Screenshot 2025-05-21 142553.png" alt="Personal AI Screenshot" className="rounded-2xl shadow-lg max-w-[400px] border border-white/60" />
          <img src="/screenshots/Screenshot 2025-05-21 142607.png" alt="Pi AI Screenshot" className="rounded-2xl shadow-lg max-w-[400px] border border-white/60" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-charcoal/60 text-sm border-t border-gray-200 bg-white/80 mt-12">
        <div className="mb-2">&copy; {new Date().getFullYear()} Lyra. All rights reserved.</div>
        <div className="flex justify-center gap-6">
          <a href="#privacy" className="hover:text-crimson">Privacy</a>
          <a href="#terms" className="hover:text-crimson">Terms</a>
          <a href="#contact" className="hover:text-crimson">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
