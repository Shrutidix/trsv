import React, { useState, useEffect } from 'react';
import TaxiBookingForm from './TaxiBookingForm';
import { Car } from 'lucide-react';

const SearchTabs = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState('sedan');
  const [passengerCount, setPassengerCount] = useState('1-3');

  // Update vehicle type based on passenger count
  useEffect(() => {
    switch (passengerCount) {
      case '1-3':
        setSelectedVehicleType('sedan');
        break;
      case '4-6':
        setSelectedVehicleType('suv');
        break;
      case '7-12':
        setSelectedVehicleType('tempo');
        break;
      case '13+':
        setSelectedVehicleType('bus');
        break;
      default:
        setSelectedVehicleType('sedan');
    }
  }, [passengerCount]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary-600 text-white px-6 py-3 rounded-full flex items-center font-semibold text-lg">
          <Car className="w-5 h-5 mr-2" />
          Book Your Taxi
        </div>
      </div>
      
      <TaxiBookingForm 
        vehicleType={selectedVehicleType}
        onPassengerCountChange={setPassengerCount}
        passengerCount={passengerCount}
      />
    </div>
  );
};

export default SearchTabs;
