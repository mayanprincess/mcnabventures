/**
 * SEO metadata builder for Next.js generateMetadata().
 *
 * Priority chain for each field:
 *  title       → WP page title rendered
 *  description → Yoast meta description > WP excerpt > site default
 *  OG image    → Yoast OG image > WP featured media > first ACF image found in page_components
 */

const SITE_NAME = 'McNab Ventures';
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://mcnabventures.com';
const DEFAULT_DESCRIPTION =
  'McNab Ventures — Building a legacy of sustainable growth and regional development through strategic diversification and commitment to excellence.';

/**
 * Walk the ACF page_components array and return the first usable image URL.
 * Handles both plain string fields and ACF image objects { url, ... }.
 */
function getFirstAcfImage(sections) {
  if (!Array.isArray(sections)) return null;

  for (const section of sections) {
    const imageCandidates = [
      section.image,
      section.main_image,
      section.background_image,
      section.poster_image,
    ];

    for (const candidate of imageCandidates) {
      const url =
        typeof candidate === 'string'
          ? candidate
          : candidate && typeof candidate.url === 'string'
            ? candidate.url
            : null;
      if (url && url.startsWith('http')) return url;
    }

    // Check slides (group-snapshot, experiences-gallery, etc.)
    if (Array.isArray(section.slides)) {
      for (const slide of section.slides) {
        const slideFields = [
          slide.main_image,
          slide.background_image,
          slide.backgroundImage,
          slide.mainImage,
        ];
        for (const candidate of slideFields) {
          const url =
            typeof candidate === 'string'
              ? candidate
              : candidate && typeof candidate.url === 'string'
                ? candidate.url
                : null;
          if (url && url.startsWith('http')) return url;
        }
      }
    }
  }

  return null;
}

/**
 * Build the full Next.js Metadata object from a WordPress page response.
 *
 * @param {object|null} page     - WP page object (from getPageBySlug)
 * @param {object}      options
 * @param {string}      options.canonicalPath  - Path relative to SITE_URL (e.g. '/about-us')
 * @param {string}      [options.fallbackTitle] - Title to use when WP returns nothing
 * @returns {import('next').Metadata}
 */
export function buildMetadata(page, { canonicalPath = '/', fallbackTitle = SITE_NAME } = {}) {
  const rawTitle =
    page?.title?.rendered?.replace(/<[^>]+>/g, '').trim() || fallbackTitle;

  // Description
  const yoastDesc = page?.yoast_head_json?.description?.trim() || null;
  const excerptDesc =
    page?.excerpt?.rendered
      ?.replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim() || null;
  const description =
    yoastDesc ||
    (excerptDesc && excerptDesc.length > 30 ? excerptDesc : null) ||
    DEFAULT_DESCRIPTION;

  // OG image
  const yoastOgImage = page?.yoast_head_json?.og_image?.[0]?.url || null;
  const featuredImage =
    page?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const acfImage = getFirstAcfImage(page?.acf?.page_components);
  const ogImageUrl = yoastOgImage || featuredImage || acfImage;

  // Titles/descriptions for OG (Yoast may override)
  const ogTitle = page?.yoast_head_json?.og_title || rawTitle;
  const ogDescription = page?.yoast_head_json?.og_description || description;

  const canonical = `${SITE_URL}${canonicalPath}`;

  return {
    title: `${rawTitle} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: rawTitle }],
      }),
    },
    twitter: {
      card: ogImageUrl ? 'summary_large_image' : 'summary',
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}
