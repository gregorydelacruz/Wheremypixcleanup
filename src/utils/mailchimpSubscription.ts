
import { addEmailToLocalStorage } from './localStorageOperations';

interface SubscribeParams {
  email: string;
  listId: string;
}

export async function subscribeToMailchimp({ email, listId }: SubscribeParams): Promise<{
  success: boolean;
  message: string;
  status?: string;
}> {
  console.log('Submitting email to Mailchimp:', email, 'listId:', listId);
  
  try {
    // Prepare data for Mailchimp API
    const data = {
      email_address: email,
      listId: listId
    };

    // Send subscription request to the API
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Check if the response is empty to prevent JSON parse errors
    const responseText = await response.text();
    
    console.log('API Response:', responseText.substring(0, 100)); // Log beginning of response for debugging
    
    if (!responseText) {
      console.log('Empty response from subscription API');
      
      // Even with an empty response, we can still save to localStorage
      // This allows the app to function when the API is unavailable
      addEmailToLocalStorage(email, listId);
      
      return {
        success: true,
        message: "Thank you for subscribing!",
        status: "subscribed"
      };
    }
    
    // Check if response starts with HTML (<!DOCTYPE or <html)
    if (responseText.trim().toLowerCase().startsWith('<!doctype') || 
        responseText.trim().toLowerCase().startsWith('<html')) {
      console.error('Received HTML response instead of JSON. API endpoint might be misconfigured.');
      
      // Still save to localStorage if API returns HTML
      addEmailToLocalStorage(email, listId);
      return {
        success: true,
        message: "Subscription saved locally",
        status: "local_only"
      };
    }
    
    // Try to parse the JSON response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      console.error('Response content:', responseText.substring(0, 200)); // Log more of the response for debugging
      
      // Still save to localStorage if API response can't be parsed
      addEmailToLocalStorage(email, listId);
      return {
        success: true,
        message: "Subscription saved locally",
        status: "local_only"
      };
    }
    
    console.log('Subscription API response:', result);

    // Save to localStorage for persistence
    if (!response.ok) {
      // Handle server errors but still save locally
      addEmailToLocalStorage(email, listId);
      return {
        success: true,
        message: "Subscription saved locally",
        status: "local_only"
      };
    }
    
    if (result.status === 'subscribed' || result.status === 'already_subscribed' || result.status === 'pending') {
      addEmailToLocalStorage(email, listId);
    }
    
    return {
      success: true,
      message: result.message || "Subscription successful",
      status: result.status || "subscribed"
    };
    
  } catch (error) {
    console.error('Error submitting email:', error);
    
    // Even on error, save to localStorage so the user experience isn't broken
    addEmailToLocalStorage(email, listId);
    
    return {
      success: true, // Changed to true since we saved locally
      message: "Subscription saved locally",
      status: "local_only"
    };
  }
}
