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

const PALETTE: Record<string, { fill: string; glow: string }> = {
  critical: { fill: '#DC2626', glow: 'rgba(220,38,38,0.35)' },
  high:    { fill: '#EA580C', glow: 'rgba(234,88,12,0.35)' },
  medium:  { fill: '#65A30D', glow: 'rgba(101,163,13,0.35)' },
  low:     { fill: '#059669', glow: 'rgba(5,150,105,0.35)' },
}

export default function PulseMarker({ lat, lng, severity, cropName, pestName, reportedAt }: PulseMarkerProps) {
  const { dict, locale } = useLocale();

  const icon = React.useMemo(() => {
    const { fill, glow } = PALETTE[severity] || PALETTE.low
    const size = 32

    const html = `
      <div class="pin-wrapper" style="width:${size}px;height:${size}px;">
        <div class="pin-shadow" style="position:absolute;bottom:-1px;left:5px;width:22px;height:6px;background:rgba(0,0,0,0.2);border-radius:50%;filter:blur(2px);"></div>
        <div class="pin-outer" style="position:absolute;inset:-3px;border-radius:50%;background:rgba(255,255,255,0.45);backdrop-filter:blur(1px);"></div>
        <div class="pin-body" style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,${fill}cc,${fill});box-shadow:0 2px 6px ${glow},inset 0 1px 0 rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;transition:transform 0.2s ease;">
          <div style="width:8px;height:8px;border-radius:50%;background:white;box-shadow:inset 0 1px 2px rgba(0,0,0,0.15);"></div>
        </div>
        ${severity === 'critical' || severity === 'high' ? `<div class="pin-pulse" style="position:absolute;inset:-6px;border-radius:50%;border:2px solid ${fill};opacity:0.5;"></div>` : ''}
      </div>
    `

    return L.divIcon({
      className: '',
      html,
      iconSize: [size + 12, size + 12],
      iconAnchor: [(size + 12) / 2, (size + 12) / 2 + 4],
      popupAnchor: [0, -(size + 12) / 2 - 4],
    });
  }, [severity]);

  const dateStr = new Date(reportedAt).toLocaleString(locale, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup>
        <div className="min-w-[180px]">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-bold text-gray-900 leading-tight">{pestName}</div>
              <div className="text-xs text-gray-500 mt-0.5">{cropName}</div>
            </div>
            <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              severity === 'critical' ? 'text-red-700 border-red-300 bg-red-50' :
              severity === 'high' ? 'text-orange-700 border-orange-300 bg-orange-50' :
              severity === 'medium' ? 'text-green-700 border-green-300 bg-green-50' :
              'text-emerald-700 border-emerald-300 bg-emerald-50'
            }`}>
              {dict.common[severity]}
            </span>
          </div>
          <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-1.5 mt-1">
            {dateStr}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}