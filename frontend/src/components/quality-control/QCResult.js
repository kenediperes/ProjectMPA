import React, { useState } from 'react';

const QCResult = ({ qcRecord, onUpdateResult, onClose, isLoading }) => {
  const [decision, setDecision] = useState(qcRecord?.result || '');
  const [notes, setNotes] = useState(qcRecord?.resultNotes || '');

  if (!qcRecord) {
    return <div className="error-message">Data QC tidak ditemukan.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!decision) {
      alert('Pilih keputusan (Passed / Failed)');
      return;
    }
    onUpdateResult(qcRecord.id, { result: decision, notes });
  };

  // Count passed/failed parameters
  const parameters = qcRecord.parameters || [];
  const passedCount = parameters.filter(p => p.status === 'passed').length;
  const failedCount = parameters.filter(p => p.status === 'failed').length;
  const totalCount = parameters.length;

  return (
    <div className="qc-result-container">
      <div className="result-header">
        <h3>Hasil Inspeksi QC - {qcRecord.qcNumber}</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="record-info">
        <div><strong>Produk:</strong> {qcRecord.product?.name} ({qcRecord.product?.sku})</div>
        <div><strong>Inspektur:</strong> {qcRecord.inspector}</div>
        <div><strong>Tanggal:</strong> {new Date(qcRecord.inspectionDate).toLocaleDateString('id-ID')}</div>
      </div>

      <div className="parameters-summary">
        <h4>Ringkasan Parameter</h4>
        <div className="summary-stats">
          <span className="stat passed">✅ Passed: {passedCount}</span>
          <span className="stat failed">❌ Failed: {failedCount}</span>
          <span className="stat total">📊 Total: {totalCount}</span>
        </div>
        <table className="param-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Standar</th>
              <th>Nilai Aktual</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parameters.length === 0 ? (
              <tr><td colSpan="4" className="empty-params">Tidak ada parameter.</td></tr>
            ) : (
              parameters.map((param, index) => (
                <tr key={index}>
                  <td>{param.name}</td>
                  <td>{param.standard}</td>
                  <td>{param.actual}</td>
                  <td>
                    <span className={`param-status ${param.status === 'passed' ? 'passed' : 'failed'}`}>
                      {param.status?.charAt(0).toUpperCase() + param.status?.slice(1) || '-'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {qcRecord.status !== 'completed' ? (
        <form onSubmit={handleSubmit} className="result-form">
          <div className="form-group">
            <label>Keputusan Akhir <span className="required">*</span></label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="passed"
                  checked={decision === 'passed'}
                  onChange={() => setDecision('passed')}
                />
                ✅ Passed
              </label>
              <label>
                <input
                  type="radio"
                  value="failed"
                  checked={decision === 'failed'}
                  onChange={() => setDecision('failed')}
                />
                ❌ Failed
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Catatan Hasil (opsional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="2"
              placeholder="Catatan tentang keputusan ini"
            />
          </div>

          <div className="result-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
            <button type="submit" disabled={isLoading} className="btn-submit">
              {isLoading ? 'Menyimpan...' : 'Simpan Keputusan'}
            </button>
          </div>
        </form>
      ) : (
        <div className="final-result">
          <h4>Hasil Akhir</h4>
          <div className={`final-decision ${qcRecord.result}`}>
            {qcRecord.result?.charAt(0).toUpperCase() + qcRecord.result?.slice(1)}
          </div>
          {qcRecord.resultNotes && (
            <div className="result-notes">
              <strong>Catatan:</strong> {qcRecord.resultNotes}
            </div>
          )}
          <button onClick={onClose} className="btn-close-final">Tutup</button>
        </div>
      )}

      <style>{`
        .qc-result-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-width: 700px;
          margin: 0 auto;
          position: relative;
        }
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .result-header h3 { margin: 0; color: #1f2937; }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0 0.5rem;
        }
        .close-btn:hover { color: #1f2937; }
        .record-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          background: #f9fafb;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .parameters-summary h4 {
          margin: 0 0 0.5rem 0;
          color: #374151;
        }
        .summary-stats {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        .stat.passed { color: #10b981; font-weight: 600; }
        .stat.failed { color: #ef4444; font-weight: 600; }
        .stat.total { color: #3b82f6; font-weight: 600; }
        .param-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .param-table th {
          text-align: left;
          padding: 0.4rem 0.4rem;
          background: #f3f4f6;
          color: #4b5563;
          font-weight: 600;
          border-bottom: 1px solid #e5e7eb;
        }
        .param-table td {
          padding: 0.4rem 0.4rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .param-status {
          display: inline-block;
          padding: 0.1rem 0.6rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #fff;
        }
        .param-status.passed { background: #10b981; }
        .param-status.failed { background: #ef4444; }
        .empty-params { text-align: center; color: #9ca3af; padding: 0.5rem; }
        .result-form {
          margin-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
        }
        .result-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }
        .result-form .form-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #374151;
        }
        .result-form .radio-group {
          display: flex;
          gap: 1.5rem;
        }
        .result-form .radio-group label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 400;
          cursor: pointer;
        }
        .result-form .form-group textarea {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
          resize: vertical;
        }
        .result-form .form-group textarea:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .result-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        .btn-cancel, .btn-submit, .btn-close-final {
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
        .btn-close-final { background: #6b7280; color: #fff; }
        .btn-close-final:hover { background: #4b5563; }
        .final-result {
          margin-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
          text-align: center;
        }
        .final-result h4 { margin: 0 0 0.5rem 0; color: #374151; }
        .final-decision {
          display: inline-block;
          padding: 0.5rem 2rem;
          border-radius: 8px;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }
        .final-decision.passed { background: #10b981; }
        .final-decision.failed { background: #ef4444; }
        .result-notes {
          margin: 0.75rem 0;
          font-size: 0.95rem;
          color: #4b5563;
        }
        .error-message {
          padding: 1rem;
          color: #ef4444;
          background: #fef2f2;
          border-radius: 8px;
          text-align: center;
        }
        @media (max-width: 480px) {
          .record-info { flex-direction: column; gap: 0.3rem; }
          .summary-stats { flex-direction: column; gap: 0.3rem; }
          .result-form .radio-group { flex-direction: column; gap: 0.3rem; }
        }
      `}</style>
    </div>
  );
};

export default QCResult;