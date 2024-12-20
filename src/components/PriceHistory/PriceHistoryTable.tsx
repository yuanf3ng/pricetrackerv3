import React from 'react';
import { PricePoint } from '../../types';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { formatPrice } from '../../utils/priceUtils';
import { Pencil, Trash2, Package } from 'lucide-react';

interface PriceHistoryTableProps {
  priceHistory: PricePoint[];
  onEdit: (point: PricePoint) => void;
  onDelete: (point: PricePoint) => void;
  packagingSize?: number;
}

export function PriceHistoryTable({ 
  priceHistory, 
  onEdit, 
  onDelete,
  packagingSize 
}: PriceHistoryTableProps) {
  const sortedHistory = [...priceHistory].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unit Price
            </th>
            {packagingSize && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CTN Price
              </th>
            )}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedHistory.map((point, index) => {
            const rowKey = `${point.date}-${point.price}-${index}`;
            
            return (
              <tr key={rowKey} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(point.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatTime(point.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${formatPrice(point.price)}
                </td>
                {packagingSize && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {point.pricePerCTN ? (
                      <div className="flex items-center">
                        <Package size={16} className="mr-2" />
                        ${formatPrice(point.pricePerCTN)}
                      </div>
                    ) : '-'}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(point)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit price"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(point)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete price"
                      disabled={index === sortedHistory.length - 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}