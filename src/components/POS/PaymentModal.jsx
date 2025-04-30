// src/components/Inventory/PaymentModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';

const paymentMethods = [
  { id: 'cash', name: 'Cash' },
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'mobile', name: 'Mobile Payment' },
];

export default function PaymentModal({ isOpen, onClose, total, onComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState('');
  const [changeDue, setChangeDue] = useState(0);

  // Reset cash inputs whenever the modal opens or method changes
  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('cash');
      setAmountReceived('');
      setChangeDue(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setAmountReceived('');
    setChangeDue(0);
  }, [paymentMethod]);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmountReceived(e.target.value);
    setChangeDue(val - total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({
      method: paymentMethod,
      amount: total,
      received: paymentMethod === 'cash' ? parseFloat(amountReceived) : total,
      change: paymentMethod === 'cash' ? changeDue : 0,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Process Payment">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Total */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id)}
                className={`p-2 border rounded-md text-center ${
                  paymentMethod === m.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cash Input Section */}
        {paymentMethod === 'cash' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount Received
            </label>
            <input
              type="number"
              min={total}
              step="0.01"
              value={amountReceived}
              onChange={handleAmountChange}
              required
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {changeDue > 0 && (
              <div className="mt-2 text-green-600">
                Change Due: ${changeDue.toFixed(2)}
              </div>
            )}
            {changeDue < 0 && (
              <div className="mt-2 text-red-600">
                Short by: ${Math.abs(changeDue).toFixed(2)}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={paymentMethod === 'cash' && changeDue < 0}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
              paymentMethod === 'cash' && changeDue < 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Complete Sale
          </button>
        </div>
      </form>
    </Modal>
  );
}
