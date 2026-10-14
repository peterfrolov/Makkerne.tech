export type Lang = "da" | "en";

export const EMAIL = "blond.nikolaj@gmail.com";
export const PRICE = "599,-";

export type Example = {
  slug: "vvs" | "tomrer" | "maler";
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
    examples: "Eksempler",
    price: "Pris",
    process: "Sådan foregår det",
    faq: "Spørgsmål",
    cta: "Få din side",
    menuOpen: "Åbn menu",
    menuClose: "Luk menu",
  },
  hero: {
    badge: "Hjemmesider til VVS'ere, tømrere, malere og andre håndværkere",
    line1: "Du klarer håndværket.",
    line2: "Vi klarer siden.",
    line3: "Så ringer kunderne.",
    price: `Fast pris: ${PRICE}`,
    lead: "Du har travlt nok ude på pladsen. Vi bygger en hjemmeside, der får folk til at ringe: dine ydelser, billeder af dit arbejde, dine anmeldelser og en knap til at få et tilbud. Du sender et par billeder fra telefonen. Vi gør resten.",
    seeExamples: "Se eksempler",
    write: "Skriv til os",
    ring: "Makkerne • Hjemmesider til håndværkere • 599,- • ",
  },
  stats: [
    { value: PRICE, label: "Fast pris, alt inkluderet" },
    { value: "0 kr.", label: "Månedligt abonnement" },
    { value: "1 tryk", label: "Fra Google til din telefon" },
  ],
  examples: {
    title: "Sådan kunne din side se ud",
    lead: "Tre rigtige, levende sider til en VVS'er, en tømrer og en maler. Før og efter-billeder, anmeldelser, prisberegner og en tilbudsformular, der virker. Klik og prøv selv. Din side bliver lavet til netop dit firma.",
    live: "Live",
    try: "Klik og prøv siden",
    open: "Åbn siden",
    seeExample: "Se eksemplet",
    want: "Jeg vil have en som denne",
    all: "Se alle eksempler",
    disclaimer: "Firmaerne ovenfor er opdigtede. Siderne viser, hvad vi kan bygge, de er ikke rigtige kundeprojekter.",
    scrollHint: "Siderne kører live. Klik og prøv dem.",
    pageTitle: "Se hvad vi kan lave til dit firma",
    pageLead: `Eksempler på hjemmesider til håndværkere. Alle sider er bygget fra bunden, virker på telefonen og koster ${PRICE}. Firmanavnene er opdigtede.`,
    items: [
      {
        slug: "vvs",
        href: "/examples/vvs/",
        name: "Holm VVS",
        place: "Herlev",
        industry: "VVS",
        short: "VVS-side, der er bygget til at få telefonen til at ringe: døgnvagt i toppen, en guide med typiske priser, før og efter-billeder, tjek af område og en tilbudsformular.",
        long: "Skarp VVS-side i marineblå og signalorange, hvor kunden med ét tryk kan ringe, se hvad det typisk koster og bestille en VVS'er.",
        tags: ["Ring nu", "Døgnvagt", "Før og efter", "Tilbudsformular"],
        features: ["Døgnvagt og ring nu-knap i toppen", "'Hvad er der galt?' med typiske priser", "Før og efter, man kan trække i", "Tjek om vi kører til dit postnummer", "Tilbudsformular i tre trin"],
      },
      {
        slug: "tomrer",
        href: "/examples/tomrer/",
        name: "Egholm Tømrer",
        place: "Roskilde",
        industry: "Tømrer",
        short: "Rolig og solid tømrerside med ydelser i faner, projektgalleri med filtre, før og efter af en tilbygning og booking af en gratis besigtigelse.",
        long: "Varm tømrerside i træ og skovgrøn med store billeder af arbejdet, et galleri man kan filtrere og booking af besigtigelse.",
        tags: ["Projektgalleri", "Før og efter", "Gratis besigtigelse", "Anmeldelser"],
        features: ["Ydelser i faner med tidsramme", "Projektgalleri med filtre og storbilleder", "Før og efter af en tilbygning", "Sådan arbejder vi, trin for trin", "Booking af gratis besigtigelse"],
      },
      {
        slug: "maler",
        href: "/examples/maler/",
        name: "Malerfirmaet Kulør",
        place: "Odense",
        industry: "Maler",
        short: "Frisk malerside med en prisberegner, en farveguide med rigtige rum, før og efter og en tilbudsformular, der tager den beregnede pris med.",
        long: "Lys malerside, hvor kunden selv kan regne en pris ud og klikke sig igennem farver vist i rigtige rum.",
        tags: ["Prisberegner", "Farveguide", "Før og efter", "Tilbudsformular"],
        features: ["Prisberegner med m² og spartling", "Farveguide med rigtige rum", "Før og efter, man kan trække i", "Anmeldelser fra Google", "Tilbudsformular med prisen udfyldt"],
      },
    ] as Example[],
  },
  pricing: {
    title: "Én pris. Hele hjemmesiden.",
    lead: "Ingen pakker at vælge imellem og ingen timepris, der løber løbsk. Ligesom et ordentligt tilbud: du ved, hvad det koster, før vi går i gang.",
    label: "Fast pris",
    once: "Betales én gang. Ingen binding og intet månedligt abonnement til os.",
    cta: "Kom i gang",
    features: [
      { title: "Ring nu og få et tilbud", text: "En knap til din telefon og en formular, der sender forespørgslen direkte til din mail." },
      { title: "Billeder af dit arbejde", text: "Før og efter og et galleri. Det er dit bedste salgsargument." },
      { title: "Dine anmeldelser", text: "Vis stjernerne fra Google eller Trustpilot, så nye kunder tør ringe." },
      { title: "Ydelser og område", text: "Hvad du laver, og hvor du kører, så du får de rigtige opkald." },
      { title: "Skarp på mobilen", text: "De fleste søger efter en håndværker på telefonen. Siden er bygget til det." },
      { title: "Klar til Google", text: "Sat op, så du kan blive fundet, når nogen søger 'VVS Herlev' eller 'maler Odense'." },
    ],
    compare: "Til sammenligning koster en ny hjemmeside fra et bureau ofte flere tusinde kroner.",
  },
  process: {
    title: "Det tager dig et kvarter",
    lead: "Ingen møder og ingen lange mails. Du passer dit arbejde, vi klarer resten.",
    steps: [
      { n: "01", title: "Du ringer eller skriver", text: "Fortæl hvad du laver, og hvor du kører. Send et par billeder af dit arbejde fra telefonen og dit logo, hvis du har et." },
      { n: "02", title: "Vi bygger siden", text: "Vi skriver teksterne for dig. Du får et udkast at se og retter til, indtil det sidder lige i skabet." },
      { n: "03", title: "Siden går live", text: "Vi sætter den online på dit domæne. Kommer der en ny opgave, du er stolt af, sender du bare billederne." },
    ],
  },
  faq: {
    title: "Det bliver vi tit spurgt om",
    items: [
      { q: "Hvordan er det så billigt?", a: "Vi er to mand uden kontor, sælgere eller mellemled. Siderne er enkle og fokuserede, så vi kan lave dem hurtigt og holde prisen nede." },
      { q: "Jeg har ikke tid til at skrive tekster", a: "Det skal du heller ikke. Fortæl os i telefonen, hvad du laver, så skriver vi det. Billederne tager du med telefonen på næste opgave." },
      { q: "Hvor kommer forespørgslerne hen?", a: "Direkte i din mail, så du kan ringe kunden op, når du har en pause. Og knappen 'Ring nu' ringer bare op til dig." },
      { q: "Jeg har allerede en hjemmeside", a: "Så laver vi en ny, der er hurtigere og nemmere at ringe fra, og flytter dit domæne over, så du beholder din adresse." },
      { q: "Hvad med domæne og hosting?", a: "Har du allerede et domæne, bruger vi det. Har du ikke, hjælper vi dig med at finde den billigste løsning, så du selv ejer det hele." },
      { q: "Kan jeg ændre noget bagefter?", a: "Ja. Vi retter til undervejs, og når siden er live, kan du altid skrive til os, hvis noget skal opdateres." },
    ],
  },
  contact: {
    title: "Klar til en side, der får telefonen til at ringe?",
    lead: `Skriv en mail med dit firmanavn, dit fag og hvor du kører. Siden koster ${PRICE}, og vi svarer typisk samme dag.`,
    copy: "Kopiér mail",
    copied: "Kopieret",
  },
  footer: "© 2026 Makkerne",
};

