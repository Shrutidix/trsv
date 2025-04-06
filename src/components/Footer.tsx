import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-primary-300" />
                <span className="font-bold text-xl">Uttarakhand Road Trip</span>
              </div>
              <p className="text-gray-400 mb-4">Your trusted partner for unforgettable adventures across North India. Explore the majestic Himalayas with our expert guides and comfortable transportation.</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/" className="text-primary-300 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/uttarakhandroadtrip/" className="text-primary-300 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://x.com/?lang=en-in" className="text-primary-300 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/gallery" className="text-gray-400 hover:text-primary-300 transition-colors">Gallery</Link></li>
                <li><Link to="/destinations" className="text-gray-400 hover:text-primary-300 transition-colors">Destinations</Link></li>
                <li><Link to="/routes" className="text-gray-400 hover:text-primary-300 transition-colors">Routes</Link></li>
                <li><Link to="/taxi" className="text-gray-400 hover:text-primary-300 transition-colors">Taxi Services</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-primary-300 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-primary-300 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
              <ul className="space-y-2">
                <li><Link to="/destinations/shimla" className="text-gray-400 hover:text-primary-300 transition-colors">Shimla</Link></li>
                <li><Link to="/destinations/manali" className="text-gray-400 hover:text-primary-300 transition-colors">Manali</Link></li>
                <li><Link to="/destinations/dharamshala" className="text-gray-400 hover:text-primary-300 transition-colors">Dharamshala</Link></li>
                <li><Link to="/destinations/nainital" className="text-gray-400 hover:text-primary-300 transition-colors">Nainital</Link></li>
                <li><Link to="/destinations/rishikesh" className="text-gray-400 hover:text-primary-300 transition-colors">Rishikesh</Link></li>
                <li><Link to="/destinations/ladakh" className="text-gray-400 hover:text-primary-300 transition-colors">Ladakh</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-300 mt-0.5" />
                  <span className="text-gray-400">Dehradun near isbt mdda calony mig12c</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-300" />
                  <span className="text-gray-400">+91 8077757674</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary-300" />
                  <span className="text-gray-400">uttrakhandroadtrip@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 Dehradun . All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/terms" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">Terms & Conditions</Link>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
    {/* Call Button with Vibration & Glow Effect */}
    <div className="relative">
        {/* Ripple Effect */}
        <span className="absolute w-[60px] h-[60px] bg-red-500/50 rounded-full animate-pulse"></span>

        {/* Call Button with Vibration */}
        <a 
          href="tel:+91 8077757674" 
          className="flex items-center justify-center w-[50px] h-[50px] bg-red-500 text-white rounded-full shadow-lg animate-vibrate relative"
        >
            <FaPhoneAlt size={20} />
        </a>
    </div>

    {/* WhatsApp Button */}
    <a 
      href="https://wa.me/918077757674" 
      className="flex items-center justify-center w-[50px] h-[50px] bg-green-600 text-white rounded-full shadow-lg"
    >
        <FaWhatsapp size={20} />
    </a>
</div>



    </>
  );
};

export default Footer;
