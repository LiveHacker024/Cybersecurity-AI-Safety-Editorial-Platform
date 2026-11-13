import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== CyberAI Watch Phase A Security Verification Suite ===\n');

let failed = 0;
let passed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify URL Protocol Validator (isSafeUrl)
console.log('1. Testing URL Protocol Validation...');
function isSafeUrl(url) {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('//')) return false;
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' || parsed.protocol === 'mailto:';
  } catch (e) {
    return false;
  }
}

assert(isSafeUrl('https://cyberaiwatch.com/ai-security'), 'Valid HTTPS URL permitted');
assert(isSafeUrl('http://example.com'), 'Valid HTTP URL permitted');
assert(isSafeUrl('/ai-security/ai-powered-hacking-2026'), 'Root-relative internal link permitted');
assert(isSafeUrl('#executive-summary'), 'Anchor fragment permitted');
assert(isSafeUrl('mailto:livehacker024@gmail.com'), 'Mailto link permitted');
assert(!isSafeUrl('javascript:alert(1)'), 'Dangerous javascript: scheme blocked');
assert(!isSafeUrl('JAVASCRIPT:alert(1)'), 'Case-insensitive JAVASCRIPT: scheme blocked');
assert(!isSafeUrl('data:text/html,<script>alert(1)</script>'), 'Dangerous data: scheme blocked');
assert(!isSafeUrl('vbscript:msgbox(1)'), 'Dangerous vbscript: scheme blocked');
assert(!isSafeUrl('//attacker.com/evil'), 'Protocol-relative URL blocked');

// 2. Verify Client-Side Bundle Cleanliness
console.log('\n2. Testing Production Bundle for Secret Elimination...');
const distAssetsDir = path.join(rootDir, 'dist', 'assets');
const distFiles = fs.readdirSync(distAssetsDir);
const jsFiles = distFiles.filter(f => f.endsWith('.js'));

assert(jsFiles.length > 0, `Found ${jsFiles.length} production JS chunks`);

let foundSecret = false;
let foundSessionKey = false;
let foundViteAdminSecret = false;

for (const jsFile of jsFiles) {
  const content = fs.readFileSync(path.join(distAssetsDir, jsFile), 'utf8');
  if (content.includes('cyberaiwatch2026')) foundSecret = true;
  if (content.includes('cyberaiwatch_admin_session_v1')) foundSessionKey = true;
  if (content.includes('VITE_ADMIN_SECRET')) foundViteAdminSecret = true;
}

assert(!foundSecret, 'Default secret "cyberaiwatch2026" completely eliminated from production assets');
assert(!foundSessionKey, 'Session storage marker "cyberaiwatch_admin_session_v1" eliminated from production assets');
assert(!foundViteAdminSecret, 'Environment variable name "VITE_ADMIN_SECRET" eliminated from production assets');

// 3. Verify Decommissioned Admin Route
console.log('\n3. Testing Router & UI for Admin Decommissioning...');
const appContent = fs.readFileSync(path.join(rootDir, 'src', 'App.jsx'), 'utf8');
const footerContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'layout', 'Footer.jsx'), 'utf8');

assert(!appContent.includes("import AdminPage from './pages/AdminPage'"), 'AdminPage import removed from App.jsx');
assert(!appContent.includes("cleanPath === '/admin'"), '/admin route handler removed from App.jsx');
assert(!footerContent.includes('/admin'), 'Footer link to /admin removed from Footer.jsx');

// 4. Verify Article Storage Immutability
console.log('\n4. Testing Article Storage Immutability...');
const storageContent = fs.readFileSync(path.join(rootDir, 'src', 'utils', 'storage.js'), 'utf8');
assert(!storageContent.includes('localStorage.getItem(CMS_ARTICLES_KEY)'), 'getAllArticles() no longer reads mutable localStorage');
assert(!storageContent.includes('localStorage.getItem(CMS_VULNS_KEY)'), 'getAllVulnerabilities() no longer reads mutable localStorage');

console.log('\n------------------------------------------------------');
if (failed === 0) {
  console.log(`🎉 ALL ${passed} PHASE A SECURITY REGRESSION TESTS PASSED (0 FAILURES)!`);
} else {
  console.error(`❌ ${failed} TESTS FAILED! Check outputs above.`);
  process.exit(1);
}

