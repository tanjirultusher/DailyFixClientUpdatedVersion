import api from './api';

export const paymentService = {
  // Create payment intent
  createPaymentIntent: async (bookingId, amount) => {
    try {
      const response = await api.post('/payments/create-intent', {
        bookingId,
        amount
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create payment intent');
    }
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId, paymentMethodId) => {
    try {
      const response = await api.post('/payments/confirm', {
        paymentIntentId,
        paymentMethodId
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to confirm payment');
    }
  },

  // Get payment history
  getPaymentHistory: async (userId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/payments/history/${userId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment history');
    }
  },

  // Get payment details
  getPaymentDetails: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment details');
    }
  },

  // Process refund
  processRefund: async (paymentId, amount, reason) => {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, {
        amount,
        reason
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process refund');
    }
  },

  // Get refund status
  getRefundStatus: async (refundId) => {
    try {
      const response = await api.get(`/payments/refunds/${refundId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch refund status');
    }
  },

  // Save payment method
  savePaymentMethod: async (userId, paymentMethodData) => {
    try {
      const response = await api.post(`/payments/methods/${userId}`, paymentMethodData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save payment method');
    }
  },

  // Get saved payment methods
  getPaymentMethods: async (userId) => {
    try {
      const response = await api.get(`/payments/methods/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment methods');
    }
  },

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId) => {
    try {
      const response = await api.delete(`/payments/methods/${paymentMethodId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete payment method');
    }
  },

  // Get payment statistics (provider/admin)
  getPaymentStats: async (providerId = null, timeRange = '30d') => {
    try {
      const params = new URLSearchParams({ timeRange });
      if (providerId) params.append('providerId', providerId);
      
      const response = await api.get(`/payments/stats?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment statistics');
    }
  },

  // Generate invoice
  generateInvoice: async (bookingId) => {
    try {
      const response = await api.post(`/payments/invoice/${bookingId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate invoice');
    }
  },

  // Download invoice
  downloadInvoice: async (invoiceId) => {
    try {
      const response = await api.get(`/payments/invoice/${invoiceId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to download invoice');
    }
  }
};