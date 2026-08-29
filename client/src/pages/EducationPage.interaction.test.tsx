// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  mutateAsyncMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  gtagMock: vi.fn(),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    resources: {
      submitLead: {
        useMutation: (options?: {
          onSuccess?: () => void;
          onError?: () => void;
        }) => ({
          mutateAsync: async (input: unknown) => {
            const result = await mocks.mutateAsyncMock(input);
            options?.onSuccess?.();
            return result;
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
    error: vi.fn(),
  },
}));

import EducationPage from "./EducationPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function setNativeFieldValue(element: HTMLInputElement, value: string) {
  const prototype = Object.getPrototypeOf(element);
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

  descriptor?.set?.call(element, value);
  element.dispatchEvent(new window.Event("input", { bubbles: true }));
}

describe("EducationPage gated downloads", () => {
  let container: HTMLDivElement;
  let root: Root;
  let anchorClickSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mocks.mutateAsyncMock.mockReset();
    mocks.mutateAsyncMock.mockResolvedValue({ success: true, leadId: 19 });
    mocks.toastSuccessMock.mockReset();
    mocks.gtagMock.mockReset();

    anchorClickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
    root = createRoot(container);

    Object.assign(window, {
      dataLayer: [],
      gtag: mocks.gtagMock,
    });
  });

  it("submits first name and email for the selected guide, then triggers the download", async () => {
    await act(async () => {
      root.render(<EducationPage />);
    });

    expect(container.textContent).toContain("Free guides, practical tips, and real answers.");

    const buttons = Array.from(container.querySelectorAll("button"));
    const firstDownloadButton = buttons.find((button) => button.textContent?.includes("Download Free Guide")) as HTMLButtonElement;

    await act(async () => {
      firstDownloadButton.click();
    });

    const firstNameInput = container.querySelector('input[placeholder="First name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[placeholder="you@example.com"]') as HTMLInputElement;
    const form = container.querySelector("form") as HTMLFormElement;

    await act(async () => {
      setNativeFieldValue(firstNameInput, "Helen");
      setNativeFieldValue(emailInput, "helen@example.com");
    });

    await act(async () => {
      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(mocks.mutateAsyncMock).toHaveBeenCalledWith({
      firstName: "Helen",
      email: "helen@example.com",
      guideSlug: "fall-prevention-tips",
      guideTitle: "10 Fall Prevention Tips Every Family Should Know",
    });
    expect(mocks.toastSuccessMock).toHaveBeenCalled();
    expect(mocks.gtagMock).toHaveBeenCalledWith(
      "event",
      "savoy_form_submission",
      expect.objectContaining({
        source_page: "resources",
        placement: "guide_download_gate",
        form_name: "resource_download_gate",
        form_type: "fall-prevention-tips",
      }),
    );
    expect(anchorClickSpy).toHaveBeenCalled();
    expect(container.textContent).toContain("Your guide should begin downloading automatically.");
  });
});
