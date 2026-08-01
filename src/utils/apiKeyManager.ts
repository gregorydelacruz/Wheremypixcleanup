
// Simple utility for API key management
import { toast } from 'sonner';

// API key storage - using memory as primary and localStorage as backup
// Default hardcoded API key that will be used for all users
const DEFAULT_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''; // Use environment variable if available
let apiKey = DEFAULT_API_KEY; // Initialize with the default key
const STORAGE_KEY = 'encrypted_openai_api_key';

// Simple encryption/decryption functions
const encrypt = (text: string, passphrase: string): string => {
  if (!text || !passphrase) return '';
  
  // Basic XOR encryption - not production-grade but better than plaintext
  const textChars = text.split('');
  const passphraseChars = passphrase.split('');
  
  const encrypted = textChars.map((char, index) => {
    const passChar = passphraseChars[index % passphraseChars.length];
    return String.fromCharCode(char.charCodeAt(0) ^ passChar.charCodeAt(0));
  });
  
  return btoa(encrypted.join(''));
};

const decrypt = (encrypted: string, passphrase: string): string => {
  if (!encrypted || !passphrase) return '';
  
  try {
    const textChars = atob(encrypted).split('');
    const passphraseChars = passphrase.split('');
    
    const decrypted = textChars.map((char, index) => {
      const passChar = passphraseChars[index % passphraseChars.length];
      return String.fromCharCode(char.charCodeAt(0) ^ passChar.charCodeAt(0));
    });
    
    return decrypted.join('');
  } catch (error) {
    console.error('Error decrypting:', error);
    return '';
  }
};

export const setApiKey = (key: string, rememberKey: boolean = false, passphrase?: string): void => {
  console.log("Setting API key, length:", key?.length || 0);
  apiKey = key || DEFAULT_API_KEY; // Use provided key or default if empty
  
  // If remember is checked and we have a passphrase, store encrypted key
  if (rememberKey && passphrase && key) {
    try {
      const encryptedKey = encrypt(key, passphrase);
      localStorage.setItem(STORAGE_KEY, encryptedKey);
      localStorage.setItem('api_key_saved', 'true');
      console.log("API key encrypted and saved to localStorage");
    } catch (error) {
      console.error('Error saving encrypted API key:', error);
      toast.error('Failed to save encrypted API key');
    }
  } else if (!rememberKey) {
    // If not remembering, clear any saved key
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('api_key_saved');
    console.log("Cleared saved API key from localStorage");
  }
};

export const loadSavedApiKey = (passphrase: string): string => {
  try {
    const encryptedKey = localStorage.getItem(STORAGE_KEY);
    if (!encryptedKey) {
      console.log("No encrypted key found in localStorage");
      return DEFAULT_API_KEY;
    }
    
    const decryptedKey = decrypt(encryptedKey, passphrase);
    if (decryptedKey) {
      console.log("Successfully decrypted API key, length:", decryptedKey.length);
      apiKey = decryptedKey;
      return decryptedKey;
    }
    console.log("Failed to decrypt key or decrypted to empty string");
    return DEFAULT_API_KEY;
  } catch (error) {
    console.error('Error loading saved API key:', error);
    return DEFAULT_API_KEY;
  }
};

export const getApiKey = (): string => {
  return apiKey || DEFAULT_API_KEY;
};

export const hasValidApiKey = (): boolean => {
  const key = getApiKey();
  const isValid = !!key && key.length > 10;
  console.log("API key validation:", isValid ? "valid" : "invalid");
  return isValid;
};

export const hasSavedApiKey = (): boolean => {
  return localStorage.getItem('api_key_saved') === 'true';
};

export const clearSavedApiKey = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('api_key_saved');
  apiKey = DEFAULT_API_KEY; // Reset to default key
  console.log("Cleared saved API key and reset to default");
};
