
import { useState } from "react";
import { toast } from "sonner";
import { processImages } from "@/utils/imageProcessing";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import FileDropZone from "./upload/FileDropZone";
import FilesList from "./upload/FilesList";
import ProcessButton from "./upload/ProcessButton";
import { getUserUsage } from "@/utils/usageTracker";

const FileUploadSection = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const { userPlan } = getUserUsage();
  const maxImagesMessage = userPlan === 'free' 
    ? "Maximum 20 images at once." 
    : userPlan === 'pro' 
      ? "Maximum 100 images at once." 
      : "Maximum 250 images at once.";

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (!isAuthenticated) {
      toast.error("Please sign up to upload and process images");
      return;
    }
    setFiles(selectedFiles);
  };

  const handleProcessImages = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign up to process images");
      return;
    }

    if (files.length === 0) {
      toast.error("Please select images first");
      return;
    }
    
    setIsProcessing(true);

    try {
      console.log("Starting image processing...");
      const zipBlob = await processImages(files);
      
      if (zipBlob) {
        console.log("Creating download link for ZIP");
        const zipLink = document.createElement("a");
        zipLink.href = URL.createObjectURL(zipBlob);
        zipLink.download = "organized_photos.zip";
        document.body.appendChild(zipLink);
        zipLink.click();
        document.body.removeChild(zipLink);
        
        toast.success("Download complete!");
      } else {
        console.log("No ZIP blob returned from processing");
      }
    } catch (error) {
      console.error("Error during processing:", error);
      toast.error(`Processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="w-full px-3 py-6 md:px-4 md:py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-8">Upload Your Photos</h2>
        
        {!isAuthenticated && (
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-4">
              Sign up to organize your photos with our AI-powered service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Sign up</Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">Log in</Button>
              </Link>
            </div>
          </div>
        )}
        
        {isAuthenticated && (
          <div className="space-y-4">
            <FileDropZone onFilesSelected={handleFilesSelected} />
            
            {files.length > 0 && (
              <div className="mt-4">
                <FilesList files={files} isProcessing={isProcessing} />
                <ProcessButton 
                  onProcess={handleProcessImages}
                  isProcessing={isProcessing}
                  disabled={files.length === 0}
                />
              </div>
            )}
            
            <p className="text-sm text-muted-foreground text-center mt-4">
              We only accept JPG and PNG images up to 15MB each. {maxImagesMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FileUploadSection;
