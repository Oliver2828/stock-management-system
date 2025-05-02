// src/components/Shared/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute() {
  const { token, loading } = useAuth();

  // you can also gate on loading if you want
  if (loading) return <div>Loading…</div>;

  // if not logged in, send to /login
  if (!token) return <Navigate to="/login" replace />;

  // otherwise render the child routes
  return <Outlet />;
}
