import { useSocialShare } from "@/contexts/SocialShareContext";
import SocialShare from "./SocialShare";

export const SocialShareWrapper = () => {
  const { showSocialShare, shareMetadata } = useSocialShare();

  if (!showSocialShare) return null;

  return (
    <div className="mb-1 md:mb-6">
      <SocialShare
        url={shareMetadata.url}
        title={shareMetadata.title}
      />
    </div>
  );
};
