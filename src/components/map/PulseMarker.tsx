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
  critical: '#E07A5F',
  high: '#C9973B',
  medium: '#4A5D23',
  low: '#7A9450',
}

export default function PulseMarker({ lat, lng, severity, cropName, pestName, reportedAt }: PulseMarkerProps) {
  const { dict, locale } = useLocale();

  const icon = React.useMemo(() => {
    const color = COLORS[severity] || COLORS.low

    const html = `
      <div class="brutal-marker">
        <div class="brutal-marker-shadow"></div>
        <div class="brutal-marker-circle" style="background:${color};"></div>
        <div class="brutal-marker-dot"></div>
        <div class="brutal-marker-ring" style="border-color:${color};"></div>
      </div>
    `

    return L.divIcon({
      className: '',
      html,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
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
