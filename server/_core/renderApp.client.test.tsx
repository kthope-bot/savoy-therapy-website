import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { renderApp } from "./renderApp";

describe("renderApp", () => {
  it("renders homepage content into HTML before JavaScript runs", () => {
    const { appHtml } = renderApp("/");

    expect(appHtml).toContain("Savoy Therapy partners with senior living communities");
    expect(appHtml).toContain("href=\"/services\"");
    expect(appHtml).toContain("href=\"/resources\"");
    expect(appHtml).not.toBe("<div></div>");
  });

  it("renders a published blog post route with readable article content", () => {
    const { appHtml } = renderApp("/blog/five-things-i-notice-in-the-first-five-minutes");

    expect(appHtml).toContain("5 things I notice in the first 5 minutes with a new patient");
    expect(appHtml).toContain("What families can do:");
  });

  it("keeps the shared HTML template ready for root-content injection", () => {
    const template = fs.readFileSync(path.resolve(import.meta.dirname, "../../client/index.html"), "utf-8");

    expect(template).toContain('<div id="root"></div>');
  });
});
