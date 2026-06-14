# EverKinetiq — Projectstatus voor Claude

## FASE 1 — Audit & Technische Basis
**Status: Afgerond ✅**

- SEO basis opgezet
- Sitemap en robots toegevoegd
- OG-afbeeldingen opgezet
- JSON-LD LocalBusiness toegevoegd
- Contactformulier gebouwd
- WhatsApp CTA toegevoegd
- Meertalige structuur (nl/en/fr/es/de) gecontroleerd
- Galerij gecontroleerd en uitgebreid

---

## FASE 2 — Design & UX Refresh
**Status: Afgerond ✅**

- Hybride donker/licht design geïmplementeerd
- Hero premium gemaakt (split layout, echte projectfoto, Plus Jakarta Sans)
- Overmatige achtergrondlijnen en visuele ruis verwijderd
- SVG line-art iconen toegevoegd voor alle diensten
- Horizontale project-slider gebouwd (`ProjectSlider.tsx`)
- CTA-banner met echte projectfoto als achtergrond
- Testimonials geïntegreerd (light variant)
- Over-ons sectie vernieuwd (45/55 foto/content split)
- Fotografie prominenter gemaakt door hele pagina
- Correcte projectcategorieën gekoppeld aan foto's (kas=kas, padel=padel)
- Project-detail template gebouwd
- Reviewvelden toegevoegd aan projecten

**Sectie-ritme (niet meer aanpassen):**
```
Hero            #050510  donker
Trust strip     #080818  donker
Diensten        #F5F5F7  licht
Projecten       #FFFFFF  wit + slider
CTA banner      #080818  donker + foto achtergrond
Over ons        #FFFFFF  wit + foto links
Testimonials    #F5F5F7  licht
Nieuws          #FFFFFF  wit
Contact         #0A0A1F  zacht donker
```

**Project-detail template bevat:**
- Hero met projectfoto
- Projectoverzicht (locatie, vermogen, categorie, doorlooptijd)
- Uitdaging
- Aanpak
- Resultaat
- Technische specificaties
- Fotogalerij
- Gerelateerde projecten
- Klantreview
- CTA

---

## FASE 3 — Content & Autoriteit
**Status: Volgende fase 🚀**

| Prioriteit | Taak |
|-----------|------|
| 1 | 3 vlaggenschip-projectcases uitwerken |
| 2 | 3 echte klantreviews toevoegen |
| 3 | Teamfoto en bedrijfsprofiel toevoegen |
| 4 | Eerste SEO-artikelen publiceren |

**Benodigde input per projectcase:**
- Projecttitel
- Locatie
- Categorie (Solar / Kasproject / Renovatie / Warmtepomp / Padel / Carport)
- Vermogen / capaciteit
- Doorlooptijd
- Uitdaging
- Aanpak
- Resultaat
- Technische specificaties
- Review (naam, bedrijf, quote)
- 8–15 foto's uit `/public/projects/`

**Hoe de volgende sessie te starten:**
> "Hier is projectcase #1" + foto-namen + basisinformatie

Dan direct een complete premium projectpagina, SEO-titel, meta description, reviewblok en Sanity-content — zonder tijd te verliezen aan layout of styling.

---

## Technische notities

**Dev server:** `npm run dev -p 3210` (zie `.claude/launch.json`)

**Beschikbare foto's:** 161 echte projectfoto's in `/public/projects/`

**Fonts:** Plus Jakarta Sans (headings) + Inter (body) via Google Fonts

**Geen verdere design-aanpassingen nodig.** De volgende winst zit in content, niet in code.
