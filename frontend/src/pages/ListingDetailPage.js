import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatPrice, formatLocation, getPropertyTypeIcon, getPropertyTypeLabel } from '../utils/formatters';
import smartFilterService from '../services/smartFilter';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    loadListingDetails();
  }, [id]);

  const loadListingDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = smartFilterService.getPropertyById(id);
      
      if (response) {
        setListing(response);
      } else {
        setError('Listing not found');
      }
    } catch (error) {
      setError('Failed to load listing details');
      console.error('Error loading listing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop';
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The listing you are looking for does not exist.'}</p>
          <button onClick={goBack} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Create image gallery (main image + fallback)
  const images = [
    listing.image_url,
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={goBack}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-medium text-gray-900">{listing.title}</h1>
              <p className="text-sm text-gray-600">{formatLocation(listing.location)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={images[activeImageIndex]}
                  alt={listing.title}
                  onError={handleImageError}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          index === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        index === activeImageIndex ? 'border-realtor-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h2>
                  <p className="text-xl text-gray-600 mb-4">{formatLocation(listing.location)}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`type-badge ${listing.type}`}>
                      {getPropertyTypeIcon(listing.type)} {getPropertyTypeLabel(listing.type)}
                    </span>
                    {listing.year_built && (
                      <span className="text-sm text-gray-500">
                        Built {listing.year_built}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-realtor-600 mb-2">
                    {formatPrice(listing.price)}
                  </div>
                  <p className="text-sm text-gray-500">Asking Price</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listing.bedrooms && (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-realtor-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-realtor-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{listing.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  </div>
                )}

                {listing.bathrooms && (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-realtor-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-realtor-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{listing.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  </div>
                )}

                {listing.sqft && (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-realtor-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-realtor-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{listing.sqft.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Square Feet</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-realtor-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-realtor-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{formatLocation(listing.location)}</div>
                    <div className="text-sm text-gray-600">Location</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this property?</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    placeholder="Tell us about your interest..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Contact Agent
                </button>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Save to Favorites</span>
                </button>
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share Property</span>
                </button>
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Schedule Viewing</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
