import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const createResourceGuideLeadMock = vi.fn();

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return {
    ...actual,
    createResourceGuideLead: createResourceGuideLeadMock,
  };
});

const { appRouter } = await import("./routers");

describe("resources.submitLead", () => {
  it("saves a public Resources guide request and returns success", async () => {
    createResourceGuideLeadMock.mockResolvedValueOnce({ id: 13 });

    const ctx = {
      user: null,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);

    const result = await caller.resources.submitLead({
      firstName: "Helen",
      email: "Helen@example.com",
      guideSlug: "fall-prevention-tips",
      guideTitle: "10 Fall Prevention Tips Every Family Should Know",
    });

    expect(createResourceGuideLeadMock).toHaveBeenCalledWith({
      firstName: "Helen",
      email: "helen@example.com",
      guideSlug: "fall-prevention-tips",
      guideTitle: "10 Fall Prevention Tips Every Family Should Know",
      sourcePage: "resources",
    });
    expect(result).toEqual({ success: true, leadId: 13 });
  });
});
