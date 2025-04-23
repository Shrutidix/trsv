import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative w-32 h-16">
        {/* Sun with rays */}
        <motion.div
          className="absolute top-2.5 left-1/3 transform -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <motion.div
              className="w-8 h-8 bg-yellow-400 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 12px rgba(250, 204, 21, 0.4)",
                  "0 0 20px rgba(250, 204, 21, 0.6)",
                  "0 0 12px rgba(250, 204, 21, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Sun Rays */}
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-yellow-400/30"
                style={{
                  height: '16px',
                  top: '50%',
                  left: '50%',
                  transformOrigin: '50% 0',
                  transform: `rotate(${i * 15}deg) translateX(-50%)`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.05
                }}
              />
            ))}
            {/* Flying Birds */}
            <motion.div
              className="absolute left-6 top-1"
              animate={{
                x: [0, 12, 0],
                y: [-1, 1, -1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-gray-600 text-xs">~</div>
            </motion.div>
            <motion.div
              className="absolute left-8 top-2"
              animate={{
                x: [0, 10, 0],
                y: [-1, 1, -1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-gray-600 text-xs">~</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mountains and River */}
        <motion.div
          className="absolute bottom-0 w-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* River */}
          <motion.div
            className="absolute bottom-0 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div
              className="absolute bottom-1 w-full h-1.5"
              animate={{ x: [-6, 6, -6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-blue-400/30" 
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 98% 100%, 85% 0%, 70% 100%, 55% 0%, 40% 100%, 25% 0%, 10% 100%, 2% 0%)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Mountain Range */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="relative w-full h-full">
            <div 
                className="absolute bottom-0 w-full h-full bg-green-500"
              style={{
                clipPath: 'polygon(0% 100%, 10% 60%, 20% 85%, 30% 40%, 40% 70%, 50% 30%, 60% 50%, 70% 20%, 80% 45%, 90% 60%, 100% 100%)'
              }}
              />
              {/* Pine Trees */}
              <motion.div
                animate={{ y: [0, -0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 right-4"
              >
                <div className="w-1.5 h-2.5 bg-green-500" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -0.5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-1 right-7"
              >
                <div className="w-1.5 h-2.5 bg-green-500" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute top-1.5 right-5.5"
              >
                <div className="w-1.5 h-2.5 bg-green-500" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Line */}
        <motion.div
          className="absolute -bottom-1 w-full h-0.5 bg-green-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        </div>

      {showText && (
        <div className="flex flex-col items-start">
          <motion.h1
            className="text-3xl font-bold text-green-500 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            UTTARAKHAND
          </motion.h1>
          <div className="flex items-center gap-2">
            <motion.div className="w-5 h-0.5 bg-green-500" 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              className="text-sm font-medium text-green-500 tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              TRIPS
            </motion.p>
            <motion.div className="w-5 h-0.5 bg-green-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo; 