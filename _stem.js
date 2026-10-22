// Tijdelijk: zoekt waar de stem in de parodie inzet (midden-kanaal min zijkanalen, spraakband).
const { execFileSync } = require("child_process");
const kanaal = (pan) => {
  const b = execFileSync("ffmpeg", ["-v", "error", "-i", "assets/audio/parodie.mp3", "-af", `pan=mono|c0=${pan},highpass=f=250,lowpass=f=3500`, "-ar", "8000", "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
  const s = new Int16Array(b.buffer, b.byteOffset, b.byteLength / 2);
  const env = [];
  for (let i = 0; i + 800 <= s.length; i += 800) { let som = 0; for (let j = i; j < i + 800; j++) som += s[j] * s[j]; env.push(Math.sqrt(som / 800)); }
  return env; // per 0.1 s
};
const mid = kanaal("0.5*c0+0.5*c1");
const side = kanaal("0.5*c0-0.5*c1");
const v = mid.map((m, i) => Math.max(0, 20 * Math.log10((m + 1) / (side[i] + 1))));
// per seconde: stem-verhouding (dB) en totale luidheid
let uit = "";
for (let s = 0; s < v.length / 10; s++) {
  const st = v.slice(s * 10, s * 10 + 10);
  const g = st.reduce((a, b) => a + b, 0) / st.length;
  const l = 20 * Math.log10(mid.slice(s * 10, s * 10 + 10).reduce((a, b) => a + b, 0) / 10 + 1);
  uit += `${String(Math.floor(s / 60))}:${String(s % 60).padStart(2, "0")} ${"#".repeat(Math.round(g))} ${l.toFixed(0)}\n`;
}
require("fs").writeFileSync("schoten/stem.txt", uit);
console.log(v.length / 10, "s");
