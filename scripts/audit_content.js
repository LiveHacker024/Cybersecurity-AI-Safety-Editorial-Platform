import { articlesData } from '../src/data/articles.js';
import { categoriesData } from '../src/data/categories.js';
import { securityCategories, allSecurityTestingVulnerabilities } from '../src/data/securityTesting/index.js';
import { threatNodesData } from '../src/data/threats.js';

console.log('====================================================');
console.log('1. ARTICLES AUDIT');
console.log('====================================================');
console.log(`Total articles: ${articlesData.length}`);

let totalWords = 0;
let publishedCount = 0;
let thinArticles = [];
let missingDates = [];
let missingAuthors = [];
let missingSources = [];

articlesData.forEach((a, i) => {
  const words = (a.content || '').trim().split(/\s+/).filter(Boolean).length;
  totalWords += words;
  if (a.status === 'PUBLISHED') publishedCount++;

  const hasSources = (a.sources && a.sources.length > 0) || (a.content && a.content.toLowerCase().includes('source'));
  const hasDate = Boolean(a.publishedAt);
  const hasAuthor = Boolean(a.author && a.author.name);

  if (words < 400) thinArticles.push({ slug: a.slug, words });
  if (!hasDate) missingDates.push(a.slug);
  if (!hasAuthor) missingAuthors.push(a.slug);
  if (!hasSources) missingSources.push(a.slug);

  console.log(`[${i + 1}] ${a.slug}`);
  console.log(`    Title: ${a.title}`);
  console.log(`    Status: ${a.status} | Cat: ${a.category} | Words: ${words}`);
  console.log(`    Published: ${a.publishedAt} | Updated: ${a.updatedAt || 'N/A'}`);
  console.log(`    Author: ${a.author?.name} (${a.author?.role})`);
  console.log(`    Sources count: ${a.sources?.length || 0}`);
});

console.log('\n--- Summary ---');
console.log(`Published: ${publishedCount} / ${articlesData.length}`);
console.log(`Average words per article: ${Math.round(totalWords / articlesData.length)}`);
console.log(`Thin articles (<400 words): ${thinArticles.length}`, thinArticles);
console.log(`Missing dates: ${missingDates.length}`, missingDates);
console.log(`Missing authors: ${missingAuthors.length}`, missingAuthors);
console.log(`Missing sources: ${missingSources.length}`, missingSources);

console.log('\n====================================================');
console.log('2. CATEGORIES AUDIT');
console.log('====================================================');
console.log(`Total categories: ${categoriesData.length}`);
categoriesData.forEach(c => {
  const count = articlesData.filter(a => a.category === c.slug && a.status === 'PUBLISHED').length;
  console.log(`  - ${c.name} (/${c.slug}): ${count} published articles`);
});

console.log('\n====================================================');
console.log('3. SECURITY TESTING KNOWLEDGE HUB AUDIT');
console.log('====================================================');
console.log(`Total security testing categories: ${securityCategories.length}`);
console.log(`Total security testing guides/vulns: ${allSecurityTestingVulnerabilities.length}`);
securityCategories.forEach(sc => {
  const vulns = allSecurityTestingVulnerabilities.filter(v => v.category === sc.slug);
  console.log(`  - ${sc.title} (slug: ${sc.slug}): ${vulns.length} vulnerabilities/guides`);
});

console.log('\n====================================================');
console.log('4. THREAT INTELLIGENCE AUDIT');
console.log('====================================================');
console.log(`Total threat items: ${threatNodesData?.length || 0}`);
