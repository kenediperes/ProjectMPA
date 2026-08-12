import React, { useState } from 'react';

const InvoiceStatus = ({ invoice, onUpdateStatus, onClose, isLoading }) => {
  const [status, setStatus] = useState(invoice?.status || 'unpaid');
  const [notes, setNotes] = useState('');

  if (!invoice) {
    return <div className="error-message">Invoice tidak ditemukan.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(invoice.id, status, notes);
    onClose();
  };

  const statusOptions = ['unpaid', 'paid', 'overdue', 'cancelled'];
  const statusLabels = {
    unpaid: 'Belum Dibayar',
    paid: 'Lunas',
    overdue: 'Jatuh Tempo',
    cancelled: 'Dibatalkan',
  };

  const statusColor = (s) => {
    const map = {
      unpaid: '#ef4444',
      paid: '#10b981',
      overdue: '#f59e0b',
      cancelled: '#9ca3af',
    };
    return map[s] || '#6b7280';
  };

  return (
    <div className="invoice-status-container">
      <div className="status-header">
        <h3>Status Invoice - {invoice.invoiceNumber}</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="invoice-summary">
        <div><strong>Pelanggan:</strong> {invoice.customer?.name}</div>
        <div><strong>Total:</strong> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoice.total)}</div>
        <div><strong>Status Saat Ini:</strong> 
          <span className="current-status" style={{ backgroundColor: statusColor(invoice.status) }}>
            {statusLabels[invoice.status] || invoice.status}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="status-form">
        <div className="form-group">
          <label>Ubah Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map(s => (
              <option key={s} value={s}>
                {statusLabels[s] || s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Catatan (opsional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="2"
            placeholder="Alasan perubahan status"
          />
        </div>

        <div className="status-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Menyimpan...' : 'Perbarui Status'}
          </button>
        </div>
      </form>

      <style>{`
        .invoice-status-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-width: 480px;
          margin: 0 auto;
          position: relative;
        }
        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .status-header h3 { margin: 0; color: #1f2937; }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0 0.5rem;
        }
        .close-btn:hover { color: #1f2937; }
        .invoice-summary {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: #f9fafb;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .invoice-summary div { display: flex; justify-content: space-between; align-items: center; }
        .current-status {
          display: inline-block;
          padding: 0.2rem 0.8rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #fff;
        }
        .status-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .status-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .status-form .form-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #374151;
        }
        .status-form .form-group select, .status-form .form-group textarea {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
        }
        .status-form .form-group select:focus, .status-form .form-group textarea:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .status-actions {
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
        .btn-cancel { background: #f3f4f6; color: #4b5563; }
        .btn-cancel:hover { background: #e5e7eb; }
        .btn-submit { background: #3b82f6; color: #fff; }
        .btn-submit:hover:not(:disabled) { background: #2563eb; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
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

export default InvoiceStatus;