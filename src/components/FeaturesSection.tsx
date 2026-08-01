import React from 'react';
import { Tag, Folder, FileSearch, Lock, Zap, Info, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Accordion components for the "Learn more" sections
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FeaturesSection: React.FC = () => {
  return (
    <section id="feature-section" className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features & Benefits</h2>
      </div>
      
      <Separator className="my-8" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="border-2 border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl">📸 AI-Powered Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Scattered photos? Our Advanced AI automatically sorts them into neatly labeled folders—no manual effort needed.
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="text-primary py-2 text-sm">
                  Learn more
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Our AI recognizes objects, people, places, and events in your photos to create a logical folder structure automatically. It works with all common image formats and preserves your original files.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <FileSearch className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-xl">🔍 Smart Image Renaming</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              No more confusing file names! Advanced AI assigns clear, meaningful names to each photo, making searching effortless.
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="text-primary py-2 text-sm">
                  Learn more
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Our system analyzes the content of each image and generates descriptive filenames that make it easy to find what you're looking for without opening each file. The names include key subjects and context.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <Folder className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-xl">📂 One-Click Zip Download</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              All your organized photos, neatly packed in a single zip file—ready to access anytime, anywhere.
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="text-primary py-2 text-sm">
                  Learn more
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  After processing, you'll receive a compressed ZIP file containing all your photos organized into intuitive folders with meaningful names. Simply download and extract to enjoy your organized photo collection.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>

        <Card className="border-2 border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl">🚀 Instantly Find Any Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Stop scrolling endlessly! AI-powered tagging lets you locate any image in seconds. <span className="text-xs text-muted-foreground">(Coming Soon)</span>
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="text-primary py-2 text-sm">
                  Learn more
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Our upcoming search feature will allow you to find photos by describing what's in them - like "beach sunset" or "birthday party with cake" - using natural language search powered by AI.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl">🔒 Secure & Private</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Your memories, your control. Fully encrypted processing ensures your photos stay safe and private.
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="text-primary py-2 text-sm">
                  Learn more
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  We prioritize your privacy. Your photos are processed securely and aren't stored on our servers beyond the processing time. All connections are encrypted, and we never share your data with third parties.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle className="text-xl">⏱️ Saves Time</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              What would take hours to organize manually is completed in minutes with our automated AI system.
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="text-primary py-2 text-sm">
                  Learn more
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Our system can process hundreds of photos in minutes, automatically categorizing and naming them based on content. This saves you countless hours that would otherwise be spent manually sorting through and renaming your photo collection.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
