import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ProductFormData } from '../types';
import { ImageCapture } from './ui/ImageCapture';
import { DateTimeInput } from './ui/DateTimeInput';
import { PriceInput } from './ui/PriceInput';
import { PackagingFields } from './ui/PackagingFields';
import { AutocompleteInput } from './ui/AutocompleteInput';
import { combineDateAndTime } from '../utils/dateUtils';
import { getUniqueProductNames } from '../utils/productUtils';

interface AddProductFormProps {
  onAdd: (data: ProductFormData) => void;
  existingProducts: Product[];
}

export function AddProductForm({ onAdd, existingProducts }: AddProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    location: '',
    photoUrl: '',
    packagingSize: undefined,
    pricePerCTN: undefined,
  });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB').slice(0, 5));
  const [error, setError] = useState<string | null>(null);

  const productNames = getUniqueProductNames(existingProducts);

  useEffect(() => {
    const handleUnitPriceChange = (event: CustomEvent) => {
      setFormData(prev => ({
        ...prev,
        price: event.detail
      }));
    };

    window.addEventListener('unitPriceChange', handleUnitPriceChange as EventListener);
    return () => {
      window.removeEventListener('unitPriceChange', handleUnitPriceChange as EventListener);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.location) {
      const dateTime = combineDateAndTime(date, time);
      onAdd({
        ...formData,
        name: formData.name.toUpperCase(),
        date: dateTime,
      });
      setFormData({
        name: '',
        price: 0,
        location: '',
        photoUrl: '',
        photoData: undefined,
        packagingSize: undefined,
        pricePerCTN: undefined,
      });
      setDate(new Date().toISOString().split('T')[0]);
      setTime(new Date().toLocaleTimeString('en-GB').slice(0, 5));
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageCapture = (imageData: string) => {
    setFormData(prev => ({
      ...prev,
      photoData: imageData,
      photoUrl: '',
    }));
    setError(null);
  };

  const handleImageError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h2>
      
      <div className="space-y-4">
        <AutocompleteInput
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          suggestions={productNames}
          label="Product Name"
          required
          placeholder="Enter product name"
        />

        <PriceInput
          value={formData.price}
          onChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
        />

        <PackagingFields
          packagingSize={formData.packagingSize}
          pricePerCTN={formData.pricePerCTN}
          onPackagingSizeChange={(value) => setFormData(prev => ({ ...prev, packagingSize: value }))}
          onPricePerCTNChange={(value) => setFormData(prev => ({ ...prev, pricePerCTN: value }))}
          currentPrice={formData.price}
        />

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Store Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            placeholder="Enter store location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date and Time
          </label>
          <DateTimeInput
            date={date}
            time={time}
            onDateChange={setDate}
            onTimeChange={setTime}
            maxDate={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Photo
          </label>
          <ImageCapture
            onImageCapture={handleImageCapture}
            onError={handleImageError}
          />
          {formData.photoData && (
            <div className="mt-2">
              <img
                src={formData.photoData}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
      </div>
    </form>
  );
}