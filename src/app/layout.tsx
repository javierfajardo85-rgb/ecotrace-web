import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { CookieBanner } from "@/components/CookieBanner";
import { geistMono, inter, outfit } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "EcoTrace Green Solutions Ltd",
  description: "Advanced autonomous scientific traceability platform.",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png", sizes: "512x512" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "192x192" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png?v=2", type: "image/png", sizes: "180x180" }],
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
      <body className="flex min-h-full flex-col">
        <AppProviders>
          <div className="min-w-0">
            {children}
            <CookieBanner />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
