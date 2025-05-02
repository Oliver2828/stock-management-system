// src/App.jsx
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StockProvider }          from './contexts/StockContext';

import Navbar        from './components/Shared/Navbar';
import Sidebar       from './components/Shared/Sidebar';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import OwnerRoute     from './components/Shared/OwnerRoute';

import Dashboard     from './components/dashboard/Dashboard';
import Inventory     from './components/inventory/Inventory';
import POS           from './components/pos/POS';
import Reports       from './components/reports/Reports';
import CreateWorker  from './components/Admin/CreateWorker';
import Login         from './components/Auth/Login';
import Notification  from './components/Shared/Notification';

function App() {
  const [notification, setNotification] = useState(null);

  // pass this into every page component via closure
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // define layout *inside* App so it has showNotification in scope
  function AppLayout() {
    const { role } = useAuth();

    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              {/* "/" index route */}
              <Route
                index
                element={
                  role === 'worker'
                    ? <Navigate to="/inventory" replace />
                    : <Dashboard showNotification={showNotification} />
                }
              />

              {/* Always available */}
              <Route
                path="inventory"
                element={<Inventory showNotification={showNotification} />}
              />
              <Route
                path="pos"
                element={<POS showNotification={showNotification} />}
              />

              {/* Reports only for non-workers */}
              <Route
                path="reports"
                element={
                  role === 'worker'
                    ? <Navigate to="/" replace />
                    : <Reports showNotification={showNotification} />
                }
              />

              {/* Owner-only */}
              <Route element={<OwnerRoute />}>
                <Route
                  path="createWorker"
                  element={<CreateWorker showNotification={showNotification} />}
                />
              </Route>

              {/* Catch-all within protected area */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <StockProvider showNotification={showNotification}>
          {/* global notification banner */}
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}

          <Routes>
            {/* public login */}
            <Route
              path="/login"
              element={<Login showNotification={showNotification} />}
            />

            {/* everything else requires auth */}
            <Route element={<ProtectedRoute />}>
              <Route path="/*" element={<AppLayout />} />
            </Route>
          </Routes>
        </StockProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
