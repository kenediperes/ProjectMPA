import api from './index';

export const invoiceAPI = {
    // Get all invoices
    getAll: async (params = {}) => {
        const response = await api.get('/invoices', { params });
        return response.data;
    },

    // Get single invoice
    getById: async (id) => {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    },

    // Create invoice from sales order
    create: async (salesOrderId, dueDate) => {
        const response = await api.post('/invoices', {
            sales_order_id: salesOrderId,
            due_date: dueDate,
        });
        return response.data;
    },

    // Update invoice
    update: async (id, data) => {
        const response = await api.put(`/invoices/${id}`, data);
        return response.data;
    },

    // Record payment
    recordPayment: async (id, paymentData) => {
        const response = await api.put(`/invoices/${id}/payment`, paymentData);
        return response.data;
    },

    // Get unpaid invoices
    getUnpaid: async () => {
        const response = await api.get('/invoices/unpaid');
        return response.data;
    },

    // Get overdue invoices
    getOverdue: async () => {
        const response = await api.get('/invoices/overdue');
        return response.data;
    },

    // Send invoice reminder
    sendReminder: async (id) => {
        const response = await api.post(`/invoices/${id}/reminder`);
        return response.data;
    },

    // Mark invoice as paid
    markAsPaid: async (id) => {
        const response = await api.put(`/invoices/${id}/paid`);
        return response.data;
    },

    // Mark invoice as overdue
    markAsOverdue: async (id) => {
        const response = await api.put(`/invoices/${id}/overdue`);
        return response.data;
    },
};