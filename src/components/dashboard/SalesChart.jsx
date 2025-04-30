import React from 'react';
import { useStock } from '../../contexts/StockContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { format, subDays } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function SalesChart() {
  const { sales } = useStock()
  
  // Generate last 7 days data
  const labels = Array.from({ length: 7 }, (_, i) => 
    format(subDays(new Date(), 6 - i), 'EEE')
  )
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Sales',
        data: labels.map(day => {
          const date = new Date(day)
          return sales
            .filter(sale => format(new Date(sale.timestamp), 'EEE') === day)
            .reduce((sum, sale) => sum + sale.total, 0)
        }),
        backgroundColor: '#3B82F6',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Sales Performance',
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar options={options} data={data} />
    </div>
  )
}