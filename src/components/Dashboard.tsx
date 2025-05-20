// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import LyraAvatar from './LyraAvatar';

interface DashboardProps {
  username?: string;
}

interface DashboardTile {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  position: { x: number; y: number };
}

const Dashboard: React.FC<DashboardProps> = ({ username = "Friend" }) => {
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState('');
  const [tiles, setTiles] = useState<DashboardTile[]>([
    {
      id: 'chat',
      title: 'Chat',
      icon: '💬',
      description: 'Have a conversation with Lyra',
      color: 'var(--color-crimson)',
      position: { x: 0, y: 0 }
    },
    {
      id: 'tasks',
      title: 'Tasks',
      icon: '✓',
      description: 'Manage your tasks with Lyra',
      color: 'var(--color-stealth-blue)',
      position: { x: 0, y: 0 }
    },
    {
      id: 'memory',
      title: 'Memory',
      icon: '🧠',
      description: 'View and edit Lyra\'s memory',
      color: 'var(--color-accent)',
      position: { x: 0, y: 0 }
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      description: 'Customize Lyra',
      color: '#6B6B6B',
      position: { x: 0, y: 0 }
    }
  ]);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'thinking'>('neutral');

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Change Lyra's mood randomly for demo
    const interval = setInterval(() => {
      const moods: ('neutral' | 'happy' | 'thinking')[] = ['neutral', 'happy', 'thinking'];
      setMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle tile drag
  const onDragEnd = (id: string, info: { point: { x: number, y: number } }) => {
    setTiles(prevTiles => 
      prevTiles.map(tile => 
        tile.id === id ? { ...tile, position: { x: info.point.x, y: info.point.y } } : tile
      )
    );
  };

  return (
    <div className="p-6 h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-8"
      >
        <div className="mr-4">
          <LyraAvatar emotion="balanced" animated={true} showNameTag={true} size={96} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-charcoal dark:text-offwhite">
            {greeting}, <span className="text-crimson">{username}</span>!
          </h1>
          <p className="text-charcoal/70 dark:text-offwhite/70">
            What would you like to do today?
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            className="glass-effect rounded-xl p-4 cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragEnd={(_, info) => onDragEnd(tile.id, info)}
            style={{ 
              x: tile.position.x, 
              y: tile.position.y,
              borderTop: `3px solid ${tile.color}` 
            }}
          >
            <div className="flex items-start">
              <div 
                className="text-2xl p-3 rounded-full mr-3"
                style={{ backgroundColor: `${tile.color}20` }}
              >
                {tile.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{tile.title}</h3>
                <p className="text-sm text-charcoal/70 dark:text-offwhite/70">{tile.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
