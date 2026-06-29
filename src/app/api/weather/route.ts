import { NextResponse } from 'next/server'

const CITIES = [
  { name: 'Ludhiana', state: 'Punjab', lat: 30.901, lng: 75.8573 },
  { name: 'Karnal', state: 'Haryana', lat: 29.6857, lng: 76.9905 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Belagavi', state: 'Karnataka', lat: 15.8497, lng: 74.4977 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.4867 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.648 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245 },
]

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 })
  }

  try {
    const results = await Promise.all(
      CITIES.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}&units=metric`
        const res = await fetch(url)
        if (!res.ok) return null
        const data = await res.json()
        return {
          name: city.name,
          state: city.state,
          lat: city.lat,
          lng: city.lng,
          temp: Math.round(data.main.temp),
        }
      })
    )

    return NextResponse.json({ weather: results.filter(Boolean) })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}
