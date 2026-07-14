const MONDAY_API_URL = "https://api.monday.com/v2";
const WAITLIST_BOARD_ID = "5100272390";

const COLUMN_IDS = {
  fullName: "text_mm585ap3",
  email: "email_mm58epqc",
  company: "text_mm583jg",
  role: "dropdown_mm586njw",
  teamSize: "dropdown_mm588dy6",
  message: "long_text_mm586afx",
} as const;

export type WaitlistSubmission = {
  name: string;
  email: string;
  company: string;
  role: string;
  size?: string;
  message?: string;
};

type MondayResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function mondayQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const token = process.env.MONDAY_API_TOKEN;
  if (!token) {
    throw new Error("MONDAY_API_TOKEN is not configured");
  }

  const response = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = (await response.json()) as MondayResponse<T>;

  if (!response.ok || payload.errors?.length) {
    const message =
      payload.errors?.map((error) => error.message).join(", ") ??
      `Monday API request failed (${response.status})`;
    throw new Error(message);
  }

  if (!payload.data) {
    throw new Error("Monday API returned no data");
  }

  return payload.data;
}

function buildColumnValues(submission: WaitlistSubmission) {
  const values: Record<string, string | { labels: string[] } | { email: string; text: string } | { text: string }> = {
    [COLUMN_IDS.fullName]: submission.name,
    [COLUMN_IDS.email]: {
      email: submission.email,
      text: submission.email,
    },
    [COLUMN_IDS.company]: submission.company,
    [COLUMN_IDS.role]: { labels: [submission.role] },
  };

  if (submission.size) {
    values[COLUMN_IDS.teamSize] = { labels: [submission.size] };
  }

  if (submission.message?.trim()) {
    values[COLUMN_IDS.message] = { text: submission.message.trim() };
  }

  return values;
}

export async function createWaitlistItem(submission: WaitlistSubmission) {
  const itemName = `${submission.name} — ${submission.company}`;
  const columnValues = JSON.stringify(buildColumnValues(submission));

  const data = await mondayQuery<{
    create_item: { id: string; name: string };
  }>(
    `mutation {
      create_item(
        board_id: ${WAITLIST_BOARD_ID}
        item_name: ${JSON.stringify(itemName)}
        column_values: ${JSON.stringify(columnValues)}
      ) {
        id
        name
      }
    }`,
  );

  return data.create_item;
}
