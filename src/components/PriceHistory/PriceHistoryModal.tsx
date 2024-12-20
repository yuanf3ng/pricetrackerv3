import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product, PricePoint } from '../../types';
import { PriceHistoryTable } from './PriceHistoryTable';
import { PriceUpdateForm } from '../ui/PriceUpdateForm';

interface PriceHistoryModalProps {
  product: Product;
  onClose: () => void;
  onUpdatePrice: (productId: string, newPrice: number, newDate: string, ctnPrice?: number) => void;
  onDeletePrice: (productId: string, pricePoint: PricePoint) => void;
}

export function PriceHistoryModal({ 
  product, 
  onClose, 
  onUpdatePrice,
  onDeletePrice 
}: PriceHistoryModalProps) {
  const [editingPoint, setEditingPoint] = useState<PricePoint | null>(null);

  const handleEdit = (point: PricePoint) => {
    setEditingPoint(point);
  };

  const handleUpdate = (newPrice: number, newDate: string, ctnPrice?: number) => {
    onUpdatePrice(product.id, newPrice, newDate, ctnPrice);
    setEditingPoint(null);
  };

  const handleDelete = (point: PricePoint) => {
    onDeletePrice(product.id, point);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Price History</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {editingPoint ? (
            <div className="mb-4">
              <PriceUpdateForm
                currentPrice={editingPoint.price}
                currentDate={editingPoint.date}
                onUpdate={handleUpdate}
                onCancel={() => setEditingPoint(null)}
                packagingSize={product.packagingSize}
                pricePerCTN={editingPoint.pricePerCTN}
              />
            </div>
          ) : (
            <PriceHistoryTable
              priceHistory={product.priceHistory}
              onEdit={handleEdit}
              onDelete={handleDelete}
              packagingSize={product.packagingSize}
            />
          )}
        </div>
      </div>
    </div>
  );
}