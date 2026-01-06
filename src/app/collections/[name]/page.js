/**
 * Dynamic Collection Page
 * 
 * This page demonstrates fetching data from any PocketBase collection
 * using server-side rendering with admin authentication.
 * 
 * Usage: /collections/posts, /collections/users, etc.
 */

import { getRecords } from '@/lib/services/collections';
import { notFound } from 'next/navigation';
import Link from 'next/link';

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }) {
  const { name } = params;
  return {
    title: `${name} Collection - McNab Ventures`,
    description: `View all records from the ${name} collection`,
  };
}

/**
 * Collection Page Component
 */
export default async function CollectionPage({ params }) {
  const { name } = params;

  // Fetch records from the collection
  const result = await getRecords(name, {
    page: 1,
    perPage: 50,
    sort: '-created',
  });

  // Handle errors
  if (!result.success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-red-200 bg-white p-8 dark:border-red-800 dark:bg-zinc-900">
          <h1 className="mb-4 text-3xl font-bold text-red-600 dark:text-red-400">
            Error Loading Collection
          </h1>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">
            Failed to fetch data from collection: <strong>{name}</strong>
          </p>
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <p className="text-sm text-red-700 dark:text-red-400">
              {result.error}
            </p>
          </div>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { items, page, totalItems, totalPages } = result.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-block text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to Home
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {name} Collection
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {totalItems} record{totalItems !== 1 ? 's' : ''} found
            {totalPages > 1 && ` • Page ${page} of ${totalPages}`}
          </p>
        </div>

        {/* Records */}
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Record ID */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                    ID: {item.id}
                  </p>
                  {item.created && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(item.created).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Record Data */}
                <div className="overflow-x-auto">
                  <pre className="rounded-lg bg-zinc-50 p-4 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No records found in this collection.
            </p>
          </div>
        )}

        {/* Pagination Info */}
        {totalPages > 1 && (
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-700 dark:text-zinc-300">
              Showing page {page} of {totalPages}
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              To see more records, implement pagination in your component
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
