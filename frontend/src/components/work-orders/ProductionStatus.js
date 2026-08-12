import React, { useState } from 'react';

const ProductionStatus = ({ workOrder, onUpdateStatus, onUpdateProgress, onClose, isLoading }) => {
  const [status, setStatus] = useState(workOrder?.status || 'draft');
  const [completedQuantity, setCompletedQuantity] = useState(workOrder?.completedQuantity || 0);
  const [notes, setNotes] = useState('');

  if (!workOrder) {
    return <div className="error-message">Work order tidak ditemukan.</div>;
  }

  const totalQuantity = workOrder.quantity || 0;
  const progress = totalQuantity > 0 ? Math.round((completedQuantity / totalQuantity) * 100) : 0;

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleProgressChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    if (val >= 0 && val <= totalQuantity) {
      setCompletedQuantity(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update status and progress
    onUpdateStatus(workOrder.id, status, { completedQuantity, notes });
    onClose();
  };

  const statusOptions = ['draft', 'planned', 'in-production', 'completed', 'cancelled'];

  return (
    <div className="production-status-container">
      <div className="status-header">
        <h3>Status Produksi - {workOrder.workOrderNumber}</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="order-info">
        <div><strong>Produk:</strong> {workOrder.product?.name} ({workOrder.product?.sku})</div>
        <div><strong>Jumlah:</strong> {workOrder.quantity}</div>
        <div><strong>Deadline:</strong> {workOrder.deadline ? new Date(workOrder.deadline).toLocaleDateString('id-ID') : '-'}</div>
      </div>

      <div className="progress-section">
        <label>Progres Produksi</label>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
        <div className="progress-input">
          <span>Jumlah selesai:</span>
          <input
            type="number"
            min="0"
            max={totalQuantity}
            value={completedQuantity}
            onChange={handleProgressChange}
            disabled={status === 'completed' || status === 'cancelled'}
          />
          <span>dari {totalQuantity}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="status-form">
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={handleStatusChange}>
            {statusOptions.map(s => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
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
            placeholder="Catatan tentang update ini"
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
        .production-status-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-width: 500px;
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
        .order-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          background: #f9fafb;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .progress-section {
          margin-bottom: 1.5rem;
        }
        .progress-section label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #374151;
          display: block;
          margin-bottom: 0.3rem;
        }
        .progress-bar {
          background: #e5e7eb;
          border-radius: 999px;
          height: 1.5rem;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .progress-fill {
          background: #3b82f6;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 600;
          transition: width 0.3s ease;
        }
        .progress-input {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .progress-input input {
          width: 80px;
          padding: 0.3rem 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .progress-input input:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .progress-input input:disabled {
          background: #f3f4f6;
          cursor: not-allowed;
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
        @media (max-width: 480px) {
          .order-info { flex-direction: column; gap: 0.3rem; }
          .progress-input { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default ProductionStatus;