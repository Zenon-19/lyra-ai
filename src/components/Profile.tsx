import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, icon, children }) => (
  <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#222222]">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F9FAFB]">
        {icon}
      </span>
      {title}
    </h3>
    {children}
  </div>
);

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#F9FAFB] p-6"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold text-[#222222]">Profile Settings</h2>
        
        <ProfileSection 
          title="Account" 
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#222222]">{user?.name || 'Guest User'}</h4>
                <p className="text-sm text-[#6B7280]">{user?.email || 'guest@example.com'}</p>
              </div>
              <button
                onClick={logout}
                className="rounded-2xl bg-black px-6 py-2 text-white shadow-md 
                         transition-all duration-200 hover:bg-[#1F1F1F]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection 
          title="Voice Settings" 
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#222222]">Voice Recognition</h4>
                <p className="text-sm text-[#6B7280]">Enable or disable voice commands</p>
              </div>
              <button className="rounded-full bg-[#E3D4F7] px-4 py-1 text-sm font-medium text-[#8AB9CE]">
                Coming Soon
              </button>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection 
          title="Manage History" 
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-[#6B7280]">Your conversation history is stored locally</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-xl bg-black px-4 py-2 text-sm text-white 
                                transition-all duration-200 hover:bg-[#1F1F1F]">
                  Export History
                </button>
                <button className="rounded-xl border border-red-600 px-4 py-2 text-sm 
                                text-red-600 transition-all duration-200 hover:bg-red-50">
                  Clear History
                </button>
              </div>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection 
          title="Privacy & Terms" 
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
        >
          <div className="space-y-4">
            <a href="#" className="block text-[#6B7280] hover:text-[#222222]">
              <div className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50">
                <span>Privacy Policy</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
            <a href="#" className="block text-[#6B7280] hover:text-[#222222]">
              <div className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50">
                <span>Terms of Service</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          </div>
        </ProfileSection>
      </div>
    </motion.div>
  );
};

export default Profile;
