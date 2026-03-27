"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    id: "1",
    title: "What materials do you use for custom homes?",
    description:
      "We source premium, locally-available materials and partner with specialized craftsmen. From hand-selected hardwoods and custom millwork to high-performance windows and roofing systems, every material is chosen with intention and installed with expertise.",
  },
  {
    id: "2",
    title: "How do you select your trade partners and subcontractors?",
    description:
      "Our trade partners are carefully vetted over years of working relationships. We prioritize local craftsmen who share our commitment to quality, communication, and accountability. Every subcontractor we bring on is someone we would invite into our own homes.",
  },
  {
    id: "3",
    title: "Do you offer energy-efficient or sustainable building options?",
    description:
      "Absolutely. We incorporate high-performance insulation, efficient HVAC systems, Energy Star-rated appliances, and can accommodate solar-ready designs, EV charging infrastructure, and other forward-thinking features upon request.",
  },
  {
    id: "4",
    title: "Can I bring my own architect or designer?",
    description:
      "Yes. We work seamlessly with outside architects and interior designers. Our in-house team is also available if you need design guidance from the start. Collaboration is at the core of how we build.",
  },
  {
    id: "5",
    title: "What warranties do you provide?",
    description:
      "We stand behind our work with a comprehensive warranty program. All Bost Custom Homes include a 1-year workmanship warranty, 2-year systems warranty, and 10-year structural warranty in line with industry standards.",
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
      {open && (
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      )}
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
