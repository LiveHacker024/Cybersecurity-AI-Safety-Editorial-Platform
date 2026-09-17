/**
 * CyberAI Watch — Advanced Technical SEO & Dynamic Schema.org Generator
 * Domain: https://cyberaiwatch.com
 * Supports: NewsArticle, Organization, Person, BreadcrumbList, WebSite, FAQPage
 */

import { siteConfig } from "../config/site";

const PRODUCTION_DOMAIN = siteConfig.domain;

export function updateMetaTags({
  title = `${siteConfig.name} — ${siteConfig.tagline}`,
  description = siteConfig.description,
  keywords = "cybersecurity, AI safety, threat intelligence, data breaches, AI agents, deepfakes, phishing defense, zero-day CVE, Kunal Rajput, HackWithKunal, CyberAI Watch",
  image = "/assets/founder/founder-photo.png",
  url = null,
  type = "website",
  publishedTime = null,
  modifiedTime = null,
  author = siteConfig.founder.name,
  schema = null
}) {
  let pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  
  const canonicalUrl = url && !url.includes('localhost') && !url.includes('127.0.0.1')
    ? url
    : `${PRODUCTION_DOMAIN}${pathname === '/' ? '' : pathname}`;

  const absoluteImageUrl = image.startsWith('http')
    ? image
    : `${PRODUCTION_DOMAIN}${image.startsWith('/') ? image : '/' + image}`;

  // Document Title
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
  setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Open Graph
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.name);
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:image"]', 'property', 'og:image', absoluteImageUrl);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMeta('meta[property="og:type"]', 'property', 'og:type', type);

  if (publishedTime) {
    setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
  }
  if (modifiedTime) {
    setMeta('meta[property="article:modified_time"]', 'property', 'article:modified_time', modifiedTime);
  }

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

  // Dynamic JSON-LD Schema Injection
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
  const articleUrl = `${PRODUCTION_DOMAIN}/${article.category}/${article.slug}`;
  const imageUrl = article.heroImage
    ? (article.heroImage.startsWith('http') ? article.heroImage : `${PRODUCTION_DOMAIN}${article.heroImage.startsWith('/') ? article.heroImage : '/' + article.heroImage}`)
    : `${PRODUCTION_DOMAIN}/assets/founder/founder-photo.png`;

  const schemas = [
    {
      "@type": "NewsArticle",
      "@id": `${articleUrl}#article`,
      "isPartOf": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "headline": article.title,
      "description": article.subtitle || article.excerpt,
      "image": [imageUrl],
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt || article.publishedAt,
      "author": [{
        "@type": "Person",
        "name": article.author?.name || siteConfig.founder.name,
        "jobTitle": article.author?.role || siteConfig.founder.title,
        "url": siteConfig.founder.socials.linkedin
      }],
      "publisher": {
        "@type": "NewsMediaOrganization",
        "name": siteConfig.name,
        "url": PRODUCTION_DOMAIN,
        "logo": {
          "@type": "ImageObject",
          "url": `${PRODUCTION_DOMAIN}/assets/founder/founder-photo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": PRODUCTION_DOMAIN
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": article.categoryName || article.category,
          "item": `${PRODUCTION_DOMAIN}/${article.category}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": article.title,
          "item": articleUrl
        }
      ]
    }
  ];

  if (article.faqs && article.faqs.length > 0) {
    schemas.push({
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      "mainEntity": article.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": schemas
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

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": PRODUCTION_DOMAIN,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${PRODUCTION_DOMAIN}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}
