// Settings.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Glass from './Glass';
import LyraAvatar from './LyraAvatar';

interface Setting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface SettingsProps {
  onBackClick?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBackClick }) => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');
  const [voiceSettings, setVoiceSettings] = useState({
    voiceType: 'neutral',
    speed: 1.0,
    pitch: 1.0,
    wakePhrases: ['Hey Lyra', 'Okay Lyra'],
    listeningTimeout: 10,
    autoListenAfterResponse: true
  });
  const [notificationSettings, setNotificationSettings] = useState({
    desktopNotifications: true,
    soundEffects: true,
    taskReminders: true,
    emailNotifications: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    collectUsageData: true,
    shareConversationData: false,
    storeHistory: true,
    useRemoteMemory: true,
  });

  // Icons
  const icons = {
    appearance: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    voice: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    account: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    privacy: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    notifications: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    agents: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    about: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  // Options for settings
  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: icons.appearance },
    { id: 'voice', name: 'Voice & Speech', icon: icons.voice },
    { id: 'agents', name: 'AI Agents', icon: icons.agents },
    { id: 'notifications', name: 'Notifications', icon: icons.notifications },
    { id: 'privacy', name: 'Privacy', icon: icons.privacy },
    { id: 'account', name: 'Account', icon: icons.account },
    { id: 'about', name: 'About', icon: icons.about },
  ];

  // Toggle Switch Component
  const ToggleSwitch: React.FC<{ 
    enabled: boolean; 
    onChange: () => void; 
    label: string;
    description?: string;
  }> = ({ enabled, onChange, label, description }) => {
    return (
      <div className="flex justify-between items-center py-3">
        <div>
          <label className="font-medium text-charcoal">{label}</label>
          {description && (
            <p className="text-sm text-charcoal/60">{description}</p>
          )}
        </div>
        <button
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${enabled ? 'bg-crimson' : 'bg-charcoal/30'} transition-colors duration-300 focus:outline-none`}
        >
          <span 
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} 
          />
        </button>
      </div>
    );
  };

  // Slider Component
  const Slider: React.FC<{
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    label: string;
    displayValue?: string;
  }> = ({ value, onChange, min, max, step, label, displayValue }) => {
    return (
      <div className="py-3">
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-charcoal">{label}</label>
          <span className="text-sm font-medium text-crimson">{displayValue || value}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-charcoal/20 rounded-lg appearance-none cursor-pointer accent-crimson"
        />
      </div>
    );
  };

  const handleVoiceSettingChange = (key: string, value: any) => {
    setVoiceSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationSettingChange = (key: string) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacySettingChange = (key: string) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Get content based on active tab
  const getTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <h3 className="font-medium">Theme</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['light', 'dark', 'zen'] as const).map((themeOption) => (
                  <button
                    key={themeOption}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      theme === themeOption 
                        ? 'border-crimson bg-crimson/10 text-crimson' 
                        : 'border-charcoal/20 hover:border-charcoal/50'
                    }`}
                    onClick={() => setTheme(themeOption)}
                  >
                    {themeOption === 'light' ? '☀️' : themeOption === 'dark' ? '🌙' : '🧘'} 
                    {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Interface Density</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Comfortable', 'Default', 'Compact'].map((density) => (
                  <button
                    key={density}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      density === 'Default' 
                        ? 'border-crimson bg-crimson/10 text-crimson' 
                        : 'border-charcoal/20 hover:border-charcoal/50'
                    }`}
                  >
                    {density}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Text Size</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      size === 'Medium' 
                        ? 'border-crimson bg-crimson/10 text-crimson' 
                        : 'border-charcoal/20 hover:border-charcoal/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Animation Level</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Minimal', 'Normal', 'Full'].map((level) => (
                  <button
                    key={level}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      level === 'Normal' 
                        ? 'border-crimson bg-crimson/10 text-crimson' 
                        : 'border-charcoal/20 hover:border-charcoal/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'voice':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Voice & Speech</h2>
            
            <div className="space-y-4">
              <h3 className="font-medium">Voice Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['neutral', 'friendly', 'professional', 'enthusiastic'].map((voiceType) => (
                  <button
                    key={voiceType}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      voiceSettings.voiceType === voiceType 
                        ? 'border-crimson bg-crimson/10 text-crimson' 
                        : 'border-charcoal/20 hover:border-charcoal/50'
                    }`}
                    onClick={() => handleVoiceSettingChange('voiceType', voiceType)}
                  >
                    {voiceType.charAt(0).toUpperCase() + voiceType.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <Slider 
              label="Speaking Speed" 
              value={voiceSettings.speed} 
              min={0.5} 
              max={2} 
              step={0.1} 
              displayValue={`${voiceSettings.speed}x`}
              onChange={(value) => handleVoiceSettingChange('speed', value)} 
            />
            
            <Slider 
              label="Voice Pitch" 
              value={voiceSettings.pitch} 
              min={0.5} 
              max={1.5} 
              step={0.1} 
              onChange={(value) => handleVoiceSettingChange('pitch', value)} 
            />
            
            <div className="space-y-2">
              <h3 className="font-medium">Wake Phrases</h3>
              <p className="text-sm text-charcoal/60">These phrases will activate voice listening when spoken.</p>
              
              <div className="space-y-2 mt-3">
                {voiceSettings.wakePhrases.map((phrase, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={phrase}
                      onChange={(e) => {
                        const newPhrases = [...voiceSettings.wakePhrases];
                        newPhrases[index] = e.target.value;
                        handleVoiceSettingChange('wakePhrases', newPhrases);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
                    />
                    <button
                      onClick={() => {
                        const newPhrases = voiceSettings.wakePhrases.filter((_, i) => i !== index);
                        handleVoiceSettingChange('wakePhrases', newPhrases);
                      }}
                      className="p-2 text-charcoal/50 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    handleVoiceSettingChange('wakePhrases', [...voiceSettings.wakePhrases, '']);
                  }}
                  className="text-sm text-crimson hover:text-crimson/80 transition-colors flex items-center gap-1 mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Wake Phrase
                </button>
              </div>
            </div>
            
            <Slider 
              label="Listening Timeout (seconds)" 
              value={voiceSettings.listeningTimeout} 
              min={5} 
              max={30} 
              step={1} 
              displayValue={`${voiceSettings.listeningTimeout}s`}
              onChange={(value) => handleVoiceSettingChange('listeningTimeout', value)} 
            />
            
            <ToggleSwitch 
              enabled={voiceSettings.autoListenAfterResponse} 
              onChange={() => handleVoiceSettingChange('autoListenAfterResponse', !voiceSettings.autoListenAfterResponse)}
              label="Auto-listen after response"
              description="Automatically start listening after Lyra finishes speaking"
            />
            
            <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Voice quality depends on your browser and device.</p>
                  <p className="text-sm mt-1">For best results, use an up-to-date version of Chrome, Edge, or Safari.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            
            <div className="divide-y divide-charcoal/10">
              <ToggleSwitch 
                enabled={notificationSettings.desktopNotifications} 
                onChange={() => handleNotificationSettingChange('desktopNotifications')}
                label="Desktop Notifications"
                description="Show notifications when Lyra has a response ready or for task reminders"
              />
              
              <ToggleSwitch 
                enabled={notificationSettings.soundEffects} 
                onChange={() => handleNotificationSettingChange('soundEffects')}
                label="Sound Effects"
                description="Play subtle sounds for notifications and interactions"
              />
              
              <ToggleSwitch 
                enabled={notificationSettings.taskReminders} 
                onChange={() => handleNotificationSettingChange('taskReminders')}
                label="Task Reminders"
                description="Receive notifications for upcoming task deadlines"
              />
              
              <ToggleSwitch 
                enabled={notificationSettings.emailNotifications} 
                onChange={() => handleNotificationSettingChange('emailNotifications')}
                label="Email Notifications"
                description="Receive important updates and reminders via email"
              />
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-medium">You may need to grant notification permissions</p>
                  <p className="text-sm mt-1">Your browser might ask for permission to show desktop notifications.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Privacy</h2>
            
            <div className="divide-y divide-charcoal/10">
              <ToggleSwitch 
                enabled={privacySettings.collectUsageData} 
                onChange={() => handlePrivacySettingChange('collectUsageData')}
                label="Collect Usage Data"
                description="Allow anonymous usage data collection to help improve Lyra"
              />
              
              <ToggleSwitch 
                enabled={privacySettings.shareConversationData} 
                onChange={() => handlePrivacySettingChange('shareConversationData')}
                label="Share Conversation Data"
                description="Allow conversations to be used for AI training (all personal info is removed)"
              />
              
              <ToggleSwitch 
                enabled={privacySettings.storeHistory} 
                onChange={() => handlePrivacySettingChange('storeHistory')}
                label="Store Conversation History"
                description="Save your conversations for future reference (turn off for private mode)"
              />
              
              <ToggleSwitch 
                enabled={privacySettings.useRemoteMemory} 
                onChange={() => handlePrivacySettingChange('useRemoteMemory')}
                label="Use Remote Memory"
                description="Store memory data on our secure servers for better continuity across devices"
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <button className="w-full py-2 border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-colors">
                Download My Data
              </button>
              <button className="w-full py-2 border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-colors">
                Delete My Data
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-charcoal/5 rounded-lg text-sm text-charcoal/70">
              <p>Your privacy is important to us. Read our full <a href="#" className="text-crimson hover:underline">Privacy Policy</a> to learn more about how we handle your data.</p>
            </div>
          </div>
        );

      case 'agents':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">AI Agents</h2>
            
            <div className="space-y-4">
              <h3 className="font-medium">Default Agent</h3>
              <div className="flex items-center gap-4 p-4 bg-white/80 rounded-xl border border-white shadow-sm">
                <LyraAvatar size="md" color="#FF5757" />
                <div>
                  <div className="font-semibold">Lyra</div>
                  <div className="text-sm text-charcoal/60">Personal Assistant</div>
                </div>
                <span className="ml-auto text-sm text-crimson bg-crimson/10 px-2 py-1 rounded-full">Default</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Your Agents</h3>
                <button className="text-sm text-crimson hover:text-crimson/80 transition-colors flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Agent
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Existing Agent Cards */}
                <div className="flex items-center gap-4 p-4 bg-white/80 rounded-xl border border-white shadow-sm">
                  <LyraAvatar size="md" color="#4A7BF7" name="S" />
                  <div>
                    <div className="font-semibold">Scholar</div>
                    <div className="text-sm text-charcoal/60">Research Expert</div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="text-charcoal/60 hover:text-blue-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-charcoal/60 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/80 rounded-xl border border-white shadow-sm">
                  <LyraAvatar size="md" color="#9747FF" name="M" />
                  <div>
                    <div className="font-semibold">Muse</div>
                    <div className="text-sm text-charcoal/60">Creative Partner</div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="text-charcoal/60 hover:text-blue-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-charcoal/60 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/80 rounded-xl border border-white shadow-sm">
                  <LyraAvatar size="md" color="#34C759" name="D" />
                  <div>
                    <div className="font-semibold">Designer</div>
                    <div className="text-sm text-charcoal/60">Visual Expert</div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="text-charcoal/60 hover:text-blue-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-charcoal/60 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Agent Teams</h3>
              <p className="text-sm text-charcoal/70">Create teams of agents that can collaborate on tasks together.</p>
              
              <div className="p-5 bg-charcoal/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg mb-2">No Teams Created</div>
                  <button className="text-sm text-crimson hover:text-crimson/80 transition-colors flex items-center gap-1 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create a Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            
            <div className="flex items-center gap-4 p-4 bg-white/80 rounded-xl border border-white shadow-sm mb-6">
              <div className="h-16 w-16 bg-charcoal/10 rounded-full flex items-center justify-center text-2xl text-charcoal/60">
                J
              </div>
              <div>
                <div className="font-semibold text-lg">John Doe</div>
                <div className="text-charcoal/60">john.doe@example.com</div>
                <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Premium Plan
                </div>
              </div>
              <button className="ml-auto text-sm text-crimson hover:text-crimson/80">
                Edit Profile
              </button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Subscription</h3>
              <div className="p-4 bg-white/80 rounded-xl border border-white shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-semibold">Premium Plan</div>
                  <div className="text-green-600 text-sm font-medium">Active</div>
                </div>
                <div className="text-sm text-charcoal/70 mb-3">
                  <div>Next billing date: June 21, 2025</div>
                  <div>$12.99/month</div>
                </div>
                <div className="flex gap-3">
                  <button className="text-sm text-crimson hover:text-crimson/80 transition-colors">
                    Change Plan
                  </button>
                  <button className="text-sm text-charcoal/60 hover:text-charcoal/80 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Account Security</h3>
              <div className="flex flex-col gap-3">
                <button className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm">
                  <div className="font-medium">Change Password</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-red-500">Not Enabled</div>
                </button>
                <button className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm">
                  <div className="font-medium">Connected Accounts</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <button className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-6">
              Delete Account
            </button>
          </div>
        );
        
      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">About Lyra AI</h2>
            
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <img src="/vite.svg" alt="Lyra Logo" className="h-20 w-20" />
              </div>
              <h1 className="text-2xl font-bold mb-1">Lyra AI</h1>
              <div className="text-charcoal/60">Version 3.0.1</div>
            </div>
            
            <div className="p-4 bg-white/80 rounded-xl border border-white shadow-sm">
              <p className="text-charcoal/70 leading-relaxed">
                Lyra AI is your personal AI team powered by advanced language models with emotional intelligence. 
                Navigate your digital life with a multi-agent system that adapts to your needs and preferences.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Resources</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm hover:border-charcoal/20 transition-all">
                  <div className="font-medium">Documentation</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a href="#" className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm hover:border-charcoal/20 transition-all">
                  <div className="font-medium">Frequently Asked Questions</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a href="#" className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm hover:border-charcoal/20 transition-all">
                  <div className="font-medium">Support Center</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Legal</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm hover:border-charcoal/20 transition-all">
                  <div className="font-medium">Terms of Service</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a href="#" className="flex justify-between items-center w-full py-3 px-4 bg-white/80 rounded-xl border border-white shadow-sm hover:border-charcoal/20 transition-all">
                  <div className="font-medium">Privacy Policy</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="text-center text-charcoal/50 text-sm pt-6">
              &copy; {new Date().getFullYear()} Lyra AI. All rights reserved.
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center text-charcoal/70">
            Select a settings category from the sidebar
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-charcoal/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBackClick && (
            <button 
              onClick={onBackClick} 
              className="p-2 rounded-full hover:bg-charcoal/10 text-charcoal/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-bold text-charcoal">Settings</h1>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Settings navigation sidebar */}
        <div className="w-64 border-r border-charcoal/10 p-4 space-y-2 overflow-y-auto hidden md:block">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-crimson/10 text-crimson' 
                  : 'text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-crimson' : 'text-charcoal/50'}>
                {tab.icon}
              </span>
              {tab.name}
            </button>
          ))}
        </div>
        
        {/* Mobile tabs (visible only on small screens) */}
        <div className="md:hidden p-2 border-b border-charcoal/10 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-crimson/10 text-crimson' 
                    : 'text-charcoal/70 hover:bg-charcoal/5'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-crimson' : 'text-charcoal/50'}>
                  {tab.icon}
                </span>
                <span className="text-sm">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <Glass className="p-6 rounded-2xl">
            {getTabContent()}
          </Glass>
        </div>
      </div>
    </div>
  );
};

export default Settings;
