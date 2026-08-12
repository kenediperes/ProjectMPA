import React, { useState, useEffect } from 'react';

const PurchaseOrderForm = ({ initialData, suppliers, products, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: '',
    items: [{ productId: '', quantity: 1, unitPrice: 0 }],
    discount: 0,
    tax: 0,
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        supplierId: initialData.supplierId || '',
        orderDate: initialData.orderDate ? new Date(initialData.orderDate).toISOString().split('T')[0] : '',
        expectedDelivery: initialData.expectedDelivery ? new Date(initialData.expectedDelivery).toISOString().split('T')[0] : '',
        items: initialData.items || [{ productId: '', quantity: 1, unitPrice: 0 }],
        discount: initialData.discount || 0,
        tax: initialData.tax || 0,
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      newItems[index].unitPrice = product ? product.price : 0;
    }
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const discountAmt = (subtotal * formData.discount) / 100;
    const taxAmt = (subtotal * formData.tax) / 100;
    return subtotal - discountAmt + taxAmt;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.supplierId) newErrors.supplierId = 'Supplier wajib dipilih';
    if (!formData.expectedDelivery) newErrors.expectedDelivery = 'Tanggal perkiraan tiba wajib diisi';
    if (formData.items.some(item => !item.productId || item.quantity < 1)) {
      newErrors.items = 'Setiap item harus memiliki produk dan jumlah minimal 1';
    }
    if (formData.discount < 0 || formData.discount > 100) newErrors.discount = 'Diskon antara 0-100%';
    if (formData.tax < 0 || formData.tax > 100) newErrors.tax = 'Pajak antara 0-100%';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...formData,
      total: calculateTotal(),
      items: formData.items.map(item => ({
        ...item,
        quantity: parseInt(item.quantity),
        unitPrice: parseFloat(item.unitPrice),
      })),
    });
  };

  return (
    <div className="purchase-order-form">
      <h3>{initialData ? 'Edit Purchase Order' : 'Buat Purchase Order Baru'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Supplier <span className="required">*</span></label>
            <select
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              className={errors.supplierId ? 'error' : ''}
            >
              <option value="">Pilih Supplier</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.supplierId && <span className="error-text">{errors.supplierId}</span>}
          </div>

          <div className="form-group">
            <label>Tanggal Pesanan</label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Perkiraan Tiba <span className="required">*</span></label>
            <input
              type="date"
              name="expectedDelivery"
              value={formData.expectedDelivery}
              onChange={handleChange}
              className={errors.expectedDelivery ? 'error' : ''}
            />
            {errors.expectedDelivery && <span className="error-text">{errors.expectedDelivery}</span>}
          </div>
        </div>

        <div className="items-section">
          <label>Item Pesanan <span className="required">*</span></label>
          {formData.items.map((item, index) => (
            <div key={index} className="item-row">
              <select
                value={item.productId}
                onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                className={errors.items ? 'error' : ''}
              >
                <option value="">Pilih Produk</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                placeholder="Qty"
              />
              <input
                type="number"
                min="0"
                step="1000"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                placeholder="Harga Satuan"
              />
              <button type="button" onClick={() => removeItem(index)} className="btn-remove">✕</button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="btn-add-item">+ Tambah Item</button>
          {errors.items && <span className="error-text">{errors.items}</span>}
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Diskon (%)</label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              className={errors.discount ? 'error' : ''}
            />
            {errors.discount && <span className="error-text">{errors.discount}</span>}
          </div>
          <div className="form-group">
            <label>Pajak (%)</label>
            <input
              type="number"
              name="tax"
              min="0"
              max="100"
              value={formData.tax}
              onChange={handleChange}
              className={errors.tax ? 'error' : ''}
            />
            {errors.tax && <span className="error-text">{errors.tax}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Catatan</label>
          <textarea
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Catatan tambahan"
          />
        </div>

        <div className="total-display">
          Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(calculateTotal())}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">Batal</button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Menyimpan...' : initialData ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      </form>

      <style>{`
        .purchase-order-form {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          max-width: 800px;
          margin: 0 auto;
        }
        .purchase-order-form h3 { margin: 0 0 1.5rem 0; color: #1f2937; }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .form-group label { font-weight: 500; font-size: 0.9rem; color: #374151; }
        .required { color: #ef4444; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.6rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .form-group input.error, .form-group select.error { border-color: #ef4444; background: #fef2f2; }
        .error-text { color: #ef4444; font-size: 0.8rem; }
        .items-section {
          margin: 1rem 0;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
        }
        .items-section label { font-weight: 500; display: block; margin-bottom: 0.5rem; }
        .item-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .item-row select { flex: 2; min-width: 120px; }
        .item-row input { flex: 1; min-width: 80px; }
        .item-row input, .item-row select {
          padding: 0.4rem 0.6rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #fff;
        }
        .btn-remove {
          background: #fee2e2;
          border: none;
          border-radius: 6px;
          padding: 0.2rem 0.6rem;
          cursor: pointer;
          color: #991b1b;
          font-weight: bold;
        }
        .btn-add-item {
          background: #dbeafe;
          border: none;
          border-radius: 6px;
          padding: 0.4rem 1rem;
          cursor: pointer;
          color: #1e40af;
          font-weight: 500;
          margin-top: 0.5rem;
        }
        .total-display {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: right;
          margin: 1rem 0;
          color: #111827;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
        }
        .btn-cancel, .btn-submit {
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .btn-cancel { background: #f3f4f6; color: #4b5563; }
        .btn-cancel:hover { background: #e5e7eb; }
        .btn-submit { background: #3b82f6; color: #fff; }
        .btn-submit:hover:not(:disabled) { background: #2563eb; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .item-row { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </div>
  );
};

export default PurchaseOrderForm;