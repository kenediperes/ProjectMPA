import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import SalesQuotationList from '../components/sales/SalesQuotationList';
import SalesQuotationForm from '../components/sales/SalesQuotationForm';
import SearchBar from '../components/common/SearchBar';

const SalesQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [search, setSearch] = useState('');
  const { loading, error, request } = useApi();

  const fetchQuotations = async () => {
    const res = await request({
      url: '/sales/quotations',
      params: { search },
    });
    if (res.success) setQuotations(res.data);
  };

  useEffect(() => {
    fetchQuotations();
  }, [search]);

  return (
    <div>
      <h1>Sales Quotations</h1>
      <SearchBar value={search} onChange={setSearch} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <SalesQuotationList quotations={quotations} onRefresh={fetchQuotations} />
    </div>
  );
};

export default SalesQuotations;