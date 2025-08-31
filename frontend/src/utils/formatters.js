/**
 * Utility functions for formatting data in the frontend
 */

/**
 * Format price with currency symbol and commas
 * @param {number} price - The price to format
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = '$') => {
  if (!price || isNaN(price)) return 'Price on request';
  
  // Format large numbers with K, M, B suffixes
  if (price >= 1000000000) {
    return `${currency}${(price / 1000000000).toFixed(1)}B`;
  } else if (price >= 1000000) {
    return `${currency}${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${currency}${(price / 1000).toFixed(0)}K`;
  }
  
  return `${currency}${price.toLocaleString()}`;
};

/**
 * Format numbers with commas
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (!num || isNaN(num)) return 'N/A';
  return num.toLocaleString();
};

/**
 * Format square footage
 * @param {number} sqft - Square footage to format
 * @returns {string} Formatted square footage string
 */
export const formatSqft = (sqft) => {
  if (!sqft || isNaN(sqft)) return 'N/A';
  return `${sqft.toLocaleString()} sq ft`;
};

/**
 * Format lot size
 * @param {number} acres - Lot size in acres
 * @returns {string} Formatted lot size string
 */
export const formatLotSize = (acres) => {
  if (!acres || isNaN(acres)) return 'N/A';
  if (acres < 1) {
    return `${(acres * 43560).toLocaleString()} sq ft`;
  }
  return `${acres} acre${acres !== 1 ? 's' : ''}`;
};

/**
 * Format year built
 * @param {number} year - Year built
 * @returns {string} Formatted year string
 */
export const formatYearBuilt = (year) => {
  if (!year || isNaN(year)) return 'N/A';
  return year.toString();
};

/**
 * Format property type for display
 * @param {string} type - Property type
 * @returns {string} Formatted property type string
 */
export const formatPropertyType = (type) => {
  if (!type) return 'Unknown';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Format location for display
 * @param {string} location - Location string
 * @returns {string} Formatted location string
 */
export const formatLocation = (location) => {
  if (!location) return 'Location not specified';
  return location;
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Format maintenance fee
 * @param {number} fee - Monthly maintenance fee
 * @returns {string} Formatted maintenance fee string
 */
export const formatMaintenanceFee = (fee) => {
  if (!fee || fee === 0) return 'No maintenance fee';
  return `${formatPrice(fee)}/month`;
};

/**
 * Format property tax
 * @param {number} tax - Annual property tax
 * @returns {string} Formatted property tax string
 */
export const formatPropertyTax = (tax) => {
  if (!tax || tax === 0) return 'Tax information not available';
  return `${formatPrice(tax)}/year`;
};

/**
 * Format bedrooms
 * @param {number} bedrooms - Number of bedrooms
 * @returns {string} Formatted bedrooms string
 */
export const formatBedrooms = (bedrooms) => {
  if (!bedrooms && bedrooms !== 0) return 'Studio';
  if (bedrooms === 1) return '1 bedroom';
  return `${bedrooms} bedrooms`;
};

/**
 * Format bathrooms
 * @param {number} bathrooms - Number of bathrooms
 * @returns {string} Formatted bathrooms string
 */
export const formatBathrooms = (bathrooms) => {
  if (!bathrooms && bathrooms !== 0) return 'N/A';
  if (bathrooms === 1) return '1 bathroom';
  if (bathrooms % 1 === 0) return `${bathrooms} bathrooms`;
  return `${bathrooms} bathrooms`;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

/**
 * Get property type icon
 * @param {string} type - Property type
 * @returns {string} Icon emoji
 */
export const getPropertyTypeIcon = (type) => {
  const typeConfig = {
    'house': '🏠',
    'condo': '🏢',
    'land': '🌱',
    'townhouse': '🏡',
    'apartment': '🏢'
  };
  return typeConfig[type] || '🏘️';
};

/**
 * Get property type label
 * @param {string} type - Property type
 * @returns {string} Formatted property type label
 */
export const getPropertyTypeLabel = (type) => {
  const typeConfig = {
    'house': 'House',
    'condo': 'Condo',
    'land': 'Land',
    'townhouse': 'Townhouse',
    'apartment': 'Apartment'
  };
  return typeConfig[type] || 'Property';
};

/**
 * Get property type color
 * @param {string} type - Property type
 * @returns {string} Color class
 */
export const getPropertyTypeColor = (type) => {
  const typeConfig = {
    'house': 'blue',
    'condo': 'green',
    'land': 'yellow',
    'townhouse': 'purple',
    'apartment': 'indigo'
  };
  return typeConfig[type] || 'gray';
};
