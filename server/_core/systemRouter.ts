import { publicProcedure, router } from "./trpc";

/**
 * Health and readiness endpoints. Railway uses these for deploy health checks.
 */
export const systemRouter = router({
  health: publicProcedure.query(() => ({
    status: "ok" as const,
    timestamp: new Date().toISOString(),
  })),
});
