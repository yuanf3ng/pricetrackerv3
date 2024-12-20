import React from 'react';
import { PriceInput } from './PriceInput';
import { roundToTwoDecimals } from '../../utils/priceUtils';

interface PackagingFieldsProps {
  packagingSize?: number;
  pricePerCTN?: number;
  onPackagingSizeChange: (value?: number) => void;
  onPricePerCTNChange: (value?: number) => void;
  currentPrice: number;
}

export function PackagingFields({
  packagingSize,
  pricePerCTN,
  onPackagingSizeChange,
  onPricePerCTNChange,
  currentPrice
}: PackagingFieldsProps) {
  const handlePackagingSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onPackagingSizeChange(value);
    
    // Update CTN price when packaging size changes
    if (value) {
      const calculatedCTNPrice = roundToTwoDecimals(currentPrice * value);
      onPricePerCTNChange(calculatedCTNPrice);
    } else {
      onPricePerCTNChange(undefined);
    }
  };

  const handleCTNPriceChange = (value: number) => {
    onPricePerCTNChange(value);
    
    // Calculate and update unit price when CTN price changes
    if (packagingSize && packagingSize > 0) {
      const unitPrice = roundToTwoDecimals(value / packagingSize);
      // Update parent form's current price
      const event = new CustomEvent('unitPriceChange', { detail: unitPrice });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Packaging Size (Optional)
        </label>
        <div className="mt-1">
          <input
            type="number"
            value={packagingSize || ''}
            onChange={handlePackagingSizeChange}
            min="1"
            step="1"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter units per package"
          />
        </div>
      </div>

      {packagingSize && packagingSize > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price per CTN ({packagingSize} units)
          </label>
          <PriceInput
            value={pricePerCTN || 0}
            onChange={handleCTNPriceChange}
            required={false}
          />
        </div>
      )}
    </div>
  );
}