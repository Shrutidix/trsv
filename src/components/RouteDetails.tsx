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
      <DialogContent className="max-w-4xl w-full p-6 sm:p-8 md:p-10 lg:p-12">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center sm:text-left">
            {route.from} to {route.to}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[500px] sm:h-auto">
          <Tabs defaultValue="overview" className="w-full flex flex-col h-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sticky top-0 bg-white z-10 p-2">
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

            <div className="overflow-y-auto flex-grow p-2">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <span className="text-primary-600 font-bold">
                            ₹{details.price} <span className="text-sm text-gray-500">(Negotiable)</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{details.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 pt-6 border-t gap-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Close</Button>
          <Button className="bg-primary text-white w-full sm:w-auto">
            Book Now - ₹{route.vehicles[selectedVehicle].price}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetails;
