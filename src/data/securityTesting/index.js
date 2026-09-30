/**
 * Security Testing Hub — Unified Data Exporter & Query Utilities
 * Aggregates verified API, Web, and Mobile vulnerability records.
 */

import { securityCategories } from './categoriesMeta.js';
import { apiVulnerabilities } from './apiSecurityData.js';
import { webVulnerabilities } from './webSecurityData.js';
import { mobileVulnerabilities } from './mobileSecurityData.js';

export { securityCategories } from './categoriesMeta.js';
export { apiVulnerabilities } from './apiSecurityData.js';
export { webVulnerabilities } from './webSecurityData.js';
export { mobileVulnerabilities } from './mobileSecurityData.js';

export const allSecurityTestingVulnerabilities = [
  ...apiVulnerabilities,
  ...webVulnerabilities,
  ...mobileVulnerabilities
];

export function getSecurityCategory(slugOrId) {
  if (!slugOrId) return null;
  return securityCategories.find(c => c.id === slugOrId || c.slug === slugOrId) || null;
}

export function getVulnerabilitiesByCategory(categorySlug) {
  if (!categorySlug) return allSecurityTestingVulnerabilities;
  return allSecurityTestingVulnerabilities.filter(v => v.category === categorySlug);
}

export function getVulnerabilityBySlug(slug, categorySlug = null) {
  if (!slug) return null;
  if (categorySlug) {
    const match = allSecurityTestingVulnerabilities.find(v => v.slug === slug && v.category === categorySlug);
    if (match) return match;
  }
  return allSecurityTestingVulnerabilities.find(v => v.slug === slug) || null;
}

export function getRelatedVulnerabilities(currentVuln) {
  if (!currentVuln) return [];
  if (currentVuln.relatedVulnerabilities && currentVuln.relatedVulnerabilities.length > 0) {
    const related = currentVuln.relatedVulnerabilities
      .map(rel => {
        const found = allSecurityTestingVulnerabilities.find(v => v.slug === rel.slug);
        return found || rel;
      })
      .filter(Boolean);
    if (related.length > 0) return related;
  }
  // Fallback: Return other vulnerabilities from the same category
  return allSecurityTestingVulnerabilities
    .filter(v => v.category === currentVuln.category && v.slug !== currentVuln.slug)
    .slice(0, 3);
}

export function searchAndFilterSecurityVulnerabilities({
  search = '',
  category = 'ALL',
  platform = 'ALL',
  difficulty = 'ALL',
  access = 'ALL'
} = {}) {
  const q = (search || '').trim().toLowerCase();

  return allSecurityTestingVulnerabilities.filter(item => {
    // 1. Text Search
    if (q) {
      const matchName = item.name.toLowerCase().includes(q);
      const matchDef = (item.shortDefinition || '').toLowerCase().includes(q);
      const matchCwe = (item.cweClassification || '').toLowerCase().includes(q);
      const matchOwasp = (item.owaspClassification || '').toLowerCase().includes(q);
      const matchRoot = (item.rootCause || '').toLowerCase().includes(q);
      if (!matchName && !matchDef && !matchCwe && !matchOwasp && !matchRoot) {
        return false;
      }
    }

    // 2. Category Filter
    if (category && category !== 'ALL' && item.category !== category) {
      return false;
    }

    // 3. Platform Filter
    if (platform && platform !== 'ALL') {
      const p = platform.toUpperCase();
      const appPlat = (item.applicablePlatform || '').toUpperCase();
      const mobPlat = (item.mobilePlatform || '').toUpperCase();
      if (!appPlat.includes(p) && !mobPlat.includes(p)) {
        return false;
      }
    }

    // 4. Difficulty Filter
    if (difficulty && difficulty !== 'ALL') {
      if ((item.difficulty || '').toUpperCase() !== difficulty.toUpperCase()) {
        return false;
      }
    }

    // 5. Access Filter (Free vs Paid Advanced)
    if (access && access !== 'ALL') {
      if (access === 'PAID' && !item.isPaidAdvancedAvailable) {
        return false;
      }
      if (access === 'FREE' && item.isPaidAdvancedAvailable) {
        // All items have free educational fundamentals; but if user specifically filters free-only:
        // do not filter out since all items include free baseline methodology.
      }
    }

    return true;
  });
}
