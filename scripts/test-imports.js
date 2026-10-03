import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function testAll() {
  console.log('--- CyberAI Watch Import & Architecture Validation ---');
  let errors = 0;

  // 1. Test pure JavaScript ESM modules & data integrity
  try {
    console.log('Testing data and configuration modules...');
    const { articlesData } = await import('../src/data/articles.js');
    const { categoriesData } = await import('../src/data/categories.js');
    const { vulnerabilitiesData } = await import('../src/data/vulnerabilities.js');
    const { guidesData } = await import('../src/data/guides.js');
    const { securityCategories, allSecurityTestingVulnerabilities } = await import('../src/data/securityTesting/index.js');
    const { siteConfig } = await import('../src/config/site.js');
    const { updateMetaTags, generateArticleSchema, generateBreadcrumbSchema } = await import('../src/utils/seo.js');
    const { getAllArticles } = await import('../src/utils/storage.js');
    const { recordPageView } = await import('../src/utils/analytics.js');

    console.log(`  ✓ Loaded ${articlesData.length} published articles.`);
    console.log(`  ✓ Loaded ${categoriesData.length} editorial categories.`);
    console.log(`  ✓ Loaded ${vulnerabilitiesData.length} CVE tracking advisories.`);
    console.log(`  ✓ Loaded ${guidesData.length} defensive guides.`);
    console.log(`  ✓ Loaded ${allSecurityTestingVulnerabilities.length} Security Testing entries across ${securityCategories.length} categories.`);
    console.log(`  ✓ Verified domain configuration: ${siteConfig.domain}`);
  } catch (err) {
    console.error('  ✗ Error importing ESM modules:', err);
    errors++;
  }

  // 2. Test JSX components using esbuild compilation
  const jsxFiles = [
    'src/App.jsx',
    'src/pages/HomePage.jsx',
    'src/pages/ArticlePage.jsx',
    'src/pages/CategoryPage.jsx',
    'src/pages/VulnerabilitiesPage.jsx',
    'src/pages/GuidesPage.jsx',
    'src/pages/AboutPage.jsx',
    'src/pages/ContactPage.jsx',
    'src/pages/PrivacyPolicyPage.jsx',
    'src/pages/TermsPage.jsx',
    'src/pages/LegalPage.jsx',
    'src/pages/EditorialStandardsPage.jsx',
    'src/pages/AuthorPage.jsx',
    'src/pages/AdminPage.jsx',
    'src/pages/TrendingPage.jsx',
    'src/pages/NewsletterPage.jsx',
    'src/pages/YouTubePage.jsx',
    'src/pages/SearchPage.jsx',
    'src/pages/UnsubscribePage.jsx',
    'src/pages/NotFoundPage.jsx',
    'src/pages/securityTesting/SecurityTestingHubPage.jsx',
    'src/pages/securityTesting/CategoryTestingPage.jsx',
    'src/pages/securityTesting/VulnerabilityDetailPage.jsx',
    'src/pages/BypassMethodsPage.jsx',
    'src/components/layout/Navbar.jsx',
    'src/components/layout/Footer.jsx',
    'src/components/layout/SearchModal.jsx',
    'src/components/home/HeroSection.jsx',
    'src/components/home/FeaturedStory.jsx',
    'src/components/home/LatestNewsGrid.jsx',
    'src/components/home/AiBattlefieldSection.jsx',
    'src/components/home/ThreatIntelligenceSection.jsx',
    'src/components/home/CyberGuidesSection.jsx',
    'src/components/home/FounderTrustSection.jsx',
    'src/components/home/YouTubeSection.jsx',
    'src/components/home/NewsletterBox.jsx',
    'src/components/tools/SecurityToolsSuite.jsx',
    'src/components/ads/AdSlot.jsx',
    'src/components/common/ClaimBadge.jsx',
    'src/components/common/SourceList.jsx',
    'src/components/common/SocialIcons.jsx'
  ];

  console.log(`\nValidating ${jsxFiles.length} React JSX component files...`);
  for (const relPath of jsxFiles) {
    const fullPath = path.resolve(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`  ✗ Missing file: ${relPath}`);
      errors++;
      continue;
    }
    const code = fs.readFileSync(fullPath, 'utf8');
    try {
      esbuild.transformSync(code, {
        loader: 'jsx',
        sourcefile: relPath
      });
      console.log(`  ✓ ${relPath}`);
    } catch (err) {
      console.error(`  ✗ Syntax / compilation error in ${relPath}:`, err.message);
      errors++;
    }
  }

  console.log('\n------------------------------------------------------');
  if (errors === 0) {
    console.log('✅ ALL MODULES, DATA, AND JSX COMPONENTS VALIDATED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error(`❌ Validation finished with ${errors} error(s).`);
    process.exit(1);
  }
}

testAll();
