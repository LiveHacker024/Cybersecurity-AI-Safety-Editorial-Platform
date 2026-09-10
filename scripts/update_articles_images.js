import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const articlesPath = path.resolve(__dirname, '..', 'src', 'data', 'articles.js');

let content = fs.readFileSync(articlesPath, 'utf8');

// Replace author roles
content = content.replaceAll(
  'role: "Junior Penetration Tester & Security Researcher",',
  'role: "Founder & Editor — HackWithKunal",'
);
content = content.replaceAll(
  'avatar: "/assets/founder/kunal.jpg",',
  'avatar: "/assets/founder/founder-photo.png",'
);

// Map specific article slugs to their unique hero images
const imageMap = {
  'ai-agents-cybersecurity-target': '/assets/images/ai-agents-security-architecture.jpg',
  'what-is-prompt-injection': '/assets/images/prompt-injection-defense-firewall.jpg',
  'how-to-recognize-ai-phishing': '/assets/images/ai-phishing-detection-shield.jpg',
  'how-to-secure-gmail-account': '/assets/images/gmail-account-security-lock.jpg',
  'how-to-secure-whatsapp': '/assets/images/whatsapp-secure-messaging.jpg',
  'how-to-protect-android-phone': '/assets/images/android-mobile-defense.jpg',
  'what-is-a-data-breach': '/assets/images/data-breach-cloud-exposure.jpg',
  'what-is-ransomware': '/assets/images/ransomware-encryption-defense.svg',
  'how-deepfakes-changing-online-scams': '/assets/images/deepfakes-synthetic-media-verification.jpg',
  'how-ai-is-changing-cybersecurity': '/assets/images/ai-cybersecurity-defense-core.svg',
  'passkey-migration-phishing-resistance': '/assets/images/passkey-biometric-authentication.svg'
};

for (const [slug, img] of Object.entries(imageMap)) {
  const regex = new RegExp(`(slug:\\s*["']${slug}["'][\\s\\S]*?heroImage:\\s*["'])[^"']+["']`, 'm');
  content = content.replace(regex, `$1${img}"`);
}

fs.writeFileSync(articlesPath, content, 'utf8');
console.log('✓ Successfully updated all article hero images and author metadata!');
