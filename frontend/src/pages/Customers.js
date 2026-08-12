import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import CustomerList from '../components/customers/CustomerList';
import CustomerForm from '../components/customers/CustomerForm';
import SearchBar from '../components/common/SearchBar';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const { loading, error, request } = useApi();

  const fetchCustomers = async () => {
    const res = await request({
      url: '/customers',
      params: { search },
    });
    if (res.success) setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  return (
    <div>
      <h1>Customers</h1>
      <SearchBar value={search} onChange={setSearch} />
      <CustomerForm onSuccess={fetchCustomers} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <CustomerList customers={customers} onRefresh={fetchCustomers} />
    </div>
  );
};

export default Customers;