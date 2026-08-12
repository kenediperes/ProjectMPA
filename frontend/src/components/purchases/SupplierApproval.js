import React, { useState } from 'react';

const SupplierApproval = ({ supplier, onApprove, onReject, onClose, isLoading }) => {
  const [notes, setNotes] = useState('');
  const [decision, setDecision] = useState('approve'); // 'approve' or 'reject'

  if (!supplier) {
    return <div className="error-message">Supplier tidak ditemukan.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (decision === 'approve') {
      onApprove(supplier.id, notes);
    } else {
      onReject(supplier.id, notes);
    }
  };

  return (
    <div className="supplier-approval-container">
      <div className="approval-header">
        <h3>Persetujuan Supplier</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="supplier-info">
        <div className="info-item">
          <span className="label">Nama</span>
          <span className="value">{supplier.name}</span>
        </div>
        <div className="info-item">
          <span className="label">Kontak</span>
          <span className="value">{supplier.contactPerson || '-'}</span>
        </div>
        <div className="info-item">
          <span className="label">Email</span>
          <span className="value">{supplier.email || '-'}</span>
        </div>
        <div className="info-item">
          <span className="label">Status Saat Ini</span>
          <span className={`value status-${supplier.approvalStatus}`}>
            {supplier.approvalStatus.charAt(0).toUpperCase() + supplier.approvalStatus.slice(1)}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="approval-form">
        <div className="form-group">
          <label>Keputusan</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="approve"
                checked={decision === 'approve'}
                onChange={() => setDecision('approve')}
              />
              Setujui
            </label>
            <label>
              <input
                type="radio"
                value="reject"
                checked={decision === 'reject'}
                onChange={() => setDecision('reject')}
              />
              Tolak
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Catatan (opsional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            placeholder="Tambahkan catatan untuk keputusan ini..."
          />
        </div>

        <div className="approval-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Batal
          </button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Memproses...' : 'Kirim Keputusan'}
          </button>
        </div>
      </form>

      <style>{`
        .supplier-approval-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-width: 500px;
          margin: 0 auto;
          position: relative;
        }
        .approval-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .approval-header h3 {
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
        .supplier-info {
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
          font-size: 1rem;
          font-weight: 500;
          color: #1f2937;
        }
        .status-pending { color: #f59e0b; }
        .status-approved { color: #10b981; }
        .status-rejected { color: #ef4444; }
        .approval-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
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
        .radio-group {
          display: flex;
          gap: 1.5rem;
        }
        .radio-group label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 400;
          cursor: pointer;
        }
        .form-group textarea {
          padding: 0.6rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
          resize: vertical;
        }
        .form-group textarea:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .approval-actions {
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
        @media (max-width: 480px) {
          .supplier-info {
            grid-template-columns: 1fr;
          }
          .radio-group {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SupplierApproval;