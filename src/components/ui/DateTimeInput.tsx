import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeInputProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  maxDate?: string;
}

export function DateTimeInput({ date, time, onDateChange, onTimeChange, maxDate }: DateTimeInputProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Calendar size={16} className="absolute left-2 top-2 text-gray-400" />
        <input
          type="date"
          value={date}
          max={maxDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full pl-8 pr-2 py-1.5 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="relative flex-1">
        <Clock size={16} className="absolute left-2 top-2 text-gray-400" />
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="w-full pl-8 pr-2 py-1.5 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
    </div>
  );
}