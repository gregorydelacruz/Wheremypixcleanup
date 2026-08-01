import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

// Sample blog posts array
const blogPosts = [
  {
    title: "How to Tame Your IMG_0001 Chaos",
    description: "Step-by-step guide to organize your messy photos with IMG_0001.jpg names.",
    route: "/blog/img-0001-chaos",
    details: "Learn how to quickly identify, rename, and categorize your photos using Wheremypix's AI-powered system. No manual effort needed.",
  },
  {
    title: "Rename Photos Automatically with AI",
    description: "Stop confusing file names from slowing you down.",
    route: "/blog/rename-photos-ai",
    details: "Our AI analyzes the content of your images and generates meaningful filenames for easy searching and organization.",
  },
  {
    title: "Organize Hundreds of Photos in Minutes",
    description: "Save hours of manual sorting and renaming.",
    route: "/blog/speed-up-organization",
    details: "Process hundreds of images at once. Wheremypix automatically categorizes them into folders and adds descriptive names.",
  },
];

const Blog = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SEO
        title="Blog — Photo Organization Tips & Guides"
        description="Guides and tips on taming photo chaos, AI renaming, and organizing hundreds of images with Where My Pix."
        keywords={["photo organization blog", "ai photo tips", "img_0001 chaos"]}
        canonicalUrl="https://stripe-price-magic-58.lovable.app/blog"
      />
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
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Wheremypix Blog</h1>
            <p className="text-white/80">Tips, guides, and insights for organizing your messy photo collections.</p>
          </div>

          <Separator className="my-8" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="border-2 border-white/20 bg-card backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-white/80">{post.description}</CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${idx}`} className="border-0">
                      <AccordionTrigger className="text-blue-200 py-2 text-sm">Read More</AccordionTrigger>
                      <AccordionContent className="text-sm text-white/80">
                        {post.details} <br />
                        <Link to={post.route} className="text-blue-300 hover:underline mt-2 block">
                          Go to Post →
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
