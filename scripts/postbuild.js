import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articlesData } from '../src/data/articles.js';
import { categoriesData } from '../src/data/categories.js';
import { siteConfig } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

const DOMAIN = siteConfig.domain; // https://cyberaiwatch.com

/**
 * Strict XML 1.0 entity escaping helper
 * Converts special characters (&, <, >, ", ') into standard XML entities.
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
 * Wraps dynamic content in <![CDATA[...]]> and escapes any internal ']]>' sequences
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
    { loc: `${DOMAIN}/vulnerabilities`, changefreq: 'daily', priority: '0.9' },
    { loc: `${DOMAIN}/search`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${DOMAIN}/trending`, changefreq: 'daily', priority: '0.8' },
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

  const allUrls = [...staticRoutes, ...categoryRoutes, ...articleRoutes];

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

    // Pre-render static route entrypoints in dist for guaranteed HTTP 200 responses
    try {
      const indexHtml = fs.readFileSync(indexPath, 'utf8');

      // Categories
      for (const cat of categoriesData) {
        const catDir = path.join(distDir, cat.slug);
        fs.mkdirSync(catDir, { recursive: true });
        fs.writeFileSync(path.join(catDir, 'index.html'), indexHtml);
      }

      // Articles
      for (const art of articlesData) {
        if (art.status === 'PUBLISHED') {
          const artDir = path.join(distDir, art.category, art.slug);
          fs.mkdirSync(artDir, { recursive: true });
          fs.writeFileSync(path.join(artDir, 'index.html'), indexHtml);
        }
      }

      // Static routes
      const staticPaths = [
        'vulnerabilities', 'search', 'trending', 'youtube', 'newsletter',
        'about', 'contact', 'editorial-policy', 'correction-policy',
        'privacy-policy', 'terms', 'cookie-policy', 'disclaimer',
        'affiliate-disclosure', 'advertising-policy'
      ];
      for (const sp of staticPaths) {
        const sDir = path.join(distDir, sp);
        fs.mkdirSync(sDir, { recursive: true });
        fs.writeFileSync(path.join(sDir, 'index.html'), indexHtml);
      }

      console.log('✓ Created static HTML route entrypoints for all articles and categories in dist/');
    } catch (err) {
      console.warn('Warning creating static route entrypoints:', err.message);
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
      // Verify basic XML structure
      if (!content.trim().startsWith('<?xml')) {
        throw new Error(`XML Validation Error in ${path.relative(rootDir, xmlFile)}: Missing XML declaration`);
      }
      // Check for illegal unescaped & characters outside CDATA and comments
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
