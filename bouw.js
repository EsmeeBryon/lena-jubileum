// Bouwt de map Lena-show/ met daarin één HTML-bestand en de filmpjes ernaast.
// Foto's, audio, lettertypes en code zitten in het HTML-bestand zelf.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const UIT = path.join(__dirname, "Lena-show");
const MEDIA = path.join(UIT, "media");

const lees = (p) => fs.readFileSync(path.join(__dirname, p), "utf8");
const base64 = (p, mime) =>
  `data:${mime};base64,` + fs.readFileSync(p).toString("base64");

async function main() {
  fs.rmSync(UIT, { recursive: true, force: true });
  fs.mkdirSync(MEDIA, { recursive: true });

  const SHOW = new Function(lees("assets/js/content.js") + "\nreturn SHOW;")();

  /* ---- foto's: enkel de gebruikte, nog eens teruggeschaald ---- */
  const fotoMap = path.join(__dirname, "assets", "foto");
  const gebruikt = new Set(
    SHOW.flatMap((s) => [s.foto, ...(s.fotos || []), ...(s.extra || []), ...(s.items || []).map((x) => x.foto)]).filter(Boolean)
  );
  const fotos = {};
  let fotoBytes = 0;
  for (const bestand of [...gebruikt].sort()) {
    if (!fs.existsSync(path.join(fotoMap, bestand))) { console.log(`! foto bestaat niet: ${bestand}`); continue; }
    const buffer = await sharp(path.join(fotoMap, bestand))
      .resize(1280, 1280, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toBuffer();
    fotos[bestand] = "data:image/jpeg;base64," + buffer.toString("base64");
    fotoBytes += buffer.length;
  }

  /* ---- audio: korte fragmenten ingebakken, lange (de parodie) als los bestand ---- */
  const audioMap = path.join(__dirname, "assets", "audio");
  const audios = {};
  const gebruikteAudio = new Set(SHOW.flatMap((s) => [(s.type === "audio" || s.type === "karaoke") && s.bestand, s.muziek]).filter(Boolean));
  if (fs.existsSync(audioMap)) {
    for (const bestand of fs.readdirSync(audioMap)) {
      if (!gebruikteAudio.has(bestand)) continue;
      const bron = path.join(audioMap, bestand);
      if (fs.statSync(bron).size > 2 * 1024 * 1024) {
        fs.copyFileSync(bron, path.join(MEDIA, bestand));
        audios[bestand] = "media/" + bestand;
        continue;
      }
      const mime = bestand.toLowerCase().endsWith(".wav") ? "audio/wav" : "audio/mpeg";
      audios[bestand] = base64(bron, mime);
    }
  }

  /* ---- filmpjes blijven los, anders opent het bestand veel te traag ---- */
  const nodig = new Set(SHOW.flatMap((s) => [s.clip, s.type === "video" && s.bestand, ...(s.videos || [])]).filter(Boolean));
  const videoMap = path.join(__dirname, "assets", "video");
  let videoBytes = 0;
  for (const bestand of nodig) {
    const bron = path.join(videoMap, bestand);
    if (!fs.existsSync(bron)) { console.log(`! filmpje ontbreekt nog: ${bestand}`); continue; }
    fs.copyFileSync(bron, path.join(MEDIA, bestand));
    videoBytes += fs.statSync(bron).size;
  }

  /* ---- lettertypes in de stijl bakken ---- */
  let css = lees("assets/css/style.css").replace('@import url("fonts.css");', "");
  let fontCss = lees("assets/css/fonts.css");
  for (const bestand of fs.readdirSync(path.join(__dirname, "assets", "font"))) {
    fontCss = fontCss.replace(
      `../font/${bestand}`,
      base64(path.join(__dirname, "assets", "font", bestand), "font/woff2")
    );
  }

  /* ---- alles samenvoegen ---- */
  const html = lees("index.html")
    .replace(
      '<link rel="stylesheet" href="assets/css/style.css">',
      `<style>\n${fontCss}\n${css}\n</style>`
    )
    .replace(
      '<script src="assets/js/content.js"></script>',
      `<script>\nwindow.FOTOS = ${JSON.stringify(fotos)};\n` +
        `window.AUDIOS = ${JSON.stringify(audios)};\n` +
        `window.VIDEOPAD = "media/";\n</script>\n<script>\n${lees("assets/js/content.js")}\n</script>`
    )
    .replace(
      '<script src="assets/js/main.js"></script>',
      `<script>\n${lees("assets/js/main.js")}\n</script>`
    );

  fs.writeFileSync(path.join(UIT, "Lena-show.html"), html);

  const mb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";
  console.log(`Lena-show/Lena-show.html   ${mb(Buffer.byteLength(html))}`);
  console.log(`  foto's ingebakken        ${Object.keys(fotos).length} (${mb(fotoBytes)})`);
  console.log(`  audio ingebakken         ${Object.keys(audios).length}`);
  console.log(`Lena-show/media/           ${fs.readdirSync(MEDIA).length} filmpjes (${mb(videoBytes)})`);
  console.log("\nKopieer de hele map Lena-show naar de USB-stick.");
}

main();
