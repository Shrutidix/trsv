import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Car, CarTaxiFront, Truck, Bus } from "lucide-react";

interface TaxiTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const taxiTypes = [
  {
    id: "sedan",
    name: "Sedan",
    icon: <Car className="h-6 w-6" />,
    description: "Comfortable car for up to 4 passengers",
    priceRange: "₹10-15/km",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "suv",
    name: "SUV",
    icon: <Truck className="h-6 w-6" />,
    description: "Spacious vehicle for up to 6 passengers",
    priceRange: "₹15-20/km",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1631&auto=format&fit=crop"
  },
  {
    id: "luxury",
    name: "Premium",
    icon: <CarTaxiFront className="h-6 w-6" />,
    description: "Luxury travel with premium amenities",
    priceRange: "₹25-30/km",
    image: "https://images.unsplash.com/photo-1585503418537-88331351ad99?q=80&w=1074&auto=format&fit=crop"
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    icon: <Bus className="h-6 w-6" />,
    description: "Group travel for up to 12 passengers",
    priceRange: "₹30-40/km",
    image: "https://th.bing.com/th/id/OIP.zIxpcrfkGWQB4-OxnhpdtAAAAA?rs=1&pid=ImgDetMain"
  }
];

const TaxiTypeSelector: React.FC<TaxiTypeSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {taxiTypes.map((type) => (
        <motion.div
          key={type.id}
          whileHover={{ y: -5 }}
          className={cn(
            "relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-300",
            selectedType === type.id 
              ? "border-primary-500 shadow-lg" 
              : "border-gray-200 hover:border-primary-300 hover:shadow-sm"
          )}
          onClick={() => onSelectType(type.id)}
        >
          {/* Real taxi image */}
          <div className="h-40 overflow-hidden">
            <img 
              src={type.image} 
              alt={type.name}
              className="w-full h-full object-cover"
            />
            {selectedType === type.id && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-primary-500/20 border-4 border-primary-500"
              />
            )}
          </div>
          
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className={cn(
                "p-2 rounded-full mr-2",
                selectedType === type.id ? "bg-primary-100 text-primary-500" : "bg-gray-100 text-gray-500"
              )}>
                {type.icon}
              </span>
              <h3 className="text-lg font-semibold">{type.name}</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{type.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                {type.priceRange}
              </span>
              
              {selectedType === type.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  Selected
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaxiTypeSelector;
