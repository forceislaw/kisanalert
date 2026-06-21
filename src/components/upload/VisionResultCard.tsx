'use client';

import React from 'react';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { VisionAnalysisResult } from '@/app/api/vision-analyze/route';
import SeverityBadge from '../ui/SeverityBadge';

interface VisionResultCardProps {
  result: VisionAnalysisResult;
  imageUrl: string;
  onConfirm: () => void;
  onDiscard: () => void;
  isSubmitting?: boolean;
}

export default function VisionResultCard({ result, imageUrl, onConfirm, onDiscard, isSubmitting = false }: VisionResultCardProps) {
  const { dict } = useLocale();

  return (
    <div className="w-full max-w-2xl mx-auto card-editorial overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-parchment-dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt="Pest analysis preview" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 w-full md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>
                  {result.is_pest_detected ? result.pest_name : 'Healthy Crop'}
                </h3>
                <p className="text-sm text-charcoal-muted mt-1">
                  Crop: {result.crop_guess}
                </p>
              </div>
              {result.is_pest_detected && (
                <SeverityBadge severity={result.severity_estimate} />
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-parchment-dark p-3 border border-stone">
                <div className="flex justify-between items-center mb-1">
                  <span className="eyebrow">Confidence</span>
                  <span className="text-xs font-mono text-sage">{Math.round(result.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-stone-tint h-1.5">
                  <div className="bg-sage h-1.5" style={{ width: `${result.confidence * 100}%` }}></div>
                </div>
              </div>

              {result.is_pest_detected && (
                <div>
                  <span className="eyebrow block mb-1">Recommended Action</span>
                  <p className="text-sm text-charcoal bg-parchment-dark p-2 border border-stone">{result.recommended_action}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onDiscard}
              disabled={isSubmitting}
              className="btn-secondary flex-1 disabled:opacity-50"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className="btn-primary flex-1 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>{dict.common.loading}</span>
              ) : (
                dict.upload.submit
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
