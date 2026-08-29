import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hydration config safeguards", () => {
  it("does not enable the JSX location plugin that injects data-loc attributes into client markup", () => {
    const configPath = path.resolve(import.meta.dirname, "../vite.config.ts");
    const config = readFileSync(configPath, "utf8");

    expect(config).not.toContain("@builder.io/vite-plugin-jsx-loc");
    expect(config).not.toContain("jsxLocPlugin(");
  });
});
