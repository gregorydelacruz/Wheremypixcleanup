
// This is a serverless API endpoint for Mailchimp subscription that works in development
// It's similar to the Vercel API but works in the development environment

export default async function handler(req, res) {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle HEAD requests (for testing API availability)
  if (req.method === 'HEAD') {
    return res.status(200).end();
  }
  
  // Only allow POST requests for actual subscription
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get data from request body
    let data;
    try {
      const bodyText = await new Promise(resolve => {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          resolve(body);
        });
      });
      
      data = JSON.parse(bodyText);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const { email_address, listId } = data;

    if (!email_address) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    // In development, just log the request and return success
    console.log('Development mode: Would subscribe', email_address, 'to list', listId);
    
    // Simulate a successful subscription
    return res.status(200).json({ 
      status: 'subscribed',
      email: email_address,
      listId: listId,
      environment: 'development'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message
    });
  }
}
