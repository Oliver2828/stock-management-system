import React from 'react';
export default function Button({ 
    children, 
    onClick, 
    variant = 'primary', 
    type = 'button',
    className = '',
    disabled = false
  }) {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors'
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700',
    }
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${className} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {children}
      </button>
    )
  }