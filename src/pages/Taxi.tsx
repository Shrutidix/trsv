import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TaxiTypeSelector from '@/components/TaxiTypeSelector';

const Taxi = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Taxi Service</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Choose from our fleet of comfortable vehicles with experienced drivers for your journey
          </p>
        </div>
      </section>

      {/* Taxi Types Section */}
      <TaxiTypeSelector />

      <Footer />
    </div>
  );
};

export default Taxi;