// src/components/ProfitReport.jsx
import React from 'react';
import { useStock } from '../../contexts/StockContext';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function ProfitReport() {
  const { sales, stockItems } = useStock();

  // Compute profit per sale
  const profitData = sales.map(sale => {
    const item = stockItems.find(i => i.id === sale.itemId);
    const costTotal = (item?.cost || 0) * sale.quantity;
    return {
      date: new Date(sale.timestamp),
      profit: sale.total - costTotal,
    };
  });

  // Group by year-month
  const monthlyProfit = profitData.reduce((acc, { date, profit }) => {
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    acc[key] = (acc[key] || 0) + profit;
    return acc;
  }, {});

  // Sort and format labels/data
  const monthlyEntries = Object.entries(monthlyProfit)
    .sort((a, b) => {
      const [ay, am] = a[0].split('-').map(Number);
      const [by, bm] = b[0].split('-').map(Number);
      return ay === by ? am - bm : ay - by;
    });

  const labels = monthlyEntries.map(([key]) => {
    const [year, month] = key.split('-').map(Number);
    return new Date(year, month - 1).toLocaleString('default', {
      month: 'long', year: 'numeric'
    });
  });
  const data = monthlyEntries.map(([, value]) => value);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Profit',
        data,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Profit Analysis</h2>
      <div className="h-96">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
