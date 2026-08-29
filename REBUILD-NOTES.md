# Savoy Therapy — Website Rebuild Notes

Recovered and reconstructed August 2026, after the Manus project data was lost.

## What happened

The site was built on Manus.ai. When Manus became an independent company, the
project was wiped from the account. The domain (savoytherapy.com) still pointed
at Manus servers, so the live site showed a maintenance page.

The full source code was recovered from a local archive
(`Website__Savoy_Therapy.zip`). That archive was **flat** — every file sat in a
single folder with no directory structure, so nothing would build. This repo is
that archive with the directory tree reconstructed.

## How the tree was reconstructed

Placement was derived from evidence in the code, not guesswork:

- `tsconfig.json` defines `@/*` → `client/src/*` and `@shared/*` → `shared/*`
- `package.json` scripts pin the server entry to `server/_core/index.ts`
- `vite.config.ts` sets `root` to `client/` and `outDir` to `dist/public`
- Every remaining file was placed by tracing its relative imports
  (e.g. `db.ts` imports `../drizzle/schema` and `./_core/env`, which fixes it
  at `server/db.ts`)

## Stack

React 19 + Vite 7 + TypeScript, Wouter for routing, Tailwind 4, shadcn/ui,
Express 4, tRPC 11, Drizzle ORM on MySQL.

## Current status: BUILDS AND PASSES ALL TESTS

Verified on 27 Aug 2026:

- `tsc --noEmit` — 0 errors
- `vite build` — succeeds (663 KB JS, 106 KB CSS)
- prerender — 24 routes generated as static HTML
- `vitest run` — 24 files passed, 46 tests passed, 1 skipped
- production server boots, serves `/` with HTTP 200, and `/api/trpc/system.health`
  returns ok

### What was written to get here

**Tier 1, regenerated (13 files):** shadcn/ui button, card, input, textarea,
skeleton, separator, sonner, tooltip, sheet; plus `lib/utils.ts` (`cn`),
`hooks/useMobile.ts`, `hooks/usePersistFn.ts`, `components/ErrorBoundary.tsx`.

**Tier 2, rewritten (4 files):** `shared/const.ts`, `server/_core/cookies.ts`,
`server/_core/trpc.ts`, `server/_core/systemRouter.ts`.

**Tier 3, Manus dependencies removed:**

- Deleted `oauth.ts` and `storageProxy.ts` (Manus-only, and storageProxy was
  unreferenced)
- Rewrote `context.ts` to drop the Manus auth SDK
- Removed `vite-plugin-manus-runtime`, the Manus debug collector, and the
  `*.manus.computer` allowed hosts from `vite.config.ts`
- Removed the Manus plugin and the missing wouter patch from `package.json`
- Recreated `client/index.html` (GA4 tag and meta tags carried over from the
  prerendered output)

### Three things that were quietly broken and are now fixed

1. **The recovered `server/_core/index.ts` never mounted the API.** It was a
   stripped-down static file server. Rebuilt to mount tRPC at `/api/trpc`, wire
   the redirect helpers as middleware, trust the Railway proxy, and bind
   0.0.0.0.
2. **`notifyOwner` threw when the Manus notification service was
   unconfigured, and the contact form called it uncaught.** Every contact
   submission would have returned a 500 error. It now logs and returns false.
   The lead is already persisted and forwarded to HighLevel by that point.
3. **`/contact-report` had no working guard** once Manus auth was removed.
   `protectedProcedure` now requires `ADMIN_ACCESS_TOKEN`, supplied as an
   `x-admin-token` header or session cookie. It fails closed: if the variable
   is unset, access is denied rather than granted.

### Authentication changed

The Manus OAuth flow is gone. There is no login screen. `/contact-report` is
protected by a shared admin token. The `users` table and `upsertUser` remain in
the schema but are currently unused. Building a real login is a separate task.

## Content is fully intact

`client/src/lib/siteContent.ts` (26KB) holds the copy for the entire site:
all five services, testimonials, community groups, quiz questions, blog posts,
and downloadable resources. `client/src/lib/communityData.ts` holds the
16 communities across 5 regions.

Also recovered: the HighLevel integration (`server/_core/highlevel.ts`), the
prerendering fix for crawlability (`server/_core/prerender.tsx`), legacy URL
redirects, the full test suite, and CI config.

## Known issues carried over from the old build

1. **Brand color mismatch.** The logo's actual blue is `#0201FE` (essentially
   pure blue). The palette recorded in project notes said `#4157A2`. This
   mismatch is the likely cause of the repeated "apply brand colors site-wide"
   failures. Pure blue is also a poor choice for web accessibility and should
   be revisited during relaunch.
2. **No reversed logo.** `Savoy_Therapy_Logo_Enhanced_White.png` is the blue
   logo on an opaque white background, not a transparent white logo. It breaks
   on the dark navy footer and the "For Communities" cards. A true reversed
   version is needed.
3. **`/contact-report` needs a security guard and a `noindex` tag.**
4. **`client/index.html` source template is missing.** The archive contained
   the prerendered build output instead (saved to
   `recovered-artifacts/prerendered-index.html`). It's useful reference — it
   holds the GA4 tag `G-RVWSGNVL2B` and the meta tags — but the source
   template needs recreating.

## Infrastructure

- Domain registrar: Turbify
- DNS currently points at Manus: A records `104.18.26.246` / `104.18.27.246`,
  `www` CNAME to `cname.manus.space`. **These must be repointed at the new
  host before the site can go live.**
- Analytics: GA4, measurement ID `G-RVWSGNVL2B`
- CRM: HighLevel (canonical destination for all website leads)

## Next steps

1. Choose a host (this determines whether the Express server survives as-is)
2. Write the Tier 1 and Tier 2 files
3. Strip the Manus auth layer and dev tooling from `vite.config.ts`
4. Recreate `client/index.html`
5. Run the test suite, then build
6. Repoint DNS
