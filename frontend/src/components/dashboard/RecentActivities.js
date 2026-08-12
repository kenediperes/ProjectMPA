import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const RecentActivities = ({ activities }) => {
  const items = activities || [
    {
      id: 1,
      type: 'sales',
      description: 'Pesanan penjualan #SO-001 dibuat',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 menit lalu
    },
    {
      id: 2,
      type: 'payment',
      description: 'Pembayaran invoice #INV-003 diterima',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 jam lalu
    },
    {
      id: 3,
      type: 'inventory',
      description: 'Stok produk "Kursi Kantor" diperbarui',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 jam lalu
    },
    {
      id: 4,
      type: 'service',
      description: 'Pesanan layanan #SRV-007 selesai',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 hari lalu
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'sales':
        return '🛍️';
      case 'payment':
        return '💳';
      case 'inventory':
        return '📦';
      case 'service':
        return '🔧';
      default:
        return '📌';
    }
  };

  return (
    <div className="recent-activities">
      <h3 className="section-title">Aktivitas Terbaru</h3>
      <ul className="activity-list">
        {items.map((item) => (
          <li key={item.id} className="activity-item">
            <span className="activity-icon">{getIcon(item.type)}</span>
            <div className="activity-detail">
              <span className="activity-description">{item.description}</span>
              <span className="activity-time">
                {formatDistanceToNow(item.timestamp, {
                  addSuffix: true,
                  locale: id,
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .recent-activities {
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
        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .activity-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .activity-item:last-child {
          border-bottom: none;
        }
        .activity-icon {
          font-size: 1.25rem;
        }
        .activity-detail {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .activity-description {
          font-size: 0.95rem;
          color: #1f2937;
        }
        .activity-time {
          font-size: 0.8rem;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default RecentActivities;