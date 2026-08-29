import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("client/index.html", () => {
  it("places the environment-driven GA4 snippet first inside the head", () => {
    const htmlPath = path.resolve(import.meta.dirname, "..", "index.html");
    const html = readFileSync(htmlPath, "utf8");

    expect(html).toContain(
      '<script async src="https://www.googletagmanager.com/gtag/js?id=%VITE_GA_MEASUREMENT_ID%"></script>',
    );
    expect(html).toContain('gtag("config", "%VITE_GA_MEASUREMENT_ID%");');
    expect(html).toMatch(
      /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=%VITE_GA_MEASUREMENT_ID%"><\/script>\s*<script>/,
    );
  });
});
