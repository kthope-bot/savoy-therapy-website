const ROOT_DOMAIN = "savoytherapy.com";
const CANONICAL_HOST = "www.savoytherapy.com";

function normalizeHost(host: string | undefined) {
  return (host ?? "").trim().toLowerCase().replace(/:\d+$/, "");
}

export function getCanonicalRedirectUrl(host: string | undefined, originalUrl: string, protocol: string = "https") {
  const normalizedHost = normalizeHost(host);

  if (normalizedHost !== ROOT_DOMAIN) {
    return null;
  }

  const normalizedPath = originalUrl?.startsWith("/") ? originalUrl : "/";
  return `${protocol}://${CANONICAL_HOST}${normalizedPath}`;
}

export { CANONICAL_HOST, ROOT_DOMAIN };
