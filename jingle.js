// Maakt het achtergrondmuziekje voor "Breaking news", in de sfeer van een journaal (zelf gegenereerd, vrij van rechten).
//   node jingle.js  ->  assets/audio/nieuws.mp3  (daarna node luid.js)
const { execFileSync } = require("child_process");

const DUUR = 45;
// Akkoorden per 2 maten (4 s bij 120 bpm): Am, F, C, G
const akk = (a, f, c, g) => `if(lt(mod(t,16),4),${a},if(lt(mod(t,16),8),${f},if(lt(mod(t,16),12),${c},${g})))`;
const laag = akk(55, 43.65, 65.41, 49);
const pad = [akk(220, 174.61, 261.63, 196), akk(261.63, 220, 329.63, 246.94), akk(329.63, 261.63, 392, 293.66)];
const puls = akk(440, 349.23, 523.25, 392);

const lagen = [
  // tikkende klok op de zestienden, zacht
  "(2*random(0)-1)*exp(-mod(t,0.125)*140)*0.12",
  // pulserende synth op de achtsten
  `sin(2*PI*${puls}*t)*exp(-mod(t,0.25)*16)*0.16`,
  // diepe pauk aan het begin van elke maat
  "sin(2*PI*(50+40*exp(-mod(t,2)*20))*mod(t,2))*exp(-mod(t,2)*4)*0.7",
  // basimpuls op elke tel
  `sin(2*PI*${laag}*t)*exp(-mod(t,0.5)*4)*0.5`,
  // strijkers als tapijt, zwellen elke maat aan
  `(${pad.map((f) => `sin(2*PI*${f}*t)+0.3*sin(4*PI*${f}*t)`).join("+")})*(0.05+0.03*sin(PI*mod(t,2)/2))`,
].join("+");

execFileSync("ffmpeg", [
  "-v", "error", "-y",
  "-f", "lavfi", "-i", `aevalsrc=exprs='0.25*(${lagen})':s=44100:d=${DUUR}`,
  "-af", `highpass=f=35,lowpass=f=6000,aecho=0.8:0.6:110:0.25,afade=t=in:d=1.5,afade=t=out:st=${DUUR - 4}:d=4`,
  "-ac", "2", "-c:a", "libmp3lame", "-b:a", "160k",
  "assets/audio/nieuws.mp3",
]);
console.log("assets/audio/nieuws.mp3 gemaakt");
