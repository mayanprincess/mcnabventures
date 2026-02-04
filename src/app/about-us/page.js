/**
 * About Us Page - MCNAB VENTURES
 *
 * Content from WordPress API (slug: about-us).
 */

import { getPageBySlug } from '@/lib/wp';
import { getSectionComponent } from '@/lib/getSectionComponent';

const PAGE_SLUG = 'about-us';

export async function generateMetadata() {
  const page = await getPageBySlug(PAGE_SLUG);
  if (!page) {
    return { title: 'About Us - McNab Ventures', description: 'About Us' };
  }
  const title = page.title?.rendered ?? 'About Us';
  const description =
    page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || 'About Us';
  return {
    title: `${title} - McNab Ventures`,
    description,
  };
}

export default async function AboutUs() {
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
