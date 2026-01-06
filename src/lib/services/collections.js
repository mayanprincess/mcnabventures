/**
 * Collections Service (Server-Side Only)
 * 
 * This service provides methods to interact with PocketBase collections.
 * All operations are read-only and require super admin authentication.
 * 
 * IMPORTANT: Only use these functions in:
 * - Server Components
 * - API Routes
 * - Server Actions
 * 
 * @see https://pocketbase.io/docs/api-records/
 */

import { getPocketBaseClient } from '../pocketbase';

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
    const pb = await getPocketBaseClient();
    
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
    const pb = await getPocketBaseClient();
    
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
    const pb = await getPocketBaseClient();
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
