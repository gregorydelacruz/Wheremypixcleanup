
// Define path operations that work in both browser and Node.js environments
const createPathSafely = (...segments: string[]): string => {
  // In browser, we can just join with forward slashes
  if (typeof window !== 'undefined') {
    return segments.join('/');
  }
  
  // In Node.js, use the path module
  const path = require('path');
  return path.join(...segments);
};

// Path to our emails.txt file - using the src/data directory
const emailsFilePath = createPathSafely(
  typeof window === 'undefined' ? process.cwd() : '',
  'src', 
  'data', 
  'emails.txt'
);

/**
 * Read content from emails.txt file
 */
export const readEmailsFile = (): string | null => {
  try {
    if (typeof window !== 'undefined') return null; // Only works server-side
    
    // Import fs here to avoid browser issues
    const fs = require('fs');
    
    if (fs.existsSync(emailsFilePath)) {
      return fs.readFileSync(emailsFilePath, 'utf8');
    }
    
    console.log('emails.txt file does not exist yet, will be created on first email capture');
    return null;
  } catch (error) {
    console.error('Error reading emails.txt file:', error);
    return null;
  }
};

/**
 * Write content to emails.txt file
 */
export const writeToEmailsFile = (content: string): boolean => {
  try {
    if (typeof window !== 'undefined') return false; // Only works server-side
    
    // Import fs and path here to avoid browser issues
    const fs = require('fs');
    const path = require('path');
    
    // Create the directory if it doesn't exist
    const dir = path.dirname(emailsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write the file
    fs.writeFileSync(emailsFilePath, content, 'utf8');
    console.log(`Emails file updated at ${emailsFilePath}`);
    return true;
  } catch (error) {
    console.error('Error writing to emails.txt file:', error);
    return false;
  }
};

/**
 * Get the file path to emails.txt
 */
export const getEmailsFilePath = (): string => {
  return emailsFilePath;
};
