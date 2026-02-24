# START HERE — McNab Ventures

## What this project is

A **Next.js 16** (App Router) website that fetches all page content from a **headless WordPress** backend via the WP REST API + ACF Flexible Content fields. Images are served from **Cloudinary**.

---

## Quick Start (2 steps)

### Step 1 — Environment

```bash
cp .env.example .env.local
```

The only variable you need:

```env
WP_API=https://mcnabventures.up.railway.app/wp-json/wp/v2
```

If the file doesn't exist the app falls back to that URL automatically, so this step is optional for development.

### Step 2 — Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How pages work

Every page calls `getPageBySlug(slug)` → gets `page.acf.page_components` from WordPress → `getSectionComponent()` maps each ACF Flexible Content row to its React component.

See **SERVER_SIDE_GUIDE.md** for details on adding pages and new section types.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Page is blank | Check WP has content for that slug via the API URL above |
| Images look blurry | Ensure images are on Cloudinary (`res.cloudinary.com`); the custom loader uses Cloudinary's native optimisation for those URLs |
| Build error after adding a section | `rm -rf .next && pnpm build` |
| WP API returns `acf: false` | ACF REST API integration needs to be enabled in the WP dashboard |

---

## Key files

| File | Purpose |
|------|---------|
| `src/lib/wp.js` | WordPress API helpers |
| `src/lib/getSectionComponent.js` | ACF layout → React component mapper |
| `src/lib/imageLoader.js` | Custom Next.js image loader (Cloudinary-aware) |
| `next.config.mjs` | Image loader config + allowed remote patterns |
| `src/data/` | Static fallback data (used when WP data is missing) |
