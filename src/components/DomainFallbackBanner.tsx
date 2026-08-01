import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, Globe } from "lucide-react";

const LOVABLE_URL = "https://stripe-price-magic-58.lovable.app";
const DISMISS_KEY = "domain-fallback-banner-dismissed";

export function DomainFallbackBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const isCustomDomain = host &&
      !host.endsWith(".lovable.app") &&
      !host.endsWith(".netlify.app") &&
      !host.includes("localhost");

    if (isCustomDomain && !localStorage.getItem(DISMISS_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-50 px-4 pt-2 pb-1 bg-background border-b border-border">
      <Alert className="flex items-start gap-3">
        <Globe className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
        <div className="flex-1">
          <AlertTitle>Having trouble loading the site?</AlertTitle>
          <AlertDescription>
            Wheremypix is moving to a new home.
            <br />
            This may cause intermittent DNS or SSL issues. If this page fails
            to load, try the stable Lovable URL:{" "}
            <a
              href={LOVABLE_URL}
              className="underline font-medium text-primary hover:text-primary/80"
            >
              stripe-price-magic-58.lovable.app
            </a>
            .
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          aria-label="Dismiss domain fallback banner"
          className="shrink-0 -mt-1 -mr-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  );
}
