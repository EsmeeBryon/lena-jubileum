// Maakt per thema een contactvel in overzicht/ zodat je foto's op naam kan kiezen.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const FOTO = path.join(__dirname, "assets", "foto");
const UIT = path.join(__dirname, "overzicht");

const TEGEL = 300;
const BALK = 34;
const KOLOMMEN = 5;

function label(tekst) {
  const veilig = tekst.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return Buffer.from(
    `<svg width="${TEGEL}" height="${BALK}">
      <rect width="100%" height="100%" fill="#2E2A26"/>
      <text x="${TEGEL / 2}" y="${BALK / 2 + 7}" font-family="Arial" font-size="20"
            fill="#F3EADF" text-anchor="middle">${veilig}</text>
    </svg>`
  );
}

async function vel(thema, bestanden) {
  const rijen = Math.ceil(bestanden.length / KOLOMMEN);
  const breedte = KOLOMMEN * TEGEL;
  const hoogte = rijen * (TEGEL + BALK);

  const lagen = [];
  for (let i = 0; i < bestanden.length; i++) {
    const x = (i % KOLOMMEN) * TEGEL;
    const y = Math.floor(i / KOLOMMEN) * (TEGEL + BALK);
    const mini = await sharp(path.join(FOTO, bestanden[i]))
      .resize(TEGEL, TEGEL, { fit: "cover" })
      .jpeg({ quality: 78 })
      .toBuffer();
    lagen.push({ input: mini, top: y, left: x });
    lagen.push({ input: label(path.basename(bestanden[i], ".jpg")), top: y + TEGEL, left: x });
  }

  await sharp({
    create: { width: breedte, height: hoogte, channels: 3, background: "#F3EADF" },
  })
    .composite(lagen)
    .jpeg({ quality: 80 })
    .toFile(path.join(UIT, `${thema}.jpg`));

  console.log(`overzicht/${thema}.jpg  (${bestanden.length} foto's)`);
}

async function main() {
  fs.mkdirSync(UIT, { recursive: true });
  const alle = fs.readdirSync(FOTO).filter((f) => f.endsWith(".jpg")).sort();
  const perThema = {};
  for (const f of alle) {
    const thema = f.split("-")[0];
    (perThema[thema] ||= []).push(f);
  }
  for (const [thema, bestanden] of Object.entries(perThema)) await vel(thema, bestanden);
}

main();
