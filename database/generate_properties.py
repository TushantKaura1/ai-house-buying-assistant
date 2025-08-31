#!/usr/bin/env python3
"""
Generate 100+ diverse properties for the AI Realtor Assistant
"""

import json
import random
from typing import List, Dict, Any

# Base property templates
PROPERTY_TEMPLATES = {
    "house": {
        "styles": ["Colonial", "Victorian", "Craftsman", "Modern", "Tudor", "Ranch", "Cape Cod", "Farmhouse", "Contemporary", "Mediterranean"],
        "conditions": ["Excellent", "Very Good", "Good", "Fair", "Needs Work"],
        "features": [
            "Hardwood Floors", "Fireplace", "Garage", "Basement", "Deck", "Garden", "Pool", "Central AC", "Updated Kitchen", "Master Suite",
            "Walk-in Closet", "Home Office", "Mudroom", "Laundry Room", "Storage Shed", "Fenced Yard", "Patio", "Sunroom", "Wine Cellar", "Gym"
        ]
    },
    "condo": {
        "styles": ["Modern", "Contemporary", "Traditional", "Luxury", "Loft", "Studio", "Penthouse", "Townhouse", "Garden", "High-rise"],
        "conditions": ["Excellent", "Very Good", "Good", "Fair"],
        "features": [
            "Balcony", "Gym Access", "Pool", "Concierge", "Underground Parking", "Storage Unit", "High Ceilings", "Modern Appliances",
            "Granite Countertops", "Walk-in Closet", "In-unit Laundry", "Smart Home", "Rooftop Access", "Fitness Center", "Lounge"
        ]
    },
    "land": {
        "styles": ["Waterfront", "Mountain", "Rural", "Suburban", "Beachfront", "Forest", "Farmland", "Hillside", "Flat", "Sloped"],
        "conditions": ["Raw Land", "Cleared", "Partially Cleared", "Ready to Build"],
        "features": [
            "Ocean Frontage", "Mountain Views", "Mature Trees", "Wildlife", "Privacy", "Rich Soil", "Natural Water", "Well Access",
            "Septic Ready", "Road Access", "Utilities Available", "Farming Potential", "Hunting", "Fishing", "Hiking Trails"
        ]
    }
}

# Location templates with price ranges
LOCATIONS = {
    "Downtown Halifax": {"price_range": (400000, 2000000), "type_bias": ["condo", "house"]},
    "South End": {"price_range": (600000, 3000000), "type_bias": ["house", "condo"]},
    "North End": {"price_range": (300000, 1200000), "type_bias": ["house", "condo"]},
    "West End": {"price_range": (250000, 800000), "type_bias": ["house", "condo"]},
    "Clayton Park": {"price_range": (400000, 1000000), "type_bias": ["house", "condo"]},
    "Bedford": {"price_range": (500000, 1500000), "type_bias": ["house", "land"]},
    "Dartmouth": {"price_range": (250000, 800000), "type_bias": ["house", "condo"]},
    "Spryfield": {"price_range": (200000, 600000), "type_bias": ["house", "land"]},
    "Eastern Shore": {"price_range": (200000, 3000000), "type_bias": ["land", "house"]},
    "Valley": {"price_range": (150000, 1200000), "type_bias": ["land", "house"]},
    "Truro": {"price_range": (180000, 800000), "type_bias": ["land", "house"]},
    "Lunenburg": {"price_range": (300000, 1500000), "type_bias": ["house", "land"]},
    "Mahone Bay": {"price_range": (400000, 2500000), "type_bias": ["house", "land"]},
    "Chester": {"price_range": (500000, 5000000), "type_bias": ["house", "land"]},
    "Peggy's Cove": {"price_range": (600000, 4000000), "type_bias": ["house", "land"]},
    "Wolfville": {"price_range": (350000, 1200000), "type_bias": ["house", "land"]},
    "Kentville": {"price_range": (250000, 800000), "type_bias": ["house", "land"]},
    "Bridgewater": {"price_range": (200000, 700000), "type_bias": ["house", "land"]},
    "Yarmouth": {"price_range": (180000, 600000), "type_bias": ["house", "land"]},
    "Sydney": {"price_range": (150000, 500000), "type_bias": ["house", "land"]}
}

