import { Product } from '../types';

export function exportProducts(products: Product[]): string {
  try {
    const data = JSON.stringify(products, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error exporting products:', error);
    throw new Error('Failed to export products');
  }
}

export function validateImportData(data: unknown): Product[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid data format: expected an array');
  }

  return data.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Invalid product at index ${index}`);
    }

    const product = item as Partial<Product>;
    
    if (!product.id || typeof product.id !== 'string') {
      product.id = crypto.randomUUID();
    }
    
    if (!product.name || typeof product.name !== 'string') {
      throw new Error(`Missing or invalid name at index ${index}`);
    }
    
    if (typeof product.currentPrice !== 'number') {
      throw new Error(`Missing or invalid price at index ${index}`);
    }
    
    if (!product.location || typeof product.location !== 'string') {
      throw new Error(`Missing or invalid location at index ${index}`);
    }
    
    if (!product.lastChecked || typeof product.lastChecked !== 'string') {
      throw new Error(`Missing or invalid lastChecked at index ${index}`);
    }
    
    if (!Array.isArray(product.priceHistory)) {
      throw new Error(`Missing or invalid priceHistory at index ${index}`);
    }

    return product as Product;
  });
}