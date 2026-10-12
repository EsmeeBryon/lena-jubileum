// Maakt schermafbeeldingen van een paar schermen, handig om de opmaak te controleren.
// Gebruik: node schoten.js 3.1 5.2 9.2
const { execFileSync } = require("child_process");
const fs = require("fs");

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const doelen = process.argv.slice(2);
fs.mkdirSync("schoten", { recursive: true });

for (const d of doelen) {
  const uit = `${process.cwd()}/schoten/${d}.png`;
  execFileSync(EDGE, [
    "--headless=new", "--disable-gpu", "--no-sandbox",
    `--user-data-dir=${process.cwd()}/.edge/${d}`,
    "--window-size=1600,900",
    `--screenshot=${uit}`,
    "--virtual-time-budget=4000",
    `http://localhost:8090/#${d}`,
  ], { stdio: "ignore" });
  console.log(uit);
}
