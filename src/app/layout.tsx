import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configuração da fonte Poppins
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Observatório Econômico do Recife",
  description: "Observatório Econômico do Recife",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        {/* Link para o favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
