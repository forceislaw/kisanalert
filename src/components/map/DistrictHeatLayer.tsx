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

export default function DistrictHeatLayer({ data }: DistrictHeatLayerProps) {
  const getColorForIntensity = (score: number) => {
    if (score >= 75) return '#E07A5F';
    if (score >= 40) return '#C9973B';
    if (score > 0) return '#4A5D23';
    return '#7A9450';
  };

  const getRadiusForIntensity = (score: number) => {
    return 15 + (score / 100) * 30;
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
              fillOpacity: 0.3 + (district.intensityScore / 100) * 0.4,
              color: color,
              weight: 2,
              opacity: 0.8,
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
