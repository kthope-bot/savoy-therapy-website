import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("wouter", () => ({
  useLocation: () => ["/communities/champaign", vi.fn()],
}));

vi.mock("@/components/Map", () => ({
  MapView: ({ className }: { className?: string }) =>
    <div className={className} data-testid="community-map">Map placeholder</div>,
}));

import CommunityPage from "./CommunityPage";

describe("CommunityPage", () => {
  it("renders the Champaign community page with local details and map section", () => {
    const markup = renderToStaticMarkup(<CommunityPage />);

    expect(markup).toContain("Therapy support for older adults and senior living partners in Champaign.");
    expect(markup).toContain("Communities in and around Champaign");
    expect(markup).toContain("Autumn Fields");
    expect(markup).toContain("Explore the home safety assessment");
    expect(markup).toContain("data-testid=\"community-map\"");
  });
});
