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
            background: #FDFCFA;
            color: #1C1917;
            padding: 5px 14px 5px 10px;
            border-radius: 999px;
            font-family: 'DM Sans', sans-serif;
            font-size: 11px;
            text-align: center;
            line-height: 1.2;
            white-space: nowrap;
            cursor: pointer;
            border: 1px solid #D1CCC3;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          "
          onmouseenter="this.style.transform='translateY(-2px) scale(1.05)';this.style.boxShadow='0 6px 16px rgba(0,0,0,0.12)';this.style.borderColor='#3D5A45'"
          onmouseleave="this.style.transform='translateY(0) scale(1)';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)';this.style.borderColor='#D1CCC3'">
            <span style="font-weight: 600; letter-spacing: -0.01em;">${w.state}</span>
            <span style="font-size: 15px; font-weight: 700; color: #3D5A45; margin-left: 5px;">${w.temp}°</span>
          </div>
        `,
        iconSize: [180, 38],
        iconAnchor: [90, 19],
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
