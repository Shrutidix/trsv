import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary-300" />
              <span className="font-bold text-xl">HimalayaJoy</span>
            </div>
            <p className="text-gray-400 mb-4">Your trusted partner for unforgettable adventures across North India. Explore the majestic Himalayas with our expert guides and comfortable transportation.</p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-300 transition-colors">Home</Link></li>
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
                <span className="text-gray-400">123 Mall Road, Shimla, Himachal Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-300" />
                <span className="text-gray-400">+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-300" />
                <span className="text-gray-400">info@himalayajoy.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 HimalayaJoy. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">Terms & Conditions</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
