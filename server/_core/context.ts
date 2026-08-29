import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { COOKIE_NAME } from "../../shared/const";
import { ENV } from "./env";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  isAdmin: boolean;
};

/**
 * The Manus OAuth SDK is gone. Admin access to /contact-report is now granted
 * by a shared secret supplied either as an x-admin-token header or as a
 * session cookie. If ADMIN_ACCESS_TOKEN is unset, admin access is denied
 * outright rather than left open.
 */
function readAdminToken(req: CreateExpressContextOptions["req"]): string | null {
  const header = req.headers["x-admin-token"];
  if (typeof header === "string" && header.length > 0) return header;

  const cookies = (req as { cookies?: Record<string, string> }).cookies;
  const fromCookie = cookies?.[COOKIE_NAME];
  if (typeof fromCookie === "string" && fromCookie.length > 0) return fromCookie;

  return null;
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  const expected = ENV.adminAccessToken;
  const supplied = readAdminToken(opts.req);
  const isAdmin = expected.length > 0 && supplied === expected;

  return {
    req: opts.req,
    res: opts.res,
    user: null,
    isAdmin,
  };
}
