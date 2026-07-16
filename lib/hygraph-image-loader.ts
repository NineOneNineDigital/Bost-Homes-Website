/**
 * next/image loader for Hygraph assets.
 *
 * Hygraph transforms are free and uncapped; Vercel bills per unique
 * (source, width, quality). The project galleries alone hold ~292 unique
 * assets rendered at ~6 widths each, which is what was burning through the
 * transformation allowance. Routing those to Hygraph takes them off the bill.
 *
 * Applied per call-site via <CmsImage> rather than as a global `loaderFile`:
 * a global custom loader disables Next's /_next/image endpoint entirely, which
 * 404s every /public asset (verified — see next.config.mjs).
 *
 * Two details that are easy to get wrong:
 *
 * - `quality` must come AFTER `output=format:webp`; it configures the encoder,
 *   and placing it earlier is silently ignored (260KB vs 143KB at width 828).
 * - `fit:max` never enlarges, so a 1024px source requested at w=1200 returns
 *   1024px. Dropping it defaults to `fit:clip`, which upscales to 1200px.
 *
 * The comma in `resize=width:N,fit:max` is safe inside a srcset: the HTML
 * parser collects candidate URLs up to whitespace, not commas. Verified in
 * Chromium against a real srcset.
 *
 * Hygraph rejects AVIF today ("Unsupported transformation from jpeg to avif.
 * We temporarily disabled this transformation."), but Next's default `formats`
 * is ["image/webp"] only, so no format is lost.
 */

const DEFAULT_QUALITY = 75;

export const HYGRAPH_ASSET_HOST = "graphassets.com";

export function isHygraphAsset(src: string): boolean {
  return src.includes(HYGRAPH_ASSET_HOST);
}

interface ImageLoaderParams {
  quality?: number;
  src: string;
  width: number;
}

export function hygraphImageLoader({
  src,
  width,
  quality,
}: ImageLoaderParams): string {
  const lastSlash = src.lastIndexOf("/");
  if (lastSlash === -1) {
    return src;
  }

  const base = src.slice(0, lastSlash);
  const handle = src.slice(lastSlash + 1);
  const q = quality ?? DEFAULT_QUALITY;

  return `${base}/resize=width:${width},fit:max/output=format:webp/quality=value:${q}/${handle}`;
}
