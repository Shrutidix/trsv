import React, { useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Calendar, Gift, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Recommended banner image size: 400px × 250px (16:10 ratio)
// Change this URL to update the banner image without modifying code
const BANNER_IMAGE_URL = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop";

const VacationBanner = () => {
  const controls = useAnimation();
  
  // Shimmer animation sequence
  useEffect(() => {
    const shimmerSequence = async () => {
      await controls.start({
        background: [
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 0%)'
        ],
        x: ['0%', '100%'],
        transition: { 
          duration: 1.5,
          ease: "easeInOut",
        }
      });
      setTimeout(shimmerSequence, 4000);
    };
    
    shimmerSequence();
    
    return () => {
      controls.stop();
    };
  }, [controls]);

  return (
    <motion.section 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 mb-[-1rem]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-xl"
        />
        {/* Animated floating orbs */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-1/4 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-blue-300/10 rounded-full blur-xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                boxShadow: ["0 0 0px rgba(250, 204, 21, 0.2)", "0 0 20px rgba(250, 204, 21, 0.5)", "0 0 0px rgba(250, 204, 21, 0.2)"]
              }}
              transition={{ 
                scale: { duration: 0.5, delay: 0.4 },
                boxShadow: { 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 20, 0, -20, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </motion.div>
            </motion.div>
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl md:text-2xl font-bold text-white"
              >
                Holiday Special Offer!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-sm md:text-base text-white/80 mt-1"
              >
                Get up to 25% off on all packages
              </motion.p>
            </div>
          </motion.div>

          {/* Banner Image - Middle Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="order-3 md:order-2 w-auto max-w-[180px] md:max-w-[220px]"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative overflow-hidden rounded-lg shadow-md h-[110px] md:h-[140px]"
            >
              {/* Main image - use this URL for easy changes */}
              <img 
                src={BANNER_IMAGE_URL} 
                alt="Holiday Special Offer" 
                className="w-full h-full object-cover object-center rounded-lg"
              />
              {/* Overlay with shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-transparent mix-blend-overlay"></div>
              
              {/* Shimmer effect */}
              <motion.div 
                animate={controls}
                className="absolute inset-0 w-full h-full" 
              />
              
              {/* Promo badge */}
              <motion.div 
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{ 
                  scale: [0.9, 1.1, 0.9],
                  rotate: [12, 12, 12]
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 0.5
                  }
                }}
                className="absolute top-2 right-2 bg-yellow-500 text-primary-900 font-bold px-2 py-0.5 rounded-full text-xs shadow-md"
              >
                25% OFF
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="order-2 md:order-3 flex flex-row items-center gap-4"
          >
            <div className="hidden md:flex flex-col space-y-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-white/80"
              >
                <Gift className="w-4 h-4" />
                <span className="text-sm">Free Welcome Kit</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-white/80"
              >
                <Star className="w-4 h-4" />
                <span className="text-sm">Premium Service</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="default" className="bg-white text-primary-600 hover:bg-white/90 px-4 shadow-md group">
                Book Now
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                >
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VacationBanner;