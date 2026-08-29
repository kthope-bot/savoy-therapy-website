import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Google Analytics measurement ID", () => {
  it("uses a valid GA4 measurement ID", () => {
    const measurementId = process.env.VITE_GA_MEASUREMENT_ID;

    expect(measurementId).toBeTruthy();
    expect(measurementId).toMatch(/^G-[A-Z0-9]+$/);
  });

  it("injects the active GA snippet into the built homepage HTML", () => {
    const measurementId = process.env.VITE_GA_MEASUREMENT_ID;
    const htmlPath = path.resolve(import.meta.dirname, "..", "dist", "public", "index.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    expect(measurementId).toBeTruthy();
    expect(html).toContain(
      `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
    );
    expect(html).toContain('window.dataLayer = window.dataLayer || [];');
    expect(html).toContain(`gtag("config", "${measurementId}");`);
  });
});
