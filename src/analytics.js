import ReactGA from "react-ga4";

/**
 * Helper to get UTM and Ads parameters from the current URL
 */
const getTrackingParams = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utmSource") || params.get("utm_source") || "",
    utm_medium: params.get("utmMedium") || params.get("utm_medium") || "",
    utm_campaign: params.get("utmCampaign") || params.get("utm_campaign") || "",
    gclid: params.get("gclid") || "", // Google Click ID for Ads attribution
  };
};

export const analytics = {
  /**
   * Standardized event for form interactions.
   * event_type: 'opening' | 'submission'
   */
  trackContactForm: (source, eventType = "opening") => {
    const tracking = getTrackingParams();

    const normalizedEventType =
      eventType === "submission" ? "submission" : "opening";  

    const eventName =
      normalizedEventType === "opening"
        ? "Contact_form_interaction"
        : "Contact_form_submit";

    ReactGA.event(eventName, {
      event_type: normalizedEventType, // 'opening' for button clicks, 'submission' for successful form submits
      form_name: "contact_form",
      project_name: "Birla-Trimaya-Phase-4",
      lead_source: source,
      utm_source: tracking.utm_source,
      utm_medium: tracking.utm_medium,
      utm_campaign: tracking.utm_campaign,
      gclid: tracking.gclid,
    });
  }
};
