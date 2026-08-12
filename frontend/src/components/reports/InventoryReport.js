import React, { useState, useEffect } from 'react';
import ReportFilters from './ReportFilters';
import ReportCharts from './ReportCharts';

const InventoryReport = ({ fetchData, isLoading: parentLoading }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (filters.startDate || filters.endDate) {
      loadData();
    }
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchData(filters);
      setData(result);
    } catch (error) {
      console.error('Error fetching inventory report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const isLoading = loading || parentLoading;

  const reportData = data || {
    totalItems: 0,
    totalValue: 0,
    lowStockItems: [],
    stockByCategory: [],
    stockMovements: [],
    topItems: [],
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

  return (
    <div className="inventory-report">
      <h2>Laporan Inventaris</h2>
      <ReportFilters onFilter={handleFilter} isLoading={isLoading} initialValues={{ reportType: 'inventory' }} />

      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-label">Total Item</span>
          <span className="summary-value">{reportData.totalItems}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Nilai Stok</span>
          <span className="summary-value">{formatCurrency(reportData.totalValue)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Item Stok Rendah</span>
          <span className="summary-value">{reportData.lowStockItems.length}</span>
        </div>
      </div>

      <div className="charts-grid">
        <ReportCharts
          data={reportData.stockByCategory}
          type="pie"
          title="Distribusi Stok per Kategori"
        />
        <ReportCharts
          data={reportData.topItems}
          type="bar"
          title="Item dengan Stok Terbanyak"
        />
      </div>

      <div className="low-stock-section">
        <h4>Peringatan Stok Rendah</h4>
        {reportData.lowStockItems.length === 0 ? (
          <p className="no-alert">✅ Semua stok dalam kondisi aman.</p>
        ) : (
          <ul className="low-stock-list">
            {reportData.lowStockItems.map(item => (
              <li key={item.id} className="low-stock-item">
                <span className="item-name">{item.name}</span>
                <span className="item-sku">{item.sku}</span>
                <span className="item-stock" style={{ color: item.stock === 0 ? '#ef4444' : '#f59e0b' }}>
                  Stok: {item.stock} (min: {item.threshold})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .inventory-report {
          padding: 1rem 0;
        }
        .inventory-report h2 {
          color: #1f2937;
          margin-top: 0;
        }
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .summary-card {
          background: #fff;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }
        .summary-label {
          font-size: 0.85rem;
          color: #6b7280;
        }
        .summary-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
        }
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .low-stock-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-top: 1.5rem;
        }
        .low-stock-section h4 {
          margin: 0 0 1rem 0;
          color: #1f2937;
        }
        .no-alert {
          color: #10b981;
          font-weight: 500;
        }
        .low-stock-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .low-stock-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .low-stock-item:last-child {
          border-bottom: none;
        }
        .item-name {
          font-weight: 500;
        }
        .item-sku {
          color: #6b7280;
          font-size: 0.85rem;
        }
        .item-stock {
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
          .low-stock-item {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default InventoryReport;