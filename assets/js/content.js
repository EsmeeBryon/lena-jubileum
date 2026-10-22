/* Alle tekst van de show staat hier. Pas hier aan, nooit in main.js.
   Elk scherm heeft 'spreker' en 'script': dat komt op het spiekbriefje terecht.
   'nazien' markeert iets dat jullie nog moeten checken of aanleveren. */

// Een reeks filmpjes van dezelfde persoon. Knippen kan met { bestand, van, tot } in seconden.
function filmpjes(naam, lijst) {
  return lijst.map((x, i) => ({
    type: "video",
    ...(typeof x === "string" ? { bestand: x } : x),
    kop: naam,
    spreker: "Gaëlle",
    script: `[${naam}. Het filmpje speelt vanzelf. Wacht tot het gedaan is.]\n\n[KLIK]`,
  }));
}

const SHOW = [

  /* ================================================================ welkom */
  {
    type: "titel",
    titel: "Lena",
    jaren: "twaalf en een half jaar AFAS",
    onder: "Welkom \u00B7 Welcome \u00B7 Bienvenue \u00B7 Benvenuti",
    spreker: "Britt",
    script:
      "[Dit scherm staat op terwijl iedereen binnenkomt. Zorg dat Lena vooraan zit.]\n\n" +
      "Welkom allemaal. En voor Lena: welkom, welcome, bienvenue, benvenuti.\n\n[KLIK]",
  },
  {
    type: "audio",
    kop: "Herken je deze stem?",
    bestand: "stemmen-mix.mp3",
    spreker: "Britt",
    script: "[Niets zeggen. Haar stem speelt vanzelf, ongeveer vijftien seconden.]\n\n[KLIK]",
  },
  {
    type: "citaat",
    tekst: "We zijn hier niet om vrienden te maken hé mannekes.",
    naklap: "Jokes on you.",
    spreker: "Britt",
    script:
      "Beste mensen, we zijn hier vandaag om ons Lena'tje te vieren.\n\n" +
      "Lena, toen wij jou leerden kennen zei je altijd heel serieus: we zijn hier niet om vrienden te maken hé mannekes.\n\n" +
      "[KLIK] Tja. Jokes on you. Twaalf en een half jaar, duizenden voice-messages, een shoppingverslaving " +
      "waar bol.com een standbeeld voor mag zetten en ontelbare rookpauzes later zijn we toch echte vrienden geworden.\n\n" +
      "En als ik aan Lena denk, dan start ik meestal met een liedje. " +
      "[zingen op Whenever, Wherever van Shakira] Lena, Lena, Lenaaa.\n\n" +
      "Maar ook met een liedje dat we zelf gemaakt hebben.\n\n[KLIK]",
  },
  {
    type: "audio",
    kop: "Zeg eens, wat zeg je?",
    bestand: "zeg-eens-wat-zeg-je.mp3",
    spreker: "Britt",
    script:
      "[Het liedje start vanzelf en duurt een halve minuut. Laat het volledig uitspelen.]\n\n" +
      "Hè zeggen, dat doet een beleefde dame niet. Lena zegt altijd: wat zeg je?\n\n[KLIK]",
  },
  {
    type: "vraag",
    kicker: "Handen omhoog",
    vraag: "Moest vandaag al iemand iets herhalen voor Lena?",
    spreker: "Britt",
    script:
      "Klinkt dit voor iedereen bekend? Of is it just me?\n\n" +
      "Moest vandaag al iemand iets herhalen voor Lena? [handen laten opsteken] Biju? En wat moest je dan herhalen?\n\n" +
      "Zeg het eens wat luider, want ze heeft het niet gehoord denk ik.\n\n" +
      "Nee nee, mopje hé. Ik wou even de spanning wat wegnemen.\n\n[KLIK, Esmee neemt over]",
  },

  /* ============================================================= het begin */
  {
    type: "collage",
    kop: "Ik deed ALLES",
    items: [
      { foto: "vroeger-01.jpg", tekst: "Koud bellen" },
      { foto: "vroeger-05.jpg", tekst: "Websitebeheer" },
      { foto: "vroeger-04.jpg", tekst: "Mailings" },
      { foto: "vroeger-11.jpg", tekst: "Events" },
      { foto: "vroeger-17.jpg", tekst: "En al de rest" },
    ],
    breed: true,
    auto: "klik",
    spreker: "Esmee",
    script:
      "[Eerst staat enkel de titel er.]\n\n" +
      "Laten we deze presentatie beginnen bij het begin. Ik was natuurlijk nog niet in het bedrijf toen. " +
      "Maar als ik haar over vroeger hoor praten, dan hoor ik maar één ding: ik deed alles.\n\n" +
      "Ze is hier bij AFAS begonnen als commercieel medewerker in 2014. " +
      "Toen was ik vijftien jaar, om dat even in perspectief te zetten. " +
      "En toen wou dat echt nog zeggen dat ze moest...\n\n" +
      "[KLIK, de foto's komen vanzelf na elkaar] Koud bellen, websitebeheer doen, mailings, events en al de rest.\n\n[KLIK]",
  },
  {
    type: "collage",
    kop: "Eventmanager",
    fotos: ["events-01.jpg", "events-02.jpg", "events-17.jpg", "events-10.jpg", "events-07.jpg", "events-15.jpg", "events-16.jpg", "events-23.jpg", "events-18.jpg"],
    spreker: "Esmee",
    script:
      "[De foto's komen vanzelf.]\n\n" +
      "Tot ze uiteindelijk eventmanager werd. Alé, zonder gsm en auto hé. " +
      "Gewoon manager met de functie van het gewone gepeupel.\n\n" +
      "Hier zie je een paar prachtige kiekjes van onze jaarlijkse AFAS Open. Dan is ze echt in haar element.\n\n[KLIK]",
  },
  {
    type: "collage",
    kop: "The voice and the face",
    youtube: { id: "bfOka5lL48k", van: 0, tot: 15 },
    fotos: ["stem-01.jpg", "stem-02.jpg"],
    spreker: "Esmee",
    script:
      "[Een stukje van de tv-spot speelt vanzelf. Dat is de stem van Lena. Werkt enkel in de online versie.]\n\n" +
      "Over de jaren heen is ze de stem van AFAS geweest. " +
      "Voor de mensen die dit niet weten: zij spreekt ook ons antwoordapparaat in. Maar ook the face.\n\n" +
      "[KLIK, de foto's komen vanzelf]\n\n" +
      "Op deze foto weet ik niet zeker van welke sector ze komt, maar ze staat bij den dokteur Thibault.\n\n[KLIK]",
    nazien: "Het YouTube-stukje speelt de eerste 15 seconden van de tv-spot. Hoor je Lena daar niet goed, zeg dan van welke seconde tot welke seconde. Staat de foto met dokter Thibault hierbij?",
  },
  {
    type: "collage",
    kop: "Het nieuwe gezicht van AFAS",
    fotos: ["esmee-01.jpg", "esmee-07.jpg", "esmee-05.jpg", "esmee-08.jpg", "esmee-06.jpg"],
    auto: "klik",
    spreker: "Esmee",
    script:
      "Sorry Lena, ik moet u helaas meedelen dat u vervangen bent.\n\n" +
      "[KLIK, de foto's komen vanzelf na elkaar]\n\n[KLIK]",
  },

  /* ===================================================== da's Lena voor mij */
  {
    type: "hoofdstuk",
    clip: "lena-b.mp4",
    titel: "Da's Lena voor mij",
    zin: "Ik denk gewoon hardop na hé",
    spreker: "Esmee",
    script:
      "[Het fragment speelt meteen.]\n\n" +
      "Da's Lena voor mij.\n\n[KLIK]",
  },
  {
    type: "vraag",
    kicker: "Handen omhoog",
    vraag: "Wie heeft er al eens een voicebericht van Lena ontvangen?",
    antwoord: "Wie heeft die op 1,5x of 2x geluisterd?",
    stempel: "Da's ook echt Lena",
    spreker: "Esmee",
    script:
      "Wie heeft er al eens een voicebericht van Lena ontvangen? [handen laten opsteken]\n\n" +
      "[KLIK] Wie heeft die op 1,5x of 2x geluisterd? [lachen]\n\n" +
      "[KLIK, stempel] Die voiceberichten, da's ook echt Lena.\n\n[KLIK]",
  },
  {
    type: "collage",
    kop: "Selfies",
    fotos: [
      "selfies-01.jpg", "selfies-06.jpg", "selfies-02.jpg", "selfies-09.jpg", "selfies-03.jpg", "events-14.jpg", "selfies-07.jpg",
      "vroeger-02.jpg", "selfies-04.jpg", "selfies-08.jpg", "selfies-10.jpg", "grappig-01.jpg", "vroeger-16.jpg",
    ],
    tempo: 0.9,
    stempel: "ZO Lena",
    spreker: "Esmee",
    script: "[De selfies komen vanzelf.]\n\n[KLIK, stempel] Die selfies zijn ZO Lena.\n\n[KLIK]",
  },
  {
    type: "collage",
    kop: "Lena en eten",
    fotos: ["eten-01.jpg", "eten-02.jpg", "eten-04.jpg", "familie-05.jpg", "eten-05.jpg", "eten-06.jpg", "familie-13.jpg"],
    tempo: 1.1,
    stempel: "Da's Lena voor mij",
    spreker: "Esmee",
    script:
      "[De foto's komen vanzelf.]\n\n" +
      "En eten. Sushi rollen, een volle tafel met vrienden of gewoon op een terras: Lena en eten, dat is liefde.\n\n" +
      "[KLIK, stempel] Da's Lena voor mij.\n\n[KLIK]",
  },
  {
    type: "collage",
    kop: "Altijd goed gekleed",
    fotos: [
      "stijl-02-zoom.jpg", "stijl-09.jpg", "stijl-06-zoom.jpg", "stijl-03-zoom.jpg", "stijl-11.jpg", "events-08-zoom.jpg",
      "stijl-01-zoom.jpg", "stijl-10.jpg", "stijl-04-zoom.jpg", "stijl-08.jpg", "stijl-07-zoom.jpg",
    ],
    tempo: 0.9,
    stempel: "Ook dat is Lena",
    spreker: "Esmee",
    script:
      "[De foto's komen vanzelf.]\n\n" +
      "Lena is altijd mooi en altijd goed gekleed. " +
      "Mede mogelijk gemaakt door de koerier. Die heeft intussen een vaste parkeerplaats.\n\n" +
      "[KLIK, stempel] Ook dat is Lena.\n\n[KLIK]",
  },
  {
    type: "vraag",
    vraag: "Lena plant een meeting met jou. Wat checkt ze niet?",
    antwoord: "Jouw agenda. Enkel die van haar wel.",
    spreker: "Esmee",
    script:
      "Lena plant een meeting met jou. Wat checkt ze niet? [zaal laten roepen]\n\n" +
      "[KLIK] Jouw agenda. Enkel die van haar wel.\n\n[KLIK]",
  },
  {
    type: "lijst",
    kicker: "Haar eigen woorden",
    kop: "Lena, de postduif",
    regels: [
      { tekst: "Wil jij dit even insturen?" },
      { tekst: "Wil jij dit even opsturen?" },
      { tekst: "Wil jij de uitnodigingen opmaken?" },
      { tekst: "Wil jij de naamkaartjes maken?" },
      { tekst: "Wil jij de taxibusjes voor de AFAS Open gaan halen in Gent?", nadruk: true },
    ],
    spreker: "Esmee",
    script:
      "En dan de postduif. Dat zijn haar eigen woorden.\n\n" +
      "[KLIK per zin] Wil jij dit even insturen? Wil jij dit even opsturen? Wil jij de uitnodigingen opmaken? " +
      "Wil jij de naamkaartjes maken? Wil jij de taxibusjes voor de AFAS Open gaan halen in Gent?\n\n[KLIK]",
  },
  {
    type: "verhaal",
    video: "taxi-gent.mp4",
    kicker: "Bewijsstuk",
    kop: "Net terug van Gent",
    spreker: "Esmee",
    script: "En ja. Dat ben ik. In dat busje. Net terug van Gent.\n\n[KLIK]",
  },
  {
    type: "vraag",
    kicker: "Allemaal rechtstaan",
    vraag: "Wie heeft ooit iets voor Lena ingestuurd, opgestuurd of opgehaald?",
    antwoord: "Dit applaus is voor jullie.",
    spreker: "Esmee",
    script:
      "Wie heeft ooit iets voor Lena ingestuurd, opgestuurd of opgehaald? Ga maar eens rechtstaan. [wachten tot iedereen staat]\n\n" +
      "[KLIK] Blijf even staan. Dit applaus is voor jullie. [applaus]\n\n[KLIK]",
  },
  {
    type: "reeks",
    kop: "Er moet administratie gebeuren",
    items: [
      { video: "administratie.mp4", tekst: "Lena hoort het woord administratie." },
      { foto: "grappig-11.jpg", tekst: "Plan A. Onder de kickertafel." },
      { foto: "grappig-13.jpg", tekst: "Plan B. Achter de plant." },
      { foto: "grappig-21.jpg", tekst: "Plan C. Achter een groot scherm." },
      { foto: "grappig-18.jpg", tekst: "Plan D. Onherkenbaar." },
      { foto: "grappig-06.jpg" },
      { foto: "grappig-07.jpg" },
    ],
    spreker: "Esmee",
    script:
      "En als er dan echt administratie moet gebeuren?\n\n" +
      "[De foto's vallen vanzelf op de stapel. Laat de zaal lachen.]\n\n[KLIK]",
  },
  {
    type: "hoofdstuk",
    clip: "lena-f.mp4",
    zin: "Ik heb daar geen headspace voor",
    stempel: "Da's allemaal Lena voor mij",
    spreker: "Esmee",
    script:
      "[Het fragment speelt meteen, met haar lach erbij. Daarna valt de stempel vanzelf.]\n\n" +
      "De meeting inplannen, de postduif, de administratie doorschuiven. Da's allemaal Lena voor mij.\n\n" +
      "[KLIK, Gaëlle neemt over]",
  },

  /* ==================================================== mommy on the loose */
  {
    type: "muur",
    kop: "Mommy on the loose",
    videos: ["mommy-01.mp4", "mommy-04.mp4", "grappig-01.mp4", "mommy-03.mp4", "grappig-03.mp4", "mommy-02.mp4"],
    spreker: "Gaëlle",
    script:
      "[Zes filmpjes tegelijk, zonder geluid. Ze blijven lopen. Laat de zaal even kijken.]\n\n" +
      "Overdag eventmanager. En daarna? Mommy on the loose.\n\n[KLIK]",
  },
  {
    type: "collage",
    fotos: ["mommy-03.jpg", "mommy-04.jpg", "mommy-08.jpg", "mommy-05.jpg", "mommy-07.jpg", "mommy-09.jpg", "mommy-11.jpg", "mommy-02.jpg"],
    tempo: 1.1,
    spreker: "Gaëlle",
    script: "[De foto's komen vanzelf.]\n\nWie Lena alleen van overdag kent, kent maar de helft.\n\n[KLIK]",
  },
  {
    type: "nieuws",
    foto: "grappig-20.jpg",
    kop: "Lena stopt met roken",
    muziek: "nieuws.mp3",
    clou: "Deze foto is van haar laatste sigaret. Die van gisteren.",
    band: ["Lena stopt met roken", "Ook deze week", "Bron: Lena zelf", "Meer nieuws na de rookpauze"],
    spreker: "Gaëlle",
    script:
      "Breaking news. Lena stopt met roken. Ze wil het al heel lang. Elke week opnieuw.\n\n" +
      "[KLIK] Deze foto is van haar laatste sigaret. Die van gisteren.\n\n[KLIK]",
  },
  {
    type: "film",
    foto: "grappig-09.jpg",
    kop: "Een avondje film",
    rollen: "Met Lena \u00B7 Mathias \u00B7 Fisnik van IT",
    spreker: "Gaëlle",
    script:
      "Lena wil niet voor alles een abonnement nemen. Mathias geeft haar een link om films te kijken. " +
      "En hij zegt er duidelijk bij: ik doe dat niet op mijn werklaptop. Lena wel.\n\n" +
      "Op een avond klikt ze op een link die niet zo veilig is. Wat er dan verschijnt, is geen romantische komedie.\n\n" +
      "[kijk even naar Mathias in de zaal]\n\n[KLIK]",
  },
  {
    type: "lijst",
    kicker: "Maandagochtend",
    kop: "Fisnik van IT belt",
    regels: [
      { tekst: "Lena: Maar wat heb je gezien?" },
      { tekst: "Lena: Wat heb je dan precies gezien?" },
      { tekst: "Lena: Ik keek geen stoute dingen hoor." },
      { tekst: "Lena: Alleen een film.", nadruk: true },
    ],
    spreker: "Gaëlle",
    script:
      "De werklaptop had alles netjes doorgestuurd naar Fisnik van IT. Maandag belt hij haar op. " +
      "En Lena maakt het alleen maar verdachter.\n\n" +
      "[KLIK per zin] Maar wat heb je gezien? Wat heb je dan precies gezien? Ik keek geen stoute dingen hoor. Alleen een film.\n\n[KLIK]",
  },
  {
    type: "foto",
    foto: "extra-01.jpg",
    spreker: "Gaëlle",
    script: "[Niets zeggen. Laat de hond het werk doen. Kijk naar Fisnik als hij in de zaal zit.]\n\n[KLIK]",
  },
  {
    type: "verhaal",
    foto: "extra-03.jpg",
    kicker: "Vriendinnen",
    kop: "De Beffers",
    extra: ["grappig-04.jpg", "grappig-05.jpg", "grappig-16.jpg"],
    spreker: "Gaëlle",
    script:
      "En dan zijn er de Beffers. Zo heet haar vriendinnengroep. Echt waar.\n\n" +
      "Komt de naam van BFF? Of van een ervaring waar wij niets van weten?\n\n" +
      "[KLIK, drie foto's erbij] We vragen het niet. [even laten bezinken]\n\n[KLIK]",
  },

  /* ========================================================= echte vrienden */
  {
    type: "collage",
    kop: "Echte vrienden",
    fotos: ["familie-15.jpg", "familie-03.jpg", "familie-12.jpg", "events-20.jpg", "familie-01.jpg", "events-05.jpg", "familie-04.jpg"],
    spreker: "Gaëlle",
    script:
      "[De toon verandert hier. Rustiger praten. De foto's komen vanzelf.]\n\n" +
      "We zijn hier niet om vrienden te maken, zei ze. Twaalf en een half jaar later. We hebben even geteld.\n\n[KLIK]",
  },
  {
    type: "vraag",
    kicker: "Thuis en op het werk",
    vraag: "Is Lena overal dezelfde?",
    spreker: "Gaëlle",
    script:
      "Is Lena overal dezelfde? We vroegen het aan wie haar het best kent. Eerst thuis, dan op het werk.\n\n" +
      "[KLIK, vanaf hier speelt elk filmpje vanzelf. Wacht telkens tot het gedaan is en klik dan verder.]",
  },
  // Eerst wat hen meteen aan Lena doet denken, dan wat iedereen van haar mag leren. Geknipt op een natuurlijke pauze.
  ...filmpjes("Christophe", [{ bestand: "fam-christophe-1.mp4", van: 0.6 }]),
  ...filmpjes("Chloé", [{ bestand: "fam-chloe-1.mp4", van: 2.3, tot: 12.9 }]),
  ...filmpjes("Billie-Rose", [{ bestand: "fam-billie-rose-1.mp4", van: 0.7, tot: 15.1 }]),
  ...filmpjes("Marijke", [{ bestand: "col-marijke-1.mp4", van: 0.8 }]),
  ...filmpjes("Christophe", [{ bestand: "fam-christophe-3.mp4", van: 1.3 }]),
  ...filmpjes("Chloé", [{ bestand: "fam-chloe-3.mp4", van: 0.9 }]),
  ...filmpjes("Marijke", [{ bestand: "col-marijke-3.mp4", van: 1.3, tot: 16.1 }]),
  {
    type: "video",
    bestand: "fam-billie-rose-3.mp4",
    van: 0.4,
    tot: 14.2,
    kop: "Billie-Rose",
    spreker: "Gaëlle",
    script:
      "[Laatste filmpje.]\n\n" +
      "Lena staat altijd klaar. Voor een babbel of een confidence boost. En ze blijft altijd eerlijk. " +
      "Dat appreciëren we allemaal.\n\n[KLIK, Britt neemt over]",
    nazien: "Ik koos per persoon filmpje 1 en 3 en knipte op een pauze, zonder ze te kunnen beluisteren. Kijk na of dit de leukste stukken zijn (kiezen.html).",
  },

  /* ================================================================ liedje */
  {
    type: "karaoke",
    kop: "Thinking Out Loud \u00B7 de Lena-versie",
    bestand: "parodie.mp3",
    tot: 90,
    // Foto's die nog nergens anders in de show zitten
    fotos: [
      "vroeger-07.jpg", "events-09.jpg", "vroeger-10.jpg", "mommy-06.jpg", "events-11.jpg", "vroeger-14.jpg",
      "familie-06.jpg", "events-19.jpg", "grappig-14.jpg", "vroeger-19.jpg", "events-21.jpg", "mommy-10.jpg",
      "familie-09.jpg", "vroeger-08.jpg", "events-25.jpg", "grappig-15.jpg",
    ],
    // Zodra elke regel een tijd `t` (seconden in het liedje) heeft, loopt de tekst vanzelf mee
    regels: [
      { tekst: "Jij vergeet alweer dat de meeting begint" },
      { tekst: "Ook de admin schuif jij naar ons door" },
      { tekst: "Plots verschijnt er een voice note die eindeloos duurt" },
      { tekst: "Maar de draad zijn wij alweer kwijt" },
      { tekst: "Maar Lena, wij zijn al twaalf en een half jaar blij met jou" },
      { tekst: "En elke zin klinkt half Engels, want dat is typisch jij" },
      { tekst: "Je denkt gewoon hardop" },
      { tekst: "Dan vertel je plots een heel ander verhaal" },
      { tekst: "\u201CDat had ik toch al eens gezegd?\u201D" },
      { tekst: "Maar met jou aan het roer komt elk feest helemaal goed" },
      { tekst: "Dan staat heel de zaal weer op z\u2019n kop" },
      { tekst: "Dus Lena, kom" },
      { tekst: "Laat het regelen maar aan ons" },
      { tekst: "Hef je glas, want dit feest is vandaag voor jou" },
      { tekst: "Lach maar mee met je hele team" },
      { tekst: "Wij staan voor je klaar" },
      { tekst: "Lena, wat zijn wij toch blij met jou" },
    ],
    spreker: "Britt",
    script:
      "En omdat Lena altijd hardop nadenkt, kon dit liedje niet ontbreken.\n\n" +
      "[De muziek, de foto's en de songtekst lopen vanzelf. Na anderhalve minuut zakt de muziek weg.]\n\n[KLIK]",
    nazien: "Tik de tijden van de songtekst in via tikken.html (online: /tikken.html) en plak het resultaat in de chat. Tot dan komt elke regel nog per klik.",
  },

  /* ================================================================= toast */
  {
    type: "foto",
    foto: "stijl-05.jpg",
    vol: true,
    kop: "Wij kunnen niet meer zonder jou",
    spreker: "Britt",
    script:
      "Lena, kom jij even naar voren?\n\n" +
      "Zo. Genoeg gelachen en geplaagd. Want als we alle grappen over vergeten meetings, " +
      "doorgeschoven administratie en hardop nadenken opzij zetten, blijft er maar één ding over. " +
      "Wij kunnen niet meer zonder jou.\n\n" +
      "Onder al die Engelse en Franse woorden en spontane selfies zit een collega met een hart van goud. " +
      "Je bent er altijd als iemand een luisterend oor nodig heeft. En je zorgt ervoor dat elk AFAS-event klopt.\n\n[KLIK]",
  },
  {
    type: "video",
    bestand: "fam-christophe-aparte-boodschap.mp4",
    kop: "Nog één boodschap",
    spreker: "Britt",
    script: "[Niets aankondigen. De boodschap van Christophe speelt vanzelf. Laat ze volledig uitspelen. Daarna even stilte.]\n\n[KLIK]",
  },
  {
    type: "slot",
    kop: "Merci, Lena",
    onder: "Grazie. Dank je. Voor de chaos, de warmte en twaalf en een half jaar.",
    naam: "Je collega's. En ja, ook je vrienden.",
    spreker: "Britt",
    script:
      "Lena, jij bent een fantastische, warme en unieke eventmanager en vriendin. " +
      "Bedankt voor de afgelopen jaren.\n\n" +
      "[KLIK] Glazen omhoog.",
  },
];
