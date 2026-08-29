// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    contact: {
      report: {
        useQuery: (...args: unknown[]) => mocks.useQueryMock(...args),
      },
    },
  },
}));

vi.mock("@/components/MarketingLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import ContactReportPage from "./ContactReportPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("ContactReportPage", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
    root = createRoot(container);
    mocks.useQueryMock.mockReset();
  });

  it("renders loading and unauthorized states clearly", async () => {
    mocks.useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
    });

    await act(async () => {
      root.render(<ContactReportPage />);
    });

    expect(container.textContent).toContain("Loading recent contact conversions");

    mocks.useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Please login (10001)" },
    });

    await act(async () => {
      root.render(<ContactReportPage />);
    });

    expect(container.textContent).toContain("Sign in to view the contact report.");
    expect(container.textContent).toContain("Please login (10001)");
  });

  it("renders summary cards and filters recent leads by interest and source", async () => {
    mocks.useQueryMock.mockReturnValue({
      data: {
        totals: {
          allTime: 9,
          last7Days: 3,
          last30Days: 7,
        },
        shortcutTotals: {
          allTime: 11,
          last7Days: 4,
          last30Days: 9,
          call: 6,
          inquiry: 5,
        },
        recentShortcutEvents: [
          {
            id: 10,
            shortcutAction: "call",
            sourcePage: "home",
            createdAt: new Date("2026-04-28T12:00:00.000Z"),
          },
          {
            id: 11,
            shortcutAction: "inquiry",
            sourcePage: "services",
            createdAt: new Date("2026-04-28T14:00:00.000Z"),
          },
        ],
        shortcutSourceBreakdown: [
          {
            sourcePage: "home",
            total: 7,
            call: 4,
            inquiry: 3,
          },
          {
            sourcePage: "services",
            total: 4,
            call: 2,
            inquiry: 2,
          },
        ],
        recentLeads: [
          {
            id: 1,
            fullName: "Kishor Patel",
            email: "kishor@example.com",
            interest: "Community partnership",
            sourcePage: "services",
            createdAt: new Date("2026-04-27T13:00:00.000Z"),
          },
          {
            id: 2,
            fullName: "Mary Smith",
            email: "mary@example.com",
            interest: "Resources or general question",
            sourcePage: "home",
            createdAt: new Date("2026-04-28T13:00:00.000Z"),
          },
        ],
      },
      isLoading: false,
      isError: false,
      error: undefined,
    });

    await act(async () => {
      root.render(<ContactReportPage />);
    });

    expect(container.textContent).toContain("All-time inquiries");
    expect(container.textContent).toContain("9");
    expect(container.textContent).toContain("Mobile shortcut activity");
    expect(container.textContent).toContain("All mobile shortcut clicks");
    expect(container.textContent).toContain("11");
    expect(container.textContent).toContain("Call shortcut taps");
    expect(container.textContent).toContain("Inquiry shortcut taps");
    expect(container.textContent).toContain("Source-page shortcut chart");
    expect(container.textContent).toContain("Home");
    expect(container.textContent).toContain("7 total shortcut taps");
    expect(container.textContent).toContain("Services");
    expect(container.textContent).toContain("Call now");
    expect(container.textContent).toContain("Start inquiry");
    expect(container.textContent).toContain("Kishor Patel");
    expect(container.textContent).toContain("Mary Smith");
    expect(container.textContent).toContain("Showing 2 of 2 recent inquiries.");

    const selects = container.querySelectorAll("select");
    const interestSelect = selects[0] as HTMLSelectElement;
    const sourceSelect = selects[1] as HTMLSelectElement;

    await act(async () => {
      interestSelect.value = "Community partnership";
      interestSelect.dispatchEvent(new window.Event("change", { bubbles: true }));
    });

    expect(container.textContent).toContain("Showing 1 of 2 recent inquiries.");
    expect(container.textContent).toContain("Kishor Patel");
    expect(container.textContent).not.toContain("Mary Smith");

    await act(async () => {
      sourceSelect.value = "home";
      sourceSelect.dispatchEvent(new window.Event("change", { bubbles: true }));
    });

    expect(container.textContent).toContain("No recent inquiries match the selected filters.");
  });
});
