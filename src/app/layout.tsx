import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, DM_Sans, DM_Mono, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { locales, Locale } from "@/lib/i18n/getDictionary";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import Header from "@/components/layout/Header";
import ClickSparkWrapper from "@/components/ui/ClickSparkWrapper";
import { GlobalErrorHandler } from "@/components/ui/GlobalErrorHandler";
import InstallPrompt from "@/components/ui/InstallPrompt";
import ChatBot from "@/components/chat/ChatBot";

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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const blanka = localFont({
  src: "../../public/fonts/Blanka.otf",
  variable: "--font-blanka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apentomos - Pest Early Warning System",
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
    "google": "notranslate",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("apentomos-locale")?.value || "en";
  const locale = locales.includes(rawLocale as Locale) ? rawLocale : "en";
  return (
    <html lang={locale} className={cn("scroll-smooth", playfair.variable, dmSans.variable, dmMono.variable, inter.variable, blanka.variable)}>
      <body className="font-sans antialiased min-h-screen flex flex-col notranslate">
        <ClickSparkWrapper>
          <AuthProvider>
            <LocaleProvider>
              <GlobalErrorHandler>
                <div className="min-h-screen bg-parchment">
                  <Header />
                  <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10">
                    {children}
                  </div>
                </div>
                <InstallPrompt />
                <ChatBot />
              </GlobalErrorHandler>
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
