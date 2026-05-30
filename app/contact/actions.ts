"use server";

import { headers } from "next/headers";

const CAPSULE_NEWLEAD_URL = "https://service.capsulecrm.com/service/newlead";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Not configured — skip verification so local dev / unset envs still work.
  if (!secret) {
    return true;
  }
  if (!token) {
    return false;
  }

  const headersList = await headers();
  const ip =
    headersList.get("cf-connecting-ip") ??
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim();

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) {
    body.set("remoteip", ip);
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) {
      return false;
    }
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

type InquiryType = "home" | "general" | "vendor";

const HOME_DETAIL_LABELS: Record<string, string> = {
  remodeling: "Remodeling services",
  architect: "Architect plans",
  homesite: "Owns homesite",
  budget: "Budget range",
};

const VENDOR_DETAIL_LABELS: Record<string, string> = {
  company: "Company",
  offering: "Offering",
};

const TAG_BY_TYPE: Record<InquiryType, string> = {
  home: "Website Contact Form",
  general: "Website General Inquiry",
  vendor: "Website Vendor Inquiry",
};

const DETAIL_LABELS_BY_TYPE: Record<
  InquiryType,
  Record<string, string> | null
> = {
  home: HOME_DETAIL_LABELS,
  general: null,
  vendor: VENDOR_DETAIL_LABELS,
};

function buildNote(formData: FormData, inquiryType: InquiryType): string {
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const detailLabels = DETAIL_LABELS_BY_TYPE[inquiryType];
  const detailLines: string[] = [];
  if (detailLabels) {
    for (const [field, label] of Object.entries(detailLabels)) {
      const value = (formData.get(field) as string | null)?.trim();
      if (value) {
        detailLines.push(`${label}: ${value}`);
      }
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

  const turnstileToken = (
    (formData.get("cf-turnstile-response") as string | null) ?? ""
  ).trim();
  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return {
      status: "error",
      message:
        "We couldn't verify you're human. Please refresh the page and try again.",
    };
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
  const rawType = (
    (formData.get("inquiryType") as string | null) ?? "home"
  ).trim();
  const inquiryType: InquiryType =
    rawType === "general" || rawType === "vendor" ? rawType : "home";

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
  const note = buildNote(formData, inquiryType);
  if (note) {
    payload.set("NOTE", note);
  }
  payload.set("TAG", TAG_BY_TYPE[inquiryType]);

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
