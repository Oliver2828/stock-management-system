// src/components/Inventory/POS.jsx
import React, { useState, useEffect } from 'react';
import { useStock } from '../../contexts/StockContext';
import BarcodeScanner from './BarcodeScanner';
import Cart from './Cart';
import PaymentModal from './PaymentModal';

export default function POS() {
  const { stockItems, processSale } = useStock();
  const [cart, setCart] = useState([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (barcode) => {
    const item = stockItems.find(i => i.barcode === barcode);
    if (!item) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) {
      setCart(prev => prev.filter(i => i.id !== id));
    } else {
      setCart(prev => prev.map(i =>
        i.id === id ? { ...i, quantity: qty } : i
      ));
    }
  };

  const handleCompleteSale = (paymentInfo) => {
    const saleItems = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      soldQuantity: item.quantity,
    }));
    processSale(saleItems);
    setCart([]);
    setIsPaymentOpen(false);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Point of Sale</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <BarcodeScanner onScan={handleAddToCart} />

          <div className="bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder="Search items by name or barcode..."
              className="w-full p-3 border rounded-md"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {stockItems
                .filter(item =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddToCart(item.barcode)}
                    className="p-3 border rounded-md hover:bg-gray-50 text-left"
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    {item.barcode && (
                      <div className="text-xs text-gray-400 mt-1">{item.barcode}</div>
                    )}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div>
          <Cart
            items={cart}
            onQuantityChange={handleQuantityChange}
            total={total}
            onCheckout={() => setIsPaymentOpen(true)}
          />
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        total={total}
        onComplete={handleCompleteSale}
      />
    </div>
  );
}
