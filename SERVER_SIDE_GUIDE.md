# Server-Side Guide — WordPress API + Next.js

All data fetching happens server-side using Next.js Server Components with ISR (Incremental Static Regeneration).

---

## Environment Variables

```env
# .env.local
WP_API=https://mcnabventures.up.railway.app/wp-json/wp/v2
```

If `WP_API` is not set the app falls back to the Railway URL automatically.

---

## WordPress API Helpers (`src/lib/wp.js`)

### `getPageBySlug(slug)`

Fetches a single WordPress page including all ACF data.

```js
import { getPageBySlug } from '@/lib/wp';

const page = await getPageBySlug('about-us');
const sections = page?.acf?.page_components; // ACF Flexible Content rows
```

### `getRootPageSlugs()`

Returns all root-level page slugs (parent = 0) for `generateStaticParams`.  
Reserved slugs (`about-us`, `experiences`, `group`, `sample-page`) are excluded automatically.

```js
export async function generateStaticParams() {
  return getRootPageSlugs(); // [{ slug: 'contact' }, ...]
}
```

### `getGroupPageSlugs()`

Returns all child page slugs under the "Group" parent (WP id 76).

```js
export async function generateStaticParams() {
  return getGroupPageSlugs(); // [{ slug: 'mcnab-cattle' }, ...]
}
```

---

## Creating a new page

```js
// src/app/my-page/page.js
import { getPageBySlug } from '@/lib/wp';
import { getSectionComponent } from '@/lib/getSectionComponent';

export async function generateMetadata() {
  const page = await getPageBySlug('my-page');
  return {
    title: page?.title?.rendered ?? 'McNab Ventures',
  };
}

export default async function MyPage() {
  const page = await getPageBySlug('my-page');
  const sections = page?.acf?.page_components;

  if (!Array.isArray(sections) || sections.length === 0) {
    return <div>No content configured.</div>;
  }

  return (
    <main>
      {sections.map((section, index) =>
        getSectionComponent(section, index, 'my-page')
      )}
    </main>
  );
}
```

---

## Adding a new ACF section

1. **Create the layout in WordPress** — add a new Flexible Content layout in the `page_components` field group. Name it with kebab-case (e.g. `my-new-section`).

2. **Create the React component** — `src/components/sections/MyNewSection.js`.

3. **Register it in `getSectionComponent.js`**:

```js
// 1. Import
import MyNewSection from '@/components/sections/MyNewSection';

// 2. Add to LAYOUT_TO_COMPONENT
const LAYOUT_TO_COMPONENT = {
  // ...existing entries
  'my-new-section': MyNewSection,
};

// 3. Add a case in the switch
case 'my-new-section':
  return {
    Component,
    props: {
      title: section.title ?? undefined,
      image: getUrl(section.image) ?? undefined,
    },
  };
```

---

## Image fields

ACF image fields can come in two formats depending on ACF configuration:

```js
// Format 1: plain URL string
section.image = "https://res.cloudinary.com/..."

// Format 2: ACF image object
section.image = { url: "https://...", width: 1200, height: 800, alt: "..." }
```

Always use the `getUrl(v)` helper from `getSectionComponent.js` to normalise:

```js
import { getUrl } from '@/lib/getSectionComponent'; // or inline copy

const src = getUrl(section.image); // always returns string | undefined
```

---

## ISR (Incremental Static Regeneration)

Pages revalidate every **60 seconds**. This means:
- First request after deploy: SSR, page cached
- Within 60s: cached page served instantly
- After 60s: background revalidation on next request

To change the interval edit `src/lib/wp.js`:

```js
const res = await fetch(url, { next: { revalidate: 60 }, ...options });
//                                          ^^^^ seconds
```

Use `revalidate: 0` to disable caching in development if you need live WP previews.

---

## Debugging the WP API

Hit these URLs directly to inspect the raw JSON:

```bash
# All pages
curl "https://mcnabventures.up.railway.app/wp-json/wp/v2/pages?acf_format=standard&per_page=50"

# Single page by slug
curl "https://mcnabventures.up.railway.app/wp-json/wp/v2/pages?acf_format=standard&slug=about-us&_embed"

# Group child pages
curl "https://mcnabventures.up.railway.app/wp-json/wp/v2/pages?acf_format=standard&parent=76&per_page=100"
```

Common issues:
- `acf` field is missing → ACF REST API integration not enabled (needs ACF PRO ≥ 5.11)
- `acf.page_components` is `[]` → the page exists but has no Flexible Content rows added
- Image fields are plain strings instead of objects → set ACF REST API format to "standard"
