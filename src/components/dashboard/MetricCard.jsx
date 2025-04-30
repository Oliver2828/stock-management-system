import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

export default function MetricCard({ title, value, trend, change }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`ml-2 flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <FiTrendingUp className="h-4 w-4" />
          ) : (
            <FiTrendingDown className="h-4 w-4" />
          )}
          <span className="sr-only">{trend === 'up' ? 'Increased' : 'Decreased'} by</span>
          {change}
        </span>
      </div>
    </div>
  )
}