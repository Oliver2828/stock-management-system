// src/components/InventoryReport.jsx
import React from 'react';
import { useStock } from '../../contexts/StockContext';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InventoryReport() {
  const { stockItems } = useStock();

  const categoryData = stockItems.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + item.quantity;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Items by Category',
        data: Object.values(categoryData),
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B',
          '#EF4444', '#8B5CF6', '#EC4899',
          '#14B8A6', '#F97316',
        ],
      },
    ],
  };

  const topSelling = [...stockItems]
    .sort((a, b) => (b.quantitySold || 0) - (a.quantitySold || 0))
    .slice(0, 5);

  const totalQty = stockItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalValue = stockItems.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
  const totalCost = stockItems.reduce((sum, i) => sum + (i.cost || 0) * i.quantity, 0);
  const potentialProfit = totalValue - totalCost;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Inventory Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Inventory by Category</h3>
          <div className="h-80">
            <Pie data={chartData} />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Inventory Value Summary</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Total Items:</span>
              <span>{totalQty}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Total Inventory Value:</span>
              <span>${totalValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Total Cost Value:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Potential Profit:</span>
              <span>${potentialProfit.toFixed(2)}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-4">Top Selling Items</h3>
          <div className="space-y-2">
            {topSelling.map(item => (
              <div key={item.id} className="flex justify-between bg-white p-3 rounded shadow-sm">
                <span>{item.name}</span>
                <span className="font-medium">{item.quantitySold || 0} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
