import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import HomeSafetyAssessmentPage from "./HomeSafetyAssessmentPage";

describe("HomeSafetyAssessmentPage", () => {
  it("renders the updated preventive home-safety messaging and local call to action", () => {
    const markup = renderToStaticMarkup(<HomeSafetyAssessmentPage />);

    expect(markup).toContain("A safer home can begin before a fall changes everything.");
    expect(markup).toContain("What the visit looks at");
    expect(markup).toContain("A room-by-room review with real-life movement in mind.");
    expect(markup).toContain("Questions families are already asking");
    expect(markup).toContain("Champaign • Savoy • Urbana");
    expect(markup).toContain('href="tel:2178988393"');
    expect(markup).toContain('href="/resources"');
  });
});
