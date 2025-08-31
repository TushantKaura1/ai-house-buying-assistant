import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatSqft, formatBedrooms, formatBathrooms, getPropertyTypeIcon, getPropertyTypeColor } from '../utils/formatters';

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    price,
    type,
    location,
    bedrooms,
    bathrooms,
    sqft,
    image_url,
    category,
    features = [],
    description
  } = property;

  const typeIcon = getPropertyTypeIcon(type);
  const typeColor = getPropertyTypeColor(type);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-4xl text-gray-500">🏠</span>
          </div>
        )}
        
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${typeColor === 'blue' ? 'bg-blue-100 text-blue-800' : typeColor === 'green' ? 'bg-green-100 text-green-800' : typeColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
            <span className="mr-1">{typeIcon}</span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold bg-white/90 text-gray-900 shadow-lg backdrop-blur-sm">
            {formatPrice(price)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{location}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{formatBedrooms(bedrooms)}</div>
            <div className="text-xs text-gray-500">Bedrooms</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{formatBathrooms(bathrooms)}</div>
            <div className="text-xs text-gray-500">Bathrooms</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{formatSqft(sqft)}</div>
            <div className="text-xs text-gray-500">Square Feet</div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                >
                  {feature.replace(/_/g, ' ')}
                </span>
              ))}
              {features.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Link
          to={`/property/${id}`}
          className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          View Details
          <svg className="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

