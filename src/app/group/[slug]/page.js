/**
 * Group Dynamic Route - /group/[slug]
 * 
 * Modern frontend for group pages with SecondaryHero integration
 * Fetches and displays group data from PocketBase using the slug
 */

import { getRecords } from '@/lib/services/collections';
import { getPocketBaseClient } from '@/lib/pocketbase';
import { notFound } from 'next/navigation';
import SecondaryHero from '@/components/sections/SecondaryHero';
import UsefulLinks from '@/components/sections/UsefulLinks';
import StayInTheLoop from '@/components/sections/StayInTheLoop';
import Multimedia from '@/components/sections/Multimedia';

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const result = await getRecords('group', {
    filter: `slug = "${slug}"`,
    perPage: 1,
    expand: 'hero,information',
  });

  if (!result.success || result.data.items.length === 0) {
    return {
      title: 'Group Not Found - McNab Ventures',
    };
  }

  const group = result.data.items[0];

  return {
    title: `${group.name || group.slug} - McNab Ventures`,
    description: group.description || group.information || `Explore ${group.name || slug}`,
  };
}

/**
 * Group Page Component
 */
export default async function GroupPage({ params }) {
  const { slug } = await params;

  // Fetch group by slug
  const result = await getRecords('group', {
    filter: `slug = "${slug}"`,
    perPage: 1,
    expand: 'hero,information',
  });

  // Handle not found
  if (!result.success || result.data.items.length === 0) {
    notFound();
  }

  const group = result.data.items[0];

  // Get hero ID if hero relation exists
  const heroId = group.hero || group.expand?.hero?.id || null;

  return (
    <div className="min-h-screen bg-white">
      {/* Secondary Hero Section */}
      {heroId && (
        <SecondaryHero id={heroId} />
      )}

      {/* Useful Links Section */}
      <UsefulLinks />

      {/* Stay In The Loop Section */}
      <StayInTheLoop />

      {/* Multimedia Section */}
      <Multimedia />

      {/* Main Content */}
      <main className="w-full">
        {/* Group Information Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Group Title */}
            <div className="mb-8 sm:mb-12">
              <h1 className="font-literata-light text-navy text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
                {group.name || group.slug}
              </h1>
              {group.description && (
                <p className="font-work-sans-medium text-navy/80 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl">
                  {group.description}
                </p>
              )}
            </div>

            {/* Expanded Information Component */}
            {group.expand?.information && (
              <div className="mb-12 sm:mb-16">
                <GroupInformation information={group.expand.information} />
              </div>
            )}

            {/* Additional Group Data */}
            {group.information && !group.expand?.information && (
              <div className="mb-12 sm:mb-16">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="font-work-sans-medium text-navy/90 text-base sm:text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: group.information }}
                  />
                </div>
              </div>
            )}

            {/* Group Metadata */}
            <div className="border-t border-sand pt-8 mt-12">
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
                {group.slug && (
                  <div className="flex items-center gap-2">
                    <span className="font-work-sans-medium text-navy/60">Slug:</span>
                    <span className="font-work-sans-medium text-navy bg-sand/30 px-3 py-1 rounded">
                      {group.slug}
                    </span>
                  </div>
                )}
                {group.created && (
                  <div className="flex items-center gap-2">
                    <span className="font-work-sans-medium text-navy/60">Created:</span>
                    <span className="font-work-sans-medium text-navy">
                      {new Date(group.created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * Group Information Component
 * Renders expanded information data
 */
function GroupInformation({ information }) {
  // Handle different information formats
  if (typeof information === 'string') {
    return (
      <div className="prose prose-lg max-w-none">
        <div 
          className="font-work-sans-medium text-navy/90 text-base sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: information }}
        />
      </div>
    );
  }

  if (typeof information === 'object' && information !== null) {
    return (
      <div className="space-y-6">
        {information.title && (
          <h2 className="font-literata-medium text-navy text-2xl sm:text-3xl md:text-4xl mb-4">
            {information.title}
          </h2>
        )}
        
        {information.content && (
          <div className="prose prose-lg max-w-none">
            <div 
              className="font-work-sans-medium text-navy/90 text-base sm:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: information.content }}
            />
          </div>
        )}

        {information.description && (
          <p className="font-work-sans-medium text-navy/80 text-lg sm:text-xl leading-relaxed">
            {information.description}
          </p>
        )}

        {/* Render other fields if they exist */}
        {Object.entries(information).map(([key, value]) => {
          if (['title', 'content', 'description', 'id', 'collectionId', 'collectionName', 'created', 'updated'].includes(key)) {
            return null;
          }
          
          if (typeof value === 'string' && value.trim()) {
            return (
              <div key={key} className="border-l-4 border-turquoise pl-4 py-2">
                <h3 className="font-work-sans-extrabold text-navy text-sm uppercase tracking-wide mb-1">
                  {key.replace(/_/g, ' ')}
                </h3>
                <p className="font-work-sans-medium text-navy/80">
                  {value}
                </p>
              </div>
            );
          }
          
          return null;
        })}
      </div>
    );
  }

  return null;
}
