
import { EmailRecord } from '@/utils/emailStorage';

const EMAIL_STORAGE_KEY = 'capturedEmails';

/**
 * Retrieve emails from localStorage
 */
export const getEmailsFromLocalStorage = (): EmailRecord[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedEmails = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (storedEmails) {
      const parsedEmails = JSON.parse(storedEmails);
      console.log(`Loaded ${parsedEmails.length} emails from localStorage`);
      return parsedEmails;
    }
  } catch (e) {
    console.error('Error parsing emails from localStorage:', e);
  }
  
  return [];
};

/**
 * Save emails to localStorage
 */
export const saveEmailsToLocalStorage = (emails: EmailRecord[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(emails));
  } catch (e) {
    console.error('Error saving emails to localStorage:', e);
  }
};

/**
 * Clear emails from localStorage
 */
export const clearLocalStorageEmails = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(EMAIL_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing emails from localStorage:', e);
  }
};

/**
 * Check if an email is already in localStorage
 */
export const isEmailAlreadySubscribed = (email: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const emails = getEmailsFromLocalStorage();
    return emails.some(record => record.email.toLowerCase() === email.toLowerCase());
  } catch (e) {
    console.error('Error checking if email is already subscribed:', e);
    return false;
  }
};

/**
 * Store a new email in localStorage
 */
export const addEmailToLocalStorage = (email: string, listId?: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const emails = getEmailsFromLocalStorage();
    
    // Check if email already exists
    if (!isEmailAlreadySubscribed(email)) {
      emails.push({
        email,
        timestamp: new Date().toISOString(),
        listId
      });
      
      saveEmailsToLocalStorage(emails);
      console.log(`Email ${email} saved to localStorage.`);
    } else {
      console.log(`Email ${email} already exists in localStorage.`);
    }
  } catch (e) {
    console.error('Error adding email to localStorage:', e);
  }
};
