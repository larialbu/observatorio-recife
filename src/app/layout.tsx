// app/layout.tsx
"use client";
import { useState, createContext, useContext } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { SeoMeta } from "@/components/@global/seo/seo_headers";

const LoadingContext = createContext<{
  loading: boolean;
  setLoading: (value: boolean) => void;
}>({ loading: false, setLoading: () => {} });

export function useLoading() {
  return useContext(LoadingContext);
}

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <html lang="pt-br">
      <head>
        <SeoMeta />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>
      <body className={poppins.className}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          {loading && <LoadingScreen />}
          {children}
        </LoadingContext.Provider>
      </body>
    </html>
  );
}