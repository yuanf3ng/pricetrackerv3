export interface Product {
  id: string;
  name: string;
  currentPrice: number;
  location: string;
  photoUrl?: string;
  photoData?: string;
  lastChecked: string;
  priceHistory: PricePoint[];
  packagingSize?: number;
  pricePerCTN?: number;
}

export interface PricePoint {
  price: number;
  date: string;
  pricePerCTN?: number;
}

export interface ProductFormData {
  name: string;
  price: number;
  location: string;
  photoUrl?: string;
  photoData?: string;
  date?: string;
  packagingSize?: number;
  pricePerCTN?: number;
}