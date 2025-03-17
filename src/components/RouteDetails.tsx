import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MapPin, Car, Clock, Camera, Info, Map } from 'lucide-react';

interface RouteDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  route: {
    from: string;
    to: string;
    distance: string;
    duration: number;
    description: string;
    stops: string[];
    attractions: string[];
    vehicles: {
      [key: string]: {
        price: number;
        description: string;
      };
    };
  };
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ isOpen, onClose, route }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('sedan');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {route.from} to {route.to}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 gap-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Info className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" /> Route Map
            </TabsTrigger>
            <TabsTrigger value="stops" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Stops
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Camera className="h-4 w-4" /> Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-primary-700 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Duration</span>
                </div>
                <p className="text-lg">{route.duration} hours</p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-primary-700 mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Distance</span>
                </div>
                <p className="text-lg">{route.distance} km</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Vehicles</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(route.vehicles).map(([type, details]) => (
                  <div
                    key={type}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedVehicle === type
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedVehicle(type)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{type}</span>
                      <span className="text-primary-600 font-bold">₹{details.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">{details.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Attractions</h3>
              <div className="grid grid-cols-2 gap-4">
                {route.attractions.map((attraction, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <span>{attraction}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="h-[400px]">
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              {/* Add your map component here */}
              <p className="text-gray-500">Interactive map will be integrated here</p>
            </div>
          </TabsContent>

          <TabsContent value="stops" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Route Stops</h3>
              <div className="relative">
                {route.stops.map((stop, index) => (
                  <div key={index} className="flex items-start gap-4 mb-8">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">{index + 1}</span>
                      </div>
                      {index < route.stops.length - 1 && (
                        <div className="absolute top-8 left-4 w-0.5 h-12 bg-primary-200" />
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">{stop}</h4>
                      <p className="text-sm text-gray-600">
                        Estimated time: {Math.round(route.duration / route.stops.length)} hours
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Add your gallery images here */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-primary text-white">
            Book Now - ₹{route.vehicles[selectedVehicle].price}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetails; 