import React, { useState, useEffect } from 'react';

const ServiceOrderForm = ({ initialData, customers, onCancel, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    title: '',
    description: '',
    priority: 'medium',
    orderDate: new Date().toISOString().split('T')[0],
    scheduledDate: '',
    estimatedDuration: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        customerId: initialData.customerId || '',
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        orderDate: initialData.orderDate ? new Date(initialData.orderDate).toISOString().split('T')[0] : '',
        scheduledDate: initialData.scheduledDate ? new Date(initialData.scheduledDate).toISOString().split('T')[0] : '',
        estimatedDuration: initialData.estimatedDuration || '',
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
    if (!formData.customerId) newErrors.customerId = 'Pelanggan wajib dipilih';
    if (!formData.title.trim()) newErrors.title = 'Judul wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="service-order-form">
      <h3>{initialData ? 'Edit Service Order' : 'Buat Service Order Baru'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Pelanggan <span className="required">*</span></label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className={errors.customerId ? 'error' : ''}
            >
              <option value="">Pilih Pelanggan</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.customerId && <span className="error-text">{errors.customerId}</span>}
          </div>

          <div className="form-group">
            <label>Judul <span className="required">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Judul layanan"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Prioritas</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="low">Rendah</option>
              <option value="medium">Sedang</option>
              <option value="high">Tinggi</option>
            </select>
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
            <label>Tanggal Dijadwalkan</label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Durasi Estimasi (jam)</label>
            <input
              type="number"
              name="estimatedDuration"
              value={formData.estimatedDuration}
              onChange={handleChange}
              placeholder="Misal: 2.5"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Deskripsi <span className="required">*</span></label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Deskripsi layanan yang diperlukan"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
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
        .service-order-form {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          max-width: 700px;
          margin: 0 auto;
        }
        .service-order-form h3 { margin: 0 0 1.5rem 0; color: #1f2937; }
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

export default ServiceOrderForm;