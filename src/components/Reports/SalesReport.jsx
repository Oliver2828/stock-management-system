// src/components/SalesReport.jsx
import React, { useState } from 'react';
import { useStock } from '../../contexts/StockContext';
import { format, subDays } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesReport() {
  const { sales } = useStock();
  const [timeRange, setTimeRange] = useState('week');

  const processData = () => {
    const now = new Date();
    let labels = [];
    let data = [];

    if (timeRange === 'week') {
      labels = Array.from({ length: 7 }, (_, i) =>
        format(subDays(now, 6 - i), 'EEE')
      );
      data = labels.map(day =>
        sales
          .filter(sale => format(new Date(sale.timestamp), 'EEE') === day)
          .reduce((sum, sale) => sum + sale.total, 0)
      );
    } else {
      // month view—last 12 months by name
      labels = Array.from({ length: 12 }, (_, i) =>
        format(new Date(now.getFullYear(), i, 1), 'MMM')
      );
      data = labels.map((month, i) =>
        sales
          .filter(sale => format(new Date(sale.timestamp), 'MMM') === month)
          .reduce((sum, sale) => sum + sale.total, 0)
      );
    }

    return { labels, data };
  };

  const { labels, data } = processData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales Amount ($)',
        data,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Sales by ${timeRange === 'week' ? 'Day' : 'Month'}`,
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Sales Report</h2>
        <select
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="border rounded-md px-3 py-1"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">This Year by Month</option>
        </select>
      </div>

      <div className="h-96">
        <Bar options={options} data={chartData} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.slice(0, 10).map(sale => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(sale.timestamp), 'MMM d, yyyy h:mm a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.itemName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${sale.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
