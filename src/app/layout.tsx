// RootLayout.tsx
"use client";
import { useState, createContext, useContext } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/home/LoadingScreen";

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
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
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
