// LyraAvatar: Futuristic, expressive, anime-inspired AI avatar with 4 emotional states
import React from 'react';

export type LyraEmotion = "balanced" | "cheerful" | "thoughtful" | "curious";

interface LyraAvatarProps {
  emotion?: LyraEmotion;
  showNameTag?: boolean;
  size?: number | "sm" | "md" | "lg";
  color?: string;
  name?: string;
}

const emotionConfig = {
  balanced: {
    bg: "#e3f0ff",
    hair: "#8AB9CE",
    accent: "#222222",
    label: "Balanced",
  },
  cheerful: {
    bg: "#e3f0ff",
    hair: "#8AB9CE",
    accent: "#222222",
    label: "Cheerful",
  },
  thoughtful: {
    bg: "#e3f0ff",
    hair: "#8AB9CE",
    accent: "#222222",
    label: "Thoughtful",
  },
  curious: {
    bg: "#e3f0ff",
    hair: "#8AB9CE",
    accent: "#222222",
    label: "Curious",
  },
};

const LyraAvatar: React.FC<LyraAvatarProps> = ({
  emotion = "balanced",
  showNameTag = false,
  size = 96,
  color,
  name,
}) => {
  // Convert size if string
  const sizeInPixels = typeof size === 'number' ? size : 
                       size === 'sm' ? 32 :
                       size === 'md' ? 48 : 
                       size === 'lg' ? 64 : 96;
                       
  // If color and name are provided, show a simplified user avatar
  if (color && name) {
    return (
      <div 
        className="rounded-full flex items-center justify-center text-white font-medium"
        style={{ 
          width: sizeInPixels, 
          height: sizeInPixels, 
          backgroundColor: color,
          fontSize: sizeInPixels * 0.4
        }}
      >
        {name}
      </div>
    );
  }
  
  const cfg = emotionConfig[emotion];
  const faceCX = 48;
  const faceCY = 48;
  const faceR = 28;
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-xl shadow-md border border-gray-200"
        style={{ width: size, height: size, background: cfg.bg }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle cx={faceCX} cy={faceCY} r={faceR} fill="#fff" stroke={cfg.accent} strokeWidth="2" />
          {/* Hair (simple arc) */}
          <path
            d="M20,52 Q48,10 76,52"
            stroke={cfg.hair}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Eyes */}
          <circle cx={36} cy={54} r={2.5} fill={cfg.accent} />
          <circle cx={60} cy={54} r={2.5} fill={cfg.accent} />
          {/* Mouth (emotion-dependent) */}
          {emotion === "cheerful" ? (
            <path d="M40 64 Q48 70 56 64" stroke={cfg.accent} strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : emotion === "thoughtful" ? (
            <path d="M41 66 Q48 62 55 66" stroke={cfg.accent} strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : emotion === "curious" ? (
            <ellipse cx={48} cy={66} rx={6} ry={2.5} fill={cfg.accent} />
          ) : (
            // Balanced
            <ellipse cx={48} cy={66} rx={5} ry={2} fill={cfg.accent} />
          )}
        </svg>
        {showNameTag && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-xs font-semibold px-2 py-0.5 rounded bg-white/90 text-gray-700 shadow border border-gray-200" style={{marginTop: 4}}>
            {cfg.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default LyraAvatar;
