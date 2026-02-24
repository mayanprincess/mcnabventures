# McNab Ventures - Next.js + WordPress

A modern marketing/corporate website built with Next.js (App Router) consuming a **headless WordPress** backend via the WP REST API and **Advanced Custom Fields (ACF)**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React 19 |
| CMS / API | WordPress REST API + ACF (hosted on Railway) |
| Images CDN | Cloudinary |
| Styling | Tailwind CSS 4 |
| Package Manager | pnpm |
| Sliders | Embla Carousel, Keen Slider |
| Markdown | react-markdown + rehype-raw |

---

## Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Access to the WordPress instance

---

## Setup

### 1. Clone and install

```bash
git clone <repository-url>
cd mcnabventures
pnpm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
WP_API=https://mcnabventures.up.railway.app/wp-json/wp/v2
```

If not set, the app falls back to that URL automatically (see `src/lib/wp.js`).

### 3. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
mcnabventures/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.js                 # Home page (slug: sample-page)
│   │   ├── layout.js               # Root layout (fonts, Header, Footer)
│   │   ├── globals.css             # Global styles & Tailwind directives
│   │   ├── about-us/page.js        # /about-us static route
│   │   ├── experiences/page.js     # /experiences static route
│   │   ├── [slug]/page.js          # Dynamic root-level page
│   │   └── group/[slug]/page.js    # Dynamic group child page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   └── sections/               # One component per ACF flex layout
│   │       ├── PrimaryHero.js
│   │       ├── SecondaryHero.js
│   │       ├── WhoWeAre.js
│   │       ├── MissionStatement.js
│   │       ├── VideoPlayer.js
│   │       ├── GroupSnapshot.js
│   │       ├── GetHighlights.js
│   │       ├── OurJourney.js
│   │       ├── UsefulLinks.js
│   │       ├── Multimedia.js
│   │       ├── ContactCard.js
│   │       ├── JoinOurTeam.js
│   │       ├── OurPartners.js
│   │       ├── Diversified.js
│   │       ├── FeaturedExperiences.js
│   │       ├── DrivenByProgress.js
│   │       ├── TheExperiences.js
│   │       ├── ExperiencesGallery.js
│   │       ├── SustainabilityInAction.js
│   │       └── ApplyNow.js
│   │
│   ├── context/
│   │   └── HeaderContext.js        # Transparent/solid header state
│   │
│   ├── data/                       # Static fallback data (used when WP is empty)
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.js   # Intersection Observer scroll animations
│   │
│   └── lib/
│       ├── wp.js                   # WordPress REST API helpers
│       ├── getSectionComponent.js  # ACF flex-layout → React component mapper
│       └── imageLoader.js          # Custom Next.js image loader (Cloudinary-aware)
│
├── public/                         # Static assets (SVGs, local images)
├── next.config.mjs                 # Next.js config (custom image loader)
├── postcss.config.mjs
├── jsconfig.json                   # Path aliases (@/* → src/*)
└── package.json
```

---

## How Pages Work

Every page fetches its content from WordPress via `getPageBySlug(slug)` in `src/lib/wp.js`. The response includes an `acf.page_components` array — each item has an `acf_fc_layout` field that names a Flexible Content block.

`getSectionComponent()` in `src/lib/getSectionComponent.js` maps each layout name to its React component and transforms the raw ACF data into typed props.

```
WordPress page (ACF)
  └── acf.page_components[]
        └── { acf_fc_layout: 'primary-hero', heading: '...', video_src: '...' }
              └── getSectionComponent() → <PrimaryHero content={...} />
```

### Adding a new ACF section

1. Create the Flexible Content layout in WordPress (ACF plugin).
2. Create `src/components/sections/MySectionName.js`.
3. Add the mapping in `LAYOUT_TO_COMPONENT` and the `switch` case in `getSectionComponent.js`.

---

## WordPress API helpers (`src/lib/wp.js`)

| Function | Description |
|----------|-------------|
| `getPageBySlug(slug)` | Fetches a single WP page by slug with ACF data (`acf_format=standard`) |
| `getRootPageSlugs()` | All root-level pages (parent=0) for `generateStaticParams` |
| `getGroupPageSlugs()` | All child pages of the "Group" parent (id=76) |

All fetches use `next: { revalidate: 60 }` — pages revalidate every 60 seconds (ISR).

---

## Image Optimization

Images are served from **Cloudinary** (`res.cloudinary.com`). A custom Next.js loader (`src/lib/imageLoader.js`) intercepts every `<Image>` call:

- **Cloudinary URLs** → transformed using Cloudinary's own API (`f_auto,q_auto,c_limit,w_{width}`). No double-compression by Next.js.
- **All other URLs** (WordPress server, local public files) → processed by Next.js `/_next/image` at quality 85.

This ensures Cloudinary images are served at maximum quality with automatic format selection (WebP/AVIF) handled by Cloudinary itself.

---

## Routing

| URL pattern | File | WP slug |
|-------------|------|---------|
| `/` | `app/page.js` | `sample-page` |
| `/about-us` | `app/about-us/page.js` | `about-us` |
| `/experiences` | `app/experiences/page.js` | `experiences` |
| `/[slug]` | `app/[slug]/page.js` | any root page |
| `/group/[slug]` | `app/group/[slug]/page.js` | child of page id 76 |

Reserved slugs (`sample-page`, `about-us`, `experiences`, `group`) are excluded from the dynamic `[slug]` catch-all.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub.
2. Import in Vercel.
3. Add environment variables:
   ```
   WP_API=https://mcnabventures.up.railway.app/wp-json/wp/v2
   ```
4. Deploy.

---

## Troubleshooting

### Images look blurry or low quality
- Confirm images are uploaded to Cloudinary (URL starts with `https://res.cloudinary.com/`).
- The custom loader only applies Cloudinary transformations to that domain. WP-hosted images use Next.js at q=85.

### WP page returns empty sections
- Verify the ACF Flexible Content field is named `page_components` in the WP dashboard.
- Check that `acf_format=standard` is enabled (requires ACF PRO ≥ 5.11 or the REST API format option).
- Visit `https://mcnabventures.up.railway.app/wp-json/wp/v2/pages?acf_format=standard&slug=your-slug` directly to inspect the raw response.

### Build errors after adding a new section
```bash
rm -rf .next
pnpm build
```

### CORS issues in development
Add the localhost origin to WordPress → Settings → (any CORS plugin) or configure it in `wp-config.php`.

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF REST API](https://www.advancedcustomfields.com/resources/wp-rest-api-integration/)
- [Cloudinary Transformation Reference](https://cloudinary.com/documentation/transformation_reference)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
