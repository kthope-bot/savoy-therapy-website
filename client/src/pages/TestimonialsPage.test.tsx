import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import TestimonialsPage from "./TestimonialsPage";

describe("TestimonialsPage", () => {
  it("renders the updated testimonials hero, review grid, corrected reviewer tags, and closing CTAs", () => {
    const markup = renderToStaticMarkup(<TestimonialsPage />);

    expect(markup).toContain("What families and communities say about us.");
    expect(markup).toContain("The most important thing we can tell you about Savoy Therapy is what the people we’ve served say about us. These are their words.");
    expect(markup).toContain("5.0 on Google");
    expect(markup).toContain("Jerry");
    expect(markup).toContain("My 89-year-old sister needed physical therapy to gain strength and to improve her balance to prevent falls.");
    expect(markup).toContain("Carla Wheeler");
    expect(markup).toContain("Executive Director, Autumn Fields");
    expect(markup).toContain("compared to our previous provider");
    expect(markup).toContain("Susan Bryant");
    expect(markup).toContain("Family Member");
    expect(markup).toContain("Kristyn Durre");
    expect(markup).toContain("Senior Living Community Staff");
    expect(markup).toContain("Julie Johnston");
    expect(markup).toContain("Emily Eisenman");
    expect(markup).toContain("Bradley Kelm");
    expect(markup).toContain("Beth Funk");
    expect(markup).toContain("Leave us a Google review");
    expect(markup).toContain('href="https://g.page/r/Cf-bch66uiyKEBM/review"');
    expect(markup).toContain("Ready to experience this for your loved one?");
    expect(markup).toContain("Start a conversation");
  });
});
