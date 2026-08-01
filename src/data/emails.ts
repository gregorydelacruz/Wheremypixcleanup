
/**
 * Persistent email storage service
 * Provides functions to save, retrieve, and manage email records
 */

import { EmailRecord } from '@/utils/emailStorage';
import { readEmailsFile, writeToEmailsFile } from '@/utils/fileOperations';
import { 
  getEmailsFromLocalStorage,
  saveEmailsToLocalStorage,
  clearLocalStorageEmails
} from '@/utils/localStorageOperations';

// Initialize the in-memory email store
let emailStore: EmailRecord[] = [];

// Load emails from txt file on module initialization
const initializeEmailStore = (): void => {
  try {
    // First try to load from localStorage for backward compatibility
    emailStore = getEmailsFromLocalStorage();
    
    // Try to read from the text file if available
    if (typeof window === 'undefined') {
      try {
        const fileContent = readEmailsFile();
        
        if (fileContent) {
          const lines = fileContent.split('\n').filter(line => 
            line.trim() && !line.startsWith('#')
          );
          
          const fileEmails: EmailRecord[] = lines.map(line => {
            const parts = line.split(',');
            // Handle both formats: email,timestamp,listId and email,timestamp
            if (parts.length >= 2) {
              return {
                email: parts[0].trim(),
                timestamp: parts[1].trim(),
                listId: parts[2]?.trim()
              };
            }
            return null;
          }).filter(record => record !== null) as EmailRecord[];
          
          // Merge file emails with localStorage emails
          if (fileEmails.length > 0) {
            console.log(`Loaded ${fileEmails.length} emails from file`);
            // Add unique emails from file
            fileEmails.forEach(record => {
              if (!emailStore.some(item => item.email === record.email)) {
                emailStore.push(record);
              }
            });
          }
        }
      } catch (error) {
        console.log('Error processing emails from file:', error);
      }
    }
    
    console.log('Email store initialized');
  } catch (error) {
    console.error('Error initializing email store:', error);
  }
};

// Initialize the store
initializeEmailStore();

/**
 * Add a new email to the store
 */
const addEmail = (record: EmailRecord): void => {
  // Check if email already exists to prevent duplicates
  const emailExists = emailStore.some(item => item.email === record.email);
  
  if (!emailExists) {
    emailStore.push(record);
    
    // Sync back to localStorage for browser environments
    saveEmailsToLocalStorage(emailStore);
    
    console.log(`Added email ${record.email} to email store. Total: ${emailStore.length}`);
  } else {
    console.log(`Email ${record.email} already exists in store, not adding duplicate`);
  }
};

/**
 * Get all stored emails
 */
const getAllEmails = (): EmailRecord[] => {
  return [...emailStore];
};

/**
 * Export emails as text content
 */
const generateEmailsTextFile = (): string => {
  let content = "# Captured Emails\n";
  content += `# Last updated: ${new Date().toISOString()}\n`;
  content += "#\n";
  content += "# Format: email,timestamp,listId\n";
  content += "# Do not modify this file manually\n\n";
  
  if (emailStore.length === 0) {
    content += "# No emails captured yet.\n";
  } else {
    emailStore.forEach((record) => {
      content += `${record.email},${record.timestamp}`;
      if (record.listId) {
        content += `,${record.listId}`;
      }
      content += "\n";
    });
  }
  
  return content;
};

/**
 * Write the current emails to the text file
 * This function is meant to be called from an admin interface
 */
const writeEmailsToFile = async (): Promise<boolean> => {
  const content = generateEmailsTextFile();
  
  try {
    // In a browser environment, we need to use an API endpoint
    if (typeof window !== 'undefined') {
      // Try the production endpoint first, then fall back to development if needed
      const endpoints = [
        '/public/api/update-emails-file', // Production endpoint
        '/api/update-emails-file'        // Development endpoint
      ];
      
      let succeeded = false;
      
      for (const apiUrl of endpoints) {
        try {
          console.log(`Sending email data to ${apiUrl}...`);
          console.log(`Content length: ${content.length} characters`);
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain',
              'Accept': 'application/json'
            },
            body: content
          });

          // Parse the JSON response
          let responseData;
          try {
            responseData = await response.json();
            console.log(`API JSON response from ${apiUrl}:`, responseData);
            
            if (responseData.success) {
              console.log(`Successfully updated emails.txt file via ${apiUrl} (${responseData.environment} environment)`);
              succeeded = true;
              break; // Exit the loop if successful
            } else {
              console.error(`API error from ${apiUrl}:`, responseData.message || 'Unknown error');
            }
          } catch (parseError) {
            const responseText = await response.text();
            console.error(`Failed to parse JSON response from ${apiUrl}:`, parseError);
            console.log(`Raw response from ${apiUrl}:`, responseText);
            
            // Check if the response looks like a success even though it's not valid JSON
            if (response.ok && responseText.includes('Successfully')) {
              console.log(`Successfully updated emails.txt file via ${apiUrl} (text response)`);
              succeeded = true;
              break; // Exit the loop if successful
            }
          }
          
        } catch (fetchError) {
          console.error(`Network error with ${apiUrl}:`, fetchError);
          // Continue to try the next endpoint
        }
      }
      
      return succeeded;
    } 
    // In a Node.js environment (server-side), we can write directly
    else {
      return writeToEmailsFile(content);
    }
  } catch (error) {
    console.error('Error in writeEmailsToFile:', error);
    return false;
  }
};

/**
 * Import emails from an external source
 */
const importEmails = (emails: EmailRecord[]): void => {
  // Merge with existing emails, avoiding duplicates
  emails.forEach(email => {
    addEmail(email);
  });
};

/**
 * Clear all stored emails
 */
const clearEmails = (): void => {
  emailStore = [];
  clearLocalStorageEmails();
  console.log('Email store cleared');
};

export {
  addEmail,
  getAllEmails,
  generateEmailsTextFile,
  writeEmailsToFile,
  importEmails,
  clearEmails
};
