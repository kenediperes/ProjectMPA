import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import PurchaseOrderList from '../components/purchases/PurchaseOrderList';
import PurchaseOrderForm from '../components/purchases/PurchaseOrderForm';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, error, request } = useApi();

  const fetchOrders = async () => {
    const res = await request({
      url: '/purchases/orders',
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
    <div>
      <h1>Purchase Orders</h1>
      <SearchBar value={search} onChange={setSearch} />
      <PurchaseOrderForm onSuccess={fetchOrders} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <PurchaseOrderList orders={orders} onRefresh={fetchOrders} />
      <Pagination current={page} total={totalPages} onChange={setPage} />
    </div>
  );
};

export default PurchaseOrders;