export type Dict = typeof da;

const en: Dict = {
  nav: {
    examples: "Examples",
    price: "Price",
    process: "How it works",
    faq: "Questions",
    cta: "Get your site",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    badge: "Websites for plumbers, carpenters, painters and other trades",
    line1: "You do the work.",
    line2: "We do the site.",
    line3: "So customers call.",
    price: "Fixed price: 599 DKK",
    lead: "You are busy enough on the job. We build a website that gets people to call: your services, photos of your work, your reviews and a button to get a quote. You send a few photos from your phone. We do the rest.",
    seeExamples: "See examples",
    write: "Write to us",
    ring: "Makkerne • Websites for tradespeople • 599 DKK • ",
  },
  stats: [
    { value: "599 DKK", label: "Fixed price, everything included" },
    { value: "0 kr.", label: "Monthly subscription" },
    { value: "1 tap", label: "From Google to your phone" },
  ],
  examples: {
    title: "This is what your site could look like",
    lead: "Three real, living sites for a plumber, a carpenter and a painter. Before and after photos, reviews, a price calculator and a quote form that works. Click and try them. Yours is made for your business.",
    live: "Live",
    try: "Click to try the site",
    open: "Open the site",
    seeExample: "See the example",
    want: "I want one like this",
    all: "See all examples",
    disclaimer: "The businesses above are made up. The sites show what we can build, they are not real client projects.",
    scrollHint: "These sites are running live. Click to try them.",
    pageTitle: "See what we can make for your business",
    pageLead: "Example websites for tradespeople. Every site is built from scratch, works on phones and costs 599 DKK. The business names are made up.",
    items: [
      {
        ...da.examples.items[0],
        industry: "Plumber",
        short: "A plumber site built to make the phone ring: 24/7 call-out at the top, a guide with typical prices, before and after photos, an area check and a quote form.",
        long: "A sharp plumber site in navy and signal orange, where customers can call in one tap, see typical prices and book a plumber.",
        tags: ["Call now", "24/7 call-out", "Before & after", "Quote form"],
        features: ["24/7 call-out and call button at the top", "'What's wrong?' with typical prices", "Before and after you can drag", "Check if we cover your postcode", "Three-step quote form"],
      },
      {
        ...da.examples.items[1],
        industry: "Carpenter",
        short: "A calm, solid carpenter site with tabbed services, a filterable project gallery, before and after of an extension and booking of a free site visit.",
        long: "A warm carpenter site in wood and forest green with big photos of the work, a filterable gallery and site-visit booking.",
        tags: ["Project gallery", "Before & after", "Free site visit", "Reviews"],
        features: ["Tabbed services with time frames", "Filterable project gallery with lightbox", "Before and after of an extension", "How we work, step by step", "Booking of a free site visit"],
      },
      {
        ...da.examples.items[2],
        industry: "Painter",
        short: "A fresh painter site with a price calculator, a colour guide shown in real rooms, before and after and a quote form that carries the price over.",
        long: "A light painter site where customers work out a price themselves and click through colours shown in real rooms.",
        tags: ["Price calculator", "Colour guide", "Before & after", "Quote form"],
        features: ["Price calculator with m² and filling", "Colour guide with real rooms", "Before and after you can drag", "Reviews from Google", "Quote form with the price filled in"],
      },
    ],
  },
  pricing: {
    title: "One price. The whole website.",
    lead: "No packages to choose between and no hourly rate that runs away. Like a proper quote: you know what it costs before we start.",
    label: "Fixed price",
    once: "Paid once. No lock-in and no monthly subscription to us.",
    cta: "Get started",
    features: [
      { title: "Call now and get a quote", text: "A button to your phone and a form that sends requests straight to your email." },
      { title: "Photos of your work", text: "Before and after and a gallery. It is your best sales pitch." },
      { title: "Your reviews", text: "Show your stars from Google or Trustpilot so new customers dare to call." },
      { title: "Services and area", text: "What you do and where you drive, so you get the right calls." },
      { title: "Sharp on mobile", text: "Most people look for a tradesperson on their phone. The site is built for it." },
      { title: "Ready for Google", text: "Set up so you can be found when someone searches 'plumber Herlev'." },
    ],
    compare: "For comparison, a new website from an agency often costs several thousand kroner.",
  },
  process: {
    title: "It takes you fifteen minutes",
    lead: "No meetings and no long emails. You get on with your work, we handle the rest.",
    steps: [
      { n: "01", title: "You call or write", text: "Tell us what you do and where you work. Send a few photos of your work from your phone, and your logo if you have one." },
      { n: "02", title: "We build the site", text: "We write the texts for you. You get a draft and we adjust it until it is just right." },
      { n: "03", title: "The site goes live", text: "We put it online on your domain. When you finish a job you are proud of, just send us the photos." },
    ],
  },
  faq: {
    title: "What people often ask us",
    items: [
      { q: "How is it so cheap?", a: "We are two people with no office, salespeople or middlemen. The sites are simple and focused, so we can make them quickly and keep the price down." },
      { q: "I don't have time to write texts", a: "You don't have to. Tell us on the phone what you do and we write it. Take the photos with your phone on your next job." },
      { q: "Where do the requests go?", a: "Straight to your email, so you can call the customer back on your break. And the 'Call now' button simply calls you." },
      { q: "I already have a website", a: "Then we make a new one that is faster and easier to call from, and move your domain over so you keep your address." },
      { q: "What about domain and hosting?", a: "If you already have a domain, we use it. If not, we help you find the cheapest option so you own everything yourself." },
      { q: "Can I change things afterwards?", a: "Yes. We adjust along the way, and once the site is live you can always write to us if something needs updating." },
    ],
  },
  contact: {
    title: "Ready for a site that makes the phone ring?",
    lead: "Send an email with your business name, your trade and where you work. The site costs 599 DKK, and we usually reply the same day.",
    copy: "Copy email",
    copied: "Copied",
  },
  footer: "© 2026 Makkerne",
};

export const dict: Record<Lang, Dict> = { da, en };
