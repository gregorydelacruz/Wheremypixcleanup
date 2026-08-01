import Navbar from '@/components/Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HelpCircle, MessageCircle, Lamp, BookOpen, FileCode, Wand } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

// Help categories data
const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of using our service",
    icon: <Lamp size={24} />,
    href: "/gettingstarted"
  },
  {
    title: "Uploading Photos",
    description: "How to upload and manage your photos",
    icon: <FileCode size={24} />,
    href: "/uploadingphotos"
  },
  {
    title: "Account Management",
    description: "Manage your account and settings",
    icon: <HelpCircle size={24} />,
    href: "/accountmanagement"
  },
  {
    title: "Troubleshooting",
    description: "Solutions for common issues",
    icon: <BookOpen size={24} />,
    href: "/troubleshooting"
  }
];

// FAQ items data
const faqItems = [
  {
    question: "How does the photo organization process work?",
    answer: "Our service uses advanced AI to analyze your photos and categorize them based on content, dates, locations, and other metadata. Once uploaded, the AI processes your images and creates organized folders that you can download as a zip file."
  },
  {
    question: "What file formats are supported?",
    answer: "We currently only support JPG and PNG formats. We're working on adding support for more formats in the future."
  },
  {
    question: "How secure are my photos?",
    answer: "Your photos are encrypted during upload and storage. We use industry-standard security protocols to ensure your images are protected. Your photos are only stored temporarily during processing and are deleted once you download your organized files."
  },
  {
    question: "Is there a limit to how many photos I can upload?",
    answer: "Free accounts can upload up to 25 photos per month. Premium plans offer higher or unlimited upload limits depending on your subscription level."
  },
  {
    question: "How long does the organization process take?",
    answer: "Processing time depends on the number of photos and your subscription level. Typically, batches of up to 100 photos are processed within 10-15 minutes for premium users and 30-60 minutes for free users."
  },
  {
    question: "Can I customize how my photos are organized?",
    answer: "Yes! You can set custom organizational preferences before uploading, such as prioritizing date-based organization over content-based, or specifying custom categories for your photos."
  },
  {
    question: "How do I access my organized photos?",
    answer: "Once processing is complete, you'll receive a notification and can download your organized photos as a zip file. Premium users can also access their organized photos directly through our cloud storage feature.(coming soon)"
  }
];

const Help = () => {
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
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-roboto font-bold mb-4 text-center text-white">How Can We Help?</h1>
            <p className="text-lg text-center mb-8 text-white/80">
              Find answers to common questions or contact our support team.
            </p>
            
            <div className="relative mb-12">
              <Input 
                type="text" 
                placeholder="Search for help topics..." 
                className="pr-10 py-6 text-lg" 
              />
              <Button variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </Button>
            </div>
            
            {/* Help category cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {helpCategories.map((category, index) => (
                <Link key={index} to={category.href}>
                  <Card
                    className="
                      h-full cursor-pointer
                      border border-white/10
                      bg-[#050814]/95
                      hover:bg-[#050814]
                      shadow-lg shadow-black/40
                      rounded-2xl
                      transition-all
                      hover:shadow-xl hover:shadow-black/60
                      hover:-translate-y-1
                    "
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="font-roboto text-white">
                            {category.title}
                          </CardTitle>
                          <CardDescription className="text-white/80">
                            {category.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            
            <h2 className="text-2xl font-roboto font-bold mb-6 text-white">Frequently Asked Questions</h2>
            
            <Accordion
              type="single"
              collapsible
              className="mb-12 bg-[#050814]/95 rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/40"
            >
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Card className="bg-[#050814]/95 rounded-2xl border border-white/10 shadow-lg shadow-black/40">
              <CardHeader>
                <CardTitle className="font-roboto text-white">Still Need Help?</CardTitle>
                <CardDescription className="text-white/80">
                  Our support team is ready to assist you with any questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                      placeholder="Describe your issue or question"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Support Request</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
