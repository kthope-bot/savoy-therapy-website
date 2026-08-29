import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

const PAGES_DIR = path.resolve(import.meta.dirname);
const BALANCE_IQ_FILE = path.join(PAGES_DIR, "BalanceIQPage.tsx");
const EMBED_SIGNATURES = ["leadconnectorhq.com/widget/form", "link.msgsndr.com/js/form_embed.js"];

describe("embedded lead flow audit", () => {
  it("keeps BalanceIQ as the only HighLevel embedded lead flow in the current site pages", () => {
    const balanceIqSource = fs.readFileSync(BALANCE_IQ_FILE, "utf-8");

    expect(balanceIqSource).toContain("leadconnectorhq.com/widget/form");
    expect(balanceIqSource).toContain("link.msgsndr.com/js/form_embed.js");

    const otherPageFiles = fs
      .readdirSync(PAGES_DIR)
      .filter((file) => file.endsWith("Page.tsx"))
      .filter((file) => file !== "BalanceIQPage.tsx")
      .map((file) => path.join(PAGES_DIR, file));

    for (const file of otherPageFiles) {
      const source = fs.readFileSync(file, "utf-8");

      for (const signature of EMBED_SIGNATURES) {
        expect(source, `${path.basename(file)} unexpectedly contains ${signature}`).not.toContain(signature);
      }
    }
  });
});
