// Smart Filtering Service for AI Realtor Assistant
// This service integrates with ChatGPT API through Netlify Functions for intelligent property search

import propertiesData from '../data/properties_enhanced.json';

class SmartFilterService {
  constructor() {
    this.properties = propertiesData.properties;
    this.categories = propertiesData.categories;
    this.searchSuggestions = propertiesData.search_suggestions;
    this.useChatGPT = true; // Enable ChatGPT integration
  }

  // Main method to process natural language queries
  async processQuery(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Try ChatGPT first if enabled
    if (this.useChatGPT) {
      try {
        const chatGPTResult = await this.queryChatGPT(normalizedQuery);
        if (chatGPTResult && chatGPTResult.success) {
          // Use ChatGPT's intelligent filtering
          const filteredProperties = this.applyChatGPTFilters(chatGPTResult.data.filters);
          const sortedProperties = this.sortByRelevance(filteredProperties, normalizedQuery);
          
          return {
            properties: sortedProperties,
            filters: chatGPTResult.data.filters,
            totalCount: sortedProperties.length,
            query: query,
            explanation: chatGPTResult.data.explanation,
            suggestions: chatGPTResult.data.suggestions,
            source: 'chatgpt'
          };
        }
      } catch (error) {
        console.warn('ChatGPT query failed, falling back to local filtering:', error);
        // Fall back to local filtering
      }
    }
    
    // Fallback to local filtering
    const filters = this.extractFilters(normalizedQuery);
    const filteredProperties = this.applyFilters(filters);
    const sortedProperties = this.sortByRelevance(filteredProperties, normalizedQuery);
    
    return {
      properties: sortedProperties,
      filters: filters,
      totalCount: sortedProperties.length,
      query: query,
      source: 'local'
    };
  }

