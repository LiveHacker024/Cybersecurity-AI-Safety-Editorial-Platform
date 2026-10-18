import https from 'https';
import http from 'http';

const testUrls = [
  'http://cyberaiwatch.com/',
  'http://www.cyberaiwatch.com/',
  'https://www.cyberaiwatch.com/',
  'https://cyberaiwatch.com/',
  'https://cyberaiwatch.com/ads.txt',
  'https://cyberaiwatch.com/robots.txt',
  'https://cyberaiwatch.com/sitemap.xml',
  'https://cyberaiwatch.com/rss.xml',
  'https://cyberaiwatch.com/about',
  'https://cyberaiwatch.com/privacy-policy',
  'https://cyberaiwatch.com/ai-safety/why-did-jacob-coxon-quit-anthropic-ai-safety',
  'https://cyberaiwatch.com/security-news/ai-agents-south-korean-bank-hacks-artex-claude'
];

const userAgents = [
  { name: 'Standard Browser', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' },
  { name: 'Googlebot Desktop', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'Googlebot Smartphone', ua: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'Google-AdSense', ua: 'Mediapartners-Google' },
  { name: 'Curl / Bot', ua: 'curl/7.88.1' }
];

async function checkUrl(url, ua = userAgents[0].ua) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': ua,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    const headers = {};
    for (const [k, v] of res.headers.entries()) {
      headers[k] = v;
    }

    let body = '';
    try {
      body = await res.text();
    } catch (e) {
      body = `[Error reading body: ${e.message}]`;
    }

    return {
      url,
      status: res.status,
      statusText: res.statusText,
      headers,
      bodySnippet: body.slice(0, 500),
      bodyLength: body.length,
      hasAdSenseCode: body.includes('pagead2.googlesyndication.com') || body.includes('ca-pub-'),
      hasPubId: body.includes('4302057692753259'),
      titleMatch: body.match(/<title>([^<]+)<\/title>/i)?.[1]
    };
  } catch (err) {
    return {
      url,
      error: err.message
    };
  }
}

async function runAudit() {
  console.log('====================================================');
  console.log('1. TESTING LIVE URLS & REDIRECTS (Standard Browser UA)');
  console.log('====================================================');
  for (const url of testUrls) {
    const result = await checkUrl(url);
    if (result.error) {
      console.log(`[ERROR] ${url}: ${result.error}`);
    } else {
      console.log(`[HTTP ${result.status}] ${url}`);
      console.log(`  -> Server: ${result.headers['server'] || 'none'}, CF-Ray: ${result.headers['cf-ray'] || 'none'}, Location: ${result.headers['location'] || 'none'}`);
      console.log(`  -> Content-Type: ${result.headers['content-type'] || 'none'}, Size: ${result.bodyLength} bytes`);
      if (result.titleMatch) console.log(`  -> Title: "${result.titleMatch}"`);
      if (result.hasAdSenseCode) console.log(`  -> AdSense snippet detected: YES (PubID 4302057692753259: ${result.hasPubId})`);
    }
  }

  console.log('\n====================================================');
  console.log('2. TESTING USER AGENTS ON HOMEPAGE (Googlebot, AdSense, Curl)');
  console.log('====================================================');
  for (const agent of userAgents) {
    const result = await checkUrl('https://cyberaiwatch.com/', agent.ua);
    console.log(`[UA: ${agent.name}] HTTP ${result.status} | Size: ${result.bodyLength} bytes | Server: ${result.headers?.['server'] || 'none'} | CF-Ray: ${result.headers?.['cf-ray'] || 'none'}`);
    if (result.status === 403) {
      console.log(`  -> Snippet: ${result.bodySnippet.trim()}`);
    }
  }

  console.log('\n====================================================');
  console.log('3. TESTING USER AGENTS ON ADS.TXT');
  console.log('====================================================');
  for (const agent of userAgents) {
    const result = await checkUrl('https://cyberaiwatch.com/ads.txt', agent.ua);
    console.log(`[UA: ${agent.name}] HTTP ${result.status} | Snippet: ${result.bodySnippet?.trim()}`);
  }

  console.log('\n====================================================');
  console.log('4. INSPECTING LIVE ROBOTS.TXT CONTENT');
  console.log('====================================================');
  const robRes = await fetch('https://cyberaiwatch.com/robots.txt');
  console.log('Status:', robRes.status);
  console.log('Headers:', Object.fromEntries(robRes.headers.entries()));
  console.log('Body:\n' + await robRes.text());

  console.log('\n====================================================');
  console.log('5. TESTING NESTED ROUTES WITH REDIRECT FOLLOWED');
  console.log('====================================================');
  const followUrls = [
    'https://cyberaiwatch.com/about/',
    'https://cyberaiwatch.com/contact/',
    'https://cyberaiwatch.com/privacy-policy/',
    'https://cyberaiwatch.com/terms/',
    'https://cyberaiwatch.com/security-testing/',
    'https://cyberaiwatch.com/vulnerabilities/',
    'https://cyberaiwatch.com/news/',
    'https://cyberaiwatch.com/ai-safety/why-did-jacob-coxon-quit-anthropic-ai-safety/',
    'https://cyberaiwatch.com/security-news/ai-agents-south-korean-bank-hacks-artex-claude/'
  ];
  for (const u of followUrls) {
    const res = await fetch(u, { redirect: 'follow' });
    console.log(`[HTTP ${res.status}] ${u} (Final URL: ${res.url}) - Length: ${(await res.text()).length}`);
  }
}

runAudit();
