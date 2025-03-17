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
      duration: "6 days",
      image: "https://images.unsplash.com/photo-1586183189334-1095f90aee92?q=80&w=1470&auto=format&fit=crop",
      location: "Kashmir Valley",
    },
    {
      id: "2",
      title: "Shimla Manali Trip",
      description: "Explore the hills and snow-covered landscapes of Himachal",
      price: 18999,
      duration: "5 days",
      image: "https://images.unsplash.com/photo-1626621342581-ebc3188b9554?q=80&w=1470&auto=format&fit=crop",
      location: "Himachal Pradesh",
    },
    {
      id: "3",
      title: "Golden Triangle Tour",
      description: "Discover the cultural heritage of Delhi, Agra, and Jaipur",
      price: 15999,
      duration: "7 days",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1476&auto=format&fit=crop",
      location: "Delhi, Agra, Jaipur",
    },
    {
      id: "4",
      title: "Leh Ladakh Expedition",
      description: "Adventure through the breathtaking landscapes of Ladakh",
      price: 29999,
      duration: "8 days",
      image: "https://images.unsplash.com/photo-1590077428593-a33c3fb77925?q=80&w=1374&auto=format&fit=crop",
      location: "Leh Ladakh",
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
              isPopular={pkg.id === "1"}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
