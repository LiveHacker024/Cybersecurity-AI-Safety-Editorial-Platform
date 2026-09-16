/**
 * Privacy-Conscious, Zero-Telemetry Analytics Engine for CyberAI Watch
 * Stores aggregate metrics locally in localStorage without collecting PII or tracking individuals.
 * Used for genuine Trending, Most Read, and Admin Analytics reporting.
 * STRICT ZERO-FABRICATION RULE: Returns only authentic client events.
 */

const STORAGE_KEY = "cyberaiwatch_analytics_events_v1";

export function recordPageView(path, title) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { views: {}, searches: [], newsletters: 0, referrers: {}, devices: {} };
    
    const normalizedPath = path || "/";
    data.views[normalizedPath] = (data.views[normalizedPath] || 0) + 1;
    
    // Track Referrer
    const ref = document.referrer ? new URL(document.referrer).hostname : "Direct / Organic";
    data.referrers[ref] = (data.referrers[ref] || 0) + 1;
    
    // Track Device Category
    const width = window.innerWidth;
    const deviceType = width < 768 ? "Mobile" : width < 1024 ? "Tablet" : "Desktop";
    data.devices[deviceType] = (data.devices[deviceType] || 0) + 1;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // Graceful fallback if localStorage is disabled or restricted
  }
}

export function recordSearchQuery(query) {
  if (!query || query.trim().length === 0) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { views: {}, searches: [], newsletters: 0, referrers: {}, devices: {} };
    
    data.searches = [{ q: query.trim(), date: new Date().toISOString() }, ...(data.searches || [])].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

export function recordNewsletterSignup() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { views: {}, searches: [], newsletters: 0, referrers: {}, devices: {} };
    data.newsletters = (data.newsletters || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

export function getAnalyticsSummary() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        totalViews: 0,
        viewsByPath: {},
        recentSearches: [],
        newsletterSignups: 0,
        referrers: {},
        devices: {}
      };
    }
    const data = JSON.parse(raw);
    const totalViews = Object.values(data.views || {}).reduce((a, b) => a + b, 0);
    return {
      totalViews,
      viewsByPath: data.views || {},
      recentSearches: data.searches || [],
      newsletterSignups: data.newsletters || 0,
      referrers: data.referrers || {},
      devices: data.devices || {}
    };
  } catch (e) {
    return {
      totalViews: 0,
      viewsByPath: {},
      recentSearches: [],
      newsletterSignups: 0,
      referrers: {},
      devices: {}
    };
  }
}
