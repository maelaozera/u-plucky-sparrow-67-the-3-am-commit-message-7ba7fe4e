// The 3 AM Commit Message — entry program.
//
// Writes the chosen one-line commit message to <OUTPUT_DIR>/entry.txt
// (defaults to /output/entry.txt). Deterministic: no dates, no random
// numbers, no network, no dependencies — the same line on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MESSAGE =
  "fix: prod down at 3am, confidence 0.99, accuracy 0.00, lessons learned: none";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, MESSAGE, "utf8");
