from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import Config
from database import Database
from ai_filter import AIFilter

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize CORS
CORS(app, origins=Config.CORS_ORIGINS, supports_credentials=True)

# Initialize components
db = Database()
ai_filter = AIFilter()

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'AI Realtor Assistant API',
        'version': '1.0.0',
        'endpoints': {
            'GET /api/listings': 'Get all property listings',
            'POST /api/search': 'Search properties with natural language query',
            'GET /api/types/<type>': 'Get listings by property type'
        }
    })

@app.route(f'{Config.API_PREFIX}/listings', methods=['GET'])
def get_listings():
    """Get all property listings"""
    try:
        limit = request.args.get('limit', type=int)
        listings = db.get_all_listings(limit=limit)
        
        return jsonify({
            'success': True,
            'data': {
                'listings': listings,
                'total': len(listings),
                'limit': limit
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route(f'{Config.API_PREFIX}/listings/<property_type>', methods=['GET'])
def get_listings_by_type(property_type):
    """Get listings by property type"""
    try:
        if property_type not in ['house', 'condo', 'land']:
            return jsonify({
                'success': False,
                'error': 'Invalid property type. Must be house, condo, or land.'
            }), 400
        
        listings = db.get_listings_by_type(property_type)
        
        return jsonify({
            'success': True,
            'data': {
                'listings': listings,
                'total': len(listings),
                'type': property_type
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route(f'{Config.API_PREFIX}/search', methods=['POST'])
def search_listings():
    """Search properties using AI-powered natural language query"""
    try:
        data = request.get_json()
        
        if not data or 'query' not in data:
            return jsonify({
                'success': False,
                'error': 'Query parameter is required'
            }), 400
        
        query = data['query'].strip()
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'Query cannot be empty'
            }), 400
        
        # Parse query using AI
        filters = ai_filter.parse_query(query)
        
        # Enhance filters with additional context
        enhanced_filters = ai_filter.enhance_filters(filters, query)
        
        # Search database
        results = db.search_listings(enhanced_filters)
        
        # Limit results
        if len(results) > Config.MAX_SEARCH_RESULTS:
            results = results[:Config.MAX_SEARCH_RESULTS]
        
        # Get search suggestions
        suggestions = ai_filter.get_search_suggestions(query)
        
        return jsonify({
            'success': True,
            'data': {
                'results': results,
                'total': len(results),
                'query': query,
                'filters_applied': enhanced_filters,
                'suggestions': suggestions
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route(f'{Config.API_PREFIX}/listings/detail/<int:listing_id>', methods=['GET'])
def get_listing_detail(listing_id):
    """Get detailed information about a specific listing"""
    try:
        listing = db.get_listing_by_id(listing_id)
        
        if not listing:
            return jsonify({
                'success': False,
                'error': 'Listing not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': listing
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route(f'{Config.API_PREFIX}/stats', methods=['GET'])
def get_stats():
    """Get database statistics"""
    try:
        total_listings = db.get_listings_count()
        
        # Get counts by type
        houses = len(db.get_listings_by_type('house'))
        condos = len(db.get_listings_by_type('condo'))
        land = len(db.get_listings_by_type('land'))
        
        return jsonify({
            'success': True,
            'data': {
                'total_listings': total_listings,
                'by_type': {
                    'houses': houses,
                    'condos': condos,
                    'land': land
                }
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    # Check if OpenAI API key is set
    if not Config.OPENAI_API_KEY:
        print("Warning: OPENAI_API_KEY not set. AI features will use fallback parsing.")
    
    print(f"Starting AI Realtor Assistant API...")
    print(f"Database: {Config.DATABASE_PATH}")
    print(f"API Prefix: {Config.API_PREFIX}")
    print(f"CORS Origins: {Config.CORS_ORIGINS}")
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=Config.DEBUG
    )
