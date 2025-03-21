import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
//import { Button } from "@/components/ui/button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import for slider styling

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
            About Us
          </h1>

          {/* Owner Section */}
          <div className="flex flex-col md:flex-row items-center mb-12 bg-white shadow-md rounded-xl p-6">
            <img
              src="https://via.placeholder.com/200" // Replace with owner image URL
              alt="Owner"
              className="w-40 h-40 rounded-full object-cover border-4 border-primary-500"
            />
            <div className="md:ml-6 text-center md:text-left">
              <h2 className="text-2xl font-bold text-primary-800">
                [Owner's Name]
              </h2>
              <p className="text-gray-600 mt-2">
                Founder & CEO of [Company Name]. With years of experience in
                travel and tourism, I am committed to offering the best travel
                experiences in Himachal Pradesh and Uttarakhand.
              </p>
            </div>
          </div>

          {/* Coworker Image Slider */}
          <h2 className="text-3xl font-semibold text-primary-700 text-center mb-6">
            Meet Our Team
          </h2>
          <div className="max-w-3xl mx-auto mb-12">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
            >
              {[
                { name: "John Doe", img: "https://via.placeholder.com/300" },
                { name: "Jane Smith", img: "https://via.placeholder.com/300" },
                { name: "Michael Lee", img: "https://via.placeholder.com/300" },
              ].map((coworker, index) => (
                <div key={index} className="text-center">
                  <img
                    src={coworker.img}
                    alt={coworker.name}
                    className="rounded-lg mx-auto"
                  />
                  <p className="mt-2 font-semibold text-gray-700">
                    {coworker.name}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Our Work Section */}
          <h2 className="text-3xl font-semibold text-primary-700 text-center mb-6">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              "Customized Tour Packages",
              "Hotel & Homestay Bookings",
              "Adventure & Trekking Tours",
              "Pilgrimage Trips",
              "Local Guide Services",
              "Transportation Arrangements",
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg text-center"
              >
                <h3 className="text-lg font-semibold text-gray-800">{service}</h3>
              </div>
            ))}
          </div>

          {/* Testimonials & Ratings */}
          <h2 className="text-3xl font-semibold text-primary-700 text-center mb-6">
            Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Amit Verma",
                text: "Best travel experience ever! Highly recommended!",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                text: "Amazing service and great local knowledge!",
                rating: 4,
              },
              {
                name: "Rahul Singh",
                text: "Loved the customized tour package. Everything was perfect!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-lg">
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <p className="text-gray-800 font-semibold mt-2">
                  - {testimonial.name}
                </p>
                <div className="flex mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
