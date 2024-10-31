"use client";

import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { DashboardProvider } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define backgrounds para cada rota específica
  const getBackgroundForRoute = () => {
    switch (pathname) {
      case "/observatorio/bal-comercial":
        return "bg-[url('/images/backgrounds/dashboard/bal_comercial.png')]";
      case "/observatorio/aeroportos":
        return "bg-[url('/images/backgrounds/dashboard/aeroportos.png')]";
      default:
        return "bg-[#F7F8FA]";
    }
  };

  return (
    <DashboardProvider>
      <div className="h-screen flex">
        <Sidebar />
        <div className={`flex-1 ${getBackgroundForRoute()} bg-cover overflow-scroll flex flex-col`}>
          <Navbar />
          {children}
        </div>
      </div>
    </DashboardProvider>
  );
}
