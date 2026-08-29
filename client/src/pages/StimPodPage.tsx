import React, { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarHeart,
  CheckCircle2,
  HeartPulse,
  MoveRight,
  Sparkles,
  TimerReset,
  Waves,
} from "lucide-react";
import { toast } from "sonner";
import { trackCtaClick, trackFormSubmission } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const benefits = [
  {
    icon: HeartPulse,
    title: "Less time focused on discomfort",
    description:
      "StimPod is designed to help calm pain signals so everyday movement can feel less guarded, less draining, and less disruptive.",
  },
  {
    icon: TimerReset,
    title: "Support for muscle recovery and mobility",
    description:
      "For older adults who feel slowed down by soreness, weakness, or nerve-related irritation, this therapy can support steadier movement and a more active routine.",
  },
  {
    icon: Waves,
    title: "A gentle, non-surgical wellness approach",
    description:
      "Families often appreciate that the experience feels more like a premium recovery service than a hospital procedure, with no injections and no intimidating clinical setup.",
  },
  {
    icon: Sparkles,
    title: "A path back to the life you enjoy",
    description:
      "The real goal is not simply a better chart note. It is helping people feel more confident returning to golf, gardening, travel, errands, and meaningful time with grandchildren.",
  },
];

const candidateSignals = [
  "Older adults who want to stay independent and active in Champaign, Savoy, or Urbana.",
  "People dealing with lingering discomfort, nerve-related symptoms, or slowed recovery that makes walking, standing, or daily routines feel harder.",
  "Families exploring physical therapy in Champaign IL who want a more personal, premium option centered on dignity and quality of life.",
  "Adults searching for muscle recovery for seniors in Urbana IL and wanting a calm consultation before deciding on next steps.",
];

const sessionSteps = [
  {
    step: "01",
    title: "A thoughtful conversation",
    description:
      "We begin by understanding what daily life feels like now, what activities matter most, and what you would love to get back to doing with more ease.",
  },
  {
    step: "02",
    title: "A comfortable, guided session",
    description:
      "Your therapist explains the process in plain language, keeps the session comfortable, and tailors the experience around your goals, tolerance, and mobility needs.",
  },
  {
    step: "03",
    title: "A clear next-step recommendation",
    description:
      "You leave with a practical sense of whether StimPod feels like a good fit, what progress may look like, and how it may pair with broader mobility support.",
  },
];

