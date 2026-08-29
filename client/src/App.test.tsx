// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

const setLocationMock = vi.fn();

vi.mock("wouter", async () => {
  const actual = await vi.importActual<typeof import("wouter")>("wouter");
  return {
    ...actual,
    useLocation: () => ["/education", setLocationMock],
  };
});

import { EducationRedirect, syncCanonicalUrl } from "./App";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("App helpers", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    setLocationMock.mockReset();
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    document.body.appendChild(container);
    root = createRoot(container);
  });

  it("redirects /education to /resources using replace navigation", async () => {
    await act(async () => {
      root.render(<EducationRedirect />);
    });

    expect(setLocationMock).toHaveBeenCalledWith("/resources", { replace: true });
  });

  it("syncs the canonical link to the preferred www domain", () => {
    syncCanonicalUrl("/services");

    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe("https://www.savoytherapy.com/services");
  });
});
