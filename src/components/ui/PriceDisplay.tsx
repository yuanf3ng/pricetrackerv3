import React from 'react';
import { formatPrice } from '../../utils/priceUtils';

interface PriceDisplayProps {
  price: number;
  className?: string;
}

export function PriceDisplay({ price, className = '' }: PriceDisplayProps) {
  return (
    <div className={`text-2xl font-bold text-gray-900 ${className}`}>
      ${formatPrice(price)}
    </div>
  );
}