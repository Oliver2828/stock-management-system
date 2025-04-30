import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StockProvider } from './contexts/StockContext'
import { AuthProvider } from './contexts/AuthContext'
import { useState } from 'react'

// Main Components
import Dashboard from './components/dashboard/Dashboard'
import Inventory from './components/inventory/Inventory'
import POS from './components/pos/POS'
import Reports from './components/reports/Reports'

// Auth Components
import Login from './components/Auth/Login'

// Shared Components
import ProtectedRoute from './components/Shared/ProtectedRoute'
import Navbar from './components/shared/Navbar'
import Sidebar from './components/shared/Sidebar'
// import Notification from './components/shared/Notification'

function App() {
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <Router>
      <AuthProvider>
        <StockProvider showNotification={showNotification}>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar />
              
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {notification && (
                  <Notification 
                    message={notification.message} 
                    type={notification.type} 
                  />
                )}
                
                <Routes>
                  <Route path="/login" element={<Login showNotification={showNotification} />} />
                  
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Dashboard showNotification={showNotification} />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/inventory" element={
                    <ProtectedRoute>
                      <Inventory showNotification={showNotification} />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/pos" element={
                    <ProtectedRoute>
                      <POS showNotification={showNotification} />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/reports" element={
                    <ProtectedRoute>
                      <Reports showNotification={showNotification} />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
            </div>
          </div>
        </StockProvider>
      </AuthProvider>
    </Router>
  )
}

export default App