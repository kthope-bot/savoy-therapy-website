import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const createContactLeadMock = vi.fn();
const createMobileShortcutEventMock = vi.fn();
const getContactLeadReportMock = vi.fn();
const notifyOwnerMock = vi.fn();
const createUrgentInquiryTaskMock = vi.fn();

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return {
    ...actual,
    createContactLead: createContactLeadMock,
    createMobileShortcutEvent: createMobileShortcutEventMock,
    getContactLeadReport: getContactLeadReportMock,
  };
});

vi.mock("./_core/notification", () => ({
  notifyOwner: notifyOwnerMock,
}));

vi.mock("./_core/highlevel", async () => {
  const actual = await vi.importActual<typeof import("./_core/highlevel")>("./_core/highlevel");
  return {
    ...actual,
    createUrgentInquiryTask: createUrgentInquiryTaskMock,
  };
});

const { appRouter } = await import("./routers");

describe("contact router", () => {
  it("saves a public contact lead with lowercase email, source attribution, owner notification, and no urgent task for non-urgent inquiries", async () => {
    createContactLeadMock.mockResolvedValueOnce({ id: 12 });
    notifyOwnerMock.mockResolvedValueOnce(true);

    const ctx = {
      user: null,
      isAdmin: false,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submitLead({
      fullName: "Kishor Patel",
      email: "Kishor@Example.com",
      phone: "217-555-0100",
      organization: "Savoy Therapy",
      interest: "Community partnership",
      message: "We would like to discuss adding therapy services.",
      sourcePage: "services",
    });

    expect(createContactLeadMock).toHaveBeenCalledWith({
      fullName: "Kishor Patel",
      email: "kishor@example.com",
      phone: "217-555-0100",
      organization: "Savoy Therapy",
      interest: "Community partnership",
      message: "We would like to discuss adding therapy services.",
      sourcePage: "services",
    });
    expect(notifyOwnerMock).toHaveBeenCalledWith({
      title: "New Savoy Therapy contact inquiry from Kishor Patel",
      content: [
        "A new contact form inquiry was submitted on Savoy Therapy.",
        "Name: Kishor Patel",
        "Email: kishor@example.com",
        "Phone: 217-555-0100",
        "Organization: Savoy Therapy",
        "Interest: Community partnership",
        "Source page: services",
        "Message: We would like to discuss adding therapy services.",
      ].join("\n"),
    });
    expect(createUrgentInquiryTaskMock).not.toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      leadId: 12,
      ownerNotified: true,
      urgent: false,
      urgentTaskCreated: false,
    });
  });

  it("creates a HighLevel task for urgent inquiries", async () => {
    createContactLeadMock.mockResolvedValueOnce({ id: 16 });
    notifyOwnerMock.mockResolvedValueOnce(true);
    createUrgentInquiryTaskMock.mockResolvedValueOnce({
      contactId: "contact-123",
      taskId: "task-789",
    });

    const ctx = {
      user: null,
      isAdmin: false,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submitLead({
      fullName: "Carla Wheeler",
      email: "Carla@Example.com",
      phone: "217-355-1990",
      organization: "Autumn Fields",
      interest: "Urgent therapy support",
      message: "Please call us back ASAP today about resident care coverage.",
      sourcePage: "contact",
    });

    expect(createUrgentInquiryTaskMock).toHaveBeenCalledWith({
      fullName: "Carla Wheeler",
      email: "carla@example.com",
      phone: "217-355-1990",
      organization: "Autumn Fields",
      interest: "Urgent therapy support",
      message: "Please call us back ASAP today about resident care coverage.",
      sourcePage: "contact",
    });
    expect(result).toEqual({
      success: true,
      leadId: 16,
      ownerNotified: true,
      urgent: true,
      urgentTaskCreated: true,
    });
  });

  it("records a public mobile shortcut event with source attribution", async () => {
    createMobileShortcutEventMock.mockResolvedValueOnce({ id: 21 });

    const ctx = {
      user: null,
      isAdmin: false,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);
    const result = await caller.contact.recordMobileShortcut({
      shortcutAction: "call",
      sourcePage: "home",
    });

    expect(createMobileShortcutEventMock).toHaveBeenCalledWith({
      shortcutAction: "call",
      sourcePage: "home",
    });
    expect(result).toEqual({
      success: true,
      eventId: 21,
    });
  });

  it("returns the lightweight contact conversion report for an authenticated user", async () => {
    const report = {
      totals: {
        allTime: 8,
        last7Days: 3,
        last30Days: 6,
      },
      shortcutTotals: {
        allTime: 11,
        last7Days: 4,
        last30Days: 9,
        call: 6,
        inquiry: 5,
      },
      recentLeads: [
        {
          id: 8,
          fullName: "Morgan Lee",
          email: "morgan@example.com",
          phone: null,
          organization: "Autumn Fields",
          interest: "Family therapy support",
          sourcePage: "home",
          createdAt: new Date("2026-04-27T12:00:00.000Z"),
        },
      ],
      recentShortcutEvents: [
        {
          id: 11,
          shortcutAction: "call",
          sourcePage: "home",
          createdAt: new Date("2026-04-28T10:00:00.000Z"),
        },
      ],
      shortcutSourceBreakdown: [
        {
          sourcePage: "home",
          total: 7,
          call: 4,
          inquiry: 3,
        },
      ],
    };

    getContactLeadReportMock.mockResolvedValueOnce(report);

    const ctx = {
      user: null,
      isAdmin: true,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);
    const result = await caller.contact.report();

    expect(getContactLeadReportMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(report);
  });

  it("refuses the contact report when the caller is not an admin", async () => {
    getContactLeadReportMock.mockClear();

    const ctx = {
      user: null,
      isAdmin: false,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);

    await expect(caller.contact.report()).rejects.toThrow("UNAUTHORIZED");
    expect(getContactLeadReportMock).not.toHaveBeenCalled();
  });
});
