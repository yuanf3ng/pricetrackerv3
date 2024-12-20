import React from 'react';
import { Product, PricePoint } from '../../types';
import { PriceLineChart } from '../PriceChart/PriceLineChart';
import { ProductList } from './ProductList';
import { PriceSummary } from './PriceSummary';

interface ProductGroupCardProps {
  name: string;
  products: Product[];
  onDelete: (id: string) => void;
  onUpdatePrice: (productId: string, newPrice: number, newDate: string) => void;
  onDeletePrice: (productId: string, pricePoint: PricePoint) => void;
}

export function ProductGroupCard({ 
  name, 
  products, 
  onDelete, 
  onUpdatePrice,
  onDeletePrice 
}: ProductGroupCardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{name}</h2>
        <PriceSummary products={products} onUpdatePrice={onUpdatePrice} />
        <PriceLineChart products={products} />
      </div>

      <ProductList 
        products={products} 
        onDelete={onDelete}
        onUpdatePrice={onUpdatePrice}
        onDeletePrice={onDeletePrice}
      />
    </div>
  );
}