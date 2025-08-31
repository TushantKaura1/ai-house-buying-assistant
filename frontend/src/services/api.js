import axios from 'axios';
import config from '../config';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and error handling
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.error('Bad Request:', data);
          break;
        case 401:
          console.error('Unauthorized:', data);
          break;
        case 404:
          console.error('Not Found:', data);
          break;
        case 500:
          console.error('Internal Server Error:', data);
          break;
        case 503:
          console.error('Service Unavailable:', data);
          break;
        default:
          console.error(`HTTP ${status}:`, data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
const retryRequest = async (fn, retries = config.api.retryAttempts) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
      console.log(`Retrying request... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

// API service methods
export const apiService = {
  // Get all listings
  async getListings(limit = null) {
    try {
      const params = limit ? { limit } : {};
      const response = await retryRequest(() => 
        api.get(config.api.endpoints.listings, { params })
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch listings: ${error.message}`);
    }
  },

  // Get listings by type
  async getListingsByType(type) {
    try {
      const response = await retryRequest(() => 
        api.get(`${config.api.endpoints.types}/${type}`)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch ${type} listings: ${error.message}`);
    }
  },

  // Search listings with natural language query
  async searchListings(query) {
    try {
      const response = await retryRequest(() => 
        api.post(config.api.endpoints.search, { query })
      );
      return response.data;
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  },

  // Get listing details
  async getListingDetails(listingId) {
    try {
      const response = await retryRequest(() => 
        api.get(`/api/listings/detail/${listingId}`)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch listing details: ${error.message}`);
    }
  },

  // Get statistics
  async getStats() {
    try {
      const response = await retryRequest(() => 
        api.get(config.api.endpoints.stats)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch stats: ${error.message}`);
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await retryRequest(() => 
        api.get(config.api.endpoints.health)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },

  // Get home page data (featured listings + stats)
  async getHomeData() {
    try {
      const response = await retryRequest(() => 
        api.get('/')
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  },

  // Get featured listings
  async getFeaturedListings() {
    try {
      const response = await retryRequest(() => 
        api.get(config.api.endpoints.featured)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch featured listings: ${error.message}`);
    }
  },

  // Test backend connectivity
  async testConnection() {
    try {
      const response = await api.get('/', { timeout: 5000 });
      return {
        connected: true,
        status: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message,
        code: error.code
      };
    }
  }
};

// Utility functions
export const formatPrice = (price) => {
  if (!price || price === 0) return 'Price on request';
  
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}k`;
  }
  return `$${price.toLocaleString()}`;
};

export const formatLocation = (location) => {
  if (!location) return 'Location not specified';
  return location.replace(', NS', '').trim();
};

export const getPropertyTypeIcon = (type) => {
  const typeConfig = config.propertyTypes.find(t => t.id === type);
  return typeConfig ? typeConfig.icon : '🏠';
};

export const getPropertyTypeLabel = (type) => {
  const typeConfig = config.propertyTypes.find(t => t.id === type);
  return typeConfig ? typeConfig.label : 'Property';
};

export const getPropertyTypeColor = (type) => {
  const typeConfig = config.propertyTypes.find(t => t.id === type);
  return typeConfig ? typeConfig.color : 'gray';
};

// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server error response
    const { status, data } = error.response;
    
    if (data && data.error) {
      return data.error;
    }
    
    switch (status) {
      case 400:
        return config.errors.invalidQuery;
      case 404:
        return config.errors.noResults;
      case 500:
        return config.errors.apiError;
      case 503:
        return config.errors.backendUnavailable;
      default:
        return config.errors.apiError;
    }
  } else if (error.request) {
    // Network error
    if (error.code === 'ECONNABORTED') {
      return config.errors.timeoutError;
    }
    return config.errors.networkError;
  } else if (error.message && error.message.includes('CORS')) {
    return config.errors.corsError;
  } else {
    // Other error
    return error.message || config.errors.apiError;
  }
};

// Local storage utilities with better error handling
export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Cache management
  getCache(key) {
    try {
      const cached = this.get(key);
      if (!cached) return null;
      
      // Check if cache is expired
      if (cached.expiry && Date.now() > cached.expiry) {
        this.remove(key);
        return null;
      }
      
      return cached.data;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  },

  setCache(key, data, expiryHours = config.production.cacheExpiryHours) {
    try {
      const cacheData = {
        data,
        expiry: Date.now() + (expiryHours * 60 * 60 * 1000),
        timestamp: Date.now()
      };
      this.set(key, cacheData);
      return true;
    } catch (error) {
      console.error('Error setting cache:', error);
      return false;
    }
  },

  clearExpiredCache() {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();
      
      keys.forEach(key => {
        if (key.startsWith('ai-realtor-cache-')) {
          try {
            const cached = JSON.parse(localStorage.getItem(key));
            if (cached.expiry && now > cached.expiry) {
              localStorage.removeItem(key);
            }
          } catch (e) {
            // Remove invalid cache entries
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  }
};

export default apiService;
