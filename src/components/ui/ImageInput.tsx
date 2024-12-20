import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

interface ImageInputProps {
  onSelect: (file: File) => void;
  accept?: string;
  capture?: boolean;
}

export function ImageInput({ onSelect, accept = "image/*", capture = false }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelect(file);
    }
    // Reset input to allow selecting the same file again
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        capture={capture ? "environment" : undefined}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {capture ? (
          <>
            <Camera size={20} />
            Take Photo
          </>
        ) : (
          <>
            <Upload size={20} />
            Upload Photo
          </>
        )}
      </button>
    </>
  );
}