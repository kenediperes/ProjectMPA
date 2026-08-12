import React, { useState, useEffect } from 'react';
import ReportFilters from './ReportFilters';
import ReportCharts from './ReportCharts';

const SalesReport = ({ fetchData, isLoading: parentLoading }) => {
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
      console.error('Error fetching sales report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const isLoading = loading || parentLoading;

  // Dummy data jika belum ada
  const reportData = data || {
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    salesByProduct: [],
    salesByCategory: [],
    salesTrend: [],
    recentOrders: [],
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

  return (
    <div className="sales-report">
      <h2>Laporan Penjualan</h2>
      <ReportFilters onFilter={handleFilter} isLoading={isLoading} />

      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-label">Total Penjualan</span>
          <span className="summary-value">{formatCurrency(reportData.totalSales)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Jumlah Pesanan</span>
          <span className="summary-value">{reportData.totalOrders}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Rata-rata per Pesanan</span>
          <span className="summary-value">{formatCurrency(reportData.averageOrderValue)}</span>
        </div>
      </div>

      <div className="charts-grid">
        <ReportCharts
          data={reportData.salesByProduct}
          type="bar"
          title="Penjualan per Produk"
        />
        <ReportCharts
          data={reportData.salesByCategory}
          type="pie"
          title="Penjualan per Kategori"
        />
        <ReportCharts
          data={reportData.salesTrend}
          type="line"
          title="Tren Penjualan"
        />
      </div>

      <div className="recent-orders">
        <h4>Pesanan Terbaru</h4>
        {reportData.recentOrders.length === 0 ? (
          <p>Tidak ada pesanan terbaru.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>No. Pesanan</th>
                <th>Pelanggan</th>
                <th>Tanggal</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {reportData.recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.customer}</td>
                  <td>{new Date(order.date).toLocaleDateString('id-ID')}</td>
                  <td>{formatCurrency(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .sales-report {
          padding: 1rem 0;
        }
        .sales-report h2 {
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
        .recent-orders {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-top: 1.5rem;
        }
        .recent-orders h4 {
          margin: 0 0 1rem 0;
          color: #1f2937;
        }
        .order-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .order-table th {
          text-align: left;
          padding: 0.5rem;
          background: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
        }
        .order-table td {
          padding: 0.5rem;
          border-bottom: 1px solid #f3f4f6;
        }
        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SalesReport;