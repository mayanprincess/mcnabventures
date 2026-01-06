/**
 * PocketBase Server-Side Client Configuration
 * 
 * This module provides a configured PocketBase client instance for SERVER-SIDE use only.
 * It automatically authenticates as a super admin to access protected collections.
 * 
 * IMPORTANT: This client should ONLY be used in:
 * - Server Components
 * - API Routes
 * - Server Actions
 * 
 * Never import this in Client Components as it contains sensitive credentials.
 * 
 * @see https://pocketbase.io/docs/
 */

import PocketBase from 'pocketbase';

/**
 * Get the PocketBase URL from environment variables
 */
const getPocketBaseUrl = () => {
  const url = process.env.POCKETBASE_URL;
  
  if (!url) {
    throw new Error('POCKETBASE_URL is not set in environment variables');
  }
  
  return url;
};

/**
 * Authenticate as super admin
 * This is required to access protected collections
 */
const authenticateAdmin = async (client) => {
  const email = process.env.POCKETBASE_ADMIN_EMAIL;
  const password = process.env.POCKETBASE_ADMIN_PASSWORD;
  
  if (!email || !password) {
    throw new Error('POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD must be set');
  }
  
  try {
    await client.admins.authWithPassword(email, password);
    return true;
  } catch (error) {
    console.error('Failed to authenticate PocketBase admin:', error);
    throw new Error('PocketBase admin authentication failed');
  }
};

/**
 * Create a new authenticated PocketBase client instance
 * Automatically authenticates as super admin
 */
const createPocketBaseClient = async () => {
  const client = new PocketBase(getPocketBaseUrl());
  
  // Disable auto-cancellation to prevent issues with duplicate requests
  // (e.g., when both generateMetadata and page component fetch the same data)
  client.autoCancellation(false);
  
  await authenticateAdmin(client);
  return client;
};

/**
 * Singleton promise for the PocketBase client
 * Ensures we only authenticate once
 */
let clientPromise = null;

/**
 * Get authenticated PocketBase client instance
 * Use this for all server-side operations
 * 
 * @returns {Promise<PocketBase>} Authenticated PocketBase client
 */
export const getPocketBaseClient = async () => {
  if (!clientPromise) {
    clientPromise = createPocketBaseClient();
  }
  return clientPromise;
};

/**
 * Get a fresh PocketBase client instance
 * Use this if you need a new authenticated instance
 * 
 * @returns {Promise<PocketBase>} New authenticated PocketBase client
 */
export const getFreshClient = async () => {
  return createPocketBaseClient();
};

/**
 * Check if admin authentication is configured
 */
export const isAdminConfigured = () => {
  return !!(
    process.env.POCKETBASE_URL &&
    process.env.POCKETBASE_ADMIN_EMAIL &&
    process.env.POCKETBASE_ADMIN_PASSWORD
  );
};

export default getPocketBaseClient;
