import React from "react";
import { MoveRight, HeartPulse } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import MarketingLayout from "@/components/MarketingLayout";
import { services } from "@/lib/siteContent";

const servicesPageFaqs = [
  {
    question: "What if a family is unsure whether therapy is the right next step?",
    answer:
      "We offer a complimentary assessment to identify your loved one's needs, risks, and the best path forward. No pressure, no guesswork — just a clear picture of what therapy can do and an honest recommendation for your family.",
    ctaLabel: "Request a complimentary assessment",
    ctaHref: "#contact",
    ctaAsButton: true,
  },
];

export default function ServicesPage() {
  return (
    <MarketingLayout currentPath="/services">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">Services</div>
            <h1 className="mt-6 max-w-[11ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-[#0A1628] sm:text-[4.8rem]">
              The right therapy. Right where residents live.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              Every service Savoy Therapy provides is designed around one goal: helping older adults stay
              safe, active, and independent in the community they call home.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-slate-800 transition hover:text-[#0A1628]"
            >
              Want to bring these services to your community? Start a conversation
              <MoveRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service) => {
              const isDark = service.accent.includes("text-white");

              return (
                <article
                  key={service.title}
                  className={`rounded-[1.75rem] border border-slate-900/8 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)] ${service.accent} ${service.title === "Stimpod tPRF Therapy" ? "lg:col-span-2" : ""}`}
                >
                  <div
                    className={`inline-flex rounded-full p-3 ${isDark ? "bg-white/10 text-white" : "bg-white/70 text-slate-800"}`}
                  >
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <h2
                    className={`mt-5 font-[DM_Sans] text-[1.75rem] leading-[1.02] tracking-[-0.04em] ${isDark ? "text-white" : "text-[#0A1628]"}`}
                  >
                    {service.title}
                  </h2>
                  <p className={`mt-4 text-[1rem] leading-7 ${isDark ? "text-white/82" : "text-slate-700"}`}>
                    {service.description}
                  </p>
                  {service.detail ? (
                    <p className={`mt-4 text-[0.98rem] leading-7 ${isDark ? "text-white/74" : "text-slate-700"}`}>
                      {service.detail}
                    </p>
                  ) : null}
                  {service.ctaLabel && service.ctaHref ? (
                    <a
                      href={service.ctaHref}
                      className={`mt-6 inline-flex items-center gap-2 text-[0.98rem] font-semibold transition ${isDark ? "text-white hover:text-white/82" : "text-slate-800 hover:text-[#0A1628]"}`}
                    >
                      {service.ctaLabel}
                      <MoveRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-[#4157A2]/10 bg-[#f7faff] p-5 shadow-[0_18px_44px_rgba(65,87,162,0.06)] sm:mt-12 sm:p-6">
            <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#4157A2]">
              Quick questions families and communities ask
            </div>
            <Accordion type="single" collapsible className="mt-4">
              {servicesPageFaqs.map(item => (
                <AccordionItem key={item.question} value={item.question} className="border-slate-900/8">
                  <AccordionTrigger className="text-[1rem] font-semibold leading-7 text-[#0A1628] hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.96rem] leading-7 text-slate-700">
                    <div>{item.answer}</div>
                    {item.ctaLabel ? (
                      item.ctaAsButton ? (
                        <Button
                          asChild
                          className="mt-4 inline-flex h-10 rounded-full bg-[#4157A2] px-5 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(65,87,162,0.24)] transition hover:bg-[#374a8a]"
                        >
                          <a href={item.ctaHref}>{item.ctaLabel}</a>
                        </Button>
                      ) : (
                        <a
                          href={item.ctaHref}
                          className="mt-4 inline-flex items-center text-[0.92rem] font-semibold text-[#4157A2] transition hover:text-[#374a8a]"
                        >
                          {item.ctaLabel}
                        </a>
                      )
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
