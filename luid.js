// Zet alle geluid op dezelfde luidheid (-16 LUFS), zodat niets te stil of te luid is.
// Draai opnieuw na `node verklein.js`. Bestanden die al goed zitten, blijven ongemoeid.
//   node luid.js
const fs = require("fs");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");

const DOEL = -16;
const MARGE = 1;

const meetVeilig = (f) => {
  const uit = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", f, "-map", "0:a:0?", "-af", "ebur128", "-f", "null", "-"], {
    encoding: "utf8",
    maxBuffer: 1 << 28,
  }).stderr;
  const m = [...uit.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].pop();
  return m ? parseFloat(m[1]) : null;
};

const bestanden = [
  ...fs.readdirSync("assets/audio").filter((f) => f.endsWith(".mp3")).map((f) => path.join("assets/audio", f)),
  // Filmpjes met geluid dat je hoort (de videomuur speelt zonder geluid)
  ...fs.readdirSync("assets/video").filter((f) => /^(lena|fam|col|stem)-.*\.mp4$|^administratie\.mp4$/.test(f)).map((f) => path.join("assets/video", f)),
];

for (const f of bestanden) {
  const i = meetVeilig(f);
  if (i === null || i < -60) { console.log(`  geen geluid  ${f}`); continue; }
  const winst = DOEL - i;
  if (Math.abs(winst) <= MARGE) { console.log(`  ok  ${i.toFixed(1)}  ${f}`); continue; }

  const tmp = f.replace(/(\.\w+)$/, ".tmp$1");
  const filter = `volume=${winst.toFixed(1)}dB,alimiter=limit=0.95:level=false`;
  const codec = f.endsWith(".mp3")
    ? ["-c:a", "libmp3lame", "-b:a", "192k"]
    : ["-map", "0:v:0", "-map", "0:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart"];
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", f, "-af", filter, ...codec, tmp]);
  fs.copyFileSync(tmp, f);
  fs.unlinkSync(tmp);
  console.log(`  ${i.toFixed(1)} -> ${meetVeilig(f).toFixed(1)}  ${f}`);
}
