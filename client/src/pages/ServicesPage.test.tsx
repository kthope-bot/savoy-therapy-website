// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import ServicesPage from "./ServicesPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("Services page", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    document.body.innerHTML = "";
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  it("renders the mirrored FAQ block with the family next-step question", () => {
    const markup = renderToStaticMarkup(<ServicesPage />);

    expect(markup).toContain("The right therapy. Right where residents live.");
    expect(markup).toContain("Quick questions families and communities ask");
    expect(markup).toContain("What if a family is unsure whether therapy is the right next step?");
  });

  it("reveals the mirrored family FAQ answer and complimentary-assessment CTA when expanded", async () => {
    await act(async () => {
      root.render(<ServicesPage />);
    });

    const familyTrigger = Array.from(container.querySelectorAll("button")).find(button =>
      button.textContent?.includes("What if a family is unsure whether therapy is the right next step?"),
    );

    expect(familyTrigger).toBeTruthy();

    await act(async () => {
      familyTrigger?.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain(
      "We offer a complimentary assessment to identify your loved one's needs, risks, and the best path forward. No pressure, no guesswork — just a clear picture of what therapy can do and an honest recommendation for your family.",
    );
    expect(container.textContent).toContain("Request a complimentary assessment");
  });
});
