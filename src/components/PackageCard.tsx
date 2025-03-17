import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Car, Hotel, MapPin, Star, Mountain } from 'lucide-react';

export interface PackageCardProps {
  id?: string;
  title: string;
  name?: string;
  description: string;
  image: string;
  location: string;
  destination?: string;
  duration: string;
  price: number;
  rating?: number;
  features?: string[];
  isPopular?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  id,
  title,
  name,
  description,
  image,
  location,
  destination,
  duration,
  price,
  rating = 4.5,
  features = ["Meals", "Transport"],
  isPopular = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const displayName = name || title;
  const displayDestination = destination || location;

  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <Card className="overflow-hidden border-0 shadow-lg transition-all duration-200 hover:shadow-xl rounded-xl">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        {imageError ? (
          <div className="w-full h-full bg-primary-100 flex items-center justify-center">
            <Mountain className="h-16 w-16 text-primary-300" />
          </div>
        ) : (
          <img
            src={image}
            alt={displayName}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            onError={handleImageError}
          />
        )}
        {isPopular && (
          <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary-600">
            Popular
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center">
            <div className="bg-yellow-400 rounded-md p-1 flex items-center text-sm font-bold mr-2">
              <Star className="h-3 w-3 fill-current mr-1" />
              {rating}
            </div>
            <span className="text-white text-sm">{features.join(" • ")}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-primary-800">{displayName}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1 text-primary-400" />
          <span>{displayDestination}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-3.5 w-3.5 mr-1 text-primary-400" />
            <span>{duration}</span>
          </div>
          <div className="text-primary-600 font-bold">
            ₹{price.toLocaleString()} <span className="text-xs font-normal text-gray-500">per person</span>
          </div>
        </div>
        
        <Link to={`/packages/${id || '1'}`}>
          <Button className="w-full bg-primary hover:bg-primary-600 rounded-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
