import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import { Product, ProductFormData, PricePoint } from './types';
import { AddProductForm } from './components/AddProductForm';
import { ProductTabs } from './components/ProductGroup/ProductTabs';
import { ImportExportButtons } from './components/ImportExport/ImportExportButtons';
import { groupProductsByName } from './utils/groupUtils';
import { updateProductPrice } from './utils/productUtils';
import { useNotification } from './contexts/NotificationContext';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const { showNotification } = useNotification();

  const handleAddProduct = (formData: ProductFormData) => {
    const timestamp = formData.date || new Date().toISOString();
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: formData.name.toUpperCase(),
      currentPrice: formData.price,
      location: formData.location,
      photoUrl: formData.photoUrl,
      photoData: formData.photoData,
      lastChecked: timestamp,
      priceHistory: [{ price: formData.price, date: timestamp }],
    };
    setProducts([...products, newProduct]);
    showNotification('success', `${newProduct.name} has been added successfully!`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleUpdatePrice = (productId: string, newPrice: number, newDate: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? updateProductPrice(product, newPrice, newDate)
        : product
    ));
  };

  const handleDeletePrice = (productId: string, pricePoint: PricePoint) => {
    setProducts(products.map(product => {
      if (product.id !== productId) return product;

      const newHistory = product.priceHistory.filter(p => p.date !== pricePoint.date);
      if (newHistory.length === 0) return product;

      const latestPoint = newHistory[newHistory.length - 1];
      return {
        ...product,
        currentPrice: latestPoint.price,
        lastChecked: latestPoint.date,
        priceHistory: newHistory,
      };
    }));
  };

  const handleImport = (importedProducts: Product[]) => {
    setProducts(prevProducts => [...prevProducts, ...importedProducts]);
  };

  const productGroups = groupProductsByName(products);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <LineChart size={32} className="text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Price Tracker</h1>
        </div>

        <ImportExportButtons products={products} onImport={handleImport} />
        <AddProductForm onAdd={handleAddProduct} existingProducts={products} />

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products added yet. Add your first product above!</p>
          </div>
        ) : (
          <ProductTabs
            productGroups={productGroups}
            onDelete={handleDeleteProduct}
            onUpdatePrice={handleUpdatePrice}
            onDeletePrice={handleDeletePrice}
          />
        )}
      </div>
    </div>
  );
}