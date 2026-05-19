import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

export const getDestinations = (params = {}) => api.get('/destinations', { params });
export const getDestination  = (id)       => api.get(`/destinations/${id}`);
export const getPackages     = (params = {}) => api.get('/packages', { params });
export const getPackage      = (id)       => api.get(`/packages/${id}`);
export const getTestimonials = ()         => api.get('/testimonials');
export const searchTours     = (data)     => api.post('/search', data);
export const subscribeNewsletter = (email) => api.post('/newsletter', { email });
export const submitContact   = (data)     => api.post('/contact', data);

export default api;
