/**
 * Design reminder for this page:
 * Pastel Clinical Editorial — generous whitespace, quiet authority, soft cream/sage layering,
 * elegant sentence-case headlines, and warm in-home imagery translated into asymmetrical cards.
 */
import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Home,
  LampDesk,
  MapPin,
  MoveRight,
  ShieldCheck,
} from "lucide-react";
import { trackCtaClick, trackPhoneTap } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

const householdSignals = [
  "A recent fall, near-fall, or growing fear around stairs, showers, nighttime walking, or getting in and out of a favorite chair.",
  "Adult children noticing loose rugs, dim lighting, hard bathroom transfers, cluttered pathways, or a loved one holding onto furniture to move around.",
  "A parent who is going out less, walking more slowly, avoiding errands or social outings, or seeming less confident with everyday movement.",
  "A family wanting practical guidance in Champaign, Savoy, or Urbana before a setback forces rushed decisions about safety or independence.",
];

const assessmentBenefits = [
  {
    title: "Protect independence before daily life gets smaller",
    description:
      "Families often notice subtle retreat before they notice a dramatic event. A thoughtful home review can identify the barriers that quietly shrink confidence, mobility, and quality of life over time.",
  },
  {
    title: "Turn concern into a clear, usable plan",
    description:
      "The goal is not to overwhelm a household with generic advice. It is to explain what matters now, what can wait, and which changes are most likely to make movement safer and more comfortable.",
  },
  {
    title: "Keep the conversation respectful and personal",
    description:
      "This service is designed to feel like guidance, not pressure. The tone stays centered on dignity, confidence, and helping older adults keep doing more of what they enjoy.",
  },
];

const roomByRoomFocus = [
  {
    title: "Entrances, steps, and walking paths",
    description:
      "We look at how someone gets into the home, whether stairs and thresholds feel manageable, and whether lighting, railings, or layout are making movement harder than it needs to be.",
  },
  {
    title: "Bathroom and bedroom routines",
    description:
      "Transfers around the bed, toilet, and shower often reveal where confidence is slipping. The review gives families clearer insight into whether support surfaces, spacing, or daily setup should change.",
  },
  {
    title: "Everyday function throughout the home",
    description:
      "Kitchen access, favorite seating, clutter, rugs, assistive devices, and common movement habits are all considered so recommendations feel relevant to real life, not abstract safety rules.",
  },
];

const assessmentFlow = [
  {
    step: "01",
    title: "A short pre-visit conversation",
    description:
      "We start by learning what has changed, what worries the family most, and which moments of the day feel the least steady right now.",
  },
  {
    step: "02",
    title: "An in-home safety and mobility walkthrough",
    description:
      "The visit looks at the home itself and the way a person moves through it, with attention to balance, transfers, walking patterns, lighting, stairs, and the routines that create hidden risk.",
  },
  {
    step: "03",
    title: "A prioritized next-step plan",
    description:
      "Families leave with plain-language recommendations, a clearer sense of what deserves attention first, and options for follow-up therapy support when stronger movement habits are needed.",
  },
];

const familyQuestions = [
  "Is she holding onto furniture, walls, or countertops more than she used to?",
  "Has she had a recent fall, hospital stay, or health change that has made the house feel harder to manage?",
  "Is she still doing the errands, outings, hobbies, or visits she enjoyed six months ago?",
  "Do transfers in and out of bed, the car, the shower, or a favorite chair look slower, harder, or less secure?",
];

const creativeOffers = [
  "A complimentary 15-minute call for families who want to talk through whether a formal home visit makes sense.",
  "A premium in-home review for older adults who want a room-by-room plan for safer daily movement.",
  "A follow-up concierge therapy pathway for households that want recommendations translated into stronger balance, walking confidence, and everyday function.",
];

