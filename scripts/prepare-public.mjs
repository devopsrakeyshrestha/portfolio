import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "public");

const copyFile = (name) => cpSync(join(root, name), join(out, name));

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const file of ["index.html", "404.html", "robots.txt", "sitemap.xml"]) {
  copyFile(file);
}

for (const dir of ["assets", "js"]) {
  cpSync(join(root, dir), join(out, dir), { recursive: true });
}

mkdirSync(join(out, "css"), { recursive: true });
cpSync(join(root, "css", "styles.css"), join(out, "css", "styles.css"));

console.log("Prepared public/ for deployment");
