import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Gift, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VacationBanner = () => {
  return (
    <motion.section 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400"
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
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </motion.div>
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-2xl font-bold text-white"
              >
                Holiday Special Offer!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-base text-white/80 mt-1"
              >
                Get up to 25% off on all packages
              </motion.p>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-6"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2 text-white/80"
            >
              <Gift className="w-5 h-5" />
              <span className="text-base">Free Welcome Kit</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 text-white/80"
            >
              <Star className="w-5 h-5" />
              <span className="text-base">Premium Service</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button size="default" className="bg-white text-primary-600 hover:bg-white/90 px-6">
                Book Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VacationBanner; 