import React from 'react';
import { Link } from 'react-router-dom';

const StockAlerts = ({ alerts }) => {
  const items = alerts || [
    {
      id: 1,
      name: 'Kursi Kantor Ergonomic',
      sku: 'KR-001',
      stock: 2,
      threshold: 10,
    },
    {
      id: 2,
      name: 'Meja Laptop Portable',
      sku: 'ML-004',
      stock: 0,
      threshold: 5,
    },
    {
      id: 3,
      name: 'Kabel HDMI 2.0 3m',
      sku: 'CB-012',
      stock: 8,
      threshold: 15,
    },
  ];

  return (
    <div className="stock-alerts">
      <h3 className="section-title">Peringatan Stok</h3>
      {items.length === 0 ? (
        <p className="no-alerts">✅ Semua stok dalam kondisi aman.</p>
      ) : (
        <ul className="alert-list">
          {items.map((item) => {
            const isOut = item.stock === 0;
            const isLow = item.stock < item.threshold && item.stock > 0;
            return (
              <li key={item.id} className="alert-item">
                <span
                  className={`alert-indicator ${isOut ? 'out' : 'low'}`}
                ></span>
                <div className="alert-info">
                  <span className="alert-name">{item.name}</span>
                  <span className="alert-sku">{item.sku}</span>
                </div>
                <div className="alert-stock">
                  <span className={`stock-value ${isOut ? 'out' : 'low'}`}>
                    {item.stock}
                  </span>
                  <span className="stock-threshold">
                    / {item.threshold}
                  </span>
                </div>
                <Link to={`/products?sku=${item.sku}`} className="alert-action">
                  Atur Stok
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <style jsx>{`
        .stock-alerts {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          margin-top: 1.5rem;
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .no-alerts {
          color: #10b981;
          font-weight: 500;
        }
        .alert-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .alert-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .alert-item:last-child {
          border-bottom: none;
        }
        .alert-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .alert-indicator.out {
          background: #ef4444;
        }
        .alert-indicator.low {
          background: #f59e0b;
        }
        .alert-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .alert-name {
          font-weight: 500;
          color: #1f2937;
        }
        .alert-sku {
          font-size: 0.8rem;
          color: #6b7280;
        }
        .alert-stock {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }
        .stock-value {
          font-weight: 600;
          font-size: 1rem;
        }
        .stock-value.out {
          color: #ef4444;
        }
        .stock-value.low {
          color: #f59e0b;
        }
        .stock-threshold {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .alert-action {
          background: #3b82f6;
          color: #fff;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
        }
        .alert-action:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default StockAlerts;