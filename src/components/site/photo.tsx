import { preload } from "react-dom";
import { cn } from "@/lib/utils";
import { photoData, photoInfo, type PhotoName } from "@/content/photos";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Responsive photo from public/photos (see scripts/prepare-photos.mjs).
 * The site is a static export with no image server, so widths are pre-generated
 * and the browser picks one via srcset. A blurred preview shows until it loads.
 */
export function Photo({
  name,
  sizes = "100vw",
  priority = false,
  fill = false,
  alt,
  className,
}: {
  name: PhotoName;
  sizes?: string;
  priority?: boolean;
  /** Absolutely fill the nearest positioned parent (object-fit: cover). */
  fill?: boolean;
  /** Override the default alt text; pass "" for decorative backgrounds. */
  alt?: string;
  className?: string;
}) {
  const data = photoData[name];
  const info = photoInfo[name];
  const url = (w: number) => `${base}/photos/${name}-${w}.webp`;
  const srcSet = data.widths.map((w) => `${url(w)} ${w}w`).join(", ");
  const src = url(data.widths.at(-1)!);

  if (priority) {
    preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: srcset is pre-generated
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={data.width}
      height={data.height}
      alt={alt ?? info.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn(fill && "absolute inset-0 size-full", "object-cover", className)}
      style={{
        objectPosition: info.position,
        backgroundImage: `url("${data.blur}")`,
        backgroundSize: "cover",
        backgroundPosition: info.position ?? "center",
      }}
    />
  );
}
