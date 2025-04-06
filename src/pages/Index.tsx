import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchTabs from '@/components/SearchTabs';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';
import TestimonialCard from '@/components/TestimonialCard';
import VacationBanner from '@/components/VacationBanner';
import BookingForm from '@/components/BookingForm';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  Car, Phone, CheckCircle, Award, Shield, Mountain, MapPin, Tent, Calendar as CalendarIcon, Clock, Users, CheckCircle2 
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
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
  // Get URL parameters
  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedRoute, setSelectedRoute] = useState<typeof popularRoutes[0] | null>(null);
  const [passengerCount, setPassengerCount] = useState("1-3");
  const [selectedCarType, setSelectedCarType] = useState("sedan");
  const [fromLocation, setFromLocation] = useState(fromParam || "");
  const [toLocation, setToLocation] = useState(toParam || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showMyChoiceDesign, setShowMyChoiceDesign] = useState(false);
  
  // Scroll to booking form if URL parameters are present
  useEffect(() => {
    if (fromParam || toParam) {
      const bookingFormElement = document.getElementById('booking-form');
      if (bookingFormElement) {
        bookingFormElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [fromParam, toParam]);
  
  // Create refs for each section
  const [statsRef, statsInView] = useInView();
  const [whyChooseRef, whyChooseInView] = useInView();
  const [destinationsRef, destinationsInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [packagesRef, packagesInView] = useInView();
  const [testimonialRef, testimonialInView] = useInView();

  // Add state for calendar popover
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Sample data
  const destinations = [
    {
      id: 'shimla',
      name: 'Shimla',
      image: 'https://images.pexels.com/photos/31216843/pexels-photo-31216843/free-photo-of-colorful-architecture-of-shimla-hillside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
      image: 'https://images.pexels.com/photos/4340537/pexels-photo-4340537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Himachal Pradesh',
      description: 'Home to the Dalai Lama, this hill station offers stunning views and a unique blend of Indian and Tibetan culture.',
    },
    {
      id: 'nainital',
      name: 'Nainital',
      image: 'https://images.pexels.com/photos/19194412/pexels-photo-19194412/free-photo-of-kainchi-dham-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
      name: 'Saksham Chaudhary',
      avatar: 'https://thumbs.dreamstime.com/b/amber-india-september-portrait-unidentified-indian-man-wearing-blue-t-shirt-streets-104351515.jpg',
      rating: 5,
      text: 'Manali trip ekdum mast raha! Driver bhaiya ne bohot acche se guide kiya, har jagah ki knowledge thi unko. Taxi time pe aayi, clean thi, AC perfect tha. Rates bhi reasonable the. Full paisa vasool service! 👌',
      destination: 'Manali Trip',
    },
    {
      name: 'अमित शर्मा',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
      rating: 5,
      text: 'Haridwar-Rishikesh ka trip zabardast raha! Ganga aarti ke liye best spot bataya, local market mein bhi le gaye. Driver bhaiya ne pura din ghuma ke sab dikha diya. Next time bhi inhi se booking karunga pakka! 🙏',
      destination: 'Haridwar-Rishikesh Tour',
    },
    {
      name: 'प्रिया गुप्ता',
      avatar: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=2087&auto=format&fit=crop',
      rating: 5,
      text: 'Mussoorie weekend trip ke liye perfect service! Kempty falls, mall road, gun hill - sab jagah time se pohcha diya. Family ke saath travel kar rahi thi, bilkul safe feel hua. Driver uncle ne local food places bhi recommend kiye. Highly recommended! ⭐',
      destination: 'Mussoorie Weekend',
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
      image: "https://images.pexels.com/photos/2070307/pexels-photo-2070307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stops: ["Dehradun", "Mussoorie Mall Road", "Kempty Falls", "Company Garden"],
      attractions: ["Mall Road", "Kempty Falls", "Gun Hill", "Company Garden", "Cloud's End"],
      vehicles: {
        sedan: {
          price: 1200,
          negotiable: true,
          description: "Comfortable sedan for up to 4 passengers"
        },
        suv: {
          price: 1800,
          negotiable: true,
          description: "Spacious SUV for up to 6 passengers"
        },
        luxury: {
          price: 2500,
          negotiable: false,
          description: "Premium luxury car for a superior experience"
        },
        tempo: {
          price: 2200,
          negotiable: true,
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
      image: "https://images.pexels.com/photos/10783023/pexels-photo-10783023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stops: ["Dehradun", "Har Ki Pauri", "Mansa Devi Temple"],
      attractions: ["Har Ki Pauri", "Mansa Devi Temple", "Chandi Devi Temple", "Ganga Aarti"],
      vehicles: {
        sedan: {
          price: 1400,
          negotiable: true,
          description: "Comfortable sedan for up to 4 passengers"
        },
        suv: {
          price: 2000,
          negotiable: true,
          description: "Spacious SUV for up to 6 passengers"
        },
        luxury: {
          price: 2500,
          negotiable: false,
          description: "Premium luxury car for a superior experience"
        },
        tempo: {
          price: 2300,
          negotiable: true,
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
      image: "https://images.pexels.com/photos/13473095/pexels-photo-13473095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stops: ["Dehradun", "Laxman Jhula", "Ram Jhula", "Triveni Ghat"],
      attractions: ["River Rafting", "Laxman Jhula", "Ram Jhula", "Beatles Ashram", "Triveni Ghat"],
      vehicles: {
        sedan: {
          price: 1300,
          negotiable: true,
          description: "Comfortable sedan for up to 4 passengers"
        },
        suv: {
          price: 1900,
          negotiable: true,
          description: "Spacious SUV for up to 6 passengers"
        },
        luxury: {
          price: 2500,
          negotiable: false,
          description: "Premium luxury car for a superior experience"
        },
        tempo: {
          price: 2100,
          negotiable: true,
          description: "Tempo traveller for groups up to 12 passengers"
        }
      }
    }
  ];


  // Vehicle information
  const vehicleInfo = {
    sedan: {
      name: "Premium Sedan",
      capacity: "1-3 Passengers",
      features: ["Air Conditioning", "Comfortable Seating", "Music System", "GPS Navigation"],
      price: "₹12-14/km",
      image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg",
      description: "Perfect for small families or business travelers requiring comfort and elegance. Choose from Swift Dzire or Etios.",
      vehicles: [
        {
          name: "Swift Dzire",
          image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg",
          rate: "₹12/km",
          features: ["Air Conditioning", "4 Seats", "2 Luggage", "Music System", "Charging Ports"]
        },
        {
          name: "Etios",
          image: "https://cuyomotor.com.ar/wp-content/uploads/2023/06/Toyota-Etios-hatch-XLS.jpg",
          rate: "₹14/km",
          features: ["Air Conditioning", "5 Seats", "2 Luggage", "Music System", "Charging Ports"]
        }
      ]
    },
    suv: {
      name: "Luxury SUV",
      capacity: "4-6 Passengers",
      features: ["Air Conditioning", "Spacious Interior", "Premium Sound System", "Extra Luggage Space"],
      price: "₹22/km",
      image: "https://i.pinimg.com/736x/70/3c/73/703c733d7e0bd3f04caebbfe9d50f115.jpg",
      description: "Ideal for families or small groups looking for a blend of comfort and space. Choose from Fortuner.",
      vehicles: [
        {
          name: "Fortuner",
          image: "https://i.pinimg.com/736x/70/3c/73/703c733d7e0bd3f04caebbfe9d50f115.jpg",
          rate: "₹22/km",
          features: ["Air Conditioning", "6 Seats", "3 Luggage", "Music System", "Charging Ports"]
        }
      ]
    },
    tempo: {
      name: "Tempo Traveller",
      capacity: "7-12 Passengers",
      features: ["Air Conditioning", "Reclining Seats", "Ample Luggage Space", "Perfect for Groups"],
      price: "₹15-20/km",
      image: "https://th.bing.com/th/id/OIP.WmpZMNmbuUE1SFxuBav2wgHaEK?rs=1&pid=ImgDetMain",
      description: "Perfect for medium-sized groups traveling together with ample space for luggage. Choose from Ertiga, Innova, or Innova Crysta.",
      vehicles: [
        {
          name: "Ertiga",
          image: "https://th.bing.com/th/id/OIP.WmpZMNmbuUE1SFxuBav2wgHaEK?rs=1&pid=ImgDetMain",
          rate: "₹15/km",
          features: ["Air Conditioning", "7 Seats", "3 Luggage", "Music System", "Charging Ports"]
        },
        {
          name: "Innova",
          image: "https://img.philkotse.com/crop/643x362/2020/12/09/f3xu3v8D/innova-red-mica-metallic-4da2.png",
          rate: "₹17/km",
          features: ["Air Conditioning", "7 Seats", "4 Luggage", "Music System", "Charging Ports"]
        },
        {
          name: "Innova Crysta",
          image: "https://imgd.aeplcdn.com/0X0/n/cw/ec/20623/innova-crysta-exterior-left-front-three-quarter.jpeg?q=85",
          rate: "₹20/km",
          features: ["Air Conditioning", "7 Seats", "4 Luggage", "Music System", "Charging Ports", "Premium Interior"]
        }
      ]
    },
    bus: {
      name: "Luxury Bus",
      capacity: "13+ Passengers",
      features: ["Air Conditioning", "Reclining Seats", "Entertainment System", "Large Groups"],
      price: "₹35/km",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2940&auto=format&fit=crop",
      description: "The ultimate solution for large groups traveling together in complete comfort.",
      vehicles: [
        {
          name: "Luxury Bus",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2940&auto=format&fit=crop",
          rate: "₹35/km",
          features: ["Air Conditioning", "13+ Seats", "Large Luggage Space", "Entertainment System", "Reclining Seats"]
        }
      ]
    }
  };

  // Update car type based on passenger count
  useEffect(() => {
    switch (passengerCount) {
      case "1-3":
        setSelectedCarType("sedan");
        break;
      case "4-6":
        setSelectedCarType("suv");
        break;
      case "7-12":
        setSelectedCarType("tempo");
        break;
      case "13+":
        setSelectedCarType("bus");
        break;
      default:
        setSelectedCarType("sedan");
    }
  }, [passengerCount]);

  // Handle car type change
  const handleCarTypeChange = (value: string) => {
    setSelectedCarType(value);
    setShowMyChoiceDesign(value === "myChoice");
  };

  // Add form submission handler
  const handleSubmit = async () => {
    if (!fromLocation || !toLocation || !selectedDate || !phoneNumber) {
      setErrorMessage("Please fill in all required fields");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Convert passenger count string to number
      const passengerNumber = parseInt(passengerCount.split('-')[0]);

      // Format car type to match backend enum exactly
      const formattedCarType = selectedCarType === 'suv' ? 'SUV' : 
        selectedCarType.charAt(0).toUpperCase() + selectedCarType.slice(1);

      const bookingData = {
        from: fromLocation,
        to: toLocation,
        date: selectedDate.toISOString(),
        passengers: passengerNumber,
        carType: formattedCarType,
        phoneNumber: phoneNumber,
        status: 'pending'
      };

      console.log('Sending booking data:', bookingData); // Debug log

      const response = await fetch('https://trsvbackend.vercel.app/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit booking');
      }

      const data = await response.json();
      setSubmitStatus("success");
      
      // Reset form
      setFromLocation("");
      setToLocation("");
      setSelectedDate(undefined);
      setPassengerCount("1-3");
      setSelectedCarType("sedan");
      setPhoneNumber("");
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit booking. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Add new destinations data for Uttarakhand
  const uttarakhandDestinations = [
    {
      id: 'rishikesh',
      name: 'Rishikesh',
      image: 'https://campinginrishikesh.in/wp-content/uploads/2020/03/camp-crossfire-river-view.jpg',
      location: 'Uttarakhand',
      description: 'World Capital of Yoga, famous for spiritual enlightenment and adventure sports.',
      activities: ['River Rafting', 'Yoga', 'Camping']
    },
    {
      id: 'mussoorie',
      name: 'Mussoorie',
      image: 'https://www.namasteindiatrip.com/wp-content/uploads/2019/09/Mussoorie-Travel-HD.jpg',
      location: 'Uttarakhand',
      description: 'Queen of Hills with panoramic views of the Himalayas and colonial charm.',
      activities: ['Cable Car', 'Mall Road', 'Trekking']
    },
    {
      id: 'haridwar',
      name: 'Haridwar',
      image: 'https://cdn.britannica.com/43/155643-050-E9989FB0/bathing-ghat-Har-ki-pauri-Haridwar-India-Uttarakhand.jpg',
      location: 'Uttarakhand',
      description: 'Holy city on the banks of River Ganges, famous for Ganga Aarti.',
      activities: ['Ganga Aarti', 'Temple Visit', 'Holy Dip']
    },
    {
      id: 'auli',
      name: 'Auli',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
      location: 'Uttarakhand',
      description: 'Skiing destination with breathtaking views of Nanda Devi.',
      activities: ['Skiing', 'Cable Car', 'Photography']
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Professional redesign with realistic car animations */}
      <section className="relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center bg-fixed py-8 before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-900/80 before:via-blue-800/70 before:to-indigo-900/60 before:backdrop-blur-[2px]">
        {/* Snowfall Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute top-[-20px] animate-snowfall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.7 + 0.3,
                fontSize: `${Math.random() * 10 + 10}px`,
                filter: 'blur(1px)',
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
              }}
            >
              <div className="snowflake">
                <div className="snowflake-inner"></div>
              </div>
            </div>
          ))}
        </div>

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
            <p className="text-xl text-white text-center drop-shadow-md mb-6">
              Travel in style and comfort with our luxury fleet
            </p>
          </div>

          {/* Booking form panel */}
          <div id="booking-form" className="w-full max-w-7xl mx-auto bg-gradient-to-br from-white/95 via-primary-50/90 to-blue-50/85 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/30 overflow-visible mb-16">
            <div className="p-4 md:p-8 relative">
              {/* Background decoration - Simplified for mobile */}
              <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-400/20 rounded-full blur-3xl hidden md:block"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl hidden md:block"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                {/* From Location */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm md:text-base font-medium mb-2 md:mb-3 flex items-center">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary" /> From
                  </label>
                  <div className="relative">
                    <select 
                      value={fromLocation} 
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="block w-full h-12 md:h-14 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-xl md:rounded-2xl py-2 px-3 md:px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm md:text-base transition-all hover:bg-white/80"
                    >
                      <option value="">Select pickup point</option>
                      <option value="Dehradun">Dehradun</option>
                      <option value="Mussoorie">Mussoorie</option>
                      <option value="Haridwar">Haridwar</option>
                      <option value="Rishikesh">Rishikesh</option>
                      <option value="Kana Tal">Kana Tal</option>
                      <option value="Dhanaulti">Dhanaulti</option>
                      <option value="Saharanpur">Saharanpur</option>
                      <option value="Delhi">Delhi (NCR)</option>
                    </select>
                  </div>
                </div>

                {/* To Location */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm md:text-base font-medium mb-2 md:mb-3 flex items-center">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary" /> To
                  </label>
                  <div className="relative">
                    <select
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="block w-full h-12 md:h-14 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-xl md:rounded-2xl py-2 px-3 md:px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm md:text-base transition-all hover:bg-white/80"
                    >
                      <option value="">Select destination</option>
                      <option value="All India">All India</option>
                      <option value="We'll decide later">We'll decide later</option>
                      <option value="Dehradun">Dehradun</option>
                      <option value="Mussoorie">Mussoorie</option>
                      <option value="Haridwar">Haridwar</option>
                      <option value="Rishikesh">Rishikesh</option>
                      <option value="Kana Tal">Kana Tal</option>
                      <option value="Dhanaulti">Dhanaulti</option>
                      <option value="Saharanpur">Saharanpur</option>
                      <option value="Delhi">Delhi (NCR)</option>
                    </select>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm md:text-base font-medium mb-2 md:mb-3 flex items-center">
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary" /> Date
                  </label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-12 md:h-14 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-xl md:rounded-2xl py-2 px-3 md:px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm md:text-base transition-all hover:bg-white/80",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setCalendarOpen(false);
                        }}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Passenger Count */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm md:text-base font-medium mb-2 md:mb-3 flex items-center">
                    <Users className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary" /> Passengers
                  </label>
                  <Select value={passengerCount} onValueChange={setPassengerCount}>
                    <SelectTrigger className="w-full h-12 md:h-14 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-xl md:rounded-2xl py-2 px-3 md:px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm md:text-base transition-all hover:bg-white/80">
                      <SelectValue placeholder="Select passengers" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      <SelectItem value="1-3">1-3 Passengers</SelectItem>
                      <SelectItem value="4-6">4-6 Passengers</SelectItem>
                      <SelectItem value="7-12">7-12 Passengers</SelectItem>
                      <SelectItem value="13+">13+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Car Type */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm md:text-base font-medium mb-2 md:mb-3 flex items-center">
                    <Car className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary" /> Car Type
                  </label>
                  <Select value={selectedCarType} onValueChange={handleCarTypeChange}>
                    <SelectTrigger className="w-full h-12 md:h-14 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-xl md:rounded-2xl py-2 px-3 md:px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm md:text-base transition-all hover:bg-white/80">
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      <SelectItem value="sedan">Premium Sedan</SelectItem>
                      <SelectItem value="suv">Luxury SUV</SelectItem>
                      <SelectItem value="tempo">Tempo Traveller</SelectItem>
                      <SelectItem value="bus">Luxury Bus</SelectItem>
                      <SelectItem value="myChoice">My Choice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number Input */}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm md:text-base font-medium mb-2 md:mb-3 flex items-center">
                    <Phone className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary" /> Contact Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter contact number" 
                    required
                    className="w-full h-12 md:h-14 bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-xl md:rounded-2xl py-2 px-3 md:px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm md:text-base transition-all hover:bg-white/80"
                  />
                  {phoneNumber === "" && (
                    <p className="text-red-500 text-xs mt-1">Phone number is required</p>
                  )}
                </div>

                {/* Search Button */}
                <div className="col-span-1 md:col-span-3 flex flex-col items-center gap-4">
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full md:w-auto px-8 md:px-12 h-12 md:h-14 text-white font-bold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl md:rounded-2xl py-2 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 text-sm md:text-base transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Car className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        BOOK TAXI
                      </>
                    )}
                  </button>
                  
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-xs md:text-sm">{errorMessage}</p>
                  )}
                </div>
              </div>

              {/* Vehicle Preview Section - Simplified for mobile */}
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-primary-50/60 via-white/60 to-blue-50/60 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/60 shadow-lg relative overflow-hidden">
                {/* Background decoration - Hidden on mobile */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none hidden md:block"></div>
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-400/15 rounded-full blur-3xl hidden md:block"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl hidden md:block"></div>
                
                {showMyChoiceDesign ? (
                  <div className="flex flex-col items-center justify-center py-4 md:py-8 relative z-10">
                    <div className="w-full max-w-md text-center mb-4 md:mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-primary-700 mb-2 md:mb-3">Choose Your Perfect Vehicle</h3>
                      <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                        Browse our extensive fleet of vehicles and find the perfect match for your journey.
                        From luxury sedans to spacious buses, we have it all!
                      </p>
                    </div>
                    
                    <Link to="/taxi" className="w-full">
                      <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 md:px-8 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <Car className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Explore All Vehicles
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 relative z-10">
                    <div className="flex-shrink-0 w-40 h-32 md:w-60 md:h-40 rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/60">
                      <img 
                        src={vehicleInfo[selectedCarType as keyof typeof vehicleInfo].image}
                        alt={vehicleInfo[selectedCarType as keyof typeof vehicleInfo].name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        {vehicleInfo[selectedCarType as keyof typeof vehicleInfo].name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2 md:mb-3 text-gray-700 text-sm md:text-base">
                        {vehicleInfo[selectedCarType as keyof typeof vehicleInfo].features.map((feature, index) => (
                          <span key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 text-primary" /> {feature}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-4">
                        {vehicleInfo[selectedCarType as keyof typeof vehicleInfo].description}
                      </p>
                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="bg-primary text-white rounded-full py-1 px-3 md:px-4 text-xs md:text-sm font-medium">
                          {vehicleInfo[selectedCarType as keyof typeof vehicleInfo].price}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          Recommended for {vehicleInfo[selectedCarType as keyof typeof vehicleInfo].capacity}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

      {/* Vacation Banner Section */}
      <div className="w-full bg-white">
        <VacationBanner />
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50" ref={whyChooseRef}>
        <div className={`container ${whyChooseInView ? 'fade-up-enter-active' : 'fade-up-enter'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-800">Why Choose Uttarakhand Road Trip</h2>
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
            
            <a href="tel:+918077757674" className="block">
  <div className="text-center p-6 bg-white rounded-xl shadow-sm card-hover-effect">
    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Phone className="h-8 w-8 text-primary" />
    </div>
    <h3 className="font-bold text-lg mb-2 text-primary-800">24/7 Support</h3>
    <p className="text-gray-600">
      Round-the-clock customer support to assist you throughout your journey.
    </p>
  </div>
</a>

          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gradient-to-br from-white via-primary-50 to-white" ref={destinationsRef} id="destinations-section">
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
      <section className="py-16 bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-100" ref={servicesRef}>
        <div className={`container ${servicesInView ? 'scale-up-enter-active' : 'scale-up-enter'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-800">Our Services</h2>
            <p className="max-w-3xl mx-auto text-primary-700">
              Comprehensive travel services to make your North India journey memorable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300">
              <Car className="h-10 w-10 mb-4 text-primary-600" />
              <h3 className="text-xl font-bold mb-3 text-primary-800">Taxi Services</h3>
              <p className="mb-4 text-primary-700">
                Comfortable and reliable taxi services with experienced drivers who know the best routes in North India.
              </p>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Airport Transfers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Sightseeing Tours</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Multi-day Trip Transport</span>
                </li>
              </ul>
              <Link to="/taxi">
                <Button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white">
                  Book a Taxi
                </Button>
              </Link>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300">
              <Car className="h-10 w-10 mb-4 text-primary-600" />
              <h3 className="text-xl font-bold mb-3 text-primary-800">Taxi Service & Local Guide Charges</h3>
              <p className="mb-4 text-primary-700">
                Reliable taxi services with experienced drivers and knowledgeable local guides to make your journey smooth and informative.
              </p>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Airport & City Transfers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Full-Day Sightseeing Cabs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Professional Local Guides</span>
                </li>
              </ul>
              <Link to="/packages">
                <Button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white">
                  Explore Services
                </Button>
              </Link>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300">
              <Award className="h-10 w-10 mb-4 text-primary-600" />
              <h3 className="text-xl font-bold mb-3 text-primary-800">Custom Tours</h3>
              <p className="mb-4 text-primary-700">
                Personalized itineraries designed to match your interests, timeframe, and budget for the perfect North India experience.
              </p>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Personalized Itineraries</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Special Experiences</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <span>Group Tour Options</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white">
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
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-400 text-white">
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
              <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-secondary-50 via-primary-50 to-secondary-100" ref={testimonialRef}>
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

      {/* Popular Places in Uttarakhand Section - Temporarily Disabled */}
      {false && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-primary-50" id="uttarakhand-places">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-primary-800 relative inline-block animate-slide-down">
                Popular Places in Uttarakhand
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-blue-500"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up">
                Explore the divine beauty of Devbhoomi Uttarakhand, from spiritual havens to adventure destinations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {uttarakhandDestinations.map((destination) => (
                <div 
                  key={destination.id}
                  className="destination-card group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    animation: `slideIn 0.5s ease-out forwards ${index * 0.1}s`,
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  {/* Image Container with Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-800 mb-2 transform transition-all duration-300 group-hover:translate-x-1">{destination.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                    
                    {/* Activities */}
                    <div className="space-y-2">
                      {destination.activities.map((activity, idx) => (
                        <div 
                          key={idx} 
                          className="activity-item flex items-center text-sm text-gray-600"
                          style={{
                            animation: `fadeIn 0.5s ease-out forwards ${index * 0.1 + idx * 0.1}s`,
                            opacity: 0
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-primary-500" />
                          {activity}
                        </div>
                      ))}
                    </div>

                    {/* Explore Button */}
                    <button 
                      className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg transform transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-lg"
                      onClick={() => {
                        window.location.href = '/contact ';
                      }}
                    >
                      Explore More
                    </button>
                  </div>

                  {/* Floating Location Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-600 shadow-lg">
                    {destination.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Add these new animation keyframes */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-up {
            animation: slide-up 0.5s ease-out forwards;
          }

          .animate-slide-down {
            animation: slide-down 0.5s ease-out forwards;
          }

          .destination-card {
            will-change: transform, opacity;
          }

          .activity-item {
            will-change: transform, opacity;
          }

          .destination-card:hover .activity-item {
            transform: translateX(8px);
            transition: transform 0.3s ease;
          }

          @keyframes slide-in {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .animate-slide-in {
            animation: slide-in 0.5s ease-out forwards;
          }

          @keyframes snowfall {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
              transform: translateY(25vh) translateX(10px) rotate(90deg);
            }
            50% {
              transform: translateY(50vh) translateX(-10px) rotate(180deg);
            }
            75% {
              transform: translateY(75vh) translateX(10px) rotate(270deg);
            }
            100% {
              transform: translateY(100vh) translateX(0) rotate(360deg);
            }
          }

          .animate-snowfall {
            animation: snowfall linear infinite;
          }

          .snowflake {
            position: relative;
            width: 10px;
            height: 10px;
          }

          .snowflake-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            background: white;
            border-radius: 50%;
            box-shadow: 
              0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px rgba(255, 255, 255, 0.6),
              0 0 15px rgba(255, 255, 255, 0.4);
          }

          .snowflake-inner::before,
          .snowflake-inner::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: white;
            border-radius: 50%;
            box-shadow: 
              0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px rgba(255, 255, 255, 0.6),
              0 0 15px rgba(255, 255, 255, 0.4);
          }

          .snowflake-inner::before {
            transform: rotate(45deg);
          }

          .snowflake-inner::after {
            transform: rotate(-45deg);
          }
        `}
      </style>

      {/* Add Success Message Component */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-lg max-w-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Booking Submitted Successfully!
                </p>
                <p className="mt-1 text-sm text-green-700">
                  We'll contact you shortly to confirm your booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;
