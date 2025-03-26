import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-20 text-white text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center text-white-800 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the best travel experiences with us. We offer expert-guided tours and hassle-free transportation across North India.
            </p>
          </div>
        </motion.div>
      </section>
     
      
      <main className="flex-grow container mx-auto px-4 py-12">
        
        {/* Owner Section */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-8 mb-12">
  <img
    src="https://via.placeholder.com/350"
    alt="Owner"
    className="w-72 h-72 rounded-full object-cover border-4 border-primary-500 shadow-lg"
  />
  <div className="md:ml-8 text-center md:text-left">
    <h2 className="text-3xl font-bold text-primary-800">[Owner's Name]</h2>
    <p className="text-lg text-gray-600 mt-4">
      Founder & CEO of [Company Name]. Passionate about delivering the best travel experiences across Himachal Pradesh and Uttarakhand.
    </p>
  </div>
</div>
 
        {/* Our Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary-700 text-center mb-6">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[  
              { title: "Adventure & Trekking Tours", desc: "Experience thrilling trekking adventures in the Himalayas with expert guides." },
              { title: "Pilgrimage Trips", desc: "Visit sacred destinations like Kedarnath, Badrinath, and Vaishno Devi with comfort and safety." },
              { title: "Local Guide Services", desc: "Explore hidden gems with our experienced local guides." },
              { title: "Transportation Arrangements", desc: "Book comfortable taxis, tempo travelers, and buses for your journey." },
              { title: "Customized Tour Packages", desc: "Plan personalized travel experiences tailored to your preferences." },
              { title: "Hotel & Homestay Booking", desc: "Stay in hand-picked accommodations for a memorable trip." },
            ].map((service, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
      s


        
        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-bold text-primary-700 text-center mb-6">Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[  
              { name: "Amit Verma", text: "Best travel experience ever! Highly recommended!", rating: 5 },
              { name: "Priya Sharma", text: "Amazing service and great local knowledge!", rating: 4 },
              { name: "Rahul Singh", text: "Loved the customized tour package. Everything was perfect!", rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-lg">
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <p className="text-gray-800 font-semibold mt-2">- {testimonial.name}</p>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
         {/* Company Information */}
  <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-primary-700 mb-4"> Our Company</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Uttarakhand Road Trip is a private limited company based in the beautiful state of Uttarakhand, providing top-notch travel services since 2012. We specialize in offering smooth and memorable road trips across Uttarakhand, with a team of trained professionals dedicated to delivering the best travel experience. Over the years, we have managed numerous tours, both big and small, ensuring customer satisfaction at every step.

With a strong network in key cities like Nainital, Mussoorie, Dehradun, and Rishikesh, we cater to the needs of both local and international travelers. Our commitment is to provide comfortable, safe, and reliable taxi services, making every journey unforgettable. Client satisfaction remains our top priority, and we constantly strive to exceed expectations with each trip.
          </p>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default About;
