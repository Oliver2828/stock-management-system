import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FiHome, FiPackage, FiShoppingCart, FiBarChart2, 
  FiSettings, FiLogOut 
} from 'react-icons/fi'

export default function Sidebar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/inventory', icon: FiPackage, label: 'Inventory' },
    { path: '/pos', icon: FiShoppingCart, label: 'POS' },
    { path: '/reports', icon: FiBarChart2, label: 'Reports' },
  ]

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-primary-600">SuperStock</span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === item.path
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    pathname === item.path
                      ? 'text-primary-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div>
              <div className="text-base font-medium text-gray-800">
                {user?.name}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {user?.role}
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none"
          >
            <FiLogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}