import React, { useState } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onDeleteAll,
  isLoading,
}) => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="notification-list-container">
      <div className="list-header">
        <h2>Notifikasi</h2>
        <div className="header-actions">
          <span className="unread-badge">{unreadCount} belum dibaca</span>
          <button
            onClick={() => onMarkAllAsRead()}
            disabled={unreadCount === 0 || isLoading}
            className="btn-mark-all"
          >
            Tandai semua sudah dibaca
          </button>
          <button
            onClick={() => onDeleteAll()}
            disabled={notifications.length === 0 || isLoading}
            className="btn-delete-all"
          >
            Hapus semua
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Semua ({notifications.length})
        </button>
        <button
          className={filter === 'unread' ? 'active' : ''}
          onClick={() => setFilter('unread')}
        >
          Belum Dibaca ({unreadCount})
        </button>
        <button
          className={filter === 'read' ? 'active' : ''}
          onClick={() => setFilter('read')}
        >
          Sudah Dibaca ({notifications.length - unreadCount})
        </button>
      </div>

      <div className="notification-items">
        {isLoading ? (
          <div className="loading">Memuat notifikasi...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">Tidak ada notifikasi.</div>
        ) : (
          filtered.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
              formatDate={formatDate}
            />
          ))
        )}
      </div>

      <style>{`
        .notification-list-container {
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
          margin-bottom: 1rem;
        }
        .list-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: #1f2937;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .unread-badge {
          background: #dbeafe;
          color: #1e40af;
          padding: 0.2rem 0.8rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .btn-mark-all, .btn-delete-all {
          padding: 0.3rem 1rem;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-mark-all {
          background: #dbeafe;
          color: #1e40af;
        }
        .btn-mark-all:hover:not(:disabled) {
          background: #bfdbfe;
        }
        .btn-delete-all {
          background: #fee2e2;
          color: #991b1b;
        }
        .btn-delete-all:hover:not(:disabled) {
          background: #fecaca;
        }
        .btn-mark-all:disabled, .btn-delete-all:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .filter-bar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .filter-bar button {
          background: transparent;
          border: none;
          padding: 0.3rem 1rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-bar button:hover {
          background: #f3f4f6;
        }
        .filter-bar button.active {
          background: #3b82f6;
          color: #fff;
        }
        .notification-items {
          max-height: 600px;
          overflow-y: auto;
        }
        .loading, .empty-state {
          text-align: center;
          padding: 2rem;
          color: #9ca3af;
        }
        @media (max-width: 640px) {
          .list-header {
            flex-direction: column;
            align-items: stretch;
          }
          .header-actions {
            justify-content: flex-start;
          }
          .filter-bar {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationList;