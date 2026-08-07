import { supabase } from '@/integrations/supabase/client';

// Retrieves the Auth0 id token from the singleton stored by AuthProvider,
// so the edge function can verify the caller and enforce plan/usage limits.
async function getAuthToken(): Promise<string | null> {
  const getter = (window as any).__getAuth0IdToken as
    | (() => Promise<string | null>)
    | undefined;
  if (!getter) return null;
  try {
    return await getter();
  } catch {
    return null;
  }
}

export type UsageInfo = {
  plan: string;
  monthly_limit: number;
  usage_count: number;
  remaining: number;
};

let lastUsage: UsageInfo | null = null;

export function getLastUsage(): UsageInfo | null {
  return lastUsage;
}

export async function getImageDescription(base64Image: string): Promise<string | null> {
  try {
    const token = await getAuthToken();
    if (!token) {
      console.error('No Auth0 ID token available. Sign in again.');
      throw new Error('You must be signed in to analyze images.');
    }

    const { data, error } = await supabase.functions.invoke('analyze-image', {
      body: { base64Image },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error) {
      console.error('Image analysis error:', error.message);
      throw new Error(error.message || 'Analysis failed');
    }

    if (!data?.description) {
      throw new Error('No analysis returned from service');
    }

    if (data.usage) {
      lastUsage = data.usage as UsageInfo;
    }

    return data.description;
  } catch (error) {
    console.error('Error calling image analysis service:', error);
    throw error;
  }
}

// Sanitize the description text to make it suitable for filenames and categories
export function sanitizeDescription(description: string): string {
  // Check for AI refusal messages
  if (description.toLowerCase().includes('sorry') && description.toLowerCase().includes("can't help")) {
    return 'Cheeky';
  }

  // Remove unwanted starting words
  let sanitized = description.replace(/^The image shows a\s*/i, '');
  sanitized = sanitized.replace(/^A\s+/i, '');
  sanitized = sanitized.replace(/^An\s+/i, '');
  sanitized = sanitized.replace(/^The\s+/i, '');
  sanitized = sanitized.replace(/^This is a\s*/i, '');
  sanitized = sanitized.replace(/^This is an\s*/i, '');

  // Extract only the first sentence and limit to 40 characters
  return sanitized.split('. ')[0].substring(0, 40).trim();
}
