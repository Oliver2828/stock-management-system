// src/components/Shared/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { token, role, logout } = useAuth();
  console.log('Navbar sees role =', role);

  // Build nav items according to role
  const navItems = [
    // Dashboard only for non-workers
    ...(role !== 'worker'
      ? [{ to: '/', label: 'Dashboard', activeClass: 'border-primary-500 text-gray-900' }]
      : []),

    // Inventory always visible
    { to: '/inventory', label: 'Inventory' },

    // POS always visible
    { to: '/pos', label: 'POS' },

    // Reports only for non-workers
    ...(role !== 'worker'
      ? [{ to: '/reports', label: 'Reports' }]
      : []),

    // Create Worker only for owners
    ...(role === 'owner'
      ? [{ to: '/createWorker', label: 'Create Worker' }]
      : []),
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">SuperStock</span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(({ to, label, activeClass }) => (
                <Link
                  key={to}
                  to={to}
                  className={`
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                    ${activeClass || 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                  `}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {token ? (
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
