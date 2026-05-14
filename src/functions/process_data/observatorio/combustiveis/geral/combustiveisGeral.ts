import { AnpCombustiveisHeaders } from "@/@types/observatorio/@fetch/combustiveis";

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const capitalNames = new Set([
  "ARACAJU",
  "BELEM",
  "BELÉM",
  "BELO HORIZONTE",
  "BOA VISTA",
  "BRASILIA",
  "BRASÍLIA",
  "CAMPO GRANDE",
  "CUIABA",
  "CUIABÁ",
  "CURITIBA",
  "FLORIANOPOLIS",
  "FLORIANÓPOLIS",
  "FORTALEZA",
  "GOIANIA",
  "GOIÂNIA",
  "JOAO PESSOA",
  "JOÃO PESSOA",
  "MACAPA",
  "MACAPÁ",
  "MACEIO",
  "MACEIÓ",
  "MANAUS",
  "NATAL",
  "PALMAS",
  "PORTO ALEGRE",
  "PORTO VELHO",
  "RECIFE",
  "RIO BRANCO",
  "RIO DE JANEIRO",
  "SALVADOR",
  "SAO LUIS",
  "SÃO LUÍS",
  "SAO PAULO",
  "SÃO PAULO",
  "TERESINA",
  "VITORIA",
  "VITÓRIA",
]);

type CombustiveisFilters = {
  year?: string;
  ano?: string;
  produto?: string;
  estado?: string;
  municipio?: string;
  regiao?: string;
  month?: string;
  months?: string | string[];
  mes?: string;
  meses?: string | string[];
};

function normalizeText(value?: string | number | null) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function removeUfFromMunicipio(value?: string | null) {
  return normalizeText(value).replace(/\s-\s[A-Z]{2}$/g, "");
}

function matchText(rowValue?: string, filterValue?: string) {
  if (!filterValue) return true;

  const row = normalizeText(rowValue);
  const filter = normalizeText(filterValue);

  if (!filter || filter === "TODOS" || filter === "TODAS") return true;

  return row === filter;
}

function matchMunicipio(rowMunicipio?: string, filterMunicipio?: string) {
  if (!filterMunicipio) return true;

  const row = normalizeText(rowMunicipio);
  const filter = normalizeText(filterMunicipio);

  if (!filter || filter === "TODOS" || filter === "TODAS") return true;

  const rowWithoutUf = removeUfFromMunicipio(rowMunicipio);
  const filterWithoutUf = removeUfFromMunicipio(filterMunicipio);

  return (
    row === filter ||
    rowWithoutUf === filterWithoutUf ||
    row.startsWith(`${filter} -`) ||
    filter.startsWith(`${row} -`)
  );
}

function isCapital(municipio?: string | null) {
  return capitalNames.has(removeUfFromMunicipio(municipio));
}

function monthToNumber(value?: string | number | null) {
  if (value === undefined || value === null || value === "") return 0;

  const asNumber = Number(value);

  if (Number.isFinite(asNumber) && asNumber >= 1 && asNumber <= 12) {
    return asNumber;
  }

  const normalized = normalizeText(value);

  const map: Record<string, number> = {
    JAN: 1,
    JANEIRO: 1,
    FEV: 2,
    FEVEREIRO: 2,
    MAR: 3,
    MARCO: 3,
    MARÇO: 3,
    ABR: 4,
    ABRIL: 4,
    MAI: 5,
    MAIO: 5,
    JUN: 6,
    JUNHO: 6,
    JUL: 7,
    JULHO: 7,
    AGO: 8,
    AGOSTO: 8,
    SET: 9,
    SETEMBRO: 9,
    OUT: 10,
    OUTUBRO: 10,
    NOV: 11,
    NOVEMBRO: 11,
    DEZ: 12,
    DEZEMBRO: 12,
  };

  return map[normalized] || 0;
}

function parseSelectedMonths(filters?: CombustiveisFilters) {
  const rawValues: string[] = [];

  const addRaw = (value?: string | string[]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      rawValues.push(...value.map(String));
      return;
    }

    rawValues.push(...String(value).split(","));
  };

  addRaw(filters?.months);
  addRaw(filters?.meses);
  addRaw(filters?.month);
  addRaw(filters?.mes);

  return Array.from(
    new Set(
      rawValues
        .map((value) => monthToNumber(value.trim()))
        .filter((value) => value >= 1 && value <= 12)
    )
  ).sort((a, b) => a - b);
}

function rowMonth(row: AnpCombustiveisHeaders) {
  return monthToNumber((row as any).mes || (row as any).month || (row as any).mês);
}

