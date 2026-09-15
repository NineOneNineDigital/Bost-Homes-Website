/**
 * Hygraph renders rich text as a flat run of top-level blocks (<p>, <h3>,
 * <ul>, …) with no marker for where a post's secondary images belong. To set
 * them through the article instead of piling them at the end, we cut the HTML
 * at top-level block boundaries — never inside a list or paragraph — and slot
 * each image into a gap, preferring the section breaks before headings.
 */

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);
// Quoted attribute values may contain ">", so they are matched whole.
const TAG_PATTERN = /<(\/?)([a-zA-Z][\w-]*)(?:[^>"']|"[^"]*"|'[^']*')*?(\/?)>/g;
const HEADING_PATTERN = /^<h[1-6][\s>]/i;

export type BodySegment<T> =
  | { type: "html"; key: string; html: string }
  | { type: "image"; key: string; image: T; index: number };

export function splitTopLevelBlocks(html: string): string[] {
  const blocks: string[] = [];
  let depth = 0;
  let start = 0;

  for (const match of html.matchAll(TAG_PATTERN)) {
    const [tag, closing, name, selfClosing] = match;
    if (VOID_TAGS.has(name.toLowerCase()) || selfClosing) {
      continue;
    }
    if (!closing) {
      depth++;
      continue;
    }
    depth = Math.max(0, depth - 1);
    if (depth === 0) {
      const end = match.index + tag.length;
      const block = html.slice(start, end).trim();
      if (block) {
        blocks.push(block);
      }
      start = end;
    }
  }

  const rest = html.slice(start).trim();
  if (rest) {
    blocks.push(rest);
  }
  return blocks;
}

/**
 * Picks `count` gap positions (gap g = "before block g"), spread evenly and in
 * order. Only interior gaps are used, so an image never opens the article;
 * any image that can't get its own gap is placed after the last block.
 */
function pickGaps(blocks: string[], count: number): number[] {
  const interior = blocks.map((_, i) => i).slice(1);
  const headings = interior.filter((i) => HEADING_PATTERN.test(blocks[i]));
  const candidates = headings.length >= count ? headings : interior;
  const placed = Math.min(count, candidates.length);

  const gaps: number[] = [];
  let from = 0;
  for (let j = 0; j < placed; j++) {
    const target = (blocks.length * (j + 1)) / (placed + 1);
    // Leave enough later candidates for the images still to be placed.
    const last = candidates.length - (placed - j);
    let best = from;
    for (let c = from + 1; c <= last; c++) {
      if (
        Math.abs(candidates[c] - target) < Math.abs(candidates[best] - target)
      ) {
        best = c;
      }
    }
    gaps.push(candidates[best]);
    from = best + 1;
  }

  while (gaps.length < count) {
    gaps.push(blocks.length);
  }
  return gaps;
}

export function interleaveImages<T>(
  html: string,
  images: T[]
): BodySegment<T>[] {
  const blocks = splitTopLevelBlocks(html);
  const gaps = pickGaps(blocks, images.length);
  const segments: BodySegment<T>[] = [];
  let start = 0;

  for (const [index, gap] of gaps.entries()) {
    if (gap > start) {
      segments.push({
        type: "html",
        key: `html-${start}`,
        html: blocks.slice(start, gap).join(""),
      });
      start = gap;
    }
    segments.push({
      type: "image",
      key: `image-${index}`,
      image: images[index],
      index,
    });
  }

  if (start < blocks.length) {
    segments.push({
      type: "html",
      key: `html-${start}`,
      html: blocks.slice(start).join(""),
    });
  }
  return segments;
}
