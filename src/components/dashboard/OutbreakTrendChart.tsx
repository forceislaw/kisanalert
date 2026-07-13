'use client'

import React, { useState, useEffect } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface DataPoint {
  date: string
  reports: number
  critical: number
}

function makeEmptyData(count: number): DataPoint[] {
  return Array.from({ length: count }, () => ({
    date: '--',
    reports: 0,
    critical: 0,
  }))
}

export default function OutbreakTrendChart({ days }: { days?: number }) {
  const bucketCount = (days && days > 0) ? Math.min(days, 30) : 30
  const [data, setData] = useState<DataPoint[]>(() => makeEmptyData(bucketCount))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = days && days > 0 ? `?days=${days}` : ''
        const res = await fetch(`/api/dashboard${params}`)
        const json = await res.json()
        if (json.data?.trendData) setData(json.data.trendData)
      } catch {
        setData(makeEmptyData(bucketCount))
      }
    }
    fetchData()
  }, [days, bucketCount])

  const isSkeleton = data.length === bucketCount && data[0]?.date === '--'

  if (isSkeleton) {
    return (
      <div className="card-editorial p-5">
        <div className="h-64 flex items-center justify-center">
          <div className="space-y-3 w-full max-w-xs">
            <div className="h-3 w-full bg-stone-tint animate-pulse" />
            <div className="h-3 w-5/6 bg-stone-tint animate-pulse" />
            <div className="h-3 w-4/6 bg-stone-tint animate-pulse" />
            <div className="h-3 w-5/6 bg-stone-tint animate-pulse" />
            <div className="h-3 w-full bg-stone-tint animate-pulse" />
            <div className="h-3 w-3/6 bg-stone-tint animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

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
            <XAxis dataKey="date" tick={{ fill: '#6B6560', fontSize: 10 }} axisLine={{ stroke: '#D1CCC3' }} tickLine={false} interval="preserveStartEnd" />
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
