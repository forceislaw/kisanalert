'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { MarkerData } from './MapInner';
import { useLocale } from '@/lib/i18n/LocaleProvider';

function MapLoading() {
  const { dict } = useLocale();
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-parchment-tint border border-stone">
      <p className="text-sm text-charcoal-muted font-sans">{dict.ui.loadingMap}</p>
    </div>
  );
}

const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => <MapLoading />,
});

interface MapShellProps {
  markers?: MarkerData[];
  center?: [number, number];
  zoom?: number;
}

export default function MapShell({ markers = [], center, zoom }: MapShellProps) {
  return (
    <div className="w-full h-[50vh] min-h-[350px] lg:h-[600px] relative">
      <MapInner 
        markers={markers} 
        center={center} 
        zoom={zoom} 
      />
    </div>
  );
}
