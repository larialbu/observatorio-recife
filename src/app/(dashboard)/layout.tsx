"use client";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/home/LoadingScreen";

import Navbar from "@/components/random_temp/Navbar";
import { Sidebar } from "@/components/random_temp/Sidebar";
import { DashboardProvider } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";
import HiddenChartsPanel from "@/components/@global/features/HiddenChartsPanel";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define backgrounds para cada rota específica
  const getBackgroundForRoute = () => {
    switch (pathname) {
      case "/observatorio/balanca-comercial":
        return "bg-[url('/images/backgrounds/dashboard/bal_comercial.png')]";
      case "/observatorio/aeroportos":
        return "bg-[url('/images/backgrounds/dashboard/aeroportos.png')]";
      case "/observatorio/ipca":
        return "bg-[url('/images/backgrounds/dashboard/ipca.png')]";
      case "/observatorio/ranking-municipios":
        return "bg-[url('/images/backgrounds/dashboard/ranking.png')]";
      case "/observatorio/portos":
        return "bg-[url('/images/backgrounds/dashboard/portos.png')]";
        case "/observatorio/pib":
        return "bg-[url('/images/backgrounds/dashboard/pib.png')]";
      case "/observatorio/panorama":
        return "bg-[url('/images/backgrounds/dashboard/ipca.png')]";
      default:
        return "bg-[#F7F8FA]";
    }
  };

  return (
    <Suspense fallback={< LoadingScreen />}>
      <DashboardProvider>
        <div className="h-screen flex overflow-hidden">
          <Sidebar />
          <div
            className={`flex-1 ${getBackgroundForRoute()} bg-cover overflow-scroll flex flex-col pb-[1em]`}
          >
            <Navbar />
            <HiddenChartsPanel />
            {children}
          </div>
        </div>
      </DashboardProvider>
    </Suspense>
  );
}