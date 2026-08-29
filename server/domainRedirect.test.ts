import { describe, expect, it } from "vitest";
import { getCanonicalRedirectUrl } from "./_core/domainRedirect";

describe("getCanonicalRedirectUrl", () => {
  it("redirects the root domain to the canonical www domain", () => {
    expect(getCanonicalRedirectUrl("savoytherapy.com", "/resources?guide=falls", "https")).toBe(
      "https://www.savoytherapy.com/resources?guide=falls",
    );
  });

  it("does not redirect the canonical host or unrelated hosts", () => {
    expect(getCanonicalRedirectUrl("www.savoytherapy.com", "/", "https")).toBeNull();
    expect(getCanonicalRedirectUrl("savoytherap-9gidadgh.manus.space", "/", "https")).toBeNull();
  });
});
