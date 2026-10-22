// Maakt Spiekbriefje.html: het gesproken script per scherm, klaar om af te drukken.
const fs = require("fs");
const path = require("path");

const bron = fs.readFileSync(path.join(__dirname, "assets", "js", "content.js"), "utf8");
const SHOW = new Function(bron + "\nreturn SHOW;")();

const ontsnap = (t) =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const alinea = (t) =>
  ontsnap(t)
    .split("\n\n")
    .map((s) => `<p>${s.replace(/\n/g, "<br>").replace(/\[([^\]]+)\]/g, (_, r) =>
      /^KLIK/.test(r) ? `<b class='klik'>[${r}]</b>` : `<i class='regie'>[${r}]</i>`)}</p>`)
    .join("");

/* ---- tijdsinschatting: spreektempo, mediaduur en tijd voor de zaal ---- */
const { execFileSync } = require("child_process");
const mediaduur = (map, bestand) => {
  const p = path.join(__dirname, "assets", map, bestand);
  if (!fs.existsSync(p)) return 0;
  try { return parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]).toString()) || 0; }
  catch { return 0; }
};
function duur(s) {
  const gesproken = (s.script || "").replace(/\[[^\]]*\]/g, " ").split(/\s+/).filter(Boolean).length / 2.4;
  let media = 0;
  if (s.clip) media = mediaduur("video", s.clip);
  if (s.type === "video") media = s.tot != null ? s.tot - (s.van || 0) : mediaduur("video", s.bestand) - (s.van || 0);
  if (s.type === "audio" || s.type === "karaoke") media = s.tot != null ? s.tot - (s.van || 0) : mediaduur("audio", s.bestand);
  if (s.type === "reeks") media = s.items.length * 2.6;
  if (s.type === "muur") media = 12;
  const zaal = /handen|rechtstaan|laten antwoorden|roepen|applaus|lachen/i.test(s.script || "") ? 12 : 0;
  return Math.round(gesproken + media + zaal + 3);
}
const mmss = (t) => `${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, "0")}`;
const duren = SHOW.map(duur);
const lopend = duren.map((_, i) => duren.slice(0, i + 1).reduce((a, b) => a + b, 0));
const totaal = lopend[lopend.length - 1];

// Korte omschrijving van wat de zaal op dat moment ziet
function opScherm(s) {
  switch (s.type) {
    case "titel": return `Titelbeeld: ${s.titel} &middot; ${s.jaren}`;
    case "deel": return `Rondekaart ${s.nummer}: ${s.titel}`;
    case "citaat": return `Citaat: &ldquo;${s.tekst}&rdquo;` + (s.naklap ? ` &rarr; ${s.naklap}` : "");
    case "vraag": return `Vraag aan de zaal: ${s.vraag}`;
    case "hoofdstuk": return `Fragment ${s.clip} (&ldquo;${s.zin}&rdquo;)` + (s.titel ? `, titel &ldquo;${s.titel}&rdquo;` : "") + (s.grap ? `, daarna &ldquo;${s.grap}&rdquo;` : "");
    case "kaart": return `Grote tekst: &ldquo;${s.kop}&rdquo;` + (s.clou ? ` &rarr; ${s.clou}` : "");
    case "reeks": return `Fotostapel${s.kop ? ` &ldquo;${s.kop}&rdquo;` : ""}, ${s.items.length} foto's`;
    case "verhaal": return `${s.video ? `Gifje ${s.video}` : `Foto ${s.foto}`} met het verhaal &ldquo;${s.kop}&rdquo;`;
    case "foto": return `Foto ${s.foto}` + (s.kop ? ` met de tekst &ldquo;${s.kop}&rdquo;` : "");
    case "collage": return `Collage van ${(s.items || s.fotos).length} foto's`;
    case "audio": return `Audiofragment ${s.bestand}` + (s.regels ? `, met ${s.regels.length} uitspraken` : "");
    case "video": return `Filmpje ${s.bestand}`;
    case "liedje": return `Songtekst, ${s.regels.length} regels`;
    case "lijst": return `Titel &ldquo;${s.kop}&rdquo; met ${s.regels.length} zinnen`;
    case "slot": return `Slotbeeld: ${s.kop}`;
    case "muur": return `Videomuur &ldquo;${s.kop}&rdquo; met ${s.videos.length} filmpjes zonder geluid`;
    case "karaoke": return `Liedje met songtekst (${s.regels.length} regels) en een diavoorstelling van ${s.fotos.length} foto's`;
    case "nieuws": return `Breaking news: &ldquo;${s.kop}&rdquo;, foto ${s.foto}, lopende band onderaan` + (s.muziek ? ", nieuwsmuziekje zachtjes eronder" : "");
    case "film": return `Filmaffiche &ldquo;${s.kop}&rdquo;, foto ${s.foto}`;
    default: return s.type;
  }
}

