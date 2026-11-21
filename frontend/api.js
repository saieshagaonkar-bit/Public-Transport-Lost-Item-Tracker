/**
 * BackToYou — Centralized REST API Service Client
 * Connects frontend views directly to the Express + MongoDB backend engine.
 */

const API_BASE_URL = window.BACKTOYOU_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'backtoyou_jwt_token';
const USER_KEY = 'backtoyou_current_user';

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function setStoredUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Universal Fetch wrapper with automatic Bearer token injection,
 * JSON serialization, and error handling.
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 && token) {
        clearSession();
        window.dispatchEvent(new CustomEvent('backtoyou:unauthorized', { detail: data }));
      }
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error(
        `Unable to connect to the BackToYou API server at ${API_BASE_URL}. Ensure the backend server is running.`
      );
      netError.status = 0;
      throw netError;
    }
    throw err;
  }
}

const api = {
  baseUrl: API_BASE_URL,
  getToken,
  setToken,
  getStoredUser,
  setStoredUser,
  clearSession,

  health: {
    check: () => apiRequest('/health'),
  },

  auth: {
    register: (userData) => apiRequest('/auth/register', { method: 'POST', body: userData }),
    login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: credentials }),
    getMe: () => apiRequest('/auth/me'),
  },

  items: {
    getAll: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return apiRequest(`/items${qs ? `?${qs}` : ''}`);
    },
    getById: (id) => apiRequest(`/items/${id}`),
    create: (itemData) => apiRequest('/items', { method: 'POST', body: itemData }),
    update: (id, itemData) => apiRequest(`/items/${id}`, { method: 'PATCH', body: itemData }),
    delete: (id) => apiRequest(`/items/${id}`, { method: 'DELETE' }),
    getMatches: (id) => apiRequest(`/items/${id}/matches`),
  },

  claims: {
    create: (itemId, claimData) => apiRequest(`/items/${itemId}/claims`, { method: 'POST', body: claimData }),
    getMyClaims: () => apiRequest('/me/claims'),
    getAll: (status) => apiRequest(`/admin/claims${status ? `?status=${status}` : ''}`),
    review: (claimId, reviewData) => apiRequest(`/admin/claims/${claimId}`, { method: 'PATCH', body: reviewData }),
  },

  me: {
    getItems: () => apiRequest('/me/items'),
    getNotifications: () => apiRequest('/me/notifications'),
    markNotificationRead: (id) => apiRequest(`/me/notifications/${id}`, { method: 'PATCH' }),
    markAllNotificationsRead: () => apiRequest('/me/notifications/read-all', { method: 'PATCH' }),
    updateProfile: (profileData) => apiRequest('/users/profile', { method: 'PATCH', body: profileData }),
  },

  admin: {
    getSummary: () => apiRequest('/admin/summary'),
    getUsers: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return apiRequest(`/admin/users${qs ? `?${qs}` : ''}`);
    },
    toggleUserStatus: (userId) => apiRequest(`/admin/users/${userId}/status`, { method: 'PATCH' }),
    getAudit: (limit = 50) => apiRequest(`/admin/audit?limit=${limit}`),
    getDisposals: (status) => apiRequest(`/admin/disposals${status ? `?status=${status}` : ''}`),
    updateDisposal: (id, action) => apiRequest(`/admin/disposals/${id}`, { method: 'PATCH', body: { action } }),
  },

  feedback: {
    submit: (feedbackData) => apiRequest('/feedback', { method: 'POST', body: feedbackData }),
    getAll: (category) => apiRequest(`/feedback${category ? `?category=${category}` : ''}`),
  },
};

window.BackToYouAPI = api;
