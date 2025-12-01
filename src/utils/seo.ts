export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEO({
  title = 'Commander 2x2',
  description = 'Formato competitivo de Commander em duplas. Interações esperadas, jogo político irrelevante.',
  image = '/og-image.png',
  url = 'https://commander2x2.com',
  type = 'website',
  keywords = 'Magic: the Gathering, Commander, 2x2, formato competitivo, duplas, EDH',
  author = 'Commander 2x2 Community',
  publishedTime,
  modifiedTime
}: SEOProps = {}) {
  const siteTitle = title.includes('Commander 2x2') ? title : `${title} | Commander 2x2`;
  
  return {
    title: siteTitle,
    description,
    image,
    url,
    type,
    keywords,
    author,
    publishedTime,
    modifiedTime,
    canonical: url,
    openGraph: {
      title: siteTitle,
      description,
      url,
      siteName: 'Commander 2x2',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'pt_BR',
      type
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description,
      image,
      imageAlt: title,
      site: '@commander2x2'
    }
  };
}
