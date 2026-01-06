/**
 * Home Page - PocketBase Server-Side Integration
 * 
 * This page demonstrates how to fetch data from PocketBase
 * using Server Components with admin authentication.
 * All API calls are made server-side only.
 */

import { getPocketBaseClient, isAdminConfigured } from '@/lib/pocketbase';

/**
 * Test PocketBase connection with admin auth
 * This is a Server Component, so data is fetched on the server
 */
async function testConnection() {
  try {
    // Check if admin credentials are configured
    if (!isAdminConfigured()) {
      return {
        success: false,
        message: 'Admin credentials not configured',
        error: 'Please set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD in .env.local',
      };
    }

    // Get authenticated client
    const pb = await getPocketBaseClient();
    
    return {
      success: true,
      message: 'PocketBase connected successfully with admin authentication!',
      url: process.env.POCKETBASE_URL,
      adminEmail: process.env.POCKETBASE_ADMIN_EMAIL,
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
  const connectionStatus = await testConnection();

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
                <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800 space-y-2">
                  <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold">API URL:</span>{' '}
                    {connectionStatus.url}
                  </p>
                  {connectionStatus.adminEmail && (
                    <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                      <span className="font-semibold">Admin:</span>{' '}
                      {connectionStatus.adminEmail}
                    </p>
                  )}
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

        {/* Server-Side Note */}
        <div className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            📋 Important: Server-Side Only
          </h2>
          <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
            <p>
              This application is configured to make all PocketBase API calls on the server using admin authentication.
            </p>
            <p>
              To fetch data from your collections, create Server Components or API routes.
            </p>
            <div className="mt-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
              <p className="text-sm font-semibold mb-2">Example Server Component:</p>
              <pre className="text-xs overflow-x-auto">
{`import { getRecords } from '@/lib/services/collections';

export default async function MyPage() {
  const result = await getRecords('your_collection');
  return <div>{/* render data */}</div>;
}`}
              </pre>
            </div>
          </div>
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
