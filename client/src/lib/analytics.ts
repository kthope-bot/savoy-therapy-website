type AnalyticsValue = string | number | boolean | null | undefined;

type AnalyticsPayload = Record<string, AnalyticsValue>;

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

function getAnalyticsWindow() {
  if (typeof window === "undefined") {
    return null;
  }

  return window as AnalyticsWindow;
}

function sanitizePayload(payload: AnalyticsPayload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

export function trackGaEvent(eventName: string, payload: AnalyticsPayload) {
  const analyticsWindow = getAnalyticsWindow();

  if (!analyticsWindow) {
    return;
  }

  const normalizedPayload = sanitizePayload({
    ...payload,
    page_location: payload.page_location ?? analyticsWindow.location.href,
  });

  analyticsWindow.gtag?.("event", eventName, normalizedPayload);

  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push({
      event: eventName,
      ...normalizedPayload,
    });
  }
}

type ConversionContext = {
  sourcePage: string;
  placement?: string;
};

export function trackPhoneTap({
  sourcePage,
  placement,
  phoneNumber,
  label,
}: ConversionContext & {
  phoneNumber: string;
  label: string;
}) {
  trackGaEvent("savoy_phone_tap", {
    source_page: sourcePage,
    placement,
    phone_number: phoneNumber,
    label,
  });
}

export function trackCtaClick({
  sourcePage,
  placement,
  label,
  destination,
}: ConversionContext & {
  label: string;
  destination: string;
}) {
  trackGaEvent("savoy_cta_click", {
    source_page: sourcePage,
    placement,
    label,
    destination,
  });
}

export function trackFormSubmission({
  sourcePage,
  placement,
  formName,
  formType,
}: ConversionContext & {
  formName: string;
  formType: string;
}) {
  trackGaEvent("savoy_form_submission", {
    source_page: sourcePage,
    placement,
    form_name: formName,
    form_type: formType,
  });
}