# Image URLs for different property types
IMAGE_URLS = {
    "house": [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    ],
    "condo": [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
    ],
    "land": [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ]
}

def generate_property_id() -> int:
    """Generate unique property ID"""
    return random.randint(1000, 9999)

def generate_price(property_type: str, location: str) -> int:
    """Generate realistic price based on property type and location"""
    base_range = LOCATIONS[location]["price_range"]
    
    if property_type == "land":
        multiplier = random.uniform(0.3, 0.8)
    elif property_type == "condo":
        multiplier = random.uniform(0.7, 1.3)
    else:  # house
        multiplier = random.uniform(0.8, 1.5)
    
    base_price = random.uniform(base_range[0], base_range[1])
    return int(base_price * multiplier)

def generate_bedrooms(property_type: str) -> int:
    """Generate realistic bedroom count"""
    if property_type == "land":
        return None
    elif property_type == "condo":
        return random.choices([0, 1, 2, 3], weights=[0.1, 0.3, 0.4, 0.2])[0]
    else:  # house
        return random.choices([2, 3, 4, 5, 6], weights=[0.1, 0.3, 0.3, 0.2, 0.1])[0]

def generate_bathrooms(property_type: str, bedrooms: int) -> float:
    """Generate realistic bathroom count"""
    if property_type == "land":
        return None
    
    if bedrooms == 0:  # studio
        return 1
    elif bedrooms == 1:
        return random.choices([1, 1.5], weights=[0.7, 0.3])[0]
    else:
        base_bathrooms = bedrooms - 1
        if random.random() < 0.3:  # 30% chance of extra bathroom
            base_bathrooms += 0.5
        return base_bathrooms

def generate_sqft(property_type: str, bedrooms: int) -> int:
    """Generate realistic square footage"""
    if property_type == "land":
        return None
    
    if property_type == "condo":
        if bedrooms == 0:  # studio
            return random.randint(400, 800)
        elif bedrooms == 1:
            return random.randint(600, 1200)
        elif bedrooms == 2:
            return random.randint(800, 1500)
        else:  # 3+ bedrooms
            return random.randint(1200, 2000)
    else:  # house
        if bedrooms == 2:
            return random.randint(1000, 1800)
        elif bedrooms == 3:
            return random.randint(1500, 2500)
        elif bedrooms == 4:
            return random.randint(2000, 3500)
        else:  # 5+ bedrooms
            return random.randint(3000, 5000)

def generate_year_built(property_type: str) -> int:
    """Generate realistic year built"""
    if property_type == "land":
        return None
    
    current_year = 2024
    if property_type == "condo":
        # Condos tend to be newer
        return random.randint(1980, current_year)
    else:  # house
        # Houses have more variation
        return random.randint(1900, current_year)

def generate_features(property_type: str, count: int = 4) -> List[str]:
    """Generate realistic features for the property"""
    available_features = PROPERTY_TEMPLATES[property_type]["features"]
    return random.sample(available_features, min(count, len(available_features)))

def generate_property_tax(price: int) -> int:
    """Generate realistic property tax (1-2% of price)"""
    rate = random.uniform(0.01, 0.02)
    return int(price * rate)

def generate_maintenance_fee(property_type: str, price: int) -> int:
    """Generate realistic maintenance fee"""
    if property_type == "land":
        return 0
    elif property_type == "condo":
        # Condos have monthly maintenance fees
        return random.randint(200, 800)
    else:  # house
        # Houses might have small HOA fees
        return random.randint(0, 300)

def generate_lot_size(property_type: str) -> float:
    """Generate realistic lot size"""
    if property_type == "land":
        return round(random.uniform(1.0, 50.0), 1)
    elif property_type == "condo":
        return None
    else:  # house
        return round(random.uniform(0.1, 2.0), 2)

