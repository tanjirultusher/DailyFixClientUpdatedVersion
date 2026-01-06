import api from './api';

export const bookingService = {
  // Get all bookings for a user
  getUserBookings: async (email) => {
    try {
      const response = await api.get(`/bookings?email=${email}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  },

  // Create new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    try {
      const response = await api.patch(`/bookings/${id}`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  },

  // Cancel booking
  cancelBooking: async (id) => {
    try {
      const response = await api.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to cancel booking');
    }
  },

  // Get bookings for a service provider
  getProviderBookings: async (providerId, filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/bookings/provider/${providerId}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch provider bookings');
    }
  },

  // Get all bookings (admin only)
  getAllBookings: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = new URLSearchParams({ page, limit });
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      // Use the provided Bookings API endpoint
      const response = await fetch(`https://dailyfix-server.vercel.app/bookings?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch bookings');
    }
  },

  // Get booking statistics
  getBookingStats: async (providerId = null) => {
    try {
      const url = providerId ? `/bookings/stats/${providerId}` : '/bookings/stats';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking statistics');
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking');
    }
  },

  // Update booking details
  updateBooking: async (id, bookingData) => {
    try {
      const response = await api.patch(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  },

  // Confirm booking (provider action)
  confirmBooking: async (id) => {
    try {
      const response = await api.patch(`/bookings/${id}/confirm`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to confirm booking');
    }
  },

  // Complete booking (provider action)
  completeBooking: async (id) => {
    try {
      const response = await api.patch(`/bookings/${id}/complete`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to complete booking');
    }
  },

  // Get booking history
  getBookingHistory: async (userId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/bookings/history/${userId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking history');
    }
  },

  // Search bookings
  searchBookings: async (query, filters = {}) => {
    try {
      const params = new URLSearchParams({ search: query });
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/bookings/search?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search bookings');
    }
  },

  // Get booking analytics (admin/provider)
  getBookingAnalytics: async (timeRange = '30d', providerId = null) => {
    try {
      const params = new URLSearchParams({ timeRange });
      if (providerId) params.append('providerId', providerId);
      
      const response = await api.get(`/bookings/analytics?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking analytics');
    }
  },

  // Reschedule booking
  rescheduleBooking: async (id, newDateTime) => {
    try {
      const response = await api.patch(`/bookings/${id}/reschedule`, { 
        scheduledDate: newDateTime 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reschedule booking');
    }
  }
};