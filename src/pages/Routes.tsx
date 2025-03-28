import React, { useState } from 'react';
import { MapPin, Car, Clock, Navigation, Camera, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import RouteMap from '@/components/RouteMap';
import { popularRoutes } from '@/data/routes';
import type { Route } from '@/data/routes';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const RoutesPage = () => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Our Popular Routes from Dehradun</h1>
          <p className="text-base max-w-2xl mx-auto">
            Explore our most popular taxi routes from Dehradun to various destinations across Uttarakhand and beyond. Choose from our fleet of comfortable vehicles and experienced drivers.
          </p>
        </motion.div>
      </section>
      <div className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRoutes.map((route) => (
              <div 
                key={route.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={route.image} 
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{route.from} to {route.to}</h3>
                    <p className="text-sm opacity-90">Starting from ₹{route.basePrice}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Navigation className="h-4 w-4" />
                      <span>{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{route.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {route.description}
                  </p>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedRoute(route);
                        setIsDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to={`/?from=${route.from}&to=${route.to}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedRoute && (
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>
                  {selectedRoute.from} to {selectedRoute.to} Taxi Service
                </DialogTitle>
              </DialogHeader>

              <div className="overflow-y-auto max-h-[calc(90vh-120px)] pr-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                    <TabsTrigger value="stops">Stops & Route</TabsTrigger>
                    <TabsTrigger value="attractions">Attractions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4">
                    <div className="prose max-w-none">
                      <p>{selectedRoute.description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Navigation className="h-5 w-5 text-primary-500" />
                          <span>Distance: {selectedRoute.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary-500" />
                          <span>Duration: {selectedRoute.duration}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="vehicles" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedRoute.vehicles.map((vehicle) => (
                        <div key={vehicle.type} className="bg-gray-50 rounded-lg p-4">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.type}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <h4 className="font-semibold">{vehicle.type}</h4>
                          <p className="text-sm text-gray-600">{vehicle.capacity}</p>
                          <p className="text-lg font-semibold mt-2">₹{vehicle.price}</p>
                          <Button className="w-full mt-4">Select</Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="stops" className="mt-4">
                    <div className="space-y-6">
                      <div className="h-[300px] max-w-full">
                        <RouteMap stops={selectedRoute.stops} className="mb-6 h-full w-full" />
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200" />
                        <div className="space-y-6">
                          {selectedRoute.stops.map((stop, index) => (
                            <div key={stop.name} className="relative pl-8">
                              <div className="absolute left-3 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500" />
                              <h4 className="font-semibold">{stop.name}</h4>
                              {stop.description && (
                                <p className="text-sm text-gray-600">{stop.description}</p>
                              )}
                              {index < selectedRoute.stops.length - 1 && (
                                <p className="text-sm text-gray-600 mt-1">
                                  Next stop: {selectedRoute.stops[index + 1].name}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="attractions" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedRoute.attractions.map((attraction) => (
                        <div key={attraction.name} className="bg-gray-50 rounded-lg overflow-hidden">
                          <img 
                            src={attraction.image} 
                            alt={attraction.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-semibold mb-2">{attraction.name}</h4>
                            <p className="text-sm text-gray-600">{attraction.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default RoutesPage; 