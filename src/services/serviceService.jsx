import api from './api';

export const serviceService = {
  // Get all services with optional filters
  getAllServices: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/services?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch services');
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch service');
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await api.post('/services', serviceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create service');
    }
  },

  // Update service
  updateService: async (id, serviceData) => {
    try {
      const response = await api.patch(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update service');
    }
  },

  // Delete service
  deleteService: async (id) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete service');
    }
  },

  // Get services by provider
  getServicesByProvider: async (providerId) => {
    try {
      const response = await api.get(`/services/provider/${providerId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch provider services');
    }
  },

  // Get popular services
  getPopularServices: async (limit = 8) => {
    try {
      const response = await api.get(`/services/popular?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch popular services');
    }
  },

  // Search services
  searchServices: async (query, filters = {}) => {
    try {
      const params = new URLSearchParams({ search: query });
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/services/search?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search services');
    }
  },

  // Get service categories
  getServiceCategories: async () => {
    try {
      const response = await api.get('/services/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // Get service reviews
  getServiceReviews: async (serviceId) => {
    try {
      const response = await api.get(`/services/${serviceId}/reviews`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  },

  // Add service review
  addServiceReview: async (serviceId, reviewData) => {
    try {
      const response = await api.post(`/services/${serviceId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add review');
    }
  },

  // Toggle service availability
  toggleServiceAvailability: async (serviceId) => {
    try {
      const response = await api.patch(`/services/${serviceId}/toggle-availability`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to toggle availability');
    }
  }
};