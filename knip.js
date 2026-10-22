// Zoekt per filmpje een knip op een natuurlijke pauze: start bij de eerste spraak, stop bij de laatste stilte voor MAX seconden.
// Gebruik: node knip.js fam-chloe-1.mp4 col-marijke-3.mp4 ...
const { execFileSync, spawnSync } = require("child_process");
const path = require("path");

const MAX = Number(process.env.MAX || 15);

for (const bestand of process.argv.slice(2)) {
  const p = path.join(__dirname, "assets", "video", bestand);
  const duur = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]).toString());
  const uit = spawnSync("ffmpeg", ["-hide_banner", "-i", p, "-af", "silencedetect=noise=-32dB:d=0.45", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const starts = [...uit.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const eindes = [...uit.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);

  // eerste spraak: einde van een stilte die aan het begin staat
  const van = starts[0] !== undefined && starts[0] < 0.3 && eindes[0] ? Math.max(0, eindes[0] - 0.3) : 0;
  let tot = null;
  if (duur - van > MAX + 2) {
    const kandidaten = starts.filter((s) => s > van + 6 && s <= van + MAX);
    tot = kandidaten.length ? kandidaten[kandidaten.length - 1] + 0.2 : van + MAX;
  }
  const lengte = (tot ?? duur) - van;
  console.log(JSON.stringify({ bestand, duur: +duur.toFixed(1), van: +van.toFixed(1), tot: tot && +tot.toFixed(1), lengte: +lengte.toFixed(1) }));
}
