import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Images (replace with your actual image imports)
import owner1 from "../assets/image5.jpeg";
import tourist1 from "../assets/tourist1.jpeg";
import place from "../assets/rishikesh.jpg";
import owner3 from "../assets/image2.jpeg";

// YouTube video link
const youtubeVideoLink = "https://www.youtube.com/embed/6M7wWia442I";

const FeaturedGalleryRedirect: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-14">
      {/* Section for YouTube Video and Blog Text */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">🎬📸  Explore Our Gallery</h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Medium-Sized YouTube Video */}
          <div className="w-full md:w-[480px] max-w-full">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={youtubeVideoLink}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Blog-style Promotional Text */}
          <div className="md:max-w-md text-gray-700 text-center md:text-left">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Trusted by Celebrities</h3>
            <p className="mb-2">
              🎉 We are proud to have served the renowned comedian <strong>Bharati Singh</strong> and the famous travel YouTuber <strong>Surab Joshi</strong>!
            </p>
            <p className="mb-2">
              Our services ensure premium travel experiences — whether you're a celebrity or an everyday explorer.
            </p>
            <p>
              Join the journey, explore the gallery, and be a part of our growing family of happy travelers.
            </p>
          </div>
        </div>
      </section>

      {/* Section for Featured Images */}
      <section className="text-center mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[owner1, owner3, tourist1, place].map((img, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
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
