import ReactGA from "react-ga4";
import { getPersistedParams } from "./utils/tracking";

/**
 * Helper to get UTM and Ads parameters from the current session or URL
 */
const getTrackingParams = () => {
  return getPersistedParams();
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
      utm_term: tracking.utm_term,
      utm_content: tracking.utm_content,
      gclid: tracking.gclid,
    });
  }
};
