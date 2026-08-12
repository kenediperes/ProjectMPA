import React, { useState } from 'react';

const SupplierList = ({ suppliers, onEdit, onDelete, onApprove, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [approvalFilter, setApprovalFilter] = useState('all');

  const filtered = suppliers.filter(supplier => {
    const matchSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        supplier.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        supplier.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchApproval = approvalFilter === 'all' || supplier.approvalStatus === approvalFilter;
    return matchSearch && matchApproval;
  });

  const approvalColor = (status) => {
    const map = {
      pending: '#f59e0b',
      approved: '#10b981',
      rejected: '#ef4444',
    };
    return map[status] || '#6b7280';
  };

  if (isLoading) return <div className="loading">Memuat supplier...</div>;

  return (
    <div className="supplier-list">
      <div className="list-header">
        <h2>Daftar Supplier</h2>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Cari nama, kontak, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={approvalFilter}
            onChange={(e) => setApprovalFilter(e.target.value)}
            className="approval-filter"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kontak</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Alamat</th>
              <th>Status Approval</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" className="empty-state">Tidak ada supplier ditemukan.</td></tr>
            ) : (
              filtered.map(supplier => (
                <tr key={supplier.id}>
                  <td className="name-cell">{supplier.name}</td>
                  <td>{supplier.contactPerson || '-'}</td>
                  <td>{supplier.email || '-'}</td>
                  <td>{supplier.phone || '-'}</td>
                  <td className="address-cell">{supplier.address || '-'}</td>
                  <td>
                    <span className="approval-badge" style={{ backgroundColor: approvalColor(supplier.approvalStatus) }}>
                      {supplier.approvalStatus.charAt(0).toUpperCase() + supplier.approvalStatus.slice(1)}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button onClick={() => onEdit(supplier)} className="btn-edit">✏️</button>
                    {supplier.approvalStatus === 'pending' && (
                      <button onClick={() => onApprove(supplier)} className="btn-approve">✅</button>
                    )}
                    <button onClick={() => onDelete(supplier.id)} className="btn-delete">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .supplier-list {
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
        .search-input, .approval-filter {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: #f9fafb;
        }
        .search-input:focus, .approval-filter:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .table-wrapper { overflow-x: auto; }
        .supplier-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .supplier-table th {
          text-align: left;
          padding: 0.75rem 0.5rem;
          background: #f3f4f6;
          color: #4b5563;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        .supplier-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        .name-cell { font-weight: 500; color: #1f2937; }
        .address-cell { max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .approval-badge {
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
        .btn-edit:hover { background: #dbeafe; }
        .btn-approve:hover { background: #d1fae5; }
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

export default SupplierList;