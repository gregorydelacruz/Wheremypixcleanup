
import { toast } from 'sonner';

// Usage limits based on plan
export const USAGE_LIMITS = {
  free: 25, // 25 images per month
  pro: 10000, // 10,000 images per month
  vip: 100000 // 100,000 images per month
};

// Track user usage in localStorage
const USAGE_STORAGE_KEY = 'image_processing_usage';

interface UsageData {
  currentPeriod: string; // YYYY-MM format
  count: number;
  userPlan: 'free' | 'pro' | 'vip';
}

// Get the current period in YYYY-MM format
const getCurrentPeriod = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

// Initialize or get current usage data
export const getUserUsage = (): UsageData => {
  const currentPeriod = getCurrentPeriod();
  
  try {
    const storedData = localStorage.getItem(USAGE_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UsageData;
      
      // If it's a new period, reset the counter
      if (parsedData.currentPeriod !== currentPeriod) {
        const newData: UsageData = {
          currentPeriod,
          count: 0,
          userPlan: parsedData.userPlan || 'free'
        };
        localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(newData));
        return newData;
      }
      
      return parsedData;
    }
  } catch (error) {
    console.error('Error reading usage data:', error);
  }
  
  // Default data if nothing exists or there was an error
  const defaultData: UsageData = {
    currentPeriod,
    count: 0,
    userPlan: 'free'
  };
  
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
};

// Track new image processing
export const trackImageProcessing = (imageCount: number): boolean => {
  const usage = getUserUsage();
  const newCount = usage.count + imageCount;
  const limit = USAGE_LIMITS[usage.userPlan];
  
  // Check if user has reached their limit
  if (newCount > limit) {
    toast.error(`You've reached your monthly limit of ${limit} images.`, {
      id: "usage-limit-nudge",
      description: "Upgrade your plan to process more images.",
      action: {
        label: "Upgrade Plan",
        onClick: () => window.location.href = "/pricing"
      },
      duration: 6000
    });
    return false;
  }

  // Update the count. Remaining-quota messaging is handled server-side
  // (see notifyIfApproachingLimit) so we don't stack duplicate toasts here.
  usage.count = newCount;
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(usage));


  
  return true;
};

// Update user's plan
export const updateUserPlan = (plan: 'free' | 'pro' | 'vip'): void => {
  const usage = getUserUsage();
  usage.userPlan = plan;
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(usage));
  toast.success(`Your plan has been updated to ${plan.toUpperCase()}`);
};

// Reset usage count (for testing or admin purposes)
export const resetUsage = (): void => {
  const usage = getUserUsage();
  usage.count = 0;
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(usage));
  toast.success('Usage counter has been reset');
};

