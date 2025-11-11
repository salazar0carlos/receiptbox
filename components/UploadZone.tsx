'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import Button from './Button';
import { toast } from 'sonner';

interface UploadZoneProps {
  onUploadComplete: (data: {
    imageUrl: string;
    ocrData: any;
  }) => void;
}

export default function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.heic'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const { imageUrl } = await uploadResponse.json();

      // Extract OCR data
      const ocrResponse = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      if (!ocrResponse.ok) {
        throw new Error('OCR failed');
      }

      const ocrData = await ocrResponse.json();

      toast.success('Receipt uploaded and processed!');
      onUploadComplete({ imageUrl, ocrData });

      // Reset
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload receipt');
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
  };

  if (preview) {
    return (
      <div className="w-full">
        <div className="relative">
          <img
            src={preview}
            alt="Receipt preview"
            className="w-full h-64 object-contain bg-gray-50 rounded-lg"
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="mt-4 flex gap-3">
          <Button onClick={handleUpload} loading={uploading} className="flex-1">
            Process Receipt
          </Button>
          <Button onClick={handleClear} variant="secondary" disabled={uploading}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
        transition-all
        ${isDragActive
          ? 'border-emerald-600 bg-emerald-50'
          : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-gray-100'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-900 mb-2">
            {isDragActive ? 'Drop your receipt here' : 'Drop receipt here or click to upload'}
          </p>
          <p className="text-gray-600">
            Supports JPG, PNG, HEIC, PDF up to 10MB
          </p>
        </div>
        <Button type="button" variant="secondary">
          Choose File
        </Button>
      </div>
    </div>
  );
}
