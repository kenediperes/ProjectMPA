import React, { useState } from 'react';

const InvoiceList = ({ invoices, onEdit, onDelete, onView, onPay, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statuses = ['all', 'unpaid', 'paid', 'overdue', 'cancelled'];

  const filteredInvoices = invoices.filter(invoice => {
    const matchSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        invoice.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  const statusColor = (status) => {
    const map = {
      unpaid: '#ef4444',
      paid: '#10b981',
      overdue: '#f59e0b',
      cancelled: '#9ca3af',
    };
    return map[status] || '#6b7280';
  };

  if (isLoading) return <div className="loading">Memuat invoice...</div>;

  return (
    <div className="invoice-list">
      <div className="list-header">
        <h2>Invoices</h2>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Cari nomor atau pelanggan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            {statuses.map(s => (
              <option key={s} value={s}>
                {s === 'all' ? 'Semua Status' : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>No. Invoice</th>
              <th>Pelanggan</th>
              <th>Tanggal</th>
              <th>Jatuh Tempo</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr><td colSpan="7" className="empty-state">Tidak ada invoice ditemukan.</td></tr>
            ) : (
              filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td className="invoice-number">{invoice.invoiceNumber}</td>
                  <td>{invoice.customer?.name || '-'}</td>
                  <td>{new Date(invoice.invoiceDate).toLocaleDateString('id-ID')}</td>
                  <td>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="total-cell">{formatCurrency(invoice.total)}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColor(invoice.status) }}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button onClick={() => onView(invoice)} className="btn-view">👁️</button>
                    <button onClick={() => onEdit(invoice)} className="btn-edit">✏️</button>
                    {invoice.status === 'unpaid' && (
                      <button onClick={() => onPay(invoice)} className="btn-pay">💰</button>
                    )}
                    <button onClick={() => onDelete(invoice.id)} className="btn-delete">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .invoice-list {
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
        .search-input, .status-filter {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: #f9fafb;
        }
        .search-input:focus, .status-filter:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .table-wrapper { overflow-x: auto; }
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .invoice-table th {
          text-align: left;
          padding: 0.75rem 0.5rem;
          background: #f3f4f6;
          color: #4b5563;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        .invoice-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        .invoice-number { font-weight: 500; color: #1f2937; }
        .total-cell { font-weight: 600; color: #111827; }
        .status-badge {
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
        .btn-pay:hover { background: #d1fae5; }
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

export default InvoiceList;