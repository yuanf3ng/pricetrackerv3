import React from 'react';
import { Product, PricePoint } from '../../types';
import { ProductCard } from '../ProductCard';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onUpdatePrice: (productId: string, newPrice: number, newDate: string) => void;
  onDeletePrice: (productId: string, pricePoint: PricePoint) => void;
}

export function ProductList({ products, onDelete, onUpdatePrice, onDeletePrice }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onUpdatePrice={onUpdatePrice}
          onDeletePrice={onDeletePrice}
        />
      ))}
    </div>
  );
}