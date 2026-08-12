import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import WorkOrderList from '../components/work-orders/WorkOrderList';
import WorkOrderForm from '../components/work-orders/WorkOrderForm';
import SearchBar from '../components/common/SearchBar';

const WorkOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const { loading, error, request } = useApi();

  const fetchOrders = async () => {
    const res = await request({
      url: '/work-orders',
      params: { search },
    });
    if (res.success) setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [search]);

  return (
    <div>
      <h1>Work Orders</h1>
      <SearchBar value={search} onChange={setSearch} />
      <WorkOrderForm onSuccess={fetchOrders} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <WorkOrderList orders={orders} onRefresh={fetchOrders} />
    </div>
  );
};

export default WorkOrders;