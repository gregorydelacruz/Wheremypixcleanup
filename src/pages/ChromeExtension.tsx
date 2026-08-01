
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Chrome, ExternalLink } from "lucide-react";

const ChromeExtension = () => {
  // Real Chrome Web Store URL for the extension
  const extensionUrl = "https://chromewebstore.google.com/detail/where-my-pix/ignjeihiejbnpfapfjcfjpjnijmoikmk";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Chrome Extension - Where My Pix</title>
        <meta 
          name="description" 
          content="Organize your photos directly from your browser with our Chrome extension. Quick access to Where My Pix photo organization tools."
        />
      </Helmet>

      <main className="flex-1 pt-28 pb-20 overflow-auto">
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Chrome size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Where My Pix Chrome Extension (Now Available!)
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Organize your photos directly from your browser with our powerful Chrome extension.
              Quick access to all Where My Pix photo organization tools with just one click.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button 
                size="lg" 
                className="gap-2 bg-blue-600 hover:bg-blue-700" 
                onClick={() => window.open(extensionUrl, '_blank')}
              >
                <Chrome size={20} />
                Add to Chrome
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>

          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Features</h2>
              <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                <li>Quick upload photos from any website</li>
                <li>Organize images while browsing</li>
                <li>Save images directly to your Where My Pix account</li>
                <li>Access your organized photos anywhere</li>
                <li>Compatible with most image formats and websites</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">How to Install</h2>
              <ol className="space-y-3 list-decimal pl-5 text-muted-foreground">
                <li>Click the "Add to Chrome" button above</li>
                <li>Confirm the installation in the Chrome Web Store</li>
                <li>Pin the extension to your toolbar for easy access</li>
                <li>Click the extension icon to get started</li>
              </ol>
            </div>
          </div>

          <div className="mt-20 p-8 rounded-lg bg-background border">
            <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium">Is the extension free?</h3>
                <p className="text-muted-foreground mt-2">Yes, our Chrome extension is completely free to use with your Where My Pix account.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">What browsers are supported?</h3>
                <p className="text-muted-foreground mt-2">Currently, the extension is available for Google Chrome and other Chromium-based browsers like Edge and Brave.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Can I use it without a Where My Pix account?</h3>
                <p className="text-muted-foreground mt-2">Yes. Anyone can use the Where My Pix extension. But it only works on www.wheremypix.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ChromeExtension;
