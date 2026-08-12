import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import QCList from '../components/quality-control/QCList';
import QCForm from '../components/quality-control/QCForm';
import SearchBar from '../components/common/SearchBar';

const QualityControl = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const { loading, error, request } = useApi();

  const fetchRecords = async () => {
    const res = await request({
      url: '/quality-control',
      params: { search },
    });
    if (res.success) setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, [search]);

  return (
    <div>
      <h1>Quality Control</h1>
      <SearchBar value={search} onChange={setSearch} />
      <QCForm onSuccess={fetchRecords} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <QCList records={records} onRefresh={fetchRecords} />
    </div>
  );
};

export default QualityControl;