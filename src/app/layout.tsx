import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { CookieBanner } from "@/components/CookieBanner";
import { geistMono, inter, outfit } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "EcoTrace Green Solutions Ltd",
  description: "Advanced autonomous scientific traceability platform.",
  icons: {
    icon: [{ url: "/favicon.png?v=1" }, { url: "/icon.png?v=1" }],
    apple: [{ url: "/apple-touch-icon.png?v=1" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <AppProviders>
          {children}
          <CookieBanner />
        </AppProviders>
      </body>
    </html>
  );
}
