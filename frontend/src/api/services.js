import api from './index';

export const serviceAPI = {
    // Get all service orders
    getAll: async (params = {}) => {
        const response = await api.get('/service-orders', { params });
        return response.data;
    },

    // Get single service order
    getById: async (id) => {
        const response = await api.get(`/service-orders/${id}`);
        return response.data;
    },

    // Create service order
    create: async (data) => {
        const response = await api.post('/service-orders', data);
        return response.data;
    },

    // Update service order
    update: async (id, data) => {
        const response = await api.put(`/service-orders/${id}`, data);
        return response.data;
    },

    // Update service order status
    updateStatus: async (id, status) => {
        const response = await api.put(`/service-orders/${id}/status`, { status });
        return response.data;
    },

    // Assign service order to user
    assign: async (id, userId) => {
        const response = await api.put(`/service-orders/${id}/assign`, {
            assigned_to: userId,
        });
        return response.data;
    },

    // Cancel service order
    cancel: async (id) => {
        const response = await api.put(`/service-orders/${id}/cancel`);
        return response.data;
    },

    // Get service orders by assigned user
    getByAssignedUser: async (userId) => {
        const response = await api.get(`/service-orders/assigned/${userId}`);
        return response.data;
    },

    // Get pending service orders
    getPending: async () => {
        const response = await api.get('/service-orders/pending');
        return response.data;
    },
};