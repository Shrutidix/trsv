import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Policy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-base max-w-2xl mx-auto">
            Our commitment to your privacy and security.
          </p>
        </motion.div>
      </section>
      
      {/* Policy Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Third-Party Links</h2>
          <p className="text-lg text-gray-600">
            Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </section>
        
        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-lg text-gray-600">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            We will let you know via email and/or a prominent notice on our service prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">If you have any questions about this Privacy Policy, you can contact us:</p>
          <ul className="list-disc ml-6 mt-4 text-lg text-gray-600">
            <li>
              By email: <a href="mailto:uttarakhandroadtrip23@gmail.com" className="text-primary-600">uttrakhandroadtrip@gmail.com</a>
            </li>
            <li>
              By visiting this page on our website: <a href="/contact" className="text-primary-600">Contact Us</a>
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

export default Policy;
