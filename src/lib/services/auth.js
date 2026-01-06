/**
 * Authentication Service
 * 
 * This service handles all authentication-related operations with PocketBase.
 * It provides methods for login, registration, password reset, and more.
 * 
 * @see https://pocketbase.io/docs/authentication/
 */

import { pb } from '../pocketbase';

/**
 * Authenticate a user with email and password
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Authentication result with user and token
 */
export const loginWithPassword = async (email, password, collection = 'users') => {
  try {
    const authData = await pb.collection(collection).authWithPassword(email, password);

    return {
      success: true,
      data: {
        user: authData.record,
        token: authData.token,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Register a new user
 * 
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.passwordConfirm - Password confirmation
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Registration result
 */
export const register = async (userData, collection = 'users') => {
  try {
    const record = await pb.collection(collection).create(userData);

    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Logout the current user
 * Clears the authentication store
 */
export const logout = () => {
  pb.authStore.clear();
};

/**
 * Check if user is authenticated
 * 
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  return pb.authStore.isValid;
};

/**
 * Get the current authenticated user
 * 
 * @returns {Object|null} - Current user or null
 */
export const getCurrentUser = () => {
  return pb.authStore.model;
};

/**
 * Request password reset email
 * 
 * @param {string} email - User email
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Request result
 */
export const requestPasswordReset = async (email, collection = 'users') => {
  try {
    await pb.collection(collection).requestPasswordReset(email);

    return {
      success: true,
      data: { message: 'Password reset email sent' },
    };
  } catch (error) {
    console.error('Password reset request error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Confirm password reset
 * 
 * @param {string} token - Reset token from email
 * @param {string} password - New password
 * @param {string} passwordConfirm - Password confirmation
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Reset result
 */
export const confirmPasswordReset = async (
  token,
  password,
  passwordConfirm,
  collection = 'users'
) => {
  try {
    await pb.collection(collection).confirmPasswordReset(token, password, passwordConfirm);

    return {
      success: true,
      data: { message: 'Password reset successful' },
    };
  } catch (error) {
    console.error('Password reset confirmation error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Request email verification
 * 
 * @param {string} email - User email
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Request result
 */
export const requestVerification = async (email, collection = 'users') => {
  try {
    await pb.collection(collection).requestVerification(email);

    return {
      success: true,
      data: { message: 'Verification email sent' },
    };
  } catch (error) {
    console.error('Verification request error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Confirm email verification
 * 
 * @param {string} token - Verification token from email
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Verification result
 */
export const confirmVerification = async (token, collection = 'users') => {
  try {
    await pb.collection(collection).confirmVerification(token);

    return {
      success: true,
      data: { message: 'Email verified successfully' },
    };
  } catch (error) {
    console.error('Verification confirmation error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Refresh the authentication token
 * 
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Refresh result
 */
export const refreshAuth = async (collection = 'users') => {
  try {
    const authData = await pb.collection(collection).authRefresh();

    return {
      success: true,
      data: {
        user: authData.record,
        token: authData.token,
      },
    };
  } catch (error) {
    console.error('Auth refresh error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Update user profile
 * 
 * @param {string} userId - User ID
 * @param {Object} data - Updated user data
 * @param {string} collection - Auth collection name (default: 'users')
 * @returns {Promise<Object>} - Update result
 */
export const updateProfile = async (userId, data, collection = 'users') => {
  try {
    const record = await pb.collection(collection).update(userId, data);

    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error('Profile update error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};
