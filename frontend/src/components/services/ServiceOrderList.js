import React, { useState } from 'react';

const ServiceOrderList = ({ orders, onEdit, onDelete, onView, onAssign, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statuses = ['all', 'pending', 'in-progress', 'completed', 'cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColor = (status) => {
    const map = {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return map[status] || '#6b7280';
  };

  const priorityColor = (priority) => {
    const map = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
    };
    return map[priority] || '#6b7280';
  };

  if (isLoading) return <div className="loading">Memuat pesanan layanan...</div>;

  return (
    <div className="service-order-list">
      <div className="list-header">
        <h2>Service Orders</h2>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Cari nomor, pelanggan, atau judul..."
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
                {s === 'all' ? 'Semua Status' : s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>No. Pesanan</th>
              <th>Judul</th>
              <th>Pelanggan</th>
              <th>Tanggal</th>
              <th>Prioritas</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr><td colSpan="7" className="empty-state">Tidak ada pesanan layanan ditemukan.</td></tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="order-number">{order.orderNumber}</td>
                  <td>{order.title || '-'}</td>
                  <td>{order.customer?.name || '-'}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString('id-ID')}</td>
                  <td>
                    <span className="priority-badge" style={{ backgroundColor: priorityColor(order.priority) }}>
                      {order.priority?.charAt(0).toUpperCase() + order.priority?.slice(1) || 'Normal'}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColor(order.status) }}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1).replace('-', ' ') || 'Pending'}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button onClick={() => onView(order)} className="btn-view">👁️</button>
                    <button onClick={() => onEdit(order)} className="btn-edit">✏️</button>
                    <button onClick={() => onAssign(order)} className="btn-assign">👤</button>
                    <button onClick={() => onDelete(order.id)} className="btn-delete">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .service-order-list {
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
        .order-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .order-table th {
          text-align: left;
          padding: 0.75rem 0.5rem;
          background: #f3f4f6;
          color: #4b5563;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        .order-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        .order-number { font-weight: 500; color: #1f2937; }
        .priority-badge, .status-badge {
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
        .btn-assign:hover { background: #fef3c7; }
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

export default ServiceOrderList;