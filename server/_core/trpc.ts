import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { UNAUTHED_ERR_MSG } from "../../shared/const";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Guards admin-only procedures. Used by contact.report, which backs the
 * /contact-report page.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({ ctx });
});
