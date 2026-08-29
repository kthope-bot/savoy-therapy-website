const legacyRedirectEntries = [
  // Blog posts and archives → /blog
  ["/staying-active-with-neuropathy-safe-ways-to-enjoy-summer-without-overheating/", "/blog"],
  ["/how-to-improve-balance-after-65-and-prevent-falls-at-home/", "/blog"],
  ["/3-simple-ways-to-strengthen-stability-and-prevent-falls-without-straining-your-body/", "/blog"],
  ["/how-to-improve-balance-after-65-and-stay-independent-longer/", "/blog"],
  ["/why-falls-happen-more-in-summer-and-how-to-protect-yourself/", "/blog"],
  ["/how-non-invasive-therapies-like-stimpod-support-nerve-health-and-daily-comfort/", "/blog"],
  ["/elderly-fall-prevention-7-proven-tips-to-improve-balance-stay-independent/", "/blog"],
  ["/planning-a-summer-trip-with-neuropathy-heres-how-to-travel-more-comfortably/", "/blog"],
  ["/10-simple-exercises-to-reduce-fall-risk-in-seniors-and-boost-confidence/", "/blog"],
  ["/neuropathy-and-summer-heat-7-stretches-cooling-tips-for-staying-active-comfortably/", "/blog"],
  ["/fall-prevention-month-7-balance-tips-every-older-adult-should-know/", "/blog"],
  ["/early-signs-of-neuropathy-in-the-feet-what-to-watch-for-and-how-to-respond/", "/blog"],
  ["/category/balance-and-falls/", "/blog"],
  ["/category/chronic-pain/", "/blog"],
  ["/category/back-pain/", "/blog"],
  ["/category/health-wellness/", "/blog"],
  ["/falls-and-balance/", "/blog"],
  ["/tag/stimpod/", "/blog"],
  ["/tag/summer/", "/blog"],
  ["/tag/falls-and-balance/", "/blog"],
  ["/tag/physical-therapy-near-me/", "/blog"],
  ["/tag/balance/", "/blog"],
  ["/tag/feet/", "/blog"],
  ["/author/owen-b/", "/blog"],
  ["/author/meg/", "/blog"],

  // Service pages → /services
  ["/parkinsons-rehab-lsvt-big-loud/", "/services"],
  ["/services/parkinsons-rehab-lsvt-big-loud/", "/services"],
  ["/post-surgical-physical-therapy/", "/services"],
  ["/numbness-and-tingling/", "/services"],
  ["/stroke/", "/services"],
  ["/joint-pain/", "/services"],
  ["/orthopedics/", "/services"],
  ["/services/orthopedics/", "/services"],
  ["/occupational-therapy/", "/services"],
  ["/services/occupational-therapy/", "/services"],
  ["/cognitive-rehab/", "/services"],

  // Discontinued speech therapy → /
  ["/speech-therapy/", "/"],
  ["/services/speech-therapy/", "/"],

  // Contact / inquiry → /#contact
  ["/contact/", "/#contact"],
  ["/contactus/", "/#contact"],
  ["/request-a-call-back/", "/#contact"],
  ["/free-discovery-visit/", "/#contact"],
  ["/cost-and-availability/", "/#contact"],

  // Clear equivalents
  ["/client-testimonials/", "/testimonials"],
  ["/meet-the-founder-kishor-thope/", "/about"],
  ["/our-partnrs/", "/communities"],

  // No new equivalent → /
  ["/workshops/", "/"],
  ["/careers/", "/"],
  ["/faq/", "/"],
  ["/links/", "/"],
  ["/meal-service/", "/"],
  ["/insurance/", "/"],
  ["/library_nl_4439/", "/"],
  ["/library_knee/", "/"],
  ["/library_nl_6876", "/"],
  ["/library_newsfeed_871/", "/"],
] as const;

function normalizePath(inputPath: string) {
  const [pathOnly] = inputPath.split(/[?#]/, 1);
  const trimmed = pathOnly.trim() || "/";
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  if (withLeadingSlash === "/") {
    return "/";
  }

  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

const legacyRedirectMap = new Map<string, string>(
  legacyRedirectEntries.map(([oldPath, target]) => [normalizePath(oldPath), target])
);

export function getLegacyRedirectPath(inputPath: string) {
  const normalizedPath = normalizePath(inputPath).toLowerCase();

  if (normalizedPath === "/wp-admin/admin-ajax.php") {
    return null;
  }

  if (normalizedPath.startsWith("/wp-") && normalizedPath.endsWith(".php")) {
    return null;
  }

  if (normalizedPath === "/cgi-sys/defaultwebpage.cgi") {
    return null;
  }

  return legacyRedirectMap.get(normalizedPath) ?? null;
}

export { legacyRedirectEntries, normalizePath };
