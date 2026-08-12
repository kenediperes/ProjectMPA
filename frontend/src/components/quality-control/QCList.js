import React, { useState } from 'react';

const QCList = ({ qcRecords, onEdit, onDelete, onView, onUpdateResult, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [resultFilter, setResultFilter] = useState('all');

  const statuses = ['all', 'pending', 'in-progress', 'completed'];
  const results = ['all', 'passed', 'failed'];

  const filteredRecords = qcRecords.filter(record => {
    const matchSearch = record.qcNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        record.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        record.product?.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        record.inspector?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchResult = resultFilter === 'all' || record.result === resultFilter;
    return matchSearch && matchStatus && matchResult;
  });

  const statusColor = (status) => {
    const map = {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
    };
    return map[status] || '#6b7280';
  };

  const resultColor = (result) => {
    const map = {
      passed: '#10b981',
      failed: '#ef4444',
    };
    return map[result] || '#6b7280';
  };

  if (isLoading) return <div className="loading">Memuat data QC...</div>;

  return (
    <div className="qc-list">
      <div className="list-header">
        <h2>Quality Control</h2>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Cari nomor, produk, atau inspektur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            {statuses.map(s => (
              <option key={s} value={s}>
                {s === 'all' ? 'Semua Status' : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
            className="filter-select"
          >
            {results.map(r => (
              <option key={r} value={r}>
                {r === 'all' ? 'Semua Hasil' : r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="qc-table">
          <thead>
            <tr>
              <th>No. QC</th>
              <th>Produk</th>
              <th>Inspektur</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Hasil</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr><td colSpan="7" className="empty-state">Tidak ada data QC ditemukan.</td></tr>
            ) : (
              filteredRecords.map(record => (
                <tr key={record.id}>
                  <td className="qc-number">{record.qcNumber}</td>
                  <td>{record.product?.name || '-'} <span className="sku">({record.product?.sku})</span></td>
                  <td>{record.inspector || '-'}</td>
                  <td>{record.inspectionDate ? new Date(record.inspectionDate).toLocaleDateString('id-ID') : '-'}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColor(record.status) }}>
                      {record.status?.charAt(0).toUpperCase() + record.status?.slice(1) || 'Pending'}
                    </span>
                  </td>
                  <td>
                    {record.result ? (
                      <span className="result-badge" style={{ backgroundColor: resultColor(record.result) }}>
                        {record.result.charAt(0).toUpperCase() + record.result.slice(1)}
                      </span>
                    ) : (
                      <span className="result-badge" style={{ backgroundColor: '#9ca3af' }}>N/A</span>
                    )}
                  </td>
                  <td className="action-cell">
                    <button onClick={() => onView(record)} className="btn-view">👁️</button>
                    <button onClick={() => onEdit(record)} className="btn-edit">✏️</button>
                    <button onClick={() => onUpdateResult(record)} className="btn-result">📋</button>
                    <button onClick={() => onDelete(record.id)} className="btn-delete">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .qc-list {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .list-header h2 { margin: 0; font-size: 1.25rem; color: #1f2937; }
        .filter-group { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .search-input, .filter-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: #f9fafb;
        }
        .search-input:focus, .filter-select:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .table-wrapper { overflow-x: auto; }
        .qc-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .qc-table th {
          text-align: left;
          padding: 0.75rem 0.5rem;
          background: #f3f4f6;
          color: #4b5563;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        .qc-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        .qc-number { font-weight: 500; color: #1f2937; }
        .sku { color: #6b7280; font-size: 0.8rem; }
        .status-badge, .result-badge {
          display: inline-block;
          padding: 0.2rem 0.8rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #fff;
        }
        .action-cell { display: flex; gap: 0.4rem; }
        .action-cell button {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .btn-view:hover { background: #dbeafe; }
        .btn-edit:hover { background: #dbeafe; }
        .btn-result:hover { background: #d1fae5; }
        .btn-delete:hover { background: #fee2e2; }
        .empty-state { text-align: center; color: #9ca3af; padding: 2rem 0; }
        .loading { text-align: center; padding: 2rem; color: #6b7280; }
        @media (max-width: 768px) {
          .list-header { flex-direction: column; align-items: stretch; }
          .filter-group { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default QCList;