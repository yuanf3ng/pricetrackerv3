import { Product, PricePoint } from '../types';

export function updateProductPrice(
  product: Product, 
  newPrice: number, 
  newDate: string, 
  newCTNPrice?: number
): Product {
  return {
    ...product,
    currentPrice: newPrice,
    pricePerCTN: newCTNPrice,
    lastChecked: newDate,
    priceHistory: [
      ...product.priceHistory,
      { 
        price: newPrice, 
        date: newDate,
        pricePerCTN: newCTNPrice
      }
    ]
  };
}

export function getUniqueProductNames(products: Product[]): string[] {
  return Array.from(new Set(products.map(p => p.name))).sort();
}