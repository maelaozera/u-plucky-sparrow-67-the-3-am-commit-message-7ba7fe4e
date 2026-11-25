// The 3 AM Commit Message — entry program.
//
// The joke: a commit message written right after breaking production
// at 3 AM — "fix: prod down at 3am, confidence 0.99, accuracy 0.00,
// lessons learned: none". The comedy is the gap between the total
// confidence and the total accuracy, closed with a lessons-learned
// section that learned nothing. One line, 76 characters, inside the
// 200-character limit, written verbatim (no trailing newline) to
// <OUTPUT_DIR>/entry.txt (defaults to /output/entry.txt).
// Deterministic: no dates, no random numbers, no network, no
// dependencies — the same line on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const COMMIT_LINE =
  "fix: prod down at 3am, confidence 0.99, accuracy 0.00, lessons learned: none";

const MAX_CHARS = 200;

function resolveOutFile(): string {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  return join(outDir, "entry.txt");
}

function checkedLine(): string {
  const line = COMMIT_LINE.trim();
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(
      `Entry must be 1-${MAX_CHARS} characters, got ${line.length}.`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be exactly one line.");
  }
  return line;
}

function main(): void {
  const line = checkedLine();
  const outFile = resolveOutFile();
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, line, "utf8");
  console.log(`Wrote ${line.length}-character entry to ${outFile}`);
}

main();
