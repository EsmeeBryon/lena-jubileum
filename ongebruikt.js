// Contactvel van alle foto's die nog niet in de show zitten: overzicht/ongebruikt.jpg
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SHOW = new Function(fs.readFileSync(path.join(__dirname, "assets/js/content.js"), "utf8") + "\nreturn SHOW;")();
const gebruikt = new Set(SHOW.flatMap((s) => [s.foto, ...(s.fotos || []), ...(s.items || []).map((x) => x.foto)]).filter(Boolean));
const vrij = fs.readdirSync(path.join(__dirname, "assets/foto")).filter((f) => f.endsWith(".jpg") && !gebruikt.has(f)).sort();

const T = 220, B = 26, K = 8;
(async () => {
  const lagen = [];
  for (let i = 0; i < vrij.length; i++) {
    const x = (i % K) * T, y = Math.floor(i / K) * (T + B);
    lagen.push({ input: await sharp(path.join(__dirname, "assets/foto", vrij[i])).resize(T, T, { fit: "cover" }).toBuffer(), left: x, top: y });
    lagen.push({ input: Buffer.from(`<svg width="${T}" height="${B}"><rect width="100%" height="100%" fill="#2A2520"/><text x="${T / 2}" y="18" font-size="15" fill="#fff" text-anchor="middle" font-family="Arial">${vrij[i].replace(".jpg", "")}</text></svg>`), left: x, top: y + T });
  }
  await sharp({ create: { width: K * T, height: Math.ceil(vrij.length / K) * (T + B), channels: 3, background: "#000" } })
    .composite(lagen).jpeg({ quality: 80 }).toFile(path.join(__dirname, "overzicht", "ongebruikt.jpg"));
  console.log(`${vrij.length} ongebruikte foto's`);
})();
