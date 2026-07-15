'use client'

import { useState, useEffect } from 'react'
import type { WeatherData } from '@/components/map/MapInner'

const STATES = [
  { name: 'Punjab', lat: 30.901, lng: 75.8573, zone: 'north' as const },
  { name: 'Haryana', lat: 29.6857, lng: 76.9905, zone: 'north' as const },
  { name: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, zone: 'north' as const },
  { name: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577, zone: 'central' as const },
  { name: 'Maharashtra', lat: 18.5204, lng: 73.8567, zone: 'west' as const },
  { name: 'Karnataka', lat: 12.9716, lng: 77.5946, zone: 'south' as const },
  { name: 'Telangana', lat: 17.385, lng: 78.4867, zone: 'south' as const },
  { name: 'Andhra Pradesh', lat: 16.5062, lng: 80.648, zone: 'south' as const },
  { name: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, zone: 'south' as const },
  { name: 'Gujarat', lat: 23.0225, lng: 72.5714, zone: 'west' as const },
  { name: 'Bihar', lat: 25.5941, lng: 85.1376, zone: 'east' as const },
  { name: 'Rajasthan', lat: 26.9124, lng: 75.7873, zone: 'north' as const },
  { name: 'Odisha', lat: 20.2961, lng: 85.8245, zone: 'east' as const },
  { name: 'West Bengal', lat: 22.5726, lng: 88.3639, zone: 'east' as const },
  { name: 'Chhattisgarh', lat: 21.2514, lng: 81.6296, zone: 'central' as const },
  { name: 'Jharkhand', lat: 23.3441, lng: 85.3096, zone: 'east' as const },
  { name: 'Assam', lat: 26.1445, lng: 91.7362, zone: 'northeast' as const },
  { name: 'Kerala', lat: 9.9312, lng: 76.2673, zone: 'south' as const },
  { name: 'Uttarakhand', lat: 30.3165, lng: 78.0322, zone: 'north' as const },
  { name: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734, zone: 'north' as const },
]

const SEASON_TEMPS = {
  kharif: { north: 34, south: 29, east: 32, west: 33, central: 31, northeast: 28 },
  rabi: { north: 22, south: 27, east: 25, west: 26, central: 24, northeast: 20 },
  zaid: { north: 38, south: 32, east: 35, west: 36, central: 37, northeast: 30 },
} as const

function getSeason(): 'kharif' | 'rabi' | 'zaid' {
  const m = new Date().getMonth()
  if (m >= 5 && m <= 9) return 'kharif'
  if (m >= 10 || m <= 3) return 'rabi'
  return 'zaid'
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    let cancelled = false

    function fallback() {
      if (cancelled) return
      const season = getSeason()
      const temps = SEASON_TEMPS[season]
      const data = STATES.map(s => ({
        state: s.name,
        lat: s.lat,
        lng: s.lng,
        temp: Math.round((temps[s.zone] || 28) + (Math.random() - 0.5) * 4),
      }))
      setWeather(data)
      setLoading(false)
    }

    if (!apiKey) {
      fallback()
      return
    }

    Promise.all(
      STATES.map(async (s) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lng}&appid=${apiKey}&units=metric`
        const res = await fetch(url)
        if (!res.ok) return null
        const data = await res.json()
        return { state: s.name, lat: s.lat, lng: s.lng, temp: Math.round(data.main.temp) }
      })
    ).then(results => {
      if (cancelled) return
      const real = results.filter(Boolean) as WeatherData[]
      if (real.length > 0) {
        setWeather(real)
      } else {
        fallback()
      }
      setLoading(false)
    }).catch(() => {
      if (!cancelled) fallback()
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [])

  return { weather, loading }
}
