import sqlite3
import os
from typing import List, Dict, Any, Optional
from config import Config

class Database:
    """Database manager for real estate listings"""
    
    def __init__(self, db_path: str = None):
        self.db_path = db_path or Config.DATABASE_PATH
        self.init_database()
    
    def get_connection(self):
        """Get database connection"""
        # Ensure database directory exists
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        return sqlite3.connect(self.db_path)
    
    def init_database(self):
        """Initialize database and create tables"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Create listings table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS listings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT NOT NULL,
                    type TEXT NOT NULL CHECK (type IN ('house', 'condo', 'land')),
                    price INTEGER NOT NULL,
                    location TEXT NOT NULL,
                    image_url TEXT NOT NULL,
                    bedrooms INTEGER,
                    bathrooms INTEGER,
                    sqft INTEGER,
                    year_built INTEGER,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Create indexes for better performance
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_type ON listings(type)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_price ON listings(price)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_location ON listings(location)')
            
            conn.commit()
            
            # Insert mock data if table is empty
            if self.get_listings_count() == 0:
                self.insert_mock_data()
    
    def get_listings_count(self) -> int:
        """Get total number of listings"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) FROM listings')
            return cursor.fetchone()[0]
    
    def insert_mock_data(self):
        """Insert mock real estate listings"""
        mock_listings = [
            # Houses
            {
                'title': 'Beautiful Family Home in Bedford',
                'description': 'Spacious 4-bedroom family home with large backyard, modern kitchen, and finished basement. Perfect for growing families.',
                'type': 'house',
                'price': 750000,
                'location': 'Bedford, NS',
                'image_url': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                'bedrooms': 4,
                'bathrooms': 3,
                'sqft': 2800,
                'year_built': 2015
            },
            {
                'title': 'Oceanfront Luxury Estate',
                'description': 'Stunning oceanfront property with panoramic views, private beach access, and premium finishes throughout.',
                'type': 'house',
                'price': 2500000,
                'location': 'Peggy\'s Cove, NS',
                'image_url': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
                'bedrooms': 5,
                'bathrooms': 4,
                'sqft': 4500,
                'year_built': 2020
            },
            {
                'title': 'Cozy Cottage in Chester',
                'description': 'Charming 2-bedroom cottage with wood fireplace, wrap-around porch, and beautiful garden. Perfect weekend getaway.',
                'type': 'house',
                'price': 450000,
                'location': 'Chester, NS',
                'image_url': 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop',
                'bedrooms': 2,
                'bathrooms': 1,
                'sqft': 1200,
                'year_built': 1985
            },
            {
                'title': 'Modern Townhouse in Dartmouth',
                'description': 'Contemporary 3-bedroom townhouse with open concept living, attached garage, and community amenities.',
                'type': 'house',
                'price': 550000,
                'location': 'Dartmouth, NS',
                'image_url': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
                'bedrooms': 3,
                'bathrooms': 2,
                'sqft': 1800,
                'year_built': 2018
            },
            {
                'title': 'Historic Victorian in Halifax',
                'description': 'Beautifully restored Victorian home with original character, high ceilings, and modern updates. Located in historic district.',
                'type': 'house',
                'price': 1200000,
                'location': 'Halifax, NS',
                'image_url': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
                'bedrooms': 4,
                'bathrooms': 3,
                'sqft': 3200,
                'year_built': 1890
            },
            
            # Condos
            {
                'title': 'Downtown Halifax Condo',
                'description': 'Luxury 2-bedroom condo in the heart of downtown with city views, fitness center, and concierge service.',
                'type': 'condo',
                'price': 650000,
                'location': 'Halifax, NS',
                'image_url': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
                'bedrooms': 2,
                'bathrooms': 2,
                'sqft': 1400,
                'year_built': 2021
            },
            {
                'title': 'Waterfront Condo in Bedford',
                'description': 'Spacious 3-bedroom waterfront condo with balcony, marina views, and resort-style amenities.',
                'type': 'condo',
                'price': 850000,
                'location': 'Bedford, NS',
                'image_url': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
                'bedrooms': 3,
                'bathrooms': 2,
                'sqft': 2000,
                'year_built': 2019
            },
            {
                'title': 'Affordable Student Condo',
                'description': 'Perfect 1-bedroom condo near universities, modern appliances, and included utilities. Great investment property.',
                'type': 'condo',
                'price': 280000,
                'location': 'Halifax, NS',
                'image_url': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                'bedrooms': 1,
                'bathrooms': 1,
                'sqft': 800,
                'year_built': 2010
            },
            {
                'title': 'Luxury Penthouse Suite',
                'description': 'Exclusive penthouse with panoramic city views, private terrace, and premium finishes. The ultimate urban living experience.',
                'type': 'condo',
                'price': 1800000,
                'location': 'Halifax, NS',
                'image_url': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                'bedrooms': 3,
                'bathrooms': 3,
                'sqft': 2500,
                'year_built': 2022
            },
            {
                'title': 'Family Condo in Suburbs',
                'description': 'Large 4-bedroom condo perfect for families, with playground, pool, and plenty of green space.',
                'type': 'condo',
                'price': 720000,
                'location': 'Sackville, NS',
                'image_url': 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
                'bedrooms': 4,
                'bathrooms': 3,
                'sqft': 2200,
                'year_built': 2017
            },
            
            # Land
            {
                'title': 'Development Land in Bedford',
                'description': 'Prime 2-acre development land with municipal services, perfect for residential or commercial development.',
                'type': 'land',
                'price': 450000,
                'location': 'Bedford, NS',
                'image_url': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                'bedrooms': None,
                'bathrooms': None,
                'sqft': 87120,
                'year_built': None
            },
            {
                'title': 'Waterfront Acreage',
                'description': 'Beautiful 5-acre waterfront property with 300 feet of shoreline, perfect for building your dream home.',
                'type': 'land',
                'price': 1200000,
                'location': 'Chester, NS',
                'image_url': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                'bedrooms': None,
                'bathrooms': None,
                'sqft': 217800,
                'year_built': None
            },
            {
                'title': 'Affordable Building Lot',
                'description': 'Well-drained 0.5-acre lot in quiet neighborhood, ready for immediate construction. Great starter home opportunity.',
                'type': 'land',
                'price': 180000,
                'location': 'Sackville, NS',
                'image_url': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                'bedrooms': None,
                'bathrooms': None,
                'sqft': 21780,
                'year_built': None
            },
            {
                'title': 'Commercial Land in Halifax',
                'description': 'High-traffic commercial land in growing business district, perfect for retail or office development.',
                'type': 'land',
                'price': 850000,
                'location': 'Halifax, NS',
                'image_url': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                'bedrooms': None,
                'bathrooms': None,
                'sqft': 43560,
                'year_built': None
            },
            {
                'title': 'Rural Farmland',
                'description': 'Expansive 20-acre farmland with rich soil, perfect for agricultural use or rural estate development.',
                'type': 'land',
                'price': 350000,
                'location': 'Truro, NS',
                'image_url': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                'bedrooms': None,
                'bathrooms': None,
                'sqft': 871200,
                'year_built': None
            }
        ]
        
        with self.get_connection() as conn:
            cursor = conn.cursor()
            for listing in mock_listings:
                cursor.execute('''
                    INSERT INTO listings (title, description, type, price, location, image_url, bedrooms, bathrooms, sqft, year_built)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    listing['title'],
                    listing['description'],
                    listing['type'],
                    listing['price'],
                    listing['location'],
                    listing['image_url'],
                    listing['bedrooms'],
                    listing['bathrooms'],
                    listing['sqft'],
                    listing['year_built']
                ))
            conn.commit()
    
    def get_all_listings(self, limit: int = None) -> List[Dict[str, Any]]:
        """Get all listings with optional limit"""
        with self.get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            
            query = 'SELECT * FROM listings ORDER BY created_at DESC'
            if limit:
                query += f' LIMIT {limit}'
            
            cursor.execute(query)
            rows = cursor.fetchall()
            
            return [dict(row) for row in rows]
    
    def search_listings(self, filters: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Search listings based on filters"""
        with self.get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            
            # Build dynamic query
            query_parts = ['SELECT * FROM listings WHERE 1=1']
            params = []
            
            if filters.get('type'):
                query_parts.append('AND type = ?')
                params.append(filters['type'])
            
            if filters.get('min_price'):
                query_parts.append('AND price >= ?')
                params.append(filters['min_price'])
            
            if filters.get('max_price'):
                query_parts.append('AND price <= ?')
                params.append(filters['max_price'])
            
            if filters.get('location'):
                query_parts.append('AND location LIKE ?')
                params.append(f'%{filters["location"]}%')
            
            if filters.get('min_bedrooms'):
                query_parts.append('AND bedrooms >= ?')
                params.append(filters['min_bedrooms'])
            
            if filters.get('max_bedrooms'):
                query_parts.append('AND bedrooms <= ?')
                params.append(filters['max_bedrooms'])
            
            query = ' '.join(query_parts) + ' ORDER BY price ASC'
            
            cursor.execute(query, params)
            rows = cursor.fetchall()
            
            return [dict(row) for row in rows]
    
    def get_listings_by_type(self, property_type: str) -> List[Dict[str, Any]]:
        """Get listings by property type"""
        return self.search_listings({'type': property_type})
    
    def get_listing_by_id(self, listing_id: int) -> Optional[Dict[str, Any]]:
        """Get a specific listing by ID"""
        with self.get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            
            cursor.execute('SELECT * FROM listings WHERE id = ?', (listing_id,))
            row = cursor.fetchone()
            
            return dict(row) if row else None
