import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import smartFilterService from '../services/smartFilter';
import { formatPrice } from '../utils/formatters';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({});

  // Get search query from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    if (query) {
      setCurrentQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await smartFilterService.processQuery(query);
      
      setSearchResults(results.properties || []);
      setTotalResults(results.totalCount || 0);
      
      // Update URL without page reload
      setSearchParams({ q: query }, { replace: true });
      
    } catch (error) {
      setError(error.message || 'Search failed. Please try again.');
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      setCurrentQuery(query);
      performSearch(query);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setTotalResults(0);
    setCurrentQuery('');
    setError(null);
    setSearchParams({}, { replace: true });
  };

  const getPropertyTypeIcon = (type) => {
    const typeConfig = {
      'house': '🏠',
      'condo': '🏢',
      'land': '🌱'
    };
    return typeConfig[type] || '🏘️';
  };

  const getPropertyTypeColor = (type) => {
    const typeConfig = {
      'house': 'bg-blue-100 text-blue-800',
      'condo': 'bg-green-100 text-green-800',
      'land': 'bg-yellow-100 text-yellow-800'
    };
    return typeConfig[type] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
              {currentQuery && (
                <p className="text-gray-600 mt-2">
                  Results for "{currentQuery}"
                </p>
              )}
            </div>
            <button
              onClick={clearSearch}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Search Error
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => performSearch(currentQuery)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found {totalResults} property{totalResults !== 1 ? 'ies' : 'y'}
                {currentQuery && ` for "${currentQuery}"`}
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        ) : currentQuery ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse our featured properties.
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Properties
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Your Search
            </h3>
            <p className="text-gray-600 mb-6">
              Use the search bar to find your dream property.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
