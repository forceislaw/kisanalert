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

const COLORS: Record<string, string> = {
  critical: '#CC3333',
  high: '#CC6600',
  medium: '#5A7744',
  low: '#4A7A55',
}

export default function PulseMarker({ lat, lng, severity, cropName, pestName, reportedAt }: PulseMarkerProps) {
  const { dict, locale } = useLocale();

  const icon = React.useMemo(() => {
    const color = COLORS[severity] || '#4A7A55'
    const size = 34

    const html = `
      <div class="brutal-pin" style="width:${size}px;height:${size}px;">
        <div class="brutal-pin-shadow" style="position:absolute;inset:2px 0 0 2px;border-radius:50%;background:#1a1a1a;"></div>
        <div class="brutal-pin-body" style="position:absolute;inset:0;border-radius:50%;background:${color};border:3px solid #1a1a1a;display:flex;align-items:center;justify-content:center;transition:transform 0.15s;">
          <div style="width:10px;height:10px;border-radius:50%;background:#1a1a1a;"></div>
        </div>
        ${severity === 'critical' || severity === 'high' ? `<div class="brutal-pin-ring" style="position:absolute;inset:-5px;border-radius:50%;border:2px solid ${color};opacity:0.5;"></div>` : ''}
      </div>
    `

    return L.divIcon({
      className: '',
      html,
      iconSize: [size + 10, size + 10],
      iconAnchor: [(size + 10) / 2, (size + 10) / 2],
      popupAnchor: [0, -(size + 10) / 2],
    });
  }, [severity]);

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