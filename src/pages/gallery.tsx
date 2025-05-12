import React, { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

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
import place12 from  "../assets/Delhi.jpg";
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

const API_URL = 'https://trsvbackend.vercel.app/api';

const categoryDataRaw = {
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
  const [showYoutube, setShowYoutube] = useState(false);
  const [generalPhotos, setGeneralPhotos] = useState<string[]>([]);
  const [loadingGeneral, setLoadingGeneral] = useState(true);
  const youtubeRef = useRef<HTMLDivElement>(null);

  // Memoize category data to avoid unnecessary re-renders
  const categoryData = useMemo(() => categoryDataRaw, []);

  // Service worker registration for offline support
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  // Fetch general gallery photos from MongoDB
  useEffect(() => {
    // Load cached photos from localStorage first
    const cachedPhotos = localStorage.getItem('galleryPhotos');
    if (cachedPhotos) {
      setGeneralPhotos(JSON.parse(cachedPhotos));
      setLoadingGeneral(false);
    }
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(`${API_URL}/photos/all`);
        if (res.data && Array.isArray(res.data.data)) {
          const photoUrls = res.data.data.map(photo => `${API_URL}/photos/${photo._id}`);
          setGeneralPhotos(photoUrls);
          localStorage.setItem('galleryPhotos', JSON.stringify(photoUrls));
        }
      } catch (err) {
        // fallback: no fetched photos
      } finally {
        setLoadingGeneral(false);
      }
    };
    fetchPhotos();
  }, []);

  // Cache last selected category in localStorage
  useEffect(() => {
    const lastCategory = localStorage.getItem('lastGalleryCategory');
    if (lastCategory) setActiveCategory(lastCategory);
  }, []);
  useEffect(() => {
    if (activeCategory) localStorage.setItem('lastGalleryCategory', activeCategory);
  }, [activeCategory]);

  // Defer YouTube iframe loading until in view
  useEffect(() => {
    const handleScroll = () => {
      if (youtubeRef.current) {
        const rect = youtubeRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowYoutube(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only render images/videos for the active category
  const renderCategoryContent = () => {
    if (!activeCategory) return null;
    return (
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
          {categoryData[activeCategory]?.map((item, index) =>
            typeof item === "string" ? (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer gallery-img"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item}
                  alt={`${activeCategory} ${index + 1}`}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <video controls title={item.title} className="w-full h-64 object-cover" preload="none">
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className="p-3 text-center font-medium text-sm text-gray-700">{item.title}</div>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Banner */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-500 py-20 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight">Gallery</h1>
          <p className="text-lg max-w-3xl mx-auto text-white/90">
            Dive into experiences shared by owners and tourists, scenic places, luxury rides, and more!
          </p>
        </div>
      </section>

      {/* Featured YouTube Video (deferred load) */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">
          🎬 Featured YouTube Video
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10" ref={youtubeRef}>
          {/* Video */}
          <div className="w-full md:w-[480px] aspect-video rounded-xl overflow-hidden shadow-lg">
            {showYoutube ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/6M7wWia442I"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 text-2xl">
                Loading video…
              </div>
            )}
          </div>
          {/* Description */}
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-800">A Journey Through the Hills</h3>
            <p className="text-gray-600 leading-relaxed">
              Watch this immersive video capturing the serene beauty of the Himalayas,
              thrilling adventures in Rishikesh, and peaceful moments across Uttarakhand. 
              This featured clip highlights the essence of every traveler's dream!
            </p>
          </div>
        </div>
      </section>

      {/* General Gallery (Always Visible, only if no category selected) */}
      {!activeCategory && (
        <section className="container mx-auto px-4 pb-10 text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">✨ General Gallery</h2>
          {loadingGeneral ? (
            <div className="text-gray-500 text-lg py-10">Loading photos…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
              {/* MongoDB photos first */}
              {generalPhotos.map((imgSrc, idx) => (
                <div
                  key={"mongo-" + idx}
                  className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer gallery-img"
                  onClick={() => setSelectedImage(imgSrc)}
                >
                  <img
                    src={imgSrc}
                    alt={`General Gallery ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
              {/* Hardcoded fallback images always shown */}
              {[owner1, owner2, tourist1, place1].map((imgSrc, idx) => (
                <div
                  key={"hard-" + idx}
                  className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer gallery-img"
                  onClick={() => setSelectedImage(imgSrc)}
                >
                  <img
                    src={imgSrc}
                    alt={`General Image ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

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
        {/* Category Content (only render when active) */}
        <AnimatePresence>{renderCategoryContent()}</AnimatePresence>
      </section>

      {/* Modal Preview (only Framer Motion here) */}
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
              loading="lazy"
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

      {/* More Constant Images (only if no category selected) */}
      {!activeCategory && (
        <section className="container mx-auto px-4 pb-16 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
            {[place6, tourist5, owner3, car6, place14, owner6, car11, tourist2].map((imgSrc, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer gallery-img"
                onClick={() => setSelectedImage(imgSrc)}
              >
                <img
                  src={imgSrc}
                  alt={`More Image ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
      {/* Add a little CSS for smooth hover/scale */}
      <style>{`
        .gallery-img img { will-change: transform; }
      `}</style>
    </div>
  );
};

export default Gallery;


