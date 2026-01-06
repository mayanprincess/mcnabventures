/**
 * Custom React Hooks for PocketBase
 * 
 * These hooks provide a convenient way to interact with PocketBase
 * in React components. They handle loading states, errors, and real-time updates.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { pb } from '../pocketbase';

/**
 * Hook to fetch records from a collection
 * 
 * @param {string} collectionName - The name of the collection
 * @param {Object} options - Query options (filter, sort, expand, etc.)
 * @returns {Object} - { data, loading, error, refresh }
 */
export const useCollection = (collectionName, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!collectionName) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const {
        page = 1,
        perPage = 50,
        filter = '',
        sort = '',
        expand = '',
      } = options;

      const result = await pb.collection(collectionName).getList(page, perPage, {
        filter,
        sort,
        expand,
      });

      setData(result);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
};

/**
 * Hook to fetch a single record by ID
 * 
 * @param {string} collectionName - The name of the collection
 * @param {string} recordId - The record ID
 * @param {Object} options - Query options (expand, etc.)
 * @returns {Object} - { data, loading, error, refresh }
 */
export const useRecord = (collectionName, recordId, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!collectionName || !recordId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { expand = '' } = options;

      const record = await pb.collection(collectionName).getOne(recordId, {
        expand,
      });

      setData(record);
    } catch (err) {
      console.error(`Error fetching record ${recordId}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionName, recordId, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
};

/**
 * Hook to subscribe to real-time updates in a collection
 * 
 * @param {string} collectionName - The name of the collection
 * @param {string} recordId - Optional specific record ID to watch (default: '*' for all)
 * @param {Function} onUpdate - Callback function when data updates
 * @returns {Object} - { isSubscribed }
 */
export const useRealtimeCollection = (collectionName, recordId = '*', onUpdate) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!collectionName || !onUpdate) {
      return;
    }

    let unsubscribe;

    const subscribe = async () => {
      try {
        await pb.collection(collectionName).subscribe(recordId, (e) => {
          onUpdate(e);
        });
        setIsSubscribed(true);
      } catch (err) {
        console.error(`Error subscribing to ${collectionName}:`, err);
      }
    };

    subscribe();

    return () => {
      if (collectionName) {
        pb.collection(collectionName).unsubscribe(recordId);
        setIsSubscribed(false);
      }
    };
  }, [collectionName, recordId, onUpdate]);

  return { isSubscribed };
};

/**
 * Hook to manage authentication state
 * 
 * @returns {Object} - { user, isAuthenticated, loading }
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = () => {
      const isValid = pb.authStore.isValid;
      const currentUser = pb.authStore.model;

      setIsAuthenticated(isValid);
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth store changes
    const unsubscribe = pb.authStore.onChange(() => {
      checkAuth();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
  };
};
