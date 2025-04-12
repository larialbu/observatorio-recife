"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

function WithLoading({ children }: { children: React.ReactNode }) {
  const { loading } = useLoading();
  return (
    <>
      {loading && <LoadingScreen />}
      {children}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <LoadingProvider>
          <WithLoading>{children}</WithLoading>
        </LoadingProvider>
      </body>
    </html>
  );
}
