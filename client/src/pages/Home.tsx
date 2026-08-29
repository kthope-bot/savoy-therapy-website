import React, { useEffect, useState } from "react";
import { ArrowRight, Bot, Mail, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import MarketingLayout from "@/components/MarketingLayout";
import RecommendationQuizSection from "@/components/RecommendationQuizSection";
import { serviceMarkets } from "@/lib/siteContent";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const initialChatMessages: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hello. I’m the Savoy Therapy information assistant. I can share general information about therapy services, communities served, Therapy Rockstars, education resources, and how to contact Savoy Therapy.",
  },
];

const HOME_SEO_TITLE = "Savoy Therapy | Senior Living Therapy Partner";
const HOME_SEO_DESCRIPTION =
  "Savoy Therapy provides physical, occupational, and speech therapy for senior living communities across Central Illinois.";
const HOME_SEO_KEYWORDS =
  "senior living therapy, physical therapy, occupational therapy, speech therapy, fall prevention, balance therapy, Savoy Therapy, Central Illinois";

const latestApprovedTestimonial = {
  name: "Carla Wheeler",
  tag: "Executive Director, Autumn Fields",
  quote:
    "I wanted to share some positive feedback regarding your therapy team. One of our residents’ daughters mentioned how wonderful her mother is doing and noted a significant improvement in her care compared to our previous provider. She also expressed great appreciation for your team’s professionalism and the results she is seeing. I wanted to echo her sentiments; your team has delivered exactly what we were looking for. Thank you for your hard work and for providing such an amazing team and care.",
};

const switchReasons = [
  {
    label: "What communities are trying to avoid",
    title: "The therapist who never shows up consistently",
    description:
      "A rotating cast of unfamiliar faces. Residents who wait weeks to start therapy. Staff who can't get a straight answer about scheduling. Leadership left guessing whether therapy is actually happening.",
    accent: "bg-white/88",
  },
  {
    label: "Why they choose Savoy Therapy",
    title: "One number. One person accountable",
    description:
      "When something's off, you don't get a call center — you get me. Savoy runs on clinician consistency, reliable scheduling, and direct communication with community leadership. No runaround. No excuses.",
    accent: "bg-[#E8EEF9]/92 border-[#4157A2]/12",
  },
  {
    label: "What better looks like",
    title: "Therapy that runs like it's supposed to",
    description:
      "Residents start on time. Families get updates. Your staff isn't chasing us down. And when something needs attention, it gets handled — not delegated into a void.",
    accent: "bg-white/88",
  },
];

const comparisonFaqs = [
  {
    question: "How quickly can Savoy Therapy become a dependable partner for a community?",
    answer:
      "Most communities are up and running within 2 to 4 weeks. The process starts with a direct conversation with me — we talk through your current gaps, your residents' needs, and what consistent coverage actually looks like for your building. No long sales process. No handoff to someone you've never met.",
    ctaLabel: "Start a partnership conversation",
    ctaHref: "#contact",
  },
  {
    question: "What if a family is unsure whether therapy is the right next step?",
    answer:
      "We offer a complimentary assessment to identify your loved one's needs, risks, and the best path forward. No pressure, no guesswork — just a clear picture of what therapy can do and an honest recommendation for your family.",
    ctaLabel: "Request a complimentary assessment",
    ctaHref: "#contact",
    ctaAsButton: true,
  },
  {
    question: "Why would a community switch providers if they already have therapy coverage?",
    answer:
      "Coverage alone is usually not the issue. Communities tend to switch when communication feels weak, follow-through feels inconsistent, or families are not seeing the confidence and professionalism they expected from the therapy experience.",
  },
];

