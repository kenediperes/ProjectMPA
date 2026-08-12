import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import SupplierList from '../components/purchases/SupplierList';
import SupplierForm from '../components/purchases/SupplierForm';
import SearchBar from '../components/common/SearchBar';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const { loading, error, request } = useApi();

  const fetchSuppliers = async () => {
    const res = await request({
      url: '/suppliers',
      params: { search },
    });
    if (res.success) setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, [search]);

  return (
    <div>
      <h1>Suppliers</h1>
      <SearchBar value={search} onChange={setSearch} />
      <SupplierForm onSuccess={fetchSuppliers} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <SupplierList suppliers={suppliers} onRefresh={fetchSuppliers} />
    </div>
  );
};

export default Suppliers;