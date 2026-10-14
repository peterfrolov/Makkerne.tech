export type Lang = "da" | "en";

export const EMAIL = "blond.nikolaj@gmail.com";
export const PRICE = "599,-";

export type Example = {
  slug: "frisor" | "cafe" | "restaurant";
  href: string;
  name: string;
  place: string;
  industry: string;
  short: string;
  long: string;
  tags: string[];
  features: string[];
};

const da = {
  nav: {
    examples: "Design-eksempler",
    price: "Pris",
    process: "Sådan foregår det",
    faq: "Spørgsmål",
    cta: "Få din side",
    menuOpen: "Åbn menu",
    menuClose: "Luk menu",
  },
  hero: {
    badge: "Til caféer, frisører og restauranter",
    line1: "En helt ny",
    line2: "hjemmeside",
    line3: "til din forretning",
    price: `Kun ${PRICE}`,
    lead: "Vi er to unge iværksættere, der designer og bygger moderne, hurtige hjemmesider til små virksomheder. Én fast pris, ingen abonnement og ingen overraskelser.",
    seeExamples: "Se eksempler",
    write: "Skriv til os",
    ring: "Makkerne • Ny hjemmeside • Kun 599,- • ",
  },
  stats: [
    { value: PRICE, label: "Fast pris, alt inkluderet" },
    { value: "0 kr.", label: "Månedligt abonnement" },
    { value: "Mobil først", label: "Ser godt ud på alle skærme" },
  ],
  examples: {
    title: "Sådan kunne din side se ud",
    lead: "Tre rigtige, levende sider: billeder, slidere, menukort og booking, der virker. Klik på en side og prøv den selv. Din bliver designet fra bunden til netop din forretning.",
    live: "Live",
    try: "Klik og prøv siden",
    open: "Åbn siden",
    seeExample: "Se eksemplet",
    want: "Jeg vil have en som denne",
    all: "Se alle design-eksempler",
    disclaimer: "Navnene ovenfor er opdigtede. Siderne er eksempler på stilen, ikke rigtige kundeprojekter.",
    scrollHint: "Siderne kører live. Klik og prøv dem.",
    pageTitle: "Se hvad vi kan lave til din forretning",
    pageLead: `Eksempler på hjemmesider, sorteret efter branche. Alle sider er bygget fra bunden, virker på telefonen og koster ${PRICE} – navnene er opdigtede.`,
    items: [
      {
        slug: "cafe",
        href: "/examples/cafe/",
        name: "Café Kanel",
        place: "Nørrebro",
        industry: "Café",
        short: "Varm café-side med billedslider, menukort i faner, dagens bagværk at swipe igennem og åbningstider, der viser om der er åbent lige nu.",
        long: "Hyggelig café-side i kanel og creme med store billeder, et menukort i faner og en slider med dagens bagværk.",
        tags: ["Billedslider", "Menukort", "Åben nu", "Mobil først"],
        features: ["Billedslider i toppen", "Menukort med faner og priser", "Dagens bagværk som slider", "Anmeldelser og Instagram-galleri", "Åbningstider med 'åben nu'"],
      },
      {
        slug: "frisor",
        href: "/examples/frisor/",
        name: "Klip & Co.",
        place: "Valby",
        industry: "Frisør & barber",
        short: "Moderne frisørside med prisliste i faner, mød teamet og online booking i fire trin: behandling, frisør, tid og bekræft. Prøv selv at booke.",
        long: "Moderne frisørside i sand og oliven med billedkort, en prisliste, man kan booke direkte fra, og en booking i fire trin.",
        tags: ["Online booking", "Prisliste", "Mød teamet", "Mobil først"],
        features: ["Online booking i fire klik", "Prisliste med faner", "Mød teamet", "Åben/lukket lige nu", "Fast bookingknap på mobilen"],
      },
      {
        slug: "restaurant",
        href: "/examples/restaurant/",
        name: "Restaurant Lyng",
        place: "Frederiksberg",
        industry: "Restaurant",
        short: "Mørk og elegant restaurantside med stor typografi, ugens menu, en slider med retterne og bordbooking, hvor man vælger dato, gæster og tid.",
        long: "Mørk og elegant restaurantside med store billeder, guld-detaljer og en bordbooking, der føles som den rigtige vare.",
        tags: ["Bordbooking", "Ugens menu", "Selskaber", "Gavekort"],
        features: ["Bordbooking med dato, gæster og tid", "Ugens menu og vinmenu", "Slider med retterne", "Events og selskaber", "Gavekort"],
      },
    ] as Example[],
  },
  pricing: {
    title: "Én pris. Hele hjemmesiden.",
    lead: "Ingen pakker at vælge imellem og ingen timepris, der løber løbsk. Du ved, hvad det koster, før vi starter.",
    label: "Fast pris",
    once: "Betales én gang. Ingen binding og intet månedligt abonnement til os.",
    cta: "Kom i gang",
    features: [
      { title: "Design fra bunden", text: "Lavet til din forretning, ikke en skabelon." },
      { title: "Mobilvenlig", text: "Ser skarp ud på telefon, tablet og computer." },
      { title: "Menu, priser og åbningstider", text: "Det dine kunder leder efter, lige til at finde." },
      { title: "Booking og kontakt", text: "Link til dit bookingsystem, telefon, mail og kort." },
      { title: "Hurtig at loade", text: "Ingen tunge temaer, der får folk til at give op." },
      { title: "Klar til Google", text: "Titler og beskrivelser sat op, så du kan blive fundet." },
    ],
    compare: "Til sammenligning koster en ny hjemmeside fra et bureau ofte flere tusinde kroner.",
  },
  process: {
    title: "Fra første mail til færdig side",
    lead: "Ingen lange møder eller tunge briefs. Tre enkle trin.",
    steps: [
      { n: "01", title: "Du skriver til os", text: "Fortæl kort om din forretning, og send gerne et par billeder og dit logo, hvis du har et." },
      { n: "02", title: "Vi designer siden", text: "Du får et udkast at se, og vi retter til, indtil du er tilfreds." },
      { n: "03", title: "Siden går live", text: "Vi sætter siden online og viser dig, hvordan du opdaterer åbningstider og menu." },
    ],
  },
  faq: {
    title: "Det bliver vi tit spurgt om",
    items: [
      { q: "Hvordan er det så billigt?", a: "Vi er to mand uden kontor, sælgere eller mellemled. Siderne er enkle og fokuserede, så vi kan lave dem hurtigt og holde prisen nede." },
      { q: "Skal jeg selv levere tekst og billeder?", a: "Det er en god hjælp, hvis du sender billeder og din menu eller prisliste. Teksterne kan vi skrive for dig ud fra det, du fortæller." },
      { q: "Hvad med domæne og hosting?", a: "Har du allerede et domæne, bruger vi det. Har du ikke, hjælper vi dig med at finde den billigste løsning, så du selv ejer det hele." },
      { q: "Kan jeg ændre noget bagefter?", a: "Ja. Vi retter til undervejs, og når siden er live, kan du altid skrive til os, hvis noget skal opdateres." },
    ],
  },
  contact: {
    title: `Klar til en ny hjemmeside til ${PRICE}?`,
    lead: "Skriv en mail med navnet på din forretning og hvad du laver. Vi svarer typisk samme dag.",
    copy: "Kopiér mail",
    copied: "Kopieret",
  },
  footer: "© 2026 Makkerne",
};

