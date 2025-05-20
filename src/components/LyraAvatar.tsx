// LyraAvatar: Futuristic, expressive, anime-inspired AI avatar with 4 emotional states
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export type LyraEmotion = "balanced" | "cheerful" | "thoughtful" | "curious";

interface LyraAvatarProps {
  emotion: LyraEmotion;
  animated?: boolean;
  showNameTag?: boolean;
  accessibilityMode?: boolean;
  voiceActive?: boolean;
  size?: number;
}

const emotionConfig = {
  balanced: {
    bg: "bg-pink-100",
    border: "border-pink-200",
    shadow: "shadow-pink-200/40",
    gradient: "from-pink-200 to-charcoal-100",
    label: "Balanced",
    desc: "Neutral expression, soft pink and charcoal hues, calm presence.",
    hair: "#E9B6D1",
    base: "#F7E6F2",
    accent: "#3A2C3C",
  },
  cheerful: {
    bg: "bg-pink-200",
    border: "border-pink-300",
    shadow: "shadow-pink-300/40",
    gradient: "from-pink-300 to-pink-200",
    label: "Cheerful",
    desc: "Smiling, glowing pink tones, radiates warmth.",
    hair: "#FF7EB9",
    base: "#FFD6EC",
    accent: "#F94F9C",
  },
  thoughtful: {
    bg: "bg-blue-100",
    border: "border-blue-200",
    shadow: "shadow-blue-200/40",
    gradient: "from-blue-200 to-blue-100",
    label: "Thoughtful",
    desc: "Head tilt, cool blue tones, soft side glow.",
    hair: "#A3C7F7",
    base: "#E3F0FF",
    accent: "#3A4A6B",
  },
  curious: {
    bg: "bg-red-100",
    border: "border-red-200",
    shadow: "shadow-red-200/40",
    gradient: "from-red-200 to-red-100",
    label: "Curious",
    desc: "Wider eyes, earthy red palette, soft lighting.",
    hair: "#D96A6A",
    base: "#FFE3E3",
    accent: "#6B2C2C",
  },
};

const LyraAvatar: React.FC<LyraAvatarProps> = ({ 
  emotion, 
  animated = true, 
  showNameTag = true, 
  accessibilityMode = false, 
  voiceActive = false, 
  size = 128 
}) => {
  const cfg = emotionConfig[emotion];
  // SVGs are simplified for demo; replace with detailed SVGs for production
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative rounded-2xl p-2 ${cfg.bg} ${cfg.shadow} border ${cfg.border} transition-all duration-300`}
        style={{ width: size, height: size + 12 }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hair */}
          <ellipse
            cx="64"
            cy="60"
            rx="48"
            ry="48"
            fill={cfg.hair}
            style={animated && !accessibilityMode ? { filter: `drop-shadow(0 0 12px ${cfg.hair}80)` } : {}}
          />
          {/* Face */}
          <ellipse
            cx="64"
            cy="72"
            rx="32"
            ry="36"
            fill={cfg.base}
            stroke={cfg.accent}
            strokeWidth="2"
          />
          {/* Eyes */}
          {emotion === "cheerful" ? (
            <>
              <ellipse cx="50" cy="78" rx="5" ry="7" fill="#fff" stroke={cfg.accent} strokeWidth="1.5" />
              <ellipse cx="78" cy="78" rx="5" ry="7" fill="#fff" stroke={cfg.accent} strokeWidth="1.5" />
              <ellipse cx="50" cy="78" rx="2" ry="2.5" fill={cfg.accent} />
              <ellipse cx="78" cy="78" rx="2" ry="2.5" fill={cfg.accent} />
            </>
          ) : emotion === "thoughtful" ? (
            <>
              <ellipse cx="48" cy="80" rx="4.5" ry="6" fill="#fff" stroke={cfg.accent} strokeWidth="1.2" />
              <ellipse cx="76" cy="82" rx="4.5" ry="6" fill="#fff" stroke={cfg.accent} strokeWidth="1.2" />
              <ellipse cx="48" cy="80" rx="1.5" ry="2" fill={cfg.accent} />
              <ellipse cx="76" cy="82" rx="1.5" ry="2" fill={cfg.accent} />
            </>
          ) : emotion === "curious" ? (
            <>
              <ellipse cx="46" cy="78" rx="6" ry="8" fill="#fff" stroke={cfg.accent} strokeWidth="1.5" />
              <ellipse cx="82" cy="78" rx="6" ry="8" fill="#fff" stroke={cfg.accent} strokeWidth="1.5" />
              <ellipse cx="46" cy="78" rx="2.5" ry="3" fill={cfg.accent} />
              <ellipse cx="82" cy="78" rx="2.5" ry="3" fill={cfg.accent} />
            </>
          ) : (
            // Balanced
            <>
              <ellipse cx="54" cy="80" rx="4.5" ry="6" fill="#fff" stroke={cfg.accent} strokeWidth="1.2" />
              <ellipse cx="74" cy="80" rx="4.5" ry="6" fill="#fff" stroke={cfg.accent} strokeWidth="1.2" />
              <ellipse cx="54" cy="80" rx="1.5" ry="2" fill={cfg.accent} />
              <ellipse cx="74" cy="80" rx="1.5" ry="2" fill={cfg.accent} />
            </>
          )}
          {/* Mouth */}
          {emotion === "cheerful" ? (
            <path d="M54 98 Q64 108 74 98" stroke={cfg.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ) : emotion === "thoughtful" ? (
            <path d="M56 98 Q64 104 72 98" stroke={cfg.accent} strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : emotion === "curious" ? (
            <ellipse cx="64" cy="98" rx="7" ry="2.5" fill={cfg.accent} />
          ) : (
            // Balanced
            <ellipse cx="64" cy="98" rx="6" ry="2" fill={cfg.accent} />
          )}
          {/* Glow/Accent for Thoughtful */}
          {emotion === "thoughtful" && !accessibilityMode && (
            <ellipse cx="110" cy="80" rx="12" ry="18" fill="#B6E0FE" opacity="0.25">
              <animate attributeName="opacity" values="0.25;0.4;0.25" dur="2s" repeatCount="indefinite" />
            </ellipse>
          )}
          {/* Ambient Glow for Cheerful */}
          {emotion === "cheerful" && !accessibilityMode && (
            <ellipse cx="64" cy="60" rx="48" ry="48" fill="#FFD6EC" opacity="0.15">
              <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite" />
            </ellipse>
          )}
          {/* Subtle animation for hair (all, if animated) */}
          {animated && !accessibilityMode && (
            <ellipse cx="64" cy="40" rx="30" ry="8" fill="#fff" opacity="0.08">
              <animate attributeName="rx" values="30;34;30" dur="2.5s" repeatCount="indefinite" />
            </ellipse>
          )}
          {/* Blinking (all, if animated) */}
          {animated && !accessibilityMode && (
            <g>
              <ellipse cx="64" cy="80" rx="18" ry="2" fill="#fff" opacity="0">
                <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.45;0.5;0.55;1" dur="4s" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}
          {/* Voice cue */}
          {voiceActive && (
            <circle cx="64" cy="120" r="8" fill="#F94F9C" opacity="0.5">
              <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
        {showNameTag && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 flex flex-col items-center">
            <span className="text-base font-bold text-charcoal drop-shadow">Lyra</span>
            <span className="block w-12 h-2 rounded-full bg-gradient-to-r from-pink-300 to-blue-200 blur-sm opacity-60 mt-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LyraAvatar;
