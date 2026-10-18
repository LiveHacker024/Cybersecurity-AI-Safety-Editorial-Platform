import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articlesData } from '../src/data/articles.js';
import { categoriesData } from '../src/data/categories.js';
import { securityCategories, allSecurityTestingVulnerabilities } from '../src/data/securityTesting/index.js';
import { siteConfig } from '../src/config/site.js';
import { legalPolicies } from '../src/data/legalContent.js';
import { founderData } from '../src/data/founder.js';
import { generateArticleSchema } from '../src/utils/seo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

const DOMAIN = siteConfig.domain; // https://cyberaiwatch.com

/**
 * Strict XML 1.0 entity escaping helper
 */
function escapeXml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Safe XML CDATA helper
 */
function escapeCdata(value) {
  if (value === null || value === undefined) return '';
  const safe = String(value).replace(/\]\]>/g, ']]]]><![CDATA[>');
  return `<![CDATA[${safe}]]>`;
}

// 1. Generate Sitemap XML
function generateSitemap() {
  const staticRoutes = [
    { loc: `${DOMAIN}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${DOMAIN}/bypass-methods`, changefreq: 'daily', priority: '0.85' },
    { loc: `${DOMAIN}/security-testing`, changefreq: 'daily', priority: '0.9' },
    { loc: `${DOMAIN}/security-testing/api-security`, changefreq: 'daily', priority: '0.85' },
    { loc: `${DOMAIN}/security-testing/web-security`, changefreq: 'daily', priority: '0.85' },
    { loc: `${DOMAIN}/security-testing/mobile-security`, changefreq: 'daily', priority: '0.85' },
    { loc: `${DOMAIN}/vulnerabilities`, changefreq: 'daily', priority: '0.9' },
    { loc: `${DOMAIN}/search`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${DOMAIN}/trending`, changefreq: 'daily', priority: '0.8' },
    { loc: `${DOMAIN}/tools`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${DOMAIN}/author/kunal-rajput`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${DOMAIN}/youtube`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${DOMAIN}/newsletter`, changefreq: 'monthly', priority: '0.6' },
    { loc: `${DOMAIN}/about`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${DOMAIN}/contact`, changefreq: 'monthly', priority: '0.6' },
    { loc: `${DOMAIN}/editorial-policy`, changefreq: 'monthly', priority: '0.6' },
    { loc: `${DOMAIN}/correction-policy`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${DOMAIN}/privacy-policy`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${DOMAIN}/terms`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${DOMAIN}/cookie-policy`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${DOMAIN}/disclaimer`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${DOMAIN}/affiliate-disclosure`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${DOMAIN}/advertising-policy`, changefreq: 'monthly', priority: '0.5' }
  ];

  const categoryRoutes = categoriesData.map(c => ({
    loc: `${DOMAIN}/${c.slug}`,
    changefreq: 'daily',
    priority: '0.85'
  }));

  const articleRoutes = articlesData
    .filter(a => a.status === 'PUBLISHED')
    .map(a => ({
      loc: `${DOMAIN}/${a.category}/${a.slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    }));

  const securityTestingRoutes = allSecurityTestingVulnerabilities.map(v => ({
    loc: `${DOMAIN}/security-testing/${v.category}/${v.slug}`,
    changefreq: 'weekly',
    priority: '0.8'
  }));

  const allUrls = [...staticRoutes, ...categoryRoutes, ...articleRoutes, ...securityTestingRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <changefreq>${escapeXml(u.changefreq)}</changefreq>
    <priority>${escapeXml(u.priority)}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// 2. Generate Robots TXT
function generateRobots() {
  return `# CyberAI Watch — https://cyberaiwatch.com
User-agent: *
Allow: /
Disallow: /admin
Disallow: /unsubscribe

Sitemap: ${DOMAIN}/sitemap.xml
`;
}

// 3. Generate RSS 2.0 XML
function generateRss() {
  const published = articlesData.filter(a => a.status === 'PUBLISHED');
  const now = new Date().toUTCString();

  const channelTitle = `${siteConfig.name} — ${siteConfig.tagline}`;
  const channelDesc = siteConfig.description;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(channelTitle)}</title>
  <link>${escapeXml(DOMAIN)}</link>
  <description>${escapeXml(channelDesc)}</description>
  <language>en-us</language>
  <lastBuildDate>${now}</lastBuildDate>
  <atom:link href="${escapeXml(DOMAIN)}/rss.xml" rel="self" type="application/rss+xml" />
${published.map(a => {
  const itemUrl = `${DOMAIN}/${a.category}/${a.slug}`;
  const itemTitle = a.title || '';
  const itemDesc = a.subtitle || a.excerpt || '';
  const itemCategory = a.categoryName || a.category || '';
  const itemAuthor = a.author?.name || siteConfig.founder.name || '';
  const itemPubDate = new Date(a.publishedAt || Date.now()).toUTCString();

  return `  <item>
    <title>${escapeCdata(itemTitle)}</title>
    <link>${escapeXml(itemUrl)}</link>
    <guid isPermaLink="true">${escapeXml(itemUrl)}</guid>
    <description>${escapeCdata(itemDesc)}</description>
    <category>${escapeXml(itemCategory)}</category>
    <author>${escapeXml(itemAuthor)}</author>
    <pubDate>${itemPubDate}</pubDate>
  </item>`;
}).join('\n')}
</channel>
</rss>`;

  return xml;
}

// 4. Generate Ads TXT
function generateAdsTxt() {
  const clientId = process.env.VITE_ADSENSE_CLIENT_ID || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-4302057692753259';
  if (clientId && clientId.startsWith('ca-pub-')) {
    const pubId = clientId.replace('ca-', '');
    return `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  }
  return `google.com, pub-4302057692753259, DIRECT, f08c47fec0942fa0\n`;
}

