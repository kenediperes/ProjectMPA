import api from './index';

export const productAPI = {
    // Get all products
    getAll: async (params = {}) => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    // Get single product
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Create product
    create: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    // Update product
    update: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    // Delete product (soft delete / set inactive)
    delete: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },

    // Update stock
    updateStock: async (id, quantity, transactionType) => {
        const response = await api.put(`/products/${id}/stock`, {
            quantity,
            transaction_type: transactionType,
        });
        return response.data;
    },

    // Check stock availability
    checkStock: async (id, requestedQuantity) => {
        const response = await api.get(`/products/${id}/stock-check`, {
            params: { requested_quantity: requestedQuantity },
        });
        return response.data;
    },

    // Get low stock products
    getLowStock: async () => {
        const response = await api.get('/products/low-stock');
        return response.data;
    },
};