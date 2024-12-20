import React, { useState } from 'react';
import { Product } from '../../types';
import { PriceUpdateForm } from '../ui/PriceUpdateForm';

interface PriceSummaryProps {
  products: Product[];
  onUpdatePrice: (productId: string, newPrice: number, newDate: string) => void;
}

export function PriceSummary({ products, onUpdatePrice }: PriceSummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const latestProduct = products.reduce((latest, current) => {
    return new Date(latest.lastChecked) > new Date(current.lastChecked) ? latest : current;
  });

  const handlePriceUpdate = (price: number, date: string) => {
    onUpdatePrice(latestProduct.id, price, date);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <button
          onClick={() => setIsEditing(true)}
          className="w-full text-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <div className="text-sm font-medium text-gray-600">Latest Price</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            ${latestProduct.currentPrice.toFixed(2)}
          </div>
          <div className="text-xs text-emerald-600 mt-1">Click to update</div>
        </button>
        
        {isEditing && (
          <div className="absolute top-full left-0 right-0 z-10 mt-2">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-[400px] mx-auto">
              <PriceUpdateForm
                currentPrice={latestProduct.currentPrice}
                currentDate={latestProduct.lastChecked}
                onUpdate={handlePriceUpdate}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}