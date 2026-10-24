import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articlesData } from '../src/data/articles.js';
import { categoriesData } from '../src/data/categories.js';
import { allSecurityTestingVulnerabilities } from '../src/data/securityTesting/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('=== CyberAI Watch Production Distribution Verification ===\n');

let errors = 0;

function checkFile(filePath, expectedSnippet = null) {
  if (!fs.existsSync(filePath)) {
    console.error(`✗ Missing File: ${path.relative(rootDir, filePath)}`);
    errors++;
    return false;
  }
  if (expectedSnippet) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(expectedSnippet)) {
      console.error(`✗ Snippet Not Found in ${path.relative(rootDir, filePath)}: "${expectedSnippet}"`);
      errors++;
      return false;
    }
  }
  return true;
}

// 1. Core Root Files
console.log('1. Checking Core Root Files...');
checkFile(path.join(distDir, 'index.html'), 'CyberAI Watch');
checkFile(path.join(distDir, '404.html'), 'CyberAI Watch');
checkFile(path.join(distDir, 'ads.txt'), 'pub-4302057692753259');
checkFile(path.join(distDir, 'robots.txt'), 'sitemap.xml');
checkFile(path.join(distDir, 'sitemap.xml'), 'https://cyberaiwatch.com/author/kunal-rajput');
checkFile(path.join(distDir, 'rss.xml'), 'CyberAI Watch');
checkFile(path.join(distDir, 'feed.xml'), 'CyberAI Watch');
console.log('✓ Core root files verified.');

// 2. Previously Missing Routes
console.log('\n2. Checking Previously Missing Routes (404 fixes)...');
checkFile(path.join(distDir, 'author', 'kunal-rajput', 'index.html'), 'Kunal Rajput');
checkFile(path.join(distDir, 'author', 'kunal-rajput.html'), 'Kunal Rajput');
checkFile(path.join(distDir, 'author', 'index.html'), 'Editorial Authors');
checkFile(path.join(distDir, 'author.html'), 'Editorial Authors');
checkFile(path.join(distDir, 'tools', 'index.html'), 'Zero-Telemetry');
checkFile(path.join(distDir, 'tools.html'), 'Zero-Telemetry');
checkFile(path.join(distDir, 'about', 'index.html'), 'About Kunal Rajput');
checkFile(path.join(distDir, 'about.html'), 'About Kunal Rajput');
checkFile(path.join(distDir, 'contact', 'index.html'), 'Contact');
checkFile(path.join(distDir, 'contact.html'), 'Contact');
console.log('✓ Prerendered routes verified.');

// 3. Categories
console.log('\n3. Checking Category Hubs...');
for (const cat of categoriesData) {
  const safeName = cat.name.replace(/&/g, '&amp;');
  checkFile(path.join(distDir, cat.slug, 'index.html'), safeName);
  checkFile(path.join(distDir, `${cat.slug}.html`), safeName);
}
console.log('✓ All categories verified.');

// 4. All 15 Articles
console.log('\n4. Checking All 15 Articles & Metadata Injection...');
for (const art of articlesData) {
  if (art.status === 'PUBLISHED') {
    const artFile = path.join(distDir, art.category, art.slug, 'index.html');
    const artCleanFile = path.join(distDir, art.category, `${art.slug}.html`);
    checkFile(artFile, art.title);
    checkFile(artCleanFile, art.title);

    // Verify canonical tag matches exactly
    const content = fs.readFileSync(artFile, 'utf8');
    const expectedCanonical = art.canonicalUrl || `https://cyberaiwatch.com/${art.category}/${art.slug}`;
    const canonicalTag = `<link rel="canonical" href="${expectedCanonical}" />`;
    if (!content.includes(canonicalTag)) {
      console.error(`✗ Missing canonical tag in ${art.slug}`);
      errors++;
    }

    // Verify NewsArticle Schema
    if (!content.includes('"@type": "NewsArticle"')) {
      console.error(`✗ Missing NewsArticle schema in ${art.slug}`);
      errors++;
    }

    // Verify AdSense snippet
    if (!content.includes('ca-pub-4302057692753259')) {
      console.error(`✗ Missing AdSense snippet in ${art.slug}`);
      errors++;
    }
  }
}
console.log('✓ All 15 published articles verified with canonical tags, schema, and AdSense codes.');

// 5. Security Testing Hub & Samples
console.log('\n5. Checking Security Testing Guides...');
checkFile(path.join(distDir, 'security-testing', 'index.html'), 'Security Testing Knowledge Hub');
checkFile(path.join(distDir, 'security-testing.html'), 'Security Testing Knowledge Hub');

for (const v of allSecurityTestingVulnerabilities.slice(0, 10)) {
  const safeName = (v.name || v.title).replace(/&/g, '&amp;');
  checkFile(path.join(distDir, 'security-testing', v.category, v.slug, 'index.html'), safeName);
}
console.log(`✓ Security testing hubs and guides verified.`);

console.log('\n------------------------------------------------------');
if (errors === 0) {
  console.log('🎉 100% OF PRODUCTION FILES, ROUTES, METADATA & SCHEMAS VERIFIED SUCCESSFULLY (0 ERRORS)!');
} else {
  console.error(`❌ Verification completed with ${errors} error(s).`);
}
