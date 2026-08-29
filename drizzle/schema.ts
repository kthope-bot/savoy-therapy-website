import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const stimPodLeads = mysqlTable("stimPodLeads", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  city: varchar("city", { length: 64 }),
  goals: text("goals"),
  sourcePage: varchar("sourcePage", { length: 128 }).notNull().default("stimpod"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const resourceGuideLeads = mysqlTable("resourceGuideLeads", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 120 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  guideSlug: varchar("guideSlug", { length: 160 }).notNull(),
  guideTitle: varchar("guideTitle", { length: 255 }).notNull(),
  sourcePage: varchar("sourcePage", { length: 128 }).notNull().default("resources"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const contactLeads = mysqlTable("contactLeads", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  organization: varchar("organization", { length: 160 }),
  interest: varchar("interest", { length: 160 }).notNull(),
  message: text("message"),
  sourcePage: varchar("sourcePage", { length: 128 }).notNull().default("site"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const mobileShortcutEvents = mysqlTable("mobileShortcutEvents", {
  id: int("id").autoincrement().primaryKey(),
  shortcutAction: varchar("shortcutAction", { length: 32 }).notNull(),
  sourcePage: varchar("sourcePage", { length: 128 }).notNull().default("site"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type StimPodLead = typeof stimPodLeads.$inferSelect;
export type InsertStimPodLead = typeof stimPodLeads.$inferInsert;
export type ResourceGuideLead = typeof resourceGuideLeads.$inferSelect;
export type InsertResourceGuideLead = typeof resourceGuideLeads.$inferInsert;
export type ContactLead = typeof contactLeads.$inferSelect;
export type InsertContactLead = typeof contactLeads.$inferInsert;
export type MobileShortcutEvent = typeof mobileShortcutEvents.$inferSelect;
export type InsertMobileShortcutEvent = typeof mobileShortcutEvents.$inferInsert;
