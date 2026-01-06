import api from './api';

export const analyticsService = {
  // Get platform overview statistics
  getPlatformStats: async () => {
    try {
      const response = await api.get('/analytics/platform');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch platform statistics');
    }
  },

  // Get user analytics
  getUserAnalytics: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/analytics/users?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user analytics');
    }
  },

  // Get service analytics
  getServiceAnalytics: async (timeRange = '30d', providerId = null) => {
    try {
      const params = new URLSearchParams({ timeRange });
      if (providerId) params.append('providerId', providerId);
      
      const response = await api.get(`/analytics/services?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch service analytics');
    }
  },

  // Get revenue analytics
  getRevenueAnalytics: async (timeRange = '30d', providerId = null) => {
    try {
      const params = new URLSearchParams({ timeRange });
      if (providerId) params.append('providerId', providerId);
      
      const response = await api.get(`/analytics/revenue?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch revenue analytics');
    }
  },

  // Get booking trends
  getBookingTrends: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/analytics/booking-trends?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking trends');
    }
  },

  // Get popular services
  getPopularServicesAnalytics: async (limit = 10) => {
    try {
      const response = await api.get(`/analytics/popular-services?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch popular services analytics');
    }
  },

  // Get customer satisfaction metrics
  getCustomerSatisfaction: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/analytics/satisfaction?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch satisfaction metrics');
    }
  },

  // Get geographic analytics
  getGeographicAnalytics: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/analytics/geographic?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch geographic analytics');
    }
  }
};