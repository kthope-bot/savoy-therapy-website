import React, { useEffect } from "react";
import { BadgeCheck, HeartPulse, ShieldCheck } from "lucide-react";

const SAVOY_LOGO_URL = "/manus-storage/savoy-therapy-logo-enhanced_d9b32471.webp";
const HIGHLEVEL_EMBED_SRC = "https://api.leadconnectorhq.com/widget/form/qUOCWrerHZR2Tp4kMDZu";
const HIGHLEVEL_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";
const HIGHLEVEL_FORM_ID = "qUOCWrerHZR2Tp4kMDZu";
const BALANCEIQ_CONVERSION_EVENT = "balanceiq_form_confirmed";

type LeadFormMessagePayload = Record<string, unknown>;

function parseLeadConnectorSubmission(eventData: unknown): LeadFormMessagePayload | null {
  if (!Array.isArray(eventData)) {
    return null;
  }

  const payload = eventData[2];

  if (typeof payload !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(payload) as LeadFormMessagePayload | null;

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const email = parsed.email;
    const fullName = parsed.full_name;
    const firstName = parsed.first_name;
    const lastName = parsed.last_name;

    const hasEmail = typeof email === "string" && email.trim().length > 0;
    const hasFullName = typeof fullName === "string" && fullName.trim().length > 0;
    const hasSplitName = typeof firstName === "string" && firstName.trim().length > 0 && typeof lastName === "string" && lastName.trim().length > 0;

    if (!hasEmail || (!hasFullName && !hasSplitName)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

const trustItems = [
  {
    icon: ShieldCheck,
    eyebrow: "Trusted history",
    title: "Serving Central IL Since 2010",
    accent: "text-[#2121CC]",
    border: "border-[#2121CC]/10",
    shadow: "shadow-[0_16px_45px_rgba(33,33,204,0.06)]",
  },
  {
    icon: HeartPulse,
    eyebrow: "Clinical focus",
    title: "Geriatric PT Specialists",
    accent: "text-[#4CAF50]",
    border: "border-[#4CAF50]/20",
    shadow: "shadow-[0_16px_45px_rgba(76,175,80,0.08)]",
  },
  {
    icon: BadgeCheck,
    eyebrow: "Team strength",
    title: "25+ Licensed Clinicians",
    accent: "text-[#CC2121]",
    border: "border-[#CC2121]/10",
    shadow: "shadow-[0_16px_45px_rgba(204,33,33,0.06)]",
  },
] as const;

const nextSteps = [
  "We review your BalanceIQ results",
  "We contact you within 24 hours",
  "You get a free in-person balance screening",
] as const;

export default function BalanceIQPage() {
  useEffect(() => {
    document.title = "BalanceIQ by Savoy Therapy | Free Balance Screening";

    const description = "Review your BalanceIQ results and book a free balance screening with Savoy Therapy in Central Illinois.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;

    const existingScript = document.querySelector(`script[src="${HIGHLEVEL_SCRIPT_SRC}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = HIGHLEVEL_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    let hasTrackedSubmission = false;
    const globalWindow = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: Array<Record<string, unknown>>;
    };

    const handleMessage = (event: MessageEvent<unknown>) => {
      const submissionData = parseLeadConnectorSubmission(event.data);

      if (!submissionData || hasTrackedSubmission) {
        return;
      }

      hasTrackedSubmission = true;

      const analyticsPayload = {
        source_page: "balanceiq",
        form_id: HIGHLEVEL_FORM_ID,
        form_provider: "highlevel",
        lead_channel: "balanceiq_screening",
        page_location: window.location.href,
      };

      globalWindow.gtag?.("event", BALANCEIQ_CONVERSION_EVENT, analyticsPayload);
      globalWindow.gtag?.("event", "generate_lead", analyticsPayload);

      if (Array.isArray(globalWindow.dataLayer)) {
        globalWindow.dataLayer.push({
          event: BALANCEIQ_CONVERSION_EVENT,
          ...analyticsPayload,
          detected_fields: Object.keys(submissionData),
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#13203f]">
      <header className="border-b border-[#4157A2]/10 bg-[color:rgba(236,241,252,0.94)]">
        <div className="container py-5 sm:py-6">
          <div className="flex justify-center">
            <img
              src={SAVOY_LOGO_URL}
              alt="Savoy Therapy"
              className="h-14 w-auto max-w-[240px] object-contain sm:h-16 sm:max-w-[340px]"
            />
          </div>
        </div>
      </header>

      <main>
        <section className="bg-[#eef3ff] py-14 sm:py-16 lg:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2121CC]/10 bg-white px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#2121CC] shadow-[0_10px_30px_rgba(33,33,204,0.08)]">
                <BadgeCheck className="h-4 w-4" />
                BalanceIQ results
              </div>
              <h1 className="mt-6 font-[DM_Sans] text-[2.45rem] leading-[0.96] tracking-[-0.05em] text-[#11184a] sm:text-[3.6rem]">
                Your BalanceIQ Results Are Ready
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-700 sm:text-[1.12rem]">
                A Savoy Therapy specialist is ready to help you take the next step toward better balance and fall prevention.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-10">
          <div className="container">
            <div className="grid gap-4 sm:grid-cols-3">
              {trustItems.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`rounded-[1.6rem] border bg-white p-5 ${item.border} ${item.shadow}`}>
                    <Icon className={`h-8 w-8 ${item.accent}`} />
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{item.eyebrow}</p>
                    <p className="mt-2 font-[DM_Sans] text-[1.2rem] tracking-[-0.03em] text-[#11184a]">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="booking-form" className="bg-white py-6 sm:py-8 lg:py-10">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#2121CC]/10 bg-white p-6 shadow-[0_24px_70px_rgba(33,33,204,0.08)] sm:p-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2121CC]">Book your next step</p>
                <h2 className="mt-3 font-[DM_Sans] text-[2rem] leading-[1] tracking-[-0.04em] text-[#11184a] sm:text-[2.4rem]">
                  Book your free balance screening.
                </h2>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  Share your details below so our team can review your result and reach out with the right next step.
                </p>
              </div>

              <div className="mt-8 min-h-[700px] w-full overflow-hidden rounded-[1.5rem] border border-[#2121CC]/12 bg-[#f8faff] p-1 shadow-[0_18px_45px_rgba(33,33,204,0.08)] sm:min-h-[720px]">
                <iframe
                  src={HIGHLEVEL_EMBED_SRC}
                  style={{ width: "100%", height: "700px", border: "none", borderRadius: "8px", display: "block" }}
                  id="inline-qUOCWrerHZR2Tp4kMDZu"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Form 3"
                  data-height="700"
                  data-layout-iframe-id="inline-qUOCWrerHZR2Tp4kMDZu"
                  data-form-id="qUOCWrerHZR2Tp4kMDZu"
                  title="Form 3"
                  className="min-h-[700px] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8faff] py-10 sm:py-12 lg:py-14">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#2121CC]/8 bg-white px-6 py-8 shadow-[0_22px_60px_rgba(33,33,204,0.06)] sm:px-8 sm:py-10">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2121CC]">What happens next</p>
                <h2 className="mt-3 font-[DM_Sans] text-[2rem] leading-[1] tracking-[-0.04em] text-[#11184a] sm:text-[2.35rem]">
                  A simple next step for safer balance.
                </h2>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {nextSteps.map((step, index) => (
                  <div key={step} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2121CC]/10 text-sm font-semibold text-[#2121CC]">
                      {index + 1}
                    </div>
                    <p className="mt-4 font-[DM_Sans] text-[1.18rem] leading-7 tracking-[-0.02em] text-[#11184a]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#4157A2]/10 bg-[#4157A2] py-12 text-sm text-blue-50/70">
        <div className="container">
          <div className="flex flex-col items-center gap-6 text-center">
            <div>
              <img
                src={SAVOY_LOGO_URL}
                alt="Savoy Therapy"
                className="mx-auto h-14 w-auto max-w-[280px] object-contain brightness-0 invert"
              />
              <p className="mt-3 max-w-lg leading-7 text-blue-50/72">
                Therapy services for senior living communities across Champaign-Urbana, Bloomington-Normal, Decatur, Peoria, and Chillicothe.
              </p>
            </div>
            <div className="space-y-2 text-blue-50/78">
              <div>
                <a className="transition hover:text-white" href="tel:2178988393">
                  Phone: 217-898-8393
                </a>
              </div>
              <div>Fax: 217-633-4553</div>
            </div>
          </div>
          <p className="mt-6 border-t border-white/14 pt-6 text-center text-blue-50/72">Powered by BalanceIQ</p>
        </div>
      </footer>
    </div>
  );
}
