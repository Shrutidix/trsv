import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const popularPlaces = [
  { 
    name: "Nainital", 
    img: "https://www.holidify.com/images/bgImages/NAINITAL.jpg",
    description: "A charming hill station known for its beautiful lakes, breathtaking views, and pleasant climate. It offers a perfect blend of nature and adventure, attracting tourists year-round.",
    famousFor: ["Naini Lake", "The Mall Road", "Snow View Point", "Tiffin Top", "Naina Devi Temple"]
  },
  { 
    name: "Mussoorie", 
    img: "https://www.holidify.com/images/bgImages/MUSSOORIE.jpg",
    description: "The 'Queen of Hills' offers stunning landscapes, waterfalls, and colonial-era charm. The town is famous for its vibrant markets and scenic mountain trails.",
    famousFor: ["Kempty Falls", "Gun Hill", "Mall Road", "Company Garden", "Lal Tibba"]
  },
  { 
    name: "Rishikesh", 
    img: "https://www.holidify.com/images/bgImages/RISHIKESH.jpg",
    description: "A spiritual and adventure hub known for yoga retreats and thrilling river rafting. It is also a gateway to the Garhwal Himalayas and a paradise for meditation seekers.",
    famousFor: ["Lakshman Jhula", "Triveni Ghat", "Rafting", "Neelkanth Mahadev Temple", "Beatles Ashram"]
  },
  { 
    name: "Kedarnath", 
    img: "https://www.holidify.com/images/bgImages/KEDARNATH.jpg",
    description: "A sacred pilgrimage site, part of the Char Dham Yatra, surrounded by snow-clad peaks. The trek to the temple is a spiritually uplifting experience.",
    famousFor: ["Kedarnath Temple", "Vasuki Tal", "Gandhi Sarovar", "Bhairavnath Temple", "Sonprayag"]
  },
  { 
    name: "Badrinath", 
    img: "https://www.holidify.com/images/bgImages/BADRINATH.jpg",
    description: "A revered town in the Himalayas, home to the famous Badrinath Temple. Pilgrims and travelers alike visit for its spiritual significance and scenic beauty.",
    famousFor: ["Badrinath Temple", "Mana Village", "Tapt Kund", "Charan Paduka", "Vasudhara Falls"]
  },
  { 
    name: "Jim Corbett", 
    img: "https://www.holidify.com/images/bgImages/JIM-CORBETT-NATIONAL-PARK.jpg",
    description: "India’s first national park, known for its Bengal tiger population and wildlife safaris. A haven for wildlife enthusiasts and nature lovers.",
    famousFor: ["Wildlife Safari", "Corbett Waterfall", "Garjiya Devi Temple", "Dhikala Zone", "Bijrani Zone"]
  },
  { 
    name: "Haridwar", 
    img: "https://www.holidify.com/images/bgImages/HARIDWAR.jpg",
    description: "A sacred city on the banks of the Ganges, famous for its grand evening Ganga Aarti. It is one of the seven holiest places in Hinduism.",
    famousFor: ["Har Ki Pauri", "Mansa Devi Temple", "Ganga Aarti", "Chandi Devi Temple", "Daksh Mahadev Temple"]
  },
  { 
    name: "Almora", 
    img: "https://www.holidify.com/images/bgImages/ALMORA.jpg",
    description: "A cultural and scenic hill station offering mesmerizing views of the Himalayas. It is known for its rich heritage, handicrafts, and Kumaoni cuisine.",
    famousFor: ["Bright End Corner", "Jageshwar Temple", "Zero Point", "Kasar Devi Temple", "Chitai Golu Devta Temple"]
  },
  { 
    name: "Chopta", 
    img: "https://www.holidify.com/images/bgImages/CHOPTA.jpg",
    description: "A picturesque trekking destination, known as the 'Mini Switzerland of India'. The region is home to lush meadows and stunning panoramic views.",
    famousFor: ["Tungnath Temple", "Chandrashila Trek", "Deoria Tal", "Rohini Bugyal", "Sari Village"]
  },
  { 
    name: "Auli", 
    img: "https://www.holidify.com/images/bgImages/AULI.jpg",
    description: "India’s premier skiing destination, with spectacular views of the Nanda Devi range. It offers a perfect mix of adventure and tranquility.",
    famousFor: ["Skiing", "Auli Ropeway", "Gorson Bugyal", "Artificial Lake", "Chenab Lake"]
  },
  { 
    name: "Valley of Flowers", 
    img: "https://www.holidify.com/images/bgImages/VALLEY-OF-FLOWERS.jpg",
    description: "A UNESCO World Heritage Site, famous for its vibrant meadows of endemic alpine flowers. The valley is a paradise for trekkers and botanists.",
    famousFor: ["Rare Flowers", "Nanda Devi National Park", "Trekking", "Hemkund Sahib", "Pushpawati River"]
  },
  { 
    name: "Ranikhet", 
    img: "https://www.holidify.com/images/bgImages/RANIKHET.jpg",
    description: "A tranquil hill station offering lush greenery, colonial charm, and panoramic views. It is a perfect retreat for those seeking peace and natural beauty.",
    famousFor: ["Jhula Devi Temple", "Chaubatia Orchards", "Upat Golf Course", "Bhalu Dam", "Majkhali"]
  }
];


const NotFound = () => {
  const location = useLocation();
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-20 text-white text-center">
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto px-4 relative z-10"
  >
    <div className="text-center text-white-800 mb-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Popular Places in Uttarakhand</h1>
      <p className="text-xl max-w-3xl mx-auto">
        Discover the best travel experiences with us. We offer expert-guided tours and hassle-free transportation across North India.
      </p>
    </div>
  </motion.div>
</section>


      {/* Popular Places Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {popularPlaces.map((place, index) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-transform transform hover:-translate-y-2 cursor-pointer scale-105 bg-white p-4"
              onClick={() => setSelectedPlace(place)} // Set clicked place
            >
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={place.img} 
                  alt={place.name} 
                  className="w-full h-56 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-1"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-3xl font-semibold text-white">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Place Details */}
{/* Modal for Place Details */}
{selectedPlace && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
    <div className="relative bg-white bg-opacity-95 backdrop-blur-xl shadow-2xl rounded-3xl max-w-4xl w-full h-[80vh] overflow-y-auto p-8 md:p-12 transition-transform transform scale-100 hover:scale-105 duration-300 ease-in-out">
      <button 
        className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-4xl transition-colors duration-200" 
        onClick={() => setSelectedPlace(null)}
      >
        &times;
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img 
          src={selectedPlace.img} 
          alt={selectedPlace.name} 
          className="w-full h-80 md:h-full object-cover rounded-2xl shadow-lg" 
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 md:mt-0 text-center md:text-left">{selectedPlace.name}</h2>
          <p className="text-lg md:text-xl text-gray-700 mt-4 text-center md:text-left leading-relaxed">{selectedPlace.description}</p>
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-6 text-center">Famous For:</h3>
      <ul className="list-disc list-inside text-gray-800 text-lg md:text-xl mt-4 space-y-3 px-4 md:px-8">
        {selectedPlace.famousFor.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-primary-600 text-2xl">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

     

      <Footer />
    </div>
  );
};

export default NotFound;
