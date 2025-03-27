import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './Logo';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Routes', path: '/routes' },
    { name: 'Taxi Services', path: '/taxi' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row gap-5 md:gap-8">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link 
            to={item.path} 
            className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-50 py-2 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <a href="tel:+1234567890" className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-500">
                <Phone className="h-4 w-4" />
                <span>+91 8077757674</span>
              </a>
              <a href="mailto:info@himalayajoy.com" className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-primary-500">
                <Mail className="h-4 w-4" />
                <span>uttrakhandroadtrip@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-500">
                <MapPin className="h-4 w-4" />
                <span>Track Booking</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center justify-between flex-1 pl-8">
              <NavLinks />
              <Button asChild>
                <Link to="/contact">Book Now</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
