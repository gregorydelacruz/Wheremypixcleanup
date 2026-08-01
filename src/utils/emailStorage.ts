
// Define the email record structure for typescript
export interface EmailRecord {
  email: string;
  timestamp: string;
  listId?: string;
}

/**
 * Function to save an email to storage
 */
export const saveEmailToStorage = (email: string, listId?: string): void => {
  // Use the existing addEmailToLocalStorage function from localStorageOperations
  import('./localStorageOperations').then(({ addEmailToLocalStorage }) => {
    addEmailToLocalStorage(email, listId);
  });
};
