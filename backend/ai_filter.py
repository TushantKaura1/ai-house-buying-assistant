import re
import openai
from typing import Dict, Any, Optional
from config import Config
from datetime import datetime

class AIFilter:
    """AI-powered natural language query parser for real estate searches"""
    
    def __init__(self):
        self.client = None
        if Config.OPENAI_API_KEY:
            try:
                openai.api_key = Config.OPENAI_API_KEY
                self.client = openai
            except Exception as e:
                print(f"Warning: Could not initialize OpenAI client: {e}")
    
    def parse_query(self, query: str) -> Dict[str, Any]:
        """
        Parse natural language query into structured filters
        
        Args:
            query (str): Natural language query like "affordable condos in Halifax under $500,000"
            
        Returns:
            Dict containing structured filters
        """
        if not self.client:
            return self._fallback_parse(query)
        
        try:
            return self._gpt_parse(query)
        except Exception as e:
            print(f"OpenAI parsing failed, falling back to regex: {e}")
            return self._fallback_parse(query)
    
    def _gpt_parse(self, query: str) -> Dict[str, Any]:
        """Use OpenAI GPT to parse the query"""
        system_prompt = """
        You are a real estate search assistant. Parse the user's natural language query into structured filters.
        
        Extract the following information:
        - property_type: house, condo, or land
        - location: city or area mentioned
        - min_price: minimum price if mentioned
        - max_price: maximum price if mentioned
        - min_bedrooms: minimum bedrooms if mentioned
        - max_bedrooms: maximum bedrooms if mentioned
        - keywords: any other relevant search terms
        
        Return only a JSON object with these fields. Use null for missing values.
        
        Examples:
        "affordable condos in Halifax under $500,000" → {"property_type": "condo", "location": "Halifax", "max_price": 500000, "keywords": "affordable"}
        "houses with 3+ bedrooms near the ocean" → {"property_type": "house", "min_bedrooms": 3, "keywords": "ocean"}
        "cheap land near Bedford" → {"property_type": "land", "location": "Bedford", "keywords": "cheap"}
        """
        
        response = self.client.ChatCompletion.create(
            model=Config.OPENAI_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query}
            ],
            temperature=0.1,
            max_tokens=200
        )
        
        try:
            import json
            result = json.loads(response.choices[0].message.content)
            
            # Convert to our filter format
            filters = {}
            
            if result.get('property_type'):
                filters['type'] = result['property_type']
            
            if result.get('location'):
                filters['location'] = result['location']
            
            if result.get('min_price'):
                filters['min_price'] = result['min_price']
            
            if result.get('max_price'):
                filters['max_price'] = result['max_price']
            
            if result.get('min_bedrooms'):
                filters['min_bedrooms'] = result['min_bedrooms']
            
            if result.get('max_bedrooms'):
                filters['max_bedrooms'] = result['max_bedrooms']
            
            # Add keywords for context
            if result.get('keywords'):
                filters['keywords'] = result['keywords']
            
            return filters
            
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Failed to parse GPT response: {e}")
            return self._fallback_parse(query)
    
    def _fallback_parse(self, query: str) -> Dict[str, Any]:
        """Fallback regex-based parsing when AI is not available"""
        query_lower = query.lower()
        filters = {}
        
        # Property type detection
        if 'house' in query_lower or 'home' in query_lower:
            filters['type'] = 'house'
        elif 'condo' in query_lower or 'apartment' in query_lower:
            filters['type'] = 'condo'
        elif 'land' in query_lower or 'lot' in query_lower or 'acre' in query_lower:
            filters['type'] = 'land'
        
        # Location detection
        locations = ['halifax', 'bedford', 'dartmouth', 'sackville', 'chester', 'peggy\'s cove', 'truro']
        for location in locations:
            if location in query_lower:
                filters['location'] = location.title()
                break
        
        # Price detection
        price_patterns = [
            r'under \$?(\d+(?:,\d{3})*(?:k|000)?)',  # under $500k, under $500,000
            r'less than \$?(\d+(?:,\d{3})*(?:k|000)?)',  # less than $500k
            r'max \$?(\d+(?:,\d{3})*(?:k|000)?)',  # max $500k
            r'up to \$?(\d+(?:,\d{3})*(?:k|000)?)',  # up to $500k
            r'over \$?(\d+(?:,\d{3})*(?:k|000)?)',  # over $500k
            r'more than \$?(\d+(?:,\d{3})*(?:k|000)?)',  # more than $500k
            r'min \$?(\d+(?:,\d{3})*(?:k|000)?)',  # min $500k
        ]
        
        for pattern in price_patterns:
            match = re.search(pattern, query_lower)
            if match:
                price_str = match.group(1)
                # Convert k to thousands
                if 'k' in price_str:
                    price = int(price_str.replace('k', '')) * 1000
                else:
                    price = int(price_str.replace(',', ''))
                
                if 'under' in pattern or 'less than' in pattern or 'max' in pattern or 'up to' in pattern:
                    filters['max_price'] = price
                elif 'over' in pattern or 'more than' in pattern or 'min' in pattern:
                    filters['min_price'] = price
                break
        
        # Bedroom detection
        bedroom_patterns = [
            r'(\d+)\+?\s*bedroom',  # 3+ bedroom, 3 bedroom
            r'bedroom.*?(\d+)\+?',  # bedroom 3+
            r'(\d+)\+?\s*br',  # 3+ br
            r'br.*?(\d+)\+?',  # br 3+
        ]
        
        for pattern in bedroom_patterns:
            match = re.search(pattern, query_lower)
            if match:
                bedrooms = int(match.group(1))
                if '+' in pattern:
                    filters['min_bedrooms'] = bedrooms
                else:
                    filters['min_bedrooms'] = bedrooms
                    filters['max_bedrooms'] = bedrooms
                break
        
        # Keyword detection for context
        keywords = []
        if any(word in query_lower for word in ['cheap', 'affordable', 'budget']):
            keywords.append('affordable')
        if any(word in query_lower for word in ['luxury', 'premium', 'high-end']):
            keywords.append('luxury')
        if any(word in query_lower for word in ['ocean', 'waterfront', 'beach']):
            keywords.append('waterfront')
        if any(word in query_lower for word in ['downtown', 'city', 'urban']):
            keywords.append('urban')
        if any(word in query_lower for word in ['suburban', 'quiet', 'family']):
            keywords.append('family-friendly')
        
        if keywords:
            filters['keywords'] = ', '.join(keywords)
        
        return filters
    
    def enhance_filters(self, filters: Dict[str, Any], query: str) -> Dict[str, Any]:
        """Enhance filters with additional context and smart defaults"""
        enhanced = filters.copy()
        
        # If no property type specified, don't filter by type
        if 'type' not in enhanced:
            enhanced['show_all_types'] = True
        
        # If no location specified, don't filter by location
        if 'location' not in enhanced:
            enhanced['show_all_locations'] = True
        
        # Add price context based on keywords
        if 'keywords' in enhanced:
            if 'affordable' in enhanced['keywords']:
                if 'max_price' not in enhanced:
                    enhanced['max_price'] = 500000
            elif 'luxury' in enhanced['keywords']:
                if 'min_price' not in enhanced:
                    enhanced['min_price'] = 1000000
        
        # Add search metadata
        enhanced['original_query'] = query
        enhanced['parsed_at'] = str(datetime.now())
        
        return enhanced
    
    def get_search_suggestions(self, query: str) -> list:
        """Get search suggestions based on the query"""
        suggestions = []
        
        # Common search patterns
        if 'affordable' in query.lower():
            suggestions.extend([
                "affordable condos in Halifax under $400,000",
                "cheap houses in Bedford under $600,000",
                "budget-friendly land in Sackville under $300,000"
            ])
        
        if 'luxury' in query.lower():
            suggestions.extend([
                "luxury homes in Halifax over $1,000,000",
                "premium condos with ocean views",
                "high-end properties in Chester"
            ])
        
        if 'family' in query.lower():
            suggestions.extend([
                "family homes with 3+ bedrooms in Bedford",
                "houses near schools in Dartmouth",
                "family-friendly condos with playground"
            ])
        
        if 'investment' in query.lower():
            suggestions.extend([
                "investment properties under $500,000",
                "rental condos in Halifax",
                "commercial land for development"
            ])
        
        # Default suggestions
        if not suggestions:
            suggestions = [
                "affordable condos in Halifax under $500,000",
                "houses with 3+ bedrooms near the ocean",
                "cheap land near Bedford",
                "luxury homes in downtown area",
                "family properties under $800,000"
            ]
        
        return suggestions[:5]  # Limit to 5 suggestions
