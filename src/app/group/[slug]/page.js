/**
 * Group Dynamic Route - /group/[slug]
 *
 * Renders group subpages from WordPress API (acf.page_components).
 * API: https://mcnabventures.up.railway.app/wp-json/wp/v2/pages
 */

import { notFound } from 'next/navigation';
import { getGroupPageSlugs, getPageBySlug } from '@/lib/wp';
import { getSectionComponent } from '@/lib/getSectionComponent';
import { buildMetadata } from '@/lib/meta';

/**
 * Generate static paths for all group child pages (parent = 76)
 */
export async function generateStaticParams() {
  try {
    const slugs = await getGroupPageSlugs();
    return slugs;
  } catch (err) {
    console.error('Error fetching group page slugs:', err);
    return [];
  }
}

/**
 * Generate metadata for SEO from WP page
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  return buildMetadata(page, { canonicalPath: `/group/${slug}`, fallbackTitle: slug });
}

/**
 * Group Page Component – fetches page by slug and renders ACF page_components
 */
export default async function GroupPage({ params }) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const sections = page.acf?.page_components;
  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-work-sans text-navy">No content configured for this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section, index) =>
        getSectionComponent(section, index, slug)
      )}
    </div>
  );
}
