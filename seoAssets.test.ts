import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const indexHtml = fs.readFileSync(path.join(projectRoot, "client", "index.html"), "utf8");
const robotsTxt = fs.readFileSync(path.join(projectRoot, "client", "public", "robots.txt"), "utf8");
const sitemapXml = fs.readFileSync(path.join(projectRoot, "client", "public", "sitemap.xml"), "utf8");

describe("SEO assets", () => {
  it("tracks both production domains in analytics", () => {
    expect(indexHtml).toContain('data-domains="savoytherapy.com,www.savoytherapy.com"');
  });

  it("publishes robots.txt and sitemap.xml for the canonical www domain", () => {
    expect(robotsTxt).toContain("Sitemap: https://www.savoytherapy.com/sitemap.xml");
    expect(sitemapXml).toContain("https://www.savoytherapy.com/");
    expect(sitemapXml).toContain("https://www.savoytherapy.com/resources");
    expect(sitemapXml).toContain("https://www.savoytherapy.com/contact-report");
  });
});
