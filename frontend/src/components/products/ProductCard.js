import React from 'react';

const ProductCard = ({ product, onClick, onEdit, onManageStock }) => {
  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= product.threshold;

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      <div className="card-image">
        {/* Placeholder gambar */}
        <div className="image-placeholder">📦</div>
        <span className={`stock-indicator ${isOut ? 'out' : isLow ? 'low' : 'ok'}`}>
          {isOut ? 'Habis' : isLow ? 'Menipis' : 'Tersedia'}
        </span>
      </div>

      <div className="card-body">
        <h4 className="product-name">{product.name}</h4>
        <span className="product-sku">{product.sku}</span>
        <div className="product-meta">
          <span className="product-category">{product.category || 'Umum'}</span>
          <span className="product-price">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(product.price)}
          </span>
        </div>
        <div className="stock-info">
          <span>Stok: <strong className={isOut ? 'out' : isLow ? 'low' : ''}>{product.stock}</strong></span>
          <span className="threshold">(min: {product.threshold})</span>
        </div>
      </div>

      <div className="card-actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit && onEdit(product); }} className="btn-edit">
          ✏️ Edit
        </button>
        <button onClick={(e) => { e.stopPropagation(); onManageStock && onManageStock(product); }} className="btn-stock">
          📦 Stok
        </button>
      </div>

      <style>{`
        .product-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          border: 1px solid #f3f4f6;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        .card-image {
          position: relative;
          background: #f3f4f6;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
        }
        .image-placeholder {
          opacity: 0.6;
        }
        .stock-indicator {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          padding: 0.2rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #fff;
        }
        .stock-indicator.ok { background: #10b981; }
        .stock-indicator.low { background: #f59e0b; }
        .stock-indicator.out { background: #ef4444; }
        .card-body {
          padding: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .product-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-sku {
          font-size: 0.8rem;
          color: #6b7280;
        }
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.25rem;
        }
        .product-category {
          font-size: 0.8rem;
          background: #f3f4f6;
          padding: 0.1rem 0.6rem;
          border-radius: 999px;
          color: #4b5563;
        }
        .product-price {
          font-weight: 700;
          color: #111827;
        }
        .stock-info {
          font-size: 0.85rem;
          color: #4b5563;
          margin-top: 0.25rem;
        }
        .stock-info strong { font-weight: 700; }
        .stock-info strong.out { color: #ef4444; }
        .stock-info strong.low { color: #f59e0b; }
        .threshold {
          color: #9ca3af;
          font-size: 0.75rem;
        }
        .card-actions {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-top: 1px solid #f3f4f6;
          background: #fafafa;
        }
        .card-actions button {
          flex: 1;
          padding: 0.4rem 0;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
          background: #fff;
          border: 1px solid #e5e7eb;
          color: #1f2937;
        }
        .btn-edit:hover {
          background: #dbeafe;
          border-color: #93c5fd;
        }
        .btn-stock:hover {
          background: #fef3c7;
          border-color: #fcd34d;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;