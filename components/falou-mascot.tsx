'use client';

import React from 'react';
import { motion } from 'motion/react';

interface FalouMascotProps {
  state?: 'idle' | 'speaking' | 'listening' | 'happy' | 'thinking';
  className?: string;
}

export const FalouMascot: React.FC<FalouMascotProps> = ({ state = 'idle', className = '' }) => {
  return (
    <motion.div
      className={`relative w-28 h-36 flex items-center justify-center select-none ${className}`}
      animate={
        state === 'happy'
          ? { y: [0, -10, 0, -6, 0] }
          : state === 'listening'
          ? { scale: [1, 1.04, 1] }
          : { y: [0, -3, 0] }
      }
      transition={{
        duration: state === 'happy' ? 0.6 : 2.5,
        repeat: state === 'happy' ? 1 : Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 160 210"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow below mascot */}
        <ellipse cx="80" cy="202" rx="42" ry="7" fill="black" fillOpacity="0.35" />

        {/* Mascot Body (Yellow onesie / clothes) */}
        <path
          d="M48 115 C48 102 112 102 112 115 L116 175 C116 186 106 195 94 195 L66 195 C54 195 44 186 44 175 Z"
          fill="#FACC15"
        />

        {/* Crescent moon embroidery on clothes */}
        <path
          d="M84 140 C80 137 77 142 77 146 C77 150 81 154 85 152 C81 152 79 148 80 144 C81 141 83 140 84 140 Z"
          fill="#CA8A04"
          fillOpacity="0.7"
        />

        {/* Small arms / sleeves */}
        <rect x="36" y="125" width="14" height="28" rx="7" fill="#EAB308" />
        <circle cx="43" cy="155" r="7" fill="#FED7AA" />

        <rect x="110" y="125" width="14" height="28" rx="7" fill="#EAB308" />
        <circle cx="117" cy="155" r="7" fill="#FED7AA" />

        {/* Feet / Legs */}
        <rect x="56" y="185" width="18" height="15" rx="7" fill="#EAB308" />
        <rect x="86" y="185" width="18" height="15" rx="7" fill="#EAB308" />

        {/* Head Base */}
        <ellipse cx="80" cy="85" rx="40" ry="36" fill="#FED7AA" />

        {/* Yellow Beanie / Hat */}
        <path
          d="M40 80 C38 48 55 24 80 18 C105 24 122 48 120 80 C114 74 104 70 80 70 C56 70 46 74 40 80 Z"
          fill="#FACC15"
        />
        {/* Hat cuff ribbing */}
        <rect x="38" y="70" width="84" height="14" rx="7" fill="#EAB308" />

        {/* Hat Pom-Pom at top */}
        <circle cx="80" cy="15" r="10" fill="#FACC15" />

        {/* Cute Big Eyes */}
        {state === 'happy' ? (
          // Happy smiling eyes (^ ^)
          <g stroke="#1E293B" strokeWidth="4" strokeLinecap="round">
            <path d="M60 88 Q67 80 74 88" />
            <path d="M86 88 Q93 80 100 88" />
          </g>
        ) : (
          // Big cartoon round eyes
          <g>
            {/* Left Eye */}
            <ellipse cx="67" cy="88" rx="8" ry="12" fill="#1E293B" />
            <circle cx="65" cy="84" r="3.5" fill="#FFFFFF" />
            <circle cx="69" cy="92" r="1.5" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="93" cy="88" rx="8" ry="12" fill="#1E293B" />
            <circle cx="91" cy="84" r="3.5" fill="#FFFFFF" />
            <circle cx="95" cy="92" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {/* Rosy Cheeks */}
        <ellipse cx="53" cy="97" rx="5.5" ry="3.5" fill="#FDA4AF" />
        <ellipse cx="107" cy="97" rx="5.5" ry="3.5" fill="#FDA4AF" />

        {/* Pink Pacifier (Chupeta estilizada como nas imagens) */}
        <circle cx="80" cy="103" r="8" fill="#FB7185" />
        <circle cx="80" cy="103" r="5" fill="#F43F5E" />
        <path
          d="M80 108 C76 114 84 114 80 108"
          stroke="#FDA4AF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Sparkles when happy */}
        {state === 'happy' && (
          <g fill="#FACC15">
            <polygon points="26,45 28,52 35,54 28,56 26,63 24,56 17,54 24,52" />
            <polygon points="135,40 137,46 143,48 137,50 135,56 133,50 127,48 133,46" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
