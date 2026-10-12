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

  /* ---- foto's: nog eens terugschalen, anders wordt het bestand te zwaar ---- */
  const fotoMap = path.join(__dirname, "assets", "foto");
  const fotos = {};
  let fotoBytes = 0;
  for (const bestand of fs.readdirSync(fotoMap).sort()) {
    const buffer = await sharp(path.join(fotoMap, bestand))
      .resize(1280, 1280, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toBuffer();
    fotos[bestand] = "data:image/jpeg;base64," + buffer.toString("base64");
    fotoBytes += buffer.length;
  }

  /* ---- audio ---- */
  const audioMap = path.join(__dirname, "assets", "audio");
  const audios = {};
  if (fs.existsSync(audioMap)) {
    for (const bestand of fs.readdirSync(audioMap)) {
      if (!/\.(mp3|m4a|wav|ogg)$/i.test(bestand)) continue;
      const mime = bestand.toLowerCase().endsWith(".wav") ? "audio/wav" : "audio/mpeg";
      audios[bestand] = base64(path.join(audioMap, bestand), mime);
    }
  }

  /* ---- filmpjes blijven los, anders opent het bestand veel te traag ---- */
  const videoMap = path.join(__dirname, "assets", "video");
  let videoBytes = 0;
  for (const bestand of fs.readdirSync(videoMap)) {
    fs.copyFileSync(path.join(videoMap, bestand), path.join(MEDIA, bestand));
    videoBytes += fs.statSync(path.join(videoMap, bestand)).size;
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
