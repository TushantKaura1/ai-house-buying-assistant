// Netlify Function for ChatGPT-powered property search
// This keeps your API key secure on the server side

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
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'ChatGPT API key not configured. Please add OPENAI_API_KEY to your Netlify environment variables.',
          message: 'Contact your administrator to configure the API key.'
        })
      };
    }

    // Parse the request body
    const { query, properties } = JSON.parse(event.body);

    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query is required' })
      };
    }

    // Create the prompt for ChatGPT
    const systemPrompt = `You are an AI real estate assistant. Analyze the user's query and return a JSON response with the following structure:

{
  "filters": {
    "type": "house|condo|land|null",
    "location": "specific_location|null",
    "maxPrice": number|null,
    "minPrice": number|null,
    "bedrooms": number|null,
    "features": ["feature1", "feature2"],
    "category": "luxury|family|starter|investment|retirement|student|cottage|historic|modern|null"
  },
  "explanation": "Brief explanation of what you understood from the query",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}

User query: "${query}"

Available property types: house, condo, land
Available locations: Halifax, Bedford, Dartmouth, Sackville, Chester, Peggy's Cove, Truro, Eastern Shore, Valley
Available categories: luxury, family, starter, investment, retirement, student, cottage, historic, modern
Available features: ocean_view, waterfront, downtown, modern, luxury, family_friendly, investment, affordable, historic, cottage, retirement, student_friendly, waterfront, private_beach, large_property, privacy, multi_unit, rental_income, appreciation_potential, weekend_getaway, picturesque, energy_efficient, low_maintenance, contemporary, good_community, character, restored, prime_location, original_details, development_ready, utilities_available, good_soil, residential_approved, panoramic_views, premium_finishes, private_terrace, concierge, large_kitchen, finished_basement, fenced_backyard, good_schools, university_area, walking_distance, public_transit, single_level, accessible, peaceful, high_rental_demand, excellent_location, positive_cash_flow, good_yield, first_home, well_maintained, good_neighborhood, ultra_luxury, designer_finishes, smart_home, exclusive_amenities, family_compound, multiple_buildings, rural, unique, loft_style, high_ceilings, exposed_brick, arts_district, commercial_zoned, highway_access, development_potential, large_lot

Return only valid JSON, no additional text.`;

    // Call ChatGPT API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 500,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'ChatGPT API error', 
          details: errorData.error?.message || 'Unknown error'
        })
      };
    }

    const data = await response.json();
    const chatGPTResponse = data.choices[0]?.message?.content;

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
    } catch (parseError) {
      console.error('Failed to parse ChatGPT response:', parseError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to parse ChatGPT response',
          rawResponse: chatGPTResponse
        })
      };
    }

    // Return the parsed response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: parsedResponse,
        query: query,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
