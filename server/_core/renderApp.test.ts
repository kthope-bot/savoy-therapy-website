import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { renderApp } from "./renderApp";

describe("renderApp", () => {
  it("renders homepage content into HTML before JavaScript runs", () => {
    const { appHtml } = renderApp("/");

    expect(appHtml).toContain("Your loved one deserves a therapist who truly shows up.");
    expect(appHtml).toContain('href="/services"');
    expect(appHtml).toContain('href="/resources"');
    expect(appHtml).not.toBe("<div></div>");
  });

  it("renders key marketing routes into readable HTML before JavaScript runs", () => {
    const servicesHtml = renderApp("/services").appHtml;
    const resourcesHtml = renderApp("/resources").appHtml;

    expect(servicesHtml).toContain("The right therapy. Right where residents live.");
    expect(servicesHtml).toContain("Start a conversation");
    expect(resourcesHtml).toContain("Free guides, practical tips, and real answers.");
    expect(resourcesHtml).toContain("Enter your name and email to download any guide instantly.");
  });

  it("renders a published blog post route with readable article content", () => {
    const { appHtml } = renderApp("/blog/five-things-i-notice-in-the-first-five-minutes");

    expect(appHtml).toContain("5 things I notice in the first 5 minutes with a new patient");
    expect(appHtml).toContain("What families can do:");
  });

  it("keeps the client template ready for Vite to inject the application mount", () => {
    const template = fs.readFileSync(path.resolve(import.meta.dirname, "../../client/index.html"), "utf-8");

    expect(template).toContain('<div id="root"></div>');
  });

  it("keeps the built production homepage, services page, and resources page compatible with styled prerender output", () => {
    const builtHome = fs.readFileSync(path.resolve(import.meta.dirname, "../../dist/public/index.html"), "utf-8");
    const builtServices = fs.readFileSync(path.resolve(import.meta.dirname, "../../dist/public/services/index.html"), "utf-8");
    const builtResources = fs.readFileSync(path.resolve(import.meta.dirname, "../../dist/public/resources/index.html"), "utf-8");

    expect(builtHome).toContain('rel="stylesheet"');
    expect(builtHome).toContain("Your loved one deserves a therapist who truly shows up.");

    expect(builtServices).toContain('rel="stylesheet"');
    expect(builtServices).toContain("The right therapy. Right where residents live.");

    expect(builtResources).toContain('rel="stylesheet"');
    expect(builtResources).toContain("Free guides, practical tips, and real answers.");
  });
});
