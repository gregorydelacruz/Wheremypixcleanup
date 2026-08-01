
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string | string[];
  canonicalUrl: string;
  ogImage?: string;
}

const SEO: FC<SEOProps> = ({ title, description, keywords, canonicalUrl, ogImage }) => {
  // Handle both string and array formats for keywords
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
