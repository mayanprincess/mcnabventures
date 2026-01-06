/**
 * Group Dynamic Route - /group/[slug]
 * 
 * Fetches and displays group data from PocketBase using the slug
 */

import { getRecords } from '@/lib/services/collections';
import { notFound } from 'next/navigation';
import Link from 'next/link';

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const result = await getRecords('group', {
    filter: `slug = "${slug}"`,
    perPage: 1,
    expand: 'hero',
  });

  if (!result.success || result.data.items.length === 0) {
    return {
      title: 'Group Not Found',
    };
  }

  const group = result.data.items[0];

  return {
    title: `${group.hero || slug} - McNab Ventures`,
    description: group.information || `Explore ${slug}`,
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
    expand: 'hero',
  });

  // Handle not found
  if (!result.success || result.data.items.length === 0) {
    notFound();
  }

  const group = result.data.items[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            href="/"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold text-zinc-900 dark:text-zinc-50">
            {group.hero || group.slug}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-100 px-4 py-1 font-mono dark:bg-zinc-800">
              {group.slug}
            </span>
            {group.created && (
              <span>
                Created: {new Date(group.created).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Information Section */}
        {group.information && group.information !== 'N/A' && (
          <div className="mb-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Information
            </h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                {group.information}
              </p>
            </div>
          </div>
        )}

        {/* Expanded Hero Data */}
        {group.expand?.hero && (
          <div className="mb-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Hero Details
            </h2>
            <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {JSON.stringify(group.expand.hero, null, 2)}
            </pre>
          </div>
        )}

        {/* Raw Data (for development) */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Raw Data
          </h2>
          <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {JSON.stringify(group, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}
