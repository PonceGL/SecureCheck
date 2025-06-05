
import { analyzeUrlSecurity } from '@/utils/securityAnalyzer';

// This would be deployed as a serverless function or API endpoint
export const analyzeAPI = async (request: Request): Promise<Response> => {
  try {
    // Enable CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200, 
        headers: corsHeaders 
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }), 
        { 
          status: 405, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL parameter is required' }), 
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }), 
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );
    }

    // Perform security analysis
    const result = await analyzeUrlSecurity(url);

    // Return analysis result
    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        data: result
      }), 
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }), 
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
};

// Example usage documentation
export const apiDocumentation = {
  endpoint: '/api/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    url: 'https://example.com'
  },
  response: {
    success: true,
    timestamp: '2024-01-01T00:00:00.000Z',
    data: {
      url: 'https://example.com',
      overallScore: 85,
      riskLevel: 'LOW',
      isSecure: true,
      threats: {},
      ssl: {},
      privacy: {},
      details: []
    }
  }
};
