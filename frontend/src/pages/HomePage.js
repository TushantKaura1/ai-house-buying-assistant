import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import smartFilterService from '../services/smartFilter';
import { formatPrice } from '../utils/formatters';

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = () => {
    try {
      setIsLoading(true);
      
      // Load featured properties
      const featured = smartFilterService.getFeaturedProperties(6);
      setFeaturedProperties(featured);
      
      // Load statistics
      const statistics = smartFilterService.getStats();
      setStats(statistics);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading home data:', error);
      // Set default data if there's an error
      setFeaturedProperties([]);
      setStats(null);
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setShowResults(true);
    
    try {
      const results = await smartFilterService.processQuery(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({ properties: [], error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFilter = (filterType, value) => {
    let query = '';
    switch (filterType) {
      case 'category':
        query = `${value} properties`;
        break;
      case 'type':
        query = `${value} for sale`;
        break;
      case 'price':
        query = `properties under ${value}`;
        break;
      default:
        query = value;
    }
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchResults(null);
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your dream home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Dream Home with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AI-Powered Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover the perfect property using natural language. Our AI understands your needs and finds homes that match your lifestyle.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} suggestions={smartFilterService.getSearchSuggestions()} />
            </div>

            {/* Quick Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.totalProperties}</div>
                  <div className="text-blue-200 text-sm">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.avgPrice}</div>
                  <div className="text-blue-200 text-sm">Avg Price</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.locations}</div>
                  <div className="text-blue-200 text-sm">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.types}</div>
                  <div className="text-blue-200 text-sm">Property Types</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {showResults && searchResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h2>
              <p className="text-gray-600">
                Found {searchResults.totalCount} property{searchResults.totalCount !== 1 ? 'ies' : 'y'} for your search
              </p>
            </div>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Search
            </button>
          </div>

          {/* AI Response Indicator */}
          {searchResults.source === 'chatgpt' && (
            <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 text-2xl">🤖</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-green-800">AI-Powered Search</h4>
                  <p className="text-green-600">Powered by ChatGPT</p>
                </div>
              </div>
              {searchResults.explanation && (
                <p className="text-green-700 text-lg mb-4">
                  <strong>AI Understanding:</strong> {searchResults.explanation}
                </p>
              )}
              {searchResults.suggestions && searchResults.suggestions.length > 0 && (
                <div>
                  <p className="text-green-700 text-lg mb-3">
                    <strong>Try These Searches:</strong>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {searchResults.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors border border-green-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* Featured Properties Section */}
      {!showResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional properties that offer the perfect blend of location, amenities, and value.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              to="/search"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              View All Properties
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Quick Filters Section */}
      {!showResults && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Quick Filters
              </h2>
              <p className="text-xl text-gray-600">
                Find properties that match your preferences instantly
              </p>
            </div>

            {/* Category Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Property Types */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Types</h3>
                <div className="space-y-3">
                  {['house', 'condo', 'land'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleQuickFilter('type', type)}
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-200 hover:border-blue-300"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Price Ranges</h3>
                <div className="space-y-3">
                  {['$300k', '$500k', '$750k', '$1M+'].map(price => (
                    <button
                      key={price}
                      onClick={() => handleQuickFilter('price', price)}
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors border border-gray-200 hover:border-green-300"
                    >
                      Under {price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {['luxury', 'family', 'investment', 'retirement'].map(category => (
                    <button
                      key={category}
                      onClick={() => handleQuickFilter('category', category)}
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors border border-gray-200 hover:border-purple-300"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      {!showResults && (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose AI House Assistant?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of real estate search with cutting-edge AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Search</h3>
                <p className="text-gray-600">
                  Use natural language to describe your dream home. Our AI understands context and finds perfect matches.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Results</h3>
                <p className="text-gray-600">
                  Get intelligent property recommendations in seconds, not hours of manual searching.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Matching</h3>
                <p className="text-gray-600">
                  Our AI considers your lifestyle, preferences, and budget to find properties that truly fit your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
