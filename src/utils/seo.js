/**
 * SEO & Dynamic Meta/Schema Injector for HackWithKunal
 */

const PRODUCTION_DOMAIN = "https://hackwithkunal.com";

export function updateMetaTags({
  title = "HackWithKunal — Cybersecurity, AI Safety & Digital Intelligence",
  description = "Independent cybersecurity, AI safety, threat intelligence, and digital privacy publication founded by Kunal Rajput. Educational security research, vulnerability alerts, and defensive guides.",
  keywords = "cybersecurity, AI safety, threat intelligence, data breaches, AI agents, deepfakes, phishing defense, privacy guides, Kunal Rajput, HackWithKunal, VANIX",
  image = "/assets/founder/founder-photo.png",
  url = null,
  type = "website",
  publishedTime = null,
  modifiedTime = null,
  author = "Kunal Rajput",
  schema = null
}) {
  // Normalize production URL
  let pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  const canonicalUrl = url && !url.includes('localhost') && !url.includes('127.0.0.1')
    ? url
    : `${PRODUCTION_DOMAIN}${pathname === '/' ? '' : pathname}`;

  const absoluteImageUrl = image.startsWith('http')
    ? image
    : `${PRODUCTION_DOMAIN}${image.startsWith('/') ? image : '/' + image}`;

  // Update Document Title
  document.title = title;

  // Helper function to set or create meta tag
  const setMeta = (selector, attrName, attrVal, content) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  // Standard Meta Tags
  setMeta('meta[name="description"]', 'name', 'description', description);
  setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
  setMeta('meta[name="author"]', 'name', 'author', author);

  // Open Graph
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:image"]', 'property', 'og:image', absoluteImageUrl);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMeta('meta[property="og:type"]', 'property', 'og:type', type);

  // Twitter Card
  setMeta('meta[property="twitter:title"]', 'property', 'twitter:title', title);
  setMeta('meta[property="twitter:description"]', 'property', 'twitter:description', description);
  setMeta('meta[property="twitter:image"]', 'property', 'twitter:image', absoluteImageUrl);
  setMeta('meta[property="twitter:card"]', 'property', 'twitter:card', 'summary_large_image');

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", canonicalUrl);

  // JSON-LD Structured Data Injection
  let schemaScript = document.getElementById("dynamic-jsonld-schema");
  if (schemaScript) {
    schemaScript.remove();
  }

  if (schema) {
    schemaScript = document.createElement("script");
    schemaScript.id = "dynamic-jsonld-schema";
    schemaScript.type = "application/ld+json";
    schemaScript.text = JSON.stringify(schema);
    document.head.appendChild(schemaScript);
  }
}

export function generateArticleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.subtitle || article.excerpt,
    "image": [
      article.heroImage?.startsWith('http') ? article.heroImage : `${PRODUCTION_DOMAIN}${article.heroImage}`
    ],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "author": [{
      "@type": "Person",
      "name": article.author?.name || "Kunal Rajput",
      "jobTitle": "Founder & Editor — HackWithKunal",
      "url": "https://www.linkedin.com/in/kunal-rajput-64b4002b4"
    }],
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "HackWithKunal",
      "url": PRODUCTION_DOMAIN,
      "logo": {
        "@type": "ImageObject",
        "url": `${PRODUCTION_DOMAIN}/assets/founder/founder-photo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${PRODUCTION_DOMAIN}/${article.category}/${article.slug}`
    }
  };
}

export function generateFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url?.startsWith('http') ? item.url : `${PRODUCTION_DOMAIN}${item.url?.startsWith('/') ? item.url : '/' + item.url}`
    }))
  };
}
