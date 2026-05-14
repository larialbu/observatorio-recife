import { routeServicesMap } from "@/routes/routeServicesMap";

/**
 * Retorna o service correto de acordo com a rota e a aba atual.
 * Exemplo:
 * pathname: /observatorio/combustiveis
 * tab: geral
 */
export function getServiceForRoute(pathname: string, tab: string | null): any {
  const foundRouteKey = Object.keys(routeServicesMap)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.includes(route));

  if (!foundRouteKey) {
    return null;
  }

  const servicesForTabs = routeServicesMap[foundRouteKey];

  if (!servicesForTabs || typeof servicesForTabs !== "object") {
    return null;
  }

  const tabSelected = tab || "geral";

  if (servicesForTabs[tabSelected]) {
    return servicesForTabs[tabSelected];
  }

  if (servicesForTabs.geral) {
    return servicesForTabs.geral;
  }

  const firstService = Object.values(servicesForTabs)[0];

  return firstService || null;
}
