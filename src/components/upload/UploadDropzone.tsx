'use client';

import React, { useState, useRef } from 'react';
import { VisionAnalysisResult } from '@/app/api/vision-analyze/route';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { Ripple } from '@/components/loading-ui/ripple';

interface UploadDropzoneProps {
  onAnalysisComplete: (result: VisionAnalysisResult, imageUrl: string, file: File) => void;
}

export default function UploadDropzone({ onAnalysisComplete }: UploadDropzoneProps) {
  const { dict, locale } = useLocale();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError(dict.ui.unsupportedFile);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image too large. Maximum size is 2MB.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('lang', locale);

    const previewUrl = URL.createObjectURL(file);

    try {
      const response = await fetch('/api/vision-analyze', {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Analysis failed');
      }

      onAnalysisComplete(json.data as VisionAnalysisResult, previewUrl, file);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {error && (
        <div className="p-4 border border-terra bg-terra/10 text-terra-dark text-sm">
          {error}
        </div>
      )}

      <div
        className={`dropzone-frame w-full h-64 flex flex-col items-center justify-center p-6 text-center cursor-pointer ${
          isDragging ? 'drag-active' : ''
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Ripple className="w-12 h-12 text-terra" />
            <p className="text-sm text-charcoal-muted font-sans">{dict.upload.analyzing}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-charcoal-muted">
            <svg className="w-12 h-12 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21c3-3 5-10 9-17 4 7 6 14 9 17-3 1-6 1.5-9 1.5s-6-.5-9-1.5z" />
            </svg>
            <p className="text-sm font-medium">{dict.upload.dragDrop}</p>
          </div>
        )}
      </div>
    </div>
  );
}
