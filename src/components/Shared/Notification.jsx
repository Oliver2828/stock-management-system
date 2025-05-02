import React from 'react';

export default function Notification({ message, type }) {
  // type could be 'success' | 'error' | 'info'
  const colorMap = {
    success: 'bg-green-100 text-green-800',
    error:   'bg-red-100   text-red-800',
    info:    'bg-blue-100  text-blue-800',
  };

  return (
    <div
      className={`
        fixed top-4 right-4
        px-4 py-2 rounded shadow
        ${colorMap[type] || colorMap.info}
      `}
      style={{ zIndex: 9999 }}
    >
      {message}
    </div>
  );
}
