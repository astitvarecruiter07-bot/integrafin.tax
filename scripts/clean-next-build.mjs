import { rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(process.cwd());
const nextBuildDirectory = path.resolve(projectRoot, ".next");

if (
  path.dirname(nextBuildDirectory) !== projectRoot ||
  path.basename(nextBuildDirectory) !== ".next"
) {
  throw new Error("Refusing to remove a directory outside the project root.");
}

await rm(nextBuildDirectory, { recursive: true, force: true });
console.log("Removed stale .next build artifacts.");
