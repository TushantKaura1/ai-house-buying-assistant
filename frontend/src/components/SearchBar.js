import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, suggestions = [], placeholder = "Describe your dream home..." }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setFocusedSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      await onSearch(query.trim());
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
      setFocusedSuggestion(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setFocusedSuggestion(-1);
    onSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && focusedSuggestion >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[focusedSuggestion]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedSuggestion(-1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
    setFocusedSuggestion(-1);
  };

  const handleInputFocus = () => {
    if (query.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      {/* Main Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
          />

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="absolute inset-y-0 right-0 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-r-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
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
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          <div className="p-2">
            <div className="text-sm text-gray-500 px-3 py-2 font-medium border-b border-gray-100">
              Popular Searches
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-150 ${
                  index === focusedSuggestion
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Examples */}
      {!showSuggestions && query.length === 0 && (
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm mb-3">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-200 hover:border-blue-300"
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
