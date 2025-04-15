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
import place12 from  "../assets/delhi.jpg";
import place13 from "../assets/haridawar.jpg";
import place14 from "../assets/Nainital.jpg"

// Car Images
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.png";
import car6 from "../assets/car6.jpg";
import car7 from "../assets/image1.jpeg";
import car8 from "../assets/image2.jpeg";
import car9 from "../assets/image3.jpeg";
import car10 from "../assets/image6.jpeg";
import car11 from "../assets/image7.jpeg";
import car12 from "../assets/image8.jpeg";

// Celebrity
import celebrity1 from "../assets/celeb1.jpeg";

// Videos
import ukvideo1 from "../assets/vedio1.mp4";
import ukvideo2 from "../assets/ukvideo2.mp4";
import ukvideo3 from "../assets/place4.mp4";
import ukvideo4 from "../assets/place5.mp4";

const categoryData: Record<string, (string | { title: string; src: string })[]> = {
  Owner: [owner1, owner2, owner3, owner4, owner5, owner6, owner7, owner8, owner9],
  Tourist: [
    tourist1, tourist2, tourist3, tourist4, tourist5, tourist6,
    tourist7, tourist8, tourist9, tourist10, tourist12
  ],
  Place: [
    place1, place2, place3, place4, place5, place6,
    place7, place8, place9, place10, place11, place12, place13, place14
  ],
  Car: [car3, car4, car5, car6, car7, car8, car9, car10, car11, car12],
  Celebrity: [celebrity1],
  Video: [
    { title: "Trip to Himalayas", src: ukvideo1 },
    { title: "Adventure in Rishikesh", src: ukvideo2 },
    { title: "Mountain Ride", src: ukvideo3 },
    { title: "Temple Visit", src: ukvideo4 },
  ],
};

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Banner */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-500 py-20 text-white text-center shadow-lg">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight">Gallery</h1>
          <p className="text-lg max-w-3xl mx-auto text-white/90">
            Dive into experiences shared by owners and tourists, scenic places, luxury rides, and more!
          </p>
        </motion.div>
      </section>

      {/* Constant YouTube Video */}
      <section className="container mx-auto px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">🎬  Video</h2>
        <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/6M7wWia442I"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* General Gallery (Always Visible) */}
      <section className="container mx-auto px-4 pb-10 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">✨ General Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
          {[owner1, owner2, tourist1, place1].map((imgSrc, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={imgSrc}
                alt={`General Image ${idx + 1}`}
                loading="lazy"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Buttons */}
      <section className="container mx-auto px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">📂 Explore by Category</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.keys(categoryData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory((prev) => (prev === category ? null : category))}
              className={`px-6 py-2 rounded-full border font-medium shadow-md transition-all duration-300 text-sm sm:text-base ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category Content */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                {categoryData[activeCategory]?.map((item, index) =>
                  typeof item === "string" ? (
                    <motion.div
                      key={index}
                      className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelectedImage(item)}
                    >
                      <img
                        src={item}
                        alt={`${activeCategory} ${index + 1}`}
                        loading="lazy"
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={index}
                      className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <video controls title={item.title} className="w-full h-64 object-cover">
                        <source src={item.src} type="video/mp4" />
                      </video>
                      <div className="p-3 text-center font-medium text-sm text-gray-700">{item.title}</div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Preview"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="max-w-4xl max-h-[85vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-500 transition-colors"
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


