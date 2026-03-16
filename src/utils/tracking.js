/**
 * Centralized utility for capturing and persisting UTM parameters and GCLID.
 */

import ReactGA from "react-ga4";

const STORAGE_KEY = "lead_tracking_params";

/**
 * Extracts UTM parameters and GCLID from the URL.
 * Supports both snake_case (standard) and camelCase.
 */
export const extractParamsFromURL = () => {
  if (typeof window === "undefined") return {};
  
  const params = new URLSearchParams(window.location.search);
  
  const extracted = {
    utm_source: params.get("utm_source") || params.get("utmSource") || "",
    utm_medium: params.get("utm_medium") || params.get("utmMedium") || "",
    utm_campaign: params.get("utm_campaign") || params.get("utmCampaign") || "",
    utm_term: params.get("utm_term") || params.get("utmTerm") || params.get("utmKeyword") || "",
    utm_content: params.get("utm_content") || params.get("utmContent") || "",
    gclid: params.get("gclid") || "",
  };

  // Only return if at least one parameter is present
  const hasParams = Object.values(extracted).some(val => val !== ""); 
  return hasParams ? extracted : null;
};

/**
 * Persists tracking parameters to sessionStorage and sets them globally in GA4.
 */
export const persistTrackingParams = () => {
  const params = extractParamsFromURL();
  const existing = getPersistedParams();
  const merged = { ...existing, ...(params || {}) };
  
  if (params) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }

  // Set global GA4 parameters so every event includes them
  if (merged.utm_source) {
    ReactGA.set({
      utm_source: merged.utm_source,
      utm_medium: merged.utm_medium,
      utm_campaign: merged.utm_campaign,
      utm_term: merged.utm_term,
      utm_content: merged.utm_content,
      gclid: merged.gclid,
    });
  }
};

/**
 * Retrieves persisted tracking parameters.
 */
export const getPersistedParams = () => {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const persisted = stored ? JSON.parse(stored) : {};
    
    // Also check current URL in case they just landed
    const current = extractParamsFromURL() || {};
    
    return { ...persisted, ...current };
  } catch (e) {
    console.error("Error reading tracking params from storage", e);
    return extractParamsFromURL() || {};
  }
};
