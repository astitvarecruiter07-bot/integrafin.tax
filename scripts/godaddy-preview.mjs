import { spawn } from "node:child_process";
import path from "node:path";

const projectRoot = path.resolve(process.cwd());
const nextCli = path.resolve(
  projectRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);
const runtimeEnvironment = {
  ...process.env,
  NODE_ENV: "production",
};

let activeChild = null;
let shuttingDown = false;

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => {
    shuttingDown = true;
    if (activeChild && !activeChild.killed) {
      activeChild.kill(signal);
    }
  });
}

function runNext(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextCli, ...args], {
      cwd: projectRoot,
      env: runtimeEnvironment,
      stdio: "inherit",
    });

    activeChild = child;

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      activeChild = null;

      if (code === 0 || (shuttingDown && signal)) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Next.js ${args[0]} exited with ${signal ? `signal ${signal}` : `code ${code}`}.`,
        ),
      );
    });
  });
}

await import("./clean-next-build.mjs");
console.log("Building Next.js inside the GoDaddy preview runtime...");
await runNext(["build"]);
console.log("Starting the GoDaddy preview server...");
await runNext(["start", "--hostname", "0.0.0.0"]);
