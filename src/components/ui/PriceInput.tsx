import React from 'react';
import { roundToTwoDecimals } from '../../utils/priceUtils';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  label?: string;
  min?: number;
  max?: number;
}

export function PriceInput({ 
  value, 
  onChange, 
  required = true,
  label = "Unit Price ($)",
  min = 0,
  max
}: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value ? parseFloat(e.target.value) : 0;
    const newValue = roundToTwoDecimals(rawValue);
    onChange(newValue);
  };

  return (
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="number"
          id="price"
          value={value || ''}
          onChange={handleChange}
          step="any"
          min={min}
          max={max}
          className="block w-full rounded-md border-gray-300 pl-7 pr-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required={required}
          placeholder="0.00"
        />
      </div>
    </div>
  );
}