// Maakt ingezoomde versies van foto's (naam-zoom.jpg). Draai opnieuw na `node verklein.js`.
//   node uitsnede.js
const sharp = require("sharp");

// links, boven, rechts, onder als deel van de foto (0 tot 1)
const UITSNEDES = {
  "stijl-01": [0.22, 0.45, 0.82, 0.95],
  "stijl-02": [0.08, 0.18, 0.62, 1],
  "stijl-03": [0.38, 0.06, 1, 0.98],
  "stijl-04": [0.43, 0.3, 0.71, 1],
  "stijl-06": [0.35, 0.35, 1, 1],
  "stijl-07": [0.45, 0.42, 0.92, 0.82],
  "events-08": [0.15, 0.15, 0.85, 1],
};

(async () => {
  for (const [naam, [l, b, r, o]] of Object.entries(UITSNEDES)) {
    const bron = `assets/foto/${naam}.jpg`;
    const { width: w, height: h } = await sharp(bron).metadata();
    await sharp(bron)
      .extract({ left: Math.round(l * w), top: Math.round(b * h), width: Math.round((r - l) * w), height: Math.round((o - b) * h) })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(`assets/foto/${naam}-zoom.jpg`);
    console.log(`assets/foto/${naam}-zoom.jpg`);
  }
})();
