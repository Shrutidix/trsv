import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const popularPlaces = [
  { name: "Nainital", img: "https://1.bp.blogspot.com/-5WtytcU0cV8/Xt-JQJOGffI/AAAAAAAADY8/__4BPVjfI_gW3oautX2GSPW1Dnc7aKZCwCK4BGAsYHg/s1440/Best-Places-to-visit-in-Nainital.jpg" },
  { name: "Mussoorie", img: "https://www.clubmahindra.com/blog/media/section_images/shuttersto-17534db46414b71.jpg" },
  { name: "Rishikesh", img: "https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2020/02/Neelkanth-Mahadev-Temple-Rishikesh.jpg" },
  { name: "Kedarnath", img: "https://th.bing.com/th/id/OIP.ioqKWm_-MHsaWgj8uFEFgQHaE6?rs=1&pid=ImgDetMain" },
  { name: "Badrinath", img: "https://www.pilgrimagetour.in/blog/wp-content/uploads/2023/09/Badrinath-Weather.jpg" },
  { name: "Jim Corbett", img: "https://th.bing.com/th/id/OIP.-sYTATGDbpWmL4CBVYHBfAHaEK?w=800&h=450&rs=1&pid=ImgDetMain" }
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Popular Places Grid */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8 tracking-wide">
          Popular Places in Uttarakhand
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {popularPlaces.map((place, index) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
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

      <Footer />
    </div>
  );
};

export default NotFound;
