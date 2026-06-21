'use client';

import React from 'react';
import { useLocale } from '@/lib/i18n/LocaleProvider';

type Severity = 'low' | 'medium' | 'high' | 'critical';

export default function SeverityBadge({ severity }: { severity: Severity | string }) {
  const { dict } = useLocale();

  const getSeverityConfig = (s: string) => {
    switch (s.toLowerCase()) {
      case 'critical':
        return { label: dict.common.critical, borderClass: 'severity-critical' };
      case 'high':
        return { label: dict.common.high, borderClass: 'severity-high' };
      case 'medium':
        return { label: dict.common.medium, borderClass: 'severity-medium' };
      case 'low':
        return { label: dict.common.low, borderClass: 'severity-low' };
      default:
        return { label: s, borderClass: 'border border-stone text-charcoal-muted' };
    }
  };

  const config = getSeverityConfig(severity);

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold border ${config.borderClass}`}>
      {config.label}
    </span>
  );
}
