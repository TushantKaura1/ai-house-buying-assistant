import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatLocation, getPropertyTypeIcon, getPropertyTypeLabel } from '../services/api';

const PropertyCard = ({ property, className = '' }) => {
  const {
    id,
    title,
    description,
    type,
    price,
    location,
    image_url,
    bedrooms,
    bathrooms,
    sqft,
    year_built
  } = property;

  const handleImageError = (e) => {
    // Fallback image if the main image fails to load
    e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop';
  };

  return (
    <Link to={`/listing/${id}`} className={`block ${className}`}>
      <div className="property-card group">
        {/* Property Image */}
        <div className="relative overflow-hidden">
          <img
            src={image_url}
            alt={title}
            onError={handleImageError}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`type-badge ${type}`}>
              {getPropertyTypeIcon(type)} {getPropertyTypeLabel(type)}
            </span>
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="price-tag">
              {formatPrice(price)}
            </span>
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>

        {/* Property Details */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-realtor-600 transition-colors duration-200">
            {title}
          </h3>
          
          {/* Location */}
          <p className="text-gray-600 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {formatLocation(location)}
          </p>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          {/* Property Features */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {/* Bedrooms */}
              {bedrooms && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                  <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {/* Bathrooms */}
              {bathrooms && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {/* Square Footage */}
              {sqft && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>{sqft.toLocaleString()} sq ft</span>
                </div>
              )}
            </div>
            
            {/* Year Built */}
            {year_built && (
              <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                Built {year_built}
              </div>
            )}
          </div>
        </div>
        
        {/* Hover Effect Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-realtor-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </Link>
  );
};

export default PropertyCard;
