import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import CommunitiesOverviewPage from "./CommunitiesOverviewPage";

describe("Communities overview page", () => {
  it("renders the revised regional listings, stats bar, and partnership CTAs", () => {
    const markup = renderToStaticMarkup(<CommunitiesOverviewPage />);

    expect(markup).toContain("16 communities. 5 regions. One consistent standard of care.");
    expect(markup).toContain("Communities served");
    expect(markup).toContain("Regions across Central Illinois");
    expect(markup).toContain("Serving Central Illinois since");
    expect(markup).toContain("Champaign-Urbana");
    expect(markup).toContain("8 communities");
    expect(markup).toContain("Bickford Senior Living Bloomington");
    expect(markup).toContain("Bickford Senior Living Peoria");
    expect(markup).toContain("Evergreen Place Chillicothe");
    expect(markup).toContain("Independent Living");
    expect(markup).toContain("Memory Care");
    expect(markup).toContain("Don’t see your community?");
    expect(markup).toContain("Let’s talk about your community");
    expect(markup).toContain("Ready to bring Savoy Therapy to your community?");
    expect(markup).toContain("Partner with Savoy Therapy");
    expect(markup).not.toContain("Explore local pages");
    expect(markup).not.toContain('href="/communities/champaign"');
  });
});
