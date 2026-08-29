import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("wouter", async () => {
  const actual = await vi.importActual<typeof import("wouter")>("wouter");
  return {
    ...actual,
    useRoute: () => [true, { slug: "five-things-i-notice-in-the-first-five-minutes" }],
  };
});

import BlogPostPage from "./BlogPostPage";

describe("BlogPostPage", () => {
  it("renders the full first article, its CTA, and related-post placeholders", () => {
    const markup = renderToStaticMarkup(<BlogPostPage />);

    expect(markup).toContain("5 things I notice in the first 5 minutes with a new patient");
    expect(markup).toContain("Therapy Explained");
    expect(markup).toContain("1. How they get out of the chair");
    expect(markup).toContain("What families can do: Pay attention to how your loved one gets up from chairs at home.");
    expect(markup).toContain("The bottom line");
    expect(markup).toContain("Start a conversation →");
    expect(markup).toContain("You might also like");
    expect(markup).toContain("Why your loved one is falling — and it’s probably not what you think");
    expect(markup).toContain("What does ‘normal aging’ actually look like? A therapist answers");
  });
});
