'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PulseMarker from './PulseMarker';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapReadyListener({ onReady }: { onReady: () => void }) {
  const map = useMap()
  useEffect(() => {
    map.whenReady(onReady)
  }, [map, onReady])
  return null
}

function FitBounds({ markers, center, zoom, ready }: { markers: MarkerData[]; center: [number, number]; zoom: number; ready: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!ready) return
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 })
    } else {
      map.setView(center, zoom);
    }
  }, [markers, center, zoom, map, ready]);
  return null;
}

export interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  cropName: string;
  pestName: string;
  reportedAt: string;
}

export interface WeatherData {
  state: string;
  lat: number;
  lng: number;
  temp: number;
}

function WeatherMarkers({ weather }: { weather: WeatherData[] }) {
  const map = useMap();

  useEffect(() => {
    if (!weather.length) return;

    const markers = weather.map(w => {
      const icon = L.divIcon({
        className: 'weather-marker',
        html: `
          <div style="
            background: #E07A5F;
            color: #F7F5F0;
            padding: 4px 12px;
            border-radius: 999px;
            font-family: 'DM Sans', sans-serif;
            font-size: 10px;
            text-align: center;
            line-height: 1.2;
            white-space: nowrap;
            cursor: default;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            transition: transform 0.15s, box-shadow 0.15s;
          "
          onmouseenter="this.style.transform='scale(1.1)';this.style.boxShadow='0 3px 10px rgba(0,0,0,0.25)'"
          onmouseleave="this.style.transform='scale(1)';this.style.boxShadow='0 2px 6px rgba(0,0,0,0.15)'">
            <span style="font-weight: 600; font-size: 9px; opacity: 0.9;">${w.state}</span>
            <span style="font-size: 14px; font-weight: 700; margin-left: 4px;">${w.temp}°</span>
          </div>
        `,
        iconSize: [80, 36],
        iconAnchor: [40, 18],
      });

      return L.marker([w.lat, w.lng], { icon }).addTo(map);
    });

    return () => {
      markers.forEach(m => m.remove());
    };
  }, [weather, map]);

  return null;
}

interface MapInnerProps {
  markers: MarkerData[];
  weather?: WeatherData[];
  center?: [number, number];
  zoom?: number;
}

export default function MapInner({ 
  markers, 
  weather = [],
  center = [17.5, 76.5],
  zoom = 7 
}: MapInnerProps) {
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => setReady(true), [])

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <MapReadyListener onReady={handleReady} />
      <FitBounds markers={markers} center={center} zoom={zoom} ready={ready} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={20}
      />
      {ready && markers.map(marker => (
        <PulseMarker key={marker.id} {...marker} />
      ))}
      {ready && weather.length > 0 && (
        <WeatherMarkers weather={weather} />
      )}
    </MapContainer>
  );
}
