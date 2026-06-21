'use client'

import React, { useState, useEffect } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface DataPoint {
  date: string
  reports: number
  critical: number
}

const defaultData: DataPoint[] = [
  { date: '--', reports: 0, critical: 0 },
  { date: '--', reports: 0, critical: 0 },
  { date: '--', reports: 0, critical: 0 },
  { date: '--', reports: 0, critical: 0 },
  { date: '--', reports: 0, critical: 0 },
  { date: '--', reports: 0, critical: 0 },
  { date: '--', reports: 0, critical: 0 },
]

export default function OutbreakTrendChart() {
  const [data, setData] = useState<DataPoint[]>(defaultData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard')
        const json = await res.json()
        if (json.data?.trendData) setData(json.data.trendData)
      } catch {
        // keep default
      }
    }
    fetchData()
  }, [])

  return (
    <div className="card-editorial p-5">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="reportsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A5D23" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4A5D23" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="criticalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E07A5F" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#E07A5F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#D1CCC3" strokeOpacity={0.5} />
            <XAxis dataKey="date" tick={{ fill: '#6B6560', fontSize: 11 }} axisLine={{ stroke: '#D1CCC3' }} tickLine={false} />
            <YAxis tick={{ fill: '#6B6560', fontSize: 11 }} axisLine={{ stroke: '#D1CCC3' }} tickLine={false} width={40} />
            <Tooltip
              contentStyle={{
                background: '#FDFCFA',
                border: '1px solid #D1CCC3',
                borderRadius: '0px',
                color: '#1C1917',
                fontSize: '12px',
                boxShadow: '3px 3px 0px 0px #1C1917',
              }}
            />
            <Area type="monotone" dataKey="reports" stroke="#4A5D23" fill="url(#reportsGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="critical" stroke="#E07A5F" fill="url(#criticalGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
