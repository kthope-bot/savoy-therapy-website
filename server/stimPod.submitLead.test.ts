import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const createStimPodLeadMock = vi.fn();

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return {
    ...actual,
    createStimPodLead: createStimPodLeadMock,
  };
});

const { appRouter } = await import("./routers");

describe("stimPod.submitLead", () => {
  it("saves a public StimPod consultation request and returns success", async () => {
    createStimPodLeadMock.mockResolvedValueOnce({ id: 42 });

    const ctx = {
      user: null,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);

    const result = await caller.stimPod.submitLead({
      fullName: "Eleanor Winters",
      email: "Eleanor@example.com",
      phone: "217-555-0198",
      city: "Savoy",
      goals: "I would like to walk longer distances and feel steadier when traveling.",
    });

    expect(createStimPodLeadMock).toHaveBeenCalledWith({
      fullName: "Eleanor Winters",
      email: "eleanor@example.com",
      phone: "217-555-0198",
      city: "Savoy",
      goals: "I would like to walk longer distances and feel steadier when traveling.",
      sourcePage: "stimpod",
    });
    expect(result).toEqual({ success: true, leadId: 42 });
  });
});
