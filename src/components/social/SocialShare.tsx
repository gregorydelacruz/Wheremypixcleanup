// src/components/social/SocialShare.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  X,
  Linkedin,
  Instagram,
} from "lucide-react";

type SocialShareProps = {
  url: string;               // canonical URL to share
  title?: string;            // optional: used as text/description
  imageUrl?: string;         // optional: used by Pinterest "media"
  className?: string;
  size?: number;             // icon size (defaults to 24)
};

export default function SocialShare({
  url,
  title = "",
  imageUrl = "",
  className = "",
  size = 24,
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Pinterest description prefers plain text
  const encodedDescription = encodedTitle;
  const sharingImage = imageUrl ? encodeURIComponent(imageUrl) : "";

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      icon: X,
      color: "#000000",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "#E4405F",
      url: `https://www.instagram.com/`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "#1877F2",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Pinterest",
      icon: "pinterest",
      color: "#E60023",
      url:
        `https://pinterest.com/pin/create/button/?url=${encodedUrl}` +
        (encodedDescription ? `&description=${encodedDescription}` : "") +
        (sharingImage ? `&media=${sharingImage}` : ""),
    },
  ] as const;

  const onShareClick = (shareUrl: string) => {
    // SSR/Node safety
    if (typeof window === "undefined") return;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {shareLinks.map((social) => {
        return (
          <Button
            key={social.name}
            variant="default"
            size="icon"
            aria-label={`Share on ${social.name}`}
            onClick={() => onShareClick(social.url)}
            style={{ backgroundColor: social.color }}
            className="hover:opacity-90 text-white"
            title={`Share on ${social.name}`}
          >
            {social.icon === "pinterest" ? (
              <img 
                src="/lovable-uploads/414593d4-0ad7-4886-adc7-3a06835e8817.png" 
                alt="Pinterest" 
                className="h-6 w-6" 
              />
            ) : (
              React.createElement(social.icon, { className: "h-6 w-6" })
            )}
          </Button>
        );
      })}
    </div>
  );
}
