// Export all services from a central location
export { default as api } from './api';
export { serviceService } from './serviceService';
export { userService } from './userService';
export { bookingService } from './bookingService';
export { analyticsService } from './analyticsService';
export { notificationService } from './notificationService';
export { paymentService } from './paymentService';

// Service utilities and helpers
export const serviceUtils = {
  // Format error messages consistently
  formatError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },

  // Check if error is network related
  isNetworkError: (error) => {
    return !error.response && error.code === 'NETWORK_ERROR';
  },

  // Check if error is timeout related
  isTimeoutError: (error) => {
    return error.code === 'ECONNABORTED';
  },

  // Check if error is authentication related
  isAuthError: (error) => {
    return error.response?.status === 401;
  },

  // Check if error is authorization related
  isAuthorizationError: (error) => {
    return error.response?.status === 403;
  },

  // Check if error is validation related
  isValidationError: (error) => {
    return error.response?.status === 400;
  },

  // Check if error is server related
  isServerError: (error) => {
    return error.response?.status >= 500;
  },

  // Retry function for failed requests
  retry: async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && (serviceUtils.isNetworkError(error) || serviceUtils.isTimeoutError(error))) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return serviceUtils.retry(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  },

  // Format currency values
  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  // Format dates consistently
  formatDate: (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
  },

  // Format relative time
  formatRelativeTime: (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now - targetDate) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return serviceUtils.formatDate(date);
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number format
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  // Generate unique ID
  generateId: () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};