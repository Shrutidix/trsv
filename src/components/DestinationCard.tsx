import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Mountain } from 'lucide-react';

interface DestinationCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  name,
  image,
  location,
  description,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg transition-all duration-200 hover:shadow-xl rounded-xl">
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        {imageError ? (
          <div className="w-full h-full bg-primary-100 flex items-center justify-center">
            <Mountain className="h-16 w-16 text-primary-300" />
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            onError={handleImageError}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{name}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link to={`/destinations/${id}`}>
          <Button className="w-full bg-primary hover:bg-primary-600 rounded-full">
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
