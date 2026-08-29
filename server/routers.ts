import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { createUrgentInquiryTask, isUrgentInquiry } from "./_core/highlevel";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createContactLead,
  createMobileShortcutEvent,
  createResourceGuideLead,
  createStimPodLead,
  getContactLeadReport,
} from "./db";

const stimPodLeadSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(32).optional(),
  city: z.string().trim().max(64).optional(),
  goals: z.string().trim().max(1200).optional(),
});

const resourceGuideLeadSchema = z.object({
  firstName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  guideSlug: z.string().trim().min(2).max(160),
  guideTitle: z.string().trim().min(2).max(255),
});

const contactLeadSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(32).optional(),
  organization: z.string().trim().max(160).optional(),
  interest: z.string().trim().min(2).max(160),
  message: z.string().trim().max(2000).optional(),
  sourcePage: z.string().trim().min(1).max(128).optional(),
});

const mobileShortcutEventSchema = z.object({
  shortcutAction: z.enum(["call", "inquiry"]),
  sourcePage: z.string().trim().min(1).max(128).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  stimPod: router({
    submitLead: publicProcedure.input(stimPodLeadSchema).mutation(async ({ input }) => {
      const lead = await createStimPodLead({
        fullName: input.fullName,
        email: input.email.toLowerCase(),
        phone: input.phone || null,
        city: input.city || null,
        goals: input.goals || null,
        sourcePage: "stimpod",
      });

      return {
        success: true,
        leadId: lead?.id ?? null,
      } as const;
    }),
  }),
  resources: router({
    submitLead: publicProcedure.input(resourceGuideLeadSchema).mutation(async ({ input }) => {
      const lead = await createResourceGuideLead({
        firstName: input.firstName,
        email: input.email.toLowerCase(),
        guideSlug: input.guideSlug,
        guideTitle: input.guideTitle,
        sourcePage: "resources",
      });

      return {
        success: true,
        leadId: lead?.id ?? null,
      } as const;
    }),
  }),
  contact: router({
    submitLead: publicProcedure.input(contactLeadSchema).mutation(async ({ input }) => {
      const normalizedEmail = input.email.toLowerCase();
      const normalizedSourcePage = input.sourcePage || "site";
      const normalizedLead = {
        fullName: input.fullName,
        email: normalizedEmail,
        phone: input.phone || null,
        organization: input.organization || null,
        interest: input.interest,
        message: input.message || null,
        sourcePage: normalizedSourcePage,
      };

      const lead = await createContactLead(normalizedLead);

      const ownerNotified = await notifyOwner({
        title: `New Savoy Therapy contact inquiry from ${input.fullName}`,
        content: [
          `A new contact form inquiry was submitted on Savoy Therapy.`,
          `Name: ${input.fullName}`,
          `Email: ${normalizedEmail}`,
          `Phone: ${input.phone || "Not provided"}`,
          `Organization: ${input.organization || "Not provided"}`,
          `Interest: ${input.interest}`,
          `Source page: ${normalizedSourcePage}`,
          `Message: ${input.message || "Not provided"}`,
        ].join("\n"),
      });

      const urgent = isUrgentInquiry({
        interest: input.interest,
        message: input.message || null,
      });

      let urgentTaskCreated = false;

      if (urgent) {
        try {
          await createUrgentInquiryTask(normalizedLead);
          urgentTaskCreated = true;
        } catch (error) {
          console.error("[HighLevel urgent inquiry task error]", error);
        }
      }

      return {
        success: true,
        leadId: lead?.id ?? null,
        ownerNotified,
        urgent,
        urgentTaskCreated,
      } as const;
    }),
    recordMobileShortcut: publicProcedure.input(mobileShortcutEventSchema).mutation(async ({ input }) => {
      const event = await createMobileShortcutEvent({
        shortcutAction: input.shortcutAction,
        sourcePage: input.sourcePage || "site",
      });

      return {
        success: true,
        eventId: event?.id ?? null,
      } as const;
    }),
    report: protectedProcedure.query(async () => {
      const report = await getContactLeadReport();

      return report;
    }),
  }),
});

export type AppRouter = typeof appRouter;
