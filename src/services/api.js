// API Service for Coinbase Clone Frontend
// Configure your backend URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔗 API Base URL:', API_BASE_URL);

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add token if it exists
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Send cookies for CORS
    });

    // Log response details for debugging
    if (!response.ok && response.status === 0) {
      console.error('❌ CORS Error or Network Failure:', url);
      throw new Error('CORS Error: Backend may not have CORS enabled. Check browser console for details.');
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('❌ Failed to parse response:', parseError);
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    console.log('✅ API Success:', endpoint);
    return data;
  } catch (error) {
    console.error('❌ API Error:', endpoint, error.message);
    throw error;
  }
};

// AUTH ROUTES
export const authAPI = {
  register: (firstName, lastName, email, password) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    }),

  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => apiCall('/auth/profile', { method: 'GET' }),

  logout: () =>
    apiCall('/auth/logout', { method: 'POST' }).then(() => {
      localStorage.removeItem('token');
    }),

  setToken: (token) => localStorage.setItem('token', token),

  getToken: () => localStorage.getItem('token'),

  clearToken: () => localStorage.removeItem('token'),
};

// CRYPTO ROUTES
export const cryptoAPI = {
  getAllCrypto: () => apiCall('/crypto', { method: 'GET' }),

  getGainers: () => apiCall('/crypto/gainers', { method: 'GET' }),

  getNewListings: () => apiCall('/crypto/new', { method: 'GET' }),

  getCryptoById: (id) => apiCall(`/crypto/${id}`, { method: 'GET' }),

  addCrypto: (cryptoData) =>
    apiCall('/crypto', {
      method: 'POST',
      body: JSON.stringify(cryptoData),
    }),
};

// HEALTH CHECK
export const healthCheck = () =>
  fetch(`${API_BASE_URL.replace('/api', '')}/api/health`)
    .then((res) => res.json())
    .catch((err) => {
      console.error('Backend health check failed:', err);
      return { success: false };
    });

export default {
  authAPI,
  cryptoAPI,
  healthCheck,
};
