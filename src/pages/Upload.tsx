
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, Image, Folder, UserSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import FileUploadSection from "@/components/FileUploadSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/Footer";

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col">

      
      <main className="flex-1 pt-20 md:pt-28 pb-16 md:pb-20 overflow-auto">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 font-roboto gradient-text">
              Organize Your Photos
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              My custom AI identifies what's in your photos, categorizes them, and returns a neatly organized ZIP file.
            </p>
          </div>
          
          <FileUploadSection />
          
          <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 shadow-sm">
                <div className="feature-icon mb-3 md:mb-4">
                  <UserSquare className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium mb-2">AI Powered</h3>
                <p className="text-sm text-muted-foreground">
                  My Advanced custom AI analyzes each photo to understand what's in it and provide accurate descriptions.
                </p>
              </div>
            
              <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 shadow-sm">
                <div className="feature-icon mb-3 md:mb-4">
                  <Folder className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium mb-2">Smart Categorization</h3>
                <p className="text-sm text-muted-foreground">
                  Photos are automatically organized into intelligent category folders based on content.
                </p>
              </div>
            
              <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 shadow-sm sm:col-span-2 md:col-span-1">
                <div className="feature-icon mb-3 md:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. Your images stay private and are never stored on our servers.
                </p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-16 bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li className="pl-2">Upload your photos (up to 25 at once on the free plan)</li>
                <li className="pl-2">My custom AI analyzes each image to understand what's in it</li>
                <li className="pl-2">Photos are automatically organized into category folders</li>
                <li className="pl-2">Download a ZIP file with your organized photo collection</li>
                <li className="pl-2">Extract the ZIP to enjoy your neatly categorized photos</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
