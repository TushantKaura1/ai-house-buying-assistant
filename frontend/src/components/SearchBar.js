import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const SearchBar = ({ onSearch, placeholder, suggestions = [], className = '' }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Default placeholder if none provided
  const defaultPlaceholder = placeholder || "Describe your dream property...";

  // Filter suggestions based on current query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredSuggestions(suggestions.slice(0, 8));
    } else {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 6));
    }
    setSelectedIndex(-1);
  }, [query, suggestions]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  // Handle search submission
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);

    // If onSearch callback is provided, use it
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Default navigation behavior
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }

    // Reset state
    setTimeout(() => setIsSearching(false), 1000);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        handleSuggestionClick(filteredSuggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle input focus
  const handleFocus = () => {
    setShowSuggestions(true);
  };

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  // Popular search examples
  const popularSearches = [
    "affordable condos under $500k",
    "family homes with 3+ bedrooms",
    "waterfront properties",
    "luxury homes in downtown",
    "investment properties",
    "retirement homes"
  ];

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={defaultPlaceholder}
          className="w-full pl-12 pr-20 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
        />
        
        <button
          onClick={() => handleSearch()}
          disabled={isSearching || !query.trim()}
          className="absolute inset-y-0 right-0 px-6 bg-blue-600 text-white font-semibold rounded-r-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSearching ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Search
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Filtered Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                Suggested Searches
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors ${
                    index === selectedIndex ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          <div className="border-t border-gray-100 p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2 px-3 pb-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Search Tips */}
          <div className="border-t border-gray-100 p-3 bg-gray-50 rounded-b-xl">
            <div className="text-xs text-gray-600">
              <strong>💡 Tip:</strong> Use natural language like "affordable condos in Halifax under $500,000" or "houses with ocean views"
            </div>
          </div>
        </div>
      )}

      {/* Search Examples */}
      {!showSuggestions && query === '' && (
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500 mb-2">Try these examples:</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
