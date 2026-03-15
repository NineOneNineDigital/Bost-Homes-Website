"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const remodelingOptions = ["Yes", "No", "Not Sure"];
const architectOptions = ["Yes", "No", "In Progress"];
const homesiteOptions = ["Yes", "No", "Looking"];
const budgetOptions = [
  "$500K - $750K",
  "$750K - $1M",
  "$1M - $1.5M",
  "$1.5M - $2M",
  "$2M+",
];

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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-muted/60 p-12 text-center">
        <h3 className="mb-2 font-semibold text-2xl">Thank You!</h3>
        <p className="text-muted-foreground">
          We&apos;ve received your inquiry and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 rounded-xl border border-border/60 bg-muted/30 p-6 sm:p-8"
      onSubmit={handleSubmit}
    >
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

      {/* Select Fields — 2x2 grid */}
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

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          className="font-medium text-foreground/80 text-xs"
          htmlFor="message"
        >
          Tell us more about your vision...
        </label>
        <textarea
          className={cn(
            "min-h-[120px] w-full rounded-md border border-border bg-white px-3 py-3 text-sm",
            "placeholder:text-muted-foreground/50",
            "outline-none transition-colors focus:border-ring focus:ring-[3px] focus:ring-ring/50"
          )}
          id="message"
          name="message"
          placeholder="What's your dream..."
          rows={5}
        />
      </div>

      {/* Submit */}
      <Button
        className="h-12 w-full rounded-lg bg-bost-brick text-base text-white hover:bg-bost-brick/90"
        size="lg"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
