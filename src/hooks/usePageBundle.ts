import { useBundleContext } from '@/context/BundleContext';

export function usePageBundle() {
  const { bundleReady, loading, error, currentBundle } = useBundleContext();
  
  return {
    isReady: bundleReady,
    isLoading: loading,
    error,
    bundleName: currentBundle,
  };
}