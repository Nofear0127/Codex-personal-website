#!/usr/bin/env node
/**
 * Build a static site for Vercel.
 * vinext targets Cloudflare by default; Vercel's Next.js detector fails on
 * cloudflare:workers. This script builds assets, prerenders `/`, and writes `out/`.
 */
import { spawn } from "node:child_process";
import { cp, mkdir, rm, access } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = process.cwd();
const outDir = resolve(root, "out");
const port = Number(process.env.PORT || 3099);
const host = "127.0.0.1";

function run(command, args, opts = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, ...opts.env },
      shell: process.platform === "win32",
    });
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
    } catch {
      // retry
    }
    await delay(500);
  }
  throw new Error(`Server did not become ready at ${url}`);
}

async function main() {
  console.log("→ vinext build");
  await run("npx", ["vinext", "build"], {
    env: { WRANGLER_LOG_PATH: ".wrangler/wrangler.log" },
  });

  console.log("→ start production server for prerender");
  const logPath = resolve(root, ".wrangler", "vercel-prerender.log");
  await mkdir(resolve(root, ".wrangler"), { recursive: true });
  const logStream = createWriteStream(logPath, { flags: "w" });
  const server = spawn(
    "npx",
    ["vinext", "start"],
    {
      cwd: root,
      env: {
        ...process.env,
        PORT: String(port),
        HOST: host,
        WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
      },
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
    },
  );
  server.stdout.pipe(logStream);
  server.stderr.pipe(logStream);

  try {
    const home = await waitForServer(`http://${host}:${port}/`);
    const html = await home.text();

    console.log("→ assemble out/");
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });
    await cp(resolve(root, "dist", "client"), outDir, { recursive: true });
    await cp(resolve(root, "public", "articles"), resolve(outDir, "articles"), {
      recursive: true,
    }).catch(async () => {
      // articles may already exist under dist/client
      try {
        await access(resolve(outDir, "articles"));
      } catch {
        console.warn("warning: no articles directory found");
      }
    });

    const { writeFile } = await import("node:fs/promises");
    await writeFile(resolve(outDir, "index.html"), html, "utf8");
    // SPA-style fallback for client routes
    await writeFile(resolve(outDir, "404.html"), html, "utf8");

    console.log("✓ Vercel static output ready at out/");
  } finally {
    server.kill("SIGTERM");
    await delay(500);
    if (!server.killed) server.kill("SIGKILL");
    logStream.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
