import React, { useState } from 'react';
import { Product, PricePoint } from '../../types';
import { ProductGroupCard } from './ProductGroupCard';

interface ProductTabsProps {
  productGroups: Map<string, Product[]>;
  onDelete: (id: string) => void;
  onUpdatePrice: (productId: string, newPrice: number, newDate: string) => void;
  onDeletePrice: (productId: string, pricePoint: PricePoint) => void;
}

export function ProductTabs({ productGroups, onDelete, onUpdatePrice, onDeletePrice }: ProductTabsProps) {
  const groupNames = Array.from(productGroups.keys());
  const [activeTab, setActiveTab] = useState(groupNames[0] || '');

  if (groupNames.length === 0) return null;

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-2 overflow-x-auto" aria-label="Product groups">
          {groupNames.map((name) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`
                whitespace-nowrap px-4 py-2 border-b-2 font-medium text-sm
                ${activeTab === name
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {activeTab && (
          <ProductGroupCard
            name={activeTab}
            products={productGroups.get(activeTab) || []}
            onDelete={onDelete}
            onUpdatePrice={onUpdatePrice}
            onDeletePrice={onDeletePrice}
          />
        )}
      </div>
    </div>
  );
}