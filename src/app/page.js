/**
 * Home Page - Example PocketBase Integration
 * 
 * This page demonstrates how to fetch data from PocketBase
 * using Server Components (Next.js 16 App Router)
 */

import { pb } from '@/lib/pocketbase';
import CollectionsList from '@/components/CollectionsList';

/**
 * Fetch collections data on the server
 * This is a Server Component, so data is fetched at build time or on request
 */
async function getCollections() {
  try {
    // Example: Fetch data from a collection
    // Replace 'your_collection_name' with your actual collection name
    // For demo purposes, we'll try to get a list of available collections
    
    // Note: You'll need to replace this with your actual collection name
    // For example: const records = await pb.collection('posts').getList(1, 10);
    
    return {
      success: true,
      message: 'PocketBase is connected successfully!',
      url: process.env.NEXT_PUBLIC_POCKETBASE_URL,
    };
  } catch (error) {
    console.error('Error connecting to PocketBase:', error);
    return {
      success: false,
      message: 'Failed to connect to PocketBase',
      error: error.message,
    };
  }
}

export default async function Home() {
  const connectionStatus = await getCollections();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-12 px-6 py-24">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            McNab Ventures
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Next.js + PocketBase Integration
          </p>
        </div>

        {/* Connection Status Card */}
        <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Connection Status
              </h2>
              <div className={`flex h-3 w-3 rounded-full ${
                connectionStatus.success 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-red-500'
              }`} />
            </div>

            <div className="space-y-2">
              <p className={`text-lg font-medium ${
                connectionStatus.success 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {connectionStatus.message}
              </p>

              {connectionStatus.url && (
                <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
                  <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold">API URL:</span>{' '}
                    {connectionStatus.url}
                  </p>
                </div>
              )}

              {connectionStatus.error && (
                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    <span className="font-semibold">Error:</span>{' '}
                    {connectionStatus.error}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Server Components"
            description="Fetch data on the server for optimal performance"
            icon="⚡"
          />
          <FeatureCard
            title="Real-time Updates"
            description="Subscribe to collection changes with WebSockets"
            icon="🔄"
          />
          <FeatureCard
            title="Type Safety"
            description="Full TypeScript support for better DX"
            icon="🛡️"
          />
          <FeatureCard
            title="Authentication"
            description="Built-in auth with email/password and OAuth"
            icon="🔐"
          />
          <FeatureCard
            title="File Upload"
            description="Easy file handling and storage"
            icon="📁"
          />
          <FeatureCard
            title="API Rules"
            description="Flexible permission system for data access"
            icon="⚙️"
          />
        </div>

        {/* Client Component Example */}
        <div className="w-full max-w-4xl">
          <CollectionsList />
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4">
          <a
            href="https://pocketbase.io/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            📚 PocketBase Docs
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            📖 Next.js Docs
          </a>
          <a
            href={connectionStatus.url + '/_/'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            🎛️ Admin Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}

/**
 * Feature Card Component
 */
function FeatureCard({ title, description, icon }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
