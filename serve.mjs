// Minimal static server for the generated site. Usage: node serve.mjs [port]
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, normalize, extname } from "node:path";

const root = join(import.meta.dirname, "site");
const port = Number(process.argv[2]) || 8123;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let filePath = normalize(join(root, urlPath));
    if (!filePath.startsWith(root)) throw new Error("traversal");
    if (urlPath.endsWith("/")) filePath = join(filePath, "index.html");
    const data = await readFile(filePath);
    res.writeHead(200, { "content-type": types[extname(filePath)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404");
  }
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
