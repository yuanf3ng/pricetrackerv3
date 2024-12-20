import React from 'react';
import { ImageIcon } from 'lucide-react';

interface ProductImageProps {
  url?: string;
  data?: string;
  alt: string;
}

export function ProductImage({ url, data, alt }: ProductImageProps) {
  const imageSource = data || url;

  if (!imageSource) {
    return (
      <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg">
        <ImageIcon size={24} className="text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt={alt}
      className="w-32 h-32 object-cover rounded-lg"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'https://via.placeholder.com/128?text=Error';
      }}
    />
  );
}