"use client";
import { useBundleContext } from "@/context/BundleContext";
import { BundleErrorScreen } from "@/components/@global/features/BundleErrorScreen";

interface PageRendererProps {
  children: React.ReactNode;
}

export function PageRenderer({ children }: PageRendererProps) {
  const { bundleReady, error, currentBundle } = useBundleContext();
  
  if (error) {
    return <BundleErrorScreen error={error} />;
  }
  
  if (!currentBundle || bundleReady) {
      return <>{children}</>;
  }
  
  return null;
}