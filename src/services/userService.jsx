import api from './api';

export const userService = {
  // Get user profile
  getUserProfile: async (uid) => {
    try {
      const response = await api.get(`/users/${uid}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  },

  // Create user profile
  createUserProfile: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create user profile');
    }
  },

  // Update user profile
  updateUserProfile: async (uid, userData) => {
    try {
      const response = await api.patch(`/users/${uid}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user profile');
    }
  },

  // Get all users (admin only)
  getAllUsers: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = new URLSearchParams({ page, limit });
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      // Use the provided Users API endpoint
      const response = await fetch(`https://dailyfix-server.vercel.app/users?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  },

  // Update user role (admin only)
  updateUserRole: async (uid, role) => {
    try {
      const response = await api.patch(`/users/${uid}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
  },

  // Delete user (admin only)
  deleteUser: async (uid) => {
    try {
      const response = await api.delete(`/users/${uid}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  // Get user statistics
  getUserStats: async (uid) => {
    try {
      const response = await api.get(`/users/${uid}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user statistics');
    }
  },

  // Toggle user status (admin only)
  toggleUserStatus: async (uid) => {
    try {
      const response = await api.patch(`/users/${uid}/toggle-status`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to toggle user status');
    }
  },

  // Get user activity log
  getUserActivity: async (uid, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users/${uid}/activity?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user activity');
    }
  },

  // Search users (admin only)
  searchUsers: async (query, filters = {}) => {
    try {
      const params = new URLSearchParams({ search: query });
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/users/search?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search users');
    }
  },

  // Update user preferences
  updateUserPreferences: async (uid, preferences) => {
    try {
      const response = await api.patch(`/users/${uid}/preferences`, preferences);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update preferences');
    }
  },

  // Get user notifications
  getUserNotifications: async (uid, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users/${uid}/notifications?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }
};