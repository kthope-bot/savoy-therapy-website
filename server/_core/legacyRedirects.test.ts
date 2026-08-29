import { describe, expect, it } from "vitest";
import { getLegacyRedirectPath, normalizePath } from "./legacyRedirects";

describe("legacy redirect map", () => {
  it("maps representative legacy blog, service, contact, and fallback URLs to the requested destinations", () => {
    expect(getLegacyRedirectPath("/staying-active-with-neuropathy-safe-ways-to-enjoy-summer-without-overheating/")).toBe("/blog");
    expect(getLegacyRedirectPath("/services/occupational-therapy/")).toBe("/services");
    expect(getLegacyRedirectPath("/contactus/")).toBe("/#contact");
    expect(getLegacyRedirectPath("/client-testimonials/")).toBe("/testimonials");
    expect(getLegacyRedirectPath("/workshops/")).toBe("/");
  });

  it("normalizes missing trailing slashes, leading slashes, query strings, and hashes", () => {
    expect(normalizePath("library_nl_6876")).toBe("/library_nl_6876");
    expect(getLegacyRedirectPath("/library_nl_6876/")).toBe("/");
    expect(getLegacyRedirectPath("/contact/?utm_source=google")).toBe("/#contact");
    expect(getLegacyRedirectPath("/request-a-call-back#form")).toBe("/#contact");
  });

  it("does not redirect excluded legacy system and bot-probe paths", () => {
    expect(getLegacyRedirectPath("/wp-admin/admin-ajax.php")).toBeNull();
    expect(getLegacyRedirectPath("/wp-login.php")).toBeNull();
    expect(getLegacyRedirectPath("/cgi-sys/defaultwebpage.cgi")).toBeNull();
  });

  it("returns null for unrelated paths that should continue through normal routing", () => {
    expect(getLegacyRedirectPath("/about")).toBeNull();
    expect(getLegacyRedirectPath("/communities/champaign")).toBeNull();
  });
});
