import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('=== CyberAI Watch Comprehensive Verification Suite ===\n');
  let failures = 0;

  // 1. Verify Dev Server Route & Images
  console.log('1. Testing Dev Server HTTP Endpoints...');
  const endpoints = [
    '/',
    '/ai-security',
    '/ai-security/ai-agents-south-korean-bank-hacks-artex-claude/',
    '/assets/images/ai-agents-south-korean-bank-hacks-artex-claude-hero.webp',
    '/assets/images/artex-ai-agent-cybersecurity-explained.webp',
    '/assets/images/claude-code-agentic-cybersecurity-workflow.webp',
    '/assets/images/agentic-ai-vs-traditional-cybersecurity-automation.webp',
    '/assets/images/defending-banks-against-ai-assisted-cyber-attacks.webp'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetchUrl(`http://127.0.0.1:5173${ep}`);
      if (res.statusCode === 200) {
        console.log(`  ✓ [HTTP 200] ${ep}`);
      } else {
        console.error(`  ✗ [HTTP ${res.statusCode}] ${ep}`);
        failures++;
      }
    } catch (err) {
      console.error(`  ✗ Failed to connect to ${ep}:`, err.message);
      failures++;
    }
  }

  // 2. Test Search Index Matching
  console.log('\n2. Testing Search Discovery for Required Keywords...');
  const { articlesData } = await import('../src/data/articles.js');
  const targetArticle = articlesData.find(a => a.slug === 'ai-agents-south-korean-bank-hacks-artex-claude');

  if (!targetArticle) {
    console.error('  ✗ Target article not found in articlesData!');
    failures++;
  } else {
    console.log(`  ✓ Found target article: "${targetArticle.title}"`);
    
    const requiredQueries = [
      'AI agents',
      'AI hacking',
      'ARTEX',
      'Claude Code',
      'South Korea',
      'bank hacks',
      'AI cyber attack',
      'agentic AI',
      'cybersecurity'
    ];

    for (const q of requiredQueries) {
      const trimmed = q.toLowerCase().trim();
      const matched = (
        targetArticle.title.toLowerCase().includes(trimmed) ||
        (targetArticle.subtitle && targetArticle.subtitle.toLowerCase().includes(trimmed)) ||
        (targetArticle.excerpt && targetArticle.excerpt.toLowerCase().includes(trimmed)) ||
        (targetArticle.content && targetArticle.content.toLowerCase().includes(trimmed)) ||
        (targetArticle.tags && targetArticle.tags.some(t => t.toLowerCase().includes(trimmed))) ||
        (targetArticle.keywords && targetArticle.keywords.toLowerCase().includes(trimmed)) ||
        (targetArticle.categoryName && targetArticle.categoryName.toLowerCase().includes(trimmed))
      );
      if (matched) {
        console.log(`  ✓ Search query "${q}" -> MATCHED`);
      } else {
        console.error(`  ✗ Search query "${q}" -> NOT MATCHED`);
        failures++;
      }
    }
  }

  // 3. Test Sitemap and RSS
  console.log('\n3. Testing Sitemap and RSS XML Feed Inclusions...');
  const sitemap = fs.readFileSync(path.join(rootDir, 'public', 'sitemap.xml'), 'utf8');
  const rss = fs.readFileSync(path.join(rootDir, 'public', 'rss.xml'), 'utf8');

  const targetUrl = 'https://cyberaiwatch.com/ai-security/ai-agents-south-korean-bank-hacks-artex-claude';

  if (sitemap.includes(targetUrl)) {
    console.log(`  ✓ Sitemap contains: ${targetUrl}`);
  } else {
    console.error(`  ✗ Sitemap missing: ${targetUrl}`);
    failures++;
  }

  if (rss.includes(targetUrl)) {
    console.log(`  ✓ RSS feed contains: ${targetUrl}`);
  } else {
    console.error(`  ✗ RSS feed missing: ${targetUrl}`);
    failures++;
  }

  // 4. Test SEO and Schema Generation
  console.log('\n4. Testing Structured Data Schema Generation...');
  const { generateArticleSchema } = await import('../src/utils/seo.js');
  const schemaObj = generateArticleSchema(targetArticle);
  
  if (schemaObj && schemaObj['@graph'] && schemaObj['@graph'].length >= 3) {
    const types = schemaObj['@graph'].map(g => g['@type']);
    console.log(`  ✓ Generated Schema Types: ${types.join(', ')}`);
  } else {
    console.error('  ✗ Incomplete Schema Graph:', schemaObj);
    failures++;
  }

  console.log('\n------------------------------------------------------');
  if (failures === 0) {
    console.log('🎉 ALL AUTOMATED VERIFICATIONS PASSED WITH 0 ERRORS!');
  } else {
    console.error(`❌ Verification finished with ${failures} error(s).`);
  }
}

runTests();
