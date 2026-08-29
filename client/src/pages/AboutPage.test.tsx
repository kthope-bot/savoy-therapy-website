import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import AboutPage from "./AboutPage";

describe("About page", () => {
  it("renders the revised founder story, centered founder quote layout, headshot, operator section, and partnership CTA", () => {
    const markup = renderToStaticMarkup(<AboutPage />);

    expect(markup).toContain("Built on belief. Grounded in practice.");
    expect(markup).toContain("That belief hasn&#x27;t changed. It&#x27;s just grown.");
    expect(markup).toContain("My very first patient as a student was a man recovering from a stroke.");
    expect(markup).toContain('/manus-storage/kris-thope-headshot_a436fc5f.png');
    expect(markup).toContain("lg:flex-row lg:items-center lg:justify-between lg:gap-8");
    expect(markup).toContain("order-1 mx-auto flex shrink-0 flex-col items-center text-center lg:order-2");
    expect(markup).toContain("h-[280px] w-[280px]");
    expect(markup).toContain("object-[22%_center]");
    expect(markup).toContain("order-2 flex-1 rounded-[1.75rem] bg-[#f8fbff] px-6 py-5 shadow-[0_18px_52px_rgba(61,80,113,0.08)] lg:order-1 lg:max-w-[42rem] lg:px-6 lg:py-5");
    expect(markup).toContain("Who We Are");
    expect(markup).toContain("How We Work");
    expect(markup).toContain("For Families");
    expect(markup).toContain("Senior living communities currently served across Central Illinois.");
    expect(markup).toContain("For Senior Living Communities");
    expect(markup).toContain("Direct communication from leadership");
    expect(markup).toContain("Monthly educational workshops");
    expect(markup).toContain("Complimentary fall prevention screening — for every resident, any time");
    expect(markup).toContain("Collaborative care — not a separate silo");
    expect(markup).toContain("Ready to explore a partnership?");
    expect(markup).toContain("Partner with Savoy Therapy");
    expect(markup).not.toContain("Want to bring Savoy Therapy to your community? Start a conversation");
  });
});
