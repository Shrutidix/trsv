import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Calendar as CalendarIcon, Gift, Sparkles, Star, ArrowRight, Check, MapPin, PartyPopper, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Recommended banner image size: 400px × 250px (16:10 ratio)
// Change this URL to update the banner image without modifying code - use a North India destination image
const BANNER_IMAGE_URL = "https://images.unsplash.com/photo-1514071838924-c1c72c35fd67?q=80&w=1000&auto=format&fit=crop";

// Update these festival details as needed
const FESTIVALS = [
  {
    name: "Diwali",
    date: "12 Nov",
    greeting: "Happy Diwali! Festival of Lights ✨"
  },
  {
    name: "Bhai Dooj",
    date: "15 Nov",
    greeting: "Happy Bhai Dooj! Celebrate the bond of siblings 💫"
  },
  {
    name: "Govardhan Puja",
    date: "13 Nov",
    greeting: "Happy Govardhan Puja! 🙏"
  }
];

// Get current month and next month names
const getCurrentMonthName = (date = new Date()) => {
  return date.toLocaleString('default', { month: 'short' });
};

const VacationBanner = () => {
  const controls = useAnimation();
  const [currentDate] = useState(new Date());
  const currentMonth = getCurrentMonthName(currentDate);
  
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

  // Get current year, month, and day
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  // For demo purposes - these would be actual holiday dates in production
  // We're creating a 10-day calendar from today
  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date(year, month, day + i);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Check if this date matches any festival
      const matchingFestival = FESTIVALS.find(f => {
        const [festDay, festMonth] = f.date.split(' ');
        return date.getDate() === parseInt(festDay) && 
               getCurrentMonthName(date).toLowerCase() === festMonth.toLowerCase();
      });
      
      // Every 3rd and 7th day is a holiday (for demo)
      const isCustomHoliday = i === 3 || i === 7;
      
      days.push({
        date,
        isHoliday: isWeekend || isCustomHoliday || Boolean(matchingFestival),
        name: matchingFestival ? matchingFestival.name : isWeekend ? (dayOfWeek === 0 ? "Sunday" : "Saturday") : (isCustomHoliday ? "Holiday" : ""),
        isWeekend,
        isFestival: Boolean(matchingFestival),
        festivalDetails: matchingFestival
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Find continuous holiday sequences
  const findHolidaySequences = () => {
    const sequences = [];
    let currentSequence = [];
    
    // Add a working day we can take off - after 2-day sequence of holidays
    let potentialLeaveDay = null;
    
    calendarDays.forEach((day, index) => {
      if (day.isHoliday) {
        currentSequence.push(index);
        
        // Check if the next day is a working day followed by a holiday
        if (index < calendarDays.length - 2 && 
            !calendarDays[index + 1].isHoliday && 
            calendarDays[index + 2].isHoliday) {
          potentialLeaveDay = index + 1;
        }
      } else {
        if (currentSequence.length >= 2) {
          sequences.push({
            indices: [...currentSequence],
            length: currentSequence.length
          });
        }
        currentSequence = [];
      }
    });
    
    // Check for any remaining sequence at the end
    if (currentSequence.length >= 2) {
      sequences.push({
        indices: [...currentSequence],
        length: currentSequence.length
      });
    }
    
    return { sequences, potentialLeaveDay };
  };
  
  const { sequences, potentialLeaveDay } = findHolidaySequences();
  
  // Update calendar days to mark the potential leave day
  if (potentialLeaveDay !== null) {
    calendarDays[potentialLeaveDay].isSuggestedLeave = true;
  }
  
  // Check if we have any holiday sequence of 3+ days
  const hasLongWeekend = sequences.some(seq => seq.length >= 3);
  
  // Check if we have any festival in the next few days
  const upcomingFestival = calendarDays.find(day => day.isFestival);
  
  // Format the holiday start date in a user-friendly way
  const holidayStartDate = sequences.length > 0 ? 
    calendarDays[sequences[0].indices[0]].date : null;
  
  const formattedStartDate = holidayStartDate ? 
    `${holidayStartDate.getDate()} ${holidayStartDate.toLocaleString('default', { month: 'short' })}` : '';
  
  // Generate greeting message
  const generateGreeting = () => {
    if (upcomingFestival) {
      return upcomingFestival.festivalDetails.greeting;
    } else if (hasLongWeekend) {
      return "Yay! Extended Holidays! Perfect for a trip! 🎉";
    } else if (sequences.length > 0) {
      return "Yay! Holiday time! Plan a quick getaway! 🌴";
    } else {
      return "Plan your next holiday trip!";
    }
  };
  
  const greeting = generateGreeting();

  return (
    <motion.section 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-primary-600 to-orange-500 mb-[-1rem]"
    >
      {/* Festival decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating lights */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4], 
              scale: 1,
              boxShadow: [
                "0 0 10px 2px rgba(255, 191, 0, 0.5)",
                "0 0 20px 5px rgba(255, 191, 0, 0.8)",
                "0 0 10px 2px rgba(255, 191, 0, 0.5)"
              ]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-yellow-300 rounded-full"
            style={{ 
              top: `${15 + Math.random() * 70}%`, 
              left: `${Math.random() * 100}%`,
              filter: "blur(1px)"
            }}
          />
        ))}
        
        {/* Decorative background elements */}
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
          className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-orange-300/10 rounded-full blur-xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left Content - Festival Message */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-1"
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
              className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full flex-shrink-0"
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
                {upcomingFestival ? (
                  <Flame className="w-5 h-5 text-yellow-300" />
                ) : (
                  <PartyPopper className="w-5 h-5 text-yellow-300" />
                )}
              </motion.div>
            </motion.div>
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg md:text-xl font-bold text-white"
              >
                {greeting}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-0.5"
              >
                <p className="text-xs md:text-sm text-white/80">
                  {hasLongWeekend || sequences.length > 0 ? (
                    <>Time to explore the wonders of North India!</>
                  ) : (
                    <>Discover the magic of North India</>
                  )}
                </p>
                {(hasLongWeekend || sequences.length > 0) && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-1 flex items-center"
                  >
                    <motion.span 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        color: [
                          'rgba(255, 255, 255, 0.9)', 
                          'rgba(250, 204, 21, 1)', 
                          'rgba(255, 255, 255, 0.9)'
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                      className="text-xs font-bold bg-white/20 text-white rounded-full px-2 py-0.5 flex items-center"
                    >
                      <span className="mr-1">
                        {hasLongWeekend && sequences.find(seq => seq.length >= 3) 
                          ? `${sequences.find(seq => seq.length >= 3)?.length}+ Days Vacation` 
                          : sequences.length > 0 
                            ? `${sequences[0]?.length}-Day Break` 
                            : "Holiday"}
                      </span>
                      <span className="text-yellow-300">•</span>
                      <span className="ml-1">Starts {formattedStartDate}</span>
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Middle Content - Holiday Calendar - REDESIGNED COMPACT VERSION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="order-3 md:order-2 flex-shrink-0 w-auto md:w-48"
          >
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white/15 backdrop-blur-md rounded-lg overflow-hidden shadow-lg border border-white/20"
            >
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-orange-600 to-pink-600 px-2 py-1.5 flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="w-3 h-3 text-white mr-1.5" />
                  <span className="text-white font-medium text-xs">Holidays</span>
                </div>
                <div className="text-xs text-white/80 font-medium">
                  {currentMonth}
                </div>
              </div>
              
              {/* Calendar Content - Redesigned */}
              <div className="p-1.5">
                {/* Days - More compact design */}
                <div className="flex flex-col space-y-1">
                  {calendarDays.slice(0, 4).map((day, index) => {
                    // Get indices of all holiday sequences this day belongs to
                    const belongsToSequence = sequences.filter(seq => 
                      seq.indices.includes(index)
                    );
                    
                    // Check if this is in a sequence
                    const isInAnySequence = belongsToSequence.length > 0;
                    
                    const dayLabel = day.date.getDate();
                    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.date.getDay()];
                    
                    // Status indicator color
                    let statusColor = 'bg-gray-300/20';
                    let textColor = 'text-white/70';
                    let borderColor = '';
                    
                    if (day.isFestival) {
                      statusColor = 'bg-red-500';
                      textColor = 'text-white';
                      borderColor = isInAnySequence ? 'border-l-2 border-yellow-400/50' : '';
                    } else if (day.isWeekend) {
                      statusColor = 'bg-blue-400';
                      textColor = 'text-white';
                      borderColor = isInAnySequence ? 'border-l-2 border-yellow-400/50' : '';
                    } else if (day.isHoliday) {
                      statusColor = 'bg-green-400';
                      textColor = 'text-white';
                      borderColor = isInAnySequence ? 'border-l-2 border-yellow-400/50' : '';
                    } else if (day.isSuggestedLeave) {
                      statusColor = 'bg-yellow-400';
                      textColor = 'text-yellow-200';
                      borderColor = 'border-l-2 border-dashed border-yellow-300/50';
                    }
                    
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className={`flex items-center rounded bg-white/5 ${borderColor}`}
                      >
                        {/* Date circle */}
                        <div className="flex items-center justify-center h-8 w-8 flex-shrink-0">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`h-6 w-6 flex items-center justify-center rounded-full ${
                              day.isSuggestedLeave ? 'bg-yellow-500/20 border border-dashed border-yellow-300' : 'bg-white/10'
                            }`}
                          >
                            <span className="text-xs font-bold text-white">{dayLabel}</span>
                          </motion.div>
                        </div>
                        
                        {/* Day info */}
                        <div className="flex flex-col ml-1 flex-1 py-0.5">
                          <div className="flex items-center">
                            <span className={`text-xs font-medium truncate ${textColor}`}>
                              {dayOfWeek} {day.name ? `• ${day.name}` : ''}
                            </span>
                            {day.isSuggestedLeave && (
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="ml-1 w-1.5 h-1.5 rounded-full bg-yellow-400"
                              />
                            )}
                          </div>
                          <div className="flex items-center mt-0.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`}></div>
                            <span className="text-[8px] text-white/50 ml-1">
                              {day.isFestival 
                                ? 'Festival' 
                                : day.isWeekend 
                                  ? 'Weekend' 
                                  : day.isHoliday 
                                    ? 'Holiday' 
                                    : day.isSuggestedLeave 
                                      ? 'Take Leave!'
                                      : 'Working'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Miniature day indicators for remaining days */}
                  {calendarDays.length > 4 && (
                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/10">
                      {calendarDays.slice(4, 8).map((day, index) => {
                        let bgColor = 'bg-white/10';
                        if (day.isFestival) bgColor = 'bg-red-500/40';
                        else if (day.isWeekend) bgColor = 'bg-blue-500/40';
                        else if (day.isHoliday) bgColor = 'bg-green-500/40';
                        else if (day.isSuggestedLeave) bgColor = 'bg-yellow-500/40';
                        
                        return (
                          <motion.div
                            key={index + 4}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + (index * 0.1) }}
                            className={`w-8 h-5 flex items-center justify-center rounded-sm ${bgColor}`}
                          >
                            <span className="text-[9px] text-white font-medium">{day.date.getDate()}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {/* Vacation indicator - more compact */}
                {(hasLongWeekend || potentialLeaveDay !== null) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-1.5 bg-gradient-to-r from-yellow-500/30 to-red-500/30 p-1 rounded text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <span className="text-[9px] text-white font-medium">
                        {potentialLeaveDay !== null 
                          ? "Take one day off for a long vacation! 🌟" 
                          : (hasLongWeekend ? "Perfect for North India trip! 🏔️" : "")}
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="order-2 md:order-3 flex flex-col items-center gap-1.5 flex-1 md:flex-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white font-medium shadow-lg w-full md:w-auto"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-full h-full bg-yellow-500 rounded-full filter blur-xl opacity-40"
                />
              </div>
              
              <Button 
                size="sm" 
                className="relative z-10 bg-transparent border-none text-white hover:bg-white/20 px-3 shadow-md group w-full md:w-auto"
                onClick={() => window.location.href = "/packages"}
              >
                <span className="mr-1.5 text-sm">Book North India Package</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                >
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5">
              <MapPin className="w-2.5 h-2.5 text-yellow-200" />
              <span className="text-[10px] text-white">Exclusive holiday deals</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VacationBanner; 