function getChatbotReply(input: string) {
  const question = input.toLowerCase();

  if (question.includes("service") || question.includes("therapy") || question.includes("what do you do")) {
    return "Savoy Therapy partners with senior living communities to provide physical therapy, occupational therapy, speech therapy, fall prevention support, education, and specialized offerings like Stimpod.";
  }

  if (question.includes("community") || question.includes("location") || question.includes("serve")) {
    return "Savoy Therapy serves partner communities across Champaign-Urbana, Bloomington-Normal, Decatur, Peoria, and Chillicothe.";
  }

  if (question.includes("about") || question.includes("founder") || question.includes("kris")) {
    return "The About page shares the Savoy Therapy founder story, care philosophy, and the company’s commitment to personalized therapy in senior living communities.";
  }

  if (question.includes("testimonial") || question.includes("review")) {
    return "The Testimonials page highlights approved review excerpts that speak to communication, continuity, and stronger independence.";
  }

  return "I can help with general information about Savoy Therapy’s pages, services, community presence, education resources, and contact information.";
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  useEffect(() => {
    document.title = HOME_SEO_TITLE;

    const ensureMetaTag = (name: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;

      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", name);
        document.head.appendChild(metaTag);
      }

      return metaTag;
    };

    ensureMetaTag("description").setAttribute("content", HOME_SEO_DESCRIPTION);
    ensureMetaTag("keywords").setAttribute("content", HOME_SEO_KEYWORDS);
  }, []);

  const submitChat = (messageText?: string) => {
    const message = (messageText ?? chatInput).trim();
    if (!message) return;

    const reply = getChatbotReply(message);

    setChatMessages((current) => [
      ...current,
      { role: "user", text: message },
      { role: "assistant", text: reply },
    ]);
    setChatInput("");
  };

  return (
    <MarketingLayout currentPath="/">
      <section className="relative overflow-hidden pb-14 pt-6 sm:pb-24 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_40%),radial-gradient(circle_at_82%_16%,rgba(65,87,162,0.12),transparent_22%)] sm:h-[44rem]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4157A2]/12 bg-white/72 px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#4157A2] sm:mb-6 sm:text-[0.8rem]">
              THERAPY IN SENIOR LIVING COMMUNITIES
            </div>
            <h1 className="max-w-[13ch] font-[DM_Sans] text-[3.15rem] leading-[0.9] tracking-[-0.065em] text-[#0A1628] sm:text-[5rem] lg:max-w-[12ch] lg:text-[6.2rem]">
              Your loved one deserves a therapist who truly shows up.
            </h1>
            <p className="mt-5 max-w-3xl text-[1.08rem] leading-7 text-slate-700 sm:mt-8 sm:text-[1.3rem] sm:leading-8">
              Not just on the schedule — but present, attentive, and invested in what matters to them.
            </p>
            <p className="mt-4 max-w-3xl text-[1rem] leading-7 text-slate-700 sm:mt-5 sm:text-[1.16rem] sm:leading-8">
              Savoy Therapy has been caring for residents in Central Illinois senior living communities since
              2011. We provide physical therapy, occupational therapy, speech therapy, fall prevention, and
              balance support right where residents live — so your loved one gets personalized care and you
              get a team you can actually reach.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#education"
                data-track-cta="true"
                data-analytics-placement="home_hero_quiz"
                className="inline-flex items-center gap-2 text-[1rem] font-semibold text-[#4157A2] transition hover:text-[#374a8a]"
              >
                Take The Quiz
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-slate-700 transition hover:text-[#4157A2]"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:2178988393" className="text-[0.92rem] font-semibold text-slate-600 transition hover:text-[#4157A2]">
                Call 217-898-8393
              </a>
            </div>
          </div>
        </div>
      </section>

      <RecommendationQuizSection compact />

      <section className="pb-18 sm:pb-20">
        <div className="container">
          <div className="grid gap-4 border-t border-slate-900/10 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Where Savoy Therapy serves
              </div>
              <p className="mt-3 max-w-md text-[1.05rem] leading-7 text-slate-700">
                Supporting partner communities across Champaign-Urbana, Bloomington-Normal, Decatur,
                Peoria, and Chillicothe with a model built around consistency, collaboration, and dignified
                care.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {serviceMarkets.map((community) => (
                <span
                  key={community}
                  className="rounded-full border border-slate-900/10 bg-white/66 px-4 py-2 text-[0.98rem] text-slate-800 shadow-sm"
                >
                  {community}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-20">
        <div className="container">
          <div className="rounded-[2rem] border border-slate-900/8 bg-white/90 p-6 shadow-[0_22px_60px_rgba(61,80,113,0.1)] sm:p-8 lg:grid lg:grid-cols-[0.42fr_0.58fr] lg:gap-10 lg:items-start">
            <div>
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#4157A2]">
                Trusted by communities
              </div>
              <h2 className="mt-3 max-w-[13ch] font-[DM_Sans] text-[2rem] leading-[0.96] tracking-[-0.05em] text-[#0A1628] sm:text-[2.4rem]">
                The kind of feedback families and senior living community leaders remember.
              </h2>
              <p className="mt-4 max-w-md text-[1rem] leading-7 text-slate-700">
                Savoy Therapy earns trust by showing up consistently, communicating clearly, and helping residents make visible progress.
              </p>
            </div>
            <figure className="mt-6 rounded-[1.7rem] border border-[#4157A2]/10 bg-[#E8EEF9]/88 p-5 shadow-[0_18px_48px_rgba(65,87,162,0.08)] sm:p-6 lg:mt-0">
              <div className="text-[#d0a84d]">★★★★★</div>
              <blockquote className="mt-4 text-[1rem] leading-8 text-slate-800 sm:text-[1.05rem]">
                “{latestApprovedTestimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-slate-900/8 pt-4">
                <div className="font-[DM_Sans] text-[1.1rem] tracking-[-0.03em] text-[#0A1628]">
                  {latestApprovedTestimonial.name}
                </div>
                <div className="mt-1 text-[0.9rem] uppercase tracking-[0.14em] text-slate-600">
                  {latestApprovedTestimonial.tag}
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-20">
        <div className="container">
          <div className="rounded-[2rem] border border-[#4157A2]/10 bg-white/88 p-6 shadow-[0_22px_60px_rgba(65,87,162,0.08)] sm:p-8">
            <div className="max-w-3xl">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#4157A2]">
                Why communities switch to Savoy Therapy
              </div>
              <h2 className="mt-3 max-w-[14ch] font-[DM_Sans] text-[2rem] leading-[0.98] tracking-[-0.05em] text-[#0A1628] sm:text-[2.45rem]">
                Communities don't leave therapy partners over one bad day. They leave after months of excuses.
              </h2>
              <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-slate-700">
                Staffing gaps. Delayed starts. Unanswered calls. By the time a community starts looking, trust is already gone. Here's what that looks like — and what we do differently.
              </p>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {switchReasons.map(item => (
                <article
                  key={item.title}
                  className={`rounded-[1.6rem] border border-slate-900/8 p-5 shadow-[0_18px_44px_rgba(61,80,113,0.06)] sm:p-6 ${item.accent}`}
                >
                  <div className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <h3 className="mt-3 font-[DM_Sans] text-[1.45rem] leading-tight tracking-[-0.03em] text-[#0A1628]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-slate-700">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-[1.8rem] border border-[#4157A2]/10 bg-[#f7faff] p-5 shadow-[0_18px_44px_rgba(65,87,162,0.06)] sm:p-6">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#4157A2]">
                Quick questions families and communities ask
              </div>
              <Accordion type="single" collapsible className="mt-4">
                {comparisonFaqs.map(item => (
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
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.6rem] border border-slate-900/8 bg-white p-5 shadow-[0_18px_52px_rgba(61,80,113,0.08)] sm:p-6">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                For families
              </div>
              <h2 className="mt-3 font-[DM_Sans] text-[1.45rem] leading-tight tracking-[-0.03em] text-[#0A1628]">
                Start a Conversation
              </h2>
              <p className="mt-3 text-[0.96rem] leading-7 text-slate-700">
                Talk through what your loved one needs with a team that can help you find the right next
                step.
              </p>
              <Button
                asChild
                className="mt-5 h-11 rounded-full bg-[#4157A2] px-5 text-white transition hover:bg-[#374a8a]"
              >
                <a href="#contact">Start a conversation</a>
              </Button>
            </div>

            <div className="rounded-[1.6rem] border border-slate-900/8 bg-slate-900 p-5 text-white shadow-[0_18px_52px_rgba(15,23,42,0.18)] sm:p-6">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
                For communities
              </div>
              <h2 className="mt-3 font-[DM_Sans] text-[1.45rem] leading-tight tracking-[-0.03em] text-white">
                Partner with Savoy Therapy
              </h2>
              <p className="mt-3 text-[0.96rem] leading-7 text-slate-200">
                Explore what a therapy partnership looks like — and how Savoy Therapy can bring
                coordinated, dependable care directly into your community.
              </p>
              <Button
                asChild
                className="mt-5 h-11 rounded-full bg-white px-5 text-[#0A1628] transition hover:bg-slate-100"
              >
                <a href="#contact">Partner with Savoy Therapy</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {chatOpen ? (
          <div className="w-[calc(100vw-2rem)] max-w-[24rem] overflow-hidden rounded-[1.7rem] border border-slate-900/10 bg-white/96 shadow-[0_28px_90px_rgba(61,80,113,0.22)] backdrop-blur">
            <div className="flex items-start justify-between gap-4 border-b border-slate-900/8 bg-[#f8fafc] px-5 py-4">
              <div>
                <div className="font-[DM_Sans] text-[1.15rem] tracking-[-0.03em] text-[#0A1628]">
                  Savoy Therapy assistant
                </div>
                <p className="mt-1 text-[0.92rem] leading-6 text-slate-700">
                  General information chatbot with editable placeholder answers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-full p-2 text-slate-600 transition hover:bg-white/70 hover:text-[#0A1628]"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[22rem] space-y-4 overflow-y-auto px-5 py-5">
              {chatMessages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "assistant" ? "mr-8" : "ml-8"}>
                  <div
                    className={
                      message.role === "assistant"
                        ? "rounded-[1.25rem] rounded-tl-sm bg-[#f8fafc] px-4 py-3 text-[0.95rem] leading-7 text-slate-800"
                        : "rounded-[1.25rem] rounded-tr-sm bg-slate-900 px-4 py-3 text-[0.95rem] leading-7 text-white"
                    }
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-900/8 px-5 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {["Services", "Communities", "Resources", "Contact"].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => submitChat(suggestion)}
                    className="rounded-full border border-slate-900/10 bg-white px-3 py-1.5 text-[0.82rem] text-slate-700 transition hover:border-slate-900/20 hover:text-[#0A1628]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-3">
                <label className="flex-1 rounded-[1.1rem] border border-slate-900/10 bg-slate-50 px-4 py-3">
                  <span className="sr-only">Ask Savoy Therapy assistant</span>
                  <textarea
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    rows={2}
                    placeholder="Ask a question about Savoy Therapy"
                    className="min-h-[3.2rem] w-full resize-none bg-transparent text-[0.95rem] leading-6 text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </label>
                <Button
                  className="h-12 rounded-full bg-slate-900 px-5 text-white transition hover:bg-slate-800"
                  onClick={() => submitChat()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <Button
          className="h-14 rounded-full bg-slate-900 px-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:bg-slate-800"
          onClick={() => setChatOpen((current) => !current)}
        >
          <Bot className="mr-2 h-4 w-4" />
          Ask Savoy Therapy
        </Button>
      </div>
    </MarketingLayout>
  );
}
