// src/components/Inventory/Cart.jsx
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

export default function Cart({ items, onQuantityChange, total, onCheckout }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow sticky top-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="py-3 flex items-center">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
                    className="w-16 p-1 border rounded text-center"
                  />
                  <button
                    onClick={() => onQuantityChange(item.id, 0)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between font-medium text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Process Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