def generate_property(property_id: int, property_type: str, location: str) -> Dict[str, Any]:
    """Generate a single property"""
    
    # Generate basic attributes
    bedrooms = generate_bedrooms(property_type)
    bathrooms = generate_bathrooms(property_type, bedrooms) if bedrooms else None
    sqft = generate_sqft(property_type, bedrooms) if bedrooms else None
    year_built = generate_year_built(property_type)
    
    # Generate price
    price = generate_price(property_type, location)
    
    # Generate other attributes
    style = random.choice(PROPERTY_TEMPLATES[property_type]["styles"])
    condition = random.choice(PROPERTY_TEMPLATES[property_type]["conditions"])
    features = generate_features(property_type)
    image_url = random.choice(IMAGE_URLS[property_type])
    
    # Generate title
    title_parts = [
        random.choice([style, "Beautiful", "Charming", "Modern", "Luxurious", "Cozy", "Spacious"]),
        property_type.title(),
        random.choice(["in", "at", "near"]),
        location
    ]
    title = " ".join(title_parts)
    
    # Generate description
    description = f"Stunning {style.lower()} {property_type} featuring {', '.join(features[:3])}. "
    if bedrooms and bedrooms > 0:
        description += f"Boasts {bedrooms} bedroom{'s' if bedrooms > 1 else ''}"
        if bathrooms:
            description += f" and {bathrooms} bathroom{'s' if bathrooms > 1 else ''}"
        description += ". "
    description += f"Located in the desirable {location} area. Perfect for {'families' if bedrooms and bedrooms > 2 else 'professionals' if bedrooms and bedrooms <= 1 else 'couples'}."
    
    return {
        "id": property_id,
        "title": title,
        "type": property_type,
        "price": price,
        "location": location,
        "description": description,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "sqft": sqft,
        "year_built": year_built,
        "image_url": image_url,
        "features": features,
        "property_tax": generate_property_tax(price),
        "maintenance_fee": generate_maintenance_fee(property_type, price),
        "lot_size": generate_lot_size(property_type),
        "style": style,
        "condition": condition
    }

def generate_properties(count: int = 120) -> List[Dict[str, Any]]:
    """Generate multiple properties"""
    properties = []
    property_id = 1000
    
    # Ensure we have a good mix of property types
    type_distribution = {
        "house": int(count * 0.5),      # 50% houses
        "condo": int(count * 0.3),     # 30% condos
        "land": int(count * 0.2)       # 20% land
    }
    
    for property_type, type_count in type_distribution.items():
        for _ in range(type_count):
            location = random.choice(list(LOCATIONS.keys()))
            property_data = generate_property(property_id, property_type, location)
            properties.append(property_data)
            property_id += 1
    
    # Shuffle to mix up the order
    random.shuffle(properties)
    
    # Reassign IDs to be sequential
    for i, prop in enumerate(properties, 1):
        prop["id"] = i
    
    return properties

def main():
    """Main function to generate and save properties"""
    print("🏠 Generating 120+ diverse properties...")
    
    # Set random seed for reproducibility
    random.seed(42)
    
    # Generate properties
    properties = generate_properties(120)
    
    # Create output data
    output_data = {
        "properties": properties,
        "metadata": {
            "total_count": len(properties),
            "type_distribution": {},
            "price_ranges": {},
            "locations": list(LOCATIONS.keys())
        }
    }
    
    # Calculate statistics
    for prop in properties:
        prop_type = prop["type"]
        if prop_type not in output_data["metadata"]["type_distribution"]:
            output_data["metadata"]["type_distribution"][prop_type] = 0
        output_data["metadata"]["type_distribution"][prop_type] += 1
    
    # Calculate price ranges
    prices = [prop["price"] for prop in properties if prop["price"]]
    if prices:
        output_data["metadata"]["price_ranges"] = {
            "min": min(prices),
            "max": max(prices),
            "average": int(sum(prices) / len(prices))
        }
    
    # Save to file
    output_file = "properties_extended.json"
    with open(output_file, 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated {len(properties)} properties")
    print(f"📁 Saved to: {output_file}")
    
    # Print summary
    print("\n📊 Property Summary:")
    for prop_type, count in output_data["metadata"]["type_distribution"].items():
        print(f"   {prop_type.title()}s: {count}")
    
    if output_data["metadata"]["price_ranges"]:
        ranges = output_data["metadata"]["price_ranges"]
        print(f"\n💰 Price Ranges:")
        print(f"   Min: ${ranges['min']:,}")
        print(f"   Max: ${ranges['max']:,}")
        print(f"   Average: ${ranges['average']:,}")
    
    print(f"\n📍 Locations: {len(LOCATIONS)} different areas")

if __name__ == "__main__":
    main()
