import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getDictionary, locales, Locale } from "@/lib/i18n/getDictionary";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import Header from "@/components/layout/Header";
import ClickSparkWrapper from "@/components/ui/ClickSparkWrapper";
import InstallPrompt from "@/components/ui/InstallPrompt";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KisanAlert - Pest Early Warning System",
  description: "Enterprise geospatial monitoring for agricultural pest outbreaks",
  manifest: "/manifest.json",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  other: {
    "theme-color": "#F7F5F0",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("kisanalert-locale")?.value || "en";
  const locale = locales.includes(rawLocale as Locale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} className={cn("scroll-smooth", playfair.variable, dmSans.variable, dmMono.variable)}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ClickSparkWrapper>
          <AuthProvider>
            <LocaleProvider serverLocale={locale} serverDictionary={dictionary}>
              <div className="min-h-screen bg-parchment">
                <Header />
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10">
                  {children}
                </div>
              </div>
              <InstallPrompt />
            </LocaleProvider>
          </AuthProvider>
        </ClickSparkWrapper>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js')`,
          }}
        />
      </body>
    </html>
  );
}
