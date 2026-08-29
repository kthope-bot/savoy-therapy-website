import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { renderApp } from "./renderApp";

function injectRenderedApp(template: string, url: string) {
  const { appHtml } = renderApp(url);
  return template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      const template = await fs.promises.readFile(clientTemplate, "utf-8");
      const page = await vite.transformIndexHtml(url, injectRenderedApp(template, url));
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
  }

  app.use(express.static(distPath));

  app.use("*", (req: Request, res: Response) => {
    const normalizedPath = req.path.replace(/^\/+/, "");
    const routeHtmlPath = normalizedPath
      ? path.resolve(distPath, normalizedPath, "index.html")
      : path.resolve(distPath, "index.html");

    if (fs.existsSync(routeHtmlPath)) {
      res.sendFile(routeHtmlPath);
      return;
    }

    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
