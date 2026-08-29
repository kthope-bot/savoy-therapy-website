// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  gtagMock: vi.fn(),
}));

vi.mock("@/components/MarketingLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import ContactThankYouPage from "./ContactThankYouPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("ContactThankYouPage", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    document.body.appendChild(container);
    root = createRoot(container);
    mocks.gtagMock.mockReset();

    window.history.replaceState({}, "", "/contact-thank-you?interest=Community%20partnership&source=services");
    Object.assign(window, {
      dataLayer: [],
      gtag: mocks.gtagMock,
    });
  });

  it("renders the thank-you state and records a confirmed conversion event", async () => {
    await act(async () => {
      root.render(<ContactThankYouPage />);
    });

    expect(document.title).toBe("Thank You | Savoy Therapy");
    expect(container.textContent).toContain("Thank you. We received your message.");
    expect(container.textContent).toContain("Community partnership");
    expect(container.textContent).toContain("services");
    expect(container.textContent).toContain("records a confirmed contact conversion event");
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "contact_form_confirmed",
      expect.objectContaining({
        interest: "Community partnership",
        source_page: "services",
      }),
    );
    expect((window as typeof window & { dataLayer: Array<Record<string, unknown>> }).dataLayer[0]).toEqual(
      expect.objectContaining({
        event: "contact_form_confirmed",
        interest: "Community partnership",
        source_page: "services",
      }),
    );
  });
});
