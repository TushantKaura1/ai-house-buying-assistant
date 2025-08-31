import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatNumber } from '../utils/formatters';

const PropertyCard = ({ property, featured = false }) => {
  const {
    id,
    title,
    type,
    price,
    location,
    description,
    bedrooms,
    bathrooms,
    sqft,
    year_built,
    image_url,
    features = [],
    style,
    condition,
    property_tax,
    maintenance_fee,
    lot_size
  } = property;

  const getPropertyTypeColor = (type) => {
    switch (type) {
      case 'house': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'condo': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'land': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case 'house': return '🏠';
      case 'condo': return '🏢';
      case 'land': return '🌲';
      default: return '🏘️';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent': return 'text-green-600';
      case 'very good': return 'text-blue-600';
      case 'good': return 'text-yellow-600';
      case 'fair': return 'text-orange-600';
      case 'needs work': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop';
          }}
        />
        
        {/* Property Type Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPropertyTypeColor(type)}`}>
            <span className="mr-1">{getPropertyTypeIcon(type)}</span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(price)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {bedrooms !== null && (
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">🛏️</span>
              <span className="font-medium">{bedrooms} Bed{bedrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          {bathrooms !== null && (
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">🚿</span>
              <span className="font-medium">{bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          {sqft && (
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">📐</span>
              <span className="font-medium">{formatNumber(sqft)} sq ft</span>
            </div>
          )}
          
          {year_built && (
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">🏗️</span>
              <span className="font-medium">{year_built}</span>
            </div>
          )}
          
          {lot_size && (
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">🌍</span>
              <span className="font-medium">{lot_size} acres</span>
            </div>
          )}
          
          {style && (
            <div className="flex items-center text-gray-700">
              <span className="text-lg mr-2">🎨</span>
              <span className="font-medium">{style}</span>
            </div>
          )}
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {condition && (
            <span className={`font-medium ${getConditionColor(condition)}`}>
              {condition}
            </span>
          )}
          
          {property_tax && (
            <span className="text-gray-600">
              Tax: ${formatNumber(property_tax)}/year
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/listing/${id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
        >
          <span>View Details</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
