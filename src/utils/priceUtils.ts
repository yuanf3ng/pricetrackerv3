export function calculatePriceChange(currentPrice: number, initialPrice: number): number {
  return ((currentPrice - initialPrice) / initialPrice) * 100;
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}

export function formatPriceChange(change: number): string {
  return `${change > 0 ? '↑' : '↓'} ${Math.abs(change).toFixed(1)}%`;
}

export function roundToTwoDecimals(value: number): number {
  return Number(Math.round(Number(value + 'e2')) + 'e-2');
}