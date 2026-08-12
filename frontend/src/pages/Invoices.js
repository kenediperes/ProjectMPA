import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import InvoiceList from '../components/invoices/InvoiceList';
import InvoiceForm from '../components/invoices/InvoiceForm';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, error, request } = useApi();

  const fetchInvoices = async () => {
    const res = await request({
      url: '/invoices',
      params: { search, page, limit: 10 },
    });
    if (res.success) {
      setInvoices(res.data.items);
      setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [search, page]);

  return (
    <div>
      <h1>Invoices</h1>
      <SearchBar value={search} onChange={setSearch} />
      <InvoiceForm onSuccess={fetchInvoices} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <InvoiceList invoices={invoices} onRefresh={fetchInvoices} />
      <Pagination current={page} total={totalPages} onChange={setPage} />
    </div>
  );
};

export default Invoices;