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
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
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
    console.log(`API Response: ${response.status} ${response.config.url}`);
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

// API service methods
export const apiService = {
  // Get all listings
  async getListings(limit = null) {
    try {
      const params = limit ? { limit } : {};
      const response = await api.get(config.api.endpoints.listings, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch listings: ${error.message}`);
    }
  },

  // Get listings by type
  async getListingsByType(type) {
    try {
      const response = await api.get(`${config.api.endpoints.types}/${type}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch ${type} listings: ${error.message}`);
    }
  },

  // Search listings with natural language query
  async searchListings(query) {
    try {
      const response = await api.post(config.api.endpoints.search, { query });
      return response.data;
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  },

  // Get listing details
  async getListingDetails(listingId) {
    try {
      const response = await api.get(`/api/listings/detail/${listingId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch listing details: ${error.message}`);
    }
  },

  // Get statistics
  async getStats() {
    try {
      const response = await api.get(config.api.endpoints.stats);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch stats: ${error.message}`);
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
};

// Utility functions
export const formatPrice = (price) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}k`;
  }
  return `$${price.toLocaleString()}`;
};

export const formatLocation = (location) => {
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
  switch (type) {
    case 'house':
      return 'blue';
    case 'condo':
      return 'green';
    case 'land':
      return 'yellow';
    default:
      return 'gray';
  }
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
      default:
        return config.errors.apiError;
    }
  } else if (error.request) {
    // Network error
    return config.errors.networkError;
  } else {
    // Other error
    return error.message || config.errors.apiError;
  }
};

// Local storage utilities
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
  }
};

export default apiService;
