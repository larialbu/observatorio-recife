type AdditionalFilter = {
  label?: string;
  selected?: string[] | string;
};

type FiltersLike = {
  year?: string;
  ano?: string;
  years?: string[];
  months?: any[];
  additionalFilters?: AdditionalFilter[];
};

function normalizeText(value?: string | null) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function getSelectedAdditionalFilter(
  filters: FiltersLike | undefined,
  label: string,
  fallback = ""
) {
  const additionalFilters = filters?.additionalFilters || [];

  const found = additionalFilters.find((item) =>
    normalizeText(item.label).includes(normalizeText(label))
  );

  const selected = found?.selected;

  if (Array.isArray(selected)) {
    return String(selected[0] || fallback);
  }

  return String(selected || fallback);
}

function getSelectedMonths(filters: FiltersLike | undefined) {
  const months: string[] = [];

  if (Array.isArray(filters?.months)) {
    filters.months.forEach((monthFilter: any) => {
      const selected = monthFilter?.selected;

      if (Array.isArray(selected)) {
        months.push(...selected.map(String));
      } else if (selected) {
        months.push(String(selected));
      }
    });
  }

  const monthFromAdditionalFilters = getSelectedAdditionalFilter(filters, "MÊS", "");

  if (monthFromAdditionalFilters) {
    months.push(monthFromAdditionalFilters);
  }

  return Array.from(new Set(months.filter(Boolean)));
}

function getYearFromFilters(filters: FiltersLike | undefined) {
  if (filters?.year) return String(filters.year);
  if (filters?.ano) return String(filters.ano);

  if (Array.isArray(filters?.years) && filters.years.length > 0) {
    return String(filters.years[filters.years.length - 1]);
  }

  return "2024";
}

function extractFilters(arg1?: any, arg2?: any, arg3?: any): FiltersLike {
  if (arg1?.filters) return arg1.filters;

  if (arg3?.additionalFilters || arg3?.years || arg3?.year) {
    return arg3;
  }

  if (arg2?.additionalFilters || arg2?.years || arg2?.year) {
    return arg2;
  }

  if (arg1?.additionalFilters || arg1?.years || arg1?.year) {
    return arg1;
  }

  return {};
}

export async function combustiveisDataService(
  arg1?: any,
  arg2?: any,
  arg3?: any
) {
  const filters = extractFilters(arg1, arg2, arg3);

  const year = getYearFromFilters(filters);

  const produto = getSelectedAdditionalFilter(
    filters,
    "PRODUTO",
    "Gasolina Comum"
  );

  const regiao = getSelectedAdditionalFilter(filters, "REGIÃO", "");
  const estado = getSelectedAdditionalFilter(filters, "ESTADO", "PE");

  const municipio = getSelectedAdditionalFilter(
    filters,
    "MUNICÍPIO",
    "Recife"
  );

  const selectedMonths = getSelectedMonths(filters);

  const params = new URLSearchParams();

  params.set("year", year || "2024");
  params.set("produto", produto || "Gasolina Comum");
  params.set("estado", estado || "PE");

  if (municipio && normalizeText(municipio) !== "TODOS") {
    params.set("municipio", municipio);
  }

  if (regiao && normalizeText(regiao) !== "TODAS") {
    params.set("regiao", regiao);
  }

  if (selectedMonths.length > 0) {
    params.set("months", selectedMonths.join(","));
  }

  const response = await fetch(
    `/api/data/combustiveis/geral?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");

    throw new Error(errorText || "Erro ao carregar dados de combustíveis.");
  }

  return response.json();
}

export default combustiveisDataService;
