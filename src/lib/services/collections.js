/**
 * Collections Service
 * 
 * This service provides methods to interact with PocketBase collections.
 * It implements common CRUD operations and follows best practices for
 * error handling and data fetching.
 * 
 * @see https://pocketbase.io/docs/api-records/
 */

import { pb } from '../pocketbase';

/**
 * Fetch all records from a collection with optional filtering and sorting
 * 
 * @param {string} collectionName - The name of the collection
 * @param {Object} options - Query options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.perPage - Records per page (default: 50, max: 500)
 * @param {string} options.filter - Filter expression
 * @param {string} options.sort - Sort expression (e.g., '-created' for descending)
 * @param {string} options.expand - Relations to expand
 * @returns {Promise<Object>} - List result with items, page, totalItems, etc.
 */
export const getRecords = async (collectionName, options = {}) => {
  try {
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

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(`Error fetching records from ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Fetch all records from a collection (no pagination)
 * Warning: Use with caution on large collections
 * 
 * @param {string} collectionName - The name of the collection
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Array of all records
 */
export const getFullList = async (collectionName, options = {}) => {
  try {
    const {
      filter = '',
      sort = '',
      expand = '',
    } = options;

    const records = await pb.collection(collectionName).getFullList({
      filter,
      sort,
      expand,
    });

    return {
      success: true,
      data: records,
    };
  } catch (error) {
    console.error(`Error fetching full list from ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Fetch a single record by ID
 * 
 * @param {string} collectionName - The name of the collection
 * @param {string} recordId - The record ID
 * @param {Object} options - Query options
 * @param {string} options.expand - Relations to expand
 * @returns {Promise<Object>} - The record
 */
export const getRecord = async (collectionName, recordId, options = {}) => {
  try {
    const { expand = '' } = options;

    const record = await pb.collection(collectionName).getOne(recordId, {
      expand,
    });

    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error(`Error fetching record ${recordId} from ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Create a new record in a collection
 * 
 * @param {string} collectionName - The name of the collection
 * @param {Object} data - The record data
 * @returns {Promise<Object>} - The created record
 */
export const createRecord = async (collectionName, data) => {
  try {
    const record = await pb.collection(collectionName).create(data);

    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error(`Error creating record in ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Update an existing record
 * 
 * @param {string} collectionName - The name of the collection
 * @param {string} recordId - The record ID
 * @param {Object} data - The updated data
 * @returns {Promise<Object>} - The updated record
 */
export const updateRecord = async (collectionName, recordId, data) => {
  try {
    const record = await pb.collection(collectionName).update(recordId, data);

    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error(`Error updating record ${recordId} in ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Delete a record
 * 
 * @param {string} collectionName - The name of the collection
 * @param {string} recordId - The record ID
 * @returns {Promise<Object>} - Success status
 */
export const deleteRecord = async (collectionName, recordId) => {
  try {
    await pb.collection(collectionName).delete(recordId);

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error(`Error deleting record ${recordId} from ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Subscribe to real-time changes in a collection
 * 
 * @param {string} collectionName - The name of the collection
 * @param {Function} callback - Callback function to handle changes
 * @param {string} recordId - Optional specific record ID to watch
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToCollection = (collectionName, callback, recordId = '*') => {
  try {
    // Subscribe to collection changes
    pb.collection(collectionName).subscribe(recordId, callback);

    // Return unsubscribe function
    return () => {
      pb.collection(collectionName).unsubscribe(recordId);
    };
  } catch (error) {
    console.error(`Error subscribing to ${collectionName}:`, error);
    return () => {}; // Return empty function if subscription fails
  }
};
