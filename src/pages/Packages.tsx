import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageBookingForm from "@/components/PackageBookingForm";
import PackageCard from "@/components/PackageCard";

const Packages = () => {
  const packages = [
    {
      id: "1",
      title: "Kashmir Adventure",
      description: "Experience the natural beauty of Kashmir valleys and lakes",
      price: 24999,
      duration: "6 Days / 5 Nights",
      image: "https://images.unsplash.com/photo-1586183189334-1095f90aee92?q=80&w=1470&auto=format&fit=crop",
      location: "Kashmir Valley",
      rating: 4.8,
      features: ["Hotel", "Meals", "Transport", "Guide"],
      isPopular: true
    },
    {
      id: "2",
      title: "Shimla Manali Trip",
      description: "Explore the hills and snow-covered landscapes of Himachal",
      price: 18999,
      duration: "5 Days / 4 Nights",
      image: "https://images.unsplash.com/photo-1626621342581-ebc3188b9554?q=80&w=1470&auto=format&fit=crop",
      location: "Himachal Pradesh",
      rating: 4.7,
      features: ["Hotel", "Transport", "Sightseeing"],
      isPopular: false
    },
    {
      id: "3",
      title: "Golden Triangle Tour",
      description: "Discover the cultural heritage of Delhi, Agra, and Jaipur",
      price: 15999,
      duration: "7 Days / 6 Nights",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1476&auto=format&fit=crop",
      location: "Delhi, Agra, Jaipur",
      rating: 4.6,
      features: ["Hotel", "Transport", "Guide", "Entrance Fees"],
      isPopular: true
    },
    {
      id: "4",
      title: "Leh Ladakh Expedition",
      description: "Adventure through the breathtaking landscapes of Ladakh",
      price: 29999,
      duration: "8 Days / 7 Nights",
      image: "https://images.unsplash.com/photo-1590077428593-a33c3fb77925?q=80&w=1374&auto=format&fit=crop",
      location: "Leh Ladakh",
      rating: 4.9,
      features: ["Hotel", "Transport", "Oxygen Support", "Adventure Activities"],
      isPopular: false
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="relative bg-gradient-to-b from-primary-500 to-primary-600 py-20">
        <div className="absolute inset-0 opacity-20 bg-mountain-pattern bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover North India Tour Packages</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore curated packages for unforgettable adventures in the Himalayas and beyond
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <PackageBookingForm />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Tour Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              duration={pkg.duration}
              image={pkg.image}
              location={pkg.location}
              rating={pkg.rating}
              features={pkg.features}
              isPopular={pkg.isPopular}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
