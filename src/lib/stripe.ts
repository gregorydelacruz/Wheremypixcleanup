
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key from environment variable
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error('Stripe configuration missing. Please set VITE_STRIPE_PUBLISHABLE_KEY environment variable.');
}

const stripePromise = loadStripe(stripePublishableKey);

export interface CheckoutOptions {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(options: CheckoutOptions) {
  try {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // Call your backend to create the Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const session = await response.json();
    
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.error(result.error.message);
      throw new Error(result.error.message || 'Failed to redirect to checkout');
    }
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// For development or demo purposes when a backend is not available
export async function simulateCheckout(priceId: string) {
  console.log(`Creating checkout session for price: ${priceId}`);
  
  // In a real implementation, we would call the createCheckoutSession function
  // For now, we'll simulate success after a delay
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Checkout session created successfully');
      resolve();
    }, 1000);
  });
}
