/* Alle tekst van de show staat hier. Pas hier aan, nooit in main.js.
   Elk scherm heeft 'spreker' en 'script': dat komt op het spiekbriefje terecht.
   'nazien' markeert een verzonnen detail dat jullie moeten checken of invullen. */

const SHOW = [

  /* ---------------------------------------------------------------- aanloop */
  {
    type: "titel",
    kicker: "29 oktober 2026",
    titel: "Lena",
    jaren: "twaalf en een half jaar",
    onder: "Een jubileumshow in vier rondes, een liedje en veel te veel foto's.",
    spreker: "—",
    script: "Dit scherm staat op terwijl iedereen binnenkomt en gaat zitten. Pas klikken als het stil is.",
  },

  /* ------------------------------------------------------------- 1. de stem */
  {
    type: "audio",
    kop: "Luister even mee",
    bestand: "uitspraken.mp3",
    regels: [
      "Wat zeg je?",
      "Ik denk gewoon hardop na hé.",
      "Ik had dat toch al gezegd?",
      "We zijn hier niet om vrienden te maken.",
      "Ik heb daar geen headspace voor.",
    ],
    spreker: "Mathias",
    script:
      "Niets zeggen. Start het fragment en laat de zaal raden wie er praat. " +
      "Elke klik zet er een zin bij, telkens net nadat je ze hoort.",
    nazien: "Audiofragment met de AI-stem van Lena nog opnemen en opslaan als assets/audio/uitspraken.mp3.",
  },

  /* ----------------------------------------------------------- 2. intro Britt */
  {
    type: "citaat",
    tekst: "We zijn hier niet om vrienden te maken hé mannekes.",
    bron: "Lena, ergens in haar eerste jaar",
    naklap: "Jokes on you.",
    spreker: "Britt",
    script:
      "Dag allemaal. Na onze eigen voice of AFAS is het aan mij om het woord over te nemen. " +
      "Vandaag zetten we iemand in de bloemetjes die al twaalf en een half jaar lang trots onze kantoorboomer is. " +
      "En buiten de uren gedraagt ze zich als een echte mommy on the loose.\n\n" +
      "Lena, toen wij jou leerden kennen zei je altijd best serieus: we zijn hier niet om vrienden te maken hé mannekes.\n\n" +
      "[KLIK]\n\n" +
      "Tja. Jokes on you. Want na twaalf en een half jaar, duizenden voice-messages, een shoppingverslaving " +
      "waar bol.com een standbeeld voor zou moeten oprichten en ontelbare rookpauzes zijn we hier toch maar mooi " +
      "échte vrienden geworden.\n\n" +
      "Vandaag nemen we je mee in een show vol herinneringen en een gezonde dosis chaos. Precies zoals we jou het liefste hebben.",
  },

  /* -------------------------------------------------------------- ronde 1 */
  {
    type: "deel",
    nummer: "01",
    titel: "Wat zeg je?",
    onder: "Over hoe Lena praat",
    spreker: "Esmee",
    script:
      "We beginnen met een rondje taal. Handen in de lucht wie het antwoord denkt te weten. " +
      "Lena, jij mag ook meedoen. Al voorspel ik dat je het van jezelf niet weet.",
  },
  {
    type: "vraag",
    vraag: "Hoeveel zinnen spreekt Lena per dag uit zonder één Engels woord?",
    foto: "grappig-07.jpg",
    keuzes: ["Een stuk of twaalf", "Drie", "Nul"],
    juist: 2,
    antwoord: "Nul. En dat is dan meteen haar personal best.",
    spreker: "Esmee",
    script: "Laat de zaal roepen. Klik dan het antwoord open. De grap zit in het laatste woord.",
  },
  {
    type: "vraag",
    vraag: "Lena zegt: ik denk gewoon hardop na hé. Wanneer zegt ze dat?",
    foto: "grappig-13.jpg",
    keuzes: ["Als ze echt aan het nadenken is", "Als ze iets vergeten is", "Altijd"],
    juist: 2,
    antwoord: "Altijd. Vooral wanneer het nergens over gaat.",
    spreker: "Esmee",
    script: "Kort houden. Doorklikken zodra de eerste mensen beginnen te lachen.",
  },
  {
    type: "vraag",
    vraag: "Je vertelt Lena iets belangrijks. Wat antwoordt ze?",
    foto: "selfies-03.jpg",
    keuzes: ["Ja, goed", "Dat zet ik in mijn agenda", "Wat zeg je?"],
    juist: 2,
    antwoord: "Wat zeg je?",
    spreker: "Esmee",
    script:
      "Dit antwoord mag de hele zaal luidop meeroepen. Tel af: drie, twee, een. Dan klikken.",
  },

  /* -------------------------------------------------------------- ronde 2 */
  {
    type: "deel",
    nummer: "02",
    titel: "De agenda van Lena",
    onder: "Of wat daarvan overblijft",
    spreker: "Gaëlle",
    script: "Ronde twee. Nu wordt het persoonlijk.",
  },
  {
    type: "vraag",
    vraag: "Lena organiseert een event voor honderden mensen. Hoeveel minuten te laat komt ze toe?",
    foto: "events-06.jpg",
    keuzes: ["Vijf", "Twintig", "Ze is nog onderweg"],
    juist: 2,
    antwoord: "Ze is nog onderweg. Maar het event zelf begon stipt op tijd.",
    spreker: "Gaëlle",
    script:
      "Het tweede deel van het antwoord is belangrijk. Haar events kloppen altijd, ook al klopt haar agenda nooit.",
  },
  {
    type: "vraag",
    vraag: "Lena krijgt een uitnodiging voor een meeting. Wat gebeurt er?",
    foto: "selfies-01.jpg",
    keuzes: [
      "Ze aanvaardt en komt",
      "Ze aanvaardt en komt niet",
      "Ze stuurt een voice-message van negen minuten om te vragen waarover het gaat",
    ],
    juist: 2,
    antwoord: "Negen minuten. Daarvan gaan er zeven over iets anders.",
    spreker: "Gaëlle",
    script: "Als er iemand in de zaal zo'n voice-message op zijn gsm heeft staan: laat hem afspelen.",
    nazien: "Staat er bij iemand nog een lange voice-message van Lena op de gsm? Dat is goud waard.",
  },
  {
    type: "vraag",
    vraag: "Wie vult de administratie van haar events in?",
    foto: "events-01.jpg",
    keuzes: ["Lena", "Iemand anders", "We zien wel"],
    juist: 1,
    antwoord: "Iemand anders. Dank je wel, iemand anders.",
    spreker: "Gaëlle",
    script:
      "Vraag aan de zaal wie hier ooit administratie van Lena heeft overgenomen. " +
      "Laat die mensen rechtstaan. Applaus voor hen.",
  },

  /* -------------------------------------------------------------- ronde 3 */
  {
    type: "deel",
    nummer: "03",
    titel: "Mommy on the loose",
    onder: "Wat er na de uren gebeurt",
    spreker: "Esmee",
    script: "Ronde drie. Lena, jij mag even wegkijken. Of net niet.",
  },
  {
    type: "vraag",
    vraag: "Binnen het team heeft Lena een bijnaam. Welke?",
    foto: "vroeger-01.jpg",
    keuzes: ["De mama", "De boomer", "De baas"],
    juist: 1,
    antwoord: "De boomer. Al is ze de enige boomer die nog om vier uur 's nachts buiten staat.",
    spreker: "Esmee",
    script: "Dit is de brug naar de rest van de ronde. Niet te lang blijven hangen.",
  },
  {
    type: "vraag",
    vraag: "Hoeveel pakjes komen er per week toe voor Lena?",
    foto: "stijl-03.jpg",
    keuzes: ["Eén", "Drie", "De koerier heeft een vaste parkeerplaats"],
    juist: 2,
    antwoord: "De koerier heeft een vaste parkeerplaats. En een eigen tas voor de retours.",
    spreker: "Esmee",
    script: "Kijk naar Lena terwijl je het antwoord opent.",
  },
  {
    type: "vraag",
    vraag: "Lena's vriendinnengroep heeft een naam. Welke?",
    foto: "mommy-08.jpg",
    keuzes: ["De Dames", "De Beffers", "De Mommies"],
    juist: 1,
    antwoord: "De Beffers. Vraag niet naar de oorsprong.",
    spreker: "Esmee",
    script:
      "Even wachten na het antwoord. De zaal heeft een paar seconden nodig. " +
      "Dan pas doorklikken naar de volgende vraag.",
  },
  {
    type: "vraag",
    vraag: "Fisnik betrapte Lena op haar scherm. Waarnaar zat ze te kijken?",
    foto: "grappig-09.jpg",
    keuzes: ["Porno", "Een roman", "Een webinar"],
    juist: 1,
    antwoord: "Een roman. Dat is haar verhaal en daar blijft ze bij.",
    spreker: "Esmee",
    script:
      "Laat de zaal eerst luidop A roepen. Open dan pas het antwoord. " +
      "Fisnik in de zaal? Richt je naar hem terwijl je klikt.",
    nazien: "Klopt het verhaal zo? Wie was erbij en wat zei Lena precies?",
  },

  /* -------------------------------------------------------------- ronde 4 */
  {
    type: "deel",
    nummer: "04",
    titel: "De echte Lena",
    onder: "En nu serieus",
    spreker: "Esmee",
    script: "Toon wisselt hier. Rustiger praten, trager klikken.",
  },
  {
    type: "vraag",
    vraag: "Hoeveel AFAS-events heeft Lena in twaalf en een half jaar georganiseerd?",
    foto: "events-12.jpg",
    keuzes: ["Tachtig", "Tweehonderd", "Niemand die het nog kan tellen"],
    juist: 2,
    antwoord: "Niemand die het nog kan tellen. En er is er geen één misgelopen.",
    spreker: "Esmee",
    script: "Dit antwoord mag blijven hangen. Even stil zijn.",
  },
  {
    type: "collage",
    kop: "Dit heeft zij allemaal gebouwd",
    fotos: ["events-03.jpg", "events-05.jpg", "events-08.jpg", "events-09.jpg", "events-13.jpg", "familie-03.jpg"],
    bijschrift: "Twaalf en een half jaar, één agenda die nergens op trok en toch stond alles er altijd.",
    spreker: "Esmee",
    script: "Elke klik zet er een foto bij. Niets zeggen, gewoon laten komen.",
  },
  {
    type: "vraag",
    vraag: "Welke eigenschap van Lena zou iedereen hier wat meer mogen hebben?",
    foto: "familie-01.jpg",
    keuzes: ["Haar geduld om te luisteren", "Haar lef", "Haar warmte"],
    juist: 0,
    antwoord: "Je kan bij haar alles kwijt. Echt alles.",
    spreker: "Esmee",
    script:
      "Geen quizvraag meer. Vraag het echt aan de zaal en laat twee of drie mensen antwoorden. " +
      "Klik pas daarna door.",
  },

  /* -------------------------------------------------------------- liedje */
  {
    type: "liedje",
    kop: "Thinking Out Loud",
    onder: "naar Ed Sheeran, met excuses",
    regels: [
      { tekst: "Als je agenda niet meer werkt zoals voorheen" },
      { tekst: "En je meeting is allang voorbij" },
      { tekst: "Zal je mond dan nog altijd wat zeg je roepen" },
      { tekst: "En vergeet je ons er dan nog bij" },
      { tekst: "En schatje, ik stuur een voice-note van tien minuten lang" },
      { tekst: "En baby, ik denk gewoon hardop na, dat is mijn gang" },
    ],
    spreker: "Britt + Matthias Raes",
    script:
      "Matthias zingt het couplet. De tekst verschijnt regel per regel mee, " +
      "dus klik op het ritme van de zang.",
    nazien: "Matthias Raes nog vragen. En samen de tekst op de melodie leggen.",
  },
  {
    type: "liedje",
    kop: "Allemaal mee",
    regels: [
      { tekst: "Dus honey now", refrein: true },
      { tekst: "Neem mij mee naar de rookpauze buiten", refrein: true },
      { tekst: "Twaalf en een half jaar en we zijn nog niet moe", refrein: true },
      { tekst: "Leg je hoofd maar op dat kloppend hart", refrein: true },
      { tekst: "Ik denk gewoon hardop na", refrein: true },
      { tekst: "Misschien zijn we toch vrienden geworden hier", refrein: true },
    ],
    spreker: "Britt + Matthias Raes",
    script:
      "Het refrein. Nodig de zaal uit om mee te zingen voor je de eerste regel opent. " +
      "De laatste regel is het bruggetje naar de rest van de show.",
  },

  /* -------------------------------------------------------------- filmpjes */
  {
    type: "deel",
    nummer: "05",
    titel: "Is Lena overal dezelfde?",
    onder: "Vriendinnen, ex-collega's en Billie",
    spreker: "Mathias",
    script:
      "We vroegen aan een paar mensen: welke zin hoor je meteen in haar stem? " +
      "En wat is het meest typische dat alleen Lena kan overkomen?",
  },
  {
    type: "video",
    bestand: "grappig-02.mp4",
    kop: "Welke zin hoor je meteen in haar stem?",
    spreker: "Mathias",
    script: "Het filmpje start vanzelf. Niets zeggen tot het gedaan is.",
    nazien: "Vervangen door het echte interviewfilmpje.",
  },
  {
    type: "video",
    bestand: "mommy-02.mp4",
    kop: "Wat kan alleen Lena overkomen?",
    spreker: "Mathias",
    script: "Idem. Laat het filmpje het werk doen.",
    nazien: "Vervangen door het echte interviewfilmpje.",
  },
  {
    type: "video",
    bestand: "grappig-04.mp4",
    kop: "Welke eigenschap van Lena zou iedereen wat meer mogen hebben?",
    spreker: "Mathias",
    script: "Dit is het laatste filmpje en het bruggetje naar de toast. Rustig doorklikken.",
    nazien: "Vervangen door het echte interviewfilmpje.",
  },

  /* -------------------------------------------------------------- toast */
  {
    type: "foto",
    foto: "stijl-05.jpg",
    vol: true,
    kop: "Wij kunnen niet meer zonder jou",
    spreker: "Britt",
    script:
      "Zo, genoeg gelachen en geplaagd. Want als we alle grappen over vergeten meetings, " +
      "doorgeschoven administratie en hardop nadenken opzij zetten, dan blijft er maar één ding over: " +
      "wij kunnen niet meer zonder jou.\n\n" +
      "Onder al die Engelse en Franse woorden en spontane selfies zit een collega met een hart van goud. " +
      "Je bent er altijd als iemand een luisterend oor nodig heeft en je zorgt ervoor dat elk AFAS-event klopt.",
  },
  {
    type: "slot",
    kop: "Merci, Lena",
    onder: "Voor de chaos, de warmte en de twaalf en een half jaar.",
    naam: "Je collega's. En ja, ook je vrienden.",
    spreker: "Britt",
    script:
      "Lena, jij bent een fantastische, warme en unieke eventmanager en vriendin. " +
      "Bedankt voor de afgelopen jaren.\n\n" +
      "[KLIK] Glazen omhoog.",
  },
];
