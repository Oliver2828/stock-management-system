import React from 'react';
import { useStock } from '../../contexts/StockContext'
import { FiAlertTriangle } from 'react-icons/fi'

export default function InventoryAlerts() {
  const { getLowStockItems, getExpiringSoonItems } = useStock()
  const lowStockItems = getLowStockItems()
  const expiringSoonItems = getExpiringSoonItems()

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory Alerts</h2>
      
      {lowStockItems.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Low Stock Items</h3>
          <ul className="space-y-2">
            {lowStockItems.map(item => (
              <li key={item.id} className="flex items-center p-2 bg-yellow-50 rounded-md">
                <FiAlertTriangle className="text-yellow-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Only {item.quantity} left (Min: {item.minStockLevel || 'N/A'})</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {expiringSoonItems.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Expiring Soon</h3>
          <ul className="space-y-2">
            {expiringSoonItems.map(item => (
              <li key={item.id} className="flex items-center p-2 bg-red-50 rounded-md">
                <FiAlertTriangle className="text-red-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Expires on {new Date(item.expiryDate).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lowStockItems.length === 0 && expiringSoonItems.length === 0 && (
        <p className="text-sm text-gray-500">No inventory alerts at this time</p>
      )}
    </div>
  )
}