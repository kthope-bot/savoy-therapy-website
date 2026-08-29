import type { Request } from "express";
import type { CookieOptions } from "express";
import { ONE_YEAR_MS } from "../../shared/const";

/**
 * Session cookie options. Secure is enabled whenever the request arrives over
 * HTTPS, which is always true behind Railway's proxy in production.
 */
export function getSessionCookieOptions(req: Request): CookieOptions {
  const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";

  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isSecure,
    path: "/",
    maxAge: ONE_YEAR_MS,
  };
}
