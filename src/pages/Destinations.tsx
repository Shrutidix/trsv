import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import DestinationCard from "@/components/DestinationCard";

const Destinations = () => {
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
    {
      id: 'rishikesh',
      name: 'Rishikesh',
      image: 'https://campinginrishikesh.in/wp-content/uploads/2020/03/camp-crossfire-river-view.jpg',
      location: 'Uttarakhand',
      description: 'World Capital of Yoga, famous for spiritual enlightenment and adventure sports.',
    },
    {
      id: 'mussoorie',
      name: 'Mussoorie',
      image: 'https://www.namasteindiatrip.com/wp-content/uploads/2019/09/Mussoorie-Travel-HD.jpg',
      location: 'Uttarakhand',
      description: 'Queen of Hills with panoramic views of the Himalayas and colonial charm.',
    },
    {
      id: 'haridwar',
      name: 'Haridwar',
      image: 'https://cdn.britannica.com/43/155643-050-E9989FB0/bathing-ghat-Har-ki-pauri-Haridwar-India-Uttarakhand.jpg',
      location: 'Uttarakhand',
      description: 'Holy city on the banks of River Ganges, famous for Ganga Aarti.',
    },
    {
      id: 'ladakh',
      name: 'Ladakh',
      image: 'https://images.pexels.com/photos/31216843/pexels-photo-31216843/free-photo-of-colorful-architecture-of-shimla-hillside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Jammu & Kashmir',
      description: 'Experience the magic of high-altitude desert with stunning landscapes and unique culture.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Popular Destinations</h1>
          <p className="text-base max-w-2xl mx-auto">
            Explore the most beautiful places in North India with our comfortable and reliable taxi services.
          </p>
        </motion.div>
      </section>

      {/* Destinations Grid */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations; 