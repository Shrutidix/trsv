import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-400 py-20 text-white text-center">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="text-xl max-w-3xl mx-auto mt-4">
          Discover the best travel experiences with us. We offer expert-guided tours and hassle-free transportation across North India.
        </p>
      </section>
      
      <main className="flex-grow container mx-auto px-4 py-12">
        
        {/* Owner Section */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 mb-12">
          <img
            src="https://via.placeholder.com/200"
            alt="Owner"
            className="w-40 h-40 rounded-full object-cover border-4 border-primary-500"
          />
          <div className="md:ml-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary-800">[Owner's Name]</h2>
            <p className="text-gray-600 mt-2">
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
        
       {/* Meet Our Team */}
       <section className="mb-12 text-center">
  <h2 className="text-3xl font-bold text-primary-700 mb-6">Meet Our Team</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-auto max-w-4xl">
    {[
      { name: "John Doe", img: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" }, 
      { name: "Jane Smith", img: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" }, 
      { name: "Michael Lee", img: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" },
      { name: "Emma Brown", img: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" },
      { name: "Chris Johnson", img: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" },
      { name: "Chris Johnson", img: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" }
    ].map((member, index) => (
      <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
        <img 
          src={member.img} 
          alt={member.name} 
          className="w-32 h-32 object-cover mx-auto  border-primary-500 shadow-md"
        />
        <p className="mt-4 font-semibold text-gray-700">{member.name}</p>
      </div>
    ))}
  </div>
</section>



        
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
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
