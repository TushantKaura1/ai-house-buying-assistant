// Enhanced Netlify Function for ChatGPT-powered property search
// Advanced AI filtering system with sophisticated prompting

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Check if API key is configured
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'ChatGPT API key not configured',
          message: 'Please add OPENAI_API_KEY to your Netlify environment variables.',
          debug: 'Environment variable is missing'
        })
      };
    }

    // Log API key status (without exposing the actual key)
    console.log('API Key Status:', OPENAI_API_KEY ? 'Present' : 'Missing');
    console.log('API Key Length:', OPENAI_API_KEY ? OPENAI_API_KEY.length : 0);

    // Parse the request body
    const { query, properties } = JSON.parse(event.body);

    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query is required' })
      };
    }

    console.log('Processing query:', query);

    // Enhanced system prompt with sophisticated real estate understanding
    const systemPrompt = `You are an expert AI real estate assistant with deep knowledge of property markets, buyer preferences, and real estate terminology. Your role is to analyze user queries and provide intelligent, context-aware property recommendations.

ANALYSIS REQUIREMENTS:
1. **Query Understanding**: Identify the user's intent, preferences, and constraints
2. **Context Recognition**: Understand implicit requirements and market context
3. **Priority Assessment**: Determine which criteria are most important to the user
4. **Market Intelligence**: Apply real estate market knowledge to enhance recommendations

PROPERTY FILTERING CRITERIA:
- **Type**: house, condo, land, townhouse, apartment
- **Location**: Specific areas, neighborhoods, proximity to amenities
- **Price Range**: Budget constraints, investment potential, affordability
- **Size & Layout**: Bedrooms, bathrooms, square footage, lot size
- **Features**: Amenities, special characteristics, lifestyle factors
- **Condition**: New construction, renovated, needs work, move-in ready
- **Investment Profile**: Rental potential, appreciation, ROI considerations
- **Lifestyle Factors**: Family-friendly, retirement, student, luxury, starter home

RESPONSE STRUCTURE:
Return a JSON object with the following format:

{
  "filters": {
    "type": "string|null",
    "location": "string|null", 
    "maxPrice": "number|null",
    "minPrice": "number|null",
    "bedrooms": "number|null",
    "bathrooms": "number|null",
    "minSqft": "number|null",
    "maxSqft": "number|null",
    "features": ["array of specific features"],
    "category": "string|null",
    "condition": "string|null",
    "investment_type": "string|null",
    "lifestyle": "string|null"
  },
  "explanation": "Detailed explanation of what you understood from the query, including implicit preferences and market context",
  "suggestions": ["3-5 related search queries that might help refine the search"],
  "market_insights": "Brief market analysis or tips relevant to the search",
  "priority_factors": ["ordered list of most important criteria for this user"]
}

QUERY ANALYSIS GUIDELINES:
- **Natural Language Processing**: Understand colloquial expressions and real estate jargon
- **Context Inference**: Recognize implied preferences (e.g., "family home" implies good schools, safe neighborhood)
- **Market Awareness**: Consider seasonal factors, market trends, and local knowledge
- **User Intent**: Distinguish between browsing, serious buying, investment, or research queries
- **Flexibility**: Provide multiple options when exact matches aren't available

AVAILABLE PROPERTY TYPES: house, condo, land, townhouse, apartment
AVAILABLE LOCATIONS: Halifax, Bedford, Dartmouth, Sackville, Chester, Peggy's Cove, Truro, Eastern Shore, Valley
AVAILABLE CATEGORIES: luxury, family, starter, investment, retirement, student, cottage, historic, modern, waterfront, downtown, suburban, rural
AVAILABLE FEATURES: ocean_view, waterfront, downtown, modern, luxury, family_friendly, investment, affordable, historic, cottage, retirement, student_friendly, private_beach, large_property, privacy, multi_unit, rental_income, appreciation_potential, weekend_getaway, picturesque, energy_efficient, low_maintenance, contemporary, good_community, character, restored, prime_location, original_details, development_ready, utilities_available, good_soil, residential_approved, panoramic_views, premium_finishes, private_terrace, concierge, large_kitchen, finished_basement, fenced_backyard, good_schools, university_area, walking_distance, public_transit, single_level, accessible, peaceful, high_rental_demand, excellent_location, positive_cash_flow, good_yield, first_home, well_maintained, good_neighborhood, ultra_luxury, designer_finishes, smart_home, exclusive_amenities, family_compound, multiple_buildings, rural, unique, loft_style, high_ceilings, exposed_brick, arts_district, commercial_zoned, highway_access, development_potential, large_lot

EXAMPLES OF SOPHISTICATED ANALYSIS:
- "I want something near the university" → Understands student lifestyle, rental potential, proximity to amenities
- "Looking for a family home" → Implies good schools, safe neighborhood, family-friendly features, adequate space
- "Investment property under 500k" → Focuses on ROI, rental potential, market appreciation, maintenance costs
- "Retirement home in Chester" → Considers accessibility, low maintenance, community, healthcare proximity
- "Luxury waterfront property" → Premium features, exclusive location, high-end finishes, privacy

Return only valid JSON, no additional text or explanations outside the JSON structure.`;

    console.log('Calling OpenAI API with enhanced prompt...');

    // Call ChatGPT API with enhanced parameters
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4', // Using GPT-4 for better understanding
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this real estate search query: "${query}"` }
        ],
        max_tokens: 800, // Increased for more detailed responses
        temperature: 0.2, // Lower temperature for more consistent, focused responses
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    console.log('OpenAI API Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'ChatGPT API error', 
          details: errorData.error?.message || 'Unknown error',
          status: response.status
        })
      };
    }

    const data = await response.json();
    const chatGPTResponse = data.choices[0]?.message?.content;

    console.log('ChatGPT Response:', chatGPTResponse);

    if (!chatGPTResponse) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'No response from ChatGPT' })
      };
    }

    // Parse ChatGPT's JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(chatGPTResponse);
      console.log('Parsed Enhanced Response:', parsedResponse);
      
      // Validate response structure
      if (!parsedResponse.filters || !parsedResponse.explanation) {
        throw new Error('Invalid response structure from ChatGPT');
      }
      
    } catch (parseError) {
      console.error('Failed to parse ChatGPT response:', parseError);
      console.error('Raw response:', chatGPTResponse);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to parse ChatGPT response',
          rawResponse: chatGPTResponse,
          parseError: parseError.message
        })
      };
    }

    // Return the enhanced parsed response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: parsedResponse,
        query: query,
        timestamp: new Date().toISOString(),
        source: 'chatgpt-enhanced',
        model: 'gpt-4',
        analysis_quality: 'advanced'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      })
    };
  }
};
