
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      if (!reader.result) {
        reject(new Error("Failed to read file"));
        return;
      }
      
      resolve(reader.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    reader.readAsDataURL(file);
  });
}

export function extractBase64FromDataURL(dataURL: string): string {
  return dataURL.split(",")[1];
}

/**
 * Downscale an image to a max edge and re-encode as JPEG so the upload to the
 * analysis service stays small. Falls back to the original data URL on failure.
 */
export async function readFileAsCompressedDataURL(
  file: File,
  maxEdge = 768,
  quality = 0.7,
): Promise<string> {
  const original = await readFileAsDataURL(file);
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return original;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const compressed = canvas.toDataURL("image/jpeg", quality);
    return compressed.length < original.length ? compressed : original;
  } catch {
    return original;
  }
}


export function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "jpg";
}

export function sanitizeFilename(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, "")  // Remove special characters
    .replace(/\s+/g, "_")            // Replace spaces with underscores
    .trim();
}
