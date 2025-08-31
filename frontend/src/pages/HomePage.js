import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { apiService } from '../services/api';
import config from '../config';

const HomePage = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadFeaturedListings();
    loadStats();
  }, []);

  const loadFeaturedListings = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getListings(6); // Get 6 featured listings
      if (response.success) {
        setFeaturedListings(response.data.listings);
      }
    } catch (error) {
      console.error('Error loading featured listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await apiService.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSearch = (query, filters) => {
    console.log('Search initiated:', { query, filters });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-realtor-600 via-realtor-700 to-realtor-800 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow">
            Find Your Dream Property
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-realtor-100 max-w-3xl mx-auto">
            Use AI-powered natural language search to discover houses, condos, and land 
            that match your exact criteria. No more complex filters!
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-realtor-600 mb-2">
                  {stats.total_listings}
                </div>
                <div className="text-gray-600">Total Properties</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.by_type.houses}
                </div>
                <div className="text-gray-600">Houses</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.by_type.condos}
                </div>
                <div className="text-gray-600">Condos</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {stats.by_type.land}
                </div>
                <div className="text-gray-600">Land</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover some of our most popular listings across Nova Scotia
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/search" className="btn-outline text-lg px-8 py-3">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How AI-Powered Search Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent system understands natural language and finds exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-realtor-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Ask Naturally</h3>
              <p className="text-gray-600">
                Type your request in plain English, just like talking to a real estate agent
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-realtor-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">
                Our AI understands your preferences and converts them to smart filters
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-realtor-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Perfect Matches</h3>
              <p className="text-gray-600">
                Get personalized results that match your exact criteria and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Examples */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try These Search Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how easy it is to find properties with natural language
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.defaultSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-realtor-500 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-realtor-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-realtor-100 mb-8">
            Start searching with natural language and let AI find the perfect match for you
          </p>
          <Link to="/search" className="bg-white text-realtor-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
            Start Searching Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
