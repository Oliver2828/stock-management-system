// src/components/Inventory/AddItemModal.jsx

import React, { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';
import { useStock } from '../../contexts/StockContext';

export default function AddItemModal({ isOpen, onClose }) {
  const { addStockItem, categories = [], suppliers = [] } = useStock();

  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    category: '',
    supplier: '',
    price: '',
    cost: '',
    quantity: '',
    minStockLevel: '5',
    expiryDate: ''
  });

  // When the modal opens (or categories/suppliers load), initialize defaults
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        barcode: '',
        category: categories[0] || '',
        supplier: suppliers[0]?.id ? String(suppliers[0].id) : '',
        price: '',
        cost: '',
        quantity: '',
        minStockLevel: '5',
        expiryDate: ''
      });
    }
  }, [isOpen, categories, suppliers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStockItem(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Inventory Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Item Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Barcode</label>
              <input
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="mt-1 w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 w-full border px-3 py-2 rounded"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Supplier</label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="mt-1 w-full border px-3 py-2 rounded"
              >
                <option value="">No supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={String(sup.id)}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Selling Price*</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Cost Price*</label>
              <input
                type="number"
                name="cost"
                min="0"
                step="0.01"
                value={formData.cost}
                onChange={handleChange}
                required
                className="mt-1 w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Quantity*</label>
              <input
                type="number"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="mt-1 w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Minimum Stock Level</label>
              <input
                type="number"
                name="minStockLevel"
                min="0"
                value={formData.minStockLevel}
                onChange={handleChange}
                className="mt-1 w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
