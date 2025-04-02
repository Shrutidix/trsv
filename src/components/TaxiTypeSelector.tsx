import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Star, Snowflake, Users, Briefcase, Music, Zap, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './Header';

interface CarSpecs {
  name: string;
  type: string;
  rate: string;
  nightCharges: string;
  ac: boolean;
  image: string;
  specs: {
    description: string;
    safety: number;
    cleanliness: number;
    driverSkill: number;
    overallRating: number;
    features: string[];
  };
}

const cars: CarSpecs[] = [
  {
    name: "Swift Dzire",
    type: "Sedan",
    rate: "₹12/km",
    nightCharges: "Rs 600",
    ac: true,
    image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg",
    specs: {
      description: "Compact and fuel-efficient sedan perfect for city rides and comfortable journeys.",
      safety: 4.5,
      cleanliness: 4.6,
      driverSkill: 4.7,
      overallRating: 4.6,
      features: ["Air Conditioning", "4 Seats", "2 Luggage", "Music System", "Charging Ports"]
    }
  },
  {
    name: "Etios",
    type: "Sedan",
    rate: "₹14/km",
    nightCharges: "Rs 600",
    ac: true,
    image: "https://cuyomotor.com.ar/wp-content/uploads/2023/06/Toyota-Etios-hatch-XLS.jpg",
    specs: {
      description: "Reliable and spacious sedan with excellent comfort for long journeys.",
      safety: 4.6,
      cleanliness: 4.7,
      driverSkill: 4.8,
      overallRating: 4.7,
      features: ["Air Conditioning", "5 Seats", "2 Luggage", "Music System", "Charging Ports"]
    }
  },
  {
    name: "Ertiga",
    type: "MUVs",
    rate: "₹15/km",
    nightCharges: "Rs 600",
    ac: true,
    image: "https://th.bing.com/th/id/OIP.WmpZMNmbuUE1SFxuBav2wgHaEK?rs=1&pid=ImgDetMain",
    specs: {
      description: "Versatile MUV perfect for family trips and group travel.",
      safety: 4.7,
      cleanliness: 4.8,
      driverSkill: 4.6,
      overallRating: 4.7,
      features: ["Air Conditioning", "7 Seats", "3 Luggage", "Music System", "Charging Ports"]
    }
  },
  {
    name: "Innova",
    type: "MUVs",
    rate: "₹17/km",
    nightCharges: "Rs 600",
    ac: true,
    image: "https://img.philkotse.com/crop/643x362/2020/12/09/f3xu3v8D/innova-red-mica-metallic-4da2.png",
    specs: {
      description: "Premium MUV with superior comfort and reliability for long journeys.",
      safety: 4.8,
      cleanliness: 4.7,
      driverSkill: 4.8,
      overallRating: 4.8,
      features: ["Air Conditioning", "7 Seats", "4 Luggage", "Music System", "Charging Ports"]
    }
  },
  {
    name: "Innova Crysta",
    type: "MUVs",
    rate: "₹20/km",
    nightCharges: "Rs 600",
    ac: true,
    image: "https://www.pngitem.com/pimgs/m/692-6925190_toyota-innova-crysta-hd-png-download.png",
    specs: {
      description: "Luxury MUV with premium features and exceptional comfort.",
      safety: 4.9,
      cleanliness: 4.8,
      driverSkill: 4.9,
      overallRating: 4.9,
      features: ["Air Conditioning", "7 Seats", "4 Luggage", "Music System", "Charging Ports", "Premium Interior"]
    }
  },
  {
    name: "Fortuner",
    type: "SUV",
    rate: "₹22/km",
    nightCharges: "Rs 600",
    ac: true,
    image: "https://i.pinimg.com/736x/70/3c/73/703c733d7e0bd3f04caebbfe9d50f115.jpg",
    specs: {
      description: "Spacious SUV with excellent ground clearance for hill stations and rough terrain.",
      safety: 4.7,
      cleanliness: 4.5,
      driverSkill: 4.4,
      overallRating: 4.6,
      features: ["Air Conditioning", "6 Seats", "3 Luggage", "Music System", "Charging Ports"]
    }
  }
];

const TaxiTypeSelector: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<CarSpecs | null>(null);

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCallClick={handleCall} onWhatsAppClick={handleWhatsApp} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Our Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <React.Fragment key={car.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{car.name}</h3>
                    <p className="text-base font-semibold">{car.rate} Starting</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {car.type}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Night: {car.nightCharges}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Snowflake className="h-4 w-4 text-primary-500" />
                    <span className="text-xs text-gray-600">Air Conditioning</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-primary-600 hover:text-primary-700 text-xs py-1"
                    onClick={() => setSelectedCar(selectedCar?.name === car.name ? null : car)}
                  >
                    <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${selectedCar?.name === car.name ? 'rotate-180' : ''}`} />
                    View Details
                  </Button>
                </div>
              </motion.div>

              {selectedCar?.name === car.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="col-span-full bg-white rounded-xl shadow-md overflow-hidden"
                  style={{
                    gridColumn: `span ${window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1}`,
                    marginTop: '1.5rem'
                  }}
                >
                  <div className="p-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative h-[300px] rounded-lg overflow-hidden">
                        <img
                          src={selectedCar.image}
                          alt={selectedCar.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-4 ">
                        <h3 className="text-2xl font-bold">{selectedCar.name}</h3>
                        <p className="text-gray-600">{selectedCar.specs.description}</p>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-sm mb-1">Safety</h4>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{selectedCar.specs.safety}/5</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-sm mb-1">Cleanliness</h4>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{selectedCar.specs.cleanliness}/5</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-sm mb-1">Driver Skill</h4>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{selectedCar.specs.driverSkill}/5</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-sm mb-1">Overall Rating</h4>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{selectedCar.specs.overallRating}/5</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Features</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedCar.specs.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg text-sm">
                                {feature.includes("Air Conditioning") && <Snowflake className="h-4 w-4 text-primary-500" />}
                                {feature.includes("Seats") && <Users className="h-4 w-4 text-primary-500" />}
                                {feature.includes("Luggage") && <Briefcase className="h-4 w-4 text-primary-500" />}
                                {feature.includes("Music System") && <Music className="h-4 w-4 text-primary-500" />}
                                {feature.includes("Charging Ports") && <Zap className="h-4 w-4 text-primary-500" />}
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button 
                            onClick={handleCall}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call us
                          </Button>
                          <Button 
                            onClick={handleWhatsApp}
                            className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm py-1"
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Whatsapp
                          </Button>
                        </div>
                      </div>
                 
                    </div>
                  </div>
                       
       
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default TaxiTypeSelector;
