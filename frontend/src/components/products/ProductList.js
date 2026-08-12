import React, { useState } from 'react';

const ProductList = ({ products, onEdit, onDelete, onManageStock, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Ambil daftar kategori unik dari produk
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchSearch && matchCategory;
  });

  if (isLoading) return <div className="loading">Memuat produk...</div>;

  return (
    <div className="product-list-container">
      <div className="list-header">
        <h2>Daftar Produk</h2>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Cari nama atau SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Semua Kategori' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">Tidak ada produk ditemukan.</td>
              </tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="sku-cell">{product.sku}</td>
                  <td className="name-cell">{product.name}</td>
                  <td>{product.category || '-'}</td>
                  <td className="price-cell">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </td>
                  <td className="stock-cell">
                    <span className={`stock-badge ${product.stock <= product.threshold ? 'low' : 'ok'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.stock === 0 ? 'out' : product.stock <= product.threshold ? 'low' : 'active'}`}>
                      {product.stock === 0 ? 'Habis' : product.stock <= product.threshold ? 'Menipis' : 'Tersedia'}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button onClick={() => onEdit(product)} className="btn-edit">✏️</button>
                    <button onClick={() => onManageStock(product)} className="btn-stock">📦</button>
                    <button onClick={() => onDelete(product.id)} className="btn-delete">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .product-list-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .list-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: #1f2937;
        }
        .filter-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .search-input, .category-filter {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: #f9fafb;
        }
        .search-input:focus, .category-filter:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .table-wrapper {
          overflow-x: auto;
        }
        .product-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .product-table th {
          text-align: left;
          padding: 0.75rem 0.5rem;
          background: #f3f4f6;
          color: #4b5563;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        .product-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        .sku-cell {
          font-weight: 500;
          color: #4b5563;
        }
        .name-cell {
          font-weight: 500;
          color: #1f2937;
        }
        .price-cell {
          font-weight: 600;
          color: #111827;
        }
        .stock-badge {
          display: inline-block;
          padding: 0.1rem 0.6rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .stock-badge.ok { background: #d1fae5; color: #065f46; }
        .stock-badge.low { background: #fef3c7; color: #92400e; }
        .status-badge {
          display: inline-block;
          padding: 0.15rem 0.6rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .status-badge.active { background: #dbeafe; color: #1e40af; }
        .status-badge.low { background: #fef3c7; color: #92400e; }
        .status-badge.out { background: #fee2e2; color: #991b1b; }
        .action-cell {
          display: flex;
          gap: 0.4rem;
        }
        .action-cell button {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .btn-edit:hover { background: #dbeafe; }
        .btn-stock:hover { background: #fef3c7; }
        .btn-delete:hover { background: #fee2e2; }
        .empty-state {
          text-align: center;
          color: #9ca3af;
          padding: 2rem 0;
        }
        .loading {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
        }
        @media (max-width: 768px) {
          .list-header {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;