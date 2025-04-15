import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Images (replace with your actual image imports)
import owner1 from "../assets/image5.jpeg";
import tourist1 from "../assets/tourist1.jpeg";
import place from "../assets/rishikesh.jpg";
import owner3 from "../assets/owner3.jpeg";

// YouTube video link (replace with your own link)
const youtubeVideoLink = "https://www.youtube.com/embed/6M7wWia442I";

const FeaturedGalleryRedirect: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-14">
      {/* Section for YouTube Video */}
      <section className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎬📸  Explore Our Gallery</h2>
        <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={youtubeVideoLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Section for Featured Images (Owner, Tourist, and Places) */}
      <section className="text-center mb-10">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Owner Images */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={owner1}
              alt="Owner"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          <motion.div
            className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={owner3}
              alt="Owner 3"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Tourist Images */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={tourist1}
              alt="Tourist"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Place Images */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={place}
              alt="Tourist Place"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* Button to Redirect to the Gallery */}
      <div className="text-center mt-10">
        <Link
          to="/gallery"
          className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Explore Full Gallery
        </Link>
      </div>
    </div>
  );
};

export default FeaturedGalleryRedirect;
