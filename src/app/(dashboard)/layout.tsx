import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-1 bg-[#F7F8FA] overflow-scroll flex flex-col">
          <Navbar />
          {children}
        </div>
      </div>
    </DashboardProvider>
  );
}
