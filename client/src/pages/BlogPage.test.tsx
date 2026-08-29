import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import BlogPage from "./BlogPage";

describe("BlogPage", () => {
  it("renders the required hero copy, category pills, featured article, and article grid", () => {
    const markup = renderToStaticMarkup(<BlogPage />);

    expect(markup).toContain("Insights &amp; Resources");
    expect(markup).toContain("Real answers for families navigating aging.");
    expect(markup).toContain("Weekly articles from Savoy Therapy’s clinical team — honest, practical, and written for the people who care most.");
    expect(markup).toContain("Fall Prevention");
    expect(markup).toContain("Memory &amp; Aging");
    expect(markup).toContain("Caregiver Support");
    expect(markup).toContain("Therapy Explained");
    expect(markup).toContain("Home Safety");
    expect(markup).toContain("Community Life");
    expect(markup).toContain("5 things I notice in the first 5 minutes with a new patient");
    expect(markup).toContain("After 30+ years as a physical therapist, I&#x27;ve learned that the first five minutes tell me almost everything I need to know.");
    expect(markup).toContain('href="/blog/five-things-i-notice-in-the-first-five-minutes"');
    expect(markup).toContain("Why your loved one is falling — and it’s probably not what you think");
    expect(markup).toContain("The hardest conversation families have with aging parents (and how to make it easier)");
    expect(markup).toContain("What does ‘normal aging’ actually look like? A therapist answers");
  });
});
