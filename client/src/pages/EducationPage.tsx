import React, { FormEvent, useState } from "react";
import MarketingLayout from "@/components/MarketingLayout";
import RecommendationQuizSection from "@/components/RecommendationQuizSection";
import { downloadableResources, latestBlogPosts, type DownloadableResource } from "@/lib/siteContent";
import BlogPostCard from "@/components/BlogPostCard";
import { trackFormSubmission } from "@/lib/analytics";
import { ArrowDownToLine, ArrowRight, MoveRight, X } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type ResourceLeadState = {
  firstName: string;
  email: string;
};

const initialLeadState: ResourceLeadState = {
  firstName: "",
  email: "",
};

function triggerResourceDownload(href: string) {
  if (typeof window === "undefined") {
    return;
  }

  const link = document.createElement("a");
  link.href = href;
  link.download = "";
  link.target = "_blank";
  link.rel = "noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function EducationPage() {
  const [activeResource, setActiveResource] = useState<DownloadableResource | null>(null);
  const [leadState, setLeadState] = useState<ResourceLeadState>(initialLeadState);
  const [submittedGuideSlug, setSubmittedGuideSlug] = useState<string | null>(null);

  const submitGuideLead = trpc.resources.submitLead.useMutation({
    onSuccess: () => {
      if (!activeResource) {
        return;
      }

      trackFormSubmission({
        sourcePage: "resources",
        placement: "guide_download_gate",
        formName: "resource_download_gate",
        formType: activeResource.slug,
      });
      setSubmittedGuideSlug(activeResource.slug);
      triggerResourceDownload(activeResource.href);
      toast.success("Your guide is ready and the download should begin automatically.");
    },
    onError: () => {
      toast.error("We could not save your request just now. Please try again.");
    },
  });

  const handleOpenGate = (resource: DownloadableResource) => {
    setActiveResource(resource);
    setSubmittedGuideSlug(null);
    setLeadState(initialLeadState);
  };

  const handleCloseGate = () => {
    setActiveResource(null);
    setLeadState(initialLeadState);
    setSubmittedGuideSlug(null);
  };

  const handleDownloadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeResource) {
      return;
    }

    await submitGuideLead.mutateAsync({
      firstName: leadState.firstName,
      email: leadState.email,
      guideSlug: activeResource.slug,
      guideTitle: activeResource.title,
    });
  };

  return (
    <MarketingLayout currentPath="/resources">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">Resources</div>
            <h1 className="mt-6 max-w-[11ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-[#0A1628] sm:text-[4.8rem]">
              Free guides, practical tips, and real answers.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              Everything on this page is designed to help families make better decisions, ask better questions,
              and feel more confident supporting a loved one as they age. Download our free guides, read our
              articles, and reach out whenever you&apos;re ready to talk.
            </p>
            <a
              href="#downloads"
              className="mt-8 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-slate-800 transition hover:text-[#0A1628]"
            >
              See the free guides
              <MoveRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="downloads" className="pb-18 sm:pb-24">
        <div className="container">
          <div className="rounded-[2.4rem] bg-white/85 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="section-label">Free downloadable guides</div>
                <h2 className="mt-5 max-w-[12ch] font-[DM_Sans] text-[2.8rem] leading-[0.98] tracking-[-0.05em] text-[#0A1628] sm:text-[3.4rem]">
                  Five practical guides families can download right away.
                </h2>
              </div>
              <p className="max-w-2xl text-[1rem] leading-7 text-slate-600">
                Enter your name and email to download any guide instantly. No spam — just useful resources
                from our clinical team.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {downloadableResources.map((resource) => (
                <article
                  key={resource.slug}
                  className={`flex h-full flex-col rounded-[2rem] ${resource.accent} p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:p-8`}
                >
                  <div className="inline-flex w-fit rounded-full bg-[#eef8e8] px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#6FBD44]">
                    {resource.category}
                  </div>
                  <h3 className="mt-5 font-[DM_Sans] text-[2rem] leading-[1.02] tracking-[-0.04em] text-[#17335c]">
                    {resource.title}
                  </h3>
                  <p className="mt-4 text-[1.02rem] leading-8 text-slate-700">{resource.description}</p>
                  <div className="mt-6 space-y-3 text-[0.98rem] leading-7 text-slate-700">
                    {resource.bullets.map((bullet) => (
                      <div key={bullet} className="flex gap-3">
                        <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-[0.88rem] font-medium text-slate-600">
                    <ArrowDownToLine className="h-4 w-4 text-[#4157A2]" />
                    <span>{resource.format}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenGate(resource)}
                    className="mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-[#C0302D] px-6 py-3 text-[0.98rem] font-semibold text-white shadow-[0_14px_40px_rgba(192,48,45,0.2)] transition hover:bg-[#a52927]"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    Download Free Guide
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeResource ? (
        <section className="pb-18 sm:pb-22">
          <div className="container">
            <div className="rounded-[2.2rem] bg-[#f8fafc] p-7 shadow-[0_28px_80px_rgba(65,87,162,0.12)] ring-1 ring-[#cbd5e1] sm:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="section-label border-[#c7d2fe] bg-white/80 text-[#4157A2]">Download free guide</div>
                  <h2 className="mt-5 font-[DM_Sans] text-[2.4rem] leading-[0.98] tracking-[-0.05em] text-[#0A1628] sm:text-[3rem]">
                    {activeResource.title}
                  </h2>
                  <p className="mt-5 text-[1rem] leading-7 text-slate-700">
                    Enter your first name and email address to download this guide instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseGate}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-4 py-2 text-[0.92rem] font-semibold text-slate-700 transition hover:border-slate-400 hover:text-[#0A1628]"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              </div>

              <form className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end" onSubmit={handleDownloadSubmit}>
                <label className="block text-[0.92rem] font-semibold text-slate-800">
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={leadState.firstName}
                    onChange={(event) => setLeadState((current) => ({ ...current, firstName: event.target.value }))}
                    className="mt-2 w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 text-[1rem] text-slate-900 outline-none transition focus:border-[#4157A2] focus:ring-2 focus:ring-[#4157A2]/15"
                    placeholder="First name"
                    required
                  />
                </label>
                <label className="block text-[0.92rem] font-semibold text-slate-800">
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={leadState.email}
                    onChange={(event) => setLeadState((current) => ({ ...current, email: event.target.value }))}
                    className="mt-2 w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 text-[1rem] text-slate-900 outline-none transition focus:border-[#4157A2] focus:ring-2 focus:ring-[#4157A2]/15"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={submitGuideLead.isPending}
                  className="inline-flex h-[3.25rem] items-center justify-center gap-3 rounded-full bg-[#C0302D] px-6 text-[0.98rem] font-semibold text-white shadow-[0_14px_40px_rgba(192,48,45,0.2)] transition hover:bg-[#a52927] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  {submitGuideLead.isPending ? "Saving your request..." : "Download Free Guide"}
                </button>
              </form>

              {submittedGuideSlug === activeResource.slug ? (
                <p className="mt-5 text-[0.96rem] leading-7 text-slate-700">
                  Your guide should begin downloading automatically. If it does not, use this direct link: <a href={activeResource.href} className="font-semibold text-[#4157A2] underline underline-offset-4">download {activeResource.title}</a>.
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-[#f7edd1] p-7 shadow-[0_24px_70px_rgba(94,84,43,0.11)]">
              <div className="section-label text-slate-600">For families</div>
              <h2 className="mt-5 font-[DM_Sans] text-[2rem] leading-[1] tracking-[-0.05em] text-[#0A1628]">
                Start with something useful, not overwhelming.
              </h2>
              <p className="mt-5 text-[1.02rem] leading-8 text-slate-700">
                These guides and articles are meant to be practical. Print them, mark them up, share them with siblings,
                or bring them into a conversation with your loved one.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#f8fafc] p-7 shadow-[0_24px_70px_rgba(62,88,145,0.11)]">
              <div className="section-label text-slate-600">For better follow-through</div>
              <h2 className="mt-5 font-[DM_Sans] text-[2rem] leading-[1] tracking-[-0.05em] text-[#0A1628]">
                Small tools can make the next step clearer.
              </h2>
              <p className="mt-5 text-[1.02rem] leading-8 text-slate-700">
                Whether you are noticing warning signs, thinking through mobility equipment, or looking for a practical
                home-safety walkthrough, this page gives you a concrete starting point.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#eef8e8] p-7 shadow-[0_24px_70px_rgba(54,120,86,0.11)]">
              <div className="section-label text-slate-600">For guided support</div>
              <h2 className="mt-5 font-[DM_Sans] text-[2rem] leading-[1] tracking-[-0.05em] text-[#0A1628]">
                Use the resources now, then reach out when you want help applying them.
              </h2>
              <p className="mt-5 text-[1.02rem] leading-8 text-slate-700">
                If these materials raise questions about therapy, safety, or next steps, Savoy Therapy can help you think
                through what support makes sense.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RecommendationQuizSection />

      <section className="pb-20 pt-2 sm:pb-24">
        <div className="container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-label">Latest from Savoy Therapy</div>
              <h2 className="mt-5 max-w-[14ch] font-[DM_Sans] text-[2.8rem] leading-[0.98] tracking-[-0.05em] text-[#0A1628] sm:text-[3.4rem]">
                More practical guidance for families helping older adults stay steady, safe, and supported.
              </h2>
            </div>
            <a href="/blog" className="inline-flex items-center gap-2 text-[0.98rem] font-semibold text-slate-800 transition hover:text-[#0A1628]">
              See all articles
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {latestBlogPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-22">
        <div className="container">
          <div className="grid gap-8 rounded-[2.2rem] bg-[#f8fafc] px-7 py-8 text-slate-900 shadow-[0_30px_90px_rgba(65,87,162,0.12)] sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="section-label border-[#c7d2fe] bg-white/80 text-[#4157A2]">Free monthly workshops</div>
              <h2 className="mt-5 max-w-[12ch] font-[DM_Sans] text-[2.7rem] leading-[0.97] tracking-[-0.05em] text-[#0A1628] sm:text-[3.2rem]">
                Join Savoy Therapy each month for practical guidance families can use right away.
              </h2>
            </div>
            <div>
              <p className="max-w-xl text-[1.02rem] leading-8 text-slate-700">
                Savoy Therapy presents a free monthly workshop at Brookdale at 3:30 PM on the third Wednesday of each
                month. It is a simple way to learn more about balance, fall prevention, mobility, and safer daily routines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-2 sm:pb-24">
        <div className="container">
          <div className="rounded-[2.2rem] bg-[#0A1628] px-7 py-8 text-white shadow-[0_30px_90px_rgba(15,31,61,0.24)] sm:px-10 sm:py-10">
            <div className="max-w-4xl">
              <div className="section-label border-white/20 bg-white/10 text-blue-50">Start a conversation</div>
              <h2 className="mt-5 max-w-[13ch] font-[DM_Sans] text-[2.8rem] leading-[0.97] tracking-[-0.05em] text-white sm:text-[3.4rem]">
                When you are ready for guidance, Savoy Therapy is here to help you think through the next step.
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-blue-50/88">
                If a guide raised concerns, a warning sign sounds familiar, or you want help figuring out what kind of support
                makes sense, reach out and start the conversation.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#C0302D] px-6 py-3 text-[0.98rem] font-semibold text-white shadow-[0_14px_40px_rgba(192,48,45,0.22)] transition hover:bg-[#a52927]"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
