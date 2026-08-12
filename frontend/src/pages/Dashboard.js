import React, { useEffect, useState } from 'react';
import { useAuth, useApi, useNotification } from '../hooks';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivities from '../components/dashboard/RecentActivities';
import StockAlerts from '../components/dashboard/StockAlerts';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const { user } = useAuth();
  const { fetchNotifications } = useNotification();
  const { loading, error, data, request } = useApi();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Load dashboard stats
    request({ url: '/dashboard/stats', method: 'GET' }).then(res => {
      if (res.success) setStats(res.data);
    });
    fetchNotifications();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <DashboardStats stats={stats} />
      <div className="dashboard-grid">
        <RecentActivities />
        <StockAlerts />
      </div>
      <QuickActions />
    </div>
  );
};

export default Dashboard;