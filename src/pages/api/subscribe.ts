
// This file ensures that Vercel can find the API endpoint
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
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
    // Get Mailchimp credentials from environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
    
    // Get default list ID from environment or use the one from the request
    const defaultListId = process.env.MAILCHIMP_LIST_ID;
    
    if (!apiKey || !serverPrefix) {
      console.error('Missing Mailchimp API credentials in environment variables');
      return res.status(500).json({ 
        message: 'Server configuration error: Missing Mailchimp API credentials' 
      });
    }

    // Get data from request body
    const { email_address, listId } = req.body;

    if (!email_address) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    // Use listId from request, fallback to environment variable
    const targetListId = listId || defaultListId;
    
    if (!targetListId) {
      return res.status(400).json({ message: 'Mailchimp list ID is required' });
    }

    console.log(`Subscribing ${email_address} to Mailchimp list ${targetListId}`);

    // Calculate MD5 hash of lowercase email for Mailchimp API
    const crypto = require('crypto');
    const emailHash = crypto
      .createHash('md5')
      .update(email_address.toLowerCase())
      .digest('hex');

    // Check if member exists to avoid duplicates
    const checkUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${targetListId}/members/${emailHash}`;
    
    const checkResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    if (checkResponse.status === 200) {
      // Member already exists
      return res.status(200).json({ status: 'already_subscribed' });
    }

    // Member doesn't exist, proceed with subscription
    const subscribeUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${targetListId}/members`;
    
    const subscribeResponse = await fetch(subscribeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email_address,
        status: 'subscribed'
      })
    });

    const responseBody = await subscribeResponse.text();
    console.log('Mailchimp API response:', responseBody);

    if (!subscribeResponse.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseBody);
      } catch (e) {
        errorData = { title: 'Unknown error', detail: responseBody };
      }
      
      console.error('Mailchimp API error:', errorData);
      return res.status(subscribeResponse.status).json({ 
        message: errorData.title || 'Error subscribing to newsletter',
        detail: errorData.detail
      });
    }

    let data;
    try {
      data = JSON.parse(responseBody);
    } catch (e) {
      data = { status: 'success', message: 'Subscription successful' };
    }
    
    return res.status(200).json({ 
      status: 'subscribed',
      data: data
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
