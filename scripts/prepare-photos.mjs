// Turns source photos into responsive WebP files plus a blur placeholder.
//
//   npm run photos -- <folder-with-jpgs>
//
// Each `<name>.jpg|.jpeg|.png|.webp` in the folder becomes
// public/photos/<name>-<width>.webp for each width below, and its size and
// blur placeholder are recorded in src/content/photos.generated.json (keyed by
// <name>). Re-running with only some files updates just those entries.
// Alt text and credits live in src/content/photos.ts.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTHS = [640, 1024, 1600, 2400];
const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = join(root, "public", "photos");
const manifestPath = join(root, "src", "content", "photos.generated.json");

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("usage: npm run photos -- <folder-with-photos>");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, "utf8")) : {};

const files = (await readdir(sourceDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
for (const file of files) {
  const name = basename(file, extname(file)).toLowerCase();
  // rotate() applies EXIF orientation; re-encoding drops all other metadata.
  const image = sharp(join(sourceDir, file)).rotate();
  const { width, height } = await image.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(Math.min(width, WIDTHS.at(-1)));
  const unique = [...new Set(widths)];

  for (const w of unique) {
    await image.clone().resize({ width: w }).webp({ quality: 74, effort: 6 }).toFile(join(outDir, `${name}-${w}.webp`));
  }

  // Tiny preview wrapped in an SVG blur, shown until the real image loads.
  const tiny = await image.clone().resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  const tinyMeta = await sharp(tiny).metadata();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${tinyMeta.width} ${tinyMeta.height}">` +
    `<filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="1.2"/></filter>` +
    `<image width="100%" height="100%" preserveAspectRatio="none" filter="url(#b)" href="data:image/webp;base64,${tiny.toString("base64")}"/></svg>`;

  const outHeight = Math.round((height / width) * Math.min(width, WIDTHS.at(-1)));
  manifest[name] = {
    width: Math.min(width, WIDTHS.at(-1)),
    height: outHeight,
    widths: unique,
    blur: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
  };
  console.log(`${name}: ${unique.join(", ")}`);
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
console.log(`updated ${files.length} photo(s)`);
