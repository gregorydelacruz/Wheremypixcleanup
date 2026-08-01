// Secure API key management using Web Crypto API
import { toast } from 'sonner';

const STORAGE_KEY = 'secure_encrypted_api_key';
const SALT_KEY = 'api_key_salt';

// Generate a cryptographically secure salt
async function generateSalt(): Promise<Uint8Array> {
  return crypto.getRandomValues(new Uint8Array(16));
}

// Derive encryption key from passphrase using PBKDF2
async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: 100000, // 100,000 iterations for security
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Secure encryption using AES-GCM
async function encryptSecure(text: string, passphrase: string): Promise<string> {
  if (!text || !passphrase) return '';

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Generate salt and IV
    const salt = await generateSalt();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Derive encryption key
    const key = await deriveKey(passphrase, salt);
    
    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      data
    );

    // Combine salt + iv + encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);

    // Convert to base64 for storage
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

// Secure decryption using AES-GCM
async function decryptSecure(encryptedData: string, passphrase: string): Promise<string> {
  if (!encryptedData || !passphrase) return '';

  try {
    // Convert from base64
    const combined = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );

    // Extract salt, IV, and encrypted data
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encrypted = combined.slice(28);

    // Derive decryption key
    const key = await deriveKey(passphrase, salt);

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );

    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

// Memory storage for API key
let apiKey: string = '';

export const setApiKey = async (key: string, rememberKey: boolean = false, passphrase?: string): Promise<void> => {
  console.log("Setting API key, length:", key?.length || 0);
  apiKey = key;
  
  // If remember is checked and we have a passphrase, store encrypted key
  if (rememberKey && passphrase && key) {
    try {
      const encryptedKey = await encryptSecure(key, passphrase);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      
      localStorage.setItem(STORAGE_KEY, encryptedKey);
      localStorage.setItem(SALT_KEY, btoa(String.fromCharCode(...salt)));
      localStorage.setItem('api_key_saved', 'true');
      console.log("API key securely encrypted and saved to localStorage");
    } catch (error) {
      console.error('Error saving encrypted API key:', error);
      toast.error('Failed to save encrypted API key');
    }
  } else if (!rememberKey) {
    // If not remembering, clear any saved key
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SALT_KEY);
    localStorage.removeItem('api_key_saved');
    console.log("Cleared saved API key from localStorage");
  }
};

export const loadSavedApiKey = async (passphrase: string): Promise<string> => {
  try {
    const encryptedKey = localStorage.getItem(STORAGE_KEY);
    if (!encryptedKey) {
      console.log("No encrypted key found in localStorage");
      return '';
    }
    
    const decryptedKey = await decryptSecure(encryptedKey, passphrase);
    if (decryptedKey) {
      console.log("Successfully decrypted API key, length:", decryptedKey.length);
      apiKey = decryptedKey;
      return decryptedKey;
    }
    console.log("Failed to decrypt key or decrypted to empty string");
    return '';
  } catch (error) {
    console.error('Error loading saved API key:', error);
    // Clear invalid data
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SALT_KEY);
    localStorage.removeItem('api_key_saved');
    return '';
  }
};

export const getApiKey = (): string => {
  return apiKey;
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
  localStorage.removeItem(SALT_KEY);
  localStorage.removeItem('api_key_saved');
  apiKey = '';
  console.log("Cleared saved API key");
};