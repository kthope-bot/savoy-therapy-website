import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { getCanonicalRedirectUrl } from "./domainRedirect";
import { getLegacyRedirectPath } from "./legacyRedirects";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const isProduction = process.env.NODE_ENV === "production";

  // Railway terminates TLS at its proxy; trust it so req.secure is accurate.
  app.set("trust proxy", 1);

  app.use(express.json());

  // Canonical host redirect (apex -> www, http -> https)
  app.use((req, res, next) => {
    const target = getCanonicalRedirectUrl(req.headers.host, req.originalUrl, req.protocol);
    if (target) return res.redirect(301, target);
    next();
  });

  // Preserve inbound links from the pre-2026 site structure
  app.use((req, res, next) => {
    const target = getLegacyRedirectPath(req.path);
    if (target && target !== req.path) return res.redirect(301, target);
    next();
  });

  app.use(
    "/api/trpc",
    createExpressMiddleware({ router: appRouter, createContext })
  );

  if (isProduction) {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
  }

  const port = Number(process.env.PORT) || 3000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
