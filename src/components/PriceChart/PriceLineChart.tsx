import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Product } from '../../types';
import { chartOptions } from './ChartConfig';
import { getChartDatasets } from '../../utils/chartUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface PriceLineChartProps {
  products: Product[];
}

export function PriceLineChart({ products }: PriceLineChartProps) {
  if (!products || products.length === 0) {
    return (
      <div className="h-[300px] w-full bg-white p-4 rounded-lg shadow-sm flex items-center justify-center text-gray-500">
        No price data available
      </div>
    );
  }

  const chartData = {
    datasets: getChartDatasets(products)
  };

  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-lg shadow-sm">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}