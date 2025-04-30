// src/components/Reports.jsx
import React, { useState } from 'react';
import SalesReport from './SalesReport';
import InventoryReport from './InventoryReport';
import ProfitReport from './ProfitReport';

const reportTabs = [
  { id: 'sales', name: 'Sales Report' },
  { id: 'inventory', name: 'Inventory Report' },
  { id: 'profit', name: 'Profit Analysis' },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {reportTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'sales' && <SalesReport />}
        {activeTab === 'inventory' && <InventoryReport />}
        {activeTab === 'profit' && <ProfitReport />}
      </div>
    </div>
  );
}
