import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-20 text-white text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            The rules and guidelines for using Uttarakhand Road Trip.
          </p>
        </motion.div>
      </section>
      
      {/* Terms Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Acceptance of Terms</h2>
          <p className="text-lg text-gray-600">
            By accessing our website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Cookies</h2>
          <p className="text-lg text-gray-600">
            We use cookies to improve your experience. By continuing to browse, you agree to our use of cookies in accordance with our Privacy Policy.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Intellectual Property</h2>
          <p className="text-lg text-gray-600">
            All content on this website, including text, graphics, logos, and images, is the property of Uttarakhand Road Trip and may not be used without permission.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">User Responsibilities</h2>
          <p className="text-lg text-gray-600">
            You agree not to use our website for any unlawful purpose or in violation of these terms.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">If you have any questions about our Terms and Conditions, contact us:</p>
          <ul className="list-disc ml-6 mt-4 text-lg text-gray-600">
            <li>
              By email: <a href="mailto:uttarakhandroadtrip23@gmail.com" className="text-primary-600">uttrakhandroadtrip@gmail.com</a>
            </li>
            <li>
              By visiting this page: <a href="/contact" className="text-primary-600">Contact Us</a>
            </li>
            <li>
              By phone number: <span className="text-primary-600">9808762088</span>
            </li>
          </ul>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;