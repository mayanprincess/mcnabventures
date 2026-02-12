/**
 * WordPress API helpers for pages.
 * Pages return image fields as objects with .url; no ID resolution needed.
 */

const WP_API = process.env.WP_API || 'https://mcnabventures.up.railway.app/wp-json/wp/v2';
const PARENT_ID = 76;

/**
 * Slugs that already have dedicated static routes in the app directory.
 * These are excluded from the dynamic [slug] catch to avoid conflicts.
 */
const RESERVED_SLUGS = ['sample-page', 'about-us', 'experiences', 'group'];

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { next: { revalidate: 60 }, ...options });
  if (!res.ok) throw new Error(`WP API: ${res.status} ${url}`);
  return res.json();
}

/**
 * Get slugs for group child pages (parent = PARENT_ID)
 */
export async function getGroupPageSlugs() {
  const data = await fetchJson(
    `${WP_API}/pages?acf_format=standard&parent=${PARENT_ID}&per_page=100&_fields=slug`
  );
  return Array.isArray(data) ? data.map((p) => ({ slug: p.slug })) : [];
}

/**
 * Get slugs for root-level pages (parent = 0), excluding reserved static routes.
 * These feed the dynamic /[slug] route.
 */
export async function getRootPageSlugs() {
  const data = await fetchJson(
    `${WP_API}/pages?acf_format=standard&parent=0&per_page=100&_fields=slug`
  );
  if (!Array.isArray(data)) return [];
  return data
    .map((p) => ({ slug: p.slug }))
    .filter((p) => !RESERVED_SLUGS.includes(p.slug));
}

/**
 * Fetch a single page by slug (works for any page regardless of parent)
 */
export async function getPageBySlug(slug) {
  const data = await fetchJson(
    `${WP_API}/pages?acf_format=standard&slug=${encodeURIComponent(slug)}&_embed`
  );
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}
