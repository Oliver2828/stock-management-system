import React from 'react';
import { useStock } from '../contexts/StockContext'
import { useMemo } from 'react'

export function useStockMetrics() {
  const { stockItems, sales } = useStock()

  const metrics = useMemo(() => {
    const totalInventoryValue = stockItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    )

    const totalCostValue = stockItems.reduce(
      (sum, item) => sum + (item.cost * item.quantity), 0
    )

    const totalProfit = sales.reduce(
      (sum, sale) => {
        const item = stockItems.find(i => i.id === sale.itemId)
        return sum + (sale.total - (item?.cost || 0) * sale.quantity)
      }, 0
    )

    const todaySales = sales.filter(sale => {
      const saleDate = new Date(sale.timestamp).toDateString()
      return saleDate === new Date().toDateString()
    }).reduce((sum, sale) => sum + sale.total, 0)

    return {
      totalInventoryValue,
      totalCostValue,
      totalProfit,
      todaySales,
      stockCount: stockItems.length,
      totalItems: stockItems.reduce((sum, item) => sum + item.quantity, 0)
    }
  }, [stockItems, sales])

  return metrics
}