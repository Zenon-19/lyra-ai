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
    emotion: 'thoughtful',
    name: 'Samara',
    title: 'Paralegal',
    description: 'Supports attorneys with legal research, document preparation, and case management.'
  },
  {
    emotion: 'balanced',
    name: 'Gates',
    title: 'COO',
    description: 'Supports with business strategy, fundraising diligence, and business development.'
  },
  {
    emotion: 'cheerful',
    name: 'Alex',
    title: 'Creative Director',
    description: 'Specializes in design thinking, brand strategy, and creative direction.'
  },
  {
    emotion: 'curious',
    name: 'Maya',
    title: 'Research Lead',
    description: 'Focuses on market research, competitive analysis, and trend forecasting.'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ onGetStarted }) => {
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Set appropriate greeting based on time of day  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Handle scroll events to update header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add smooth scrolling to anchor links
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target && target.hash && target.hash.length > 0) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          window.scrollTo({
            behavior: 'smooth',
            top: element.getBoundingClientRect().top + window.pageYOffset - 80, // Offset for header
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);
  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Header/Nav */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
        scrolled 
          ? 'bg-white bg-opacity-95 backdrop-blur-sm py-3 shadow-md' 
          : 'bg-white py-4 shadow-sm'
      } px-6`}>
        <div className="flex items-center gap-3">
          <img src="/lyra-logo.png" alt="Lyra" className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-[#222222]">Lyra AI</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#platform" className="text-[#6B7280] hover:text-[#222222]">Platform</a>
            <a href="#features" className="text-[#6B7280] hover:text-[#222222]">Features</a>
            <a href="#academy" className="text-[#6B7280] hover:text-[#222222]">Academy</a>
          </nav>
          <button
            onClick={onGetStarted}
            className="rounded-lg bg-black px-6 py-2 text-white transition-all hover:bg-[#1F1F1F]"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Scroll to top button */}
      {scrolled && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#8AB9CE] text-white shadow-lg transition-all hover:bg-[#7CAFC7] hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}      {/* Hero Section */}
      <section className="relative mt-28 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#222222] md:text-6xl lg:text-7xl">
              Build Your <span className="text-[#8AB9CE]">AI</span> Workforce
              <br />
              With <span className="text-[#8AB9CE]">Lyra AI</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6B7280]">
              Train and deploy AI teammates for 10x performance at 10% of the cost. 
              Lyra AI creates an evolving AI workforce trained on proprietary knowledge.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="rounded-lg bg-black px-8 py-3 text-lg font-medium text-white 
                         transition-all duration-200 hover:bg-[#1F1F1F] hover:scale-105"
              >
                Get Started
              </button>
              <button className="rounded-lg border border-[#7CAFC7] px-8 py-3 text-lg font-medium 
                               text-[#7CAFC7] transition-all duration-200 hover:bg-[#7CAFC7]/10">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>      {/* Persona Grid Section */}
      <section id="platform" className="bg-[#F9FAFB] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#222222] mb-6">Meet Your AI Teammates</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Discover our diverse AI personas, each specialized in different business functions
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personas.map((persona, index) => (
              <motion.div
                key={persona.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <LyraAvatar emotion={persona.emotion as any} size={80} />
                </div>
                <h3 className="text-xl font-semibold text-[#222222] mb-2">{persona.name}</h3>
                <p className="text-[#4B5563] font-medium mb-2">{persona.title}</p>
                <p className="text-[#6B7280]">{persona.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#222222] mb-6">Powerful Features</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Everything you need to build and manage your AI workforce
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Knowledge Integration', description: 'Seamlessly integrate your company knowledge, documents, and data', icon: '📚' },
              { title: 'Voice Interaction', description: 'Natural voice conversations with advanced text-to-speech', icon: '🎙️' },
              { title: 'Memory Management', description: 'Long-term memory storage and context awareness', icon: '🧠' },
              { title: 'Custom Skills', description: 'Create and deploy custom skills for your AI teammates', icon: '⚡' },
              { title: 'Task Automation', description: 'Automate repetitive tasks and workflows', icon: '⚙️' },
              { title: 'Analytics & Insights', description: 'Track performance and gather insights from AI interactions', icon: '📊' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-[#F9FAFB] rounded-xl p-8 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#222222] mb-3">{feature.title}</h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* How it Works Section */}
      <section id="academy" className="bg-[#F9FAFB] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#222222] mb-6">How It Works</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Get started with Lyra AI in three simple steps
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect Your Data', description: 'Import your documents, knowledge base, and company data' },
              { step: '02', title: 'Configure AI Teammates', description: 'Choose personas and customize their skills and knowledge' },
              { step: '03', title: 'Start Collaborating', description: 'Interact with your AI workforce through chat or voice' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#8AB9CE]/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-[#222222] mb-3">{item.title}</h3>
                <p className="text-[#6B7280]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#222222] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/lyra-logo.png" alt="Lyra" className="h-8 w-8" />
                <span className="text-xl font-bold">Lyra AI</span>
              </div>
              <p className="text-[#9CA3AF]">Building the future of AI workforce</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-[#9CA3AF] hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-[#9CA3AF] hover:text-white">Pricing</a></li>
                <li><a href="#security" className="text-[#9CA3AF] hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#docs" className="text-[#9CA3AF] hover:text-white">Documentation</a></li>
                <li><a href="#api" className="text-[#9CA3AF] hover:text-white">API</a></li>
                <li><a href="#guides" className="text-[#9CA3AF] hover:text-white">Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-[#9CA3AF] hover:text-white">About</a></li>
                <li><a href="#blog" className="text-[#9CA3AF] hover:text-white">Blog</a></li>
                <li><a href="#careers" className="text-[#9CA3AF] hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#374151] pt-8 text-center text-[#9CA3AF]">
            <p>&copy; {new Date().getFullYear()} Lyra AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
