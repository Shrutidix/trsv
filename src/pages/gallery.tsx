import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Owner Images
import owner1 from "../assets/owner1.jpeg";
import owner2 from "../assets/owner2.jpeg";
import owner3 from "../assets/owner3.jpeg";
import owner4 from "../assets/owner4.jpeg";
import owner5 from "../assets/owner5.jpeg";
import owner6 from "../assets/owner6.jpeg";
import owner7 from "../assets/owner7.jpeg";
import owner8 from "../assets/owner8.jpeg";
import owner9 from "../assets/owner9.jpeg";

// Tourist Images
import tourist1 from "../assets/user1.jpeg";
import tourist2 from "../assets/user2.jpeg";
import tourist3 from "../assets/user3.jpeg";

// Tour Videos
import ukvideo1 from "../assets/ukvideo1.mp4";
import ukvideo2 from "../assets/ukvideo2.mp4";

// Grouped Arrays
const ownerSections = [
  [owner1, owner2, owner3],
  [owner4, owner5, owner6],
  [owner7, owner8, owner9],
];

const touristImages = [tourist1, tourist2, tourist3];

const localVideos = [
  { id: 1, title: "Trip to Himalayas", src: ukvideo1 },
  { id: 2, title: "Adventure in Rishikesh", src: ukvideo2 },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-3xl font-bold mb-2">Gallery</h1>
          <p className="text-base max-w-2xl mx-auto">
            Explore owner-shared, tourist experiences, and tour videos!
          </p>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Owner Sections */}
        {ownerSections.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-2xl font-semibold mb-6">📸 Owner Section {idx + 1}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {section.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                  onClick={() => setSelectedImage(src)}
                >
                  <img
                    src={src}
                    alt={`Owner Image ${index + 1}`}
                    className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* Tourist Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">👤 Posts by Tourists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {touristImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Tourist Image ${index + 1}`}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">🎬 Tour Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localVideos.map((video) => (
              <div key={video.id} className="rounded-lg overflow-hidden shadow-lg bg-white">
                <video controls className="w-full h-64 object-cover">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4 text-center font-medium">{video.title}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Image Lightbox Modal */}
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
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
