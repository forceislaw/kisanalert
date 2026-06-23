'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface UploadProgress {
  loaded: number
  total: number
}

interface CropUploaderProps {
  onComplete?: (storagePath: string) => void
}

export default function CropUploader({ onComplete }: CropUploaderProps) {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedPath, setUploadedPath] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) selectFile(f)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) selectFile(f)
  }

  const selectFile = (f: File) => {
    if (!f.type.startsWith('image/')) {
      setError('Only image files are supported')
      return
    }
    setError(null)
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setUploadedPath(null)
    setProgress(null)
  }

  const clearFile = () => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    setProgress(null)
    setError(null)
    setUploadedPath(null)
  }

  const uploadToSupabase = async () => {
    if (!file) return

    setUploading(true)
    setError(null)
    setProgress({ loaded: 0, total: file.size })

    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop() || 'jpg'
      const storagePath = `crop-images/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('crop-images')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      setUploadedPath(storagePath)
      setProgress({ loaded: file.size, total: file.size })
      onComplete?.(storagePath)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {error && (
        <div className="p-3 border border-terra bg-terra/10 text-terra-dark text-sm flex items-center gap-2">
          <X className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {!preview ? (
        <div
          className={`dropzone-frame w-full h-56 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragging ? 'drag-active' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="p-4 bg-parchment-dark mb-4">
            <Upload className="w-8 h-8 text-sage" />
          </div>
          <p className="text-sm font-medium text-charcoal-muted">Drop your crop photo here</p>
        </div>
      ) : (
        <div className="border border-stone bg-parchment-tint overflow-hidden">
          <div className="relative h-48 bg-parchment-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            {!uploading && !uploadedPath && (
              <button
                onClick={clearFile}
                className="absolute top-2 right-2 p-1.5 bg-charcoal/50 text-parchment-tint hover:bg-charcoal/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {progress && (
            <div className="px-4 py-3 border-t border-stone">
              <div className="flex justify-between text-xs text-charcoal-muted mb-1.5">
                <span>{uploading ? 'Uploading...' : 'Uploaded'}</span>
                <span>{Math.round((progress.loaded / progress.total) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-parchment-dark">
                <div
                  className="h-full bg-sage transition-all duration-300"
                  style={{ width: `${(progress.loaded / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {uploadedPath && (
            <div className="px-4 py-3 border-t border-stone flex items-center gap-2 text-sm text-sage">
              <span>Uploaded to storage</span>
            </div>
          )}

          <div className="px-4 py-3 border-t border-stone flex gap-3">
            {!uploading && !uploadedPath && (
              <button
                onClick={uploadToSupabase}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload to Storage
              </button>
            )}
            {uploadedPath && (
              <button
                onClick={() => router.push('/dashboard/upload')}
                className="btn-primary flex-1"
              >
                Continue to Report
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
