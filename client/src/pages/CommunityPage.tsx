import React from "react";
import { ArrowLeft, ArrowRight, Building2, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "wouter";
import { MapView } from "@/components/Map";
import { trackCtaClick, trackPhoneTap } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { communityPagesBySlug } from "@/lib/communityData";

function slugFromPath(path: string) {
  const match = path.match(/^\/communities\/([^/]+)/);
  return match?.[1] ?? "";
}

export default function CommunityPage() {
  const [location] = useLocation();
  const slug = useMemo(() => slugFromPath(location), [location]);
  const community = communityPagesBySlug[slug];

  if (!community) {
    return (
      <div className="min-h-screen bg-background px-4 py-16 text-foreground">
        <div className="container max-w-3xl rounded-[2rem] border border-slate-900/10 bg-white/80 p-8 shadow-[0_24px_70px_rgba(61,80,113,0.12)]">
          <a
            href="/communities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#0A1628]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to communities
          </a>
          <h1 className="mt-6 font-[DM_Sans] text-[3rem] leading-[0.96] tracking-[-0.05em] text-[#0A1628]">
            Community page not found.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-slate-700">
            Savoy Therapy&apos;s service footprint page may have moved. Please return to the communities section to choose an active location page.
          </p>
        </div>
      </div>
    );
  }

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
        sourcePage: `communities/${slug}`,
        placement,
        phoneNumber: href.replace(/^tel:/, ""),
        label,
      });
      return;
    }

    if (anchor.getAttribute("data-track-cta") === "true") {
      trackCtaClick({
        sourcePage: `communities/${slug}`,
        placement,
        label,
        destination: href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" onClickCapture={handlePageClick}>
      <section className="relative overflow-hidden pb-18 pt-8 sm:pb-24 sm:pt-12">
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_42%),radial-gradient(circle_at_80%_12%,rgba(223,241,232,0.62),transparent_28%),radial-gradient(circle_at_72%_68%,rgba(235,225,202,0.38),transparent_24%)]" />
        <div className="container relative">
          <a
            href="/communities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#0A1628]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to communities
          </a>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                <MapPin className="h-4 w-4 text-slate-700" />
                {community.marketLabel}
              </div>
              <h1 className="mt-6 max-w-[12ch] font-[DM_Sans] text-[3.25rem] leading-[0.93] tracking-[-0.06em] text-[#0A1628] sm:text-[4.35rem] lg:text-[5.05rem]">
                {community.headline}
              </h1>
              <p className="mt-8 max-w-xl text-[1.16rem] leading-8 text-slate-700 sm:text-[1.22rem]">
                {community.intro}
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-7 text-slate-700">
                {community.populationFit}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button className="h-13 rounded-full bg-slate-900 px-7 text-white shadow-[0_14px_36px_rgba(15,23,42,0.16)] transition hover:bg-slate-800" asChild>
                  <a href="tel:2178988393" data-analytics-placement="community_hero_call">Call Savoy Therapy</a>
                </Button>
                <a
                  href="/home-safety-assessment"
                  data-track-cta="true"
                  data-analytics-placement="community_hero_home_safety"
                  className="inline-flex items-center gap-2 text-[1rem] font-semibold text-slate-800 transition hover:text-[#0A1628]"
                >
                  Explore the home safety assessment
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-900/8 bg-white/78 p-4 shadow-[0_26px_80px_rgba(61,80,113,0.12)]">
              <MapView
                className="h-[25rem] overflow-hidden rounded-[1.55rem]"
                initialCenter={community.mapCenter}
                initialZoom={12}
                onMapReady={(map) => {
                  if (!window.google?.maps?.marker) {
                    return;
                  }

                  new window.google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: community.mapCenter,
                    title: community.mapLabel,
                  });

                  map.setCenter(community.mapCenter);
                }}
              />
              <p className="mt-4 px-2 text-sm leading-6 text-slate-600">{community.mapLabel}</p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 border-t border-slate-900/10 pt-8 md:grid-cols-3">
            <div className="rounded-[1.7rem] border border-slate-900/8 bg-white/72 p-6 shadow-[0_18px_55px_rgba(61,80,113,0.1)]">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Search intent</div>
              <div className="mt-3 font-[DM_Sans] text-[2rem] tracking-[-0.05em] text-[#0A1628]">Local therapy trust</div>
              <p className="mt-2 text-[0.98rem] leading-7 text-slate-700">
                These pages help Savoy Therapy show a visible local footprint for families and partners searching for therapy support in {community.city}.
              </p>
            </div>
            <div className="rounded-[1.7rem] border border-slate-900/8 bg-[#f8fafc] p-6 shadow-[0_18px_55px_rgba(61,80,113,0.1)]">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Care focus</div>
              <div className="mt-3 font-[DM_Sans] text-[2rem] tracking-[-0.05em] text-[#0A1628]">Balance, mobility, independence</div>
              <p className="mt-2 text-[0.98rem] leading-7 text-slate-700">
                The message stays centered on safer movement, daily function, and the confidence that keeps older adults connected to the life they enjoy.
              </p>
            </div>
            <div className="rounded-[1.7rem] border border-slate-900/8 bg-white/72 p-6 shadow-[0_18px_55px_rgba(61,80,113,0.1)]">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Ideal audience</div>
              <div className="mt-3 font-[DM_Sans] text-[2rem] tracking-[-0.05em] text-[#0A1628]">Families and operators</div>
              <p className="mt-2 text-[0.98rem] leading-7 text-slate-700">
                Each location page supports both family education and senior living partnership conversations without sounding generic or procedural.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
            <div className="max-w-xl">
              <div className="section-label">Why this local page matters</div>
              <h2 className="section-heading mt-6 max-w-[11ch]">A clearer story for residents, families, and referral partners.</h2>
              <p className="section-copy mt-7">
                When families begin searching for therapy support, they are often trying to answer two questions at once: whether help is needed, and whether the provider will feel trustworthy and personal. Savoy Therapy&apos;s local pages make that answer easier to understand by connecting therapy services to a real community footprint.
              </p>
              <p className="section-copy mt-6">
                For senior living teams, the same page reinforces a partnership story built on communication, consistency, and functional outcomes that matter in everyday routines.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {community.serviceHighlights.map((item) => (
                <article
                  key={item}
                  className="rounded-[1.7rem] border border-slate-900/8 bg-white/74 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.10)]"
                >
                  <div className="inline-flex rounded-full bg-[#eef8e8] p-3 text-slate-800">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-[1rem] leading-7 text-slate-700">{item}</p>
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
              <div className="section-label">Communities and relationships</div>
              <h2 className="section-heading mt-6 max-w-[10ch]">Where this market connection is already visible.</h2>
            </div>
            <div className="space-y-5">
              <div className="rounded-[1.7rem] border border-slate-900/8 bg-[#f7f3e7] p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]">
                <div className="flex items-center gap-3 text-slate-800">
                  <Building2 className="h-5 w-5" />
                  <span className="font-semibold">Communities in and around {community.city}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {community.localCommunities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-900/10 bg-white/86 px-3 py-1.5 text-[0.92rem] leading-6 text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.7rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]">
                  <div className="flex items-center gap-3 text-slate-800">
                    <HeartHandshake className="h-5 w-5" />
                    <span className="font-semibold">For families</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {community.familyFocus.map((item) => (
                      <p key={item} className="text-[0.98rem] leading-7 text-slate-700">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.7rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]">
                  <div className="flex items-center gap-3 text-slate-800">
                    <Building2 className="h-5 w-5" />
                    <span className="font-semibold">For community partners</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {community.partnerValue.map((item) => (
                      <p key={item} className="text-[0.98rem] leading-7 text-slate-700">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-18 pt-4 sm:pb-24">
        <div className="container">
          <div className="rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div>
                <div className="section-label border-white/16 bg-white/10 text-blue-50/80">Next step</div>
                <h2 className="mt-6 max-w-[12ch] font-[DM_Sans] text-[2.7rem] leading-[0.96] tracking-[-0.05em] text-white sm:text-[3.2rem]">
                  Start with a conversation that feels practical and personal.
                </h2>
                <p className="mt-6 max-w-xl text-[1.06rem] leading-8 text-blue-50/88">
                  Whether you are exploring therapy services for a loved one, trying to reduce fall risk, or evaluating the right therapy partner for a senior living community in {community.city}, Savoy Therapy can help you talk through the next step with clarity.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <Button className="h-12 rounded-full bg-white px-6 text-slate-900 transition hover:bg-blue-50" asChild>
                  <a href="tel:2178988393" data-analytics-placement="community_footer_call">Call Savoy Therapy</a>
                </Button>
                <Button variant="outline" className="h-12 rounded-full border-white/30 px-6 text-white hover:bg-white/10" asChild>
                  <a href="/stimpod" data-track-cta="true" data-analytics-placement="community_footer_stimpod">Explore StimPod</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
