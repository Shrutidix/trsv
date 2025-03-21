import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const popularPlaces = [
  { 
    name: "Nainital", 
    img: "https://1.bp.blogspot.com/-5WtytcU0cV8/Xt-JQJOGffI/AAAAAAAADY8/__4BPVjfI_gW3oautX2GSPW1Dnc7aKZCwCK4BGAsYHg/s1440/Best-Places-to-visit-in-Nainital.jpg",
    description: "Nainital is a beautiful hill station known for its scenic lakes and lush green hills.",
    famousFor: ["Naini Lake", "The Mall Road", "Snow View Point"]
  },
  { 
    name: "Mussoorie", 
    img: "https://www.clubmahindra.com/blog/media/section_images/shuttersto-17534db46414b71.jpg",
    description: "Mussoorie, known as the 'Queen of Hills', offers stunning views and a cool climate.",
    famousFor: ["Kempty Falls", "Gun Hill", "Mall Road"]
  },
  { 
    name: "Rishikesh", 
    img: "https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2020/02/Neelkanth-Mahadev-Temple-Rishikesh.jpg",
    description: "Rishikesh is a spiritual hub known for its yoga retreats and adventure sports.",
    famousFor: ["Lakshman Jhula", "Triveni Ghat", "Rafting"]
  },
  { 
    name: "Kedarnath", 
    img: "https://th.bing.com/th/id/OIP.ioqKWm_-MHsaWgj8uFEFgQHaE6?rs=1&pid=ImgDetMain",
    description: "Kedarnath is a sacred Hindu pilgrimage site and part of the Char Dham circuit.",
    famousFor: ["Kedarnath Temple", "Vasuki Tal", "Gandhi Sarovar"]
  },
  { 
    name: "Badrinath", 
    img: "https://www.pilgrimagetour.in/blog/wp-content/uploads/2023/09/Badrinath-Weather.jpg",
    description: "Badrinath is a holy town and an important pilgrimage site in the Himalayas.",
    famousFor: ["Badrinath Temple", "Mana Village", "Tapt Kund"]
  },
  { 
    name: "Jim Corbett", 
    img: "https://th.bing.com/th/id/OIP.-sYTATGDbpWmL4CBVYHBfAHaEK?w=800&h=450&rs=1&pid=ImgDetMain",
    description: "Jim Corbett National Park is India's oldest national park, famous for Bengal tigers.",
    famousFor: ["Wildlife Safari", "Corbett Waterfall", "Garjiya Devi Temple"]
  },
  { 
    name: "Haridwar", 
    img: "https://th.bing.com/th/id/OIP.hG9LClxDsZtKLvc3Y3W9DAHaEv?rs=1&pid=ImgDetMain",
    description: "Haridwar is a sacred city on the banks of the Ganges, known for its evening aarti.",
    famousFor: ["Har Ki Pauri", "Mansa Devi Temple", "Ganga Aarti"]
  },
  { 
    name: "Almora", 
    img: "https://www.adotrip.com/public/images/city/master_images/5e3d3fd59fcc3-Almora_Trip.jpg",
    description: "Almora is a picturesque hill station with a rich cultural heritage.",
    famousFor: ["Bright End Corner", "Jageshwar Temple", "Zero Point"]
  },
  { 
    name: "Chopta", 
    img: "https://travels.digicomposite.com/wp-content/uploads/2020/11/Chopta.jpg",
    description: "Chopta is a scenic trekking destination, also known as the 'Mini Switzerland of India'.",
    famousFor: ["Tungnath Temple", "Chandrashila Trek", "Deoria Tal"]
  },
  { 
    name: "Auli", 
    img: "https://img.veenaworld.com/wp-content/uploads/2021/05/20-Magical-Places-to-Visit-in-Auli-with-Your-Gang-scaled.jpg",
    description: "Auli is India's premier skiing destination with breathtaking Himalayan views.",
    famousFor: ["Skiing", "Auli Ropeway", "Gorson Bugyal"]
  },
  { 
    name: "Valley of Flowers", 
    img: "https://th.bing.com/th/id/OIP._vQ_oaDyAgNL-KhMQ-z77gHaEK?w=1280&h=720&rs=1&pid=ImgDetMain",
    description: "A UNESCO World Heritage Site, Valley of Flowers is a paradise for nature lovers.",
    famousFor: ["Rare Flowers", "Nanda Devi National Park", "Trekking"]
  },
  { 
    name: "Ranikhet", 
    img: "https://th.bing.com/th/id/OIP.r-e2rigFTr0lMNY12daxUwHaE3?rs=1&pid=ImgDetMain",
    description: "Ranikhet is a serene hill station offering beautiful views of the Himalayas.",
    famousFor: ["Jhula Devi Temple", "Chaubatia Orchards", "Upat Golf Course"]
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
      
      <section className="bg-gradient-to-r from-purple-500 to-purple-700 py-20 text-white text-center">
        <h1 className="text-5xl font-bold">Popular Places in Uttarakhand</h1>
        <p className="text-xl max-w-3xl mx-auto mt-4">
          Discover the best travel experiences with us. We offer expert-guided tours and hassle-free transportation across North India.
        </p>
      </section>

      {/* Popular Places Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {popularPlaces.map((place, index) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedPlace(place)} // Set clicked place
            >
              <img 
                src={place.img} 
                alt={place.name} 
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Place Details */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button 
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl" 
              onClick={() => setSelectedPlace(null)}
            >
              &times;
            </button>
            <img src={selectedPlace.img} alt={selectedPlace.name} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-3xl font-bold text-gray-800 mt-4">{selectedPlace.name}</h2>
            <p className="text-gray-600 mt-2">{selectedPlace.description}</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Famous For:</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {selectedPlace.famousFor.map((item, index) => (
                <li key={index}>{item}</li>
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
