# McNab Ventures — Project Structure

## File Tree

```
mcnabventures/
│
├── Configuration
│   ├── .env.local                  Environment variables (gitignored)
│   ├── .env.example                Template for environment setup
│   ├── .gitignore
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── jsconfig.json               Path aliases  @/* → src/*
│   ├── next.config.mjs             Next.js config + custom Cloudinary image loader
│   ├── postcss.config.mjs
│   └── eslint.config.mjs
│
├── Documentation
│   ├── README.md                   Main project docs (tech stack, setup, deployment)
│   ├── PROJECT_STRUCTURE.md        This file
│   ├── SERVER_SIDE_GUIDE.md        WordPress API + data fetching patterns
│   ├── START_HERE.md               Quick-start guide
│   ├── COLORS.md                   Design token reference
│   └── data_map.md                 ACF field → prop mapping reference
│
├── public/                         Static assets (SVGs, fallback images, icons)
│
└── src/
    │
    ├── app/                        Next.js App Router
    │   ├── layout.js               Root layout — fonts, Header, Footer, HeaderProvider
    │   ├── globals.css             Global styles & Tailwind directives
    │   ├── page.js                 Home  /  (WP slug: sample-page)
    │   ├── about-us/
    │   │   └── page.js             /about-us  (WP slug: about-us)
    │   ├── experiences/
    │   │   └── page.js             /experiences  (WP slug: experiences)
    │   ├── [slug]/
    │   │   └── page.js             Dynamic root-level pages
    │   └── group/
    │       └── [slug]/
    │           └── page.js         Dynamic group child pages (parent id 76)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.js           Sticky/transparent header with nav
    │   │   ├── Footer.js           Site footer
    │   │   └── index.js            Barrel export
    │   └── sections/               One component per ACF Flexible Content layout
    │       ├── PrimaryHero.js      acf_fc_layout: primary-hero
    │       ├── SecondaryHero.js    acf_fc_layout: secondary-hero
    │       ├── WhoWeAre.js         acf_fc_layout: who-we-are
    │       ├── MissionStatement.js acf_fc_layout: mission-statement
    │       ├── VideoPlayer.js      acf_fc_layout: video-player
    │       ├── GroupSnapshot.js    acf_fc_layout: group-snapshot
    │       ├── GetHighlights.js    acf_fc_layout: highlights / our-industries
    │       ├── OurJourney.js       acf_fc_layout: our-journey
    │       ├── UsefulLinks.js      acf_fc_layout: useful-links
    │       ├── Multimedia.js       acf_fc_layout: multimedia
    │       ├── ContactCard.js      acf_fc_layout: contact-card
    │       ├── JoinOurTeam.js      acf_fc_layout: join-our-team
    │       ├── OurPartners.js      acf_fc_layout: our-partners
    │       ├── Diversified.js      acf_fc_layout: diversified
    │       ├── FeaturedExperiences.js  acf_fc_layout: featured-experiences
    │       ├── DrivenByProgress.js acf_fc_layout: driven-by-progress
    │       ├── TheExperiences.js   acf_fc_layout: the-experiences
    │       ├── ExperiencesGallery.js   acf_fc_layout: experiences-gallery
    │       ├── SustainabilityInAction.js  acf_fc_layout: sustainability-in-action
    │       ├── ApplyNow.js         acf_fc_layout: active-toggle (when active=true)
    │       └── StayInTheLoop.js    (standalone use)
    │
    ├── context/
    │   └── HeaderContext.js        Transparent ↔ solid header state (React context)
    │
    ├── data/                       Static fallback data per section
    │   ├── index.js                Barrel export
    │   ├── primaryHero.js
    │   ├── secondaryHero.js
    │   ├── missionStatement.js
    │   ├── groupSnapshot.js
    │   ├── getHighlights.js
    │   ├── ourJourney.js
    │   ├── multimedia.js
    │   ├── contactCard.js
    │   ├── featuredExperiences.js
    │   ├── drivenByProgress.js
    │   ├── theExperiences.js
    │   ├── experiencesGallery.js
    │   ├── sustainability.js
    │   ├── ourPartners.js
    │   ├── diversified.js
    │   ├── joinOurTeam.js
    │   ├── stayInTheLoop.js
    │   ├── usefulLinks.js
    │   ├── videoPlayer.js
    │   └── whoWeAre.js
    │
    ├── hooks/
    │   └── useScrollAnimation.js   Intersection Observer → CSS animation helpers
    │
    └── lib/
        ├── wp.js                   WordPress REST API fetch helpers + ISR config
        ├── getSectionComponent.js  ACF flex-layout → React component mapper
        └── imageLoader.js          Custom Next.js loader (Cloudinary-native, q=85 fallback)
```

---

## Architecture

```
Browser
  └── Next.js (ISR, revalidate: 60s)
        ├── Fetches page from WordPress REST API (acf_format=standard)
        │     └── acf.page_components[] → getSectionComponent()
        │           └── Renders <SectionComponent props={...} />
        │
        └── Images
              ├── res.cloudinary.com → imageLoader uses Cloudinary transformations
              └── Other origins       → Next.js /_next/image at quality 85
```

---

## Data Flow

```
GET /wp-json/wp/v2/pages?acf_format=standard&slug={slug}&_embed
  └── page.acf.page_components[]
        └── { acf_fc_layout: string, ...fields }
              └── getSectionConfig(section)
                    ├── normalises image fields (URL string or ACF object with .url)
                    ├── maps to React component
                    └── returns { Component, props }
```

---

## Key Conventions

- **Server Components by default** — all page-level data fetching happens server-side.
- **`'use client'`** only on interactive components (carousels, tabs, header state).
- **Fallback data** in `src/data/` — every section component accepts optional props; if the WP response is empty the static data is shown so the page never breaks.
- **`getUrl(v)`** helper in `getSectionComponent.js` normalises ACF image fields which can be either a plain URL string or an object `{ url, width, height, alt }`.
