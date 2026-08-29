import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { downloadableResources } from "@/lib/siteContent";

vi.mock("@/lib/trpc", () => ({
  trpc: {
    resources: {
      submitLead: {
        useMutation: () => ({
          mutateAsync: vi.fn(),
          isPending: false,
        }),
      },
    },
  },
}));

import EducationPage from "./EducationPage";

describe("EducationPage", () => {
  it("renders the refreshed Resources hub with the new hero copy and five real guide downloads", () => {
    const markup = renderToStaticMarkup(<EducationPage />);

    expect(markup).toContain("Resources");
    expect(markup).toContain("Free guides, practical tips, and real answers.");
    expect(markup).toContain("Everything on this page is designed to help families make better decisions, ask better questions,");
    expect(markup).toContain("Free downloadable guides");
    expect(markup).toContain("Five practical guides families can download right away.");
    expect(markup).toContain("Enter your name and email to download any guide instantly. No spam — just useful resources");
    expect(markup).toContain("10 Fall Prevention Tips Every Family Should Know");
    expect(markup).toContain("Warning Signs of Fall Risk in Older Adults");
    expect(markup).toContain("Home Safety Checklist for Older Adults");
    expect(markup).toContain("How to Choose the Right Walker or Cane");
    expect(markup).toContain("Indoor vs Outdoor Walkers: What&#x27;s the Difference?");
    expect(markup).toContain("Fall Prevention");
    expect(markup).toContain("Home Safety");
    expect(markup).toContain("Mobility &amp; Equipment");
    expect(markup).toContain("Download Free Guide");
    expect(markup).toContain("Latest from Savoy Therapy");
    expect(markup).toContain("Free monthly workshops");
    expect(markup).toContain("Brookdale at 3:30 PM on the third Wednesday of each");
    expect(markup).toContain("Start a conversation");
    expect(markup).not.toContain("Four starter PDFs families can use right away.");
    expect(markup).not.toContain("Downloadable tools for safer days, steadier movement, and calmer family decisions.");
  });

  it("uses the five uploaded PDF files in shared Resources metadata", () => {
    expect(downloadableResources).toHaveLength(5);
    expect(downloadableResources.map((resource) => resource.href)).toEqual([
      "/manus-storage/guide1_fall_prevention_6bc71b09.pdf",
      "/manus-storage/guide2_warning_signs_c926c9ed.pdf",
      "/manus-storage/guide3_home_safety_checklist_a8fad037.pdf",
      "/manus-storage/guide4_walker_cane_guide_8bba8350.pdf",
      "/manus-storage/guide5_indoor_outdoor_walkers_44e8d9f9.pdf",
    ]);
  });
});
