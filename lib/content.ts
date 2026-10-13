export type Lang = "da" | "en";

export const EMAIL = "blond.nikolaj@gmail.com";
export const PRICE = "599,-";
export const FREE_SPOTS = 5;

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
    price: `Gratis for de første ${FREE_SPOTS} virksomheder`,
    normal: `Normalt ${PRICE}`,
    lead: "Vi er to unge iværksættere, der designer og bygger moderne, hurtige hjemmesider til små virksomheder. Lige nu laver vi siden gratis til de første 5 virksomheder. Til gengæld må vi vise den frem.",
    seeExamples: "Se eksempler",
    write: "Skriv til os",
    ring: "Makkerne • Ny hjemmeside • Gratis for de første 5 • ",
  },
  stats: [
    { value: "Gratis", label: `For de første ${FREE_SPOTS} (normalt ${PRICE})` },
    { value: "0 kr.", label: "Månedligt abonnement" },
    { value: "Mobil først", label: "Ser godt ud på alle skærme" },
  ],
  examples: {
    title: "Sådan kunne din side se ud",
    lead: "Tre bud på hjemmesider til forskellige brancher. Hver side bliver designet fra bunden, så den passer til netop din forretning.",
    live: "Live",
    open: "Åbn siden",
    seeExample: "Se eksemplet",
    want: "Jeg vil have en som denne",
    all: "Se alle design-eksempler",
    disclaimer: "Navnene ovenfor er opdigtede. Siderne er eksempler på stilen, ikke rigtige kundeprojekter.",
    scrollHint: "Siderne kører live. Scroll, så scroller de med.",
    pageTitle: "Se hvad vi kan lave til din forretning",
    pageLead: `Eksempler på hjemmesider, sorteret efter branche. Alle sider er bygget fra bunden, virker på telefonen og er gratis for de første ${FREE_SPOTS} virksomheder (normalt ${PRICE}). Navnene er opdigtede.`,
    items: [
      {
        slug: "cafe",
        href: "/examples/cafe/",
        name: "Café Kanel",
        place: "Nørrebro",
        industry: "Café",
        short: "Varm og indbydende side, hvor menu, åbningstider og adresse er det første, gæsten ser. Lavet til at blive tjekket på telefonen på vej forbi.",
        long: "Lys og legende café-side med en mosaik af mad og drikke, store knapper og farver, der passer til brandet.",
        tags: ["Menu", "Åbningstider", "Kort & adresse", "Mobil først"],
        features: ["Menukort", "Flere adresser", "Gavekort, takeaway og firmabestilling", "Ofte stillede spørgsmål"],
      },
      {
        slug: "frisor",
        href: "/examples/frisor/",
        name: "Klip & Co.",
        place: "Valby",
        industry: "Frisør & barber",
        short: "Rolig og eksklusiv side med en prisliste, der er nem at læse, og online booking i fire klik. Knappen til booking følger med hele vejen ned ad siden, også på telefonen.",
        long: "Rolig og eksklusiv frisørside med varme farver, store billeder og en booking, der virker lige så godt på telefonen som på computeren.",
        tags: ["Online booking", "Prisliste", "Mød teamet", "Mobil først"],
        features: ["Online booking i fire klik", "Prisliste med faner", "Mød teamet", "Åben/lukket lige nu", "Fast bookingknap på mobilen"],
      },
      {
        slug: "restaurant",
        href: "/examples/restaurant/",
        name: "Restaurant Lyng",
        place: "Frederiksberg",
        industry: "Restaurant",
        short: "Varm og personlig restaurantside med stor typografi, levende billeder og bordbooking direkte fra forsiden. Menu, events, gavekort og åbningstider – på dansk og engelsk.",
        long: "Varm og personlig restaurantside med stor typografi, store billeder og håndtegnede detaljer.",
        tags: ["Bordbestilling", "Menu", "Selskaber", "Dansk & engelsk"],
        features: ["Bordbooking", "Ugens menu", "Events og selskaber", "Gavekort", "Dansk og engelsk"],
      },
    ] as Example[],
  },
  pricing: {
    title: "Gratis for de første 5. Hele hjemmesiden.",
    lead: "Vi er nye og vil hellere vise rigtige kunders sider frem end opdigtede eksempler. Derfor laver vi de første 5 hjemmesider gratis. Bagefter koster en side 599,-.",
    label: "Introtilbud",
    normal: `Normalt ${PRICE}`,
    once: "Ingen binding og intet månedligt abonnement. Siden er din.",
    dealTitle: "Det beder vi om til gengæld",
    deal: [
      "At vi må vise din side frem på makkerne.tech",
      "Et par ord fra dig om samarbejdet, når siden er live",
    ],
    cta: "Få din gratis side",
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
      { q: "Hvorfor er det gratis?", a: "Vi er nye og har brug for rigtige sider at vise frem. Du får en ny hjemmeside, og vi får lov at vise den på makkerne.tech sammen med et par ord fra dig, når den er live. Det gælder de første 5 virksomheder. Derefter koster en side 599,-." },
      { q: "Hvordan kan en side normalt koste kun 599,-?", a: "Vi er to mand uden kontor, sælgere eller mellemled. Siderne er enkle og fokuserede, så vi kan lave dem hurtigt og holde prisen nede." },
      { q: "Skal jeg selv levere tekst og billeder?", a: "Det er en god hjælp, hvis du sender billeder og din menu eller prisliste. Teksterne kan vi skrive for dig ud fra det, du fortæller." },
      { q: "Hvad med domæne og hosting?", a: "Har du allerede et domæne, bruger vi det. Har du ikke, hjælper vi dig med at finde den billigste løsning, så du selv ejer det hele." },
      { q: "Kan jeg ændre noget bagefter?", a: "Ja. Vi retter til undervejs, og når siden er live, kan du altid skrive til os, hvis noget skal opdateres." },
    ],
  },
  contact: {
    title: `Vil du være en af de første ${FREE_SPOTS}?`,
    lead: "Skriv en mail med navnet på din forretning og hvad du laver, så laver vi din side gratis. Vi svarer typisk samme dag.",
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
    price: `Free for the first ${FREE_SPOTS} businesses`,
    normal: "Normally 599 DKK",
    lead: "We are two young entrepreneurs who design and build modern, fast websites for small businesses. Right now we build the site for free for the first 5 businesses. In return, we get to show it off.",
    seeExamples: "See examples",
    write: "Write to us",
    ring: "Makkerne • New website • Free for the first 5 • ",
  },
  stats: [
    { value: "Free", label: `For the first ${FREE_SPOTS} (normally 599 DKK)` },
    { value: "0 kr.", label: "Monthly subscription" },
    { value: "Mobile first", label: "Looks great on every screen" },
  ],
  examples: {
    title: "This is what your site could look like",
    lead: "Three takes on websites for different industries. Every site is designed from scratch to fit your business.",
    live: "Live",
    open: "Open the site",
    seeExample: "See the example",
    want: "I want one like this",
    all: "See all design examples",
    disclaimer: "The names above are made up. The sites show the style, they are not real client projects.",
    scrollHint: "These sites are running live. Scroll and they scroll along.",
    pageTitle: "See what we can make for your business",
    pageLead: `Example websites, sorted by industry. Every site is built from scratch, works on phones and is free for the first 5 businesses (normally 599 DKK). The names are made up.`,
    items: [
      {
        ...da.examples.items[0],
        industry: "Café",
        short: "A warm, inviting site where the menu, opening hours and address are the first thing guests see. Made to be checked on the phone while walking past.",
        long: "A bright, playful café site with a mosaic of food and drinks, big buttons and colours that match the brand.",
        tags: ["Menu", "Opening hours", "Map & address", "Mobile first"],
        features: ["Menu card", "Several locations", "Gift cards, takeaway and corporate orders", "Frequently asked questions"],
      },
      {
        ...da.examples.items[1],
        industry: "Hair salon & barber",
        short: "A calm, exclusive site with an easy-to-read price list and online booking in four clicks. The booking button follows you all the way down the page, on phones too.",
        long: "A calm, exclusive salon site with warm colours, large photos and booking that works just as well on the phone as on the computer.",
        tags: ["Online booking", "Price list", "Meet the team", "Mobile first"],
        features: ["Online booking in four clicks", "Tabbed price list", "Meet the team", "Open/closed right now", "Sticky booking button on mobile"],
      },
      {
        ...da.examples.items[2],
        industry: "Restaurant",
        short: "A warm, personal restaurant site with big typography, lively photos and table booking straight from the front page. Menu, events, gift cards and opening hours – in Danish and English.",
        long: "A warm, personal restaurant site with big typography, large photos and hand-drawn details.",
        tags: ["Table booking", "Menu", "Private dining", "Danish & English"],
        features: ["Table booking", "This week's menu", "Events and private dining", "Gift cards", "Danish and English"],
      },
    ],
  },
  pricing: {
    title: "Free for the first 5. The whole website.",
    lead: "We are new and would rather show real clients' sites than made-up examples. That is why we build the first 5 websites for free. After that, a site costs 599 DKK.",
    label: "Launch offer",
    normal: "Normally 599 DKK",
    once: "No lock-in and no monthly subscription. The site is yours.",
    dealTitle: "What we ask in return",
    deal: [
      "That we may show your site on makkerne.tech",
      "A few words from you about working with us once the site is live",
    ],
    cta: "Get your free site",
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
      { q: "Why is it free?", a: "We are new and need real sites to show. You get a new website, and we get to show it on makkerne.tech together with a few words from you once it is live. This applies to the first 5 businesses. After that, a site costs 599 DKK." },
      { q: "How can a site normally cost only 599 DKK?", a: "We are two people with no office, salespeople or middlemen. The sites are simple and focused, so we can make them quickly and keep the price down." },
      { q: "Do I have to supply text and photos?", a: "It helps a lot if you send photos and your menu or price list. We can write the texts for you based on what you tell us." },
      { q: "What about domain and hosting?", a: "If you already have a domain, we use it. If not, we help you find the cheapest option so you own everything yourself." },
      { q: "Can I change things afterwards?", a: "Yes. We adjust along the way, and once the site is live you can always write to us if something needs updating." },
    ],
  },
  contact: {
    title: `Want to be one of the first ${FREE_SPOTS}?`,
    lead: "Send an email with the name of your business and what you do, and we will build your site for free. We usually reply the same day.",
    copy: "Copy email",
    copied: "Copied",
  },
  footer: "© 2026 Makkerne",
};

export const dict: Record<Lang, Dict> = { da, en };
