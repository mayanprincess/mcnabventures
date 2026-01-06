/**
 * Collections List Component
 * 
 * This is a Client Component that demonstrates how to use
 * PocketBase hooks for fetching data with real-time updates
 */

'use client';

import { useState } from 'react';
import { useCollection } from '@/lib/hooks/usePocketBase';

export default function CollectionsList() {
  const [collectionName, setCollectionName] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  // Only fetch when user submits a collection name
  const { data, loading, error, refresh } = useCollection(
    shouldFetch ? collectionName : null,
    {
      page: 1,
      perPage: 10,
      sort: '-created',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (collectionName.trim()) {
      setShouldFetch(true);
    }
  };

  const handleReset = () => {
    setCollectionName('');
    setShouldFetch(false);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Fetch Collection Data
      </h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label
            htmlFor="collection"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Collection Name
          </label>
          <div className="flex gap-3">
            <input
              id="collection"
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="e.g., posts, users, articles"
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
            />
            <button
              type="submit"
              disabled={!collectionName.trim() || loading}
              className="rounded-lg bg-zinc-900 px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {loading ? 'Loading...' : 'Fetch'}
            </button>
            {shouldFetch && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-zinc-300 px-4 py-2 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Enter the name of a collection from your PocketBase instance to fetch its records.
        </p>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm font-medium text-red-800 dark:text-red-400">
            Error: {error}
          </p>
          <p className="mt-1 text-xs text-red-600 dark:text-red-500">
            Make sure the collection exists and you have permission to access it.
          </p>
        </div>
      )}

      {/* Data Display */}
      {data && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Found {data.totalItems} record{data.totalItems !== 1 ? 's' : ''} in{' '}
              <span className="font-mono text-zinc-900 dark:text-zinc-100">
                {collectionName}
              </span>
            </p>
            <button
              onClick={refresh}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              🔄 Refresh
            </button>
          </div>

          {data.items && data.items.length > 0 ? (
            <div className="space-y-3">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50"
                >
                  <pre className="overflow-x-auto text-xs text-zinc-700 dark:text-zinc-300">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
              <p className="text-zinc-600 dark:text-zinc-400">
                No records found in this collection.
              </p>
            </div>
          )}

          {/* Pagination Info */}
          {data.totalPages > 1 && (
            <div className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Page {data.page} of {data.totalPages}
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!shouldFetch && !loading && (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-400">
            Enter a collection name above to get started
          </p>
        </div>
      )}
    </div>
  );
}
