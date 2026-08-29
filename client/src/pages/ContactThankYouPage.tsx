import React, { useEffect, useMemo } from "react";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import MarketingLayout from "@/components/MarketingLayout";

function getSearchParams() {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }

  return new URLSearchParams(window.location.search);
}

export default function ContactThankYouPage() {
  const params = getSearchParams();
  const interest = useMemo(() => params.get("interest") || "your inquiry", [params]);
  const sourcePage = useMemo(() => params.get("source") || "site", [params]);

  useEffect(() => {
    document.title = "Thank You | Savoy Therapy";

    const payload = {
      interest,
      source_page: sourcePage,
      page_location: typeof window !== "undefined" ? window.location.href : "https://www.savoytherapy.com/contact-thank-you",
    };

    const globalWindow = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: Array<Record<string, unknown>>;
    };

    globalWindow.gtag?.("event", "contact_form_confirmed", payload);

    if (Array.isArray(globalWindow.dataLayer)) {
      globalWindow.dataLayer.push({
        event: "contact_form_confirmed",
        ...payload,
      });
    }
  }, [interest, sourcePage]);

  return (
    <MarketingLayout currentPath="/contact-thank-you" showContactSection={false}>
      <section className="pb-18 pt-12 sm:pb-24 sm:pt-16">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[2.2rem] bg-white/92 p-8 shadow-[0_30px_90px_rgba(61,80,113,0.10)] ring-1 ring-slate-900/6 sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef8e8] px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#6FBD44] ring-1 ring-[#cfe8be]">
              <CheckCircle2 className="h-4 w-4" />
              Inquiry received
            </div>
            <h1 className="mt-6 max-w-[12ch] font-[DM_Sans] text-[3rem] leading-[0.94] tracking-[-0.05em] text-[#0A1628] sm:text-[4rem]">
              Thank you. We received your message.
            </h1>
            <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-slate-700">
              Your inquiry about <span className="font-semibold text-[#C0302D]">{interest}</span> was submitted successfully.
              Savoy Therapy can review the details from the <span className="font-semibold text-[#4157A2]">{sourcePage}</span> page and follow up with the right next step.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="rounded-[1.6rem] bg-[#f8fafc] p-6 ring-1 ring-slate-900/6">
                <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-500">What happens next</div>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  A Savoy Therapy team member can review your message and follow up based on the type of support you requested.
                </p>
              </article>
              <article className="rounded-[1.6rem] bg-[#f8fafc] p-6 ring-1 ring-slate-900/6">
                <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Need help sooner?</div>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  If your question is urgent, you can call directly and speak with the team.
                </p>
              </article>
              <article className="rounded-[1.6rem] bg-[#f8fafc] p-6 ring-1 ring-slate-900/6">
                <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Internal tracking</div>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  This page also records a confirmed contact conversion event for Savoy Therapy’s launch reporting.
                </p>
              </article>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="tel:2178988393"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C0302D] px-6 py-3 text-[0.98rem] font-semibold text-white shadow-[0_14px_40px_rgba(192,48,45,0.22)] transition hover:bg-[#a52927]"
              >
                <Phone className="h-4 w-4" />
                Call Savoy Therapy
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#4157A2] px-6 py-3 text-[0.98rem] font-semibold text-white shadow-[0_14px_40px_rgba(65,87,162,0.22)] transition hover:bg-[#334a91]"
              >
                Return to homepage
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