function stappen(s) {
  const basis = stappenZonderStempel(s);
  if (!s.stempel) return basis;
  return (basis || ["scherm staat er"]).concat(`KLIK: stempel &ldquo;${s.stempel}&rdquo;`);
}

function stappenZonderStempel(s) {
  if (s.type === "vraag") return s.antwoord ? ["vraag staat op het scherm", `antwoord: ${s.antwoord}`] : null;
  if (s.type === "hoofdstuk") return ["fragment speelt vanzelf"].concat(s.grap ? [`daarna vanzelf: ${s.grap}`] : s.stempel ? ["de stempel komt vanzelf na het fragment"] : []);
  if (s.type === "reeks") return ["de foto's vallen vanzelf op de stapel"].concat(s.items.map((x) => `${x.foto}: ${x.tekst || ""}`));
  if (s.type === "verhaal") return ["foto en titel"].concat(s.tekst || [], s.clou ? [`clou: ${s.clou}`] : []);
  if (s.type === "video" && s.onder) return ["filmpje speelt", `onderschrift: ${s.onder}`];
  if (s.type === "collage") return [s.auto === "klik" ? "KLIK: alle foto's verschijnen vanzelf na elkaar" : "de foto's verschijnen vanzelf"].concat(s.bijschrift ? [`KLIK: ${s.bijschrift}`] : []);
  if (s.type === "nieuws") return ["nieuwsflash staat er"].concat(s.clou ? [`KLIK: ${s.clou}`] : []);
  if (s.type === "liedje" || s.type === "lijst") return s.regels.map((r) => `regel: ${r.tekst}`);
  if (s.type === "audio") return ["fragment start"].concat((s.regels || []).map((r) => `zin erbij: ${r}`));
  if (s.type === "citaat") return ["citaat staat er", s.naklap ? `naklap: ${s.naklap}` : null].filter(Boolean);
  return null;
}

const kaarten = SHOW.map((s, i) => {
  return `
  <article class="kaart">
    <header>
      <span class="nr">${String(i + 1).padStart(2, "0")}</span>
      <span class="wie">${ontsnap(s.spreker || "—")}</span>
      <span class="type">${ontsnap(s.type)}</span>
      <span class="tijd">± ${mmss(duren[i])} &middot; tot ${mmss(lopend[i])}</span>
    </header>
    <p class="scherm"><b>Op het scherm</b> ${opScherm(s)}</p>
    <div class="script">${alinea(s.script || "")}</div>
    ${s.nazien ? `<p class="nazien"><b>Nog te doen</b> ${ontsnap(s.nazien)}</p>` : ""}
  </article>`;
}).join("");

const sprekers = [...new Set(SHOW.map((s) => s.spreker).filter((s) => s && s !== "—"))];
const teDoen = SHOW.map((s, i) => (s.nazien ? `<li><b>Scherm ${i + 1}</b> ${ontsnap(s.nazien)}</li>` : "")).join("");

