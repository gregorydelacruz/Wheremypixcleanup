
import JSZip from 'jszip';
import { toast } from 'sonner';

import { getImageDescription, getLastUsage } from './openaiService';
import { extractBase64FromDataURL, readFileAsCompressedDataURL } from './fileUtils';
import { addFileToZip, generateZipFile } from './zipHandler';
import { trackImageProcessing, getUserUsage } from './usageTracker';

// Set image limits based on subscription plan
const IMAGE_LIMITS = {
  free: 20,
  pro: 100,
  enterprise: 250
};

export async function processImages(files: File[]): Promise<Blob | null> {
  if (files.length === 0) {
    toast.error("Please select images first.", { id: "image-processing" });
    return null;
  }

  // Get the user's plan to determine their limit
  const { userPlan } = getUserUsage();
  const maxImagesAtOnce = IMAGE_LIMITS[userPlan];
  
  const filesToProcess = Array.from(files).slice(0, maxImagesAtOnce);
  console.log(`Will process ${filesToProcess.length} images out of ${files.length}`);
  
  // Track image processing before starting
  const canProcess = trackImageProcessing(filesToProcess.length);
  if (!canProcess) {
    console.log("Usage tracking denied processing");
    return null;
  }
  
  const zip = new JSZip();
  let processedCount = 0;
  let failedCount = 0;
  const totalFiles = filesToProcess.length;

  toast.info(`Processing ${totalFiles} images...`, { id: "image-processing" });
  console.log(`Starting to process ${totalFiles} images`);

  let lastError: string | null = null;

  // Run several analyses at once — the bottleneck is network latency, not CPU.
  const CONCURRENCY = 4;

  try {
    const queue = [...filesToProcess];
    const worker = async () => {
      while (queue.length > 0) {
        const file = queue.shift();
        if (!file) return;
        try {
          console.log(`Processing file: ${file.name}, size: ${file.size} bytes`);
          await processImage(file, zip);
          processedCount++;
        } catch (error) {
          console.error(`Failed to process file ${file.name}:`, error);
          lastError = error instanceof Error ? error.message : String(error);
          failedCount++;
        }

        toast.info(`Processed ${processedCount}/${totalFiles} images...`, {
          id: "image-processing",
        });
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(CONCURRENCY, filesToProcess.length) }, worker),
    );


    // Check if any images were successfully processed
    if (processedCount === 0) {
      toast.error(lastError || "Failed to process any images. Please try again later.", { id: "image-processing" });
      return null;
    }

    // Generate the ZIP after all images are processed
    console.log("Generating ZIP file...");
    const blob = await generateZipFile(zip);
    console.log("ZIP generation complete, size:", blob.size);
    toast.success(`Processing complete! ${processedCount} images processed${failedCount > 0 ? `, ${failedCount} failed` : ''}.`, { id: "image-processing" });
    notifyIfApproachingLimit();
    return blob;

  } catch (error) {
    console.error("Error processing images:", error);
    toast.error("Failed to process images. Please try again.", { id: "image-processing" });
    return null;
  }
}

// Warn the user as they get close to their monthly quota, with an upgrade nudge.
function notifyIfApproachingLimit(): void {
  const usage = getLastUsage();
  if (!usage) return;

  const { plan, remaining, monthly_limit } = usage;
  const threshold = Math.max(3, Math.ceil(monthly_limit * 0.2));
  if (remaining > threshold) return;

  const canUpgrade = plan === 'free' || plan === 'pro';
  const label = remaining === 0
    ? `You've used all ${monthly_limit} images for this month.`
    : `Only ${remaining} of your ${monthly_limit} monthly images left.`;

  toast.warning(label, {
    id: 'usage-limit-nudge',
    duration: 8000,
    description: canUpgrade
      ? 'Upgrade your plan to keep organizing without interruption.'
      : 'Your quota resets at the start of next month.',
    action: canUpgrade
      ? {
          label: 'Upgrade',
          onClick: () => {
            window.location.href = '/pricing';
          },
        }
      : undefined,
  });
}



async function processImage(file: File, zip: JSZip): Promise<void> {
  try {
    // Read + downscale the file so the analysis upload stays small
    const dataURL = await readFileAsCompressedDataURL(file);
    const base64Image = extractBase64FromDataURL(dataURL);

    console.log(`File ${file.name} converted to base64, length: ${base64Image.length}`);
    
    // Get image description from OpenAI
    console.log(`Requesting description for ${file.name}...`);
    const description = await getImageDescription(base64Image);
    
    if (!description) {
      throw new Error("Failed to get image description");
    }
    
    console.log(`Received description for ${file.name}: "${description}"`);
    
    // Add the file to the ZIP
    await addFileToZip(file, description, zip);
    console.log(`Added ${file.name} to ZIP`);
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
