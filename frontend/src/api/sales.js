import api from './index';

export const salesAPI = {
    // ============ Sales Quotations ============

    // Get all quotations
    getQuotations: async (params = {}) => {
        const response = await api.get('/sales-quotations', { params });
        return response.data;
    },

    // Get single quotation
    getQuotationById: async (id) => {
        const response = await api.get(`/sales-quotations/${id}`);
        return response.data;
    },

    // Create quotation
    createQuotation: async (data) => {
        const response = await api.post('/sales-quotations', data);
        return response.data;
    },

    // Update quotation
    updateQuotation: async (id, data) => {
        const response = await api.put(`/sales-quotations/${id}`, data);
        return response.data;
    },

    // Convert quotation to sales order
    convertQuotationToOrder: async (quotationId) => {
        const response = await api.post(`/sales-quotations/${quotationId}/convert`);
        return response.data;
    },

    // ============ Sales Orders ============

    // Get all sales orders
    getOrders: async (params = {}) => {
        const response = await api.get('/sales-orders', { params });
        return response.data;
    },

    // Get single sales order
    getOrderById: async (id) => {
        const response = await api.get(`/sales-orders/${id}`);
        return response.data;
    },

    // Create sales order
    createOrder: async (data) => {
        const response = await api.post('/sales-orders', data);
        return response.data;
    },

    // Update sales order
    updateOrder: async (id, data) => {
        const response = await api.put(`/sales-orders/${id}`, data);
        return response.data;
    },

    // Update order status
    updateOrderStatus: async (id, status) => {
        const response = await api.put(`/sales-orders/${id}/status`, { status });
        return response.data;
    },

    // Update delivery status
    updateDeliveryStatus: async (id, deliveryStatus) => {
        const response = await api.put(`/sales-orders/${id}/delivery`, {
            delivery_status: deliveryStatus,
        });
        return response.data;
    },

    // ============ Work Orders ============

    // Get work orders
    getWorkOrders: async (params = {}) => {
        const response = await api.get('/work-orders', { params });
        return response.data;
    },

    // Create work order
    createWorkOrder: async (data) => {
        const response = await api.post('/work-orders', data);
        return response.data;
    },

    // Update work order status
    updateWorkOrderStatus: async (id, status) => {
        const response = await api.put(`/work-orders/${id}/status`, { status });
        return response.data;
    },

    // ============ Quality Control ============

    // Get QC records
    getQC: async (params = {}) => {
        const response = await api.get('/quality-controls', { params });
        return response.data;
    },

    // Create QC record
    createQC: async (data) => {
        const response = await api.post('/quality-controls', data);
        return response.data;
    },

    // Update QC result
    updateQCResult: async (id, result, notes) => {
        const response = await api.put(`/quality-controls/${id}`, { result, notes });
        return response.data;
    },
};