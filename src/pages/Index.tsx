import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchTabs from '@/components/SearchTabs';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { 
  Car, Phone, CheckCircle, Award, Shield, Mountain, MapPin, Tent, Calendar, Clock, Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DatePickerWithOccasions } from '@/components/DatePickerWithOccasions';
import RouteDetails from '@/components/RouteDetails';

// Add useInView hook at the top of the file
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView];
};

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedRoute, setSelectedRoute] = useState<typeof popularRoutes[0] | null>(null);
  const [passengerCount, setPassengerCount] = useState("1-3");
  
  // Create refs for each section
  const [statsRef, statsInView] = useInView();
  const [whyChooseRef, whyChooseInView] = useInView();
  const [destinationsRef, destinationsInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [packagesRef, packagesInView] = useInView();
  const [testimonialRef, testimonialInView] = useInView();

  // Sample data
  const destinations = [
    {
      id: 'shimla',
      name: 'Shimla',
      image: 'https://images.unsplash.com/photo-1626621934657-30a927b31aad?q=80&w=2070&auto=format&fit=crop',
      location: 'Himachal Pradesh',
      description: 'Experience the charm of the colonial hill station with panoramic views of the Himalayan peaks.',
    },
    {
      id: 'manali',
      name: 'Manali',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
      location: 'Himachal Pradesh',
      description: 'Discover adventure sports, lush green valleys, and snow-capped mountains in this beautiful town.',
    },
    {
      id: 'dharamshala',
      name: 'Dharamshala',
      image: 'https://images.unsplash.com/photo-1606467848663-d79b02e0afb2?q=80&w=2071&auto=format&fit=crop',
      location: 'Himachal Pradesh',
      description: 'Home to the Dalai Lama, this hill station offers stunning views and a unique blend of Indian and Tibetan culture.',
    },
    {
      id: 'nainital',
      name: 'Nainital',
      image: 'https://images.unsplash.com/photo-1598091400561-7e6e9c698e06?q=80&w=2070&auto=format&fit=crop',
      location: 'Uttarakhand',
      description: 'A charming lake town surrounded by mountains, offering boating and scenic treks.',
    },
  ];

  const packages = [
    {
      id: 'shimla-manali',
      name: 'Shimla Manali Tour',
      image: 'https://images.unsplash.com/photo-1626621934657-30a927b31aad?q=80&w=2070&auto=format&fit=crop',
      destination: 'Shimla & Manali',
      duration: '6 Days / 5 Nights',
      price: 15999,
      rating: 4.8,
      features: ['Taxi', 'Hotel', '4 Activities'],
      isPopular: true,
      description: 'Experience the best of Himachal Pradesh with this comprehensive tour package.',
    },
    {
      id: 'golden-triangle',
      name: 'Golden Triangle',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2070&auto=format&fit=crop',
      destination: 'Delhi, Agra & Jaipur',
      duration: '5 Days / 4 Nights',
      price: 18500,
      rating: 4.6,
      features: ['Taxi', 'Hotel', '5 Activities'],
      isPopular: true,
      description: 'Explore the cultural richness and historic monuments of North India.',
    },
    {
      id: 'valley-of-flowers',
      name: 'Valley of Flowers Trek',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
      destination: 'Uttarakhand',
      duration: '7 Days / 6 Nights',
      price: 22999,
      rating: 4.9,
      features: ['Transport', 'Stay', 'Trek Guide'],
      isPopular: false,
      description: 'Trek through the stunning valley known for its endemic alpine flowers and meadows.',
    },
    {
      id: 'ladakh-adventure',
      name: 'Ladakh Adventure',
      image: 'https://images.unsplash.com/photo-1626621934657-30a927b31aad?q=80&w=2070&auto=format&fit=crop',
      destination: 'Ladakh',
      duration: '8 Days / 7 Nights',
      price: 28500,
      rating: 4.7,
      features: ['Bike Rental', 'Stay', 'Camping'],
      isPopular: true,
      description: 'Embark on a thrilling adventure through the stunning landscapes of Ladakh.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      rating: 5,
      text: 'My trip to Manali was flawless. HimalayaJoy arranged everything perfectly from hotel to taxi. Our driver was very knowledgeable and friendly!',
      destination: 'Manali Trip',
    },
    {
      name: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2071&auto=format&fit=crop',
      rating: 4,
      text: 'We had a wonderful time exploring Shimla. The package was exactly as described, and the support team was always available when needed.',
      destination: 'Shimla Package',
    },
    {
      name: 'Anjali Kapoor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop',
      rating: 5,
      text: 'The Ladakh tour exceeded all expectations. The itinerary was perfectly balanced with adventure activities and time to relax and enjoy the scenery.',
      destination: 'Ladakh Adventure',
    },
  ];

  // Add this after the destinations array
  const popularRoutes = [
    {
      id: 1,
      from: "Dehradun",
      to: "Mussoorie",
      distance: "35",
      duration: 1.5,
      description: "A scenic hill station journey with panoramic views of the Himalayas",
      image: "/images/mussoorie.jpg",
      stops: ["Dehradun", "Mussoorie Mall Road", "Kempty Falls", "Company Garden"],
      attractions: ["Mall Road", "Kempty Falls", "Gun Hill", "Company Garden", "Cloud's End"],
      vehicles: {
        sedan: {
          price: 1500,
          description: "Comfortable sedan for up to 4 passengers"
        },
        suv: {
          price: 2000,
          description: "Spacious SUV for up to 6 passengers"
        },
        luxury: {
          price: 3500,
          description: "Premium luxury car for a superior experience"
        },
        tempo: {
          price: 2500,
          description: "Tempo traveller for groups up to 12 passengers"
        }
      }
    },
    {
      id: 2,
      from: "Dehradun",
      to: "Haridwar",
      distance: "52",
      duration: 1.5,
      description: "Sacred city journey to witness the holy Ganga Aarti",
      image: "/images/haridwar.jpg",
      stops: ["Dehradun", "Har Ki Pauri", "Mansa Devi Temple"],
      attractions: ["Har Ki Pauri", "Mansa Devi Temple", "Chandi Devi Temple", "Ganga Aarti"],
      vehicles: {
        sedan: {
          price: 1800,
          description: "Comfortable sedan for up to 4 passengers"
        },
        suv: {
          price: 2200,
          description: "Spacious SUV for up to 6 passengers"
        },
        luxury: {
          price: 3800,
          description: "Premium luxury car for a superior experience"
        },
        tempo: {
          price: 2800,
          description: "Tempo traveller for groups up to 12 passengers"
        }
      }
    },
    {
      id: 3,
      from: "Dehradun",
      to: "Rishikesh",
      distance: "43",
      duration: 1.25,
      description: "Adventure capital with spiritual essence and river rafting",
      image: "/images/rishikesh.jpg",
      stops: ["Dehradun", "Laxman Jhula", "Ram Jhula", "Triveni Ghat"],
      attractions: ["River Rafting", "Laxman Jhula", "Ram Jhula", "Beatles Ashram", "Triveni Ghat"],
      vehicles: {
        sedan: {
          price: 1600,
          description: "Comfortable sedan for up to 4 passengers"
        },
        suv: {
          price: 2100,
          description: "Spacious SUV for up to 6 passengers"
        },
        luxury: {
          price: 3600,
          description: "Premium luxury car for a superior experience"
        },
        tempo: {
          price: 2600,
          description: "Tempo traveller for groups up to 12 passengers"
        }
      }
    }
  ];

  // Define animation styles
  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes float-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes drive {
      0% { transform: translateX(-15%); }
      100% { transform: translateX(115%); }
    }
    
    @keyframes bob {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-5px) rotate(2deg); }
      75% { transform: translateY(5px) rotate(-2deg); }
    }
    
    @keyframes fly {
      0% { transform: translate(-30px, 10px); }
      50% { transform: translate(30px, -10px); }
      100% { transform: translate(-30px, 10px); }
    }
    
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes rise-sun {
      0% { transform: translate(-50%, 100%); }
      100% { transform: translate(-50%, 0%); }
    }
    
    @keyframes fill-sun {
      0% { fill-opacity: 0; }
      100% { fill-opacity: 1; }
    }
    
    @keyframes fill-rays {
      0% { stroke-dashoffset: 10; }
      100% { stroke-dashoffset: 0; }
    }
    
    @keyframes fill-india {
      0% { fill-opacity: 0; }
      100% { fill-opacity: 0.5; }
    }
    
    @keyframes fill-element {
      0% { fill-opacity: 0; }
      100% { fill-opacity: 1; }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-slow {
      animation: float-slow 8s ease-in-out infinite;
    }
    
    .animate-drive {
      animation: drive 15s linear infinite;
    }
    
    .animate-bob {
      animation: bob 4s ease-in-out infinite;
    }
    
    .animate-fly {
      animation: fly 15s ease-in-out infinite;
    }
    
    .animate-bounce-slow {
      animation: bounce-slow 3s ease-in-out infinite;
    }
    
    .animate-rise-sun {
      animation: rise-sun 3s ease-out forwards;
    }
    
    .animate-fill-sun {
      animation: fill-sun 2s ease-in forwards 1s;
    }
    
    .animate-fill-rays {
      animation: fill-rays 2s ease-in forwards 2s;
    }
    
    .animate-fill-india {
      animation: fill-india 3s ease-in forwards 2.5s;
    }
    
    .animate-fill-element-1 {
      animation: fill-element 1s ease-in forwards 0.2s;
    }
    
    .animate-fill-element-2 {
      animation: fill-element 1s ease-in forwards 0.4s;
    }
    
    .animate-fill-element-3 {
      animation: fill-element 1s ease-in forwards 0.6s;
    }
    
    .animate-fill-element-4 {
      animation: fill-element 1s ease-in forwards 0.8s;
    }
    
    .animate-fill-element-5 {
      animation: fill-element 1s ease-in forwards 1.0s;
    }
    
    .animate-fill-element-6 {
      animation: fill-element 1s ease-in forwards 1.2s;
    }
    
    .animate-fill-element-7 {
      animation: fill-element 1s ease-in forwards 1.4s;
    }
    
    .animate-fill-element-8 {
      animation: fill-element 1s ease-in forwards 1.6s;
    }
    
    .animate-fill-element-9 {
      animation: fill-element 1s ease-in forwards 1.8s;
    }
    
    .animate-fill-element-compass {
      animation: fill-element 1s ease-in forwards 2.0s;
    }
    
    .animate-fill-element-needle {
      animation: fill-element 1s ease-in forwards 2.2s;
    }
    
    .animate-fill-element-balloon {
      animation: fill-element 1s ease-in forwards 2.4s;
    }
    
    .animate-fill-element-basket {
      animation: fill-element 1s ease-in forwards 2.6s;
    }
    
    .animate-fill-element-temple-1 {
      animation: fill-element 1s ease-in forwards 2.8s;
    }
    
    .animate-fill-element-temple-2 {
      animation: fill-element 1s ease-in forwards 3.0s;
    }
    
    .animate-fill-element-temple-3 {
      animation: fill-element 1s ease-in forwards 3.2s;
    }
    
    .animate-fill-element-temple-door {
      animation: fill-element 1s ease-in forwards 3.4s;
    }
    
    .animate-fill-element-taj-1 {
      animation: fill-element 1s ease-in forwards 3.6s;
    }
    
    .animate-fill-element-taj-2 {
      animation: fill-element 1s ease-in forwards 3.8s;
    }
    
    .animate-fill-element-taj-3 {
      animation: fill-element 1s ease-in forwards 4.0s;
    }
    
    .animate-fill-element-taj-door {
      animation: fill-element 1s ease-in forwards 4.2s;
    }
    
    .bg-grid-pattern {
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 20px 20px;
    }

    /* Scroll Animations */
    .fade-up-enter {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-up-enter-active {
      opacity: 1;
      transform: translateY(0);
    }

    .fade-in-enter {
      opacity: 0;
      transition: opacity 0.8s ease;
    }
    
    .fade-in-enter-active {
      opacity: 1;
    }

    .scale-up-enter {
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scale-up-enter-active {
      opacity: 1;
      transform: scale(1);
    }

    .stagger-enter > * {
      opacity: 0;
      transform: translateY(20px);
    }
    
    .stagger-enter-active > * {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .stagger-enter-active > *:nth-child(1) { transition-delay: 0.1s; }
    .stagger-enter-active > *:nth-child(2) { transition-delay: 0.2s; }
    .stagger-enter-active > *:nth-child(3) { transition-delay: 0.3s; }
    .stagger-enter-active > *:nth-child(4) { transition-delay: 0.4s; }
  `;

  // Insert animation styles
  const insertStyles = () => {
    if (typeof document !== 'undefined') {
      const styleEl = document.createElement('style');
      styleEl.innerHTML = animationStyles;
      document.head.appendChild(styleEl);
    }
  };

  // Call the function when the component mounts
  React.useEffect(() => {
    insertStyles();
    return () => {
      // Optional cleanup - remove the style element when component unmounts
      if (typeof document !== 'undefined') {
        const styleEl = document.querySelector('style[data-animation-styles]');
        if (styleEl) {
          styleEl.remove();
        }
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section - Professional redesign with realistic car animations */}
      <section className="relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-fixed py-8 before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-900/80 before:via-blue-900/70 before:to-indigo-900/60 before:backdrop-blur-[2px]">
        {/* Car Animation Container - Will change based on selection */}
        <div className="absolute inset-0 overflow-hidden">
          {/* SVG Car Animation - Moving from left to right */}
          <div id="carAnimationContainer" className="w-full h-full relative">
            <div className="absolute bottom-20 left-0 animate-drive">
              <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="w-32 h-auto">
                {/* Car Body */}
                <rect x="10" y="20" width="100" height="20" rx="8" fill="#1e40af" />
                <rect x="20" y="10" width="60" height="15" rx="5" fill="#1e40af" />
                {/* Windows */}
                <rect x="25" y="12" width="20" height="12" rx="2" fill="#a5f3fc" />
                <rect x="55" y="12" width="20" height="12" rx="2" fill="#a5f3fc" />
                {/* Wheels */}
                <circle cx="30" cy="40" r="10" fill="#000000" />
                <circle cx="30" cy="40" r="5" fill="#4b5563" />
                <circle cx="90" cy="40" r="10" fill="#000000" />
                <circle cx="90" cy="40" r="5" fill="#4b5563" />
                {/* Headlights */}
                <rect x="110" y="25" width="5" height="10" rx="2" fill="#fef08a" />
                {/* Taillights */}
                <rect x="5" y="25" width="5" height="10" rx="2" fill="#ef4444" />
              </svg>
            </div>
          </div>
          
          {/* Road animation with improved design */}
          <div className="absolute bottom-0 left-0 right-0 h-40">
            <div className="relative w-full h-full overflow-hidden">
              {/* Road Surface */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-gray-800 to-gray-900">
                {/* Road Markings */}
                <div className="absolute inset-x-0 bottom-12 h-4">
                  <div className="animate-road w-full flex">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="h-2 w-20 bg-yellow-400 mx-12 rounded-full shadow-lg"></div>
                    ))}
                  </div>
                </div>
                {/* Road Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">
              India's Premier Taxi Booking Service
            </h1>
            <p className="text-xl text-white text-center drop-shadow-md">
              Travel in style and comfort with our luxury fleet
            </p>
          </div>

          {/* Booking form panel */}
          <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-white/95 via-primary-50/90 to-blue-50/85 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/30 overflow-visible mb-16">
            <div className="p-8 relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* From Location */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-base font-medium mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" /> From
                  </label>
                  <div className="relative">
                    <select className="block w-full h-16 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-3 px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg transition-all hover:bg-white/80">
                      <option>Select pickup point</option>
                      <option>Delhi</option>
                      <option>Mumbai</option>
                      <option>Bangalore</option>
                      <option>Kolkata</option>
                      <option>Chennai</option>
                      <option>Hyderabad</option>
                      <option>Jaipur</option>
                      <option>Shimla</option>
                      <option>Manali</option>
                      <option>Chandigarh</option>
                      <option>Dehradun</option>
                      <option>Lucknow</option>
                      <option>Agra</option>
                      <option>Varanasi</option>
                      <option>Amritsar</option>
                    </select>
                  </div>
                </div>

                {/* To Location */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-base font-medium mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" /> To
                  </label>
                  <div className="relative">
                    <select className="block w-full h-16 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-3 px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg transition-all hover:bg-white/80">
                      <option>Select destination</option>
                      <option>Manali</option>
                      <option>Shimla</option>
                      <option>Dharamshala</option>
                      <option>Dalhousie</option>
                      <option>Kasol</option>
                      <option>Mussoorie</option>
                      <option>Nainital</option>
                      <option>Rishikesh</option>
                      <option>Haridwar</option>
                      <option>Kedarnath</option>
                      <option>Badrinath</option>
                      <option>Valley of Flowers</option>
                      <option>Jim Corbett</option>
                      <option>Lansdowne</option>
                      <option>Auli</option>
                      <option>Chopta</option>
                      <option>Kasauli</option>
                      <option>McLeodganj</option>
                      <option>Spiti Valley</option>
                    </select>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-base font-medium mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" /> Date
                  </label>
                  <div className="relative">
                    <DatePickerWithOccasions 
                      className="block w-full h-16 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-3 px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg transition-all hover:bg-white/80" 
                    />
                  </div>
                </div>

                {/* Passenger Count */}
                <div className="col-span-1 md:col-span-3">
                  <label className="block text-gray-700 text-base font-medium mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" /> Passengers
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["1-3", "4-6", "7-12", "13+"].map((count) => (
                      <div 
                        key={count}
                        onClick={() => setPassengerCount(count)}
                        className={`cursor-pointer h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${
                          passengerCount === count 
                            ? "border-primary-500 bg-primary-50/70 backdrop-blur-sm text-primary-700" 
                            : "border-gray-100 bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80"
                        }`}
                      >
                        <span className="font-medium">{count} {count === "1-3" ? "Person" : "People"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-base font-medium mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" /> Duration
                  </label>
                  <div className="relative">
                    <select className="block w-full h-16 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-3 px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg transition-all hover:bg-white/80">
                      <option>One-Way Trip</option>
                      <option>Round Trip</option>
                      <option>Multi-Day Rental</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="col-span-1 flex items-end">
                  <button className="w-full h-16 text-white font-bold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-2xl py-3 px-6 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 text-lg transform hover:-translate-y-1">
                    <Car className="h-6 w-6 mr-2" />
                    SEARCH TAXIS
                  </button>
                </div>
              </div>

              {/* Vehicle Preview Section - Updates based on selection */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary-50/60 via-white/60 to-blue-50/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-400/15 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl"></div>
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <div className="flex-shrink-0 w-60 h-40 rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/60">
                    <div id="vehiclePreviewImage">
                      {/* Default sedan preview */}
                      <svg width="180" height="100" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          {/* Sedan Body */}
                          <path d="M40,70 L60,40 C70,25 170,25 180,40 L200,70 L40,70 Z" fill="#3B82F6" stroke="white" strokeWidth="2"/>
                          {/* Sedan Top */}
                          <path d="M80,40 C90,25 140,25 150,40 L150,70 L80,70 L80,40 Z" fill="#60A5FA" stroke="white" strokeWidth="1"/>
                          {/* Windows */}
                          <path d="M85,40 C95,30 135,30 145,40 L145,65 L85,65 L85,40 Z" fill="#DBEAFE" stroke="white" strokeWidth="1"/>
                          {/* Tires */}
                          <circle cx="80" cy="70" r="15" fill="#1F2937" stroke="white" strokeWidth="2"/>
                          <circle cx="80" cy="70" r="7" fill="#4B5563" stroke="white" strokeWidth="1"/>
                          <circle cx="160" cy="70" r="15" fill="#1F2937" stroke="white" strokeWidth="2"/>
                          <circle cx="160" cy="70" r="7" fill="#4B5563" stroke="white" strokeWidth="1"/>
                          {/* Lights */}
                          <path d="M40,60 L40,70 L50,70 L50,60 Z" fill="#FBBF24"/>
                          <path d="M190,60 L190,70 L200,70 L200,60 Z" fill="#FBBF24"/>
                          {/* Details */}
                          <rect x="110" y="50" width="20" height="5" rx="2" fill="#E5E7EB"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 id="vehiclePreviewTitle" className="text-xl font-bold text-gray-900 mb-2">Sedan</h3>
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-gray-700">
                      <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-primary" /> AC</span>
                      <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-primary" /> Luggage Space</span>
                      <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-primary" /> Music System</span>
                      <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-primary" /> Bottled Water</span>
                    </div>
                    <p id="vehiclePreviewDescription" className="text-gray-600 mb-4">Comfortable sedan for up to 3 passengers with standard luggage.</p>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-white rounded-full py-1 px-4 text-sm font-medium">₹15/km</div>
                      <div className="text-sm text-gray-500">*Final price may vary based on distance and duration</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slogan */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              Apno ko, Sapno ko Kareeb Laaye.
            </h2>
          </div>
        </div>
      </section>

      {/* Update animation keyframes */}
      <style>{`
        @keyframes roadMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-road {
          animation: roadMove 2s linear infinite;
        }

        @keyframes drive {
          0% { transform: translateX(-15%); }
          100% { transform: translateX(115%); }
        }

        .animate-drive {
          animation: drive 15s linear infinite;
        }
      `}</style>

      {/* Quick Stats Section */}
      <section className="py-12 bg-white" ref={statsRef}>
        <div className={`container px-4 ${statsInView ? 'stagger-enter-active' : 'stagger-enter'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300 border border-primary-100">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">500+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Travelers</div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300 border border-primary-100">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-gray-600 font-medium">Premium Vehicles</div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300 border border-primary-100">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">20+</div>
              <div className="text-sm text-gray-600 font-medium">Destinations</div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300 border border-primary-100">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-secondary mt-16" ref={whyChooseRef}>
        <div className={`container ${whyChooseInView ? 'fade-up-enter-active' : 'fade-up-enter'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-800">Why Choose HimalayaJoy</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional travel experiences in North India with reliable services and local expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm card-hover-effect">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-800">Comfortable Vehicles</h3>
              <p className="text-gray-600">
                Well-maintained, clean, and comfortable vehicles with experienced drivers.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm card-hover-effect">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-800">Safe Travel</h3>
              <p className="text-gray-600">
                We prioritize your safety with well-trained staff and emergency support.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm card-hover-effect">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-800">Customized Packages</h3>
              <p className="text-gray-600">
                Flexible tour packages tailored to your preferences and budget.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm card-hover-effect">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-800">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support to assist you throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white" ref={destinationsRef}>
        <div className={`container ${destinationsInView ? 'fade-up-enter-active' : 'fade-up-enter'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-primary-800">Popular Destinations</h2>
              <p className="text-gray-600">
                Explore the most beautiful places in North India
              </p>
            </div>
            <Link to="/destinations">
              <Button variant="outline" className="mt-4 md:mt-0 border-primary text-primary hover:bg-primary-50">
                View All Destinations
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-tropical-gradient text-white" ref={servicesRef}>
        <div className={`container ${servicesInView ? 'scale-up-enter-active' : 'scale-up-enter'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="max-w-3xl mx-auto opacity-90">
              Comprehensive travel services to make your North India journey memorable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <Car className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Taxi Services</h3>
              <p className="mb-4 opacity-90">
                Comfortable and reliable taxi services with experienced drivers who know the best routes in North India.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Airport Transfers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Sightseeing Tours</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Multi-day Trip Transport</span>
                </li>
              </ul>
              <Link to="/taxi">
                <Button className="mt-6 bg-white/90 text-primary-600 hover:bg-white">
                  Book a Taxi
                </Button>
              </Link>
            </div>
            
            <div className="glass-card p-8">
              <Mountain className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Tour Packages</h3>
              <p className="mb-4 opacity-90">
                Curated tour packages covering the most beautiful destinations in North India, complete with accommodations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Hill Station Tours</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Adventure Packages</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Honeymoon Specials</span>
                </li>
              </ul>
              <Link to="/packages">
                <Button className="mt-6 bg-white/90 text-primary-600 hover:bg-white">
                  Explore Packages
                </Button>
              </Link>
            </div>
            
            <div className="glass-card p-8">
              <Award className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Custom Tours</h3>
              <p className="mb-4 opacity-90">
                Personalized itineraries designed to match your interests, timeframe, and budget for the perfect North India experience.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Personalized Itineraries</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Special Experiences</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Group Tour Options</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button className="mt-6 bg-white/90 text-primary-600 hover:bg-white">
                  Request Custom Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Routes from Dehradun</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular taxi routes with comfortable vehicles and experienced drivers.
              Fixed prices, no hidden charges, and 24/7 service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gray-900/20" />
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{route.to}</h3>
                    <p className="text-sm opacity-90">{route.distance} km</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{route.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-5 w-5" />
                      <span>{route.duration} hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span>{route.stops.length} stops</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-primary">₹{route.vehicles.sedan.price}</p>
                    </div>
                    <Button
                      onClick={() => setSelectedRoute(route)}
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Details Dialog */}
      {selectedRoute && (
        <RouteDetails
          isOpen={true}
          onClose={() => setSelectedRoute(null)}
          route={selectedRoute}
        />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-sunset-gradient text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your North India Adventure?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            From the snow-capped peaks of the Himalayas to the spiritual banks of the Ganges, 
            let us take you on an unforgettable journey through North India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Browse Packages
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-primary-600/20">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/50" ref={testimonialRef}>
        <div className={`container ${testimonialInView ? 'stagger-enter-active' : 'stagger-enter'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-800">What Travelers Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Real experiences from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
