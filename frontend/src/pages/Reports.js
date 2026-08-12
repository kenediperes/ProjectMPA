import React, { useState } from 'react';
import { useApi } from '../hooks';
import SalesReport from '../components/reports/SalesReport';
import InventoryReport from '../components/reports/InventoryReport';
import FinancialReport from '../components/reports/FinancialReport';
import ReportFilters from '../components/reports/ReportFilters';

const Reports = () => {
  const [activeReport, setActiveReport] = useState('sales');
  const [filters, setFilters] = useState({ dateRange: 'month' });
  const { loading, error, data, request } = useApi();

  const fetchReport = (type, params) => {
    request({
      url: `/reports/${type}`,
      params,
    });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchReport(activeReport, newFilters);
  };

  return (
    <div>
      <h1>Reports Dashboard</h1>
      <ReportFilters onFilter={handleFilterChange} />
      <div className="report-tabs">
        <button onClick={() => setActiveReport('sales')}>Sales</button>
        <button onClick={() => setActiveReport('inventory')}>Inventory</button>
        <button onClick={() => setActiveReport('financial')}>Financial</button>
      </div>
      {loading && <div>Loading report...</div>}
      {error && <div className="error">{error}</div>}
      {data && (
        <div>
          {activeReport === 'sales' && <SalesReport data={data} />}
          {activeReport === 'inventory' && <InventoryReport data={data} />}
          {activeReport === 'financial' && <FinancialReport data={data} />}
        </div>
      )}
    </div>
  );
};

export default Reports;