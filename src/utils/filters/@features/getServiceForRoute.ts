import { routeServicesMap } from "@/routes/routeServicesMap";

export function getServiceForRoute(
    pathname: string,
    tab: string | null
  ): any {
    // Ex: "/observatorio/aeroportos"
    const foundRouteKey = Object.keys(routeServicesMap).find((route) =>
      pathname.includes(route)
    );
  
    if (foundRouteKey) {
      const servicesForTabs = routeServicesMap[foundRouteKey];
      if (typeof servicesForTabs === "object" && tab && servicesForTabs[tab]) {
        
        return servicesForTabs[tab];
      }
  
      // Se não achar tab específica, tenta alguma default, 
      // ou retorna null se quiser um fallback
      // ...
    }
  
    // fallback
    return null;
  }
  