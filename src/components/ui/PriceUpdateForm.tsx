import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { DateTimeInput } from './DateTimeInput';
import { PriceInput } from './PriceInput';
import { formatDateForInput, formatTimeForInput, combineDateAndTime } from '../../utils/dateUtils';

interface PriceUpdateFormProps {
  currentPrice: number;
  currentDate: string;
  onUpdate: (newPrice: number, newDate: string, ctnPrice?: number) => void;
  onCancel: () => void;
  packagingSize?: number;
  pricePerCTN?: number;
}

export function PriceUpdateForm({ 
  currentPrice, 
  currentDate, 
  onUpdate, 
  onCancel,
  packagingSize,
  pricePerCTN 
}: PriceUpdateFormProps) {
  const [price, setPrice] = useState(currentPrice);
  const [date, setDate] = useState(formatDateForInput(currentDate));
  const [time, setTime] = useState(formatTimeForInput(currentDate));
  const [ctnPrice, setCTNPrice] = useState(pricePerCTN || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateTime = combineDateAndTime(date, time);
    onUpdate(price, dateTime, ctnPrice || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PriceInput
        value={price}
        onChange={setPrice}
        label="Unit Price"
      />

      {packagingSize && (
        <PriceInput
          value={ctnPrice}
          onChange={setCTNPrice}
          label={`Price per CTN (${packagingSize} units)`}
          required={false}
        />
      )}

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

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Check size={16} className="mr-2" />
          Update Price
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <X size={16} className="mr-2" />
          Cancel
        </button>
      </div>
    </form>
  );
}