// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  mutateAsyncMock: vi.fn(),
  shortcutMutateAsyncMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
  gtagMock: vi.fn(),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    contact: {
      submitLead: {
        useMutation: (options?: {
          onSuccess?: () => void;
          onError?: () => void;
        }) => ({
          mutateAsync: async (input: unknown) => {
            try {
              const result = await mocks.mutateAsyncMock(input);
              options?.onSuccess?.();
              return result;
            } catch (error) {
              options?.onError?.();
              throw error;
            }
          },
          isPending: false,
        }),
      },
      recordMobileShortcut: {
        useMutation: () => ({
          mutateAsync: async (input: unknown) => mocks.shortcutMutateAsyncMock(input),
        }),
      },
    },
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: mocks.toastSuccessMock,
    error: mocks.toastErrorMock,
  },
}));

import MarketingLayout from "./MarketingLayout";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function setNativeFieldValue(element: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const prototype = Object.getPrototypeOf(element);
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

  descriptor?.set?.call(element, value);
  element.dispatchEvent(new window.Event("input", { bubbles: true }));
}

describe("MarketingLayout", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    mocks.mutateAsyncMock.mockReset();
    mocks.mutateAsyncMock.mockResolvedValue({ success: true, leadId: 19 });
    mocks.shortcutMutateAsyncMock.mockReset();
    mocks.shortcutMutateAsyncMock.mockResolvedValue({ success: true, eventId: 7 });
    mocks.toastSuccessMock.mockReset();
    mocks.toastErrorMock.mockReset();
    mocks.gtagMock.mockReset();

    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
    root = createRoot(container);

    Object.assign(window, {
      dataLayer: [],
      gtag: mocks.gtagMock,
    });
  });

  it("renders the dedicated site navigation, shared contact shell, and report link", () => {
    const markup = renderToStaticMarkup(
      <MarketingLayout currentPath="/about">
        <div>Page content</div>
      </MarketingLayout>,
    );

    expect(markup).toContain('href="/"');
    expect(markup).toContain('href="/about"');
    expect(markup).toContain('href="/services"');
    expect(markup).toContain('href="/therapy-rockstars"');
    expect(markup).toContain('href="/testimonials"');
    expect(markup).toContain('href="/resources"');
    expect(markup).toContain("Resources");
    expect(markup).toContain('href="/blog"');
    expect(markup).toContain('href="/communities"');
    expect(markup).toContain('href="#contact"');
    expect(markup).toContain('href="tel:2178988393"');
    expect(markup).toContain('href="/contact-report"');
    expect(markup).toContain('src="/Savoy_Therapy_Logo_Enhanced.webp"');
    expect(markup).toContain('alt="Savoy Therapy"');
    expect(markup).toContain("Senior Living Therapy Partner");
    expect(markup).toContain("bg-[color:rgba(236,241,252,0.94)]");
    expect(markup).toContain("flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4");
    expect(markup).toContain("h-11 w-auto max-w-[220px] object-contain sm:h-16 sm:max-w-[360px]");
    expect(markup).toContain("text-[#4157A2]/82");
    expect(markup).toContain("w-full items-center gap-2 sm:w-auto xl:hidden");
    expect(markup).toContain("Menu");
    expect(markup).toContain("h-11 flex-[1.2] justify-center rounded-full bg-[#C0302D]");
    expect(markup).toContain("Call now");
    expect(markup).toContain("Start inquiry");
    expect(markup).toContain("bg-[#4157A2] px-4 text-[0.95rem] font-semibold text-white");
    expect(markup).toContain("brightness-0 invert");
    expect(markup).toContain("Start the conversation here.");
    expect(markup).toContain("bg-[#4157A2]");
    expect(markup).toContain("bg-[#C0302D]");
  });

  it("opens the expandable mobile menu and records mobile shortcut clicks", async () => {
    await act(async () => {
      root.render(
        <MarketingLayout currentPath="/services">
          <div>Page content</div>
        </MarketingLayout>,
      );
    });

    const menuButton = Array.from(container.querySelectorAll("button")).find(button => button.textContent?.includes("Menu"));
    const callShortcut = container.querySelector('div.fixed a[href="tel:2178988393"]') as HTMLAnchorElement;
    const inquiryShortcut = container.querySelector('div.fixed a[href="#contact"]') as HTMLAnchorElement;

    await act(async () => {
      menuButton?.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).toContain("Explore Savoy Therapy");

    callShortcut.addEventListener("click", event => event.preventDefault());
    inquiryShortcut.addEventListener("click", event => event.preventDefault());

    await act(async () => {
      callShortcut.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
      inquiryShortcut.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
    });

    expect(mocks.shortcutMutateAsyncMock).toHaveBeenCalledWith({ shortcutAction: "call", sourcePage: "services" });
    expect(mocks.shortcutMutateAsyncMock).toHaveBeenCalledWith({ shortcutAction: "inquiry", sourcePage: "services" });
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "mobile_shortcut_clicked",
      expect.objectContaining({ shortcut_action: "call", source_page: "services" }),
    );
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "mobile_shortcut_clicked",
      expect.objectContaining({ shortcut_action: "inquiry", source_page: "services" }),
    );
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "savoy_phone_tap",
      expect.objectContaining({ source_page: "services", placement: "mobile_shortcut_call", phone_number: "2178988393" }),
    );
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "savoy_cta_click",
      expect.objectContaining({ source_page: "services", placement: "mobile_shortcut_inquiry", destination: "#contact" }),
    );
    expect((window as typeof window & { dataLayer: Array<Record<string, unknown>> }).dataLayer).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ event: "mobile_shortcut_clicked", shortcut_action: "call", source_page: "services" }),
        expect.objectContaining({ event: "mobile_shortcut_clicked", shortcut_action: "inquiry", source_page: "services" }),
        expect.objectContaining({ event: "savoy_phone_tap", source_page: "services", placement: "mobile_shortcut_call" }),
        expect.objectContaining({ event: "savoy_cta_click", source_page: "services", placement: "mobile_shortcut_inquiry" }),
      ]),
    );
  });

  it("submits the shared contact form with source-page attribution", async () => {
    await act(async () => {
      root.render(
        <MarketingLayout currentPath="/services">
          <div>Page content</div>
        </MarketingLayout>,
      );
    });

    const fullNameInput = container.querySelector('input[placeholder="Your full name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[placeholder="you@example.com"]') as HTMLInputElement;
    const phoneInput = container.querySelector('input[placeholder="217-555-0123"]') as HTMLInputElement;
    const organizationInput = container.querySelector('input[placeholder="Community name"]') as HTMLInputElement;
    const interestSelect = container.querySelector("select") as HTMLSelectElement;
    const messageInput = container.querySelector(
      'textarea[placeholder="Share a few details so the right team member can follow up."]',
    ) as HTMLTextAreaElement;
    const form = container.querySelector("form") as HTMLFormElement;

    await act(async () => {
      setNativeFieldValue(fullNameInput, "Kishor Patel");
      setNativeFieldValue(emailInput, "kishor@example.com");
      setNativeFieldValue(phoneInput, "217-555-0198");
      setNativeFieldValue(organizationInput, "Savoy Senior Living");
      interestSelect.value = "Community partnership";
      interestSelect.dispatchEvent(new window.Event("change", { bubbles: true }));
      setNativeFieldValue(messageInput, "We want to discuss therapy support for our residents.");
    });

    await act(async () => {
      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(mocks.mutateAsyncMock).toHaveBeenCalledWith({
      fullName: "Kishor Patel",
      email: "kishor@example.com",
      phone: "217-555-0198",
      organization: "Savoy Senior Living",
      interest: "Community partnership",
      message: "We want to discuss therapy support for our residents.",
      sourcePage: "services",
    });
    expect(mocks.toastSuccessMock).toHaveBeenCalled();
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "savoy_form_submission",
      expect.objectContaining({
        source_page: "services",
        placement: "shared_contact_section",
        form_name: "shared_contact_form",
        form_type: "Community partnership",
      }),
    );
    expect(window.location.pathname + window.location.search).toBe(
      "/contact-thank-you?interest=Community%20partnership&source=services",
    );
    expect(container.textContent).toContain("Your message was recorded as a contact inquiry");
    expect(container.innerHTML).toContain("bg-[#6FBD44]/18");
  });
});
