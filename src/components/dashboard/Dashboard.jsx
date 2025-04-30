import React from 'react';
import { useStockMetrics } from '../../hooks/useStockMetrics'
import MetricCard from './MetricCard'
import InventoryAlerts from './InventoryAlerts'
import SalesChart from './SalesChart'

export default function Dashboard() {
  const metrics = useStockMetrics()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Inventory Value" 
          value={`$${metrics.totalInventoryValue.toFixed(2)}`} 
          trend="up" 
          change="12%"
        />
        <MetricCard 
          title="Today's Sales" 
          value={`$${metrics.todaySales.toFixed(2)}`} 
          trend="up" 
          change="5%"
        />
        <MetricCard 
          title="Total Profit" 
          value={`$${metrics.totalProfit.toFixed(2)}`} 
          trend="up" 
          change="8%"
        />
        <MetricCard 
          title="Total Items" 
          value={metrics.totalItems.toString()} 
          trend="down" 
          change="3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <InventoryAlerts />
        </div>
      </div>
    </div>
  )
}