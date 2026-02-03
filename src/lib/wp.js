/**
 * WordPress API helpers for group pages.
 * Pages return image fields as objects with .url; no ID resolution needed.
 */

const WP_API = process.env.WP_API || 'https://mcnabventures.up.railway.app/wp-json/wp/v2';
const PARENT_ID = 76;

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { next: { revalidate: 60 }, ...options });
  if (!res.ok) throw new Error(`WP API: ${res.status} ${url}`);
  return res.json();
}

export async function getGroupPageSlugs() {
  const data = await fetchJson(
    `${WP_API}/pages?acf_format=standard&parent=${PARENT_ID}&per_page=100&_fields=slug`
  );
  return Array.isArray(data) ? data.map((p) => ({ slug: p.slug })) : [];
}

export async function getPageBySlug(slug) {
  const data = await fetchJson(
    `${WP_API}/pages?acf_format=standard&slug=${encodeURIComponent(slug)}&_embed`
  );
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}
