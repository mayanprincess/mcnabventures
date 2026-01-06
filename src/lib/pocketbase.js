/**
 * PocketBase Client Configuration
 * 
 * This module provides a configured PocketBase client instance that can be used
 * throughout the application. It follows the Singleton pattern to ensure
 * a single instance is shared across the app.
 * 
 * Usage:
 * - Import this client in your components or API routes
 * - Use it to interact with your PocketBase backend
 * 
 * @see https://pocketbase.io/docs/
 */

import PocketBase from 'pocketbase';

/**
 * Get the PocketBase URL from environment variables
 * Defaults to localhost if not set
 */
const getPocketBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_POCKETBASE_URL;
  
  if (!url) {
    console.warn('NEXT_PUBLIC_POCKETBASE_URL is not set. Using default localhost.');
    return 'http://127.0.0.1:8090';
  }
  
  return url;
};

/**
 * Create a new PocketBase client instance
 * This client can be used for both server-side and client-side operations
 */
const createPocketBaseClient = () => {
  const client = new PocketBase(getPocketBaseUrl());
  
  // Enable auto-cancellation of pending requests on navigation (client-side only)
  if (typeof window !== 'undefined') {
    client.autoCancellation(false); // Set to true if you want automatic cancellation
  }
  
  return client;
};

/**
 * Singleton PocketBase client instance
 * Use this for most operations in your application
 */
export const pb = createPocketBaseClient();

/**
 * Factory function to create a new PocketBase client
 * Use this when you need a fresh instance (e.g., for isolated authentication)
 */
export const createClient = () => createPocketBaseClient();

/**
 * Check if the client is currently authenticated
 */
export const isAuthenticated = () => {
  return pb.authStore.isValid;
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = () => {
  return pb.authStore.model;
};

/**
 * Clear authentication state
 */
export const logout = () => {
  pb.authStore.clear();
};

export default pb;
