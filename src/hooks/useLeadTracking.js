import { useCallback } from "react";
import ReactGA from "react-ga4";
import { analytics } from "../analytics";

export const useLeadTracking = () => {
  const trackFormSubmission = 
  (source, formType, propertyType = null) => {
    // 🔹 Standardized centralized event
    analytics.trackContactForm(source, "submission");
  }

  return {
    trackFormSubmission,
  };
};

// Lead source constants
export const LEAD_SOURCES = {
  HERO: "hero_banner",
  OVERVIEW: "overview_section",
  PRICING_sqft2400: "pricing_section_2400sqft",
  MASTER_PLAN: "master_plan_section",
  FOOTER: "footer_section",
  CONTACT_FORM_LINK: "contact_form_internal_link",
  UNKNOWN: "unknown_source",
};

// Property types
export const PROPERTY_TYPES = {
  sqft2400: "2400sqft",
};
