import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import { Button } from "@/components/ui/button";
import { communityRegionsDetailed } from "@/lib/siteContent";

const stats = [
  { value: "16", label: "Communities served" },
  { value: "5", label: "Regions across Central Illinois" },
  { value: "2011", label: "Serving Central Illinois since" },
];

export default function CommunitiesOverviewPage() {
  return (
    <MarketingLayout currentPath="/communities">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">Communities served</div>
            <h1 className="mt-6 max-w-[13ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-slate-950 sm:text-[4.8rem]">
              16 communities. 5 regions. One consistent standard of care.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              Savoy Therapy has been building trusted partnerships with senior living communities across
              Central Illinois since 2011. Our regional presence means reliable staffing, consistent
              communication, and a therapy team that knows your community — not just your residents’ names
              on a chart.
            </p>
            <p className="section-copy mt-5 max-w-3xl">
              Below are the communities where Savoy Therapy currently provides on-site physical therapy,
              occupational therapy, and speech therapy services.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat, index) => {
              const accents = ["bg-white/76", "bg-[#eef4ff]", "bg-[#f8f2df]"];

              return (
                <article
                  key={stat.label}
                  className={`rounded-[1.7rem] border border-slate-900/8 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)] ${accents[index]}`}
                >
                  <div className="font-[DM_Sans] text-[3rem] leading-none tracking-[-0.06em] text-slate-950">
                    {stat.value}
                  </div>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-700">{stat.label}</p>
                </article>
              );
            })}

            <div className="mt-6 md:col-span-3 md:mt-10 space-y-8">
              {communityRegionsDetailed.map((group) => (
                <section key={group.region} className="rounded-[1.8rem] border border-slate-900/8 bg-white/76 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)] sm:p-7">
                  <div className="flex flex-col gap-3 border-b border-slate-900/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="section-label">Region</div>
                      <h2 className="mt-3 font-[DM_Sans] text-[2rem] leading-tight tracking-[-0.04em] text-slate-950">
                        {group.region}
                      </h2>
                    </div>
                    <div className="rounded-full bg-[#edf3ff] px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-700">
                      {group.communities.length} {group.communities.length === 1 ? "community" : "communities"}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {group.communities.map((community) => (
                      <article
                        key={`${group.region}-${community.name}`}
                        className="rounded-[1.45rem] border border-slate-900/8 bg-[#fbfcff] p-5 shadow-[0_14px_40px_rgba(61,80,113,0.06)]"
                      >
                        <h3 className="font-[DM_Sans] text-[1.28rem] leading-tight tracking-[-0.03em] text-slate-950">
                          {community.name}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {community.careTypes.map((careType) => (
                            <span
                              key={`${community.name}-${careType}`}
                              className="rounded-full border border-slate-900/10 bg-white px-3 py-1.5 text-[0.82rem] font-medium leading-6 text-slate-700"
                            >
                              {careType}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-slate-900/8 bg-[#e6f5ef] p-6 shadow-[0_20px_60px_rgba(61,80,113,0.11)] md:col-span-3 sm:p-7">
              <div className="section-label">Don’t see your community?</div>
              <p className="mt-4 max-w-3xl text-[1.04rem] leading-8 text-slate-700">
                We’re actively growing our Central Illinois footprint. If you’re an operator exploring
                therapy partnership options, we’d love to start a conversation — even if we’re not in your
                community yet.
              </p>
              <Button
                asChild
                className="mt-6 h-12 rounded-full bg-slate-900 px-6 text-white transition hover:bg-slate-800"
              >
                <a href="#contact">Let’s talk about your community</a>
              </Button>
            </div>

            <div className="rounded-[1.85rem] border border-slate-900/8 bg-slate-900 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)] md:col-span-3 sm:p-7">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
                For senior living communities
              </div>
              <h2 className="mt-3 max-w-[16ch] font-[DM_Sans] text-[2rem] leading-tight tracking-[-0.04em] text-white">
                Ready to bring Savoy Therapy to your community?
              </h2>
              <p className="mt-4 max-w-3xl text-[1rem] leading-7 text-slate-200">
                Our partnerships are built on communication, collaboration, and a genuine commitment to your
                residents’ outcomes. Let’s talk about what that looks like for your community.
              </p>
              <Button
                asChild
                className="mt-6 h-12 rounded-full bg-white px-6 text-slate-950 transition hover:bg-slate-100"
              >
                <a href="#contact">Partner with Savoy Therapy</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
