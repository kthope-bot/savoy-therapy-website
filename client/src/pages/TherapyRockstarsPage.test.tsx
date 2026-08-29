import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import TherapyRockstarsPage from "./TherapyRockstarsPage";

describe("TherapyRockstarsPage", () => {
  it("renders the updated roster page with stats, founders, regional teams, and closing CTAs", () => {
    const markup = renderToStaticMarkup(<TherapyRockstarsPage />);

    expect(markup).toContain("The people behind the care.");
    expect(markup).toContain("30+");
    expect(markup).toContain("Licensed clinicians");
    expect(markup).toContain("3");
    expect(markup).toContain("Therapy disciplines");
    expect(markup).toContain("4");
    expect(markup).toContain("Regions served");
    expect(markup).toContain("Our founders");
    expect(markup).toContain("Kishor “Kris” Thope");
    expect(markup).toContain("Lalaine Thope");
    expect(markup).toContain("Physical Therapist, Certified in Mechanical Diagnosis &amp; Therapy");
    expect(markup).toContain("Champaign-Urbana");
    expect(markup).toContain("Bloomington-Normal");
    expect(markup).toContain("Peoria &amp; Chillicothe");
    expect(markup).toContain("Beth McBurney");
    expect(markup).toContain("Lesley Milam");
    expect(markup).toContain("Want to be part of this team?");
    expect(markup).toContain("Join the Savoy Therapy team.");
    expect(markup).toContain("Send us your resume");
    expect(markup).toContain("Want a team like this in your community?");
    expect(markup).toContain("Partner with Savoy Therapy");
    expect(markup).not.toContain("Qualified clinicians. Familiar faces. Reliable partnership.");
  });
});
