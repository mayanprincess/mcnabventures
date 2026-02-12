/**
 * Dynamic Root Route - /[slug]
 *
 * Renders any root-level WordPress page by slug using ACF page_components.
 * Static routes (about-us, experiences, group) take priority over this catch-all.
 * API: https://mcnabventures.up.railway.app/wp-json/wp/v2/pages
 */

import { notFound } from 'next/navigation';
import { getRootPageSlugs, getPageBySlug } from '@/lib/wp';
import { getSectionComponent } from '@/lib/getSectionComponent';

/**
 * Generate static paths for all root-level pages (parent = 0),
 * excluding slugs that already have dedicated static routes.
 */
export async function generateStaticParams() {
  try {
    const slugs = await getRootPageSlugs();
    return slugs;
  } catch (err) {
    console.error('Error fetching root page slugs:', err);
    return [];
  }
}

/**
 * Generate metadata for SEO from WP page
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) {
    return { title: `${slug} - McNab Ventures`, description: `Explore ${slug}` };
  }
  const title = page.title?.rendered ?? slug;
  const description =
    page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || `Explore ${title}`;
  return {
    title: `${title} - McNab Ventures`,
    description,
  };
}

/**
 * Root Page Component – fetches page by slug and renders ACF page_components
 */
export default async function RootPage({ params }) {
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
    <main className="min-h-screen bg-white">
      {sections.map((section, index) =>
        getSectionComponent(section, index, slug)
      )}
    </main>
  );
}
