import api from './index';

export const authAPI = {
    // Login user
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },

    // Register new user (admin only)
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    // Refresh token
    refreshToken: async () => {
        const response = await api.post('/auth/refresh');
        return response.data;
    },

    // Logout (client side)
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Set token and user
    setSession: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Clear session
    clearSession: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};