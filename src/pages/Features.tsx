
import React from 'react';
import { Tag, Folder, FileSearch, Lock, Zap, Info, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

// Accordion components for the "Learn more" sections
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Features = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] to-[#0056b3]" />
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <section id="feature-section" className="w-full max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Core Features & Benefits</h1>
          </div>
          
          <Separator className="my-8" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-2 border-white/20 bg-card backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Tag className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-white">📸 AI-Powered Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white/80">
                  Scattered photos? Our Advanced AI automatically sorts them into neatly labeled folders—no manual effort needed.
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="text-blue-200 py-2 text-sm">
                      Learn more about AI organization
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-white/80">
                      Our AI recognizes objects, people, places, and events in your photos to create a logical folder structure automatically. It works with all common image formats and preserves your original files.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-white/20 bg-card backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <FileSearch className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-white">🔍 Smart Image Renaming</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white/80">
                  No more confusing file names! Advanced AI assigns clear, meaningful names to each photo, making searching effortless.
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="text-blue-200 py-2 text-sm">
                      Learn more about smart renaming
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-white/80">
                      Our system analyzes the content of each image and generates descriptive filenames that make it easy to find what you're looking for without opening each file. The names include key subjects and context.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-white/20 bg-card backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Folder className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-xl text-white">📂 One-Click Zip Download</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white/80">
                  All your organized photos, neatly packed in a single zip file—ready to access anytime, anywhere.
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="text-blue-200 py-2 text-sm">
                      Learn more about zip downloads
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-white/80">
                      After processing, you'll receive a compressed ZIP file containing all your photos organized into intuitive folders with meaningful names. Simply download and extract to enjoy your organized photo collection.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>

            <Card className="border-2 border-white/20 bg-card backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-white">🚀 Instantly Find Any Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white/80">
                  Stop scrolling endlessly! AI-powered tagging lets you locate any image in seconds. <span className="text-xs text-white/60">(Coming Soon)</span>
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="text-blue-200 py-2 text-sm">
                      Learn more about photo search
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-white/80">
                      Our upcoming search feature will allow you to find photos by describing what's in them - like "beach sunset" or "birthday party with cake" - using natural language search powered by AI.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-white/20 bg-card backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl text-white">🔒 Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white/80">
                  Your memories, your control. Fully encrypted processing ensures your photos stay safe and private.
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="text-blue-200 py-2 text-sm">
                      Learn more about privacy & security
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-white/80">
                      We prioritize your privacy. Your photos are processed securely and aren't stored on our servers beyond the processing time. All connections are encrypted, and we never share your data with third parties.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-white/20 bg-card backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-white">⏱️ Saves Time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white/80">
                  What would take hours to organize manually is completed in minutes with our automated AI system.
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="text-blue-200 py-2 text-sm">
                      Learn more about saving time
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-white/80">
                      Our system can process hundreds of photos in minutes, automatically categorizing and naming them based on content. This saves you countless hours that would otherwise be spent manually sorting through and renaming your photo collection.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
