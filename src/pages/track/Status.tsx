import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Status = () => {
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to fetch booking details
    toast({
      title: "Tracking Information",
      description: "Your booking details will be displayed here.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Track Your Booking</h1>
          <p className="text-base max-w-2xl mx-auto">
            Enter your booking details to check the status of your reservation
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Enter Booking Details</CardTitle>
              <CardDescription className="text-center">
                Please provide your booking ID and email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="bookingId" className="text-sm font-medium">
                    Booking ID
                  </label>
                  <Input
                    id="bookingId"
                    type="text"
                    placeholder="Enter your booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Track Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Status; 