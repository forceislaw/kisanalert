'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { DistrictHeatData } from './DistrictHeatLayer';
import { MarkerData } from './MapInner';

const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-parchment-tint border border-stone">
      <p className="text-sm text-charcoal-muted font-sans">Loading map...</p>
    </div>
  ),
});

interface MapShellProps {
  heatData?: DistrictHeatData[];
  markers?: MarkerData[];
  center?: [number, number];
  zoom?: number;
}

export default function MapShell({ heatData = [], markers = [], center, zoom }: MapShellProps) {
  return (
    <div className="w-full h-[500px] lg:h-[600px] relative">
      <MapInner 
        heatData={heatData} 
        markers={markers} 
        center={center} 
        zoom={zoom} 
      />
    </div>
  );
}
