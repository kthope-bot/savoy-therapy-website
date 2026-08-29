// @vitest-environment jsdom

import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import BalanceIQPage from "./BalanceIQPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("BalanceIQ landing page", () => {
  let container: HTMLDivElement;
  let root: Root;
  let gtagMock: ReturnType<typeof vi.fn>;
  let dataLayer: Array<Record<string, unknown>>;

  beforeEach(() => {
    document.body.innerHTML = "";
    document.head.innerHTML = '<meta name="description" content="Initial description" />';
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    window.history.replaceState({}, "", "/balanceiq");

    gtagMock = vi.fn();
    dataLayer = [];
    Object.assign(window, {
      dataLayer,
      gtag: gtagMock,
    });
  });

  it("renders the requested BalanceIQ sections with a centered-logo-only header, embedded HighLevel form, and simplified footer", () => {
    const markup = renderToStaticMarkup(<BalanceIQPage />);

    expect(markup).toContain('alt="Savoy Therapy"');
    expect(markup).toContain("<header");
    expect(markup).not.toContain("Start a conversation");
    expect(markup).not.toContain("Menu");
    expect(markup).toContain("Your BalanceIQ Results Are Ready");
    expect(markup).toContain("A Savoy Therapy specialist is ready to help you take the next step toward better balance and fall prevention.");
    expect(markup).toContain("Serving Central IL Since 2010");
    expect(markup).toContain("Geriatric PT Specialists");
    expect(markup).toContain("25+ Licensed Clinicians");
    expect(markup).toContain('id="booking-form"');
    expect(markup).toContain("Book your free balance screening.");
    expect(markup).toContain("Share your details below so our team can review your result and reach out with the right next step.");
    expect(markup).toContain('src="https://api.leadconnectorhq.com/widget/form/qUOCWrerHZR2Tp4kMDZu"');
    expect(markup).toContain('id="inline-qUOCWrerHZR2Tp4kMDZu"');
    expect(markup).toContain('data-form-id="qUOCWrerHZR2Tp4kMDZu"');
    expect(markup).toContain('data-height="700"');
    expect(markup).toContain('height:700px');
    expect(markup).not.toContain("<form");
    expect(markup).not.toContain("First Name");
    expect(markup).not.toContain("How would you describe your balance?");
    expect(markup).toContain("What happens next");
    expect(markup).toContain("We review your BalanceIQ results");
    expect(markup).toContain("We contact you within 24 hours");
    expect(markup).toContain("You get a free in-person balance screening");
    expect(markup).toContain("Phone: 217-898-8393");
    expect(markup).toContain("Fax: 217-633-4553");
    expect(markup).toContain("Powered by BalanceIQ");
    expect(markup).not.toContain("Contact report");
    expect(markup).not.toContain('href="/about"');
    expect(markup).not.toContain('href="/services"');
    expect(markup).not.toContain('href="/resources"');
  });

  it("appends the HighLevel embed script and renders the iframe with mobile-safe height on client render", async () => {
    await act(async () => {
      root.render(<BalanceIQPage />);
    });

    const iframe = container.querySelector("#inline-qUOCWrerHZR2Tp4kMDZu") as HTMLIFrameElement | null;
    const script = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]') as HTMLScriptElement | null;
    const bookingSection = container.querySelector("#booking-form") as HTMLElement | null;

    expect(bookingSection).not.toBeNull();
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toBe("https://api.leadconnectorhq.com/widget/form/qUOCWrerHZR2Tp4kMDZu");
    expect(iframe?.getAttribute("data-height")).toBe("700");
    expect(iframe?.style.height).toBe("700px");
    expect(iframe?.className).toContain("min-h-[700px]");
    expect(script).not.toBeNull();
    expect(document.title).toBe("BalanceIQ by Savoy Therapy | Free Balance Screening");
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      "Review your BalanceIQ results and book a free balance screening with Savoy Therapy in Central Illinois.",
    );
  });

  it("records a BalanceIQ conversion when the embedded HighLevel iframe posts a successful submission message", async () => {
    await act(async () => {
      root.render(<BalanceIQPage />);
    });

    await act(async () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: [
            "form-submitted",
            "https://api.leadconnectorhq.com/widget/form/qUOCWrerHZR2Tp4kMDZu",
            JSON.stringify({
              email: "adultchild@example.com",
              full_name: "Jordan Carter",
              customer_id: "cust_123",
            }),
          ],
        }),
      );
    });

    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "balanceiq_form_confirmed",
      expect.objectContaining({
        source_page: "balanceiq",
        form_id: "qUOCWrerHZR2Tp4kMDZu",
        form_provider: "highlevel",
      }),
    );
    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({
        source_page: "balanceiq",
        form_id: "qUOCWrerHZR2Tp4kMDZu",
      }),
    );
    expect(dataLayer).toContainEqual(
      expect.objectContaining({
        event: "balanceiq_form_confirmed",
        source_page: "balanceiq",
        form_id: "qUOCWrerHZR2Tp4kMDZu",
      }),
    );
  });
});
