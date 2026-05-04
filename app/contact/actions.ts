"use server";

const CAPSULE_NEWLEAD_URL = "https://service.capsulecrm.com/service/newlead";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const SELECT_LABELS: Record<string, string> = {
  remodeling: "Remodeling services",
  architect: "Architect plans",
  homesite: "Owns homesite",
  budget: "Budget range",
};

function buildNote(formData: FormData): string {
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const detailLines: string[] = [];
  for (const [field, label] of Object.entries(SELECT_LABELS)) {
    const value = (formData.get(field) as string | null)?.trim();
    if (value) {
      detailLines.push(`${label}: ${value}`);
    }
  }
  const sections: string[] = [];
  if (message) {
    sections.push(message);
  }
  if (detailLines.length > 0) {
    sections.push(`— Inquiry Details —\n${detailLines.join("\n")}`);
  }
  return sections.join("\n\n");
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot — silently drop bot submissions
  if ((formData.get("company_website") as string | null)?.trim()) {
    return { status: "success" };
  }

  const formId = process.env.CAPSULE_FORM_ID;
  if (!formId) {
    return {
      status: "error",
      message:
        "Contact form is not configured. Please email us directly while we sort this out.",
    };
  }

  const firstName = ((formData.get("firstName") as string | null) ?? "").trim();
  const lastName = ((formData.get("lastName") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const phone = ((formData.get("phone") as string | null) ?? "").trim();

  if (!(firstName && lastName && email)) {
    return {
      status: "error",
      message: "Please fill in your name and email so we can reach you.",
    };
  }

  const payload = new URLSearchParams();
  payload.set("FORM_ID", formId);
  payload.set("FIRST_NAME", firstName);
  payload.set("LAST_NAME", lastName);
  payload.set("EMAIL", email);
  if (phone) {
    payload.set("PHONE", phone);
  }
  const note = buildNote(formData);
  if (note) {
    payload.set("NOTE", note);
  }
  payload.set("TAG", "Website Contact Form");

  try {
    const res = await fetch(CAPSULE_NEWLEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      redirect: "manual",
    });
    // Capsule responds with a redirect (3xx) on success; treat any non-error
    // status as success since we're not following the redirect ourselves.
    if (res.status >= 400) {
      return {
        status: "error",
        message:
          "We couldn't submit your inquiry right now. Please try again or call us directly.",
      };
    }
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message:
        "We couldn't reach our system. Please try again in a moment or call us directly.",
    };
  }
}
