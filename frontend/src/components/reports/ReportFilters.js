import React, { useState } from 'react';

const ReportFilters = ({ onFilter, initialValues, isLoading }) => {
  const [filters, setFilters] = useState({
    startDate: initialValues?.startDate || '',
    endDate: initialValues?.endDate || '',
    reportType: initialValues?.reportType || 'sales',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const reset = { startDate: '', endDate: '', reportType: 'sales' };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <div className="report-filters">
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-group">
          <div className="filter-item">
            <label>Tanggal Mulai</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="filter-item">
            <label>Tanggal Akhir</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="filter-item">
            <label>Jenis Laporan</label>
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleChange}
            >
              <option value="sales">Penjualan</option>
              <option value="inventory">Inventaris</option>
              <option value="financial">Keuangan</option>
            </select>
          </div>
        </div>
        <div className="filter-actions">
          <button type="submit" disabled={isLoading} className="btn-apply">
            {isLoading ? 'Memuat...' : 'Terapkan Filter'}
          </button>
          <button type="button" onClick={handleReset} className="btn-reset">
            Reset
          </button>
        </div>
      </form>

      <style>{`
        .report-filters {
          background: #fff;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-bottom: 1.5rem;
        }
        .filter-form {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 1rem;
        }
        .filter-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          flex: 1;
        }
        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .filter-item label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #4b5563;
        }
        .filter-item input, .filter-item select {
          padding: 0.4rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: #f9fafb;
        }
        .filter-item input:focus, .filter-item select:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .filter-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .btn-apply, .btn-reset {
          padding: 0.4rem 1.2rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-apply {
          background: #3b82f6;
          color: #fff;
        }
        .btn-apply:hover:not(:disabled) {
          background: #2563eb;
        }
        .btn-apply:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .btn-reset {
          background: #f3f4f6;
          color: #4b5563;
        }
        .btn-reset:hover {
          background: #e5e7eb;
        }
        @media (max-width: 768px) {
          .filter-form {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-group {
            flex-direction: column;
          }
          .filter-actions {
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportFilters;