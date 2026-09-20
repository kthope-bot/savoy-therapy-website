import { ENV } from "./env";

const HIGHLEVEL_BASE_URL = "https://services.leadconnectorhq.com";
const HIGHLEVEL_VERSION = "2023-02-21";

export type UrgentInquiryInput = {
  fullName: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  interest: string;
  message?: string | null;
  sourcePage?: string | null;
};

function getHeaders() {
  if (!ENV.highLevelApiToken || !ENV.highLevelLocationId) {
    throw new Error("HighLevel configuration is missing.");
  }

  return {
    Accept: "application/json",
    Authorization: `Bearer ${ENV.highLevelApiToken}`,
    "Content-Type": "application/json",
    Version: HIGHLEVEL_VERSION,
  };
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? fullName.trim();
  const lastName = parts.slice(1).join(" ") || undefined;

  return { firstName, lastName };
}

export function isUrgentInquiry(input: Pick<UrgentInquiryInput, "interest" | "message">) {
  const haystack = `${input.interest} ${input.message ?? ""}`.toLowerCase();
  return /\b(urgent|asap|immediately|immediate|right away|same day|today|emergency)\b/.test(haystack);
}

export async function syncContactToHighLevel(
  input: UrgentInquiryInput,
  options: { urgent: boolean },
) {
  const { firstName, lastName } = splitName(input.fullName);

  const upsertResponse = await fetch(`${HIGHLEVEL_BASE_URL}/contacts/upsert`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      locationId: ENV.highLevelLocationId,
      firstName,
      lastName,
      name: input.fullName,
      email: input.email,
      phone: input.phone || undefined,
      companyName: input.organization || undefined,
      source: `Savoy Therapy website - ${input.sourcePage || "site"}`,
    }),
  });

  const upsertPayload = await upsertResponse.json().catch(() => ({}));

  if (!upsertResponse.ok || !upsertPayload?.contact?.id) {
    throw new Error(`HighLevel contact upsert failed: ${JSON.stringify(upsertPayload)}`);
  }

  const contactId = upsertPayload.contact.id as string;

  const dueOffsetMs = options.urgent ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const dueDate = new Date(Date.now() + dueOffsetMs).toISOString();
  const title = options.urgent
    ? `Urgent Savoy Therapy inquiry: ${input.fullName}`
    : `New Savoy Therapy inquiry: ${input.fullName}`;

  const taskResponse = await fetch(
    `${HIGHLEVEL_BASE_URL}/contacts/${contactId}/tasks`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        title,
        body: [
          options.urgent
            ? "A new URGENT inquiry was submitted from the Savoy Therapy website."
            : "A new inquiry was submitted from the Savoy Therapy website.",
          `Name: ${input.fullName}`,
          `Email: ${input.email}`,
          `Phone: ${input.phone || "Not provided"}`,
          `Organization: ${input.organization || "Not provided"}`,
          `Interest: ${input.interest}`,
          `Source page: ${input.sourcePage || "site"}`,
          `Message: ${input.message || "Not provided"}`,
        ].join("\n"),
        dueDate,
        completed: false,
      }),
    },
  );

  const taskPayload = await taskResponse.json().catch(() => ({}));

  if (!taskResponse.ok) {
    throw new Error(`HighLevel task creation failed: ${JSON.stringify(taskPayload)}`);
  }

  return {
    contactId,
    taskId: taskPayload?.task?.id ?? null,
  };
}