const html = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<title>Spiekbriefje &middot; Lena 12,5 jaar</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body { font: 10.5pt/1.5 "Segoe UI", system-ui, sans-serif; color: #2a2520; max-width: 182mm; margin: 0 auto; padding: 10mm; background: #fff; }
  h1 { font-size: 24pt; margin: 0 0 2mm; letter-spacing: -0.02em; }
  .lead { color: #6b5f52; margin: 0 0 6mm; }
  .uitleg { border: 1px solid #e3d9cb; background: #faf5ee; border-radius: 3mm; padding: 4mm 5mm; margin-bottom: 6mm; }
  .uitleg h2, .lijstje h2 { font-size: 11pt; margin: 0 0 2mm; text-transform: uppercase; letter-spacing: .1em; color: #c4613c; }
  .uitleg dl { display: grid; grid-template-columns: auto 1fr; gap: 1mm 5mm; margin: 0; }
  .uitleg dt { font-weight: 600; }
  .uitleg dd { margin: 0; color: #6b5f52; }
  .lijstje { border-left: 3px solid #d9a441; padding-left: 4mm; margin-bottom: 8mm; }
  .lijstje ul { margin: 0; padding-left: 4mm; }
  .kaart { break-inside: avoid; border-top: 1px solid #e3d9cb; padding: 4mm 0 5mm; }
  .kaart header { display: flex; align-items: baseline; gap: 4mm; margin-bottom: 2mm; }
  .nr { font-size: 16pt; font-weight: 700; color: #c4613c; }
  .tijd { margin-left: auto; font-size: 9pt; color: #9c8b79; }
  .totaal { font-weight: 700; }
  .te-lang { color: #c8102e; }
  .wie { font-weight: 600; }
  .type { font-size: 8.5pt; text-transform: uppercase; letter-spacing: .12em; color: #9c8b79; }
  .scherm { margin: 0 0 2mm; color: #6b5f52; }
  .scherm b, .nazien b { color: #2a2520; }
  .klikken { margin: 0 0 3mm; padding-left: 6mm; color: #6b5f52; font-size: 9.5pt; }
  .script p { margin: 0 0 2mm; }
  .script { border-left: 3px solid #7e8f6e; padding-left: 4mm; }
  .klik { color: #c4613c; }
  .regie { color: #9c8b79; }
  .script { font-size: 11.5pt; line-height: 1.6; }
  .nazien { margin: 3mm 0 0; background: #fdf1e6; border-radius: 2mm; padding: 2mm 3mm; font-size: 9.5pt; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>

<h1>Spiekbriefje</h1>
<p class="lead">Jubileumshow voor Lena &middot; ${SHOW.length} schermen &middot; sprekers: ${sprekers.join(", ")}<br>
<span class="totaal ${totaal > 900 ? "te-lang" : ""}">Geschatte duur: ${mmss(totaal)} (maximum 15:00)</span> &middot; ruwe schatting, klok het bij de repetitie met T</p>

<div class="uitleg">
  <h2>Besturing van de presentatie</h2>
  <dl>
    <dt>&rarr; of spatie of de klikker</dt><dd>volgende stap</dd>
    <dt>&larr; of backspace</dt><dd>een stap terug</dd>
    <dt>B</dt><dd>scherm op zwart, elke toets haalt het terug</dd>
    <dt>F</dt><dd>volledig scherm aan of uit</dd>
    <dt>T</dt><dd>klok tonen, wordt rood na vijftien minuten</dd>
    <dt>N</dt><dd>schermnummer linksonder tonen of verbergen</dd>
    <dt>G</dt><dd>springen naar een schermnummer</dd>
  </dl>
</div>

${teDoen ? `<div class="lijstje"><h2>Nog te doen</h2><ul>${teDoen}</ul></div>` : ""}

${kaarten}

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "Spiekbriefje.html"), html);
console.log(`Spiekbriefje.html gemaakt, ${SHOW.length} schermen.`);
