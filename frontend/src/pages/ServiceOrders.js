import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import ServiceOrderList from '../components/services/ServiceOrderList';
import ServiceOrderForm from '../components/services/ServiceOrderForm';
import SearchBar from '../components/common/SearchBar';

const ServiceOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const { loading, error, request } = useApi();

  const fetchOrders = async () => {
    const res = await request({
      url: '/services/orders',
      params: { search },
    });
    if (res.success) setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [search]);

  return (
    <div>
      <h1>Service Orders</h1>
      <SearchBar value={search} onChange={setSearch} />
      <ServiceOrderForm onSuccess={fetchOrders} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ServiceOrderList orders={orders} onRefresh={fetchOrders} />
    </div>
  );
};

export default ServiceOrders;