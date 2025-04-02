import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Calendar as CalendarIcon, Gift, Sparkles, Star, ArrowRight, Check, MapPin, PartyPopper, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DurgaIllustration from './DurgaIllustration';

// Types
interface Festival {
  name: string;
  date: string;
  greeting: string;
  description: string;
}

interface CalendarDay {
  date: Date;
  isHoliday: boolean;
  name: string;
  isWeekend: boolean;
  isFestival: boolean;
  isSuggestedLeave?: boolean;
  festivalDetails?: Festival;
}

interface HolidaySequence {
  indices: number[];
  length: number;
}

// Recommended banner image size: 400px × 250px (16:10 ratio)
// Change this URL to update the banner image without modifying code - use a North India destination image
const BANNER_IMAGE_URL = "https://images.unsplash.com/photo-1514071838924-c1c72c35fd67?q=80&w=1000&auto=format&fit=crop";

// Update these festival details as needed
const FESTIVALS: Festival[] = [
  {
    name: "दुर्गा पूजा",
    date: "1 Apr",
    greeting: "🙏 शुभ दुर्गा पूजा 🙏",
    description: "माँ दुर्गा आप सभी को सुख, समृद्धि और शक्ति प्रदान करें"
  },
  {
    name: "Diwali",
    date: "2 Apr",
    greeting: "Happy Diwali! Festival of Lights ✨",
    description: "दीपावली की हार्दिक शुभकामनाएं"
  },
  {
    name: "Bhai Dooj",
    date: "3 Apr",
    greeting: "Happy Bhai Dooj! Celebrate the bond of siblings 💫",
    description: "भाई दूज की शुभकामनाएं"
  },
  {
    name: "Govardhan Puja",
    date: "4 Apr",
    greeting: "Happy Govardhan Puja! 🙏",
    description: "श्री कृष्ण की कृपा सदा बनी रहे"
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
  
  // Force the banner to be visible
  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);
  
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
    const days: CalendarDay[] = [];
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

  const calendarDays: CalendarDay[] = generateCalendarDays();
  
  // Find continuous holiday sequences
  const findHolidaySequences = () => {
    const sequences: HolidaySequence[] = [];
    let currentSequence: number[] = [];
    
    // Add a working day we can take off - after 2-day sequence of holidays
    let potentialLeaveDay: number | null = null;
    
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
    try {
      if (upcomingFestival && upcomingFestival.festivalDetails) {
      return upcomingFestival.festivalDetails.greeting;
    } else if (hasLongWeekend) {
      return "Yay! Extended Holidays! Perfect for a trip! 🎉";
    } else if (sequences.length > 0) {
      return "Yay! Holiday time! Plan a quick getaway! 🌴";
      }
    } catch (error) {
      console.error('Error generating greeting:', error);
    }
    return "Plan your next holiday trip!";
  };
  
  const greeting = generateGreeting();

  return (
    <motion.section 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500 min-h-[180px] py-4"
    >
      {/* Durga Puja Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Diyas */}
        {[...Array(15)].map((_, i) => (
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
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-yellow-300 rounded-full"
            style={{ 
              top: `${10 + Math.random() * 80}%`, 
              left: `${Math.random() * 100}%`,
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Festival Message */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                boxShadow: ["0 0 0px rgba(255,223,0,0.2)", "0 0 30px rgba(255,223,0,0.5)", "0 0 0px rgba(255,223,0,0.2)"]
              }}
              transition={{ 
                scale: { duration: 0.5 },
                boxShadow: { 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              className="inline-block mb-4"
            >
              <span className="text-3xl md:text-4xl font-bold text-yellow-100">
                {FESTIVALS[0].greeting}
              </span>
          </motion.div>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-hindi text-xl md:text-2xl text-yellow-100/90"
            >
              {FESTIVALS[0].description}
            </motion.p>
          </motion.div>

          {/* Durga Illustration */}
          <div className="flex-shrink-0 w-48 h-48">
            <DurgaIllustration className="w-full h-full" />
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <Button 
              className="bg-yellow-100 text-red-700 hover:bg-yellow-200 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = "/contact"}
            >
              Book Special Puja Package
              </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VacationBanner; 