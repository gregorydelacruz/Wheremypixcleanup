
import JSZip from 'jszip';
import { getCategoryForDescription } from './categoryMapping';
import { extractBase64FromDataURL, getFileExtension, readFileAsDataURL, sanitizeFilename } from './fileUtils';
import { sanitizeDescription } from './openaiService';

export async function addFileToZip(
  file: File, 
  description: string, 
  zip: JSZip
): Promise<void> {
  try {
    // Get category using the mapping function
    const category = getCategoryForDescription(description);
    
    // Read the file data
    const dataURL = await readFileAsDataURL(file);
    const imageData = extractBase64FromDataURL(dataURL);
    
    // Sanitize filename
    const sanitizedFilename = sanitizeFilename(sanitizeDescription(description));
    
    // Get file extension from original filename
    const fileExtension = getFileExtension(file.name);
    
    // Create a sanitized directory name
    const sanitizedCategory = sanitizeFilename(category);
    
    // Create full path for the file in the zip
    const filename = `${sanitizedCategory}/${sanitizedFilename}.${fileExtension}`;

    // Add file to the zip in the appropriate category folder
    zip.file(filename, imageData, { base64: true });
  } catch (error) {
    console.error("Error adding file to ZIP:", error);
    throw error;
  }
}

export async function generateZipFile(zip: JSZip): Promise<Blob> {
  return await zip.generateAsync({ type: "blob" });
}
