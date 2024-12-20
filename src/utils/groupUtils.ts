import { Product } from '../types';

export function groupProductsByName(products: Product[]): Map<string, Product[]> {
  const groups = new Map<string, Product[]>();
  
  products.forEach(product => {
    const existing = groups.get(product.name) || [];
    groups.set(product.name, [...existing, product]);
  });
  
  return groups;
}

export function getUniqueLocations(products: Product[]): string[] {
  return Array.from(new Set(products.map(p => p.location)));
}