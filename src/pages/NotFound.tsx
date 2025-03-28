import React, { useState } from "react";
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
  const [selectedPlace, setSelectedPlace] = useState(null);

  const closeModal = (e) => {
    if (e.target.id === "modalBackground") {
      setSelectedPlace(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
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
            Explore the most beautiful and spiritual destinations in Uttarakhand.
            </p>
          </div>
        </motion.div>
      </section>
      
      <section className="py-10 text-center">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {popularPlaces.map((place, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer" onClick={() => setSelectedPlace(place)}>
              <img src={place.img} alt={place.name} className="w-full h-56 object-cover" />
              <div className="p-4 text-gray-800 font-semibold text-lg">{place.name}</div>
            </div>
          ))}
        </div>
      </section>

      {selectedPlace && (
  <div id="modalBackground" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={closeModal}>
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto">
      <button className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl" onClick={() => setSelectedPlace(null)}>×</button>
      <h2 className="text-2xl font-bold mb-2">{selectedPlace.name}</h2>
      <img src={selectedPlace.img} alt={selectedPlace.name} className="w-full h-40 object-cover rounded-lg mb-4" />
      <p className="text-gray-600 mb-4">{selectedPlace.description}</p>
      <h3 className="text-lg font-semibold">Famous Points:</h3>
      <ul className="list-disc list-inside text-gray-700 max-h-40 overflow-y-auto">
        {selectedPlace.famousFor.map((point, index) => (
          <li key={index}>{point}</li>
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
