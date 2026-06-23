'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useLocale } from '@/lib/i18n/LocaleProvider';

interface PulseMarkerProps {
  id: string;
  lat: number;
  lng: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  cropName: string;
  pestName: string;
  reportedAt: string;
}

export default function PulseMarker({ lat, lng, severity, confidence, cropName, pestName, reportedAt }: PulseMarkerProps) {
  const { dict, locale } = useLocale();

  const icon = React.useMemo(() => {
    let bgColor = '';
    const baseSize = 24;
    const normalizedConfidence = confidence > 1 ? Math.min(confidence / 100, 1) : Math.min(confidence, 1);
    const extraSize = normalizedConfidence * 16;
    const totalSize = Math.round(baseSize + extraSize);

    switch(severity) {
      case 'critical':
        bgColor = '#E07A5F';
        break;
      case 'high':
        bgColor = '#C9973B';
        break;
      case 'medium':
        bgColor = '#4A5D23';
        break;
      case 'low':
        bgColor = '#7A9450';
        break;
    }

    const html = `
      <div class="relative flex items-center justify-center" style="width: ${totalSize}px; height: ${totalSize}px;">
        <div class="absolute inset-0 rounded-full" style="background: ${bgColor}; opacity: 0.75;"></div>
        ${severity === 'critical' || severity === 'high' ? `<div class="absolute inset-0 rounded-full border-2" style="border-color: ${bgColor}; animation: risk-pulse 1.5s ease-in-out infinite;"></div>` : ''}
        <div class="relative w-3 h-3 rounded-full bg-white z-10"></div>
      </div>
    `;

    return L.divIcon({
      className: 'custom-pulse-marker',
      html,
      iconSize: [totalSize, totalSize],
      iconAnchor: [totalSize / 2, totalSize / 2],
      popupAnchor: [0, -(totalSize / 2)],
    });
  }, [severity, confidence]);

  const dateStr = new Date(reportedAt).toLocaleString(locale, { 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  });

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup>
        <div className="p-1">
          <div className="font-bold text-sm mb-1">{pestName}</div>
          <div className="text-xs text-charcoal-muted mb-2">Crop: {cropName}</div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Severity:</span>
            <span className={`text-xs px-2 py-0.5 font-bold border ${
              severity === 'critical' ? 'severity-critical' : 
              severity === 'high' ? 'severity-high' : 
              severity === 'medium' ? 'severity-medium' : 
              'severity-low'
            }`}>
              {dict.common[severity]}
            </span>
          </div>

          <div className="text-[10px] text-charcoal-muted mt-2 border-t border-stone pt-1">
            Reported: {dateStr}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
