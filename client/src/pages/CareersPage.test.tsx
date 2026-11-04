import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import CareersPage from "./CareersPage";

describe("Careers page", () => {
  it("renders the hero, reasons to join, roles, who-thrives block, and email apply CTAs", () => {
    const markup = renderToStaticMarkup(<CareersPage />);

    expect(markup).toContain("Do the work that made you become a therapist.");
    expect(markup).toContain("Why clinicians join Savoy");
    expect(markup).toContain("Speech-Language Pathologists");
    expect(markup).toContain("Roles we hire");
    expect(markup).toContain("Who thrives here");
    expect(markup).toContain("Email your resume");
    expect(markup).toContain("mailto:kthope@savoytherapy.com");
  });
});
