import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Mountain, MapPin, Hotel, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Destination {
  name: string;
  icon: React.ReactNode;
  price: string;
  rating: number;
  image: string;
}

const DESTINATIONS: Destination[] = [
  { 
    name: "Robber's Cave", 
    icon: <Mountain className="w-4 h-4" />, 
    price: "₹2,500", 
    rating: 4.8,
    image: "https://www.tourmyindia.com/states/uttarakhand/images/robbers-cave-dehradun1.jpg"
  },
  { 
    name: "Sahastradhara", 
    icon: <MapPin className="w-4 h-4" />, 
    price: "₹1,800", 
    rating: 4.6,
    image: "https://www.tourmyindia.com/states/uttarakhand/images/sahastradhara-dehradun1.jpg"
  },
  { 
    name: "Tapkeshwar Temple", 
    icon: <Hotel className="w-4 h-4" />, 
    price: "₹1,200", 
    rating: 4.7,
    image: "https://www.holidify.com/images/cmsuploads/compressed/attr_2340_20220113173917.jpg"
  }
];

const VacationBanner: React.FC = () => {
  const handleWhatsAppClick = (destination: Destination) => {
    const message = `Hi, I want to ask about ${destination.name}. What's included in the package for ${destination.price}?`;
    const whatsappUrl = `https://wa.me/918077757674?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookNowClick = () => {
    window.location.href = '/#booking-form';
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl shadow-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              <span className="text-amber-400 text-lg font-semibold">Our Services</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Comprehensive Travel Services
            </h2>
            <p className="text-white/95 text-xl mb-8 leading-relaxed max-w-2xl">
              Make your North India journey memorable with our expert travel services. From customized itineraries to comfortable accommodations, we ensure a seamless travel experience.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-amber-400 text-slate-900 hover:bg-amber-300 px-10 py-4 text-xl font-bold shadow-lg"
                onClick={handleBookNowClick}
              >
                Book Now
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-2/3">
            {DESTINATIONS.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden cursor-pointer shadow-xl"
                  onClick={() => handleWhatsAppClick(destination)}
                >
                  <div className="relative h-48">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${destination.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {destination.icon}
                          <span className="text-white font-bold text-lg">{destination.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                          <span className="text-white font-semibold text-lg">{destination.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-white/95 text-base font-semibold">Starting from</span>
                        <span className="text-amber-400 font-bold text-xl">{destination.price}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationBanner; 