import React from "react";
import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from "@shared/const";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import superjson from "superjson";
import type { ReactNode } from "react";
import App from "./App";
import { getLoginUrl } from "./const";

function redirectToLoginIfUnauthorized(error: unknown) {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
}

export function createQueryClient() {
  const queryClient = new QueryClient();

  if (typeof window !== "undefined") {
    queryClient.getQueryCache().subscribe((event) => {
      if (event.type === "updated" && event.action.type === "error") {
        const error = event.query.state.error;
        redirectToLoginIfUnauthorized(error);
        console.error("[API Query Error]", error);
      }
    });

    queryClient.getMutationCache().subscribe((event) => {
      if (event.type === "updated" && event.action.type === "error") {
        const error = event.mutation.state.error;
        redirectToLoginIfUnauthorized(error);
        console.error("[API Mutation Error]", error);
      }
    });
  }

  return queryClient;
}

export function createTrpcClient() {
  const url = typeof window === "undefined" ? "http://127.0.0.1/api/trpc" : "/api/trpc";

  return trpc.createClient({
    links: [
      httpBatchLink({
        url,
        transformer: superjson,
        fetch(input, init) {
          return globalThis.fetch(input, {
            ...(init ?? {}),
            credentials: "include",
          });
        },
      }),
    ],
  });
}

type AppShellProps = {
  queryClient: QueryClient;
  trpcClient: ReturnType<typeof createTrpcClient>;
  children?: ReactNode;
};

export function AppShell({ queryClient, trpcClient, children }: AppShellProps) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children ?? <App />}</QueryClientProvider>
    </trpc.Provider>
  );
}
