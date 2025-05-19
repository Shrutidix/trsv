import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchTabs from '../components/SearchTabs';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import TestimonialCard from '../components/TestimonialCard';
import VacationBanner from '../components/VacationBanner';
import BookingForm from '../components/BookingForm';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { 
  Car, Phone, CheckCircle, Award, Shield, Mountain, MapPin, Tent, Calendar as CalendarIcon, Clock, Users, CheckCircle2, Star 
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import RouteDetails from '../components/RouteDetails';
import FeaturedGalleryRedirect from '../components/FeaturedGalleryRedirect';
import axios from "axios";
import { Card } from '../components/ui/card';

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

interface Review {
  _id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  message: string;
  status: 'pending' | 'reviewed' | 'responded' | 'approved';
  createdAt: string;
}

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
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
      avatar: 'https://drive.google.com/file/d/1e9beYe3ffc7ihryIhHo8eX31BQQt9Tl-/view?usp=sharing',
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

  useEffect(() => {
    // Load cached reviews from localStorage first
    const cachedReviews = localStorage.getItem('homeReviews');
    if (cachedReviews) {
      setReviews(JSON.parse(cachedReviews));
      setLoading(false);
    }
    const fetchReviews = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://trsvbackend.vercel.app/api/feedback',
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.data.success) {
          // Filter only approved feedbacks and take the latest 3
          const approvedFeedbacks = response.data.data
            .filter((feedback) => feedback.status === 'approved')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3);
          setReviews(approvedFeedbacks);
          localStorage.setItem('homeReviews', JSON.stringify(approvedFeedbacks));
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Caching for destinations
  useEffect(() => {
    const cachedDestinations = localStorage.getItem('homeDestinations');
    if (cachedDestinations) {
      // setDestinations(JSON.parse(cachedDestinations)); // Uncomment if destinations are fetched from API
    }
    // If you fetch destinations from API, fetch and cache here
  }, []);

  // Caching for packages
  useEffect(() => {
    const cachedPackages = localStorage.getItem('homePackages');
    if (cachedPackages) {
      // setPackages(JSON.parse(cachedPackages)); // Uncomment if packages are fetched from API
    }
    // If you fetch packages from API, fetch and cache here
  }, []);

  // Caching for testimonials
  useEffect(() => {
    const cachedTestimonials = localStorage.getItem('homeTestimonials');
    if (cachedTestimonials) {
      // setTestimonials(JSON.parse(cachedTestimonials)); // Uncomment if testimonials are fetched from API
    }
    // If you fetch testimonials from API, fetch and cache here
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Enhanced with Vibrant Gradients */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Animated Background Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500">
          {/* Enhanced Sparkling Stars Effect */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
            <div
              key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.7 + 0.3,
                  boxShadow: '0 0 4px rgba(255,255,255,0.8)'
                }}
              />
          ))}
        </div>

          {/* Enhanced Modular Rounded Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
          </div>
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-400/10 to-transparent"></div>
        </div>

        {/* Content Container with Enhanced Glass Effect */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Discover North India's Hidden Treasures
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in-delayed">
              Experience luxury travel with our premium taxi services. From spiritual journeys to adventure tours, we make your travel dreams come true.
            </p>
          </div>

          {/* Enhanced Booking Form with Glass Effect */}
          <div className="relative max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">
            {/* Wavy SVG Background */}
            <svg className="absolute -top-10 -left-10 w-[120%] h-40 opacity-30 z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#a5b4fc" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
              <path fill="#6366f1" fillOpacity="0.15" d="M0,224L60,208C120,192,240,160,360,154.7C480,149,600,171,720,186.7C840,203,960,213,1080,197.3C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
            </svg>
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* From Location */}
                  <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <select 
                      value={fromLocation} 
                      onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full h-12 bg-white/80 border border-gray-200 rounded-xl px-4 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                    >
                    <option value="">Select pickup</option>
                      <option value="Dehradun">Dehradun</option>
                      <option value="Mussoorie">Mussoorie</option>
                      <option value="Haridwar">Haridwar</option>
                      <option value="Rishikesh">Rishikesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Agra">Agra</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Amritsar">Amritsar</option>
                    </select>
                </div>

                {/* To Location */}
                  <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <select
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                    className="w-full h-12 bg-white/80 border border-gray-200 rounded-xl px-4 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                    >
                      <option value="">Select destination</option>
                      <option value="All India">All India</option>
                      <option value="Dehradun">Dehradun</option>
                      <option value="Mussoorie">Mussoorie</option>
                      <option value="Haridwar">Haridwar</option>
                      <option value="Rishikesh">Rishikesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Agra">Agra</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Amritsar">Amritsar</option>
                    <option value="Shimla">Shimla</option>
                    <option value="Manali">Manali</option>
                    <option value="Dharamshala">Dharamshala</option>
                    <option value="Nainital">Nainital</option>
                    <option value="Auli">Auli</option>
                    <option value="Kedarnath">Kedarnath</option>
                    <option value="Badrinath">Badrinath</option>
                    <option value="Gangotri">Gangotri</option>
                    <option value="Yamunotri">Yamunotri</option>
                    </select>
                </div>

                {/* Date Picker */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                      variant="outline"
                        className={cn(
                        "w-full h-12 bg-white/80 border border-gray-200 rounded-xl px-4 justify-start text-left font-normal",
                        !selectedDate && "text-gray-500"
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
                </div>

              {/* Secondary Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Passengers */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                  <Select value={passengerCount} onValueChange={setPassengerCount}>
                    <SelectTrigger className="w-full h-12 bg-white/80 border border-gray-200 rounded-xl">
                      <SelectValue placeholder="Select passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 Passengers</SelectItem>
                      <SelectItem value="4-6">4-6 Passengers</SelectItem>
                      <SelectItem value="7-12">7-12 Passengers</SelectItem>
                      <SelectItem value="13+">13+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Car Type */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <Select value={selectedCarType} onValueChange={handleCarTypeChange}>
                    <SelectTrigger className="w-full h-12 bg-white/80 border border-gray-200 rounded-xl">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Premium Sedan</SelectItem>
                      <SelectItem value="suv">Luxury SUV</SelectItem>
                      <SelectItem value="tempo">Tempo Traveller</SelectItem>
                      <SelectItem value="bus">Luxury Bus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => {
                      // Only allow digits
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setPhoneNumber(val);
                    }}
                    placeholder="Enter your number" 
                    className="w-full h-12 bg-white/80 border border-gray-200 rounded-xl px-4 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                    minLength={10}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                  />
                </div>
                </div>

              {/* Book Now Button */}
              <div className="mt-6">
                  <button 
                    onClick={handleSubmit}
                  disabled={isSubmitting || !fromLocation || !toLocation || !selectedDate || phoneNumber.length !== 10}
                  className="w-full h-14 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Car className="h-5 w-5 mr-2" />
                      Book Now
                    </div>
                    )}
                  </button>
              </div>

              {/* Error Message */}
              {(errorMessage || (phoneNumber && phoneNumber.length !== 10)) && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {errorMessage || (phoneNumber && phoneNumber.length !== 10 ? 'Please enter a valid 10-digit phone number.' : '')}
                </div>
                  )}
                </div>
              </div>

          {/* Enhanced Trust Indicators with Glass Effect */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '50+', label: 'Destinations' },
              { value: '24/7', label: 'Support' },
              { value: '4.8', label: 'Customer Rating' }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="text-white/80">{item.label}</div>
                    </div>
                        ))}
                      </div>
                        </div>

        {/* Enhanced Bottom Gradient Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Add these new animations to your existing styles */}
      <style>
        {`
          @keyframes sparkle {
            0%, 100% { 
              opacity: 0; 
              transform: scale(0.5) rotate(0deg);
              box-shadow: 0 0 4px rgba(255,255,255,0.8);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2) rotate(180deg);
              box-shadow: 0 0 8px rgba(255,255,255,1);
            }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1);
              opacity: 0.2;
            }
            50% { 
              transform: translateY(-20px) rotate(5deg) scale(1.1);
              opacity: 0.3;
            }
          }

          @keyframes float-delayed {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1);
              opacity: 0.2;
            }
            50% { 
              transform: translateY(-15px) rotate(-5deg) scale(1.1);
              opacity: 0.3;
            }
          }

          @keyframes float-slow {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1);
              opacity: 0.2;
            }
            50% { 
              transform: translateY(-10px) rotate(3deg) scale(1.05);
              opacity: 0.3;
            }
          }

          .animate-sparkle {
            animation: sparkle 3s ease-in-out infinite;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 6s ease-in-out infinite;
            animation-delay: -3s;
          }

          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }

          .animate-fade-in-delayed {
            animation: fade-in 1s ease-out forwards;
            animation-delay: 0.3s;
          }
        `}
      </style>

      {/* Quick Links Section with Enhanced Design */}
      <section className="py-12 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Mountain, label: 'Destinations', link: '/destinations' },
              { icon: Tent, label: 'Tour Packages', link: '/packages' },
              { icon: Car, label: 'Taxi Services', link: '/taxi' },
              { icon: Phone, label: 'Contact Us', link: '/contact' }
            ].map((item, index) => (
              <Link key={index} to={item.link} className="group">
                <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-white to-indigo-100 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Stylish Glassy Circular Icon Background */}
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 via-white to-indigo-200 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:bg-gradient-to-br group-hover:from-purple-300 group-hover:to-indigo-300">
                      <item.icon className="h-8 w-8 text-purple-600 group-hover:text-indigo-700 transition-all duration-300" strokeWidth={2.5} />
                        </div>
                      </div>
                  <h3 className="font-semibold text-gray-800 text-lg tracking-wide group-hover:text-indigo-700 transition-colors duration-300">{item.label}</h3>
                    </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vacation Banner Section */}
      <div className="w-full bg-white">
        <VacationBanner />
      </div>
  <div className='w-full bg-white'>
    <FeaturedGalleryRedirect/>
  </div>
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50" ref={typeof whyChooseRef === 'object' ? whyChooseRef : undefined}>
        <div className={`container ${whyChooseInView ? 'fade-up-enter-active' : 'fade-up-enter'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-800">Why Choose Uttarakhand Trips</h2>
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
      <section className="py-16 bg-gradient-to-br from-white via-primary-50 to-white" ref={typeof destinationsRef === 'object' ? destinationsRef : undefined} id="destinations-section">
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
      <section className="py-16 bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-100" ref={typeof servicesRef === 'object' ? servicesRef : undefined}>
        <div className={`container ${servicesInView ? 'scale-up-enter-active' : 'scale-up-enter'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-800">Our Services</h2>
            <p className="max-w-3xl mx-auto text-primary-700 text-lg">
              Make your North India journey memorable with our expert travel services. From customized itineraries to comfortable accommodations, we ensure a seamless travel experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Taxi Services Card */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Premium Taxi Services</h3>
              <p className="mb-6 text-primary-700">
                Experience luxury and comfort with our well-maintained fleet of vehicles and professional drivers.
              </p>
              <ul className="space-y-3 mb-6 text-primary-700">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Airport & City Transfers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Full-Day Sightseeing Tours</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Multi-day Trip Transport</span>
                </li>
              </ul>
              <Link to="/taxi">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-6 text-lg">
                  Book a Taxi
                </Button>
              </Link>
            </div>
            
            {/* Tour Packages Card */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Mountain className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Tour Packages</h3>
              <p className="mb-6 text-primary-700">
                Discover North India with our carefully curated tour packages designed for every type of traveler.
              </p>
              <ul className="space-y-3 mb-6 text-primary-700">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Adventure Tours</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Spiritual Journeys</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Family Getaways</span>
                </li>
              </ul>
              <Link to="/packages">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-6 text-lg">
                  View Packages
                </Button>
              </Link>
            </div>

            {/* Custom Tours Card */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Custom Tours</h3>
              <p className="mb-6 text-primary-700">
                Let us create your perfect itinerary with personalized experiences and flexible scheduling.
              </p>
              <ul className="space-y-3 mb-6 text-primary-700">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Tailored Itineraries</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Special Experiences</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-600" />
                  <span>Group Tour Options</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-6 text-lg">
                  Request Custom Tour
                </Button>
              </Link>
            </div>
          </div>

          {/* Additional Services Banner */}
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Need More Services?</h3>
                <p className="text-white/90">
                  We also offer hotel bookings, local guides, and special event arrangements. Contact us for more information.
                </p>
              </div>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Contact Us
                  </Button>
                </Link>
                <a href="tel:+918077757674">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Call Now
                  </Button>
                </a>
              </div>
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
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">What Travelers Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover what our valued customers have to say about their experiences with us
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center">Loading reviews...</div>
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Card key={review._id} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0 ? 'from-blue-50 to-indigo-50' :
                    index === 1 ? 'from-purple-50 to-pink-50' :
                    'from-green-50 to-teal-50'
                  } opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-100 rounded-full -mr-16 -mt-16 opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full -ml-12 -mb-12 opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-6">
                    {renderStars(review.rating)}
                  </div>
                    
                    {/* Review Message */}
                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-4xl text-primary-300 opacity-50">"</div>
                      <p className="text-gray-700 italic relative z-10 pl-4 text-lg leading-relaxed">"{review.message}"</p>
                      <div className="absolute -right-2 -bottom-2 text-4xl text-primary-300 opacity-50 rotate-180">"</div>
                    </div>
                    
                    {/* Reviewer Info */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <span className="font-semibold text-gray-900 block text-lg">{review.name}</span>
                        <span className="text-sm text-gray-500">{review.email}</span>
                      </div>
                      <div className="text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                  <p className="text-gray-500 text-lg">No reviews available at the moment</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

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

          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1); }
          }

          @keyframes wave {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-5deg); }
          }

          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-sparkle {
            animation: sparkle 3s ease-in-out infinite;
          }

          .animate-wave {
            animation: wave 20s linear infinite;
          }

          .animate-wave-delayed {
            animation: wave 20s linear infinite;
            animation-delay: -10s;
          }

          .animate-wave-slow {
            animation: wave 25s linear infinite;
            animation-delay: -5s;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 6s ease-in-out infinite;
            animation-delay: -3s;
          }

          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }

          .animate-fade-in-delayed {
            animation: fade-in 1s ease-out forwards;
            animation-delay: 0.3s;
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

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
