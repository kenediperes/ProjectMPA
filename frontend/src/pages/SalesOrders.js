import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import SalesOrderList from '../components/sales/SalesOrderList';
import SalesOrderForm from '../components/sales/SalesOrderForm';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';

const SalesOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, error, request } = useApi();

  const fetchOrders = async () => {
    const res = await request({
      url: '/sales/orders',
      params: { search, page, limit: 10 },
    });
    if (res.success) {
      setOrders(res.data.items);
      setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search, page]);

  return (
    <div className="sales-orders-page">
      <h1>Sales Orders</h1>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <SalesOrderForm onSuccess={fetchOrders} />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <SalesOrderList orders={orders} onRefresh={fetchOrders} />
      <Pagination current={page} total={totalPages} onChange={setPage} />
    </div>
  );
};

export default SalesOrders;