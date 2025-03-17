
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaxiBookingForm from "@/components/TaxiBookingForm";
import TaxiTypeSelector from "@/components/TaxiTypeSelector";
import TaxiView3D from "@/components/TaxiView3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Taxi = () => {
  const [selectedTaxiType, setSelectedTaxiType] = useState("sedan");
  const [show3DView, setShow3DView] = useState(false);
  const { toast } = useToast();

  const handleBookNow = () => {
    toast({
      title: "Booking Request Submitted",
      description: "We'll contact you shortly to confirm your taxi booking.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?q=80&w=2062&auto=format&fit=crop')]"></div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Taxi Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comfortable, reliable and professional taxi services for your North India journey
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            {/* <TaxiBookingForm /> */}
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Choose Your Perfect Vehicle</h2>
          <p className="text-gray-600 mt-2">Select from our range of comfortable vehicles for your journey</p>
        </div>

        <div className="mb-16">
          <TaxiTypeSelector 
            selectedType={selectedTaxiType} 
            onSelectType={(type) => {
              setSelectedTaxiType(type);
              setShow3DView(true);
            }}
          />
        </div>

        {show3DView && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100">
              <Tabs defaultValue="view" className="w-full">
                <div className="border-b">
                  <div className="container px-6">
                    <TabsList className="bg-transparent h-16">
                      <TabsTrigger 
                        value="view" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-500 rounded-none"
                      >
                        3D Interactive View
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <TabsContent value="view" className="p-0">
                  <div className="h-[600px]">
                    <TaxiView3D carType={selectedTaxiType} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookNow}
                className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-lg shadow-lg"
              >
                Book This {selectedTaxiType.charAt(0).toUpperCase() + selectedTaxiType.slice(1)} Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Taxi;