// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./Home";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("Home page", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    document.head.innerHTML = '<meta name="description" content="Initial description" />';
    document.title = "Savoy Therapy";
    document.body.innerHTML = "";
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  it("renders the redesign brief flow with the quiz under the hero and updated CTA copy", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Your loved one deserves a therapist who truly shows up.");
    expect(markup).toContain("pb-14 pt-6 sm:pb-24 sm:pt-16");
    expect(markup).toContain("THERAPY IN SENIOR LIVING COMMUNITIES");
    expect(markup).toContain(
      "Not just on the schedule — but present, attentive, and invested in what matters to them.",
    );
    expect(markup).toContain("Take The Quiz");
    expect(markup).toContain("Start a conversation");
    expect(markup).toContain("Call 217-898-8393");
    expect(markup.indexOf("Find the right support for your loved one.")).toBeGreaterThan(
      markup.indexOf("Take The Quiz"),
    );
    expect(markup.indexOf("Where Savoy Therapy serves")).toBeGreaterThan(
      markup.indexOf("Find the right support for your loved one."),
    );
    expect(markup.indexOf("The kind of feedback families and senior living community leaders remember.")).toBeGreaterThan(
      markup.indexOf("Where Savoy Therapy serves"),
    );
    expect(markup.indexOf("Why communities switch to Savoy Therapy")).toBeGreaterThan(
      markup.indexOf("The kind of feedback families and senior living community leaders remember."),
    );
    expect(markup.indexOf("Quick questions families and communities ask")).toBeGreaterThan(
      markup.indexOf("Why communities switch to Savoy Therapy"),
    );
    expect(markup.indexOf("Partner with Savoy Therapy")).toBeGreaterThan(
      markup.indexOf("Quick questions families and communities ask"),
    );
    expect(markup).toContain("What’s your main concern for your loved one right now?");
    expect(markup).toContain("Mobility or getting around safely");
    expect(markup).toContain("Walking, balance, strength, getting up from chairs");
    expect(markup).toContain("physical therapy, occupational therapy, speech therapy, fall prevention");
    expect(markup).not.toContain("Choose the best fit");
    expect(markup).toContain("Start a Conversation");
    expect(markup).toContain("Partner with Savoy Therapy");
    expect(markup).toContain(
      "Explore what a therapy partnership looks like — and how Savoy Therapy can bring coordinated, dependable care directly into your community.",
    );
    expect(markup).toContain("bg-[#4157A2] px-5 text-white transition hover:bg-[#374a8a]");
    expect(markup).toContain("Trusted by communities");
    expect(markup).toContain("text-[#4157A2]");
    expect(markup).toContain("The kind of feedback families and senior living community leaders remember.");
    expect(markup).toContain("border border-[#4157A2]/10 bg-[#E8EEF9]/88");
    expect(markup).toContain("Why communities switch to Savoy Therapy");
    expect(markup).toContain("Communities don&#x27;t leave therapy partners over one bad day. They leave after months of excuses.");
    expect(markup).toContain("The therapist who never shows up consistently");
    expect(markup).toContain("A rotating cast of unfamiliar faces. Residents who wait weeks to start therapy. Staff who can&#x27;t get a straight answer about scheduling. Leadership left guessing whether therapy is actually happening.");
    expect(markup).toContain("One number. One person accountable");
    expect(markup).toContain("When something&#x27;s off, you don&#x27;t get a call center — you get me. Savoy runs on clinician consistency, reliable scheduling, and direct communication with community leadership. No runaround. No excuses.");
    expect(markup).toContain("Therapy that runs like it&#x27;s supposed to");
    expect(markup).toContain("Residents start on time. Families get updates. Your staff isn&#x27;t chasing us down. And when something needs attention, it gets handled — not delegated into a void.");
    expect(markup).toContain("Staffing gaps. Delayed starts. Unanswered calls. By the time a community starts looking, trust is already gone. Here&#x27;s what that looks like — and what we do differently.");
    expect(markup).not.toContain("This section makes the transition logic clearer for senior living community leaders and families by showing what communities often want to leave behind and what they hope to gain with a stronger partner.");
    expect(markup).toContain("Quick questions families and communities ask");
    expect(markup).toContain("How quickly can Savoy Therapy become a dependable partner for a community?");
    expect(markup).toContain("What if a family is unsure whether therapy is the right next step?");
    expect(markup).toContain("Why would a community switch providers if they already have therapy coverage?");
    expect(markup).toContain("Carla Wheeler");
    expect(markup).toContain("Executive Director, Autumn Fields");
    expect(markup).toContain("compared to our previous provider");
    expect(markup).not.toContain("Explore Savoy Therapy");
    expect(markup).not.toContain("Visit page");
  });

  it("reveals FAQ call-to-action links when relevant answers are expanded", async () => {
    await act(async () => {
      root.render(<Home />);
    });

    const partnershipTrigger = Array.from(container.querySelectorAll("button")).find(button =>
      button.textContent?.includes("How quickly can Savoy Therapy become a dependable partner for a community?"),
    );
    const familyTrigger = Array.from(container.querySelectorAll("button")).find(button =>
      button.textContent?.includes("What if a family is unsure whether therapy is the right next step?"),
    );

    expect(partnershipTrigger).toBeTruthy();
    expect(familyTrigger).toBeTruthy();

    await act(async () => {
      partnershipTrigger?.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain(
      "Most communities are up and running within 2 to 4 weeks. The process starts with a direct conversation with me — we talk through your current gaps, your residents' needs, and what consistent coverage actually looks like for your building. No long sales process. No handoff to someone you've never met.",
    );
    expect(container.textContent).toContain("Start a partnership conversation");

    await act(async () => {
      familyTrigger?.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain(
      "We offer a complimentary assessment to identify your loved one's needs, risks, and the best path forward. No pressure, no guesswork — just a clear picture of what therapy can do and an honest recommendation for your family.",
    );
    expect(container.textContent).toContain("Request a complimentary assessment");
  });

  it("sets a longer homepage title and updated meta tags for SEO", async () => {
    await act(async () => {
      root.render(<Home />);
    });

    expect(document.title).toBe("Savoy Therapy | Senior Living Therapy Partner");
    expect(document.title.length).toBeGreaterThanOrEqual(30);
    expect(document.title.length).toBeLessThanOrEqual(60);

    const description = document.querySelector('meta[name="description"]');
    const keywords = document.querySelector('meta[name="keywords"]');

    expect(description?.getAttribute("content")).toBe(
      "Savoy Therapy provides physical, occupational, and speech therapy for senior living communities across Central Illinois.",
    );
    expect(description?.getAttribute("content")?.length).toBeGreaterThanOrEqual(50);
    expect(description?.getAttribute("content")?.length).toBeLessThanOrEqual(160);
    expect(keywords?.getAttribute("content")).toContain("physical therapy");
    expect(keywords?.getAttribute("content")).toContain("occupational therapy");
    expect(keywords?.getAttribute("content")).toContain("speech therapy");
  });
});
