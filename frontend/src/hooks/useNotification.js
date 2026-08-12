import { useNotification as useNotificationContext } from '../contexts';

/**
 * Hook that provides notification state and methods.
 * Usage: const { notifications, unreadCount, fetchNotifications, markAsRead } = useNotification();
 */
export const useNotification = () => {
  return useNotificationContext();
};