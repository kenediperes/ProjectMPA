import React, { useState, useEffect } from 'react';
import ReportFilters from './ReportFilters';
import ReportCharts from './ReportCharts';

const FinancialReport = ({ fetchData, isLoading: parentLoading }) => {
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
      console.error('Error fetching financial report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const isLoading = loading || parentLoading;

  const reportData = data || {
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    revenueByCategory: [],
    expenseByCategory: [],
    monthlyTrend: [],
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

  return (
    <div className="financial-report">
      <h2>Laporan Keuangan</h2>
      <ReportFilters onFilter={handleFilter} isLoading={isLoading} initialValues={{ reportType: 'financial' }} />

      <div className="summary-cards">
        <div className="summary-card revenue">
          <span className="summary-label">Total Pendapatan</span>
          <span className="summary-value">{formatCurrency(reportData.totalRevenue)}</span>
        </div>
        <div className="summary-card expense">
          <span className="summary-label">Total Pengeluaran</span>
          <span className="summary-value">{formatCurrency(reportData.totalExpenses)}</span>
        </div>
        <div className="summary-card profit">
          <span className="summary-label">Laba Bersih</span>
          <span className="summary-value" style={{ color: reportData.netProfit >= 0 ? '#10b981' : '#ef4444' }}>
            {formatCurrency(reportData.netProfit)}
          </span>
        </div>
      </div>

      <div className="charts-grid">
        <ReportCharts
          data={reportData.revenueByCategory}
          type="pie"
          title="Pendapatan per Kategori"
        />
        <ReportCharts
          data={reportData.expenseByCategory}
          type="pie"
          title="Pengeluaran per Kategori"
        />
        <ReportCharts
          data={reportData.monthlyTrend}
          type="line"
          title="Tren Bulanan (Pendapatan - Pengeluaran)"
        />
      </div>

      <style>{`
        .financial-report {
          padding: 1rem 0;
        }
        .financial-report h2 {
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
        .summary-card.revenue .summary-value { color: #3b82f6; }
        .summary-card.expense .summary-value { color: #ef4444; }
        .summary-card.profit .summary-value { font-weight: 700; }
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
        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FinancialReport;