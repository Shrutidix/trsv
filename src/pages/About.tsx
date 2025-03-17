import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-primary-800 mb-8">About Us</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Welcome to our travel agency! We are dedicated to providing exceptional travel experiences
              in the beautiful regions of Himachal Pradesh and Uttarakhand.
            </p>
            
            <p className="mb-6">
              With years of experience and a deep love for these mountainous regions, our team is committed
              to helping you discover the natural beauty, rich culture, and unforgettable adventures that
              await in the Indian Himalayas.
            </p>
            
            <h2 className="text-2xl font-semibold text-primary-700 mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to create memorable travel experiences that connect people with the stunning
              landscapes and vibrant cultures of Himachal Pradesh and Uttarakhand, while promoting sustainable
              tourism practices that respect and preserve the natural environment and local communities.
            </p>
            
            <h2 className="text-2xl font-semibold text-primary-700 mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Local expertise and knowledge of hidden gems</li>
              <li className="mb-2">Customized travel packages to suit your preferences</li>
              <li className="mb-2">Commitment to responsible and sustainable tourism</li>
              <li className="mb-2">24/7 customer support during your journey</li>
              <li className="mb-2">Competitive pricing and transparent policies</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;