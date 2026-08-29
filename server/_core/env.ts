export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  adminAccessToken: process.env.ADMIN_ACCESS_TOKEN ?? "",
  isProduction: process.env.NODE_ENV === "production",
  highLevelApiToken: process.env.HIGHLEVEL_API_TOKEN ?? "",
  highLevelLocationId: process.env.HIGHLEVEL_LOCATION_ID ?? "",

  // Legacy Manus platform values. The services behind them no longer exist.
  // Kept as empty strings so recovered code paths compile and no-op safely.
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
};
