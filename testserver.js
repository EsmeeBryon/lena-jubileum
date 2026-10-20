// Kleine testserver op poort 8090 om de presentatie lokaal te bekijken.
const http = require("http");
const fs = require("fs");
const path = require("path");

const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg",
  ".png": "image/png", ".mp4": "video/mp4", ".woff2": "font/woff2", ".mp3": "audio/mpeg", ".json": "application/json",
};
const ROOT = __dirname;

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const bestand = path.join(ROOT, p);
  if (!bestand.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.stat(bestand, (err, st) => {
    if (err) { res.writeHead(404); return res.end(); }
    const type = TYPES[path.extname(bestand).toLowerCase()] || "application/octet-stream";
    // Range-ondersteuning, anders kan de browser niet springen in filmpjes (#t=)
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || "");
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const eind = range[2] ? Number(range[2]) : st.size - 1;
      res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${eind}/${st.size}`, "Accept-Ranges": "bytes", "Content-Length": eind - start + 1 });
      return fs.createReadStream(bestand, { start, end: eind }).pipe(res);
    }
    res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Accept-Ranges": "bytes" });
    fs.createReadStream(bestand).pipe(res);
  });
}).listen(8090, () => console.log("http://localhost:8090"));
