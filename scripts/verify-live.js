async function verify() {
  const liveArticleUrl = 'https://cyberaiwatch.com/ai-safety/why-did-jacob-coxon-quit-anthropic-ai-safety';
  const liveSitemapUrl = 'https://cyberaiwatch.com/sitemap.xml';
  const liveRssUrl = 'https://cyberaiwatch.com/rss.xml';
  const liveRobotsUrl = 'https://cyberaiwatch.com/robots.txt';
  const liveImageUrl = 'https://cyberaiwatch.com/assets/images/jacob-coxon-anthropic-ai-safety.jpg';

  console.log('=== VERIFYING LIVE CLOUDFLARE PRODUCTION DEPLOYMENT ===\n');

  // 1. Article Page
  const artRes = await fetch(liveArticleUrl);
  console.log(`1. Article Route [${liveArticleUrl}]: HTTP ${artRes.status}`);
  const artHtml = await artRes.text();
  console.log(`   - Root container found: ${artHtml.includes('id="root"')}`);
  console.log(`   - Script bundle referenced: ${artHtml.includes('index-')}`);

  // 2. Image
  const imgRes = await fetch(liveImageUrl);
  console.log(`2. Hero Image [${liveImageUrl}]: HTTP ${imgRes.status} (${imgRes.headers.get('content-type')})`);

  // 3. Sitemap
  const smRes = await fetch(liveSitemapUrl);
  const smText = await smRes.text();
  const smMatch = smText.includes('why-did-jacob-coxon-quit-anthropic-ai-safety');
  console.log(`3. Sitemap [${liveSitemapUrl}]: HTTP ${smRes.status}`);
  console.log(`   - Contains new article URL: ${smMatch}`);

  // 4. RSS Feed
  const rssRes = await fetch(liveRssUrl);
  const rssText = await rssRes.text();
  const rssMatch = rssText.includes('Why Did Jacob Coxon Quit Anthropic? AI Safety Concerns Explained');
  console.log(`4. RSS Feed [${liveRssUrl}]: HTTP ${rssRes.status}`);
  console.log(`   - Contains new article: ${rssMatch}`);

  // 5. Robots.txt
  const robRes = await fetch(liveRobotsUrl);
  const robText = await robRes.text();
  console.log(`5. Robots.txt [${liveRobotsUrl}]: HTTP ${robRes.status}`);
  console.log(`   - Points to Sitemap: ${robText.includes('Sitemap:')}`);

  console.log('\n=== LIVE PRODUCTION VERIFICATION COMPLETE ===');
}

verify().catch(console.error);
