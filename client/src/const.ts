/**
 * Where to send a visitor who hits a protected route unauthenticated.
 * The Manus OAuth flow no longer exists; /contact-report is now guarded by a
 * shared admin token, so unauthenticated visitors are sent to the homepage.
 */
export function getLoginUrl(): string {
  return "/";
}
