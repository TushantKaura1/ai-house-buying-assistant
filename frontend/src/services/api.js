// API Service for AI House Buying Assistant
// This service handles local data operations and smart filtering

import smartFilterService from './smartFilter';

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// API service methods using smart filtering
export const apiService = {
  // Get all properties
  async getListings(limit = null) {
    try {
      if (limit) {
        return smartFilterService.getFeaturedProperties(limit);
      }
      return smartFilterService.properties;
    } catch (error) {
      throw new Error(`Failed to fetch listings: ${error.message}`);
    }
  },

  // Search properties using smart filtering
  async searchListings(query) {
    try {
      const results = await smartFilterService.processQuery(query);
      return {
        success: true,
        data: results
      };
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  },

  // Get properties by type
  async getListingsByType(type, limit = null) {
    try {
      return smartFilterService.getPropertiesByType(type, limit);
    } catch (error) {
      throw new Error(`Failed to fetch ${type} listings: ${error.message}`);
    }
  },

  // Get properties by category
  async getListingsByCategory(category, limit = null) {
    try {
      return smartFilterService.getPropertiesByCategory(category, limit);
    } catch (error) {
      throw new Error(`Failed to fetch ${category} listings: ${error.message}`);
    }
  },

  // Get featured properties
  async getFeaturedListings(limit = 6) {
    try {
      return smartFilterService.getFeaturedProperties(limit);
    } catch (error) {
      throw new Error(`Failed to fetch featured listings: ${error.message}`);
    }
  },

  // Get property statistics
  async getStats() {
    try {
      return smartFilterService.getStats();
    } catch (error) {
      throw new Error(`Failed to fetch stats: ${error.message}`);
    }
  },

  // Get property by ID
  async getPropertyById(id) {
    try {
      return smartFilterService.getPropertyById(id);
    } catch (error) {
      throw new Error(`Failed to fetch property: ${error.message}`);
    }
  },

  // Get similar properties
  async getSimilarProperties(propertyId, limit = 4) {
    try {
      return smartFilterService.getSimilarProperties(propertyId, limit);
    } catch (error) {
      throw new Error(`Failed to fetch similar properties: ${error.message}`);
    }
  },

  // Get search suggestions
  async getSearchSuggestions() {
    try {
      return smartFilterService.getSearchSuggestions();
    } catch (error) {
      throw new Error(`Failed to fetch search suggestions: ${error.message}`);
    }
  },

  // Get categories
  async getCategories() {
    try {
      return smartFilterService.getCategories();
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  },

  // Test connection (always returns true for local service)
  async testConnection() {
    return { success: true, message: 'Local service is working' };
  },

  // Get home data
  async getHomeData() {
    try {
      const featured = smartFilterService.getFeaturedProperties(6);
      const stats = smartFilterService.getStats();
      
      return {
        featured_listings: featured,
        stats: stats
      };
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  }
};

// Export default for backward compatibility
export default apiService;
