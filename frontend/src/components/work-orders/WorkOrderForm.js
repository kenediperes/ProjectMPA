import React, { useState, useEffect } from 'react';

const WorkOrderForm = ({ initialData, products, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    deadline: '',
    priority: 'medium',
    instructions: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        productId: initialData.productId || '',
        quantity: initialData.quantity || 1,
        deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
        priority: initialData.priority || 'medium',
        instructions: initialData.instructions || '',
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.productId) newErrors.productId = 'Produk wajib dipilih';
    if (!formData.quantity || parseInt(formData.quantity) < 1) newErrors.quantity = 'Jumlah minimal 1';
    if (!formData.deadline) newErrors.deadline = 'Deadline wajib diisi';
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
      quantity: parseInt(formData.quantity),
    });
  };

  return (
    <div className="work-order-form">
      <h3>{initialData ? 'Edit Work Order' : 'Buat Work Order Baru'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Produk <span className="required">*</span></label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className={errors.productId ? 'error' : ''}
            >
              <option value="">Pilih Produk</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
              ))}
            </select>
            {errors.productId && <span className="error-text">{errors.productId}</span>}
          </div>

          <div className="form-group">
            <label>Jumlah <span className="required">*</span></label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label>Deadline <span className="required">*</span></label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={errors.deadline ? 'error' : ''}
            />
            {errors.deadline && <span className="error-text">{errors.deadline}</span>}
          </div>

          <div className="form-group">
            <label>Prioritas</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="low">Rendah</option>
              <option value="medium">Sedang</option>
              <option value="high">Tinggi</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Instruksi Produksi</label>
          <textarea
            name="instructions"
            rows="3"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Instruksi khusus untuk produksi (misal: warna, ukuran, bahan)"
          />
        </div>

        <div className="form-group">
          <label>Catatan Tambahan</label>
          <textarea
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Catatan internal"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">Batal</button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Menyimpan...' : initialData ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      </form>

      <style>{`
        .work-order-form {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          max-width: 700px;
          margin: 0 auto;
        }
        .work-order-form h3 { margin: 0 0 1.5rem 0; color: #1f2937; }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
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
        .form-group input.error, .form-group select.error, .form-group textarea.error {
          border-color: #ef4444;
          background: #fef2f2;
        }
        .error-text { color: #ef4444; font-size: 0.8rem; }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
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
        }
      `}</style>
    </div>
  );
};

export default WorkOrderForm;