import { routeFiltersMap, fallbackFilters } from "../../../routes/routeFiltersMap";

/**
 * Esta função serve para devolver um conjunto de filtros baseado
 * na rota (pathname) e na aba (tab) que o usuário selecionou. Caso
 * a gente não encontre uma rota ou tab compatível, usamos o fallback.
 */
export function getFiltersForRoute(
  pathname: string,
  tab: string | null
): Record<string, any> {
  // Primeiro a gente procura uma rota "chave" que esteja contida no pathname.
  // Por exemplo, se nosso pathname for "/observatorio/aeroportos/..."
  // e nossa chave for "/observatorio/aeroportos", teremos um match.
  const foundRouteKey = Object.keys(routeFiltersMap).find((route) =>
    pathname.includes(route)
  );

  // Se encontrou uma rota compatível, a gente busca no nosso map
  // as tabs disponíveis para essa rota.
  if (foundRouteKey) {
    const tabToFilters = routeFiltersMap[foundRouteKey];

    // Se de fato for um objeto (por exemplo, { anac: anacFilters, aena: aenaFilters }),
    // tentamos achar a aba (tab) solicitada. Se não tiver tab ou não achar,
    // voltamos pro fallback.
    if (typeof tabToFilters === "object") {
      const filtersForTab = (tab && tabToFilters[tab]) || null;

      if (filtersForTab) {
        return filtersForTab;
      }

      // Se a aba não existe nesse map, a gente recorre ao fallbackFilters.
      return fallbackFilters;
    }
  }

  // Se não achamos nada que corresponda ao pathname, devolvemos também o fallback.
  return fallbackFilters;
}