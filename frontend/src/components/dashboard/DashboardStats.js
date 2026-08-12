import React from 'react';

const DashboardStats = ({ stats }) => {
  // Jika stats belum diterima, gunakan data dummy
  const data = stats || {
    totalSales: 152_000_000,
    totalPurchases: 87_500_000,
    totalInventory: 342,
    totalServiceOrders: 28,
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">💰</div>
        <div className="stat-content">
          <span className="stat-label">Total Penjualan</span>
          <span className="stat-value">{formatCurrency(data.totalSales)}</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🛒</div>
        <div className="stat-content">
          <span className="stat-label">Total Pembelian</span>
          <span className="stat-value">{formatCurrency(data.totalPurchases)}</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📦</div>
        <div className="stat-content">
          <span className="stat-label">Jumlah Item Inventaris</span>
          <span className="stat-value">{data.totalInventory}</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🔧</div>
        <div className="stat-content">
          <span className="stat-label">Pesanan Layanan</span>
          <span className="stat-value">{data.totalServiceOrders}</span>
        </div>
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        .stat-icon {
          font-size: 2rem;
          line-height: 1;
        }
        .stat-content {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
        }
      `}</style>
    </div>
  );
};

export default DashboardStats;