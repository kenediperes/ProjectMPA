import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      label: '+ Pesanan Penjualan',
      path: '/sales-orders/new',
      icon: '🛒',
      color: '#3b82f6',
    },
    {
      label: '+ Pesanan Pembelian',
      path: '/purchase-orders/new',
      icon: '📥',
      color: '#8b5cf6',
    },
    {
      label: '+ Pesanan Layanan',
      path: '/service-orders/new',
      icon: '🔧',
      color: '#f59e0b',
    },
    {
      label: '📊 Laporan Penjualan',
      path: '/reports/sales',
      icon: '📈',
      color: '#10b981',
    },
    {
      label: '📦 Kelola Stok',
      path: '/products',
      icon: '📦',
      color: '#ef4444',
    },
  ];

  return (
    <div className="quick-actions">
      <h3 className="section-title">Aksi Cepat</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <Link key={index} to={action.path} className="action-card">
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .quick-actions {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          margin-top: 1.5rem;
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }
        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 10px;
          text-decoration: none;
          color: #1f2937;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .action-card:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        .action-icon {
          font-size: 1.75rem;
          margin-bottom: 0.4rem;
        }
        .action-label {
          font-size: 0.85rem;
          font-weight: 500;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default QuickActions;