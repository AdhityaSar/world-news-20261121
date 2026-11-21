// Republish the committed front page.
//
// The 1024x1024 PNG that ships with this repository is the whole deliverable, so this
// program does one job: make the output directory hold exactly that file, freshly
// written, and nothing else. Running it twice must leave the same bytes behind.
import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

// Clear the directory but keep the directory itself: on the grader the path is a mount
// point, and unlinking it would come back as EPERM.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

copyFileSync(source, join(outDir, 'entry.png'));
