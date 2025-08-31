import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, storage } from '../services/api';
import config from '../config';

const SearchBar = ({ onSearch, className = '', showSuggestions = true }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [filters, setFilters] = useState({});
  
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = storage.get(config.storage.recentSearches) || [];
    setRecentSearches(saved);
  }, []);

  // Handle clicks outside suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() && query.length > 2) {
        generateSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, config.app.searchDebounceMs);

    return () => clearTimeout(timer);
  }, [query]);

  const generateSuggestions = async (searchQuery) => {
    try {
      // Get AI-powered suggestions from backend
      const response = await apiService.searchListings(searchQuery);
      if (response.success && response.data.suggestions) {
        setSuggestions(response.data.suggestions);
      } else {
        // Fallback to default suggestions
        setSuggestions(config.defaultSuggestions.filter(s => 
          s.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      // Fallback to default suggestions
      setSuggestions(config.defaultSuggestions.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  };

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setShowSuggestionsList(false);

    try {
      // Save to recent searches
      const updatedSearches = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 10);
      
      storage.set(config.storage.recentSearches, updatedSearches);
      setRecentSearches(updatedSearches);

      // Navigate to search results page
      navigate('/search', { 
        state: { 
          query: searchQuery,
          filters: filters
        }
      });

      // Call onSearch callback if provided
      if (onSearch) {
        onSearch(searchQuery, filters);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleRecentSearchClick = (recentSearch) => {
    setQuery(recentSearch);
    handleSearch(recentSearch);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestionsList(false);
    }
  };

  const handleInputFocus = () => {
    if (query.trim() || recentSearches.length > 0) {
      setShowSuggestionsList(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestionsList(false);
    searchInputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Search Input */}
      <div className="search-bar">
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <div className="text-realtor-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search Input */}
          <div className="flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              onKeyPress={handleKeyPress}
              placeholder="Try: 'affordable condos in Halifax under $500,000'"
              className="input-field text-lg border-0 focus:ring-0 focus:border-0 shadow-none"
              disabled={isLoading}
            />
          </div>

          {/* Clear Button */}
          {query && (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button
            onClick={() => handleSearch()}
            disabled={!query.trim() || isLoading}
            className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* AI Search Hint */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            💡 <strong>AI-Powered:</strong> Use natural language to find your dream property
          </p>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
              <div className="space-y-2">
                {recentSearches.slice(0, 5).map((recentSearch, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(recentSearch)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{recentSearch}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">💡 AI Suggestions</h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4 text-realtor-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="p-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Filters</h3>
            <div className="grid grid-cols-2 gap-2">
              {config.propertyTypes.slice(1).map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSearch(`${type.label.toLowerCase()} in Halifax`)}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
