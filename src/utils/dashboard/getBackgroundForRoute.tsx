export const getBackgroundForRoute = (pathname: string) => {
  switch (pathname) {
    case "/observatorio/balanca-comercial":
      return "bg-[url('/images/backgrounds/dashboard/light/bal_comercial.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/bal_comercial.avif')]";
    case "/observatorio/aeroportos":
      return "bg-[url('/images/backgrounds/dashboard/light/aeroportos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/aeroportos.avif')]";
    case "/observatorio/ipca":
      return "bg-[url('/images/backgrounds/dashboard/light/ipca.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/ipca.avif')]";
    case "/observatorio/ranking-municipios":
      return "bg-[url('/images/backgrounds/dashboard/light/ranking.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/ranking.avif')]";
    case "/observatorio/portos":
      return "bg-[url('/images/backgrounds/dashboard/light/portos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/portos.avif')]";
    case "/observatorio/pib":
      return "bg-[url('/images/backgrounds/dashboard/light/pib.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/pib.avif')]";
    case "/observatorio/empregos":
    case "/observatorio/rais":
      return "bg-[url('/images/backgrounds/dashboard/light/empregos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/empregos.avif')]";
    case "/observatorio/micro-caged":
      return "bg-[url('/images/backgrounds/dashboard/light/caged.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/caged.avif')]";         
    case "/observatorio/empresas":
      return "bg-[url('/images/backgrounds/dashboard/light/empresas.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/empresas.avif')]";
    case "/observatorio/tributos":
      return "bg-[url('/images/backgrounds/dashboard/light/tributos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/tributos.avif')]";
    default:
      return "bg-[#F7F8FA] dark:bg-[#0C1B2B]";
  }
};