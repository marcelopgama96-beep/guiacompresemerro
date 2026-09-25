import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const requiredFiles = [
  "index.html",
  "src/app.js",
  "src/styles.css",
  "src/data/posts.js",
  "assets/logo.svg",
  "assets/favicon.svg",
  "robots.txt",
  "sitemap.xml"
];

for (const file of requiredFiles) {
  if (!existsSync(path.join(root, file))) {
    throw new Error(`Arquivo obrigatorio ausente: ${file}`);
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of ["index.html", "src", "assets", "robots.txt", "sitemap.xml"]) {
  await cp(path.join(root, entry), path.join(dist, entry), { recursive: true });
}

const indexHtml = await readFile(path.join(root, "index.html"), "utf8");
await writeFile(path.join(dist, "404.html"), indexHtml);

console.log("Build concluido em dist/.");
