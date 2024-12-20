import { useMemo } from 'react';
import { Product } from '../../types';
import { getChartDatasets } from '../../utils/chartUtils';

export function usePriceChartData(products: Product[]) {
  return useMemo(() => ({
    datasets: getChartDatasets(products)
  }), [products]);
}