  // Query ChatGPT through Netlify Function
  async queryChatGPT(query) {
    try {
      const response = await fetch('/.netlify/functions/chatgpt-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          properties: this.properties.length
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('ChatGPT API call failed:', error);
      throw error;
    }
  }

  // Apply ChatGPT's intelligent filters
  applyChatGPTFilters(filters) {
    return this.properties.filter(property => {
      // Type filter
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      // Location filter
      if (filters.location && property.location.toLowerCase() !== filters.location.toLowerCase()) {
        return false;
      }

      // Price filters
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }

      // Bedroom filter
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
        return false;
      }

      // Features filter
      if (filters.features && filters.features.length > 0) {
        const hasFeature = filters.features.some(feature => 
          property.features.includes(feature)
        );
        if (!hasFeature) {
          return false;
        }
      }

      // Category filter
      if (filters.category && property.category !== filters.category) {
        return false;
      }

      return true;
    });
  }

  // Extract filters from natural language query (fallback method)
  extractFilters(query) {
    const filters = {
      type: null,
      location: null,
      priceRange: null,
      bedrooms: null,
      features: [],
      category: null,
      maxPrice: null,
      minPrice: null
    };

    // Extract property type
    if (query.includes('condo') || query.includes('condos')) {
      filters.type = 'condo';
    } else if (query.includes('house') || query.includes('houses') || query.includes('home') || query.includes('homes')) {
      filters.type = 'house';
    } else if (query.includes('land') || query.includes('lot')) {
      filters.type = 'land';
    }

    // Extract location
    const locations = this.categories.locations.map(loc => loc.name.toLowerCase());
    for (const location of locations) {
      if (query.includes(location.toLowerCase())) {
        filters.location = location;
        break;
      }
    }

    // Extract price information
    if (query.includes('under') || query.includes('less than') || query.includes('below')) {
      const priceMatch = query.match(/\$?(\d+(?:,\d{3})*(?:k|m)?)/i);
      if (priceMatch) {
        let price = priceMatch[1];
        if (price.includes('k')) {
          price = parseInt(price.replace('k', '')) * 1000;
        } else if (price.includes('m')) {
          price = parseInt(price.replace('m', '')) * 1000000;
        } else {
          price = parseInt(price.replace(/,/g, ''));
        }
        filters.maxPrice = price;
      }
    } else if (query.includes('over') || query.includes('more than') || query.includes('above')) {
      const priceMatch = query.match(/\$?(\d+(?:,\d{3})*(?:k|m)?)/i);
      if (priceMatch) {
        let price = priceMatch[1];
        if (price.includes('k')) {
          price = parseInt(price.replace('k', '')) * 1000;
        } else if (price.includes('m')) {
          price = parseInt(price.replace('m', '')) * 1000000;
        } else {
          price = parseInt(price.replace(/,/g, ''));
        }
        filters.minPrice = price;
      }
    }

    // Extract bedroom count
    const bedroomMatch = query.match(/(\d+)\+?\s*bedroom/);
    if (bedroomMatch) {
      filters.bedrooms = parseInt(bedroomMatch[1]);
    }

    // Extract features
    const features = this.categories.features;
    for (const feature of features) {
      if (query.includes(feature.replace(/_/g, ' '))) {
        filters.features.push(feature);
      }
    }

    // Extract categories
    if (query.includes('affordable') || query.includes('cheap') || query.includes('budget')) {
      filters.category = 'starter';
    } else if (query.includes('luxury') || query.includes('premium') || query.includes('high-end')) {
      filters.category = 'luxury';
    } else if (query.includes('family') || query.includes('families')) {
      filters.category = 'family';
    } else if (query.includes('investment') || query.includes('rental')) {
      filters.category = 'investment';
    } else if (query.includes('retirement') || query.includes('retire')) {
      filters.category = 'retirement';
    } else if (query.includes('student') || query.includes('university')) {
      filters.category = 'student';
    } else if (query.includes('cottage') || query.includes('getaway')) {
      filters.category = 'cottage';
    } else if (query.includes('historic') || query.includes('character')) {
      filters.category = 'historic';
    } else if (query.includes('modern') || query.includes('contemporary')) {
      filters.category = 'modern';
    }

    return filters;
  }

  // Apply filters to properties (fallback method)
  applyFilters(filters) {
    return this.properties.filter(property => {
      // Type filter
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      // Location filter
      if (filters.location && property.location.toLowerCase() !== filters.location.toLowerCase()) {
        return false;
      }

      // Price filters
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }

      // Bedroom filter
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasFeature = filters.features.some(feature => 
          property.features.includes(feature)
        );
        if (!hasFeature) {
          return false;
        }
      }

      // Category filter
      if (filters.category && property.category !== filters.category) {
        return false;
      }

      return true;
    });
  }

  // Sort properties by relevance to the query
  sortByRelevance(properties, query) {
    return properties.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Boost score for exact matches in title
      if (a.title.toLowerCase().includes(query)) scoreA += 10;
      if (b.title.toLowerCase().includes(query)) scoreB += 10;

      // Boost score for location matches
      if (a.location.toLowerCase().includes(query)) scoreA += 8;
      if (b.location.toLowerCase().includes(query)) scoreB += 8;

      // Boost score for feature matches
      const featureMatchesA = a.features.filter(f => 
        query.includes(f.replace(/_/g, ' '))
      ).length;
      const featureMatchesB = b.features.filter(f => 
        query.includes(f.replace(/_/g, ' '))
      ).length;
      scoreA += featureMatchesA * 5;
      scoreB += featureMatchesB * 5;

      // Boost score for description matches
      if (a.description.toLowerCase().includes(query)) scoreA += 3;
      if (b.description.toLowerCase().includes(query)) scoreB += 3;

      // Sort by score (descending), then by price (ascending)
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
      return a.price - b.price;
    });
  }

  // Get featured properties (top recommendations)
  getFeaturedProperties(limit = 6) {
    const featured = this.properties.filter(property => 
      property.category === 'luxury' || 
      property.features.includes('ocean_view') ||
      property.features.includes('waterfront') ||
      property.features.includes('modern')
    );
    
    return featured.slice(0, limit);
  }

  // Get properties by category
  getPropertiesByCategory(category, limit = null) {
    let filtered = this.properties.filter(property => property.category === category);
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    return filtered;
  }

  // Get properties by type
  getPropertiesByType(type, limit = null) {
    let filtered = this.properties.filter(property => property.type === type);
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    return filtered;
  }

  // Get properties by price range
  getPropertiesByPriceRange(minPrice, maxPrice, limit = null) {
    let filtered = this.properties.filter(property => 
      property.price >= minPrice && property.price <= maxPrice
    );
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    return filtered;
  }

  // Get search suggestions
  getSearchSuggestions() {
    return this.searchSuggestions;
  }

  // Get all categories
  getCategories() {
    return this.categories;
  }

  // Get property statistics
  getStats() {
    const total = this.properties.length;
    const byType = {
      house: this.properties.filter(p => p.type === 'house').length,
      condo: this.properties.filter(p => p.type === 'condo').length,
      land: this.properties.filter(p => p.type === 'land').length
    };
    const byCategory = {
      luxury: this.properties.filter(p => p.category === 'luxury').length,
      family: this.properties.filter(p => p.category === 'family').length,
      starter: this.properties.filter(p => p.category === 'starter').length,
      investment: this.properties.filter(p => p.category === 'investment').length,
      retirement: this.properties.filter(p => p.category === 'retirement').length,
      student: this.properties.filter(p => p.category === 'student').length,
      cottage: this.properties.filter(p => p.category === 'cottage').length,
      historic: this.properties.filter(p => p.category === 'historic').length,
      modern: this.properties.filter(p => p.category === 'modern').length
    };
    
    const avgPrice = this.properties.reduce((sum, p) => sum + p.price, 0) / total;
    
    return {
      total,
      byType,
      byCategory,
      averagePrice: Math.round(avgPrice),
      priceRange: {
        min: Math.min(...this.properties.map(p => p.price)),
        max: Math.max(...this.properties.map(p => p.price))
      }
    };
  }

  // Get property by ID
  getPropertyById(id) {
    return this.properties.find(property => property.id === parseInt(id));
  }

  // Get similar properties
  getSimilarProperties(propertyId, limit = 4) {
    const property = this.getPropertyById(propertyId);
    if (!property) return [];

    const similar = this.properties
      .filter(p => p.id !== propertyId)
      .map(p => ({
        ...p,
        similarity: this.calculateSimilarity(property, p)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    return similar.map(p => {
      const { similarity, ...propertyData } = p;
      return propertyData;
    });
  }

  // Calculate similarity between two properties
  calculateSimilarity(property1, property2) {
    let score = 0;

    // Same type
    if (property1.type === property2.type) score += 3;

    // Same category
    if (property1.category === property2.category) score += 2;

    // Same location
    if (property1.location === property2.location) score += 2;

    // Similar price range (within 20%)
    const priceDiff = Math.abs(property1.price - property2.price) / property1.price;
    if (priceDiff <= 0.2) score += 1;

    // Similar features
    const commonFeatures = property1.features.filter(f => 
      property2.features.includes(f)
    ).length;
    score += commonFeatures * 0.5;

    return score;
  }

  // Toggle ChatGPT integration
  toggleChatGPT(enabled) {
    this.useChatGPT = enabled;
  }

  // Check if ChatGPT is available
  isChatGPTAvailable() {
    return this.useChatGPT;
  }
}

export default new SmartFilterService();
