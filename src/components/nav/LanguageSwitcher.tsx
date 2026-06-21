'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { Locale } from '@/lib/i18n/getDictionary';

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        className="btn-secondary flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{LANGUAGE_LABELS[locale]}</span>
        <svg className={`w-3 h-3 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right border border-stone bg-parchment-tint">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {(Object.entries(LANGUAGE_LABELS) as [Locale, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setLocale(key);
                  setIsOpen(false);
                }}
                className={`${
                  locale === key
                    ? 'bg-sage/10 text-sage font-bold border-l-2 border-sage'
                    : 'text-charcoal-muted hover:bg-parchment-dark hover:text-charcoal border-l-2 border-transparent'
                 } block w-full px-4 py-2 text-left text-sm cursor-pointer`}
                role="menuitem"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
