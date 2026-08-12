import api from './index';

export const purchaseAPI = {
    // ============ Suppliers ============

    // Get all suppliers
    getSuppliers: async (params = {}) => {
        const response = await api.get('/suppliers', { params });
        return response.data;
    },

    // Get single supplier
    getSupplierById: async (id) => {
        const response = await api.get(`/suppliers/${id}`);
        return response.data;
    },

    // Create supplier
    createSupplier: async (data) => {
        const response = await api.post('/suppliers', data);
        return response.data;
    },

    // Update supplier
    updateSupplier: async (id, data) => {
        const response = await api.put(`/suppliers/${id}`, data);
        return response.data;
    },

    // Approve supplier
    approveSupplier: async (id) => {
        const response = await api.put(`/suppliers/${id}/approve`);
        return response.data;
    },

    // ============ Purchase Orders ============

    // Get all purchase orders
    getOrders: async (params = {}) => {
        const response = await api.get('/purchase-orders', { params });
        return response.data;
    },

    // Get single purchase order
    getOrderById: async (id) => {
        const response = await api.get(`/purchase-orders/${id}`);
        return response.data;
    },

    // Create purchase order
    createOrder: async (data) => {
        const response = await api.post('/purchase-orders', data);
        return response.data;
    },

    // Update purchase order
    updateOrder: async (id, data) => {
        const response = await api.put(`/purchase-orders/${id}`, data);
        return response.data;
    },

    // Update purchase order status
    updateOrderStatus: async (id, status) => {
        const response = await api.put(`/purchase-orders/${id}/status`, { status });
        return response.data;
    },

    // Receive inventory from purchase order
    receiveOrder: async (id, receivedItems) => {
        const response = await api.put(`/purchase-orders/${id}/receive`, {
            received_items: receivedItems,
        });
        return response.data;
    },

    // Cancel purchase order
    cancelOrder: async (id) => {
        const response = await api.put(`/purchase-orders/${id}/cancel`);
        return response.data;
    },
};