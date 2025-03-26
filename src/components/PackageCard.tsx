import React from "react";
import { PackageCard, PackageCardProps } from "./PackageCard";

const tourPackages: PackageCardProps[] = [
  {
    id: "1",
    title: "Manali Adventure Trip",
    description: "Enjoy the scenic beauty and adventure sports in Manali.",
    image: "/images/manali.jpg",
    location: "Manali, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    price: 14999,
    rating: 4.7,
    features: ["Meals", "Transport", "Hotel Stay"],
    isPopular: true,
  },
  {
    id: "2",
    title: "Jaipur Royal Tour",
    description: "Experience the royal heritage and vibrant culture of Jaipur.",
    image: "/images/jaipur.jpg",
    location: "Jaipur, Rajasthan",
    duration: "3 Days / 2 Nights",
    price: 9999,
    rating: 4.5,
    features: ["Guide", "Meals", "Hotel Stay"],
  },
];

const carPackages: PackageCardProps[] = [
  {
    id: "3",
    title: "SUV Rental for Uttarakhand",
    description: "Spacious and comfortable SUVs for your Uttarakhand journey.",
    image: "/images/suv.jpg",
    location: "Dehradun, Uttarakhand",
    duration: "Per Day Basis",
    price: 3500,
    rating: 4.8,
    features: ["Driver", "AC", "Fuel Included"],
  },
  {
    id: "4",
    title: "Luxury Sedan for City Tour",
    description: "Explore the city in comfort and style with our luxury sedan.",
    image: "/images/sedan.jpg",
    location: "Delhi NCR",
    duration: "Per Day Basis",
    price: 4500,
    rating: 4.6,
    features: ["Chauffeur", "AC", "Music System"],
  },
];

const PackagesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-primary-800 mb-6">
        Tour & Travel Packages
      </h1>

      <h2 className="text-2xl font-semibold text-primary-700 mb-4">Tour Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tourPackages.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-primary-700 mt-10 mb-4">Car Rental Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carPackages.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>
    </div>
  );
};

export default PackagesPage;
