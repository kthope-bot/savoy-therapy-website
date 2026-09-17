import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import { Button } from "@/components/ui/button";

const operatorHighlights = [
  {
    title: "Direct communication from leadership",
    description:
      "You won’t chase down answers. Kris and the Savoy team are accessible, responsive, and treat your concerns with the same urgency you do. Questions get answered. Problems get solved. You always know where things stand.",
  },
  {
    title: "Monthly educational workshops",
    description:
      "Every month, our clinicians bring education directly to your community — for staff, for residents, and for families. Topics range from fall prevention and safe movement to understanding therapy goals and supporting recovery at home.",
  },
  {
    title: "Complimentary fall prevention screening — for every resident, any time",
    description:
      "Every resident in your community receives a complimentary fall prevention screening, no referral required. We believe prevention is part of care — not an add-on. This benefit is available to your residents at any time, at no additional cost.",
  },
  {
    title: "Collaborative care — not a separate silo",
    description:
      "Our therapists work alongside your staff, not around them. We share observations, flag concerns early, and treat your team as partners in every resident’s progress.",
  },
];

export default function AboutPage() {
  return (
    <MarketingLayout currentPath="/about">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">About</div>
            <h1 className="mt-6 max-w-[11ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-slate-950 sm:text-[4.8rem]">
              Built on belief. Grounded in practice.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              Savoy Therapy was founded in 2011 by Kishor “Kris” Thope, PT, Cert. MDT — a practicing
              physical therapist who believed older adults deserved more than a standard course of
              treatment. They deserved a clinician who listened, a plan built around their goals, and care
              that respected where they were in their journey.
            </p>
            <p className="section-copy mt-6 max-w-2xl">That belief hasn&apos;t changed. It&apos;s just grown.</p>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="grid gap-12">
            <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-900/8 bg-white/74 p-6 shadow-[0_24px_70px_rgba(61,80,113,0.12)] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8">
              <figure className="order-1 mx-auto flex shrink-0 flex-col items-center text-center lg:order-2 lg:mx-0 lg:w-[280px]">
                <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border border-slate-900/10 bg-[#e2e8f0] shadow-[0_24px_70px_rgba(61,80,113,0.15)]">
                  <img
                    src="/Kris_Thope_Headshot.png"
                    alt="Kishor Kris Thope, founder of Savoy Therapy"
                    className="absolute inset-0 h-full w-full object-cover object-[22%_center]"
                  />
                </div>
                <figcaption className="mt-4 max-w-xs text-[0.92rem] leading-6 text-slate-600">
                  Kishor “Kris” Thope, PT, Cert. MDT | Founder, Savoy Therapy
                </figcaption>
              </figure>

              <blockquote className="order-2 flex-1 rounded-[1.75rem] bg-[#f8fbff] px-6 py-5 shadow-[0_18px_52px_rgba(61,80,113,0.08)] lg:order-1 lg:max-w-[42rem] lg:px-6 lg:py-5">
                <p className="text-[1.05rem] leading-8 text-slate-700">
                  “My very first patient as a student was a man recovering from a stroke. I was nervous. I
                  wasn&apos;t sure I had everything it would take to help him. But before I walked into that room,
                  I made myself a promise: no matter what, I will do my very best for him. That promise
                  became my motto. It still is today — for every patient, in every community we serve.”
                </p>
                <footer className="mt-5 text-[0.92rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Kishor “Kris” Thope, PT, Cert. MDT | Founder, Savoy Therapy
                </footer>
              </blockquote>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <article className="rounded-[1.75rem] border border-slate-900/8 bg-white/72 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)] lg:col-span-2">
                <div className="section-label">Who We Are</div>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  Savoy Therapy partners with senior living communities across Central Illinois to deliver
                  physical therapy, occupational therapy, and speech therapy — all under one roof, all
                  coordinated with the people who know residents best.
                </p>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  We&apos;re not just a therapy provider. We&apos;re a care partner. That means showing up
                  consistently, communicating clearly with community teams, and treating every resident as an
                  individual — not a case.
                </p>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  Our team of licensed PTs, OTs, and speech therapists brings the same founding commitment
                  to every session: do your very best for the person in front of you.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-slate-900/8 bg-[#f8f2df] p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)]">
                <div className="section-label">How We Work</div>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  Therapy works best when it meets people where they are. Our clinicians embed directly into
                  the communities we serve, working alongside staff to understand each resident&apos;s daily
                  rhythms, personal goals, and what matters most to them.
                </p>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  Whether someone is recovering from a fall, working to stay independent in their apartment,
                  or finding their voice again after a health setback — we build a plan around their
                  definition of progress.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-slate-900/8 bg-[#edf6ef] p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)]">
                <div className="section-label">For Families</div>
                <p className="mt-4 text-[1rem] leading-7 text-slate-700">
                  If your loved one lives in a community we serve, you&apos;re part of the team too. We believe
                  families deserve honest answers, clear explanations, and a therapist who returns calls. Our
                  goal is to be a resource — not just a provider — as you help your loved one age safely,
                  actively, and on their own terms.
                </p>
              </article>
            </div>

            <article className="rounded-[1.9rem] border border-slate-900/8 bg-white/72 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)] sm:p-8">
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="rounded-[1.6rem] bg-slate-950 px-7 py-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)]">
                  <div className="text-[3.3rem] font-[DM_Sans] leading-none tracking-[-0.06em] text-white">
                    16
                  </div>
                  <p className="mt-3 max-w-[12rem] text-[0.95rem] leading-6 text-white/78">
                    Senior living communities currently served across Central Illinois.
                  </p>
                </div>
                <div>
                  <p className="text-[1rem] leading-7 text-slate-700">
                    Every Savoy Therapy partnership is built on trust, shared values, and a commitment to
                    helping residents do more of what they love.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="container">
          <div className="h-px w-full bg-slate-900/16" />
        </div>
      </section>

      <section className="bg-slate-100/65 py-18 sm:py-24">
        <div className="container">
          <div className="max-w-4xl">
            <div className="section-label">For Senior Living Communities</div>
            <h2 className="mt-6 max-w-[12ch] font-[DM_Sans] text-[3rem] leading-[0.94] tracking-[-0.05em] text-slate-950 sm:text-[4rem]">
              A therapy partner that makes your community stronger.
            </h2>
            <p className="mt-7 max-w-3xl text-[1.08rem] leading-8 text-slate-700">
              Choosing a therapy partner isn&apos;t just a clinical decision — it&apos;s an operational one. The
              right partner makes your staff&apos;s job easier, gives families confidence, and raises the
              standard of care your community is known for.
            </p>
            <p className="mt-4 max-w-3xl text-[1.08rem] leading-8 text-slate-700">
              Here&apos;s what a Savoy Therapy partnership looks like in practice:
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {operatorHighlights.map((item, index) => {
              const accents = ["bg-white/82", "bg-[#eef4ff]", "bg-[#f8f2df]", "bg-[#edf6ef]"];

              return (
                <article
                  key={item.title}
                  className={`rounded-[1.75rem] border border-slate-900/8 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)] ${accents[index]}`}
                >
                  <h3 className="font-[DM_Sans] text-[1.35rem] leading-tight tracking-[-0.03em] text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-slate-700">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-[1.85rem] border border-slate-900/8 bg-slate-900 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)] sm:p-7">
            <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
              For communities
            </div>
            <h3 className="mt-3 font-[DM_Sans] text-[1.9rem] leading-tight tracking-[-0.04em] text-white">
              Ready to explore a partnership?
            </h3>
            <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-slate-200">
              Let&apos;s start with a conversation about your community and what you&apos;re looking for in a
              therapy partner.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-full bg-white px-6 text-slate-950 transition hover:bg-slate-100"
            >
              <a href="#contact">Partner with Savoy Therapy</a>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