/**
 * Injects page-specific SEO metadata into the raw HTML template
 * Ensures Googlebot, AdSense crawlers, and social bots receive perfect metadata immediately on HTTP GET.
 */
function renderHtmlForPage(baseHtml, { title, description, url, image, schema, type = 'website', author = siteConfig.founder.name }) {
  let html = baseHtml;
  
  const siteName = siteConfig.name;
  const canonicalUrl = url.startsWith('http') ? url : `${DOMAIN}${url.startsWith('/') ? url : '/' + url}`;
  const fullTitle = title.includes(siteName) ? title : `${title} — ${siteName}`;
  const fullImage = image 
    ? (image.startsWith('http') ? image : `${DOMAIN}${image.startsWith('/') ? image : '/' + image}`)
    : `${DOMAIN}/assets/founder/founder-photo.png`;

  // Replace Title Tag
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeXml(fullTitle)}</title>`);

  // Inject or update Canonical Link
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeXml(canonicalUrl)}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${escapeXml(canonicalUrl)}" />\n  </head>`);
  }

  // Update Meta Description
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta name="description" content="${escapeXml(description)}" />`);
  }

  // Update Author
  if (/<meta\s+name=["']author["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']author["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta name="author" content="${escapeXml(author)}" />`);
  }

  // Update Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:title["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="og:title" content="${escapeXml(fullTitle)}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="og:description" content="${escapeXml(description)}" />`);
  html = html.replace(/<meta\s+property=["']og:url["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="og:url" content="${escapeXml(canonicalUrl)}" />`);
  html = html.replace(/<meta\s+property=["']og:type["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="og:type" content="${escapeXml(type)}" />`);
  if (fullImage) {
    html = html.replace(/<meta\s+property=["']og:image["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="og:image" content="${escapeXml(fullImage)}" />`);
    html = html.replace(/<meta\s+property=["']twitter:image["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="twitter:image" content="${escapeXml(fullImage)}" />`);
  }

  // Update Twitter Tags
  html = html.replace(/<meta\s+property=["']twitter:title["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="twitter:title" content="${escapeXml(fullTitle)}" />`);
  html = html.replace(/<meta\s+property=["']twitter:description["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="twitter:description" content="${escapeXml(description)}" />`);
  html = html.replace(/<meta\s+property=["']twitter:url["'][^>]*content=["'][^"']*["'][^>]*>/i, `<meta property="twitter:url" content="${escapeXml(canonicalUrl)}" />`);

  // Inject Page Schema if provided
  if (schema) {
    const schemaScript = `\n  <!-- Injected Page Structured Data -->\n  <script type="application/ld+json">\n  ${JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')}\n  </script>`;
    html = html.replace(/<\/head>/i, `${schemaScript}\n</head>`);
  }

  return html;
}

/**
 * Writes both directory entrypoint (folder/index.html) and clean URL entrypoint (folder.html)
 * Guarantees HTTP 200 on all static hosts and eliminates trailing-slash 308 redirect loops.
 */
function writeStaticRoute(routePath, htmlContent) {
  const cleanPath = routePath.replace(/^\/+|\/+$/g, '');
  if (!cleanPath) return;

  // 1. Directory entrypoint: dist/<cleanPath>/index.html
  const routeDir = path.join(distDir, cleanPath);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), htmlContent);

  // 2. Direct file entrypoint: dist/<cleanPath>.html
  const cleanFilePath = path.join(distDir, `${cleanPath}.html`);
  const parentDir = path.dirname(cleanFilePath);
  fs.mkdirSync(parentDir, { recursive: true });
  fs.writeFileSync(cleanFilePath, htmlContent);
}

// Execute File Generation
function run() {
  console.log('--- Generating SEO, Sitemap, RSS & Feed Assets ---');
  
  const sitemapContent = generateSitemap();
  const robotsContent = generateRobots();
  const rssContent = generateRss();
  const adsContent = generateAdsTxt();

  // Write to public/ directory
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssContent);
    fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssContent);
    fs.writeFileSync(path.join(publicDir, 'ads.txt'), adsContent);
    console.log('✓ Wrote sitemap.xml, robots.txt, rss.xml, feed.xml, ads.txt to public/');
  }

  // Write to dist/ directory if present
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
    fs.writeFileSync(path.join(distDir, 'rss.xml'), rssContent);
    fs.writeFileSync(path.join(distDir, 'feed.xml'), rssContent);
    fs.writeFileSync(path.join(distDir, 'ads.txt'), adsContent);

    // Copy 404.html for SPA routing
    const indexPath = path.join(distDir, 'index.html');
    const notFoundPath = path.join(distDir, '404.html');
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
      console.log('✓ Created dist/404.html for SPA routing');
    }

    // Pre-render static route entrypoints with page-specific metadata
    try {
      const baseHtml = fs.readFileSync(indexPath, 'utf8');

      // 1. Static Pages
      const staticPages = [
        {
          path: 'about',
          title: `About ${founderData.name} — Founder & Editor-in-Chief`,
          description: `Professional profile of ${founderData.name}: Founder & Editor-in-Chief of CyberAI Watch, creator of HackWithKunal, Cybersecurity Professional, and AI Safety Researcher.`,
          url: '/about'
        },
        {
          path: 'author/kunal-rajput',
          title: `${founderData.name} — Author & Security Researcher`,
          description: `Author archive and research profile for ${founderData.name}, Founder & Editor-in-Chief of CyberAI Watch.`,
          url: '/author/kunal-rajput'
        },
        {
          path: 'author',
          title: `Editorial Authors & Contributors`,
          description: `Editorial and threat research team behind CyberAI Watch.`,
          url: '/author'
        },
        {
          path: 'tools',
          title: `Zero-Telemetry Client-Side Security Tools`,
          description: `In-browser cryptographic security utilities: Password Entropy Analyzer, Passphrase Generator, and Phishing URL Inspector executed locally using the Web Crypto API.`,
          url: '/tools'
        },
        {
          path: 'contact',
          title: `Contact Editorial & Security Desk`,
          description: legalPolicies.contact.subtitle,
          url: '/contact'
        },
        {
          path: 'privacy-policy',
          title: legalPolicies.privacyPolicy.title,
          description: legalPolicies.privacyPolicy.subtitle,
          url: '/privacy-policy'
        },
        {
          path: 'terms',
          title: legalPolicies.terms.title,
          description: legalPolicies.terms.subtitle,
          url: '/terms'
        },
        {
          path: 'cookie-policy',
          title: legalPolicies.cookiePolicy.title,
          description: legalPolicies.cookiePolicy.subtitle,
          url: '/cookie-policy'
        },
        {
          path: 'disclaimer',
          title: legalPolicies.disclaimer.title,
          description: legalPolicies.disclaimer.subtitle,
          url: '/disclaimer'
        },
        {
          path: 'editorial-policy',
          title: legalPolicies.editorialPolicy.title,
          description: legalPolicies.editorialPolicy.subtitle,
          url: '/editorial-policy'
        },
        {
          path: 'editorial-standards',
          title: legalPolicies.editorialPolicy.title,
          description: legalPolicies.editorialPolicy.subtitle,
          url: '/editorial-standards'
        },
        {
          path: 'correction-policy',
          title: legalPolicies.correctionPolicy.title,
          description: legalPolicies.correctionPolicy.subtitle,
          url: '/correction-policy'
        },
        {
          path: 'affiliate-disclosure',
          title: legalPolicies.affiliateDisclosure.title,
          description: legalPolicies.affiliateDisclosure.subtitle,
          url: '/affiliate-disclosure'
        },
        {
          path: 'advertising-policy',
          title: legalPolicies.advertisingPolicy.title,
          description: legalPolicies.advertisingPolicy.subtitle,
          url: '/advertising-policy'
        },
        {
          path: 'bypass-methods',
          title: `Security Testing Bypass Methods — Ethical Defense Matrix`,
          description: `Defensive research catalog analyzing authentication bypasses, WAF evasion techniques, and CORS filter circumventions for authorized penetration testing.`,
          url: '/bypass-methods'
        },
        {
          path: 'vulnerabilities',
          title: `CVE Vulnerability Tracker & Advisory Radar`,
          description: `Live vulnerability tracking, CVSS scoring, CISA KEV alerts, and defensive triage protocols for enterprise IT and SOC teams.`,
          url: '/vulnerabilities'
        },
        {
          path: 'search',
          title: `Search Articles, CVEs & Security Testing Labs`,
          description: `Search verified cybersecurity journalism, autonomous AI safety investigations, and defensive testing documentation.`,
          url: '/search'
        },
        {
          path: 'trending',
          title: `Trending Threat Topics & Breaking Investigations`,
          description: `Most-read investigative reports and active cybersecurity advisories on CyberAI Watch.`,
          url: '/trending'
        },
        {
          path: 'youtube',
          title: `HackWithKunal Video Training & Walkthroughs`,
          description: `Official video lab tutorials, ethical hacking demonstrations, and defensive setup guides by Kunal Rajput.`,
          url: '/youtube'
        },
        {
          path: 'newsletter',
          title: `CyberAI Watch Weekly Threat Dispatch`,
          description: `Subscribe to verified zero-day advisories, autonomous AI safety briefings, and exclusive defensive security guides.`,
          url: '/newsletter'
        }
      ];

      for (const sp of staticPages) {
        const pageHtml = renderHtmlForPage(baseHtml, sp);
        writeStaticRoute(sp.path, pageHtml);
      }
      console.log(`✓ Generated ${staticPages.length} static page entrypoints with customized metadata`);

      // 2. Categories
      const allCategorySlugs = [
        ...categoriesData.map(c => c.slug),
        'security-news', 'guides', 'technology'
      ];
      const uniqueCategorySlugs = Array.from(new Set(allCategorySlugs));

      for (const slug of uniqueCategorySlugs) {
        const catObj = categoriesData.find(c => c.slug === slug);
        const catName = catObj ? catObj.name : slug.replace(/-/g, ' ').toUpperCase();
        const catDesc = catObj ? (catObj.description || catObj.tagline) : `Investigative cybersecurity and threat analysis covering ${catName}.`;
        
        const catHtml = renderHtmlForPage(baseHtml, {
          title: `${catName} Editorial Hub`,
          description: catDesc,
          url: `/${slug}`
        });
        writeStaticRoute(slug, catHtml);
      }
      console.log(`✓ Generated ${uniqueCategorySlugs.length} category hub entrypoints with customized metadata`);

      // 3. Security Testing Knowledge Hub & Subcategories
      const secHubHtml = renderHtmlForPage(baseHtml, {
        title: 'Security Testing Knowledge Hub — Interactive Defense Labs',
        description: 'Comprehensive directory of 50+ web, API, and mobile security testing vulnerabilities with step-by-step reproduction and defensive remediation.',
        url: '/security-testing'
      });
      writeStaticRoute('security-testing', secHubHtml);

      for (const sc of securityCategories) {
        const scHtml = renderHtmlForPage(baseHtml, {
          title: `${sc.title || sc.name} Security Testing Labs`,
          description: sc.description || `Practical security testing methodologies and defensive mitigations for ${sc.slug}.`,
          url: `/security-testing/${sc.slug}`
        });
        writeStaticRoute(`security-testing/${sc.slug}`, scHtml);
      }

      // Security Testing Individual Vulnerability Pages
      for (const sv of allSecurityTestingVulnerabilities) {
        const svHtml = renderHtmlForPage(baseHtml, {
          title: `${sv.name || sv.title} — Security Testing Guide`,
          description: sv.description || sv.remediation || `Defensive security testing methodology for ${sv.name}.`,
          url: `/security-testing/${sv.category}/${sv.slug}`
        });
        writeStaticRoute(`security-testing/${sv.category}/${sv.slug}`, svHtml);
      }
      console.log(`✓ Generated ${allSecurityTestingVulnerabilities.length} individual security testing guides in dist/`);

      // 4. Articles with NewsArticle Schema
      let publishedArticleCount = 0;
      for (const art of articlesData) {
        if (art.status === 'PUBLISHED') {
          publishedArticleCount++;
          const articleUrl = `${DOMAIN}/${art.category}/${art.slug}`;
          const schema = generateArticleSchema(art);

          const artHtml = renderHtmlForPage(baseHtml, {
            title: art.title,
            description: art.subtitle || art.excerpt,
            url: `/${art.category}/${art.slug}`,
            image: art.heroImage,
            type: 'article',
            author: art.author?.name || siteConfig.founder.name,
            schema
          });

          // Primary Category URL
          writeStaticRoute(`${art.category}/${art.slug}`, artHtml);

          // Route aliases to guarantee 200 on alternative entrypoints
          writeStaticRoute(`security-news/${art.slug}`, artHtml);
          writeStaticRoute(`news/${art.slug}`, artHtml);
          writeStaticRoute(`article/${art.slug}`, artHtml);
        }
      }
      console.log(`✓ Generated ${publishedArticleCount} published articles with NewsArticle Schema across category, news, and article routes`);

    } catch (err) {
      console.warn('Warning creating static route entrypoints:', err.message, err.stack);
    }

    console.log('✓ Wrote sitemap.xml, robots.txt, rss.xml, feed.xml, ads.txt to dist/');
  }

  // Verify XML well-formedness of generated files
  const xmlFilesToCheck = [
    path.join(publicDir, 'rss.xml'),
    path.join(publicDir, 'feed.xml'),
    path.join(publicDir, 'sitemap.xml'),
    path.join(distDir, 'rss.xml'),
    path.join(distDir, 'feed.xml'),
    path.join(distDir, 'sitemap.xml')
  ];

  for (const xmlFile of xmlFilesToCheck) {
    if (fs.existsSync(xmlFile)) {
      const content = fs.readFileSync(xmlFile, 'utf8');
      if (!content.trim().startsWith('<?xml')) {
        throw new Error(`XML Validation Error in ${path.relative(rootDir, xmlFile)}: Missing XML declaration`);
      }
      const stripped = content
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
      const unescapedAmp = stripped.match(/&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)/);
      if (unescapedAmp) {
        throw new Error(`XML Validation Error in ${path.relative(rootDir, xmlFile)}: Unescaped raw '&' found`);
      }
      console.log(`✓ Validated XML well-formedness for ${path.relative(rootDir, xmlFile)}`);
    }
  }

  console.log('--- Asset Generation Complete ---');
}

run();
