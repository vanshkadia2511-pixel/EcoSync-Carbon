import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";
import AuthProvider from "@/components/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoTrack — AI Carbon Footprint Tracker",
  description: "Track your lifestyle. Reduce your carbon impact with AI-powered personalized sustainability coaching powered by Google Vertex AI Gemini.",
  manifest: "/manifest.json",
  keywords: ["carbon footprint", "sustainability", "climate action", "AI coach", "eco tracker", "CO2", "green living"],
  authors: [{ name: "EcoTrack" }],
  openGraph: {
    title: "EcoTrack — AI Carbon Footprint Tracker",
    description: "Track your lifestyle. Reduce your carbon impact with AI-powered personalized sustainability coaching.",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[var(--color-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <PWARegister />
          {children}
        </AuthProvider>
      </body>

    </html>
  );
}
