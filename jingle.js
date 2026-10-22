// Maakt het nieuwsmuziekje voor "Breaking news" (zelf gegenereerd, dus vrij van rechten).
//   node jingle.js  ->  assets/audio/nieuws.mp3
const { execFileSync } = require("child_process");

const DUUR = 40;
const noot = (f, start, lengte, verval) =>
  `gte(t,${start})*lt(t,${start + lengte})*(sin(2*PI*${f}*t)+0.3*sin(6*PI*${f}*t))*exp(-(t-${start})*${verval})`;

// Drie korte tonen en een groot akkoord, zoals een journaal-opener
const opener = [
  noot(659.25, 0, 0.14, 14),
  noot(659.25, 0.16, 0.14, 14),
  noot(659.25, 0.32, 0.14, 14),
  ...[220, 329.63, 440, 523.25].map((f) => noot(f, 0.5, 2.5, 2.2)),
].join("+");

// Spannende ondergrond: tikkende klok, basimpuls en een snel arpeggio (Am / F)
const am = "lt(mod(t,4),2)";
const bed = [
  "(2*random(0)-1)*exp(-mod(t,0.25)*90)*0.35",
  `(sin(2*PI*if(${am},55,43.65)*t)+0.4*sin(4*PI*if(${am},55,43.65)*t))*exp(-mod(t,0.5)*5)*0.9`,
  `sin(2*PI*if(${am},if(lt(mod(t,0.5),0.25),880,659.25),if(lt(mod(t,0.5),0.25),698.46,523.25))*t)*exp(-mod(t,0.25)*12)*0.22`,
  `0.06*(sin(2*PI*if(${am},220,174.61)*t)+sin(2*PI*if(${am},261.63,220)*t)+sin(2*PI*if(${am},329.63,261.63)*t))`,
].join("+");

const expr = `0.18*((${opener})*0.6+gte(t,0.5)*min(1,(t-0.5)/1.5)*(${bed}))`;

execFileSync("ffmpeg", [
  "-v", "error", "-y",
  "-f", "lavfi", "-i", `aevalsrc=exprs='${expr}':s=44100:d=${DUUR}`,
  "-af", `highpass=f=35,aecho=0.8:0.5:90:0.2,afade=t=out:st=${DUUR - 4}:d=4`,
  "-ac", "2", "-c:a", "libmp3lame", "-b:a", "160k",
  "assets/audio/nieuws.mp3",
]);
console.log("assets/audio/nieuws.mp3 gemaakt");
