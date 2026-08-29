import React, { useMemo, useState } from "react";
import MarketingLayout from "@/components/MarketingLayout";
import { trpc } from "@/lib/trpc";

function formatTimestamp(value: Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

function formatSourceLabel(value: string) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ContactReportPage() {
  const [interestFilter, setInterestFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const { data, isLoading, isError, error } = trpc.contact.report.useQuery(undefined, {
    retry: false,
  });

  const interestOptions = useMemo(() => {
    const values = new Set<string>();
    data?.recentLeads.forEach(lead => values.add(lead.interest));
    return Array.from(values);
  }, [data?.recentLeads]);

  const sourceOptions = useMemo(() => {
    const values = new Set<string>();
    data?.recentLeads.forEach(lead => values.add(lead.sourcePage));
    return Array.from(values);
  }, [data?.recentLeads]);

  const filteredLeads = useMemo(() => {
    return (data?.recentLeads ?? []).filter(lead => {
      const matchesInterest = interestFilter === "all" || lead.interest === interestFilter;
      const matchesSource = sourceFilter === "all" || lead.sourcePage === sourceFilter;
      return matchesInterest && matchesSource;
    });
  }, [data?.recentLeads, interestFilter, sourceFilter]);

  return (
    <MarketingLayout currentPath="/contact-report" showContactSection={false}>
      <section className="pb-18 pt-10 sm:pb-24 sm:pt-14">
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Contact conversion report
            </div>
            <h1 className="mt-6 font-[DM_Sans] text-[3rem] leading-[0.95] tracking-[-0.05em] text-[#0A1628] sm:text-[4rem]">
              Review recent contact inquiries in one place.
            </h1>
            <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-slate-700">
              This lightweight report summarizes total contact leads and recent inquiry volume so Savoy Therapy can monitor conversion activity after launch.
            </p>
          </div>

          {isLoading ? (
            <div className="mt-10 rounded-[1.8rem] border border-slate-900/8 bg-white p-6 text-[1rem] leading-7 text-slate-700 shadow-[0_18px_52px_rgba(61,80,113,0.08)] sm:p-8">
              Loading recent contact conversions…
            </div>
          ) : null}

          {isError ? (
            <div className="mt-10 rounded-[1.8rem] border border-amber-200 bg-amber-50 p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)] sm:p-8">
              <h2 className="font-[DM_Sans] text-[1.7rem] tracking-[-0.03em] text-[#0A1628]">Sign in to view the contact report.</h2>
              <p className="mt-3 max-w-3xl text-[1rem] leading-7 text-slate-700">
                This page is intended for internal review after launch. If you are not already authenticated, please sign in and refresh the page. If the problem continues, the latest error was: {error.message}
              </p>
            </div>
          ) : null}

          {!isLoading && !isError ? (
            <>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  { label: "All-time inquiries", value: data?.totals.allTime ?? 0 },
                  { label: "Last 7 days", value: data?.totals.last7Days ?? 0 },
                  { label: "Last 30 days", value: data?.totals.last30Days ?? 0 },
                ].map(card => (
                  <article
                    key={card.label}
                    className="rounded-[1.6rem] border border-slate-900/8 bg-white p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)]"
                  >
                    <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{card.label}</div>
                    <div className="mt-4 font-[DM_Sans] text-[2.2rem] tracking-[-0.04em] text-[#0A1628]">{card.value}</div>
                  </article>
                ))}
              </div>

              <div className="mt-10 rounded-[1.8rem] border border-[#4157A2]/10 bg-white p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)] sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-[DM_Sans] text-[1.8rem] tracking-[-0.03em] text-[#0A1628]">Mobile shortcut activity</h2>
                    <p className="mt-2 max-w-3xl text-[0.98rem] leading-7 text-slate-700">
                      These totals show how often mobile visitors tapped the sticky call and inquiry shortcuts before submitting a form.
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    { label: "All mobile shortcut clicks", value: data?.shortcutTotals.allTime ?? 0 },
                    { label: "Call shortcut taps", value: data?.shortcutTotals.call ?? 0 },
                    { label: "Inquiry shortcut taps", value: data?.shortcutTotals.inquiry ?? 0 },
                  ].map(card => (
                    <article
                      key={card.label}
                      className="rounded-[1.5rem] border border-[#4157A2]/10 bg-[#f7faff] p-5 shadow-[0_14px_36px_rgba(65,87,162,0.06)]"
                    >
                      <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#4157A2]">{card.label}</div>
                      <div className="mt-4 font-[DM_Sans] text-[2rem] tracking-[-0.04em] text-[#0A1628]">{card.value}</div>
                    </article>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <article className="rounded-[1.4rem] border border-slate-900/8 bg-white px-5 py-4 shadow-[0_12px_32px_rgba(61,80,113,0.05)]">
                    <div className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Last 7 days</div>
                    <div className="mt-2 font-[DM_Sans] text-[1.65rem] tracking-[-0.03em] text-[#0A1628]">{data?.shortcutTotals.last7Days ?? 0}</div>
                  </article>
                  <article className="rounded-[1.4rem] border border-slate-900/8 bg-white px-5 py-4 shadow-[0_12px_32px_rgba(61,80,113,0.05)]">
                    <div className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Last 30 days</div>
                    <div className="mt-2 font-[DM_Sans] text-[1.65rem] tracking-[-0.03em] text-[#0A1628]">{data?.shortcutTotals.last30Days ?? 0}</div>
                  </article>
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-slate-900/8 bg-white p-5 shadow-[0_12px_32px_rgba(61,80,113,0.05)]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="font-[DM_Sans] text-[1.45rem] tracking-[-0.03em] text-[#0A1628]">Source-page shortcut chart</h3>
                      <p className="mt-1 text-[0.95rem] leading-7 text-slate-700">
                        This view highlights which pages are driving the most mobile shortcut activity so you can compare lead intent by page.
                      </p>
                    </div>
                  </div>

                  {data?.shortcutSourceBreakdown.length === 0 ? (
                    <div className="mt-6 rounded-[1.3rem] border border-dashed border-slate-900/12 bg-slate-50 px-5 py-6 text-[1rem] leading-7 text-slate-700">
                      No source-page shortcut activity is available yet.
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {data?.shortcutSourceBreakdown.map(source => {
                        const maxValue = data?.shortcutSourceBreakdown[0]?.total ?? 1;
                        const totalWidth = Math.max((source.total / maxValue) * 100, 12);
                        const callWidth = source.total > 0 ? (source.call / source.total) * 100 : 0;
                        const inquiryWidth = source.total > 0 ? (source.inquiry / source.total) * 100 : 0;

                        return (
                          <div key={source.sourcePage} className="rounded-[1.2rem] border border-[#4157A2]/10 bg-[#f8fbff] p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <div className="text-[0.95rem] font-semibold text-[#0A1628]">{formatSourceLabel(source.sourcePage)}</div>
                                <div className="mt-1 text-[0.82rem] uppercase tracking-[0.14em] text-slate-500">{source.total} total shortcut taps</div>
                              </div>
                              <div className="flex flex-wrap gap-2 text-[0.8rem] font-semibold text-slate-600">
                                <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-900/8">Call: {source.call}</span>
                                <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-900/8">Inquiry: {source.inquiry}</span>
                              </div>
                            </div>
                            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white ring-1 ring-[#4157A2]/10">
                              <div className="h-full rounded-full bg-[#dbe5fb]" style={{ width: `${totalWidth}%` }}>
                                <div className="flex h-full overflow-hidden rounded-full">
                                  <div className="h-full bg-[#4157A2]" style={{ width: `${callWidth}%` }} />
                                  <div className="h-full bg-[#7b8fd1]" style={{ width: `${inquiryWidth}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-8 overflow-x-auto">
                  {data?.recentShortcutEvents.length === 0 ? (
                    <div className="rounded-[1.3rem] border border-dashed border-slate-900/12 bg-slate-50 px-5 py-6 text-[1rem] leading-7 text-slate-700">
                      No mobile shortcut clicks have been recorded yet.
                    </div>
                  ) : (
                    <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-[1.25rem] border border-slate-900/8 text-left text-sm text-slate-700">
                      <thead className="bg-slate-50 text-slate-900">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Shortcut</th>
                          <th className="px-4 py-3 font-semibold">Source</th>
                          <th className="px-4 py-3 font-semibold">Clicked</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.recentShortcutEvents.map(event => (
                          <tr key={event.id} className="border-t border-slate-900/8">
                            <td className="px-4 py-3 align-top">{event.shortcutAction === "call" ? "Call now" : "Start inquiry"}</td>
                            <td className="px-4 py-3 align-top">{formatSourceLabel(event.sourcePage)}</td>
                            <td className="px-4 py-3 align-top">{formatTimestamp(event.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="mt-10 rounded-[1.8rem] border border-slate-900/8 bg-white p-6 shadow-[0_18px_52px_rgba(61,80,113,0.08)] sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-[DM_Sans] text-[1.8rem] tracking-[-0.03em] text-[#0A1628]">Recent inquiries</h2>
                    <p className="mt-2 text-[0.98rem] leading-7 text-slate-700">
                      The newest submissions from the shared contact form are listed below with source-page attribution.
                    </p>
                  </div>
                  <a href="#contact-report-table" className="text-sm font-semibold text-slate-700 transition hover:text-[#0A1628]">
                    Jump to table
                  </a>
                </div>

                <div className="mt-8 grid gap-4 rounded-[1.4rem] bg-[#f8fafc] p-5 ring-1 ring-slate-900/6 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Filter by service interest
                    <select
                      aria-label="Filter by service interest"
                      value={interestFilter}
                      onChange={event => setInterestFilter(event.target.value)}
                      className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-[#0A1628] outline-none focus-visible:ring-2 focus-visible:ring-[#4157A2]/35"
                    >
                      <option value="all">All interests</option>
                      {interestOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Filter by source page
                    <select
                      aria-label="Filter by source page"
                      value={sourceFilter}
                      onChange={event => setSourceFilter(event.target.value)}
                      className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-[#0A1628] outline-none focus-visible:ring-2 focus-visible:ring-[#4157A2]/35"
                    >
                      <option value="all">All source pages</option>
                      {sourceOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="md:col-span-2 text-sm leading-6 text-slate-600">
                    Showing <span className="font-semibold text-[#0A1628]">{filteredLeads.length}</span> of <span className="font-semibold text-[#0A1628]">{data?.recentLeads.length ?? 0}</span> recent inquiries.
                  </div>
                </div>

                {data?.recentLeads.length === 0 ? (
                  <div className="mt-8 rounded-[1.3rem] border border-dashed border-slate-900/12 bg-slate-50 px-5 py-6 text-[1rem] leading-7 text-slate-700">
                    No contact inquiries have been recorded yet.
                  </div>
                ) : null}

                {data?.recentLeads.length ? (
                  <div className="mt-8 overflow-x-auto" id="contact-report-table">
                    {filteredLeads.length === 0 ? (
                      <div className="mb-6 rounded-[1.3rem] border border-dashed border-slate-900/12 bg-slate-50 px-5 py-6 text-[1rem] leading-7 text-slate-700">
                        No recent inquiries match the selected filters.
                      </div>
                    ) : null}
                    <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-[1.25rem] border border-slate-900/8 text-left text-sm text-slate-700">
                      <thead className="bg-slate-50 text-slate-900">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Name</th>
                          <th className="px-4 py-3 font-semibold">Email</th>
                          <th className="px-4 py-3 font-semibold">Interest</th>
                          <th className="px-4 py-3 font-semibold">Source</th>
                          <th className="px-4 py-3 font-semibold">Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map(lead => (
                          <tr key={lead.id} className="border-t border-slate-900/8">
                            <td className="px-4 py-3 align-top">{lead.fullName}</td>
                            <td className="px-4 py-3 align-top">{lead.email}</td>
                            <td className="px-4 py-3 align-top">{lead.interest}</td>
                            <td className="px-4 py-3 align-top">{lead.sourcePage}</td>
                            <td className="px-4 py-3 align-top">{formatTimestamp(lead.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </MarketingLayout>
  );
}
