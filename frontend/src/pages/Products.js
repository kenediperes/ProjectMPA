import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, error, request } = useApi();

  const fetchProducts = async () => {
    const res = await request({
      url: '/products',
      params: { search, page, limit: 10 },
    });
    if (res.success) {
      setProducts(res.data.items);
      setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleCreate = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <ProductForm onSuccess={handleCreate} />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ProductList products={products} onRefresh={fetchProducts} />
      <Pagination current={page} total={totalPages} onChange={setPage} />
    </div>
  );
};

export default Products;