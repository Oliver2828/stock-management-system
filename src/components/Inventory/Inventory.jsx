import React from 'react';
import { useState } from 'react'
import InventoryTable from './InventoryTable'
import AddItemModal from './AddItemModal'
import { useStock } from '../../contexts/StockContext'
import Button from '../Shared/Button'

export default function Inventory() {
  const { stockItems } = useStock()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search items..."
            className="flex-1 border rounded-md px-3 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
          >
            Add Item
          </Button>
        </div>
      </div>

      <InventoryTable items={filteredItems} />

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}