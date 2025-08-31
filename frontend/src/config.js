// Configuration for the AI Realtor Assistant Frontend

const config = {
  // API Configuration
  api: {
    // Update this URL to point to your backend server
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    endpoints: {
      listings: '/api/listings',
      search: '/api/search',
      stats: '/api/stats',
      types: '/api/listings'
    },
    timeout: 10000, // 10 seconds
  },
  
  // App Configuration
  app: {
    name: 'AI Realtor Assistant',
    version: '1.0.0',
    description: 'Smart property search powered by AI',
    maxSearchResults: 50,
    searchDebounceMs: 500,
  },
  
  // Property Types
  propertyTypes: [
    { id: 'all', label: 'All Properties', icon: '🏠' },
    { id: 'house', label: 'Houses', icon: '🏡' },
    { id: 'condo', label: 'Condos', icon: '🏢' },
    { id: 'land', label: 'Land', icon: '🌱' }
  ],
  
  // Search Suggestions
  defaultSuggestions: [
    'affordable condos in Halifax under $500,000',
    'houses with 3+ bedrooms near the ocean',
    'cheap land near Bedford',
    'luxury homes in downtown area',
    'family properties under $800,000'
  ],
  
  // Price Ranges (for quick filters)
  priceRanges: [
    { label: 'Under $300k', value: [0, 300000] },
    { label: '$300k - $500k', value: [300000, 500000] },
    { label: '$500k - $800k', value: [500000, 800000] },
    { label: '$800k - $1.2M', value: [800000, 1200000] },
    { label: 'Over $1.2M', value: [1200000, null] }
  ],
  
  // Bedroom Options
  bedroomOptions: [
    { label: 'Any', value: null },
    { label: '1+', value: 1 },
    { label: '2+', value: 2 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
    { label: '5+', value: 5 }
  ],
  
  // Locations
  locations: [
    'Halifax',
    'Bedford',
    'Dartmouth',
    'Sackville',
    'Chester',
    'Peggy\'s Cove',
    'Truro'
  ],
  
  // UI Configuration
  ui: {
    itemsPerPage: 12,
    showFilters: true,
    showSuggestions: true,
    enableAnimations: true,
    theme: 'light', // light, dark
  },
  
  // Local Storage Keys
  storage: {
    searchHistory: 'ai-realtor-search-history',
    favorites: 'ai-realtor-favorites',
    userPreferences: 'ai-realtor-preferences',
    recentSearches: 'ai-realtor-recent-searches'
  },
  
  // Error Messages
  errors: {
    networkError: 'Network error. Please check your connection and try again.',
    apiError: 'Server error. Please try again later.',
    noResults: 'No properties found matching your search criteria.',
    invalidQuery: 'Please enter a valid search query.',
    loadingError: 'Error loading properties. Please refresh the page.'
  },
  
  // Success Messages
  success: {
    searchCompleted: 'Search completed successfully!',
    favoritesUpdated: 'Favorites updated successfully!',
    preferencesSaved: 'Preferences saved successfully!'
  }
};

export default config;
