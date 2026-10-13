/* Alle tekst van de show staat hier. Pas hier aan, nooit in main.js.
   Elk scherm heeft 'spreker' en 'script': dat komt op het spiekbriefje terecht.
   'nazien' markeert iets dat jullie nog moeten checken of aanleveren. */

const SHOW = [

  /* ================================================================ opening */
  {
    type: "titel",
    kicker: "29 oktober 2026",
    titel: "Lena",
    jaren: "twaalf en een half jaar AFAS",
    onder: "Welkom \u00B7 Welcome \u00B7 Bienvenue \u00B7 Benvenuti",
    spreker: "—",
    script:
      "Dit scherm staat op terwijl iedereen binnenkomt. Zorg dat Lena vooraan zit, met goed zicht op het scherm. " +
      "Pas klikken als het stil is.",
  },
  {
    type: "audio",
    kop: "Herken je deze stem?",
    bestand: "stemmen-mix.mp3",
    spreker: "Mathias",
    script:
      "Niets zeggen. De stemmen starten vanzelf zodra je op dit scherm komt. Eerst een voor een, dan allemaal door elkaar. " +
      "Het duurt ongeveer twintig seconden. Wie Lena kent, herkent haar meteen.",
  },
  {
    type: "citaat",
    tekst: "We zijn hier niet om vrienden te maken hé mannekes.",
    naklap: "Jokes on you.",
    spreker: "Britt",
    script:
      "Dag allemaal. Na onze eigen voice of AFAS is het aan mij om het woord over te nemen. " +
      "Vandaag zetten we iemand in de bloemetjes die al twaalf en een half jaar trots onze kantoorboomer is. " +
      "Buiten de uren gedraagt ze zich als een echte mommy on the loose.\n\n" +
      "Lena, toen wij jou leerden kennen zei je altijd heel serieus: we zijn hier niet om vrienden te maken hé mannekes.\n\n" +
      "[KLIK]\n\n" +
      "Tja. Jokes on you. Twaalf en een half jaar, duizenden voice-messages, een shoppingverslaving " +
      "waar bol.com een standbeeld voor mag zetten en ontelbare rookpauzes later zijn we toch echte vrienden geworden.\n\n" +
      "Vandaag vertellen we jouw verhaal. Met jouw eigen woorden.",
  },

  /* ============================================================ hoofdstuk 1 */
  {
    type: "hoofdstuk",
    nummer: 1,
    clip: "lena-a.mp4",
    titel: "Waar het begon",
    zin: "Wat zeg je?",
    grap: "Want hè zeggen, dat doet een beleefde dame niet.",
    spreker: "Esmee",
    script:
      "Het fragment speelt vanzelf. Daarna verschijnt de grap ook vanzelf.\n\n" +
      "Twee woorden die iedereen in deze zaal al van Lena gehoord heeft. Meestal meerdere keren per dag.",
  },
  {
    type: "vraag",
    kicker: "Handen omhoog",
    vraag: "Wie moest vandaag al iets herhalen voor Lena?",
    antwoord: "Zeg het nog eens wat luider. Ze heeft het niet gehoord.",
    spreker: "Esmee",
    script: "Vraag het aan de hele zaal en laat de handen even in de lucht. Klik pas als het gelach gaat liggen.",
  },
  {
    type: "audio",
    kop: "Zeg eens, wat zeg je?",
    onder: "Ze zegt het zo vaak dat we er een liedje van gemaakt hebben.",
    bestand: "zeg-eens-wat-zeg-je.mp3",
    spreker: "Esmee",
    script:
      "Lena zegt het zo vaak dat we er met AI een liedje van gemaakt hebben. " +
      "Het start vanzelf en duurt een halve minuut. Laat het volledig uitspelen.",
  },
  {
    type: "citaat",
    tekst: "Ik deed ALLES.",
    bron: "Lena, over haar eerste jaren bij AFAS",
    naklap: "En dat zegt ze nog altijd.",
    spreker: "Esmee",
    script:
      "Twaalf en een half jaar geleden begon Lena bij AFAS als commercieel medewerker. " +
      "En als je het haar vraagt, deed ze toen alles.\n\n[KLIK]\n\nEcht alles.",
  },
  {
    type: "reeks",
    kop: "Commercieel medewerker, 2014",
    items: [
      { foto: "vroeger-01.jpg", tekst: "Koud bellen." },
      { foto: "vroeger-06.jpg", tekst: "De website." },
      { foto: "vroeger-04.jpg", tekst: "Mailings." },
      { foto: "vroeger-12.jpg", tekst: "Events." },
      { foto: "vroeger-17.jpg", tekst: "En al de rest." },
    ],
    spreker: "Esmee",
    script:
      "Elke klik legt een foto op de stapel. Lees de onderschriften gerust luidop mee. " +
      "Bij de laatste foto even wachten.",
  },
  {
    type: "collage",
    kop: "Tot ze eventmanager werd",
    fotos: ["events-01.jpg", "events-02.jpg", "events-03.jpg", "events-04.jpg"],
    bijschrift: "De AFAS Open.",
    spreker: "Esmee",
    script: "Elke klik zet er een foto bij.",
  },
  {
    type: "verhaal",
    foto: "events-06.jpg",
    kicker: "Haar hart",
    kop: "De inspiratiediners",
    tekst: ["Met chefs zoals Seppe Nobels."],
    spreker: "Esmee",
    script: "De AFAS Open is het grootste. Maar haar hart ligt bij de inspiratiediners.",
  },
  {
    type: "reeks",
    kop: "Het gezicht van AFAS",
    items: [
      { foto: "stem-01.jpg", tekst: "Levensgroot op de AFAS-banner." },
      { foto: "stem-02.jpg", tekst: "Lena naast Lena." },
    ],
    spreker: "Esmee",
    script:
      "Lena stond niet alleen achter de schermen. Ze stond er gewoon op. Levensgroot.\n\n" +
      "En haar stem? Die hoorde je daarnet al. De voice of AFAS.",
  },

  /* ============================================================ hoofdstuk 2 */
  {
    type: "hoofdstuk",
    nummer: 2,
    clip: "lena-b.mp4",
    titel: "Lena aan het woord",
    zin: "Ik denk gewoon hardop na hé",
    grap: "Ook als er niets na te denken valt.",
    spreker: "Gaëlle",
    script: "Het fragment speelt vanzelf, de grap volgt vanzelf. Niets zeggen tot de grap er staat.",
  },
  {
    type: "vraag",
    kicker: "Handen omhoog",
    vraag: "Wie kreeg ooit een voice-message van Lena van meer dan vijf minuten?",
    antwoord: "En wie heeft hem helemaal uitgeluisterd?",
    spreker: "Gaëlle",
    script: "Laat de handen even in de lucht. Bij het antwoord zakken de meeste handen weer.",
  },
  {
    type: "collage",
    kop: "Geen voice-message? Dan een selfie.",
    fotos: ["selfies-01.jpg", "selfies-02.jpg", "selfies-03.jpg", "selfies-04.jpg"],
    spreker: "Gaëlle",
    script: "Elke klik zet er een selfie bij.",
  },

  /* ============================================================ hoofdstuk 3 */
  {
    type: "hoofdstuk",
    nummer: 3,
    clip: "lena-c.mp4",
    titel: "Agenda's en administratie",
    zin: "Ik had dat toch al gezegd?",
    grap: "Ja Lena. Alleen niet tegen ons.",
    spreker: "Esmee",
    script: "Het fragment speelt vanzelf, de grap volgt vanzelf.",
  },
  {
    type: "vraag",
    vraag: "Lena plant een meeting met jou. Wat checkt ze eerst?",
    antwoord: "Haar eigen agenda. Die van jou? Nooit.",
    spreker: "Esmee",
    script: "Laat de zaal roepen. Wie ooit een uitnodiging kreeg op een moment dat al vol stond, weet het antwoord.",
  },
  {
    type: "video",
    bestand: "grappig-04.mp4",
    onder: "De meeting is al bezig. Lena komt eraan.",
    spreker: "Esmee",
    script:
      "Het filmpje is kort. Klik daarna om het onderschrift te tonen.\n\n" +
      "Meestal zit iedereen al klaar. En dan komt Lena binnen.",
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
      "Lena noemt zichzelf een postduif. Haar eigen woorden. " +
      "Elke klik is een vraag die iemand in deze zaal ooit van haar kreeg. De laatste is echt gebeurd.",
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
    spreker: "Esmee",
    script: "Elke klik is een nieuw plan. Laat de zaal lachen voor je verder klikt.",
  },
  {
    type: "vraag",
    kicker: "Handen omhoog",
    vraag: "Wie heeft ooit iets voor Lena ingestuurd, opgestuurd of opgehaald?",
    antwoord: "Blijf even rechtstaan. Dit applaus is voor jullie.",
    spreker: "Esmee",
    script:
      "Vraag die mensen om recht te staan. Dat wordt de halve zaal. Klik dan en vraag een applaus. " +
      "Lena mag mee applaudisseren. Het is wel het minste.",
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
    fotos: ["mommy-03.jpg", "mommy-04.jpg", "mommy-08.jpg", "mommy-10.jpg", "mommy-07.jpg", "stijl-03.jpg"],
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
    fotos: ["stijl-01.jpg", "stijl-02.jpg", "stijl-05.jpg", "events-09.jpg", "stijl-04.jpg"],
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
    fotos: ["familie-15.jpg", "familie-03.jpg", "familie-12.jpg", "events-17.jpg", "selfies-02.jpg", "familie-01.jpg"],
    bijschrift: "Twaalf en een half jaar later. We hebben even geteld.",
    spreker: "Esmee",
    script: "Elke klik zet er een foto bij. Laat de laatste even staan.",
  },
  {
    type: "video",
    bestand: "interviews.mp4",
    kop: "Is Lena overal dezelfde?",
    spreker: "Mathias",
    script:
      "We vroegen het aan vriendinnen, ex-collega's en collega's. " +
      "Welke zin hoor je meteen in haar stem? Wat kan alleen Lena overkomen? " +
      "En welke eigenschap zou iedereen wat meer mogen hebben?",
    nazien: "De interviewfilmpjes van Mathias opslaan als assets/video/interviews.mp4.",
  },
  {
    type: "collage",
    kop: "Thuis",
    fotos: ["familie-02.jpg", "familie-08.jpg", "familie-11.jpg", "familie-14.jpg"],
    bijschrift: "Mama van Billie Rose. Een hele goede.",
    spreker: "Esmee",
    script: "Elke klik zet er een foto bij. Hier mag het even stil zijn.",
  },
  {
    type: "verhaal",
    foto: "familie-02.jpg",
    kicker: "Thuis",
    kop: "Christophe en Billie Rose",
    tekst: [
      "Billie Rose is haar dochter. Haar grootste trots.",
      "Met Christophe is ze al meer dan tien jaar verloofd.",
    ],
    clou: "Lena organiseert de mooiste events. Haar eigen trouw? Daar denkt ze nog hardop over na.",
    spreker: "Esmee",
    script: "Met een glimlach brengen. Kijk naar Christophe als hij in de zaal zit.",
  },
  {
    type: "vraag",
    kicker: "Uit betrouwbare bron",
    vraag: "Wat zegt Lena thuis als ze moe is?",
    antwoord: "[komt nog van de familie]",
    spreker: "Esmee",
    script: "Laat de zaal raden. Dan het antwoord.",
    nazien: "Antwoord van de familie invullen. Eventueel nog een tweede vraag over Lena thuis toevoegen.",
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