export type Dict = typeof da;

const en: Dict = {
  nav: {
    examples: "Design examples",
    price: "Price",
    process: "How it works",
    faq: "Questions",
    cta: "Get your site",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    badge: "For cafés, hair salons and restaurants",
    line1: "A brand new",
    line2: "website",
    line3: "for your business",
    price: `Only 599 DKK`,
    lead: "We are two young entrepreneurs who design and build modern, fast websites for small businesses. One fixed price, no subscription and no surprises.",
    seeExamples: "See examples",
    write: "Write to us",
    ring: "Makkerne • New website • Only 599 DKK • ",
  },
  stats: [
    { value: "599 DKK", label: "Fixed price, everything included" },
    { value: "0 kr.", label: "Monthly subscription" },
    { value: "Mobile first", label: "Looks great on every screen" },
  ],
  examples: {
    title: "This is what your site could look like",
    lead: "Three real, living sites: photos, sliders, menus and booking that works. Click a site and try it yourself. Yours is designed from scratch for your business.",
    live: "Live",
    try: "Click to try the site",
    open: "Open the site",
    seeExample: "See the example",
    want: "I want one like this",
    all: "See all design examples",
    disclaimer: "The names above are made up. The sites show the style, they are not real client projects.",
    scrollHint: "These sites are running live. Click to try them.",
    pageTitle: "See what we can make for your business",
    pageLead: `Example websites, sorted by industry. Every site is built from scratch, works on phones and costs 599 DKK. The names are made up.`,
    items: [
      {
        ...da.examples.items[0],
        industry: "Café",
        short: "A warm café site with a photo slider, a tabbed menu, today's bakes to swipe through and opening hours that show whether it is open right now.",
        long: "A cosy café site in cinnamon and cream with big photos, a tabbed menu and a slider with today's bakes.",
        tags: ["Photo slider", "Menu", "Open now", "Mobile first"],
        features: ["Photo slider at the top", "Tabbed menu with prices", "Today's bakes as a slider", "Reviews and Instagram gallery", "Opening hours with 'open now'"],
      },
      {
        ...da.examples.items[1],
        industry: "Hair salon & barber",
        short: "A modern salon site with a tabbed price list, meet the team and online booking in four steps: service, stylist, time and confirm. Try booking yourself.",
        long: "A modern salon site in sand and olive with photo cards, a price list you can book from directly, and four-step booking.",
        tags: ["Online booking", "Price list", "Meet the team", "Mobile first"],
        features: ["Online booking in four clicks", "Tabbed price list", "Meet the team", "Open/closed right now", "Sticky booking button on mobile"],
      },
      {
        ...da.examples.items[2],
        industry: "Restaurant",
        short: "A dark, elegant restaurant site with big typography, this week's menu, a slider of the dishes and table booking where you pick date, guests and time.",
        long: "A dark, elegant restaurant site with large photos, gold details and table booking that feels like the real thing.",
        tags: ["Table booking", "This week's menu", "Private dining", "Gift cards"],
        features: ["Table booking with date, guests and time", "Weekly menu and wine pairing", "Slider of the dishes", "Events and private dining", "Gift cards"],
      },
    ],
  },
  pricing: {
    title: "One price. The whole website.",
    lead: "No packages to choose between and no hourly rate that runs away. You know what it costs before we start.",
    label: "Fixed price",
    once: "Paid once. No lock-in and no monthly subscription to us.",
    cta: "Get started",
    features: [
      { title: "Designed from scratch", text: "Made for your business, not a template." },
      { title: "Mobile friendly", text: "Looks sharp on phone, tablet and computer." },
      { title: "Menu, prices and opening hours", text: "What your customers look for, easy to find." },
      { title: "Booking and contact", text: "Link to your booking system, phone, email and map." },
      { title: "Fast to load", text: "No heavy themes that make people give up." },
      { title: "Ready for Google", text: "Titles and descriptions set up so you can be found." },
    ],
    compare: "For comparison, a new website from an agency often costs several thousand kroner.",
  },
  process: {
    title: "From first email to finished site",
    lead: "No long meetings or heavy briefs. Three simple steps.",
    steps: [
      { n: "01", title: "You write to us", text: "Tell us briefly about your business, and feel free to send a few photos and your logo if you have one." },
      { n: "02", title: "We design the site", text: "You get a draft to look at, and we adjust it until you are happy." },
      { n: "03", title: "The site goes live", text: "We put the site online and show you how to update opening hours and the menu." },
    ],
  },
  faq: {
    title: "What people often ask us",
    items: [
      { q: "How is it so cheap?", a: "We are two people with no office, salespeople or middlemen. The sites are simple and focused, so we can make them quickly and keep the price down." },
      { q: "Do I have to supply text and photos?", a: "It helps a lot if you send photos and your menu or price list. We can write the texts for you based on what you tell us." },
      { q: "What about domain and hosting?", a: "If you already have a domain, we use it. If not, we help you find the cheapest option so you own everything yourself." },
      { q: "Can I change things afterwards?", a: "Yes. We adjust along the way, and once the site is live you can always write to us if something needs updating." },
    ],
  },
  contact: {
    title: `Ready for a new website for 599 DKK?`,
    lead: "Send an email with the name of your business and what you do. We usually reply the same day.",
    copy: "Copy email",
    copied: "Copied",
  },
  footer: "© 2026 Makkerne",
};

export const dict: Record<Lang, Dict> = { da, en };
