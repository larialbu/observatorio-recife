
import { useBundleContext } from '@/context/BundleContext';
import { useLoading } from '@/context/LoadingContext';

export function usePageBundle() {
  const { bundleReady, error, currentBundle } = useBundleContext();
  const { loading } = useLoading(); 
  
  return {
    isReady: bundleReady,
    isLoading: loading, 
    error,
    bundleName: currentBundle,
  };
}