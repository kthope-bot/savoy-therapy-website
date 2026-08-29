// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  mutateAsyncMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
  gtagMock: vi.fn(),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    stimPod: {
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
    },
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: mocks.toastSuccessMock,
    error: mocks.toastErrorMock,
  },
}));

import StimPodPage from "./StimPodPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function setNativeFieldValue(element: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const prototype = Object.getPrototypeOf(element);
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

  descriptor?.set?.call(element, value);
  element.dispatchEvent(new window.Event("input", { bubbles: true }));
}

describe("StimPodPage", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    mocks.mutateAsyncMock.mockReset();
    mocks.mutateAsyncMock.mockResolvedValue({ success: true, leadId: 7 });
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

  it("renders the premium hero copy and submits the consultation form with the expected payload", async () => {
    await act(async () => {
      root.render(<StimPodPage />);
    });

    expect(container.textContent).toContain("Help your loved one move with more ease, comfort, and confidence.");
    expect(container.textContent).toContain("What is StimPod?");
    expect(container.textContent).toContain("Request my complimentary consultation");

    const consultationLink = container.querySelector('a[href="#consultation-form"]') as HTMLAnchorElement;
    const fullNameInput = container.querySelector('input[placeholder="Resident or family contact name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[placeholder="Best email for follow-up"]') as HTMLInputElement;
    const phoneInput = container.querySelector('input[placeholder="Optional"]') as HTMLInputElement;
    const cityInput = container.querySelector('input[placeholder="Champaign, Savoy, or Urbana"]') as HTMLInputElement;
    const goalsInput = container.querySelector('textarea[placeholder="Tell us about pain, recovery, mobility, or the activities you want to return to."]') as HTMLTextAreaElement;
    const form = container.querySelector("form") as HTMLFormElement;

    consultationLink.addEventListener("click", event => event.preventDefault());

    await act(async () => {
      consultationLink.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
    });

    await act(async () => {
      setNativeFieldValue(fullNameInput, "Eleanor Winters");
      setNativeFieldValue(emailInput, "eleanor@example.com");
      setNativeFieldValue(phoneInput, "217-555-0198");
      setNativeFieldValue(cityInput, "Savoy");
      setNativeFieldValue(goalsInput, "I want to feel stronger for travel and gardening.");
    });

    await act(async () => {
      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(mocks.mutateAsyncMock).toHaveBeenCalledWith({
      fullName: "Eleanor Winters",
      email: "eleanor@example.com",
      phone: "217-555-0198",
      city: "Savoy",
      goals: "I want to feel stronger for travel and gardening.",
    });
    expect(mocks.toastSuccessMock).toHaveBeenCalled();
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "savoy_cta_click",
      expect.objectContaining({
        source_page: "stimpod",
        placement: "stimpod_hero_consultation",
        destination: "#consultation-form",
      }),
    );
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "savoy_form_submission",
      expect.objectContaining({
        source_page: "stimpod",
        placement: "consultation_form",
        form_name: "stimpod_consultation_form",
      }),
    );
    expect(container.textContent).toContain("Your consultation request has been saved");
  });
});
