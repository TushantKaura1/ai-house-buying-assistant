import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import { apiService, handleApiError } from '../services/api';
import config from '../config';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [filtersApplied, setFiltersApplied] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Get search query from location state or URL params
  useEffect(() => {
    const query = location.state?.query || new URLSearchParams(location.search).get('q') || '';
    if (query) {
      setCurrentQuery(query);
      performSearch(query);
    }
  }, [location]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.searchListings(query);
      
      if (response.success) {
        setSearchResults(response.data.results || []);
        setFiltersApplied(response.data.filters_applied || {});
        setSuggestions(response.data.suggestions || []);
      } else {
        setError('Search failed. Please try again.');
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query, filters) => {
    setCurrentQuery(query);
    performSearch(query);
    
    // Update URL without page reload
    navigate(`/search?q=${encodeURIComponent(query)}`, { 
      state: { query, filters },
      replace: true 
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    
    let sortedResults = [...searchResults];
    
    switch (newSortBy) {
      case 'price-low':
        sortedResults.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedResults.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedResults.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        sortedResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    setSearchResults(sortedResults);
  };

  const getFilterSummary = () => {
    const summary = [];
    
    if (filtersApplied.type) {
      summary.push(`${filtersApplied.type} properties`);
    }
    
    if (filtersApplied.location) {
      summary.push(`in ${filtersApplied.location}`);
    }
    
    if (filtersApplied.min_price || filtersApplied.max_price) {
      if (filtersApplied.min_price && filtersApplied.max_price) {
        summary.push(`$${filtersApplied.min_price.toLocaleString()} - $${filtersApplied.max_price.toLocaleString()}`);
      } else if (filtersApplied.min_price) {
        summary.push(`over $${filtersApplied.min_price.toLocaleString()}`);
      } else if (filtersApplied.max_price) {
        summary.push(`under $${filtersApplied.max_price.toLocaleString()}`);
      }
    }
    
    if (filtersApplied.min_bedrooms) {
      summary.push(`${filtersApplied.min_bedrooms}+ bedrooms`);
    }
    
    return summary.join(' • ');
  };

  const clearFilters = () => {
    setFiltersApplied({});
    setSortBy('relevance');
    if (currentQuery) {
      performSearch(currentQuery);
    }
  };

  if (!currentQuery) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Search Properties
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Use the search bar below to find your dream property
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar onSearch={handleSearch} showSuggestions={false} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            {filtersApplied && Object.keys(filtersApplied).length > 0 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Filters applied:</span> {getFilterSummary()}
                <button
                  onClick={clearFilters}
                  className="ml-2 text-realtor-600 hover:text-realtor-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="input-field py-2 px-3 text-sm"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select className="input-field py-2">
                  <option value="">All Types</option>
                  {config.propertyTypes.slice(1).map((type) => (
                    <option key={type.id} value={type.id}>{type.icon} {type.label}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <select className="input-field py-2">
                  <option value="">Any Price</option>
                  {config.priceRanges.map((range, index) => (
                    <option key={index} value={range.value[1]}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
                <select className="input-field py-2">
                  {config.bedroomOptions.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="input-field py-2">
                  <option value="">All Locations</option>
                  {config.locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Search Error</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => performSearch(currentQuery)}
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-semibold">{searchResults.length}</span> properties
                {currentQuery && (
                  <> for "<span className="font-semibold">{currentQuery}</span>"</>
                )}
              </p>
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or use different keywords
                </p>
                <button
                  onClick={() => setCurrentQuery('')}
                  className="btn-primary"
                >
                  Start New Search
                </button>
              </div>
            )}
          </>
        )}

        {/* Search Suggestions */}
        {!isLoading && !error && suggestions.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Try These Searches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-realtor-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
