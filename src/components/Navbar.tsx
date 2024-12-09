import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { NavLink } from './navigation/NavLink';
import { AuthButtons } from './navigation/AuthButtons';
import { MobileMenu } from './navigation/MobileMenu';
import { useBreakpoint } from './navigation/useBreakpoint';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useBreakpoint('(max-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed w-full z-50 transition-all duration-200 ${
    isMobile || isScrolled 
      ? 'bg-white shadow-sm' 
      : 'bg-white/80 backdrop-blur-md'
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://i.imgur.com/4vkOF6D.png" 
                alt="EcoSense Logo"
                className="h-10 w-10 object-contain"
                loading="eager"
              />
              <span className="text-xl font-bold text-gray-900">EcoSense</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/air-quality">
              Air Quality
            </NavLink>
            <NavLink to="/about">
              About
            </NavLink>
            <NavLink to="/features">
              Features
            </NavLink>
            <NavLink to="/team">
              Our Team
            </NavLink>
            <AuthButtons />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-600 hover:text-gray-900 p-2"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
}