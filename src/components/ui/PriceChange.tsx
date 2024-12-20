import React from 'react';
import { calculatePriceChange, formatPriceChange } from '../../utils/priceUtils';

interface PriceChangeProps {
  currentPrice: number;
  initialPrice: number;
}

export function PriceChange({ currentPrice, initialPrice }: PriceChangeProps) {
  const priceChange = calculatePriceChange(currentPrice, initialPrice);
  
  if (priceChange === 0) return null;

  return (
    <div className={`text-sm ${priceChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
      {formatPriceChange(priceChange)}
    </div>
  );
}