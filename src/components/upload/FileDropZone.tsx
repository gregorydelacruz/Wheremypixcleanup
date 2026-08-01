
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Image, FolderOpen } from "lucide-react";

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
}

const FileDropZone = ({ onFilesSelected }: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const filterImages = (files: File[]) =>
    files.filter((f) => f.type.startsWith("image/"));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(filterImages(Array.from(e.target.files)));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-4 sm:p-6 md:p-8 text-center ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-4 sm:mb-6 flex flex-col items-center">
        <div className="bg-accent/30 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Drag & drop your photos here</h3>
        <p className="text-sm text-muted-foreground">or click to browse your files</p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-2">
        <div className="relative">
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleBrowseClick}
            className="w-full flex items-center justify-center gap-2"
          >
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
            Browse Images
          </Button>
        </div>
        <div className="relative">
          <Input
            ref={folderInputRef}
            type="file"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            {...({ webkitdirectory: "", directory: "" } as any)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => folderInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2"
          >
            <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            Choose Folder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileDropZone;
