import React, { useState, useRef, useEffect } from 'react';
import NotificationItem from './NotificationItem';

const NotificationBell = ({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onViewAll,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Tampilkan 5 notifikasi terbaru (belum dibaca pertama, lalu semua diurutkan dari terbaru)
  const sorted = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recent = sorted.slice(0, 5);

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <button className="bell-button" onClick={toggleDropdown}>
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-header">
            <span className="dropdown-title">Notifikasi</span>
            <span className="unread-count">{unreadCount} belum dibaca</span>
          </div>
          <div className="dropdown-list">
            {isLoading ? (
              <div className="loading">Memuat...</div>
            ) : recent.length === 0 ? (
              <div className="empty">Tidak ada notifikasi</div>
            ) : (
              recent.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={(id) => {
                    onMarkAsRead(id);
                    // Optionally keep dropdown open
                  }}
                  onDelete={(id) => {
                    onDelete(id);
                  }}
                  formatDate={formatDate}
                />
              ))
            )}
          </div>
          <div className="dropdown-footer">
            <button onClick={() => { onMarkAllAsRead(); }} disabled={unreadCount === 0 || isLoading}>
              Tandai semua sudah dibaca
            </button>
            <button onClick={() => { onViewAll && onViewAll(); setIsOpen(false); }}>
              Lihat semua notifikasi
            </button>
          </div>
        </div>
      )}

      <style>{`
        .notification-bell {
          position: relative;
          display: inline-block;
        }
        .bell-button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.3rem;
          font-size: 1.5rem;
          position: relative;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .bell-button:hover {
          background: #f3f4f6;
        }
        .bell-icon {
          display: block;
        }
        .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: #fff;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          min-width: 18px;
          text-align: center;
        }
        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 380px;
          max-height: 480px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f3f4f6;
          background: #f9fafb;
        }
        .dropdown-title {
          font-weight: 600;
          color: #1f2937;
        }
        .unread-count {
          font-size: 0.8rem;
          color: #6b7280;
        }
        .dropdown-list {
          overflow-y: auto;
          max-height: 320px;
        }
        .dropdown-list .notification-item {
          padding: 0.5rem 1rem;
        }
        .loading, .empty {
          text-align: center;
          padding: 1.5rem;
          color: #9ca3af;
        }
        .dropdown-footer {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          border-top: 1px solid #f3f4f6;
          background: #f9fafb;
          gap: 0.5rem;
        }
        .dropdown-footer button {
          background: transparent;
          border: none;
          font-size: 0.8rem;
          font-weight: 500;
          color: #3b82f6;
          cursor: pointer;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .dropdown-footer button:hover:not(:disabled) {
          background: #dbeafe;
        }
        .dropdown-footer button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 480px) {
          .dropdown {
            right: -50px;
            width: calc(100vw - 20px);
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationBell;