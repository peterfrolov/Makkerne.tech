# makkerne.tech

Forsiden og menusiderne til Makkerne (Next.js 16, Tailwind 4, Paper Shaders).

- `/` – shader-hero, live eksempler i bokse mens man scroller, pris, forløb, spørgsmål og kontakt
- `/eksempler/`, `/pris/`, `/proces/`, `/faq/` – hvert menupunkt som sin egen side
- Al tekst (dansk og engelsk) ligger i `lib/content.ts`

## Eksempelsiderne

Eksempelsiderne (`/examples/cafe/`, `/examples/frisor/`, `/examples/restaurant/`) ligger stadig i den gamle
makkerne.tech-udrulning. Alle stier, som denne app ikke selv har, hentes derfra (se `next.config.ts`), så
de virker på samme domæne og kan vises live i boksene på forsiden.

Når denne app flyttes over på makkerne.tech-domænet, skal `LEGACY_SITE_URL` i Vercel sættes til den gamle
udrulnings egen adresse (fx `https://<gammelt-projekt>.vercel.app`). Ellers peger den tilbage på sig selv.
Alternativt kan den gamle sides `examples/`-mappe lægges i `public/examples/`, så er der ikke brug for den.

## Kør lokalt

```bash
npm install
npm run dev
```
