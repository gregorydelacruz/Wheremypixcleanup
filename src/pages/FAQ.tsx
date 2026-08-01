
import Navbar from '@/components/Navbar';
import { Separator } from '@/components/ui/separator';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const FAQ = () => {
  const faqItems = [
    {
      question: "How does Where My Pix organize my photos?",
      answer: "Our service uses advanced AI algorithms to analyze your photos and organize them into logical categories based on content, date, location, and other metadata. We then rename the files with descriptive names and package everything into a structured folder system within a single ZIP file for easy downloading."
    },
    {
      question: "Is my data secure when I upload photos?",
      answer: "Yes, we take security very seriously. All uploads are encrypted and processed on secure servers. We don't permanently store your photos - once you download your organized ZIP file, your photos are deleted from our servers within 24 hours."
    },
    {
      question: "What file formats are supported?",
      answer: "We currently support JPEG and PNG formats from major camera manufacturers, and more. If you have a specific format you'd like to confirm, please contact our support team."
    },
    {
      question: "How large a collection can I organize at once?",
      answer: "Our different plans support various collection sizes. The free plan allows up to 25 photos, while our premium plans support thousands of photos in a single batch. Check our pricing page for detailed information on each plan's limits."
    },
    {
      question: "How accurate is the photo categorization?",
      answer: "Our AI has been trained on millions of images and achieves over 95% accuracy in most common categories. The system continually improves through machine learning. If you find any miscategorized photos, you can provide feedback to help improve the system."
    },
    {
      question: "Can I customize how my photos are organized?",
      answer: "Yes, our premium plans allow you to set custom organization rules and naming conventions. You can specify preferred folder structures and naming patterns before processing your photos."
    },
    {
      question: "How long does it take to process my photos?",
      answer: "Processing time depends on the number of photos and your selected plan. For a typical collection of 500 photos on our standard plan, organization takes approximately 10-15 minutes. Larger collections may take longer."
    },
    {
      question: "What happens if I'm not satisfied with the results?",
      answer: "We offer a satisfaction guarantee. If you're not happy with how your photos were organized, contact our support team, and we'll either reprocess them with your specific instructions or provide a refund as per our refund policy."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="FAQ — Where My Pix Photo Organizer"
        description="Answers about how Where My Pix organizes photos, supported formats, security, plan limits, and processing times."
        keywords={["photo organizer faq", "where my pix questions", "photo organization help"]}
        canonicalUrl="https://stripe-price-magic-58.lovable.app/faq"
      />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
          <Separator className="mb-8" />
          
          <div className="mb-8">
            <p className="text-muted-foreground text-lg">
              Find answers to the most common questions about our photo organization service.
              If you can't find what you're looking for, feel free to <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-accent/20 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Our team is ready to help you with any other questions you may have.
            </p>
            <a href="/contact" className="text-primary font-medium hover:underline">Contact our support team →</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
