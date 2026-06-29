"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Faq {
  answer: string;
  question: string;
}

function ContactFaqItem({ question, answer }: Faq) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <div
        className={cn(
          "group rounded-xl border bg-white px-5 py-4 transition-colors md:px-6 md:py-5",
          open ? "border-bost-olive/20" : "border-bost-olive/10"
        )}
      >
        <button
          className="flex w-full cursor-pointer items-center justify-between gap-6 text-left font-semibold text-base text-bost-olive md:text-lg"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          <span>{question}</span>
          <Plus
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 text-bost-brick transition-transform duration-200",
              open && "rotate-45"
            )}
          />
        </button>
        <div
          className={cn(
            "grid overflow-hidden transition-all duration-300 ease-in-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0">
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

function ContactFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <ul className="space-y-3">
      {faqs.map((faq) => (
        <ContactFaqItem
          answer={faq.answer}
          key={faq.question}
          question={faq.question}
        />
      ))}
    </ul>
  );
}

export { ContactFaq };
