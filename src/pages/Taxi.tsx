import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TaxiTypeSelector from '@/components/TaxiTypeSelector';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Taxi = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Book Your Taxi Service</h1>
          <p className="text-base max-w-2xl mx-auto">
            Choose from our fleet of comfortable vehicles with experienced drivers for your journey
          </p>
        </div>
      </section>

      {/* Taxi Types Section */}
      <TaxiTypeSelector />

      {/* Custom Car Request Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Car className="w-8 h-8 text-primary-600" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Can't Find Your Preferred Car?
                </h2>
                <p className="text-gray-600">
                  Don't worry! Tell us what you're looking for, and we'll arrange it for you within an hour.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="carName" className="text-sm font-medium text-gray-700">Preferred Car</label>
                  <Input
                    id="carName"
                    name="carName"
                    value={formData.carName}
                    onChange={handleChange}
                    placeholder="Tell us which car you're looking for"
                    required
                    className="w-full"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>

              {/* Features */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-sm text-gray-600">
                    Response within 1 hour
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-sm text-gray-600">
                    Direct phone support
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Car className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-sm text-gray-600">
                    Wide range of vehicles
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Taxi;