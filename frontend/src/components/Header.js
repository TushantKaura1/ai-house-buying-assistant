import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 text-realtor-600 hover:text-realtor-700 transition-colors duration-200"
            >
              <div className="text-2xl">🏠</div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">{config.app.name}</h1>
                <p className="text-xs text-gray-500">AI-Powered Search</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-realtor-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-gray-700 hover:text-realtor-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Search
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-realtor-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-realtor-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn-primary">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-realtor-600 focus:outline-none focus:text-realtor-600"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-realtor-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-realtor-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Search
              </Link>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-realtor-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-realtor-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4">
                <button className="w-full btn-primary">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
