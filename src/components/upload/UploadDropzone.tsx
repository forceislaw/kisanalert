'use client';

import React, { useState, useRef } from 'react';
import { VisionAnalysisResult } from '@/app/api/vision-analyze/route';

interface UploadDropzoneProps {
  onAnalysisComplete: (result: VisionAnalysisResult, imageUrl: string) => void;
}

export default function UploadDropzone({ onAnalysisComplete }: UploadDropzoneProps) {
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
      setError('Only image files are supported');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

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

      onAnalysisComplete(json.data as VisionAnalysisResult, previewUrl);
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
          <p className="text-sm text-charcoal-muted font-sans">Analyzing...</p>
        ) : (
          <div className="flex flex-col items-center gap-4 text-charcoal-muted">
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p className="text-sm font-medium">Drop your crop photo here</p>
          </div>
        )}
      </div>
    </div>
  );
}
