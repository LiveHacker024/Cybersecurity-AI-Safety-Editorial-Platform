/**
 * CMS Local & Persistent Data Manager for CyberAI Watch
 * Enables Admin CRUD actions, draft saving, fact-checking workflows, and subscriber exports.
 */

import { articlesData } from "../data/articles";
import { vulnerabilitiesData } from "../data/vulnerabilities";

const CMS_ARTICLES_KEY = "cyberaiwatch_cms_articles_v1";
const CMS_VULNS_KEY = "cyberaiwatch_cms_vulns_v1";
const CMS_SUBSCRIBERS_KEY = "cyberaiwatch_cms_subscribers_v1";

export function getAllArticles() {
  try {
    const custom = localStorage.getItem(CMS_ARTICLES_KEY);
    if (!custom) return articlesData;
    const parsed = JSON.parse(custom);
    // Combine base static articles with user created/updated CMS articles
    const merged = [...parsed];
    articlesData.forEach(base => {
      if (!merged.some(m => m.slug === base.slug)) {
        merged.push(base);
      }
    });
    return merged;
  } catch (e) {
    return articlesData;
  }
}

export function saveArticle(article) {
  try {
    const all = getAllArticles();
    const existingIndex = all.findIndex(a => a.slug === article.slug || a.id === article.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...all];
      updated[existingIndex] = { ...article, updatedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) };
    } else {
      updated = [article, ...all];
    }
    localStorage.setItem(CMS_ARTICLES_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

export function deleteArticle(slug) {
  try {
    const all = getAllArticles();
    const filtered = all.filter(a => a.slug !== slug);
    localStorage.setItem(CMS_ARTICLES_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    return false;
  }
}

export function getAllVulnerabilities() {
  try {
    const custom = localStorage.getItem(CMS_VULNS_KEY);
    if (!custom) return vulnerabilitiesData;
    const parsed = JSON.parse(custom);
    const merged = [...parsed];
    vulnerabilitiesData.forEach(base => {
      if (!merged.some(m => m.cveId === base.cveId)) {
        merged.push(base);
      }
    });
    return merged;
  } catch (e) {
    return vulnerabilitiesData;
  }
}

export function saveVulnerability(vuln) {
  try {
    const all = getAllVulnerabilities();
    const existingIndex = all.findIndex(v => v.cveId === vuln.cveId);
    let updated;
    if (existingIndex >= 0) {
      updated = [...all];
      updated[existingIndex] = vuln;
    } else {
      updated = [vuln, ...all];
    }
    localStorage.setItem(CMS_VULNS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

export function getSubscribers() {
  try {
    const raw = localStorage.getItem(CMS_SUBSCRIBERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addSubscriber(email, name = "") {
  try {
    const current = getSubscribers();
    if (current.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return { success: true, alreadySubscribed: true };
    }
    const newEntry = {
      id: "sub_" + Date.now(),
      email: email.trim(),
      name: name.trim(),
      subscribedAt: new Date().toISOString()
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(CMS_SUBSCRIBERS_KEY, JSON.stringify(updated));
    return { success: true, alreadySubscribed: false };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export function removeSubscriber(email) {
  try {
    const current = getSubscribers();
    const filtered = current.filter(s => s.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem(CMS_SUBSCRIBERS_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    return false;
  }
}
