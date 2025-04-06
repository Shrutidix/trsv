import React from 'react';
import { motion } from 'framer-motion';

interface DurgaIllustrationProps {
  className?: string;
}

const DurgaIllustration: React.FC<DurgaIllustrationProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ 
        y: [0, -10, 0],
        filter: [
          'drop-shadow(0 0 20px rgba(255,223,0,0.3))',
          'drop-shadow(0 0 40px rgba(255,223,0,0.6))',
          'drop-shadow(0 0 20px rgba(255,223,0,0.3))'
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full relative">
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-yellow-500/20 rounded-full filter blur-2xl transform scale-90" />
        
        {/* Durga Illustration */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Decorative Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255, 223, 0, 0.3)"
              strokeWidth="2"
              fill="none"
              animate={{
                strokeDasharray: ["0 283", "283 283"],
                rotate: [0, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Inner Glow */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="url(#glowGradient)"
            />

            {/* Durga Symbol */}
            <g transform="translate(50, 50)">
              <motion.path
                d="M0,-30 C15,-30 30,-15 30,0 C30,15 15,30 0,30 C-15,30 -30,15 -30,0 C-30,-15 -15,-30 0,-30 Z"
                fill="rgba(255, 223, 0, 0.2)"
                stroke="rgba(255, 223, 0, 0.5)"
                strokeWidth="1"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Third Eye */}
              <motion.path
                d="M-3,-5 L3,-5 L0,-2 Z"
                fill="rgba(255, 223, 0, 0.8)"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>

            {/* Sacred Text */}
            <text
              x="50"
              y="55"
              textAnchor="middle"
              className="text-2xl font-hindi fill-yellow-100"
              style={{ fontSize: "16px" }}
            >
              माँ दुर्गा
            </text>

            {/* Gradient Definitions */}
            <defs>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 223, 0, 0.3)" />
                <stop offset="100%" stopColor="rgba(255, 223, 0, 0)" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Om Symbol */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-yellow-200 text-4xl"
        >
          ॐ
        </motion.div>

        {/* Decorative Border */}
        <div className="absolute inset-0 border-4 border-yellow-200/20 rounded-full" />
      </div>
    </motion.div>
  );
};

export default DurgaIllustration; 