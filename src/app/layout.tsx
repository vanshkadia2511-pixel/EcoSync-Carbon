import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";
import AuthProvider from "@/components/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSync",
  description: "Track your lifestyle. Reduce your carbon impact.",
  manifest: "/manifest.json",
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
        <AuthProvider>
          <PWARegister />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
