import { count, desc, eq, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  contactLeads,
  mobileShortcutEvents,
  type InsertContactLead,
  type InsertMobileShortcutEvent,
  type InsertResourceGuideLead,
  type InsertStimPodLead,
  type InsertUser,
  resourceGuideLeads,
  stimPodLeads,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function createStimPodLead(lead: InsertStimPodLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for StimPod lead capture");
  }

  const values: InsertStimPodLead = {
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone ?? null,
    city: lead.city ?? null,
    goals: lead.goals ?? null,
    sourcePage: lead.sourcePage ?? "stimpod",
  };

  await db.insert(stimPodLeads).values(values);

  const saved = await db
    .select()
    .from(stimPodLeads)
    .where(sql`${stimPodLeads.email} = ${lead.email}`)
    .orderBy(desc(stimPodLeads.id))
    .limit(1);

  return saved[0];
}

export async function createResourceGuideLead(lead: InsertResourceGuideLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for Resources guide lead capture");
  }

  const values: InsertResourceGuideLead = {
    firstName: lead.firstName,
    email: lead.email,
    guideSlug: lead.guideSlug,
    guideTitle: lead.guideTitle,
    sourcePage: lead.sourcePage ?? "resources",
  };

  await db.insert(resourceGuideLeads).values(values);

  const saved = await db
    .select()
    .from(resourceGuideLeads)
    .where(sql`${resourceGuideLeads.email} = ${lead.email}`)
    .orderBy(desc(resourceGuideLeads.id))
    .limit(1);

  return saved[0];
}

export async function createContactLead(lead: InsertContactLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for contact lead capture");
  }

  const values: InsertContactLead = {
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone ?? null,
    organization: lead.organization ?? null,
    interest: lead.interest,
    message: lead.message ?? null,
    sourcePage: lead.sourcePage ?? "site",
  };

  await db.insert(contactLeads).values(values);

  const saved = await db
    .select()
    .from(contactLeads)
    .where(sql`${contactLeads.email} = ${lead.email}`)
    .orderBy(desc(contactLeads.id))
    .limit(1);

  return saved[0];
}

export async function createMobileShortcutEvent(event: InsertMobileShortcutEvent) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for mobile shortcut tracking");
  }

  const values: InsertMobileShortcutEvent = {
    shortcutAction: event.shortcutAction,
    sourcePage: event.sourcePage ?? "site",
  };

  await db.insert(mobileShortcutEvents).values(values);

  const saved = await db
    .select()
    .from(mobileShortcutEvents)
    .where(sql`${mobileShortcutEvents.shortcutAction} = ${event.shortcutAction}`)
    .orderBy(desc(mobileShortcutEvents.id))
    .limit(1);

  return saved[0];
}

export async function getContactLeadReport() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for contact reporting");
  }

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalRow] = await db.select({ value: count() }).from(contactLeads);
  const [sevenDayRow] = await db
    .select({ value: count() })
    .from(contactLeads)
    .where(gte(contactLeads.createdAt, sevenDaysAgo));
  const [thirtyDayRow] = await db
    .select({ value: count() })
    .from(contactLeads)
    .where(gte(contactLeads.createdAt, thirtyDaysAgo));
  const [shortcutTotalRow] = await db.select({ value: count() }).from(mobileShortcutEvents);
  const [shortcutSevenDayRow] = await db
    .select({ value: count() })
    .from(mobileShortcutEvents)
    .where(gte(mobileShortcutEvents.createdAt, sevenDaysAgo));
  const [shortcutThirtyDayRow] = await db
    .select({ value: count() })
    .from(mobileShortcutEvents)
    .where(gte(mobileShortcutEvents.createdAt, thirtyDaysAgo));

  const recentLeads = await db
    .select({
      id: contactLeads.id,
      fullName: contactLeads.fullName,
      email: contactLeads.email,
      phone: contactLeads.phone,
      organization: contactLeads.organization,
      interest: contactLeads.interest,
      sourcePage: contactLeads.sourcePage,
      createdAt: contactLeads.createdAt,
    })
    .from(contactLeads)
    .orderBy(desc(contactLeads.id))
    .limit(10);

  const [callShortcutRow] = await db
    .select({ value: count() })
    .from(mobileShortcutEvents)
    .where(eq(mobileShortcutEvents.shortcutAction, "call"));
  const [inquiryShortcutRow] = await db
    .select({ value: count() })
    .from(mobileShortcutEvents)
    .where(eq(mobileShortcutEvents.shortcutAction, "inquiry"));

  const shortcutSourceRows = await db
    .select({
      sourcePage: mobileShortcutEvents.sourcePage,
      shortcutAction: mobileShortcutEvents.shortcutAction,
      value: count(),
    })
    .from(mobileShortcutEvents)
    .groupBy(mobileShortcutEvents.sourcePage, mobileShortcutEvents.shortcutAction);

  const shortcutSourceBreakdown = Array.from(
    shortcutSourceRows.reduce((map, row) => {
      const current = map.get(row.sourcePage) ?? {
        sourcePage: row.sourcePage,
        total: 0,
        call: 0,
        inquiry: 0,
      };
      const value = Number(row.value ?? 0);

      current.total += value;
      if (row.shortcutAction === "call") {
        current.call += value;
      }
      if (row.shortcutAction === "inquiry") {
        current.inquiry += value;
      }

      map.set(row.sourcePage, current);
      return map;
    }, new Map<string, { sourcePage: string; total: number; call: number; inquiry: number }>()),
  ).map(([, value]) => value)
    .sort((left, right) => right.total - left.total || left.sourcePage.localeCompare(right.sourcePage));

  const recentShortcutEvents = await db
    .select({
      id: mobileShortcutEvents.id,
      shortcutAction: mobileShortcutEvents.shortcutAction,
      sourcePage: mobileShortcutEvents.sourcePage,
      createdAt: mobileShortcutEvents.createdAt,
    })
    .from(mobileShortcutEvents)
    .orderBy(desc(mobileShortcutEvents.id))
    .limit(12);

  return {
    totals: {
      allTime: Number(totalRow?.value ?? 0),
      last7Days: Number(sevenDayRow?.value ?? 0),
      last30Days: Number(thirtyDayRow?.value ?? 0),
    },
    shortcutTotals: {
      allTime: Number(shortcutTotalRow?.value ?? 0),
      last7Days: Number(shortcutSevenDayRow?.value ?? 0),
      last30Days: Number(shortcutThirtyDayRow?.value ?? 0),
      call: Number(callShortcutRow?.value ?? 0),
      inquiry: Number(inquiryShortcutRow?.value ?? 0),
    },
    recentLeads,
    recentShortcutEvents,
    shortcutSourceBreakdown,
  };
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(sql`${users.openId} = ${openId}`).limit(1);

  return result.length > 0 ? result[0] : undefined;
}
