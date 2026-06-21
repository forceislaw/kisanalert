'use client'

import React from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: string
  trend?: { value: number; isUp: boolean }
  color?: 'primary' | 'warning' | 'danger' | 'info'
}

export default function MetricCard({ title, value, subtitle, trend, color = 'primary' }: MetricCardProps) {
  const isAlert = color === 'danger' || color === 'warning'

  return (
    <div className={isAlert ? 'card-alert p-4' : 'card-editorial p-4'}>
      <span className="eyebrow block mb-1">{title}</span>
      <span className="block text-3xl font-mono font-bold text-charcoal">{value}</span>
      {subtitle && <span className="block text-xs text-charcoal-muted mt-1">{subtitle}</span>}
      {trend && (
        <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trend.isUp ? 'text-terra' : 'text-sage'}`}>
          <span>{trend.isUp ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}% {trend.isUp ? 'increase' : 'decrease'}</span>
        </div>
      )}
    </div>
  )
}
