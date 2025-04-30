import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const StockContext = createContext()

export function StockProvider({ children }) {
  const [stockItems, setStockItems] = useLocalStorage('supermarket-stock', [])
  const [categories, setCategories] = useLocalStorage('supermarket-categories', [
    'Dairy', 'Bakery', 'Meat', 'Produce', 'Frozen', 'Canned Goods', 'Dry Goods', 'Beverages'
  ])
  const [suppliers, setSuppliers] = useLocalStorage('supermarket-suppliers', [])
  const [sales, setSales] = useLocalStorage('supermarket-sales', [])
  const [lowStockThreshold, setLowStockThreshold] = useLocalStorage('low-stock-threshold', 5)

  // Add new stock item
  const addStockItem = (item) => {
    const newItem = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...item,
      price: parseFloat(item.price),
      cost: parseFloat(item.cost),
      quantity: parseInt(item.quantity),
      minStockLevel: parseInt(item.minStockLevel) || 0
    }
    setStockItems([...stockItems, newItem])
    return newItem
  }

  // Update existing stock item
  const updateStockItem = (id, updates) => {
    setStockItems(stockItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  // Process a sale
  const processSale = (items) => {
    const newSales = items.map(item => ({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      itemId: item.id,
      itemName: item.name,
      quantity: item.soldQuantity,
      price: item.price,
      total: item.price * item.soldQuantity
    }))
    
    // Update stock quantities
    const updatedStock = stockItems.map(stockItem => {
      const soldItem = items.find(i => i.id === stockItem.id)
      if (soldItem) {
        return {
          ...stockItem,
          quantity: stockItem.quantity - soldItem.soldQuantity
        }
      }
      return stockItem
    })
    
    setStockItems(updatedStock)
    setSales([...sales, ...newSales])
    return newSales
  }

  // Get low stock items
  const getLowStockItems = () => {
    return stockItems.filter(item => 
      item.quantity <= (item.minStockLevel || lowStockThreshold)
    )
  }

  // Get expiring soon items
  const getExpiringSoonItems = (days = 7) => {
    const today = new Date()
    const thresholdDate = new Date(today)
    thresholdDate.setDate(today.getDate() + days)
    
    return stockItems.filter(item => {
      if (!item.expiryDate) return false
      const expiryDate = new Date(item.expiryDate)
      return expiryDate <= thresholdDate && expiryDate >= today
    })
  }

  const value = {
    stockItems,
    categories,
    suppliers,
    sales,
    lowStockThreshold,
    addStockItem,
    updateStockItem,
    processSale,
    getLowStockItems,
    getExpiringSoonItems,
    addCategory: (name) => setCategories([...categories, name]),
    addSupplier: (supplier) => setSuppliers([...suppliers, supplier]),
    setLowStockThreshold
  }

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  )
}

export const useStock = () => useContext(StockContext)