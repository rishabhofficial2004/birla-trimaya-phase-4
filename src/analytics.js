import ReactGA from "react-ga4"; 

/**
 * Helper to get UTM parameters from the current URL
 */
const getUTMParams = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utmSource") || params.get("utm_source") || "",
    utm_medium: params.get("utmMedium") || params.get("utm_medium") || "",
    utm_campaign: params.get("utmCampaign") || params.get("utm_campaign") || "",
  };
};

export const analytics = {
  /**
   * Triggers the CONTACT_FORM_SUBMIT event when a button is clicked to open the form.
   */
  trackContactFormOpen: (source) => {
    const utm = getUTMParams();
    
    ReactGA.event("CONTACT_FORM_SUBMIT", {
      form_name: "contact_form",
      project_name: "Birla-Trimaya-Phase-4",
      lead_source: source,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });
  }
};
