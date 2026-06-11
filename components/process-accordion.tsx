"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    id: "1",
    title: "Will you build on my vacant land, or tear-down property?",
    description:
      "Absolutely — some of our most intriguing projects are on private land. Everything from dilapidated tear-down homes inside the beltline to 50+ acre tracts on the periphery. We've even assisted clients achieve agricultural exemption, and tax write-offs for deconstruction and donation.",
  },
  {
    id: "2",
    title: "What does the project budgeting process look like?",
    description:
      "Using a running database of current construction cost information, we can provide general price guidance based on size, architecture, and features. Once the design is developed to a pricing set, we'll produce an accurate itemized contract budget, adjusting as needed.",
  },
  {
    id: "3",
    title:
      "Will you work with my architect, or from an existing set of drawings?",
    description:
      "Yes. You likely won't find a more accommodating custom home builder. If you have a relationship with a home designer or architect, add us into the workflow. In our experience, home design without the input of the builder can lead to frustrating budgeting outcomes, so we advise involving a builder prior to plan finalization.",
  },
  {
    id: "4",
    title:
      "How will you manage the quality, schedule, and costs of my project?",
    description:
      "Your project will be assigned to a Project Manager, Construction Manager, and Project Coordinator. Together this team will manage the on-site execution, schedule impacts, selection related meetings and decision needs, permits, and ongoing communication with the entire team. This process includes daily logs, weekly updates, and monthly budget forecasts throughout the project.",
  },
  {
    id: "5",
    title: "What does your move-in and warranty program look like?",
    description:
      "Ahead of project completion, your construction team will schedule home orientation walkthroughs and a final list of correction items to be completed prior to moving in. Beginning at occupancy, we offer a 1-year warranty on all cosmetic and structural defects, followed by warranty service on structural/system defects subject to our warranty program agreement. Our goal is to be your builder for life.",
  },
];

function AccordionItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-border/40 border-t py-5">
      <button
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="font-medium text-base text-foreground leading-snug">
          {title}
        </span>
        {open ? (
          <Minus className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <Plus className="size-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="mt-3 text-muted-foreground text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProcessAccordion() {
  return (
    <div>
      {FAQ_ITEMS.map((item) => (
        <AccordionItem
          description={item.description}
          key={item.id}
          title={item.title}
        />
      ))}
      <div className="border-border/40 border-t" />
    </div>
  );
}

export { ProcessAccordion };
