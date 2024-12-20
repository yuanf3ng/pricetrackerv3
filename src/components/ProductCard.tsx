import React, { useState } from 'react';
import { MapPin, Trash2, Edit2, X, History, Package } from 'lucide-react';
import { Product, PricePoint } from '../types';
import { PriceDisplay } from './ui/PriceDisplay';
import { PriceChange } from './ui/PriceChange';
import { ProductImage } from './ui/ProductImage';
import { PriceUpdateForm } from './ui/PriceUpdateForm';
import { PriceHistoryModal } from './PriceHistory/PriceHistoryModal';
import { formatDate, formatTime } from '../utils/dateUtils';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onUpdatePrice: (productId: string, newPrice: number, newDate: string) => void;
  onDeletePrice: (productId: string, pricePoint: PricePoint) => void;
}

export function ProductCard({ product, onDelete, onUpdatePrice, onDeletePrice }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const initialPrice = product.priceHistory[0].price;

  const handlePriceUpdate = (newPrice: number, newDate: string) => {
    onUpdatePrice(product.id, newPrice, newDate);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex p-4 gap-4">
        <ProductImage url={product.photoUrl} data={product.photoData} alt={product.name} />
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(true)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="View price history"
              >
                <History size={20} />
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label={isEditing ? "Cancel edit" : "Edit price"}
              >
                {isEditing ? <X size={20} /> : <Edit2 size={20} />}
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete product"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <PriceDisplay price={product.currentPrice} />
            <PriceChange currentPrice={product.currentPrice} initialPrice={initialPrice} />
            {isEditing && (
              <PriceUpdateForm
                currentPrice={product.currentPrice}
                currentDate={new Date().toISOString()}
                onUpdate={handlePriceUpdate}
                onCancel={() => setIsEditing(false)}
              />
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              {product.location}
            </div>
            {product.packagingSize && (
              <div className="flex items-center">
                <Package size={16} className="mr-2" />
                <span>
                  {product.packagingSize} units/CTN
                  {product.pricePerCTN && (
                    <span className="ml-2 text-gray-500">
                      (${product.pricePerCTN.toFixed(2)}/CTN)
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showHistory && (
        <PriceHistoryModal
          product={product}
          onClose={() => setShowHistory(false)}
          onUpdatePrice={onUpdatePrice}
          onDeletePrice={onDeletePrice}
        />
      )}
    </div>
  );
}