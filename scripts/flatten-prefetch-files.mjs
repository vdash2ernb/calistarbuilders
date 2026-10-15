// Works around a Next.js static-export bug on Windows (seen in 16.4.1).
//
// The client router prefetches flat files such as `about/__next.about.__PAGE__.txt`,
// but on Windows the exporter joins segment paths with backslashes and only turns
// forward slashes into dots, so it writes `about/__next.about/__PAGE__.txt` instead.
// Every prefetch then 404s. This moves nested files back to the flat names the
// client expects. On Linux/macOS builds there is nothing to fix and it exits quietly.

import { readdir, rename, rm } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../out/", import.meta.url));

async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? filesUnder(join(dir, e.name)) : [join(dir, e.name)])),
  );
  return nested.flat();
}

async function flatten(dir) {
  let moved = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await filesUnder(full)) {
        const flatName = `${entry.name}.${relative(full, file).split(sep).join(".")}`;
        await rename(file, join(dir, flatName));
        moved++;
      }
      await rm(full, { recursive: true });
    } else if (entry.name !== "_next") {
      moved += await flatten(full);
    }
  }
  return moved;
}

const moved = await flatten(outDir);
if (moved > 0) console.log(`flatten-prefetch-files: fixed ${moved} prefetch file(s) in out/`);
