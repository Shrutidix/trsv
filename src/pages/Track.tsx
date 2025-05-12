import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Track = () => {
  const { toast } = useToast();

  // Password protection
  const [access, setAccess] = useState(() => sessionStorage.getItem('trackAccess') === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'A800900') {
      setAccess(true);
      sessionStorage.setItem('trackAccess', 'true');
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  if (!access) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <form onSubmit={handlePasswordSubmit} className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-xs">
          <h2 className="text-xl font-bold text-center">Enter Password to Access</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded px-4 py-2 text-lg"
            placeholder="Password"
            autoFocus
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button type="submit" className="bg-primary-600 text-white rounded px-4 py-2 font-semibold hover:bg-primary-700 transition">Access</button>
        </form>
      </div>
    );
  }

  const handleMapClick = () => {
    window.open('https://www.google.com/maps', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Manage Your Booking</h1>
          <p className="text-base max-w-2xl mx-auto">
            Track your booking status, share your experience, or add photos from your trip
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">What would you like to do?</CardTitle>
              <CardDescription className="text-center">
                Choose an option below to manage your booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button 
                  onClick={handleMapClick}
                  className="h-16 text-lg" 
                  variant="outline"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Track Booking Status
                </Button>
                
                <Button asChild className="h-16 text-lg" variant="outline">
                  <Link to="/track/photos" className="flex items-center justify-center gap-2">
                    <Camera className="h-5 w-5" />
                    Add Trip Photos
                  </Link>
                </Button>
                
                <Button asChild className="h-16 text-lg" variant="outline">
                  <Link to="/track/review" className="flex items-center justify-center gap-2">
                    <Star className="h-5 w-5" />
                    Write a Review
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Track; 