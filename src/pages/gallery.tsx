import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Import images correctly
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import image8 from "../assets/image8.jpeg";
import image9 from "../assets/image9.jpeg";
import image10 from "../assets/image10.jpeg";


const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-20 text-white text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our collection of breathtaking travel moments.
          </p>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          />
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
