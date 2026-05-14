import { routeFiltersMap, fallbackFilters } from "../../../routes/routeFiltersMap";

/**
 * Retorna os filtros corretos de acordo com a rota e a aba atual.
 * Exemplo:
 * pathname: /observatorio/combustiveis
 * tab: geral
 */
export function getFiltersForRoute(pathname: string, tab: string | null): any {
  const foundRouteKey = Object.keys(routeFiltersMap)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.includes(route));

  if (!foundRouteKey) {
    return fallbackFilters;
  }

  const tabToFilters = routeFiltersMap[foundRouteKey];

  if (!tabToFilters || typeof tabToFilters !== "object") {
    return fallbackFilters;
  }

  const tabSelected = tab || "geral";

  if (tabToFilters[tabSelected]) {
    return tabToFilters[tabSelected];
  }

  if (tabToFilters.geral) {
    return tabToFilters.geral;
  }

  return fallbackFilters;
}
