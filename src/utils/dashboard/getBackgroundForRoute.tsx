export const getBackgroundForRoute = (pathname: string): string => {
  const backgroundClasses: Record<string, string> = {
    "/observatorio/balanca-comercial": "bg-[url('/images/backgrounds/dashboard/light/bal_comercial.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/bal_comercial.avif')]",
    "/observatorio/aeroportos": "bg-[url('/images/backgrounds/dashboard/light/aeroportos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/aeroportos.avif')]",
    "/observatorio/ipca": "bg-[url('/images/backgrounds/dashboard/light/ipca.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/ipca.avif')]",
    "/observatorio/ranking-municipios": "bg-[url('/images/backgrounds/dashboard/light/ranking.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/ranking.avif')]",
    "/observatorio/portos": "bg-[url('/images/backgrounds/dashboard/light/portos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/portos.avif')]",
    "/observatorio/pib": "bg-[url('/images/backgrounds/dashboard/light/pib.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/pib.avif')]",
    "/observatorio/empregos": "bg-[url('/images/backgrounds/dashboard/light/empregos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/empregos.avif')]",
    "/observatorio/rais": "bg-[url('/images/backgrounds/dashboard/light/empregos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/empregos.avif')]",
    "/observatorio/micro-caged": "bg-[url('/images/backgrounds/dashboard/light/caged.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/caged.avif')]",
    "/observatorio/empresas": "bg-[url('/images/backgrounds/dashboard/light/empresas.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/empresas.avif')]",
    "/observatorio/tributos": "bg-[url('/images/backgrounds/dashboard/light/tributos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/tributos.avif')]",
    "/observatorio/capag": "bg-[url('/images/backgrounds/dashboard/light/capag.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/capag.avif')]",
    "/observatorio/panorama": "bg-[url('/images/backgrounds/home_background.avif')] dark:bg-[url('/images/backgrounds/home_background.avif')]",
  };

  return backgroundClasses[pathname] ?? "bg-[#F7F8FA] dark:bg-[#0C1B2B]";
};