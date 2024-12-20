import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Product } from '../../types';
import { exportProducts, validateImportData } from '../../utils/exportUtils';
import { useNotification } from '../../contexts/NotificationContext';

interface ImportExportButtonsProps {
  products: Product[];
  onImport: (products: Product[]) => void;
}

export function ImportExportButtons({ products, onImport }: ImportExportButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();

  const handleExport = () => {
    try {
      const url = exportProducts(products);
      const link = document.createElement('a');
      link.href = url;
      link.download = `price-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification('success', 'Products exported successfully');
    } catch (error) {
      showNotification('error', 'Failed to export products');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        const validatedProducts = validateImportData(data);
        onImport(validatedProducts);
        showNotification('success', 'Products imported successfully');
      } catch (error) {
        showNotification('error', error instanceof Error ? error.message : 'Failed to import products');
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      showNotification('error', 'Failed to read import file');
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Upload size={16} className="mr-2" />
        Import
      </button>
      <button
        onClick={handleExport}
        disabled={products.length === 0}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={16} className="mr-2" />
        Export
      </button>
    </div>
  );
}