import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { AppShell, createQueryClient, createTrpcClient } from "../../client/src/appShell";

export function renderApp(url: string) {
  const requestUrl = new URL(url, "https://www.savoytherapy.com");
  const search = requestUrl.search.startsWith("?") ? requestUrl.search.slice(1) : requestUrl.search;

  const useStaticLocation = () => [requestUrl.pathname, (() => null) as (path: string, ...args: any[]) => any] as [string, (path: string, ...args: any[]) => any];
  const useStaticSearch = () => search;

  const appHtml = renderToString(
    <Router hook={useStaticLocation} searchHook={useStaticSearch} ssrSearch={search}>
      <AppShell queryClient={createQueryClient()} trpcClient={createTrpcClient()} />
    </Router>
  );

  return { appHtml };
}
