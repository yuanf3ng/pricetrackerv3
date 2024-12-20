import { Product } from '../types';

const CHART_COLORS = [
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#ea580c', // orange-600
];

export function getChartDatasets(products: Product[]) {
  if (!products || products.length === 0) {
    return [];
  }

  const locations = Array.from(new Set(products.map(p => p.location)));
  
  return locations.map((location, index) => {
    const locationProducts = products.filter(p => p.location === location);
    
    const pricePoints = locationProducts
      .flatMap(product => 
        product.priceHistory
          .filter(point => point.date && point.price != null)
          .map(point => ({
            x: new Date(point.date),
            y: point.price,
          }))
      )
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    return {
      label: location,
      data: pricePoints,
      borderColor: CHART_COLORS[index % CHART_COLORS.length],
      backgroundColor: CHART_COLORS[index % CHART_COLORS.length] + '20',
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    };
  });
}