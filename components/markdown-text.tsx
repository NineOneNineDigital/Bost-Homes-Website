import { Link } from "next-view-transitions";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Hygraph stores some copy (neighborhood/lot descriptions) in plain String
// fields that editors write with Markdown links and blank-line paragraph
// breaks. Render just those two constructs — anything richer belongs in a
// Rich Text field, which we render as HTML elsewhere.
const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;
const PARAGRAPH_BREAK = /\n{2,}/;
const WHITESPACE_RUN = /\s+/g;
const SITE_ORIGIN = "https://www.bosthomes.com";

function toInternalHref(href: string): string | null {
  if (href.startsWith("/")) {
    return href;
  }
  if (href.startsWith(`${SITE_ORIGIN}/`) || href === SITE_ORIGIN) {
    return href.slice(SITE_ORIGIN.length) || "/";
  }
  return null;
}

function renderInline(text: string, linkClassName: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  LINK_PATTERN.lastIndex = 0;
  let match = LINK_PATTERN.exec(text);
  while (match !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, label, href] = match;
    const internalHref = toInternalHref(href);
    const key = `${match.index}-${href}`;

    if (internalHref) {
      nodes.push(
        <Link className={linkClassName} href={internalHref} key={key}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          className={linkClassName}
          href={href}
          key={key}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
    match = LINK_PATTERN.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/** Strips Markdown link syntax down to its label — for metadata descriptions. */
export function stripMarkdown(text: string): string {
  return text.replace(LINK_PATTERN, "$1").replace(WHITESPACE_RUN, " ").trim();
}

export function MarkdownText({
  className,
  linkClassName,
  text,
}: {
  className?: string;
  linkClassName?: string;
  text: string;
}) {
  const paragraphs = text
    .split(PARAGRAPH_BREAK)
    .map((p) => p.trim())
    .filter(Boolean);

  const linkClasses = cn(
    "font-medium underline underline-offset-4 transition-colors",
    linkClassName
  );

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          className={cn(className, index > 0 && "mt-4")}
          // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are positional, static content
          key={index}
        >
          {renderInline(paragraph, linkClasses)}
        </p>
      ))}
    </>
  );
}
