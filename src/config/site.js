/**
 * CyberAI Watch — Site Configuration & Brand Metadata
 * Domain: https://cyberaiwatch.com
 * Positioning: Cybersecurity • AI Safety • Digital Threat Intelligence
 */

const getEnv = (key) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {}
  return "";
};

export const siteConfig = {
  name: "CyberAI Watch",
  shortName: "CyberAI Watch",
  tagline: "Cybersecurity • AI Safety • Digital Threat Intelligence",
  description: "Independent international editorial publication dedicated to cybersecurity journalism, AI safety research, vulnerability tracking, threat intelligence, and defensive security tutorials.",
  domain: "https://cyberaiwatch.com",
  canonicalUrl: "https://cyberaiwatch.com",
  
  founder: {
    name: "Kunal Rajput",
    brand: "HackWithKunal",
    title: "Founder & Editor-in-Chief",
    role: "Cybersecurity Professional & Security Researcher",
    avatar: "/assets/founder/founder-photo.png",
    bio: "Kunal Rajput is a cybersecurity practitioner, AI safety researcher, and the founder and editor-in-chief of CyberAI Watch. He leads independent research and technical journalism covering autonomous AI risks, prompt injection attack vectors, zero-day vulnerabilities, and practical defensive security engineering.",
    email: "editorial@cyberaiwatch.com",
    contactEmail: "livehacker024@gmail.com",
    socials: {
      youtube: "https://www.youtube.com/@HackWithKunal",
      youtubeHandle: "@HackWithKunal",
      linkedin: "https://www.linkedin.com/in/kunal-rajput-64b4002b4"
    }
  },

  socials: {
    youtube: "https://www.youtube.com/@HackWithKunal",
    linkedin: "https://www.linkedin.com/in/kunal-rajput-64b4002b4"
  },

  monetization: {
    adsenseClientId: getEnv("VITE_ADSENSE_CLIENT_ID") || getEnv("NEXT_PUBLIC_ADSENSE_CLIENT_ID") || "",
    isAdSenseActive: Boolean(getEnv("VITE_ADSENSE_CLIENT_ID") || getEnv("NEXT_PUBLIC_ADSENSE_CLIENT_ID"))
  },

  integrations: {
    youtubeApiKey: getEnv("VITE_YOUTUBE_API_KEY") || getEnv("YOUTUBE_API_KEY") || "",
    youtubeChannelId: getEnv("VITE_YOUTUBE_CHANNEL_ID") || ""
  },

  nav: [
    { label: "Home", path: "/" },
    { label: "Cybersecurity", path: "/cybersecurity" },
    { label: "AI Safety", path: "/ai-safety" },
    { label: "AI Security", path: "/ai-security" },
    { label: "Threat Intelligence", path: "/threat-intelligence" },
    { label: "Vulnerabilities", path: "/vulnerabilities" },
    { label: "Privacy", path: "/privacy" },
    { label: "Tutorials", path: "/tutorials" },
    { label: "Analysis", path: "/analysis" },
    { label: "News", path: "/news" }
  ],

  legalLinks: [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Policy", path: "/cookie-policy" },
    { label: "Disclaimer", path: "/disclaimer" },
    { label: "Editorial Policy", path: "/editorial-policy" },
    { label: "Correction Policy", path: "/correction-policy" },
    { label: "Affiliate Disclosure", path: "/affiliate-disclosure" },
    { label: "Advertising Policy", path: "/advertising-policy" }
  ]
};