export default function StimPodPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [goals, setGoals] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitLead = trpc.stimPod.submitLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setCity("");
      setGoals("");
      toast.success("Your complimentary consultation request has been received.");
    },
    onError: () => {
      toast.error("We could not save your request just now. Please try again.");
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await submitLead.mutateAsync({
      fullName,
      email,
      phone: phone || undefined,
      city: city || undefined,
      goals: goals || undefined,
    });

    trackFormSubmission({
      sourcePage: "stimpod",
      placement: "consultation_form",
      formName: "stimpod_consultation_form",
      formType: "consultation_request",
    });
  };

  const handlePageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest("a");

    if (!anchor || anchor.getAttribute("data-track-cta") !== "true") {
      return;
    }

    trackCtaClick({
      sourcePage: "stimpod",
      placement: anchor.getAttribute("data-analytics-placement") ?? undefined,
      label: anchor.textContent?.trim().replace(/\s+/g, " ") || "link",
      destination: anchor.getAttribute("href") ?? "",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground" onClickCapture={handlePageClick}>
      <section className="relative overflow-hidden pb-18 pt-8 sm:pb-24 sm:pt-12">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_45%),radial-gradient(circle_at_78%_18%,rgba(218,233,255,0.5),transparent_28%),radial-gradient(circle_at_70%_65%,rgba(225,241,231,0.42),transparent_24%)]" />
        <div className="container relative">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#0A1628]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Savoy Therapy
          </a>

          <div className="mt-8 grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                <Sparkles className="h-4 w-4 text-slate-700" />
                Premium mobility support
              </div>
              <h1 className="mt-6 max-w-[11ch] font-[DM_Sans] text-[3.35rem] leading-[0.93] tracking-[-0.06em] text-[#0A1628] sm:text-[4.4rem] lg:text-[5.15rem]">
                Help your loved one move with more ease, comfort, and confidence.
              </h1>
              <p className="mt-8 max-w-xl text-[1.18rem] leading-8 text-slate-700 sm:text-[1.24rem]">
                Savoy Therapy offers <strong>StimPod</strong> as a premium neuromuscular stimulation service for affluent seniors and families in <strong>Champaign, Savoy, and Urbana, Illinois</strong> who want a more personal path toward pain relief, muscle recovery, and better mobility.
              </p>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-7 text-slate-700">
                If walking feels less steady, favorite activities feel farther away, or recovery has simply taken too much from daily life, this page is designed to help you understand the next step without pressure. It is a natural fit for families searching for <strong>physical therapy in Champaign IL</strong> with a higher-touch experience.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button className="h-13 rounded-full bg-slate-900 px-7 text-white shadow-[0_14px_36px_rgba(15,23,42,0.16)] transition hover:bg-slate-800" asChild>
                  <a href="#consultation-form" data-track-cta="true" data-analytics-placement="stimpod_hero_consultation">
                    Book a complimentary consultation
                  </a>
                </Button>
                <a
                  href="#what-is-stimpod"
                  className="inline-flex items-center gap-2 text-[1rem] font-semibold text-slate-800 transition hover:text-[#0A1628]"
                >
                  See how StimPod works
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-900/8 bg-white/76 p-7 shadow-[0_26px_80px_rgba(61,80,113,0.12)]">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Why families reach out
              </div>
              <div className="mt-4 font-[DM_Sans] text-[2rem] leading-tight tracking-[-0.04em] text-[#0A1628]">
                They want more than symptom management.
              </div>
              <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                They want help protecting dignity, independence, and quality of life. StimPod is presented as a calm, concierge-style option for people who want to keep up with golf, gardening, travel, social life, and family time.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  "A complimentary consultation before committing to treatment.",
                  "A non-invasive service that feels private, premium, and easy to understand.",
                  "A practical option for older adults who want more mobility and less interruption in everyday life.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.35rem] border border-slate-900/8 bg-[#f7f3e7] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-800" />
                    <p className="text-[0.98rem] leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="what-is-stimpod" className="py-18 sm:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-xl">
              <div className="section-label">What is StimPod?</div>
              <h2 className="section-heading mt-6 max-w-[11ch]">
                A plain-language explanation for families who want clarity.
              </h2>
            </div>
            <div className="rounded-[1.9rem] border border-slate-900/8 bg-white/78 p-7 shadow-[0_20px_60px_rgba(61,80,113,0.10)]">
              <p className="text-[1.05rem] leading-8 text-slate-700">
                StimPod is a neuromuscular electrical stimulation therapy designed to gently stimulate nerves and muscles in a way that may help reduce pain, support muscle recovery, and improve mobility. In everyday terms, it is meant to help the body respond better when discomfort, slowed recovery, or nerve-related irritation has started to limit movement.
              </p>
              <p className="mt-5 text-[1.05rem] leading-8 text-slate-700">
                What makes it appealing for older adults is that the experience can feel more approachable than a hospital-style procedure. There is no surgery, no intimidating setup, and no need to translate a lot of medical jargon. Instead, the conversation stays focused on how you want to live: walking more comfortably, standing longer, traveling with less worry, and returning to the activities that make life feel full.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="section-label">Key benefits</div>
          <h2 className="section-heading mt-6 max-w-[12ch]">
            Designed around comfort, confidence, and everyday quality of life.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[1.7rem] border border-slate-900/8 bg-white/74 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.10)]"
                >
                  <div className="inline-flex rounded-full bg-[#f8fafc] p-3 text-slate-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-[DM_Sans] text-[1.45rem] leading-tight tracking-[-0.03em] text-[#0A1628]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-slate-700">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="editorial-split border-y border-slate-900/12 py-10">
            <div>
              <div className="section-label">Who is a good candidate?</div>
              <h2 className="section-heading mt-6 max-w-[11ch]">
                A strong fit for seniors who want to protect independence.
              </h2>
            </div>
            <div className="space-y-5">
              {candidateSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-slate-900/8 bg-[#f7f3e7] p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]"
                >
                  <div className="flex gap-3">
                    <MoveRight className="mt-1 h-5 w-5 shrink-0 text-slate-700" />
                    <p className="text-[1rem] leading-7 text-slate-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="section-label">What to expect at a session</div>
              <h2 className="section-heading mt-6 max-w-[10ch]">
                Premium care should feel reassuring from the first visit.
              </h2>
            </div>
            <div className="space-y-5">
              {sessionSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-[1.7rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]"
                >
                  <div className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Step {item.step}
                  </div>
                  <h3 className="mt-3 font-[DM_Sans] text-[1.55rem] tracking-[-0.03em] text-[#0A1628]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="consultation-form" className="pb-20 pt-10 sm:pb-24">
        <div className="container">
          <div className="rounded-[2.4rem] bg-[#4157A2] px-7 py-10 text-white shadow-[0_32px_90px_rgba(15,77,135,0.28)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-blue-50/88">
                  <CalendarHeart className="h-4 w-4" />
                  Complimentary consultation
                </div>
                <h2 className="mt-6 max-w-[11ch] font-[DM_Sans] text-[3rem] leading-[0.95] tracking-[-0.05em] sm:text-[4rem]">
                  Book a calm, high-touch conversation about what comes next.
                </h2>
                <p className="mt-6 max-w-xl text-[1.08rem] leading-8 text-blue-50/88">
                  If you are exploring premium support for pain relief, muscle recovery, or mobility for an older adult in Champaign, Savoy, or Urbana, this is the easiest next step. Share a few details below, and Savoy Therapy will follow up to arrange your complimentary consultation.
                </p>
                <p className="mt-5 max-w-xl text-[1rem] leading-7 text-blue-50/80">
                  The focus is simple: understand your goals, answer questions clearly, and decide whether StimPod is a sensible fit for the life you want to get back to enjoying.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/14 bg-white/10 p-6 backdrop-blur sm:p-7">
                {submitted ? (
                  <div className="rounded-[1.6rem] bg-white/12 p-6">
                    <div className="font-[DM_Sans] text-[1.8rem] tracking-[-0.03em] text-white">
                      Thank you.
                    </div>
                    <p className="mt-4 text-[1rem] leading-7 text-blue-50/90">
                      Your consultation request has been saved, and the Savoy Therapy team can now follow up with the contact details you provided.
                    </p>
                    <Button
                      className="mt-6 h-12 rounded-full bg-[#C0302D] px-6 text-white transition hover:bg-[#a52927]"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit another request
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block">
                      <span className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-blue-50/80">
                        Full name
                      </span>
                      <input
                        required
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Resident or family contact name"
                        className="h-12 w-full rounded-[1rem] border border-white/16 bg-white px-4 text-[0.98rem] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-blue-50/80">
                        Email
                      </span>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Best email for follow-up"
                        className="h-12 w-full rounded-[1rem] border border-white/16 bg-white px-4 text-[0.98rem] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                      />
                    </label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-blue-50/80">
                          Phone
                        </span>
                        <input
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="Optional"
                          className="h-12 w-full rounded-[1rem] border border-white/16 bg-white px-4 text-[0.98rem] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-blue-50/80">
                          City
                        </span>
                        <input
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          placeholder="Champaign, Savoy, or Urbana"
                          className="h-12 w-full rounded-[1rem] border border-white/16 bg-white px-4 text-[0.98rem] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-blue-50/80">
                        What would you like help with?
                      </span>
                      <textarea
                        value={goals}
                        onChange={(event) => setGoals(event.target.value)}
                        placeholder="Tell us about pain, recovery, mobility, or the activities you want to return to."
                        className="min-h-[132px] w-full rounded-[1rem] border border-white/16 bg-white px-4 py-3 text-[0.98rem] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                      />
                    </label>
                    <Button
                      type="submit"
                      disabled={submitLead.isPending}
                      className="h-12 w-full rounded-full bg-[#C0302D] px-6 text-white transition hover:bg-[#a52927] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitLead.isPending ? "Saving your request..." : "Request my complimentary consultation"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
