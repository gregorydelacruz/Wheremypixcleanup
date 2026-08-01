
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SocialShareContextType {
  showSocialShare: boolean;
  toggleSocialShare: (show: boolean) => void;
  shareMetadata: {
    url: string;
    title: string;
    description: string;
  };
  setShareMetadata: (metadata: { url: string; title: string; description: string }) => void;
}

const SocialShareContext = createContext<SocialShareContextType | undefined>(undefined);

export const SocialShareProvider = ({ children }: { children: ReactNode }) => {
  const [showSocialShare, setShowSocialShare] = useState(true);
  const [shareMetadata, setShareMetadata] = useState({
    url: window.location.origin,
    title: "WhereMyPix - Effortlessly Organize Your Photos",
    description: "Turn messy photos into beautifully organized folders with WhereMyPix"
  });

  const toggleSocialShare = (show: boolean) => {
    setShowSocialShare(show);
  };

  return (
    <SocialShareContext.Provider 
      value={{ 
        showSocialShare, 
        toggleSocialShare,
        shareMetadata,
        setShareMetadata 
      }}
    >
      {children}
    </SocialShareContext.Provider>
  );
};

export const useSocialShare = () => {
  const context = useContext(SocialShareContext);
  if (context === undefined) {
    throw new Error('useSocialShare must be used within a SocialShareProvider');
  }
  return context;
};
