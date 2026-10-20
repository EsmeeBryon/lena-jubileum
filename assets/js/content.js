/* Alle tekst van de show staat hier. Pas hier aan, nooit in main.js.
   Elk scherm heeft 'spreker' en 'script': dat komt op het spiekbriefje terecht.
   'nazien' markeert iets dat jullie nog moeten checken of aanleveren. */

// Een reeks filmpjes van dezelfde persoon. Knippen kan met { bestand, van, tot } in seconden.
function filmpjes(naam, lijst) {
  return lijst.map((x, i) => ({
    type: "video",
    ...(typeof x === "string" ? { bestand: x } : x),
    kop: naam,
    spreker: "Mathias",
    script: i === 0 ? `${naam}. Het filmpje start vanzelf.` : "Volgend filmpje.",
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
      "Dit scherm staat op terwijl iedereen binnenkomt. Zorg dat Lena vooraan zit. " +
      "Heet iedereen welkom. Pas klikken als het stil is.",
  },
  {
    type: "audio",
    kop: "Herken je deze stem?",
    bestand: "stemmen-mix.mp3",
    spreker: "Britt",
    script:
      "Niets zeggen. De stemmen starten vanzelf en duren ongeveer vijftien seconden.\n\n" +
      "Daarna: Beste mensen, we zijn hier vandaag om ons Lena'tje te vieren. " +
      "En als ik aan Lena denk, dan start ik meestal met een liedje.\n\n" +
      "[ZINGEN op Whenever, Wherever van Shakira] Lena, Lena, Lenaaa.\n\n" +
      "Maar ook met een liedje dat we zelf gemaakt hebben. [KLIK]",
  },
  {
    type: "audio",
    kop: "Zeg eens, wat zeg je?",
    bestand: "zeg-eens-wat-zeg-je.mp3",
    spreker: "Britt",
    script: "Het liedje start vanzelf en duurt een halve minuut. Laat het volledig uitspelen.",
  },
  {
    type: "hoofdstuk",
    clip: "lena-a.mp4",
    zin: "Wat zeg je?",
    wacht: true,
    spreker: "Britt",
    script:
      "Hè zeggen, dat doet een beleefde dame niet. " +
      "Lena zegt altijd wat zeg je. Zoals je ze hier zelf hoort zeggen.\n\n" +
      "[KLIK] Het fragment speelt.",
  },
  {
    type: "vraag",
    kicker: "Handen omhoog",
    vraag: "Moest vandaag al iemand iets herhalen voor Lena?",
    antwoord: "Zeg het eens wat luider. Ze heeft het niet gehoord.",
    spreker: "Britt",
    script:
      "Klinkt dit voor iedereen bekend? Of is it just me? " +
      "Moest vandaag al iemand iets herhalen voor Lena? Biju? En wat moest je dan herhalen?\n\n" +
      "[KLIK] Zeg het eens wat luider, want ze heeft het niet gehoord denk ik.\n\n" +
      "Nee nee, mopje hé. Ik wou even de spanning wat wegnemen.",
  },

  /* ============================================================= het begin */
  {
    type: "collage",
    kop: "Ik deed ALLES",
    items: [
      { foto: "vroeger-01.jpg", tekst: "Koud bellen" },
      { foto: "vroeger-06.jpg", tekst: "Websitebeheer" },
      { foto: "vroeger-04.jpg", tekst: "Mailings" },
      { foto: "vroeger-12.jpg", tekst: "Events" },
      { foto: "vroeger-17.jpg", tekst: "En al de rest" },
    ],
    spreker: "Britt",
    script:
      "Laten we deze presentatie beginnen bij het begin. Ik was natuurlijk nog niet in het bedrijf toen. " +
      "Maar als ik haar over vroeger hoor praten, dan hoor ik maar één ding. Ik deed alles.\n\n" +
      "Ze is hier bij AFAS begonnen als commercieel medewerker in 2014. " +
      "Toen was ik vijftien jaar, om dat even in perspectief te zetten. " +
      "En toen wou dat echt nog zeggen dat ze moest koud bellen, websitebeheer doen, mailings...\n\n" +
      "Elke klik zet er een foto bij. Ze blijven allemaal staan.",
  },
  {
    type: "collage",
    kop: "Eventmanager",
    fotos: ["events-01.jpg", "events-02.jpg", "events-03.jpg", "events-09.jpg", "events-10.jpg", "events-15.jpg", "events-16.jpg", "events-18.jpg"],
    auto: "meteen",
    spreker: "Britt",
    script:
      "De foto's verschijnen vanzelf, je hoeft niet te klikken.\n\n" +
      "Tot ze uiteindelijk eventmanager werd. Alé, zonder gsm en auto hé. " +
      "Gewoon manager met de functie van het gewone gepeupel.\n\n" +
      "Hier zie je een paar prachtige kiekjes van onze jaarlijkse AFAS Open. Dan is ze echt in haar element.",
  },
  {
    type: "collage",
    kop: "The voice and the face",
    fotos: ["stem-01.jpg", "stem-02.jpg"],
    auto: "klik",
    spreker: "Britt",
    script:
      "Over de jaren heen is ze niet alleen de stem van AFAS geweest. " +
      "Voor wie het niet weet: zij spreekt ook ons antwoordapparaat in. Maar ook the face.\n\n" +
      "[KLIK] De foto's verschijnen vanzelf na elkaar.\n\n" +
      "Op deze foto weet ik niet zeker van welke sector ze komt, maar ze staat bij den dokteur Thibault.",
    nazien: "Staat de foto met dokter Thibault hierbij? Anders die foto nog bezorgen.",
  },
  {
    type: "collage",
    kop: "Het nieuwe gezicht van AFAS",
    fotos: ["esmee-01.jpg", "esmee-02.jpg", "esmee-03.jpg"],
    auto: "klik",
    spreker: "Britt",
    script:
      "Sorry Lena, ik moet u helaas meedelen dat u vervangen bent.\n\n" +
      "[KLIK] De foto's verschijnen vanzelf na elkaar.",
  },

  /* ===================================================== da's Lena voor mij */
  {
    type: "hoofdstuk",
    clip: "lena-b.mp4",
    zin: "Ik denk gewoon hardop na hé",
    grap: "Da's Lena voor mij.",
    spreker: "Britt",
    script: "Het fragment speelt vanzelf. Daarna verschijnt de tekst. Lees hem gerust luidop mee.",
  },
  {
    type: "vraag",
    kicker: "Da's ook echt Lena",
    vraag: "Wie kreeg ooit een voice-message van Lena van meer dan vijf minuten?",
    antwoord: "En wie heeft hem helemaal uitgeluisterd?",
    spreker: "Britt",
    script: "Die voice-messages, da's ook echt Lena. Laat de handen even in de lucht. Bij het antwoord zakken de meeste handen weer.",
  },
  {
    type: "collage",
    kop: "Die selfies zijn ZO Lena",
    fotos: ["selfies-01.jpg", "selfies-02.jpg", "selfies-03.jpg", "selfies-04.jpg", "events-14.jpg"],
    spreker: "Britt",
    script: "Elke klik zet er een selfie bij.",
  },
  {
    type: "hoofdstuk",
    clip: "lena-c.mp4",
    zin: "Ik had dat toch al gezegd?",
    grap: "Ja Lena. Alleen niet tegen ons.",
    spreker: "Britt",
    script: "Het fragment speelt vanzelf, de grap volgt vanzelf.",
  },
  {
    type: "vraag",
    vraag: "Lena plant een meeting met jou. Wat checkt ze eerst?",
    antwoord: "Haar eigen agenda. Die van jou? Nooit.",
    spreker: "Britt",
    script: "Laat de zaal roepen. Wie ooit een uitnodiging kreeg op een moment dat al vol stond, weet het antwoord.",
  },
  {
    type: "video",
    bestand: "grappig-04.mp4",
    onder: "De meeting is al bezig. Lena komt eraan.",
    spreker: "Britt",
    script: "Het filmpje is kort. Klik daarna om het onderschrift te tonen.",
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
    spreker: "Britt",
    script: "Lena noemt zichzelf een postduif. Haar eigen woorden. Elke klik is een vraag die iemand in deze zaal ooit van haar kreeg.",
  },
  {
    type: "reeks",
    kop: "Er moet administratie gebeuren",
    items: [
      { foto: "grappig-12.jpg", tekst: "Lena hoort het woord administratie." },
      { foto: "grappig-11.jpg", tekst: "Plan A. Onder de kickertafel." },
      { foto: "grappig-13.jpg", tekst: "Plan B. Achter de plant." },
      { foto: "grappig-21.jpg", tekst: "Plan C. Achter een groot scherm." },
      { foto: "grappig-18.jpg", tekst: "Plan D. Onherkenbaar." },
    ],
    spreker: "Britt",
    script: "Elke klik is een nieuw plan. Laat de zaal lachen voor je verder klikt.",
  },
  {
    type: "vraag",
    kicker: "Handen omhoog",
    vraag: "Wie heeft ooit iets voor Lena ingestuurd, opgestuurd of opgehaald?",
    antwoord: "Blijf even rechtstaan. Dit applaus is voor jullie.",
    spreker: "Britt",
    script:
      "De meeting inplannen, de postduif, de administratie doorschuiven. Da's allemaal Lena voor mij.\n\n" +
      "Vraag wie ooit iets voor haar deed om recht te staan. Klik dan en vraag een applaus.",
  },

  /* ============================================================ hoofdstuk 4 */
  {
    type: "hoofdstuk",
    nummer: 4,
    clip: "lena-e.mp4",
    titel: "Mommy on the loose",
    zin: "Ik heb daar geen headspace voor",
    grap: "Voor administratie niet. Voor een feestje altijd.",
    spreker: "Gaëlle",
    script: "Het fragment speelt vanzelf, de grap volgt vanzelf. Daarna klik je door naar het lachfragment.",
  },
  {
    type: "video",
    bestand: "lena-f.mp4",
    spreker: "Gaëlle",
    script: "Het lachfragment. Laat het volledig uitspelen.",
  },
  {
    type: "video",
    bestand: "grappig-01.mp4",
    kop: "Na vijf uur",
    spreker: "Gaëlle",
    script: "Geen headspace voor administratie. Wel hiervoor.",
  },
  {
    type: "collage",
    fotos: ["mommy-03.jpg", "mommy-04.jpg", "mommy-08.jpg", "mommy-05.jpg", "mommy-07.jpg", "mommy-09.jpg", "mommy-11.jpg", "mommy-02.jpg"],
    bijschrift: "Wie Lena alleen van overdag kent, kent maar de helft.",
    spreker: "Gaëlle",
    script: "Elke klik zet er een foto bij. Even laten lachen.",
  },
  {
    type: "verhaal",
    foto: "grappig-20.jpg",
    kicker: "Breaking news",
    kop: "Lena stopt met roken",
    tekst: ["Ze wil het al heel lang. Elke week opnieuw."],
    clou: "Deze foto is van haar laatste sigaret. Die van gisteren.",
    spreker: "Gaëlle",
    script: "Kort houden. De foto doet het werk.",
  },
  {
    type: "collage",
    kop: "Altijd goed gekleed",
    fotos: ["stijl-01.jpg", "stijl-02.jpg", "stijl-03.jpg", "stijl-04.jpg", "stijl-06.jpg", "stijl-07.jpg"],
    bijschrift: "Mede mogelijk gemaakt door de koerier. Die heeft intussen een vaste parkeerplaats.",
    spreker: "Gaëlle",
    script: "Lena is altijd mooi en altijd goed gekleed. Elke outfit klopt, net als haar events.",
  },
  {
    type: "verhaal",
    foto: "grappig-09.jpg",
    kicker: "Waargebeurd",
    kop: "Een avondje film",
    tekst: [
      "Lena wil niet voor alles een abonnement nemen. Mathias geeft haar een link om films te kijken.",
      "Mathias zegt er duidelijk bij: ik doe dat niet op mijn werklaptop.",
      "Lena wel.",
    ],
    clou: "Op een avond klikt ze op een link die niet zo veilig is. Wat er dan verschijnt, is geen romantische komedie.",
    spreker: "Mathias",
    script:
      "Dit verhaal vertel jij, Mathias. Jij was erbij. Elke klik zet er een zin bij. " +
      "Laat de zaal na de laatste zin even raden wat er op het scherm kwam.",
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
    spreker: "Mathias",
    script:
      "De werklaptop had alles netjes doorgestuurd naar Fisnik van IT. Maandag belt hij haar op. " +
      "En Lena maakt het alleen maar verdachter.\n\n" +
      "Is Fisnik in de zaal? Kijk naar hem bij de laatste klik.",
  },
  {
    type: "verhaal",
    foto: "mommy-10.jpg",
    kicker: "Vriendinnen",
    kop: "De Beffers",
    tekst: ["Zo heet haar vriendinnengroep. Echt waar.", "Komt de naam van BFF?"],
    clou: "Of van een ervaring waar wij niets van weten? We vragen het niet.",
    spreker: "Gaëlle",
    script: "Even wachten na de naam. De zaal heeft een paar seconden nodig.",
    nazien: "Staan de Beffers op deze foto? Anders een andere foto kiezen.",
  },

  /* ============================================================ hoofdstuk 5 */
  {
    type: "hoofdstuk",
    nummer: 5,
    clip: "lena-d.mp4",
    titel: "Echte vrienden",
    zin: "We zijn hier niet om vrienden te maken",
    grap: "Jokes on you.",
    spreker: "Esmee",
    script:
      "Dezelfde zin als bij het begin van Britt, nu uit Lena's eigen mond. " +
      "De toon verandert hier. Rustiger praten, trager klikken.",
  },
  {
    type: "collage",
    fotos: ["familie-15.jpg", "familie-03.jpg", "familie-12.jpg", "events-17.jpg", "events-20.jpg", "familie-01.jpg", "events-05.jpg", "familie-04.jpg"],
    bijschrift: "Twaalf en een half jaar later. We hebben even geteld.",
    spreker: "Esmee",
    script: "Elke klik zet er een foto bij. Laat de laatste even staan.",
  },
  {
    type: "vraag",
    kicker: "Thuis en op het werk",
    vraag: "Is Lena overal dezelfde?",
    spreker: "Mathias",
    script:
      "We vroegen het aan wie haar het best kent. Eerst thuis, dan op het werk.\n\n" +
      "Vanaf hier speelt elk filmpje vanzelf zodra je klikt. Wacht telkens tot het gedaan is.",
  },
  {
    type: "video",
    bestand: "interviews.mp4",
    kop: "En op het werk?",
    spreker: "Mathias",
    script: "Nu de collega's, vriendinnen en ex-collega's.",
    nazien: "Komen de interviewfilmpjes van de collega's nog? Opslaan als assets/video/interviews.mp4. Anders dit scherm schrappen.",
  },
  {
    type: "vraag",
    vraag: "Welke eigenschap van Lena zou iedereen hier wat meer mogen hebben?",
    antwoord: "Een babbel, een confidence boost en altijd een eerlijk antwoord.",
    spreker: "Esmee",
    script:
      "Vraag het echt aan de zaal en laat twee of drie mensen antwoorden. Klik pas daarna door.\n\n" +
      "Lena staat altijd klaar. Voor een babbel of een confidence boost. En ze blijft altijd eerlijk. " +
      "Dat appreciëren we allemaal.",
  },

  /* ================================================================ liedje */
  {
    type: "liedje",
    kop: "Thinking Out Loud",
    onder: "naar Ed Sheeran, met excuses",
    regels: [
      { tekst: "When your legs don't work like they used to before" },
      { tekst: "En je stuurt weer een voice-note van tien minuten door" },
      { tekst: "Je bent een mommy on the loose met een sigaret in de hand" },
      { tekst: "Maar qua evenementen ben jij de queen van het land" },
    ],
    spreker: "Britt + Matthias Raes",
    script: "Matthias zingt het couplet. Klik op het ritme van de zang, telkens een regel.",
    nazien: "Matthias Raes nog vragen. En samen de tekst op de melodie leggen.",
  },
  {
    type: "liedje",
    kop: "Allemaal mee",
    regels: [
      { tekst: "So honey now", refrein: true },
      { tekst: "Vergeet je agenda maar gauw", refrein: true },
      { tekst: "Ik denk gewoon hardop na", refrein: true },
      { tekst: "Oh baby, ik vergeet het weer, pa-ra-ta-ta", refrein: true },
    ],
    spreker: "Britt + Matthias Raes",
    script: "Het refrein. Nodig de zaal uit om mee te zingen voor je de eerste regel opent.",
  },

  /* ================================================================= toast */
  {
    type: "video",
    bestand: "fam-christophe-aparte-boodschap.mp4",
    kop: "Nog één boodschap",
    spreker: "Britt",
    script: "Niets aankondigen. Klik en laat de boodschap van Christophe volledig uitspelen. Daarna even stilte.",
  },
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
      "Je bent er altijd als iemand een luisterend oor nodig heeft. En je zorgt ervoor dat elk AFAS-event klopt.",
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
