// Configuration for the AI Realtor Assistant Frontend

const config = {
  // App Configuration
  app: {
    name: 'AI Realtor Assistant',
    version: '2.0.0',
    description: 'Smart property search powered by AI filtering',
    maxSearchResults: 50,
    searchDebounceMs: 500,
    enableOfflineMode: true,
    enableCaching: true,
    enableSmartFiltering: true,
  },
  
  // Property Types
  propertyTypes: [
    { id: 'all', label: 'All Properties', icon: '🏠', color: 'gray' },
    { id: 'house', label: 'Houses', icon: '🏡', color: 'blue' },
    { id: 'condo', label: 'Condos', icon: '🏢', color: 'green' },
    { id: 'land', label: 'Land', icon: '🌱', color: 'yellow' }
  ],
  
  // Search Suggestions
  defaultSuggestions: [
    'affordable condos in Halifax under $500,000',
    'houses with 3+ bedrooms near the ocean',
    'cheap land near Bedford',
    'luxury homes in downtown area',
    'family properties under $800,000',
    'waterfront properties in Eastern Shore',
    'modern condos with gym access',
    'historic homes in Dartmouth',
    'investment properties with rental income',
    'retirement homes in Chester',
    'student-friendly condos near universities',
    'cottages for weekend getaways',
    'properties with ocean views',
    'homes in good school districts',
    'energy-efficient modern homes'
  ],
  
  // Price Ranges (for quick filters)
  priceRanges: [
    { label: 'Under $300k', value: [0, 300000], color: 'green' },
    { label: '$300k - $500k', value: [300000, 500000], color: 'blue' },
    { label: '$500k - $800k', value: [500000, 800000], color: 'yellow' },
    { label: '$800k - $1.2M', value: [800000, 1200000], color: 'orange' },
    { label: 'Over $1.2M', value: [1200000, null], color: 'red' }
  ],
  
  // Bedroom Options
  bedroomOptions: [
    { label: 'Any', value: null, icon: '🏠' },
    { label: '1+', value: 1, icon: '🛏️' },
    { label: '2+', value: 2, icon: '🛏️🛏️' },
    { label: '3+', value: 3, icon: '🛏️🛏️🛏️' },
    { label: '4+', value: 4, icon: '🛏️🛏️🛏️🛏️' },
    { label: '5+', value: 5, icon: '🛏️🛏️🛏️🛏️🛏️' }
  ],
  
  // Locations with metadata
  locations: [
    { name: 'Halifax', region: 'Central', type: 'city' },
    { name: 'Bedford', region: 'Central', type: 'suburb' },
    { name: 'Dartmouth', region: 'Central', type: 'city' },
    { name: 'Sackville', region: 'Central', type: 'suburb' },
    { name: 'Chester', region: 'South Shore', type: 'town' },
    { name: 'Peggy\'s Cove', region: 'South Shore', type: 'village' },
    { name: 'Truro', region: 'Central Valley', type: 'town' },
    { name: 'Eastern Shore', region: 'Eastern', type: 'region' },
    { name: 'Valley', region: 'Central Valley', type: 'region' }
  ],
  
  // Property Categories
  propertyCategories: [
    { id: 'all', label: 'All Categories', icon: '🏠', color: 'gray' },
    { id: 'luxury', label: 'Luxury', icon: '💎', color: 'purple' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', color: 'blue' },
    { id: 'starter', label: 'Starter', icon: '🔑', color: 'green' },
    { id: 'investment', label: 'Investment', icon: '📈', color: 'orange' },
    { id: 'retirement', label: 'Retirement', icon: '🌅', color: 'yellow' },
    { id: 'student', label: 'Student', icon: '🎓', color: 'indigo' },
    { id: 'cottage', label: 'Cottage', icon: '🏡', color: 'brown' },
    { id: 'historic', label: 'Historic', icon: '🏛️', color: 'amber' },
    { id: 'modern', label: 'Modern', icon: '✨', color: 'teal' }
  ],
  
  // UI Configuration
  ui: {
    itemsPerPage: 12,
    showFilters: true,
    showSuggestions: true,
    enableAnimations: true,
    theme: 'light', // light, dark
    enableResponsiveDesign: true,
    enableAccessibility: true,
    showLoadingStates: true,
    enableInfiniteScroll: false,
    showSmartFilters: true,
    showCategoryFilters: true,
    showQuickFilters: true,
  },
  
  // Local Storage Keys
  storage: {
    searchHistory: 'ai-realtor-search-history',
    favorites: 'ai-realtor-favorites',
    userPreferences: 'ai-realtor-preferences',
    recentSearches: 'ai-realtor-recent-searches',
    cachedListings: 'ai-realtor-cached-listings',
    lastSearch: 'ai-realtor-last-search'
  },
  
  // Error Messages
  errors: {
    noResults: 'No properties found matching your search criteria.',
    invalidQuery: 'Please enter a valid search query.',
    loadingError: 'Error loading properties. Please refresh the page.',
    filterError: 'Error applying filters. Please try again.',
    searchError: 'Error processing search. Please try a different query.'
  },
  
  // Success Messages
  success: {
    searchCompleted: 'Search completed successfully!',
    favoritesUpdated: 'Favorites updated successfully!',
    preferencesSaved: 'Preferences saved successfully!',
    cacheCleared: 'Cache cleared successfully!',
    offlineModeEnabled: 'Offline mode enabled. Using cached data.'
  },
  
  // Production Configuration
  production: {
    enableAnalytics: true,
    enableErrorReporting: true,
    enablePerformanceMonitoring: true,
    cacheExpiryHours: 24,
    maxCacheSize: 50, // MB
  },
  
  // Development Configuration
  development: {
    enableDebugLogging: true,
    enableMockData: false,
    enableHotReload: true,
    showDevTools: true,
  },
  
  // Smart Filtering Configuration
  smartFiltering: {
    enableNaturalLanguage: true,
    enableFeatureExtraction: true,
    enablePriceExtraction: true,
    enableLocationExtraction: true,
    enableCategoryExtraction: true,
    enableRelevanceScoring: true,
    enableSimilarityMatching: true,
    maxResults: 50,
    relevanceThreshold: 0.1,
    enableSuggestions: true,
    enableAutoComplete: true
  }
};

// Environment-specific overrides
if (process.env.NODE_ENV === 'production') {
  // Production overrides
  config.ui.enableAnimations = false; // Better performance
  config.app.enableOfflineMode = true;
  config.smartFiltering.enableDebugLogging = false;
} else {
  // Development overrides
  config.ui.enableAnimations = true;
  config.app.enableOfflineMode = false;
  config.smartFiltering.enableDebugLogging = true;
}

export default config;
