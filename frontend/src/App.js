import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, NotificationProvider, ThemeProvider } from './contexts';
import Layout from './components/common/Layout';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import SalesOrders from './pages/SalesOrders';
import SalesQuotations from './pages/SalesQuotations';
import PurchaseOrders from './pages/PurchaseOrders';
import ServiceOrders from './pages/ServiceOrders';
import WorkOrders from './pages/WorkOrders';
import QualityControl from './pages/QualityControl';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

// Import global styles
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/sales-orders" element={<SalesOrders />} />
                  <Route path="/sales-quotations" element={<SalesQuotations />} />
                  <Route path="/purchase-orders" element={<PurchaseOrders />} />
                  <Route path="/service-orders" element={<ServiceOrders />} />
                  <Route path="/work-orders" element={<WorkOrders />} />
                  <Route path="/quality-control" element={<QualityControl />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;