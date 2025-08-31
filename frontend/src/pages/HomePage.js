import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import smartFilterService from '../services/smartFilter';
import config from '../config';
import { formatPrice, formatNumber } from '../utils/formatters';

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = () => {
    try {
      setLoading(true);
      
      // Load featured properties
      const featured = smartFilterService.getFeaturedProperties(6);
      setFeaturedProperties(featured);
      
      // Load statistics
      const statistics = smartFilterService.getStats();
      setStats(statistics);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading home data:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      setShowSearchResults(false);
      return;
    }

    try {
      setLoading(true);
      const results = await smartFilterService.processQuery(query);
      setSearchResults(results);
      setShowSearchResults(true);
      setLoading(false);
    } catch (error) {
      console.error('Error processing search:', error);
      setLoading(false);
    }
  };

  const handleQuickFilter = (filterType, value) => {
    let results = null;
    
    switch (filterType) {
      case 'type':
        results = smartFilterService.getPropertiesByType(value, 12);
        break;
      case 'category':
        results = smartFilterService.getPropertiesByCategory(value, 12);
        break;
      case 'price':
        results = smartFilterService.getPropertiesByPriceRange(value[0], value[1], 12);
        break;
      default:
        results = smartFilterService.getFeaturedProperties(12);
    }

    setSearchResults({
      properties: results,
      filters: { [filterType]: value },
      totalCount: results.length,
      query: `Filtered by ${filterType}: ${value}`
    });
    setShowSearchResults(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amazing properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Dream Property with AI
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover the perfect home, condo, or land using natural language search. 
              Our AI understands what you're looking for.
            </p>
            
            {/* Smart Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Try: 'affordable condos in Halifax under $500,000'"
                suggestions={config.defaultSuggestions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Property Type Filters */}
            <div className="flex gap-2">
              {config.propertyTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleQuickFilter('type', type.id === 'all' ? null : type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    type.id === 'all' 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex gap-2">
              {config.propertyCategories.slice(0, 6).map(category => (
                <button
                  key={category.id}
                  onClick={() => handleQuickFilter('category', category.id === 'all' ? null : category.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>

            {/* Price Range Filters */}
            <div className="flex gap-2">
              {config.priceRanges.slice(0, 3).map((range, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickFilter('price', range.value)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Results or Featured Properties */}
      {showSearchResults && searchResults ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <p className="text-gray-600">
                Found {searchResults.totalCount} properties for "{searchResults.query}"
              </p>
            </div>
            <button
              onClick={() => {
                setShowSearchResults(false);
                setSearchResults(null);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Featured
            </button>
          </div>

          {searchResults.properties.length > 0 ? (
            <div>
              {/* AI Response Indicator */}
              {searchResults.source === 'chatgpt' && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-lg">🤖</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">AI-Powered Search</h4>
                      <p className="text-sm text-green-600">Powered by ChatGPT</p>
                    </div>
                  </div>
                  {searchResults.explanation && (
                    <p className="text-green-700 text-sm mb-2">
                      <strong>AI Understanding:</strong> {searchResults.explanation}
                    </p>
                  )}
                  {searchResults.suggestions && searchResults.suggestions.length > 0 && (
                    <div>
                      <p className="text-green-700 text-sm mb-2">
                        <strong>AI Suggestions:</strong>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(suggestion)}
                            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse our featured properties below.
              </p>
              <button
                onClick={() => {
                  setShowSearchResults(false);
                  setSearchResults(null);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Featured Properties
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Statistics Section */}
          {stats && (
            <div className="bg-white py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                  Market Overview
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatNumber(stats.total)}
                    </div>
                    <div className="text-gray-600">Total Properties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {formatPrice(stats.averagePrice)}
                    </div>
                    <div className="text-gray-600">Average Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {formatPrice(stats.priceRange.min)}
                    </div>
                    <div className="text-gray-600">Starting From</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {formatPrice(stats.priceRange.max)}
                    </div>
                    <div className="text-gray-600">Up To</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Featured Properties */}
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our top recommendations - from luxury estates to affordable starter homes, 
                each carefully selected to match your lifestyle and investment goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/listings"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                View All Properties
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Categories Section */}
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Browse by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {config.propertyCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleQuickFilter('category', category.id === 'all' ? null : category.id)}
                    className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <div className="font-semibold text-gray-900">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
