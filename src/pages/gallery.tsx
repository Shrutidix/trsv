import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// Owner Images
import owner1 from "../assets/image5.jpeg";
import owner2 from "../assets/image4.jpeg";
import owner3 from "../assets/owner3.jpeg";
import owner4 from "../assets/owner4.jpeg";
import owner5 from "../assets/owner5.jpeg";
import owner6 from "../assets/owner6.jpeg";
import owner7 from "../assets/owner7.jpeg";
import owner8 from "../assets/owner8.jpeg";
import owner9 from "../assets/owner9.jpeg";

// Tourist Images
import tourist1 from "../assets/tourist1.jpeg";
import tourist2 from "../assets/tourist2.jpeg";
import tourist3 from "../assets/tourist3.jpeg";
import tourist4 from "../assets/tourist4.jpeg";
import tourist5 from "../assets/tourist5.jpeg";
import tourist6 from "../assets/tourist6.jpeg";
import tourist7 from "../assets/tourist7.jpeg";
import tourist8 from "../assets/tourist8.jpeg";
import tourist9 from "../assets/tourist9.jpeg";
import tourist10 from "../assets/tourist10.jpeg";

import tourist12 from "../assets/tourist12.jpeg";

// Place Images
import place1 from "../assets/place1.jpeg";
import place2 from "../assets/place2.jpeg";
import place3 from "../assets/place3.jpeg";
import place4 from "../assets/place5.jpeg";
import place5 from "../assets/place6.jpeg";
import place6 from "../assets/place7.jpeg";
import place7 from "../assets/place8.jpeg";
import place8 from "../assets/place10.jpg";
import place9 from "../assets/place11.jpg";
import place10 from "../assets/snoy mountain.jpg";
import place11 from "../assets/place2.jpeg";

// Car Images

import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.png";
import car6 from "../assets/car6.jpg";

// Celebrity Images
import celebrity1 from "../assets/celeb1.jpeg";

// Videos
import ukvideo1 from "../assets/ukvideo1.mp4";
import ukvideo2 from "../assets/ukvideo2.mp4";

// Category Data
const categoryData: Record<string, (string | { title: string; src: string })[]> = {
  Owner: [owner1, owner2, owner3, owner4, owner5, owner6, owner7, owner8, owner9],
  Tourist: [
    tourist1,
    tourist2,
    tourist3,
    tourist4,
    tourist5,
    tourist6,
    tourist7,
    tourist8,
    tourist9,
    tourist10,
   
    tourist12,
  ],
  Place: [place1, place2, place3, place4, place5, place6, place7, place8, place9, place10, place11],
  Car: [ car3, car4, car5, car6],
  Celebrity: [celebrity1],
  Video: [
    { title: "Trip to Himalayas", src: ukvideo1 },
    { title: "Adventure in Rishikesh", src: ukvideo2 },
    { title: "Mountain Ride", src: ukvideo1 },
    { title: "Temple Visit", src: ukvideo2 },
    { title: "Local Culture", src: ukvideo1 },
    { title: "Market Tour", src: ukvideo2 },
    { title: "Snow Drive", src: ukvideo1 },
    { title: "Camping Night", src: ukvideo2 },
    { title: "River Rafting", src: ukvideo1 },
    { title: "Sunset View", src: ukvideo2 },
    { title: "Scenic Drive", src: ukvideo1 },
    { title: "Food Vlog", src: ukvideo2 },
  ],
};

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-20 text-white text-center shadow">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl font-bold mb-2">Gallery</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore owner-shared, tourist experiences, places, cars, celebrities, and tour videos!
          </p>
        </motion.div>
      </section>

      {/* Category Selector */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">✨ Explore By Category</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.keys(categoryData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory((prev) => (prev === category ? null : category))}
              className={`px-5 py-2 rounded-full border font-medium shadow-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category Grid */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryData[activeCategory]?.map((item, index) =>
                  typeof item === "string" ? (
                    <motion.div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelectedImage(item)}
                    >
                      <img
                        src={item}
                        alt={`${activeCategory} ${index + 1}`}
                        className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md bg-white"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <video controls className="w-full h-60 object-cover">
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="p-2 text-sm font-medium text-center text-gray-700">
                        {item.title}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Enlarged view"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-[80vh] rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-5 right-5 text-white text-2xl font-bold hover:text-red-500"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
