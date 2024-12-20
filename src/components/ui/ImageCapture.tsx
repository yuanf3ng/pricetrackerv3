import React from 'react';
import { ImageInput } from './ImageInput';
import { compressImage, ImageError } from '../../utils/imageUtils';

interface ImageCaptureProps {
  onImageCapture: (imageData: string) => void;
  onError: (error: string) => void;
}

export function ImageCapture({ onImageCapture, onError }: ImageCaptureProps) {
  const handleImageSelect = async (file: File) => {
    try {
      const compressedImage = await compressImage(file);
      onImageCapture(compressedImage);
    } catch (error) {
      if (error instanceof ImageError) {
        onError(error.message);
      } else {
        onError('Failed to process image');
      }
    }
  };

  return (
    <div className="flex gap-4">
      <ImageInput
        onSelect={handleImageSelect}
        capture={true}
      />
      <ImageInput
        onSelect={handleImageSelect}
      />
    </div>
  );
}