export default function HomeSafetyAssessmentPage() {
  const handlePageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest("a");

    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute("href") ?? "";
    const label = anchor.textContent?.trim().replace(/\s+/g, " ") || "link";
    const placement = anchor.getAttribute("data-analytics-placement") ?? undefined;

    if (href.startsWith("tel:")) {
      trackPhoneTap({
        sourcePage: "home-safety-assessment",
        placement,
        phoneNumber: href.replace(/^tel:/, ""),
        label,
      });
      return;
    }

    if (anchor.getAttribute("data-track-cta") === "true") {
      trackCtaClick({
        sourcePage: "home-safety-assessment",
        placement,
        label,
        destination: href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" onClickCapture={handlePageClick}>
      <section className="relative overflow-hidden pb-18 pt-8 sm:pb-24 sm:pt-12">
        <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),transparent_42%),radial-gradient(circle_at_78%_18%,rgba(223,241,232,0.6),transparent_30%),radial-gradient(circle_at_68%_68%,rgba(235,225,202,0.35),transparent_22%)]" />
        <div className="container relative">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#0A1628]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Savoy Therapy
          </a>

          <div className="mt-8 grid items-end gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-slate-700" />
                Home safety assessment
              </div>
              <h1 className="mt-6 max-w-[12ch] font-[DM_Sans] text-[3.25rem] leading-[0.93] tracking-[-0.06em] text-[#0A1628] sm:text-[4.35rem] lg:text-[5.1rem]">
                A safer home can begin before a fall changes everything.
              </h1>
              <p className="mt-8 max-w-xl text-[1.18rem] leading-8 text-slate-700 sm:text-[1.24rem]">
                Savoy Therapy&apos;s <strong>Home Safety Assessment</strong> is designed for older adults and families who want expert eyes on the home before confidence slips further. The goal is simple: protect dignity, reduce avoidable risk, and make everyday movement feel more manageable again.
              </p>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-7 text-slate-700">
                For households in <strong>Champaign, Savoy, and Urbana</strong>, this service brings together fall-prevention thinking, practical mobility insight, and room-by-room recommendations that support independence without turning the experience into a hospital-style event.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button className="h-13 rounded-full bg-slate-900 px-7 text-white shadow-[0_14px_36px_rgba(15,23,42,0.16)] transition hover:bg-slate-800" asChild>
                  <a href="tel:2178988393" data-analytics-placement="home_safety_hero_call">Ask about a home visit</a>
                </Button>
                <a
                  href="/resources"
                  data-track-cta="true"
                  data-analytics-placement="home_safety_hero_resources"
                  className="inline-flex items-center gap-2 text-[1rem] font-semibold text-slate-800 transition hover:text-[#0A1628]"
                >
                  Explore fall-prevention resources
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-900/8 bg-white/76 p-7 shadow-[0_26px_80px_rgba(61,80,113,0.12)]">
              <div className="flex items-center gap-3 text-slate-800">
                <div className="rounded-full bg-[#eef8e8] p-3">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-[DM_Sans] text-[1.3rem] tracking-[-0.04em] text-[#0A1628]">Common signs it may be time</div>
                  <div className="text-sm text-slate-600">For older adults, spouses, adult children, and care partners</div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {householdSignals.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.35rem] border border-slate-900/8 bg-[#f7f3e7] p-4">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-slate-800" />
                    <p className="text-[0.98rem] leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 border-t border-slate-900/10 pt-8 md:grid-cols-3">
            <div className="rounded-[1.7rem] border border-slate-900/8 bg-white/72 p-6 shadow-[0_18px_55px_rgba(61,80,113,0.1)]">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Service lens</div>
              <div className="mt-3 font-[DM_Sans] text-[2rem] tracking-[-0.05em] text-[#0A1628]">Preventive</div>
              <p className="mt-2 text-[0.98rem] leading-7 text-slate-700">The aim is to catch small barriers before they trigger a larger loss of confidence, mobility, or independence.</p>
            </div>
            <div className="rounded-[1.7rem] border border-slate-900/8 bg-[#f8fafc] p-6 shadow-[0_18px_55px_rgba(61,80,113,0.1)]">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Format</div>
              <div className="mt-3 font-[DM_Sans] text-[2rem] tracking-[-0.05em] text-[#0A1628]">In-home review</div>
              <p className="mt-2 text-[0.98rem] leading-7 text-slate-700">A live walkthrough shows families how the home and the person&apos;s movement patterns affect one another.</p>
            </div>
            <div className="rounded-[1.7rem] border border-slate-900/8 bg-white/72 p-6 shadow-[0_18px_55px_rgba(61,80,113,0.1)]">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Local footprint</div>
              <div className="mt-3 flex items-center gap-2 font-[DM_Sans] text-[2rem] tracking-[-0.05em] text-[#0A1628]">
                <MapPin className="h-6 w-6" />
                Champaign • Savoy • Urbana
              </div>
              <p className="mt-2 text-[0.98rem] leading-7 text-slate-700">A focused service area supports responsive scheduling and meaningful follow-through after the visit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-xl">
              <div className="section-label">Why families respond</div>
              <h2 className="section-heading mt-6 max-w-[12ch]">Because safety advice should feel clear, respectful, and usable.</h2>
              <p className="section-copy mt-7">
                Families rarely want fear-based messaging. They want someone who can explain what is changing, what is still going well, and how to reduce risk without making life feel smaller. This page is designed to present the assessment as a calm next step rather than an emergency reaction.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {assessmentBenefits.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.7rem] border border-slate-900/8 bg-white/74 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.10)]"
                >
                  <div className="inline-flex rounded-full bg-[#eef8e8] p-3 text-slate-800">
                    <LampDesk className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-[DM_Sans] text-[1.5rem] leading-tight tracking-[-0.03em] text-[#0A1628]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-slate-700">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <div className="section-label">What the visit looks at</div>
              <h2 className="section-heading mt-6 max-w-[10ch]">A room-by-room review with real-life movement in mind.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {roomByRoomFocus.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.7rem] border border-slate-900/8 bg-[#f7f3e7] p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]"
                >
                  <div className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Assessment focus</div>
                  <h3 className="mt-3 font-[DM_Sans] text-[1.6rem] tracking-[-0.03em] text-[#0A1628]">{item.title}</h3>
                  <p className="mt-4 text-[1rem] leading-7 text-slate-700">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="editorial-split border-y border-slate-900/12 py-10">
            <div>
              <div className="section-label">Assessment flow</div>
              <h2 className="section-heading mt-6 max-w-[10ch]">From concern to clear next steps.</h2>
            </div>
            <div className="space-y-5">
              {assessmentFlow.map((item) => (
                <div key={item.step} className="rounded-[1.7rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]">
                  <div className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Step {item.step}</div>
                  <h3 className="mt-3 font-[DM_Sans] text-[1.6rem] tracking-[-0.03em] text-[#0A1628]">{item.title}</h3>
                  <p className="mt-4 text-[1rem] leading-7 text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-start">
            <div className="rounded-[2rem] border border-slate-900/8 bg-white/76 p-8 shadow-[0_24px_70px_rgba(61,80,113,0.12)]">
              <div className="section-label">Questions families are already asking</div>
              <h2 className="section-heading mt-6 max-w-[12ch]">Small questions often point to bigger changes in confidence.</h2>
              <div className="mt-8 space-y-4">
                {familyQuestions.map((question) => (
                  <div key={question} className="flex gap-3 border-b border-slate-900/10 pb-4 last:border-b-0 last:pb-0">
                    <MoveRight className="mt-1 h-5 w-5 shrink-0 text-slate-700" />
                    <p className="text-[1rem] leading-7 text-slate-700">{question}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-900/8 bg-[#eef8e8] p-8 shadow-[0_24px_70px_rgba(61,80,113,0.12)]">
              <div className="flex items-center gap-3 text-slate-800">
                <div className="rounded-full bg-white/80 p-3">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div className="font-[DM_Sans] text-[1.5rem] tracking-[-0.03em] text-[#0A1628]">Suggested first offers</div>
              </div>
              <div className="mt-6 space-y-4">
                {creativeOffers.map((idea) => (
                  <div key={idea} className="rounded-[1.35rem] border border-slate-900/8 bg-white/78 p-4">
                    <p className="text-[0.98rem] leading-7 text-slate-700">{idea}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[1.02rem] leading-8 text-slate-700">
                This service pairs naturally with private concierge physical therapy for households that want safer setup, stronger movement habits, and more confidence carrying those changes into everyday life.
              </p>
              <Button className="mt-8 h-12 rounded-full bg-slate-900 px-6 text-white transition hover:bg-slate-800" asChild>
                <a href="tel:2178988393" data-analytics-placement="home_safety_footer_call">Ask about a home safety visit</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
