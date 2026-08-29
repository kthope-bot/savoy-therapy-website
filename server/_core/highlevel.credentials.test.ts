import { describe, expect, it } from "vitest";

const runLiveCredentialTest = process.env.RUN_LIVE_HIGHLEVEL_CREDENTIAL_TEST === "true";

const maybeIt = runLiveCredentialTest ? it : it.skip;

describe("HighLevel credentials", () => {
  maybeIt("authenticates against the location permissions endpoint when explicitly enabled", async () => {
    const token = process.env.HIGHLEVEL_API_TOKEN;
    const locationId = process.env.HIGHLEVEL_LOCATION_ID;

    expect(token).toBeTruthy();
    expect(locationId).toBeTruthy();

    const response = await fetch(
      `https://services.leadconnectorhq.com/locations/${locationId}/permissions`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          Version: "2023-02-21",
        },
      },
    );

    const payload = await response.json().catch(() => ({}));

    expect(response.ok, JSON.stringify(payload)).toBe(true);
    expect(typeof payload).toBe("object");
    expect(payload).not.toBeNull();
  }, 20_000);
});
