/* Slide-engine voor de jubileumshow. Alle tekst staat in content.js. */

(function () {
  "use strict";

  const podium = document.getElementById("podium");
  const balk = document.getElementById("voortgangBalk");
  const klokEl = document.getElementById("klok");
  const nummerEl = document.getElementById("nummer");
  const zwartEl = document.getElementById("zwart");
  const hulpEl = document.getElementById("hulp");
  const springEl = document.getElementById("spring");
  const springIn = document.getElementById("springNaar");

  const FOTOS = window.FOTOS || null;
  const VIDEOPAD = window.VIDEOPAD || "assets/video/";
  const AUDIOS = window.AUDIOS || null;

  let index = 0;
  let stap = 0;
  let huidig = null;
  let gestart = null;
  let klokAan = false;

  const fotoPad = (b) => (FOTOS && FOTOS[b]) || "assets/foto/" + b;
  const audioPad = (b) => (AUDIOS && AUDIOS[b]) || "assets/audio/" + b;

  function el(tag, klasse, tekst) {
    const n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (tekst != null) n.textContent = tekst;
    return n;
  }

  function stapEl(tag, klasse, tekst, nr) {
    const n = el(tag, klasse, tekst);
    n.dataset.stap = nr;
    return n;
  }

  function fotolijst(bestand, hoogte) {
    const lijst = el("div", "lijst");
    const img = el("img");
    img.src = fotoPad(bestand);
    img.alt = "";
    if (hoogte) img.style.maxHeight = hoogte;
    lijst.appendChild(img);
    return lijst;
  }

  /* ------------------------------------------------------------- confetti */

  const doek = document.getElementById("confetti");
  const ctx = doek.getContext("2d");
  const KLEUREN = ["#C4613C", "#D9A441", "#7E8F6E", "#9C7355", "#FBF6EF"];
  let snippers = [];
  let loopt = false;
  const rustig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function maatDoek() {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    doek.width = innerWidth * d;
    doek.height = innerHeight * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  maatDoek();
  addEventListener("resize", maatDoek);

  function confetti(aantal, x, y, kracht) {
    if (rustig) return;
    x = x == null ? innerWidth / 2 : x;
    y = y == null ? innerHeight / 2 : y;
    kracht = kracht || 1;
    for (let i = 0; i < aantal; i++) {
      snippers.push({
        x, y,
        vx: (Math.random() - 0.5) * 13 * kracht,
        vy: (Math.random() * -9 - 3) * kracht,
        g: 0.26 + Math.random() * 0.14,
        b: 5 + Math.random() * 7,
        h: 7 + Math.random() * 10,
        hoek: Math.random() * Math.PI,
        draai: (Math.random() - 0.5) * 0.3,
        kleur: KLEUREN[(Math.random() * KLEUREN.length) | 0],
        leven: 1,
      });
    }
    if (!loopt) { loopt = true; requestAnimationFrame(teken); }
  }

  function confettiRegen(ms) {
    if (rustig) return;
    const eind = performance.now() + ms;
    (function puls() {
      if (performance.now() > eind) return;
      confetti(10, Math.random() * innerWidth, -20, 0.5);
      setTimeout(puls, 150);
    })();
  }

  function teken() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    snippers = snippers.filter((s) => s.leven > 0 && s.y < innerHeight + 60);
    for (const s of snippers) {
      s.vy += s.g;
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.99;
      s.hoek += s.draai;
      if (s.y > innerHeight * 0.75) s.leven -= 0.012;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.hoek);
      ctx.globalAlpha = Math.max(0, s.leven);
      ctx.fillStyle = s.kleur;
      ctx.fillRect(-s.b / 2, -s.h / 2, s.b, s.h);
      ctx.restore();
    }
    if (snippers.length) requestAnimationFrame(teken);
    else { loopt = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }

  /* ---------------------------------------------------------- schermbouwers */

  const bouwers = {

    titel(s) {
      const v = el("section", "scherm s-titel");
      v.appendChild(el("div", "cirkel"));
      if (s.kicker) v.appendChild(stapEl("p", "kicker", s.kicker, 0));
      v.appendChild(stapEl("h1", null, s.titel, 0));
      if (s.jaren) v.appendChild(stapEl("p", "jaren", s.jaren, 0));
      if (s.onder) v.appendChild(stapEl("p", "onder", s.onder, 1));
      return { v };
    },

    deel(s) {
      const v = el("section", "scherm s-deel");
      v.appendChild(el("div", "nummer", s.nummer));
      v.appendChild(stapEl("p", "kicker", "Ronde " + s.nummer, 0));
      v.appendChild(stapEl("h2", null, s.titel, 0));
      v.appendChild(stapEl("div", "streep", "", 1));
      if (s.onder) v.appendChild(stapEl("p", "onder", s.onder, 1));
      return { v };
    },

    citaat(s) {
      const v = el("section", "scherm s-citaat");
      v.appendChild(stapEl("blockquote", null, s.tekst, 0));
      if (s.bron) v.appendChild(stapEl("p", "bron", s.bron, 0));
      if (s.naklap) v.appendChild(stapEl("p", "groot", s.naklap, 1));
      return { v };
    },

    // Grote tekst, optioneel met een regel die er pas na een klik bij komt.
    kaart(s) {
      const v = el("section", "scherm s-kaart");
      if (s.kicker) v.appendChild(stapEl("p", "kicker", s.kicker, 0));
      v.appendChild(stapEl("h2", "kaartkop", s.kop, 0));
      if (s.onder) v.appendChild(stapEl("p", "onder", s.onder, 0));
      if (s.clou) v.appendChild(stapEl("p", "antwoord", s.clou, 1));
      return { v };
    },

    // Een open vraag aan de hele zaal. Geen keuzes, geen winnaar.
    vraag(s) {
      const v = el("section", "scherm s-vraag" + (s.foto ? " met-foto" : ""));
      if (s.foto) {
        const f = fotolijst(s.foto);
        f.dataset.stap = 0;
        v.appendChild(f);
      }
      const tekst = el("div", "vraagkolom");
      tekst.appendChild(stapEl("p", "kicker", s.kicker || "Vraag aan de zaal", 0));
      tekst.appendChild(stapEl("h2", "vraagtekst", s.vraag, 0));
      if (s.antwoord) tekst.appendChild(stapEl("p", "antwoord", s.antwoord, 1));
      v.appendChild(tekst);
      return { v };
    },

    // Fragment van Lena zelf; speelt meteen. Na afloop verschijnt wat er nog komt (grap of stempel).
    hoofdstuk(s) {
      const v = el("section", "scherm s-hoofdstuk");
      if (s.titel) v.appendChild(stapEl("h2", "hoofdstuktitel", s.titel, 0));

      const lijst = el("div", "lijst clip");
      lijst.dataset.stap = 0;
      const film = document.createElement("video");
      film.src = VIDEOPAD + s.clip;
      film.playsInline = true;
      film.preload = "auto";
      lijst.appendChild(film);
      v.appendChild(lijst);

      if (s.grap) v.appendChild(stapEl("p", "hoofdstukgrap", s.grap, 1));
      film.addEventListener("ended", () => naarStap(v, maxStap(v)));
      return {
        v,
        bijStap(n) {
          if (n === 0) { film.currentTime = 0; film.play().catch(() => {}); }
        },
        weg() { film.pause(); },
      };
    },

    // Filmpjes zonder geluid die door elkaar blijven lopen, met een titel erover.
    muur(s) {
      const v = el("section", "scherm s-muur");
      const raster = el("div", "videomuur");
      raster.style.setProperty("--kolommen", Math.ceil(s.videos.length / 2));
      const films = s.videos.map((b, i) => {
        const vak = el("div", "vak");
        vak.dataset.stap = 0;
        vak.style.transitionDelay = i * 0.25 + "s";
        const film = document.createElement("video");
        film.src = VIDEOPAD + b;
        film.muted = true;
        film.loop = true;
        film.playsInline = true;
        film.preload = "auto";
        vak.appendChild(film);
        raster.appendChild(vak);
        return film;
      });
      v.appendChild(raster);
      v.appendChild(el("div", "muursluier"));
      v.appendChild(stapEl("h1", "muurtitel", s.kop, 0));
      return {
        v,
        bijStap(n) { if (n === 0) films.forEach((f) => f.play().catch(() => {})); },
        weg() { films.forEach((f) => f.pause()); },
      };
    },

    // Nieuwsflash met lopende band onderaan.
    nieuws(s) {
      const v = el("section", "scherm s-nieuws");
      const balk = el("div", "nieuwsbalk");
      balk.appendChild(el("span", "nieuwslabel", s.label || "Breaking news"));
      balk.appendChild(el("span", "nieuwslive", "Live"));
      v.appendChild(balk);
      const midden = el("div", "nieuwsmidden");
      const f = fotolijst(s.foto);
      midden.appendChild(f);
      const kolom = el("div", "nieuwskolom");
      kolom.appendChild(stapEl("h2", "nieuwskop", s.kop, 0));
      if (s.clou) kolom.appendChild(stapEl("p", "antwoord", s.clou, 1));
      midden.appendChild(kolom);
      v.appendChild(midden);
      const band = el("div", "nieuwsband");
      const tekst = el("div", "nieuwsbandtekst");
      tekst.textContent = Array(6).fill(s.band.join("   +++   ")).join("   +++   ");
      band.appendChild(tekst);
      v.appendChild(band);
      return { v };
    },

    // Filmaffiche, voor een waargebeurd verhaal.
    film(s) {
      const v = el("section", "scherm s-film");
      const f = fotolijst(s.foto);
      f.dataset.stap = 0;
      v.appendChild(f);
      const kolom = el("div", "filmkolom");
      kolom.appendChild(stapEl("p", "filmkicker", s.kicker || "Gebaseerd op waargebeurde feiten", 0));
      kolom.appendChild(stapEl("h1", "filmtitel", s.kop, 0));
      if (s.rollen) kolom.appendChild(stapEl("p", "filmrollen", s.rollen, 0));
      v.appendChild(kolom);
      return { v };
    },

    // Foto's die een voor een op een stapel vallen, elk met een eigen onderschrift.
    reeks(s) {
      const v = el("section", "scherm s-reeks");
      if (s.kop) v.appendChild(stapEl("h2", "reekskop", s.kop, 0));
      const stapel = el("div", "stapel");
      const onder = el("div", "reeksonder");
      const draai = [-3.5, 2.8, -1.6, 3.6, -2.6, 1.4, -3, 2.2];
      s.items.forEach((item, i) => {
        const p = el("div", "polaroid");
        p.dataset.stap = i + 1;
        p.style.setProperty("--draai", draai[i % draai.length] + "deg");
        p.style.setProperty("--schuif", (i % 2 ? 1 : -1) * Math.min(i, 3) * 1.2 + "vw");
        const img = el("img");
        img.src = fotoPad(item.foto);
        img.alt = "";
        p.appendChild(img);
        stapel.appendChild(p);
        if (item.tekst) {
          const t = el("p", "reekstekst", item.tekst);
          t.dataset.stap = i + 1;
          t.dataset.alleen = "";
          onder.appendChild(t);
        }
      });
      v.appendChild(stapel);
      v.appendChild(onder);
      // De stapel loopt vanzelf; klikken mag om sneller te gaan.
      let wekker = null;
      return {
        v,
        bijStap(n) {
          clearTimeout(wekker);
          if (n < s.items.length) wekker = setTimeout(() => naarStap(v, n + 1), n === 0 ? 700 : 2600);
        },
        weg() { clearTimeout(wekker); },
      };
    },

    // Foto links, verhaal rechts.
    verhaal(s) {
      const v = el("section", "scherm s-verhaal");
      const f = fotolijst(s.foto);
      f.dataset.stap = 0;
      v.appendChild(f);
      const kolom = el("div", "verhaalkolom");
      if (s.kicker) kolom.appendChild(stapEl("p", "kicker", s.kicker, 0));
      if (s.kop) kolom.appendChild(stapEl("h2", null, s.kop, 0));
      (s.tekst || []).forEach((t, i) => kolom.appendChild(stapEl("p", "verhaaltekst", t, i + 1)));
      if (s.clou) kolom.appendChild(stapEl("p", "antwoord", s.clou, (s.tekst || []).length + 1));
      v.appendChild(kolom);
      return { v };
    },

    foto(s) {
      const v = el("section", "scherm s-foto");
      if (s.vol) {
        v.classList.add("opfoto");
        const bg = el("div", "achtergrond");
        bg.style.backgroundImage = "url('" + fotoPad(s.foto) + "')";
        v.appendChild(bg);
        v.appendChild(el("div", "sluier"));
      } else {
        const f = fotolijst(s.foto);
        f.dataset.stap = 0;
        v.appendChild(f);
      }
      if (s.kop) v.appendChild(stapEl("h2", null, s.kop, 0));
      if (s.bijschrift) v.appendChild(stapEl("p", "bijschrift", s.bijschrift, 1));
      return { v };
    },

    // fotos: ["a.jpg"] of items: [{ foto, tekst }]. auto: "meteen" of "klik" laat alles vanzelf na elkaar verschijnen.
    collage(s) {
      const v = el("section", "scherm s-foto");
      if (s.kop) v.appendChild(stapEl("h2", null, s.kop, 0));
      const items = s.items || s.fotos.map((foto) => ({ foto }));
      const aantalRijen = items.length > 3 ? 2 : 1;
      const perRij = Math.ceil(items.length / aantalRijen);
      const muur = el("div", "collage" + (s.items ? " met-tekst" : ""));
      muur.style.setProperty("--per-rij", perRij);
      const h = aantalRijen === 1 ? 50 : perRij >= 4 ? 27 : 29;
      muur.style.setProperty("--h", (s.items ? h - 5 : h) + "vh");
      const autoStap = s.auto === "klik" ? 1 : 0;
      const tussen = s.items ? 0.9 : 0.45;
      let rij = null;
      items.forEach((item, i) => {
        if (i % perRij === 0) rij = muur.appendChild(el("div", "rij"));
        const blok = el("figure", "figuur");
        blok.appendChild(fotolijst(item.foto));
        if (item.tekst) blok.appendChild(el("figcaption", "fototekst", item.tekst));
        blok.dataset.stap = autoStap;
        blok.style.transitionDelay = i * tussen + "s";
        rij.appendChild(blok);
      });
      v.appendChild(muur);
      if (s.bijschrift) v.appendChild(stapEl("p", "bijschrift", s.bijschrift, autoStap + 1));
      return { v };
    },

    audio(s) {
      const v = el("section", "scherm s-audio");
      if (s.kop) v.appendChild(stapEl("p", "kicker", s.kop, 0));

      const golf = el("div", "golf");
      golf.dataset.stap = 0;
      const staafjes = [];
      for (let i = 0; i < 34; i++) {
        const b = el("span");
        golf.appendChild(b);
        staafjes.push(b);
      }
      v.appendChild(golf);

      const bron = audioPad(s.bestand);
      const geluid = new Audio(bron);
      let beweging = null;

      const regels = el("div", "uitspraken");
      (s.regels || []).forEach((r, i) => regels.appendChild(stapEl("p", null, "\u201C" + r + "\u201D", i + 1)));
      v.appendChild(regels);
      if (s.onder) v.appendChild(stapEl("p", "onder", s.onder, 0));

      const waarschuwing = stapEl("p", "ontbreekt", "Audiofragment ontbreekt nog", 0);
      waarschuwing.hidden = true;
      v.appendChild(waarschuwing);

      geluid.addEventListener("error", () => {
        waarschuwing.hidden = false;
        golf.classList.remove("speelt");
        clearInterval(beweging);
      });

      function danst(aan) {
        clearInterval(beweging);
        golf.classList.toggle("speelt", aan);
        if (!aan) {
          staafjes.forEach((b) => (b.style.height = "18%"));
          return;
        }
        beweging = setInterval(() => {
          staafjes.forEach((b) => (b.style.height = 18 + Math.random() * 78 + "%"));
        }, 110);
      }

      geluid.addEventListener("ended", () => danst(false));

      // van/tot in seconden; de laatste drie seconden zakt het volume weg
      if (s.tot != null) {
        geluid.addEventListener("timeupdate", () => {
          const rest = s.tot - geluid.currentTime;
          geluid.volume = Math.max(0, Math.min(1, rest / 3));
          if (rest <= 0) { geluid.pause(); danst(false); }
        });
      }

      return {
        v,
        bijStap(n) {
          if (n === 0) {
            if (s.van) geluid.currentTime = s.van;
            geluid.volume = 1;
            geluid.play().then(() => danst(true)).catch(() => {});
          }
        },
        weg() {
          geluid.pause();
          danst(false);
        },
      };
    },

    video(s) {
      const v = el("section", "scherm s-video" + (s.kop ? " met-kop" : ""));
      if (s.kop) v.appendChild(stapEl("h2", null, s.kop, 0));
      const lijst = el("div", "lijst");
      lijst.dataset.stap = 0;
      const film = document.createElement("video");
      // van/tot in seconden knipt het filmpje zonder het bestand te bewerken
      const knip = s.van != null || s.tot != null ? "#t=" + (s.van || 0) + (s.tot != null ? "," + s.tot : "") : "";
      film.src = VIDEOPAD + s.bestand + knip;
      film.playsInline = true;
      film.controls = false;
      film.preload = "auto";
      lijst.appendChild(film);
      v.appendChild(lijst);
      if (s.onder) v.appendChild(stapEl("p", "bijschrift", s.onder, 1));

      const waarschuwing = stapEl("p", "ontbreekt", "Filmpje ontbreekt nog", 0);
      waarschuwing.hidden = true;
      v.appendChild(waarschuwing);
      film.addEventListener("error", () => {
        waarschuwing.hidden = false;
        lijst.hidden = true;
      });

      return {
        v,
        bijStap(n) { if (n === 0) film.play().catch(() => {}); },
        weg() { film.pause(); },
      };
    },

    liedje(s) {
      const v = el("section", "scherm s-liedje");
      if (s.kop) v.appendChild(stapEl("p", "kicker", s.kop, 0));
      if (s.onder) v.appendChild(stapEl("p", "bron", s.onder, 0));
      s.regels.forEach((r, i) => {
        const p = stapEl("p", "regel" + (r.refrein ? " refrein" : ""), r.tekst, i + 1);
        v.appendChild(p);
      });
      return { v };
    },

    // Zinnen die een voor een verschijnen, onder een grote titel.
    lijst(s) {
      const v = el("section", "scherm s-liedje");
      if (s.kicker) v.appendChild(stapEl("p", "kicker", s.kicker, 0));
      v.appendChild(stapEl("h2", "lijstkop", s.kop, 0));
      s.regels.forEach((r, i) => v.appendChild(stapEl("p", "regel" + (r.nadruk ? " refrein" : ""), r.tekst, i + 1)));
      return { v };
    },

    slot(s) {
      const v = el("section", "scherm s-slot");
      v.appendChild(stapEl("h1", null, s.kop, 0));
      if (s.onder) v.appendChild(stapEl("p", "onder", s.onder, 1));
      if (s.naam) v.appendChild(stapEl("p", "bijschrift", s.naam, 2));
      return {
        v,
        bijStap(n) {
          if (n === 0) { confetti(150, innerWidth / 2, innerHeight * 0.62, 1.3); confettiRegen(5000); }
        },
      };
    },
  };

  /* ------------------------------------------------------------- vertonen */

  function maxStap(v) {
    let m = 0;
    v.querySelectorAll("[data-stap]").forEach((n) => {
      m = Math.max(m, Number(n.dataset.stap));
    });
    return m;
  }

  function toon(nieuwIndex, beginStap) {
    const s = SHOW[nieuwIndex];
    const bouwer = bouwers[s.type];
    if (!bouwer) return;

    if (huidig) {
      if (huidig.weg) huidig.weg();
      const oud = huidig.v;
      oud.classList.add("af");
      oud.classList.remove("op");
      setTimeout(() => oud.remove(), 600);
    }

    huidig = bouwer(s);
    huidig.max = maxStap(huidig.v);
    // Terugkerende stempel, komt er na de rest van het scherm bij
    if (s.stempel) {
      huidig.max += 1;
      const st = stapEl("div", "stempel", s.stempel, huidig.max);
      huidig.v.appendChild(st);
    }
    podium.appendChild(huidig.v);

    index = nieuwIndex;
    stap = beginStap === "eind" ? huidig.max : 0;
    document.body.classList.toggle("donker", ["hoofdstuk", "muur", "film"].includes(s.type) || (s.type === "foto" && !!s.vol));

    requestAnimationFrame(() => {
      huidig.v.classList.add("op");
      pasStapToe();
    });
    pasVoortgangAan();
  }

  function pasStapToe() {
    huidig.v.querySelectorAll("[data-stap]").forEach((n) => {
      const nr = Number(n.dataset.stap);
      const aan = n.dataset.alleen != null ? nr === stap : nr <= stap;
      n.classList.toggle("zichtbaar", aan);
    });
    if (huidig.bijStap) huidig.bijStap(stap);
  }

  // Laat een scherm zelf doorschuiven, bv. wanneer een fragment gedaan is.
  function naarStap(scherm, n) {
    if (!huidig || huidig.v !== scherm || stap >= n) return;
    stap = n;
    pasStapToe();
  }

  function pasVoortgangAan() {
    balk.style.width = ((index + 1) / SHOW.length) * 100 + "%";
    nummerEl.textContent = index + 1 + " / " + SHOW.length;
  }

  function vooruit() {
    if (stap < huidig.max) {
      stap++;
      pasStapToe();
    } else if (index < SHOW.length - 1) {
      toon(index + 1, 0);
    }
  }

  function achteruit() {
    if (stap > 0) {
      stap--;
      pasStapToe();
    } else if (index > 0) {
      toon(index - 1, "eind");
    }
  }

  /* ----------------------------------------------------------------- klok */

  function tikTak() {
    if (!gestart) return;
    const sec = Math.floor((Date.now() - gestart) / 1000);
    klokEl.textContent =
      String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0");
    klokEl.classList.toggle("over", sec > 900);
  }
  setInterval(tikTak, 1000);

  /* ------------------------------------------------------------- besturing */

  const VOORUIT = ["ArrowRight", "ArrowDown", "PageDown", " ", "Enter", "Spacebar"];
  const ACHTERUIT = ["ArrowLeft", "ArrowUp", "PageUp", "Backspace"];

  function paneelDicht() {
    hulpEl.classList.remove("op");
    springEl.classList.remove("op");
  }

  document.addEventListener("keydown", (e) => {
    if (springEl.classList.contains("op")) {
      if (e.key === "Enter") {
        const n = Math.min(Math.max(Number(springIn.value) || 1, 1), SHOW.length) - 1;
        paneelDicht();
        toon(n, 0);
      } else if (e.key === "Escape") paneelDicht();
      return;
    }

    if (hulpEl.classList.contains("op")) { paneelDicht(); e.preventDefault(); return; }

    if (zwartEl.classList.contains("op")) {
      zwartEl.classList.remove("op");
      e.preventDefault();
      return;
    }

    if (VOORUIT.includes(e.key)) {
      if (!gestart) gestart = Date.now();
      vooruit();
      e.preventDefault();
    } else if (ACHTERUIT.includes(e.key)) {
      achteruit();
      e.preventDefault();
    } else if (e.key === "b" || e.key === "B" || e.key === ".") {
      zwartEl.classList.add("op");
    } else if (e.key === "f" || e.key === "F") {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(() => {});
    } else if (e.key === "t" || e.key === "T") {
      klokAan = !klokAan;
      klokEl.classList.toggle("op", klokAan);
      if (!gestart) gestart = Date.now();
      tikTak();
    } else if (e.key === "n" || e.key === "N") {
      nummerEl.classList.toggle("uit");
    } else if (e.key === "g" || e.key === "G") {
      springIn.value = index + 1;
      springEl.classList.add("op");
      springIn.focus();
      springIn.select();
    } else if (e.key === "?" || e.key === "/") {
      hulpEl.classList.add("op");
    } else if (e.key === "Home") {
      toon(0, 0);
    }
  });

  zwartEl.addEventListener("click", () => zwartEl.classList.remove("op"));

  document.addEventListener("click", (e) => {
    if (zwartEl.classList.contains("op") || hulpEl.classList.contains("op")) return;
    if (springEl.contains(e.target)) return;
    if (!gestart) gestart = Date.now();
    vooruit();
  });

  let muisTimer;
  document.addEventListener("mousemove", () => {
    document.body.classList.add("muis");
    clearTimeout(muisTimer);
    muisTimer = setTimeout(() => document.body.classList.remove("muis"), 2500);
  });

  // #7 opent scherm 7, #7.2 opent dat scherm met de eerste twee stappen al open
  function uitAdres() {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(location.hash);
    if (!m) return null;
    return { i: Math.min(Math.max(Number(m[1]), 1), SHOW.length) - 1, s: Number(m[2] || 0) };
  }

  const start = uitAdres();
  toon(start ? start.i : 0, 0);
  if (start && start.s) {
    stap = Math.min(start.s, huidig.max);
    pasStapToe();
  }

  addEventListener("hashchange", () => {
    const a = uitAdres();
    if (!a) return;
    toon(a.i, 0);
    if (a.s) { stap = Math.min(a.s, huidig.max); pasStapToe(); }
  });
})();
