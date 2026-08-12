import React from 'react';

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
  formatDate,
}) => {
  const { id, title, message, type, read, createdAt, link } = notification;

  const getIcon = () => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '📢';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'info':
        return '#3b82f6';
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={`notification-item ${!read ? 'unread' : ''}`}>
      <div className="notification-icon" style={{ backgroundColor: getTypeColor() }}>
        {getIcon()}
      </div>
      <div className="notification-content">
        <div className="notification-header">
          <span className="notification-title">{title}</span>
          <span className="notification-time">{formatDate(createdAt)}</span>
        </div>
        <div className="notification-message">{message}</div>
        {link && (
          <a href={link} className="notification-link">Lihat detail →</a>
        )}
      </div>
      <div className="notification-actions">
        {!read && (
          <button
            onClick={() => onMarkAsRead(id)}
            className="btn-read"
            title="Tandai sudah dibaca"
          >
            ✓
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="btn-delete"
          title="Hapus notifikasi"
        >
          ✕
        </button>
      </div>

      <style>{`
        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.2s;
          position: relative;
        }
        .notification-item.unread {
          background: #f0f9ff;
        }
        .notification-item.unread::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #3b82f6;
          border-radius: 2px;
        }
        .notification-item:hover {
          background: #f9fafb;
        }
        .notification-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
          color: #fff;
        }
        .notification-content {
          flex: 1;
          min-width: 0;
        }
        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.25rem 0.5rem;
        }
        .notification-title {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.95rem;
        }
        .notification-time {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .notification-message {
          font-size: 0.9rem;
          color: #4b5563;
          margin-top: 0.15rem;
          word-break: break-word;
        }
        .notification-link {
          display: inline-block;
          margin-top: 0.3rem;
          font-size: 0.85rem;
          color: #3b82f6;
          text-decoration: none;
        }
        .notification-link:hover {
          text-decoration: underline;
        }
        .notification-actions {
          display: flex;
          gap: 0.3rem;
          flex-shrink: 0;
        }
        .notification-actions button {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          transition: background 0.2s;
          color: #6b7280;
        }
        .btn-read:hover {
          background: #d1fae5;
          color: #065f46;
        }
        .btn-delete:hover {
          background: #fee2e2;
          color: #991b1b;
        }
        @media (max-width: 480px) {
          .notification-item {
            flex-wrap: wrap;
          }
          .notification-actions {
            margin-left: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationItem;