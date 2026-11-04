import React from "react";
import MarketingLayout from "@/components/MarketingLayout";

const CAREERS_EMAIL = "kthope@savoytherapy.com";
const APPLY_MAILTO = `mailto:${CAREERS_EMAIL}?subject=Savoy%20Therapy%20Career%20Application`;
// When Gusto job postings go live, add the posting's public link as a second CTA.

const reasons = [
  {
    title: "You’re a clinician, not a productivity number",
    description:
      "We build caseloads that leave room to actually treat — to listen, adjust the plan, and do the work the way you were trained to. Care comes first here, not last.",
  },
  {
    title: "Leadership you can actually reach",
    description:
      "No chasing answers up a chain. Kris and the Savoy team are accessible and responsive. Questions get answered, problems get solved, and you always know where things stand.",
  },
  {
    title: "Real mentorship and growth",
    description:
      "Monthly education, hands-on quality coaching, and colleagues who share what works. Whether you’re early-career or seasoned, you’ll keep getting sharper here.",
  },
  {
    title: "Work that moves with you",
    description:
      "Mobile, in-community care across senior living partners in Central Illinois — variety, autonomy, and the trust to run your day like the professional you are.",
  },
];

const roles = [
  {
    title: "Physical Therapists & PTAs",
    description: "Lead balance, mobility, and recovery care for older adults where they live.",
  },
  {
    title: "Occupational Therapists & COTAs",
    description: "Help residents keep doing the daily activities that make life theirs.",
  },
  {
    title: "Speech-Language Pathologists",
    description: "Support communication, cognition, and safe swallowing — with time to do it right.",
  },
];

const traits = [
  "You treat older adults with genuine respect and patience.",
  "You take ownership — of your schedule, your documentation, and your outcomes.",
  "You’d rather be a partner to a community’s staff than a silo beside them.",
  "You want your work to matter at the end of every day.",
];

export default function CareersPage() {
  return (
    <MarketingLayout currentPath="/careers">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">Careers</div>
            <h1 className="mt-6 max-w-[14ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-slate-950 sm:text-[4.8rem]">
              Do the work that made you become a therapist.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              Savoy Therapy is a mobile geriatric therapy practice serving senior living communities across
              Central Illinois. We built the kind of place clinicians actually want to stay: reasonable
              caseloads, real support, and the freedom to treat the way you know is right.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={APPLY_MAILTO}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C0302D] px-7 py-3.5 text-[1rem] font-semibold text-white shadow-[0_14px_40px_rgba(192,48,45,0.2)] transition hover:bg-[#a52927]"
              >
                Email your resume
              </a>
              <p className="text-[0.98rem] text-slate-600">
                or write to{" "}
                <a href={APPLY_MAILTO} className="font-semibold text-[#4157A2] transition hover:text-[#30406f]">
                  {CAREERS_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-22">
        <div className="container">
          <div className="section-label">Why clinicians join Savoy</div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-[2rem] border border-slate-900/8 bg-white/74 p-7 shadow-[0_24px_70px_rgba(61,80,113,0.12)]"
              >
                <h2 className="font-[DM_Sans] text-[1.5rem] leading-tight tracking-[-0.03em] text-slate-950">
                  {reason.title}
                </h2>
                <p className="section-copy mt-3 text-[1rem]">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-22">
        <div className="container">
          <div className="section-label">Roles we hire</div>
          <p className="section-copy mt-5 max-w-2xl">
            We hire Physical, Occupational, and Speech therapists and assistants for full-time and PRN roles.
            Tell us which one fits — send your resume and a short note, and a member of our team will follow up.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-[1.75rem] border border-slate-900/8 bg-[#f8fbff] p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]"
              >
                <h3 className="font-[DM_Sans] text-[1.25rem] tracking-[-0.02em] text-slate-950">{role.title}</h3>
                <p className="section-copy mt-3 text-[0.98rem]">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="rounded-[2.2rem] bg-[#f8fafc] p-7 shadow-[0_28px_80px_rgba(65,87,162,0.12)] ring-1 ring-[#cbd5e1] sm:p-10">
            <div className="section-label border-[#c7d2fe] bg-white/80 text-[#4157A2]">Who thrives here</div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {traits.map((trait) => (
                <li key={trait} className="flex gap-3 text-[1rem] leading-7 text-slate-700">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4157A2]" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={APPLY_MAILTO}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C0302D] px-7 py-3.5 text-[1rem] font-semibold text-white shadow-[0_14px_40px_rgba(192,48,45,0.2)] transition hover:bg-[#a52927]"
              >
                Email your resume
              </a>
              <span className="text-[0.95rem] text-slate-600">We read every one.</span>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