function average(values: number[]) {
  const valid = values.filter((value) => Number.isFinite(value) && value > 0);

  if (!valid.length) return 0;

  return Number(
    (valid.reduce((sum, value) => sum + value, 0) / valid.length).toFixed(2)
  );
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function groupAverage(
  rows: AnpCombustiveisHeaders[],
  key: "regiao" | "estado" | "municipio"
) {
  const map = new Map<string, { total: number; count: number }>();

  rows.forEach((row) => {
    const name = row[key] || "Sem informação";
    const price = Number(row.precoMedio || 0);

    if (!price) return;

    const current = map.get(name) || { total: 0, count: 0 };

    map.set(name, {
      total: current.total + price,
      count: current.count + 1,
    });
  });

  return Array.from(map.entries())
    .map(([name, value]) => ({
      name,
      preco: Number((value.total / value.count).toFixed(2)),
    }))
    .sort((a, b) => b.preco - a.preco);
}

function getLinhaPrecoMedio(rows: AnpCombustiveisHeaders[]) {
  return months.map((name, index) => {
    const mes = index + 1;
    const monthRows = rows.filter((row) => rowMonth(row) === mes);

    return {
      name,
      mes: name,
      preco: average(monthRows.map((row) => Number(row.precoMedio || 0))),
      postos: sum(monthRows.map((row) => Number(row.postos || 0))),
    };
  });
}

function getPreviousMonthValue(
  baseRows: AnpCombustiveisHeaders[],
  selectedMonths: number[]
) {
  const monthsWithData = baseRows
    .map((row) => rowMonth(row))
    .filter((month) => month >= 1 && month <= 12);

  if (!monthsWithData.length) return 0;

  const monthToCompare = selectedMonths.length
    ? Math.min(...selectedMonths)
    : Math.max(...monthsWithData);

  if (!monthToCompare || monthToCompare <= 1) {
    return 0;
  }

  const previousMonthRows = baseRows.filter(
    (row) => rowMonth(row) === monthToCompare - 1
  );

  return average(previousMonthRows.map((row) => Number(row.precoMedio || 0)));
}

function getPreviousValidLineValue(linhaPrecoMedio: { preco: number }[]) {
  const validMonths = linhaPrecoMedio.filter((item) => item.preco > 0);

  if (validMonths.length <= 1) {
    return validMonths[0]?.preco || 0;
  }

  return validMonths[validMonths.length - 2]?.preco || 0;
}

function getOptions(data: AnpCombustiveisHeaders[]) {
  const anos = Array.from(new Set(data.map((row) => Number(row.ano))))
    .filter(Boolean)
    .sort((a, b) => a - b);

  const produtos = Array.from(new Set(data.map((row) => row.produto)))
    .filter(Boolean)
    .sort();

  const regioes = Array.from(new Set(data.map((row) => row.regiao)))
    .filter(Boolean)
    .sort();

  const estados = Array.from(new Set(data.map((row) => row.estado)))
    .filter(Boolean)
    .sort();

  const municipios = Array.from(new Set(data.map((row) => row.municipio)))
    .filter(Boolean)
    .sort();

  return {
    anos,
    produtos,
    regioes,
    estados,
    municipios,
  };
}

export function processCombustiveisGeral(
  data: AnpCombustiveisHeaders[],
  filters?: CombustiveisFilters
) {
  const year = filters?.year ?? filters?.ano ?? "2024";
  const produto = filters?.produto ?? "Gasolina Comum";
  const estadoOriginal = filters?.estado ?? "Todos";
  const municipioOriginal = filters?.municipio ?? "Todos";
  const regiao = filters?.regiao ?? "";
  const selectedMonths = parseSelectedMonths(filters);

  const municipioSelecionado =
    normalizeText(municipioOriginal) &&
    normalizeText(municipioOriginal) !== "TODOS" &&
    normalizeText(municipioOriginal) !== "TODAS";

  const estadoSelecionado =
    normalizeText(estadoOriginal) &&
    normalizeText(estadoOriginal) !== "TODOS" &&
    normalizeText(estadoOriginal) !== "TODAS";

  const baseSemEstadoMunicipio = data.filter((row) => {
    return (
      String(row.ano) === String(year) &&
      matchText(row.produto, produto) &&
      matchText(row.regiao, regiao)
    );
  });

  const baseComMes = selectedMonths.length
    ? baseSemEstadoMunicipio.filter((row) => selectedMonths.includes(rowMonth(row)))
    : baseSemEstadoMunicipio;

  let effectiveEstado = estadoOriginal;
  let effectiveMunicipio = municipioOriginal;

  /*
    Regra importante:
    Se o usuário escolhe Fortaleza, mas o Estado ainda está PE,
    antes dava vazio porque tentava Fortaleza + PE.

    Agora o backend procura o município primeiro.
    Se não existir com o estado selecionado, ele ignora o estado e encontra o estado real.
    Exemplo: Fortaleza -> CE.
  */
  if (municipioSelecionado) {
    const rowsMunicipioEstado = baseComMes.filter((row) => {
      return (
        matchMunicipio(row.municipio, municipioOriginal) &&
        (!estadoSelecionado || matchText(row.estado, estadoOriginal))
      );
    });

    const rowsMunicipioQualquerEstado = baseComMes.filter((row) => {
      return matchMunicipio(row.municipio, municipioOriginal);
    });

    const bestRows = rowsMunicipioEstado.length
      ? rowsMunicipioEstado
      : rowsMunicipioQualquerEstado;

    if (bestRows.length) {
      effectiveEstado = bestRows[0].estado || estadoOriginal;
      effectiveMunicipio = bestRows[0].municipio || municipioOriginal;
    }
  }

  const baseFiltered = baseSemEstadoMunicipio.filter((row) => {
    if (municipioSelecionado) {
      return matchMunicipio(row.municipio, effectiveMunicipio);
    }

    if (estadoSelecionado) {
      return matchText(row.estado, effectiveEstado);
    }

    return true;
  });

  const filtered = selectedMonths.length
    ? baseFiltered.filter((row) => selectedMonths.includes(rowMonth(row)))
    : baseFiltered;

  const filteredByProduct = baseComMes;

  const linhaPrecoMedio = getLinhaPrecoMedio(filtered);
  const precoMedio = average(filtered.map((row) => Number(row.precoMedio || 0)));

  const mesAnterior =
    getPreviousMonthValue(baseFiltered, selectedMonths) ||
    getPreviousValidLineValue(getLinhaPrecoMedio(baseFiltered)) ||
    precoMedio;

  const variacao =
    mesAnterior > 0
      ? Number((((precoMedio - mesAnterior) / mesAnterior) * 100).toFixed(2))
      : 0;

  const precosMedios = filtered
    .map((row) => Number(row.precoMedio || 0))
    .filter((value) => Number.isFinite(value) && value > 0);

  const precosMinimos = filtered
    .map((row) => Number(row.precoMinimo || 0))
    .filter((value) => Number.isFinite(value) && value > 0);

  const precosMaximos = filtered
    .map((row) => Number(row.precoMaximo || 0))
    .filter((value) => Number.isFinite(value) && value > 0);

  const precoMinimo = precosMinimos.length
    ? Math.min(...precosMinimos)
    : precosMedios.length
      ? Math.min(...precosMedios)
      : 0;

  const precoMaximo = precosMaximos.length
    ? Math.max(...precosMaximos)
    : precosMedios.length
      ? Math.max(...precosMedios)
      : 0;

  const postos = sum(filtered.map((row) => Number(row.postos || 0)));

  const porMunicipioBase = filteredByProduct.filter((row) => {
    if (estadoSelecionado && !municipioSelecionado) {
      return matchText(row.estado, effectiveEstado);
    }

    return true;
  });

  const capitaisBase = filteredByProduct.filter((row) => isCapital(row.municipio));

  return {
    filtros: {
      year,
      produto,
      estado: effectiveEstado || "Todos",
      municipio: effectiveMunicipio || "Todos",
      regiao,
      months: selectedMonths.map((month) => months[month - 1]),
      linhasEncontradas: filtered.length,
    },

    options: getOptions(data),

    cards: [
      {
        title: "Preço médio",
        value: precoMedio,
        description: "Preço médio de revenda",
      },
      {
        title: "Mês anterior",
        value: Number(mesAnterior.toFixed(2)),
        description: "Preço médio do mês anterior",
      },
      {
        title: "Variação",
        value: variacao,
        description: "Variação em relação ao mês anterior",
      },
      {
        title: "Preço mínimo",
        value: Number(precoMinimo.toFixed(2)),
        description: "Menor preço encontrado",
      },
      {
        title: "Preço máximo",
        value: Number(precoMaximo.toFixed(2)),
        description: "Maior preço encontrado",
      },
      {
        title: "Postos pesquisados",
        value: postos,
        description: "Quantidade de postos analisados",
      },
    ],

    linhaPrecoMedio,

    porRegiao: groupAverage(filteredByProduct, "regiao"),

    porEstado: groupAverage(filteredByProduct, "estado"),

    porMunicipio: groupAverage(porMunicipioBase, "municipio"),

    porCapital: groupAverage(capitaisBase, "municipio"),
  };
}
