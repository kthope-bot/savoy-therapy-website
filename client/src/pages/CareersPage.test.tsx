import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import CareersPage from "./CareersPage";

describe("Careers page", () => {
  it("renders the hero, reasons to join, roles, who-thrives block, and Gusto apply CTAs", () => {
    const markup = renderToStaticMarkup(<CareersPage />);

    expect(markup).toContain("Do the work that made you become a therapist.");
    expect(markup).toContain("Why clinicians join Savoy");
    expect(markup).toContain("Speech-Language Pathologists");
    expect(markup).toContain("Roles we hire");
    expect(markup).toContain("Who thrives here");
    expect(markup).toContain("Apply now");
    expect(markup).toContain('href="https://jobs.gusto.com/postings/');
    expect(markup).toContain('target="_blank"');
    expect(markup).not.toContain("mailto:");
    expect(markup).not.toContain("Email your resume");
  });
});
