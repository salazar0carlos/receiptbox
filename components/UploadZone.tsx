'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import Button from './Button';
import { toast } from 'sonner';
import { compressImage, formatFileSize } from '@/lib/imageCompression';

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

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    const originalSize = formatFileSize(selectedFile.size);

    try {
      // Compress image if it's an image file
      const compressedFile = await compressImage(selectedFile);
      const compressedSize = formatFileSize(compressedFile.size);

      if (compressedFile.size < selectedFile.size) {
        toast.success(`Image optimized: ${originalSize} → ${compressedSize}`);
      }

      setFile(compressedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Compression error:', error);
      // If compression fails, use original file
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
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

  // Detect if user is on mobile device
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
            style={{
              width: '100%',
              height: isMobile ? '320px' : '384px',
              objectFit: 'contain',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
          <button
            onClick={handleClear}
            className="glass"
            style={{
              position: 'absolute',
              top: 'var(--space-2)',
              right: 'var(--space-2)',
              padding: 'var(--space-2)',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
          <Button
            onClick={handleUpload}
            loading={uploading}
            className="flex-1"
            style={{
              background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
              border: 'none'
            }}
          >
            Process Receipt
          </Button>
          <Button
            onClick={handleClear}
            variant="secondary"
            disabled={uploading}
            className="glass"
            style={{ color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      style={{
        border: isDragActive ? '2px dashed rgba(168, 85, 247, 0.6)' : '2px dashed rgba(255, 255, 255, 0.3)',
        borderRadius: 'var(--radius-2xl)',
        padding: isMobile ? 'var(--space-8)' : 'var(--space-12)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: isDragActive ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      }}
      className="hover:border-purple-400"
    >
      <input {...getInputProps()} capture={isMobile ? "environment" : undefined} />
      <div className="flex flex-col items-center" style={{ gap: 'var(--space-4)' }}>
        <div style={{
          width: isMobile ? '56px' : '64px',
          height: isMobile ? '56px' : '64px',
          background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
        }}>
          <Upload className={isMobile ? "w-7 h-7" : "w-8 h-8"} color="white" />
        </div>
        <div>
          <p style={{
            fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
            fontWeight: 'var(--font-semibold)',
            color: 'white',
            marginBottom: 'var(--space-2)'
          }}>
            {isDragActive
              ? 'Drop your receipt here'
              : isMobile
                ? 'Tap to take photo or choose file'
                : 'Drop receipt here or click to upload'
            }
          </p>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            Supports JPG, PNG, HEIC, PDF up to 10MB
          </p>
        </div>
        {!isMobile && (
          <Button type="button" variant="secondary" className="glass" style={{ color: 'white' }}>
            Choose File
          </Button>
        )}
      </div>
    </div>
  );
}
