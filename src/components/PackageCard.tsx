import React from "react";

export interface PackageCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  features: string[];
  isPopular?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  title,
  description,
  image,
  location,
  duration,
  price,
  rating,
  features,
  isPopular
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {isPopular && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </div>
        )}
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{location}</p>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
        
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm font-medium">{rating}</span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-xs">{duration}</p>
            <p className="text-primary-600 font-bold">₹{price.toLocaleString()}</p>
          </div>
         {/* <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-sm">
            View Details
          </button>*/}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
