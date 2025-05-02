// src/components/Shared/OwnerRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function OwnerRoute() {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading…</div>;

  // only role==='owner' gets access
  if (role !== 'owner') return <Navigate to="/" replace />;

  return <Outlet />;
}
