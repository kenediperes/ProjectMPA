import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    threshold: '5',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        sku: initialData.sku || '',
        name: initialData.name || '',
        category: initialData.category || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        threshold: initialData.threshold || '5',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Hapus error untuk field yang diisi
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.sku.trim()) newErrors.sku = 'SKU wajib diisi';
    if (!formData.name.trim()) newErrors.name = 'Nama produk wajib diisi';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Harga harus lebih dari 0';
    if (formData.stock !== '' && parseInt(formData.stock) < 0) newErrors.stock = 'Stok tidak boleh negatif';
    if (formData.threshold !== '' && parseInt(formData.threshold) < 0) newErrors.threshold = 'Threshold tidak boleh negatif';
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
      price: parseFloat(formData.price),
      stock: formData.stock !== '' ? parseInt(formData.stock) : 0,
      threshold: formData.threshold !== '' ? parseInt(formData.threshold) : 5,
    });
  };

  return (
    <div className="product-form-container">
      <h3>{initialData ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="sku">SKU <span className="required">*</span></label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Contoh: PRD-001"
              className={errors.sku ? 'error' : ''}
              disabled={!!initialData} // SKU tidak bisa diubah saat edit
            />
            {errors.sku && <span className="error-text">{errors.sku}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Nama Produk <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama produk"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Misal: Elektronik, Furniture"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Harga (Rp) <span className="required">*</span></label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="1000"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stok Awal</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="1"
              className={errors.stock ? 'error' : ''}
              disabled={!!initialData} // Stok dikelola terpisah
            />
            {errors.stock && <span className="error-text">{errors.stock}</span>}
            {initialData && <small className="hint">Gunakan menu "Kelola Stok" untuk mengubah jumlah.</small>}
          </div>

          <div className="form-group">
            <label htmlFor="threshold">Batas Peringatan Stok</label>
            <input
              type="number"
              id="threshold"
              name="threshold"
              value={formData.threshold}
              onChange={handleChange}
              placeholder="5"
              min="0"
              step="1"
              className={errors.threshold ? 'error' : ''}
            />
            {errors.threshold && <span className="error-text">{errors.threshold}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Deskripsi produk (opsional)"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Batal
          </button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Menyimpan...' : initialData ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      </form>

      <style>{`
        .product-form-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          max-width: 700px;
          margin: 0 auto;
        }
        .product-form-container h3 {
          margin: 0 0 1.5rem 0;
          color: #1f2937;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .full-width {
          grid-column: 1 / -1;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .form-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #374151;
        }
        .required {
          color: #ef4444;
        }
        .form-group input, .form-group textarea {
          padding: 0.6rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
          background: #f9fafb;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .form-group input.error, .form-group textarea.error {
          border-color: #ef4444;
          background: #fef2f2;
        }
        .error-text {
          color: #ef4444;
          font-size: 0.8rem;
        }
        .hint {
          color: #6b7280;
          font-size: 0.8rem;
        }
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
        .btn-cancel {
          background: #f3f4f6;
          color: #4b5563;
        }
        .btn-cancel:hover {
          background: #e5e7eb;
        }
        .btn-submit {
          background: #3b82f6;
          color: #fff;
        }
        .btn-submit:hover:not(:disabled) {
          background: #2563eb;
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .full-width {
            grid-column: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductForm;