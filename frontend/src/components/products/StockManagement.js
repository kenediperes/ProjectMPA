import React, { useState } from 'react';

const StockManagement = ({ product, onUpdateStock, onClose, isLoading }) => {
  const [quantity, setQuantity] = useState('');
  const [operation, setOperation] = useState('add'); // 'add' | 'subtract' | 'set'
  const [note, setNote] = useState('');

  if (!product) {
    return <div className="error-message">Produk tidak ditemukan.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 0) {
      alert('Masukkan jumlah yang valid (angka >= 0)');
      return;
    }
    if (qty === 0) {
      alert('Jumlah harus lebih dari 0');
      return;
    }
    let newStock;
    switch (operation) {
      case 'add':
        newStock = product.stock + qty;
        break;
      case 'subtract':
        if (qty > product.stock) {
          alert(`Stok tidak mencukupi. Stok saat ini: ${product.stock}`);
          return;
        }
        newStock = product.stock - qty;
        break;
      case 'set':
        newStock = qty;
        break;
      default:
        return;
    }
    onUpdateStock(product.id, newStock, note, operation);
  };

  return (
    <div className="stock-management-container">
      <div className="stock-header">
        <h3>Kelola Stok: {product.name}</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="stock-info">
        <div className="info-item">
          <span className="label">SKU</span>
          <span className="value">{product.sku}</span>
        </div>
        <div className="info-item">
          <span className="label">Stok Saat Ini</span>
          <span className={`value stock-current ${product.stock <= product.threshold ? 'low' : ''}`}>
            {product.stock}
          </span>
        </div>
        <div className="info-item">
          <span className="label">Batas Peringatan</span>
          <span className="value">{product.threshold}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="stock-form">
        <div className="form-group">
          <label htmlFor="operation">Jenis Operasi</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="add">Tambah Stok (+)</option>
            <option value="subtract">Kurangi Stok (-)</option>
            <option value="set">Atur Ulang Stok (=)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">
            Jumlah
            {operation === 'add' && ' (akan ditambahkan)'}
            {operation === 'subtract' && ' (akan dikurangi)'}
            {operation === 'set' && ' (nilai baru)'}
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Masukkan angka"
            min="0"
            step="1"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="note">Catatan (opsional)</label>
          <input
            type="text"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Misal: restock, retur, adjustment"
          />
        </div>

        <div className="stock-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Batal
          </button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Memproses...' : 'Perbarui Stok'}
          </button>
        </div>
      </form>

      <style>{`
        .stock-management-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-width: 480px;
          margin: 0 auto;
          position: relative;
        }
        .stock-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .stock-header h3 {
          margin: 0;
          color: #1f2937;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0 0.5rem;
        }
        .close-btn:hover {
          color: #1f2937;
        }
        .stock-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }
        .info-item {
          display: flex;
          flex-direction: column;
        }
        .info-item .label {
          font-size: 0.8rem;
          color: #6b7280;
        }
        .info-item .value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }
        .stock-current {
          font-size: 1.25rem !important;
        }
        .stock-current.low {
          color: #f59e0b;
        }
        .stock-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .stock-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .stock-form .form-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #374151;
        }
        .stock-form .form-group select,
        .stock-form .form-group input {
          padding: 0.6rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
        }
        .stock-form .form-group select:focus,
        .stock-form .form-group input:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .stock-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
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
        .error-message {
          padding: 1rem;
          color: #ef4444;
          background: #fef2f2;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default StockManagement;