import api from './api';

export const notificationService = {
  // Get user notifications
  getUserNotifications: async (userId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/notifications/user/${userId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (userId) => {
    try {
      const response = await api.patch(`/notifications/user/${userId}/read-all`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await api.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete notification');
    }
  },

  // Get unread notification count
  getUnreadCount: async (userId) => {
    try {
      const response = await api.get(`/notifications/user/${userId}/unread-count`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch unread count');
    }
  },

  // Create notification (admin/system)
  createNotification: async (notificationData) => {
    try {
      const response = await api.post('/notifications', notificationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create notification');
    }
  },

  // Send bulk notifications (admin)
  sendBulkNotifications: async (notificationData) => {
    try {
      const response = await api.post('/notifications/bulk', notificationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send bulk notifications');
    }
  },

  // Update notification preferences
  updatePreferences: async (userId, preferences) => {
    try {
      const response = await api.patch(`/notifications/user/${userId}/preferences`, preferences);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update notification preferences');
    }
  },

  // Get notification preferences
  getPreferences: async (userId) => {
    try {
      const response = await api.get(`/notifications/user/${userId}/preferences`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notification preferences');
    }
  }
};