import api from './index';

export const reportAPI = {
    // Get dashboard statistics
    getDashboard: async () => {
        const response = await api.get('/dashboard');
        return response.data;
    },

    // Sales report
    getSalesReport: async (startDate, endDate, groupBy = 'day') => {
        const response = await api.get('/reports/sales', {
            params: {
                start_date: startDate,
                end_date: endDate,
                group_by: groupBy,
            },
        });
        return response.data;
    },

    // Inventory report
    getInventoryReport: async () => {
        const response = await api.get('/reports/inventory');
        return response.data;
    },

    // Financial report
    getFinancialReport: async (startDate, endDate) => {
        const response = await api.get('/reports/financial', {
            params: {
                start_date: startDate,
                end_date: endDate,
            },
        });
        return response.data;
    },

    // Communication report (WhatsApp, Telegram, Email)
    getCommunicationReport: async (startDate, endDate) => {
        const response = await api.get('/reports/communications', {
            params: {
                start_date: startDate,
                end_date: endDate,
            },
        });
        return response.data;
    },

    // Custom report (admin only)
    getCustomReport: async (query) => {
        const response = await api.post('/reports/custom', { query });
        return response.data;
    },

    // Export report to CSV
    exportCSV: async (reportType, params) => {
        const response = await api.get(`/reports/export/${reportType}`, {
            params,
            responseType: 'blob',
        });
        return response.data;
    },
};