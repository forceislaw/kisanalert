'use client';

import React from 'react';
import { CircleMarker, Tooltip } from 'react-leaflet';

export interface DistrictHeatData {
  districtId: number | string;
  name: string;
  lat: number;
  lng: number;
  intensityScore: number;
  reportCount: number;
}

interface DistrictHeatLayerProps {
  data: DistrictHeatData[];
}

const COLORS: Record<string, string> = {
  critical: '#CC3333',
  high: '#CC6600',
  medium: '#5A7744',
  low: '#4A7A55',
}

export default function DistrictHeatLayer({ data }: DistrictHeatLayerProps) {
  const getColorForIntensity = (score: number) => {
    if (score >= 75) return COLORS.critical;
    if (score >= 40) return COLORS.high;
    if (score > 0) return COLORS.medium;
    return COLORS.low;
  };

  const getRadiusForIntensity = (score: number) => {
    return 20 + (score / 100) * 35;
  };

  return (
    <>
      {data.map((district) => {
        const color = getColorForIntensity(district.intensityScore);
        const radius = getRadiusForIntensity(district.intensityScore);

        return (
          <CircleMarker
            key={String(district.districtId)}
            center={[district.lat, district.lng]}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.25,
              color: '#1a1a1a',
              weight: 3,
              opacity: 0.9,
            }}
            radius={radius}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} className="dark-tooltip">
              <div>
                <strong className="block text-sm mb-1">{district.name}</strong>
                <div className="text-xs">
                  <span className="opacity-70">Risk Score:</span>{' '}
                  <span className="font-mono font-bold" style={{ color }}>{Math.round(district.intensityScore)}/100</span>
                </div>
                <div className="text-xs mt-1">
                  <span className="opacity-70">Active Reports:</span> <span className="font-mono">{district.reportCount}</span>
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </>
  );
}
