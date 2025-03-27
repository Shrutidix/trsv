import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Mountain, TreePine, Bird } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onCallClick: () => void;
  onWhatsAppClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCallClick, onWhatsAppClick }) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative w-24 h-20"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Sun with rays */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="relative">
                    <Sun className="text-yellow-400 w-10 h-10" />
                    {/* Animated rays */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-px h-3 bg-yellow-400/50"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 30}deg)`,
                          transformOrigin: '0 0'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Birds */}
                <motion.div
                  className="absolute top-4 left-8"
                  animate={{ x: [0, 20, 0], y: [0, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <Bird className="text-gray-600 w-3 h-3 transform -rotate-12" />
                </motion.div>
                <motion.div
                  className="absolute top-6 left-12"
                  animate={{ x: [0, 15, 0], y: [0, -3, 0] }}
                  transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
                >
                  <Bird className="text-gray-600 w-2 h-2 transform -rotate-12" />
                </motion.div>

                {/* Mountains with snow caps */}
                <motion.div
                  className="absolute bottom-0 w-full"
                  initial={{ scaleY: 0.9 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-12">
                    <Mountain className="absolute bottom-0 text-green-600 w-24 h-12" />
                    {/* Snow caps */}
                    <motion.div
                      className="absolute top-1 left-8 w-4 h-1 bg-white rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    />
                    <motion.div
                      className="absolute top-3 left-14 w-3 h-1 bg-white rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    />
                  </div>
                </motion.div>

                {/* Pine trees */}
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                >
                  <TreePine className="absolute bottom-2 left-2 text-green-500 w-4 h-4" />
                  <TreePine className="absolute bottom-1 left-6 text-green-500 w-3 h-3" />
                  <TreePine className="absolute bottom-3 right-2 text-green-500 w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1
                className="text-3xl font-bold text-green-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                UTTARAKHAND
              </motion.h1>
              <motion.p
                className="text-xl tracking-[0.3em] text-gray-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ROAD TRIP
              </motion.p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={onCallClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call us
            </Button>
            <Button 
              onClick={onWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Whatsapp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 