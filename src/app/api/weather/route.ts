import { NextResponse } from 'next/server'

const STATES = [
  { name: 'Punjab', city: 'Ludhiana', lat: 30.901, lng: 75.8573 },
  { name: 'Haryana', city: 'Karnal', lat: 29.6857, lng: 76.9905 },
  { name: 'Uttar Pradesh', city: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { name: 'Madhya Pradesh', city: 'Indore', lat: 22.7196, lng: 75.8577 },
  { name: 'Maharashtra', city: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Karnataka', city: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Telangana', city: 'Hyderabad', lat: 17.385, lng: 78.4867 },
  { name: 'Andhra Pradesh', city: 'Vijayawada', lat: 16.5062, lng: 80.648 },
  { name: 'Tamil Nadu', city: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  { name: 'Gujarat', city: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Bihar', city: 'Patna', lat: 25.5941, lng: 85.1376 },
  { name: 'Rajasthan', city: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Odisha', city: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
  { name: 'West Bengal', city: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Chhattisgarh', city: 'Raipur', lat: 21.2514, lng: 81.6296 },
  { name: 'Jharkhand', city: 'Ranchi', lat: 23.3441, lng: 85.3096 },
  { name: 'Assam', city: 'Guwahati', lat: 26.1445, lng: 91.7362 },
  { name: 'Kerala', city: 'Kochi', lat: 9.9312, lng: 76.2673 },
  { name: 'Uttarakhand', city: 'Dehradun', lat: 30.3165, lng: 78.0322 },
  { name: 'Himachal Pradesh', city: 'Shimla', lat: 31.1048, lng: 77.1734 },
]

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 })
  }

  try {
    const results = await Promise.all(
      STATES.map(async (s) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lng}&appid=${apiKey}&units=metric`
        const res = await fetch(url)
        if (!res.ok) return null
        const data = await res.json()
        return {
          state: s.name,
          lat: s.lat,
          lng: s.lng,
          temp: Math.round(data.main.temp),
        }
      })
    )

    return NextResponse.json({ weather: results.filter(Boolean) })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}
