'use client';

import React, { createContext, useContext, useState } from 'react';
import { getDictionary, Dictionary, Locale, locales } from './getDictionary';

const COOKIE_NAME = 'apentomos-locale';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
}

interface LocaleContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  children,
  serverLocale,
  serverDictionary,
}: {
  children: React.ReactNode;
  serverLocale: string;
  serverDictionary: Dictionary;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const cookie = getCookie(COOKIE_NAME) as Locale;
    if (cookie && locales.includes(cookie)) return cookie;
    return (locales.includes(serverLocale as Locale) ? serverLocale : 'en') as Locale;
  });
  const [dict, setDict] = useState<Dictionary>(() => {
    const cookie = getCookie(COOKIE_NAME) as Locale;
    if (cookie && locales.includes(cookie)) return getDictionary(cookie);
    return serverDictionary;
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDict(getDictionary(newLocale));
    setCookie(COOKIE_NAME, newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
