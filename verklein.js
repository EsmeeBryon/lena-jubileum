// Verkleint alle foto's uit _bron/Lena/<thema>/ naar assets/foto/<thema>-01.jpg
// Filmpjes worden gekopieerd naar assets/video/ zonder bewerking.
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const sharp = require("sharp");

const BRON = path.join(__dirname, "_bron", "Lena");
const UIT_FOTO = path.join(__dirname, "assets", "foto");
const UIT_VIDEO = path.join(__dirname, "assets", "video");

// Mapnaam uit de Drive -> korte sleutel die we in content.js gebruiken
const THEMAS = {
  "Vroeger": "vroeger",
  "Events": "events",
  "Grappig": "grappig",
  "Mommy on the loose": "mommy",
  "Familie-collega_s (=geen vrienden)": "familie",
  "Stijlicoon": "stijl",
  "Eten": "eten",
  "Selfies": "selfies",
  "Stem-gezicht van AFAS": "stem",
};

const FOTO_EXT = [".jpg", ".jpeg", ".png", ".heic", ".heif"];
const VIDEO_EXT = [".mp4", ".mov", ".m4v", ".webm"];

function leeg(map) {
  fs.mkdirSync(map, { recursive: true });
  for (const f of fs.readdirSync(map)) fs.unlinkSync(path.join(map, f));
}

// sharp kan de HEIC's van deze iPhones niet decoderen, ffmpeg wel.
function viaFfmpeg(bron) {
  const tijdelijk = path.join(os.tmpdir(), `lena-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", bron, "-frames:v", "1", tijdelijk]);
  const buffer = fs.readFileSync(tijdelijk);
  fs.unlinkSync(tijdelijk);
  return buffer;
}

async function main() {
  leeg(UIT_FOTO);
  leeg(UIT_VIDEO);

  const index = {};
  let fouten = 0;

  for (const [mapnaam, sleutel] of Object.entries(THEMAS)) {
    const map = path.join(BRON, mapnaam);
    if (!fs.existsSync(map)) {
      console.log(`! map niet gevonden: ${mapnaam}`);
      continue;
    }
    const bestanden = fs.readdirSync(map).sort();
    index[sleutel] = { fotos: [], videos: [] };
    let nFoto = 0;
    let nVideo = 0;

    for (const bestand of bestanden) {
      const ext = path.extname(bestand).toLowerCase();
      const bron = path.join(map, bestand);

      if (FOTO_EXT.includes(ext)) {
        const naam = `${sleutel}-${String(++nFoto).padStart(2, "0")}.jpg`;
        try {
          const invoer = ext === ".heic" || ext === ".heif" ? viaFfmpeg(bron) : bron;
          await sharp(invoer)
            .rotate()
            .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
            .jpeg({ quality: 82, mozjpeg: true })
            .toFile(path.join(UIT_FOTO, naam));
          index[sleutel].fotos.push(naam);
        } catch (e) {
          nFoto--;
          fouten++;
          console.log(`! kon ${mapnaam}/${bestand} niet verwerken: ${e.message}`);
        }
      } else if (VIDEO_EXT.includes(ext)) {
        const naam = `${sleutel}-${String(++nVideo).padStart(2, "0")}.mp4`;
        const doel = path.join(UIT_VIDEO, naam);
        const groot = fs.statSync(bron).size > 8 * 1024 * 1024;
        if (ext === ".mp4" && !groot) {
          fs.copyFileSync(bron, doel);
        } else {
          // .mov speelt niet overal af en grote bestanden maken de show traag
          execFileSync("ffmpeg", [
            "-y", "-v", "error", "-i", bron,
            "-vf", "scale='min(1280,iw)':-2",
            "-c:v", "libx264", "-crf", "24", "-preset", "medium",
            "-c:a", "aac", "-b:a", "128k",
            "-movflags", "+faststart", doel,
          ]);
        }
        index[sleutel].videos.push(naam);
      }
    }
    console.log(
      `${sleutel.padEnd(10)} ${String(index[sleutel].fotos.length).padStart(2)} foto's, ` +
      `${index[sleutel].videos.length} filmpje(s)`
    );
  }

  fs.writeFileSync(
    path.join(__dirname, "assets", "index-fotos.json"),
    JSON.stringify(index, null, 2)
  );
  console.log(fouten ? `\nKlaar, met ${fouten} mislukte bestand(en).` : "\nKlaar.");
}

main();
