/**
 * Experiences Page - MCNAB VENTURES
 *
 * Content from WordPress API (slug: experiences).
 */

import { getPageBySlug } from '@/lib/wp';
import { getSectionComponent } from '@/lib/getSectionComponent';
import { buildMetadata } from '@/lib/meta';

const PAGE_SLUG = 'experiences';

export async function generateMetadata() {
  const page = await getPageBySlug(PAGE_SLUG);
  return buildMetadata(page, { canonicalPath: '/experiences', fallbackTitle: 'Experiences' });
}

export default async function Experiences() {
  const page = await getPageBySlug(PAGE_SLUG);
  const sections = page?.acf?.page_components;

  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-work-sans text-navy">No content configured for this page.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {sections.map((section, index) =>
        getSectionComponent(section, index, PAGE_SLUG)
      )}
    </main>
  );
}
