"use client";

import Script from "next/script";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  type ContactFormState,
  submitContactForm,
} from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      reset: (widget?: string | HTMLElement) => void;
    };
  }
}

type InquiryType = "home" | "general" | "vendor";

const remodelingOptions = ["Yes", "No", "Not Sure"];
const architectOptions = ["Yes", "No", "In Progress"];
const homesiteOptions = ["Yes", "No", "Looking"];
const budgetOptions = [
  "<$1.5M",
  "$1.5M - $2.5M",
  "$2.5M - $3.5M",
  "$3.5M+",
];

const initialState: ContactFormState = { status: "idle" };

const messageLabels: Record<InquiryType, string> = {
  home: "Tell us more about your vision...",
  general: "How can we help?",
  vendor: "Tell us about your product or service",
};

const messagePlaceholders: Record<InquiryType, string> = {
  home: "What's your dream...",
  general: "Share a few details about what you're looking for...",
  vendor: "Briefly describe what you provide and why it's a fit...",
};

const inputStyles = cn(
  "h-11 w-full rounded-md border border-border bg-white px-3 text-foreground text-sm",
  "placeholder:text-muted-foreground/50",
  "outline-none transition-colors focus:border-ring focus:ring-[3px] focus:ring-ring/50"
);

const selectStyles = cn(
  "h-11 w-full appearance-none rounded-md border border-border bg-white px-3 text-foreground text-sm",
  "outline-none transition-colors focus:border-ring focus:ring-[3px] focus:ring-ring/50"
);

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-medium text-foreground/80 text-xs" htmlFor={name}>
        {label}
        {required && <span className="text-bost-brick">*</span>}
      </label>
      <input
        className={inputStyles}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-medium text-foreground/80 text-xs" htmlFor={name}>
        {label}
        {required && <span className="text-bost-brick">*</span>}
      </label>
      <div className="relative">
        <select
          className={selectStyles}
          id={name}
          name={name}
          required={required}
        >
          <option value="">Please select one</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function InquiryToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        "h-10 whitespace-nowrap rounded-md px-1 font-medium text-xs transition-colors sm:text-sm",
        active
          ? "bg-bost-olive text-bost-cream shadow-sm"
          : "text-foreground/60 hover:text-foreground"
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("home");
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error" && window.turnstile && turnstileRef.current) {
      window.turnstile.reset(turnstileRef.current);
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-xl bg-muted/60 p-12 text-center">
        <h3 className="mb-2 font-semibold text-2xl">Thank You!</h3>
        <p className="text-muted-foreground">
          We&apos;ve received your inquiry and will be in touch shortly.
        </p>
      </div>
    );
  }

  const isHome = inquiryType === "home";
  const isVendor = inquiryType === "vendor";

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-xl border border-border/60 bg-muted/30 p-6 sm:p-8"
    >
      {/* Honeypot — bots fill this; humans never see it */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company_website">
          Leave this field blank
          <input
            autoComplete="off"
            id="company_website"
            name="company_website"
            tabIndex={-1}
            type="text"
          />
        </label>
      </div>

      {/* Inquiry Type Toggle */}
      <fieldset>
        <legend className="mb-2 font-medium text-foreground/80 text-xs">
          What&apos;s this about?
        </legend>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-white p-1 ring-1 ring-border">
          <InquiryToggleButton
            active={isHome}
            label="Custom Home"
            onClick={() => setInquiryType("home")}
          />
          <InquiryToggleButton
            active={inquiryType === "general"}
            label="General"
            onClick={() => setInquiryType("general")}
          />
          <InquiryToggleButton
            active={isVendor}
            label="Vendor"
            onClick={() => setInquiryType("vendor")}
          />
        </div>
      </fieldset>

      <input name="inquiryType" type="hidden" value={inquiryType} />

      {/* Name Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="First Name"
          name="firstName"
          placeholder="John"
          required
        />
        <InputField
          label="Last Name"
          name="lastName"
          placeholder="Smith"
          required
        />
      </div>

      {/* Contact Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Email Address"
          name="email"
          placeholder="john@example.com"
          required
          type="email"
        />
        <InputField
          label="Phone Number"
          name="phone"
          placeholder="(111) 222-3333"
          type="tel"
        />
      </div>

      {/* Home-specific Select Fields */}
      {isHome && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Are you inquiring about remodeling services?"
              name="remodeling"
              options={remodelingOptions}
            />
            <SelectField
              label="Do you have plans drawn from an architect?"
              name="architect"
              options={architectOptions}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Do you own a homesite?"
              name="homesite"
              options={homesiteOptions}
            />
            <SelectField
              label="What is your budget range?"
              name="budget"
              options={budgetOptions}
            />
          </div>
        </>
      )}

      {/* Vendor-specific Fields */}
      {isVendor && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="Company"
            name="company"
            placeholder="Acme Building Supply"
          />
          <InputField
            label="What you offer"
            name="offering"
            placeholder="e.g. HVAC, lumber, marketing"
          />
        </div>
      )}

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          className="font-medium text-foreground/80 text-xs"
          htmlFor="message"
        >
          {messageLabels[inquiryType]}
        </label>
        <textarea
          className={cn(
            "min-h-[120px] w-full rounded-md border border-border bg-white px-3 py-3 text-sm",
            "placeholder:text-muted-foreground/50",
            "outline-none transition-colors focus:border-ring focus:ring-[3px] focus:ring-ring/50"
          )}
          id="message"
          name="message"
          placeholder={messagePlaceholders[inquiryType]}
          rows={5}
        />
      </div>

      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="light"
            ref={turnstileRef}
          />
        </>
      )}

      {state.status === "error" && (
        <p
          className="rounded-md border border-bost-brick/30 bg-bost-brick/5 px-4 py-3 text-bost-brick text-sm"
          role="alert"
        >
          {state.message}
        </p>
      )}

      {/* Submit */}
      <Button
        className="h-12 w-full rounded-lg bg-bost-brick text-base text-white hover:bg-bost-brick/90 disabled:opacity-60"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
