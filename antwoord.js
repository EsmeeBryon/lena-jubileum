// Knipt enkel het antwoord uit een filmpje (zonder de vraag) en zet de stem op hetzelfde volume als de rest.
// Draai opnieuw na `node verklein.js familie`.
//   node antwoord.js  ->  assets/video/<naam>-antwoord.mp4
const { execFileSync, spawnSync } = require("child_process");

// bron, van, tot in seconden
const ANTWOORDEN = {
  "fam-billie-rose-1": [7.8, 15.1],
  "col-marijke-1": [4.6, 8.9],
  "col-marijke-3": [5.6, 20.2],
  "col-lynn-1": [4.85, 23.75],
  "fam-billie-rose-3": [5.8, 42.6],
};
const DOEL = -16;

const meet = (f) => {
  const uit = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", f, "-map", "0:a:0", "-af", "ebur128", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  return parseFloat([...uit.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].pop()[1]);
};

for (const [naam, [van, tot]] of Object.entries(ANTWOORDEN)) {
  const bron = `assets/video/${naam}.mp4`;
  const tmp = `assets/video/${naam}-antwoord.tmp.mp4`;
  const uit = `assets/video/${naam}-antwoord.mp4`;
  // speechnorm tilt zachte stemmen op zonder de achtergrond mee te laten domineren
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-ss", String(van), "-to", String(tot), "-i", bron,
    "-af", "highpass=f=90,speechnorm=e=6:r=0.0005:l=1,afade=t=in:d=0.15",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "22", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", tmp,
  ]);
  const winst = DOEL - meet(tmp);
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-i", tmp, "-c:v", "copy",
    "-af", `volume=${winst.toFixed(1)}dB,alimiter=limit=0.95:level=false`, "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", uit,
  ]);
  require("fs").unlinkSync(tmp);
  console.log(`${uit}  ${(tot - van).toFixed(1)} s  ${meet(uit).toFixed(1)} LUFS`);
}
