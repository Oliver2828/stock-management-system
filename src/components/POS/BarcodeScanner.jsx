// src/components/Inventory/BarcodeScanner.jsx
import React, { useState, useEffect } from 'react';
import { FiCamera, FiX } from 'react-icons/fi';

export default function BarcodeScanner({ onScan }) {
  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');

  const handleKeyDown = (e) => {
    if (isScanning && e.key === 'Enter' && manualBarcode) {
      onScan(manualBarcode);
      setManualBarcode('');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isScanning, manualBarcode]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Barcode Scanner</h2>
        <button
          onClick={() => setIsScanning(prev => !prev)}
          className={`px-3 py-1 rounded-md flex items-center gap-2 ${
            isScanning ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isScanning ? (
            <>
              <FiX /> Stop Scanning
            </>
          ) : (
            <>
              <FiCamera /> Start Scanning
            </>
          )}
        </button>
      </div>

      {isScanning ? (
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
            <p className="text-gray-500">Point camera at barcode</p>
            {/* Integrate QuaggaJS or similar in production */}
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Alternatively, enter barcode manually:
          </p>
          <input
            type="text"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded-md"
            placeholder="Enter barcode and press Enter"
            autoFocus
          />
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Click "Start Scanning" to begin</p>
        </div>
      )}
    </div>
  );
}
