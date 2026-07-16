"use client";

import Image, { type ImageProps } from "next/image";
import { hygraphImageLoader, isHygraphAsset } from "@/lib/hygraph-image-loader";

/**
 * Drop-in <Image> for CMS-sourced art.
 *
 * Hygraph assets are transformed by Hygraph (free); anything else — a /public
 * path, a placeholder — falls through to Vercel's optimizer untouched, so this
 * is safe to use at call-sites whose src may be either.
 *
 * "use client" is required: next/image is a Client Component, so `loader` (a
 * function) cannot cross a server/client boundary. Passing it from a Server
 * Component throws "Functions cannot be passed directly to Client Components"
 * at render time — which typecheck and lint do not catch. Keeping this
 * boundary here means the loader is constructed client-side; call-sites stay
 * Server Components and pass only serializable props.
 */
export function CmsImage({ src, ...props }: ImageProps) {
  const useHygraph = typeof src === "string" && isHygraphAsset(src);

  return (
    <Image
      {...props}
      loader={useHygraph ? hygraphImageLoader : undefined}
      src={src}
    />
  );
}
