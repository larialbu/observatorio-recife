import { fetchCombustiveisRaw } from "@/@api/http/to-charts/combustiveis/CombustiveisData";
import { Filters } from "@/@types/observatorio/shared";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const REGIOES = ["Norte", "Nordeste", "Centro Oeste", "Sudeste", "Sul"];

function avg(arr: (number | null | undefined)[]) {
  const valid = arr.filter((v): v is number => v != null && !isNaN(v as number));
  return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
}

function safeMin(arr: (number | null | undefined)[]) {
  const valid = arr.filter((v): v is number => v != null && !isNaN(v as number));
  return valid.length ? valid.reduce((a, b) => (b < a ? b : a), valid[0]) : 0;
}

function safeMax(arr: (number | null | undefined)[]) {
  const valid = arr.filter((v): v is number => v != null && !isNaN(v as number));
  return valid.length ? valid.reduce((a, b) => (b > a ? b : a), valid[0]) : 0;
}

function getYear(row: any) {
  return new Date(row.Data).getFullYear().toString();
}

function getMonth(row: any) {
  return new Date(row.Data).getMonth(); // 0-indexed
}

function getFiltersFromState(filters: Filters) {
  const get = (label: string) =>
    filters.additionalFilters?.find((f) => f.label === label)?.selected ?? [];
  // Sem PRODUTO selecionado, usa Gasolina Comum como padrão em todas as abas
  const produtos = get("PRODUTO");
  return {
    year: filters.year ?? filters.years?.[filters.years.length - 1] ?? "2026",
    meses: get("MÊS"),
    regioes: get("REGIÃO"),
    estados: get("ESTADO"),
    municipios: get("MUNICÍPIO"),
    produtos: produtos.length ? produtos : ["Gasolina Comum"],
    municipio: get("MUNICÍPIO")[0] ?? null,
  };
}

function applyFilters(rows: any[], f: ReturnType<typeof getFiltersFromState>, yearOverride?: string) {
  const year = yearOverride ?? f.year;
  return rows.filter((r) => {
    if (getYear(r) !== year) return false;
    if (f.meses.length && !f.meses.includes(String(getMonth(r) + 1).padStart(2, "0"))) return false;
    if (f.regioes.length && !f.regioes.includes(r["REGIÃO"])) return false;
    if (f.estados.length && !f.estados.includes(r.ESTADO) && !f.estados.includes(r.UF)) return false;
    if (f.municipios.length && !f.municipios.includes(r["MUNICÍPIO"])) return false;
    if (f.produtos.length && !f.produtos.includes(r.PRODUTO)) return false;
    return true;
  });
}

function groupBy<T>(arr: T[], key: (r: T) => string): Record<string, T[]> {
  return arr.reduce((acc: any, r) => {
    const k = key(r);
    if (!acc[k]) acc[k] = [];
    acc[k].push(r);
    return acc;
  }, {});
}

function processGeral(rows: any[], capitaisRows: any[], regiaoRows: any[]) {
  const precoMedio = avg(rows.map((r) => r["PREÇO MÉDIO REVENDA"]));
  const precoMin = safeMin(rows.map((r) => r["PREÇO MÍNIMO REVENDA"]));
  const precoMax = safeMax(rows.map((r) => r["PREÇO MÁXIMO REVENDA"]));

  // Mês anterior: pegar o mês mais recente e o anterior
  const byMonth = groupBy(rows, (r) => getMonth(r).toString());
  const months = Object.keys(byMonth).map(Number).sort();
  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];
  const precoMesAtual = lastMonth !== undefined ? avg(byMonth[lastMonth].map((r) => r["PREÇO MÉDIO REVENDA"])) : precoMedio;
  const precoMesAnterior = prevMonth !== undefined ? avg(byMonth[prevMonth].map((r) => r["PREÇO MÉDIO REVENDA"])) : precoMesAtual;
  const variacao = precoMesAtual - precoMesAnterior;

  const cards = [
    { title: "Preço médio", value: parseFloat(precoMedio.toFixed(2)) },
    { title: "Mês anterior", value: parseFloat(precoMesAnterior.toFixed(2)) },
    { title: "Variação", value: parseFloat(variacao.toFixed(2)) },
    { title: "Preço mínimo", value: parseFloat(precoMin.toFixed(2)) },
    { title: "Preço máximo", value: parseFloat(precoMax.toFixed(2)) },
  ];

  // Linha preço médio por mês
  const linhaPrecoMedio = months.map((m) => ({
    mes: MESES[m],
    preco: parseFloat(avg(byMonth[m].map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
  }));

  // Dispersão: preço médio x postos por produto
  const byProduto = groupBy(rows, (r) => r.PRODUTO);
  const dispersao = Object.entries(byProduto).map(([prod, rs]) => ({
    precoMedio: parseFloat(avg((rs as any[]).map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
    postos: (rs as any[]).reduce((s, r) => s + (r["NÚMERO DE POSTOS PESQUISADOS"] || 0), 0),
    produto: prod,
  }));

  // Treemap por região — sempre todas as regiões, não muda com o filtro de município nem de estado
  const byRegiao = groupBy(regiaoRows, (r) => r["REGIÃO"]);
  const porRegiao = Object.entries(byRegiao).map(([nome, rs]) => ({
    nome,
    preco: parseFloat(avg((rs as any[]).map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
  }));

  // Barras capitais (CAPITAL === "S") — sempre todas as capitais, não muda com o filtro de município
  const capitais = capitaisRows.filter((r) => r.CAPITAL === "S");
  const byCapital = groupBy(capitais, (r) => r.UF);
  const porEstado = Object.entries(byCapital)
    .map(([nome, rs]) => ({
      nome,
      preco: parseFloat(avg((rs as any[]).map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
    }))
    .sort((a, b) => b.preco - a.preco);

  // Barras por estado (todos os estados) — sempre todos, não muda com o filtro de município
  const byTodosEstados = groupBy(capitaisRows, (r) => r.UF);
  const porTodosEstados = Object.entries(byTodosEstados)
    .map(([nome, rs]) => ({
      nome,
      preco: parseFloat(avg((rs as any[]).map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
    }))
    .sort((a, b) => b.preco - a.preco);

  return { cards, linhaPrecoMedio, dispersao, porRegiao, porEstado, porTodosEstados };
}

function processComparativo(rows: any[], barRows: any[], municipio?: string | null) {
  const recife = rows.filter((r) => r["MUNICÍPIO"]?.includes("Recife") && r.UF === "PE");
  const byMonth = groupBy(recife, (r) => getMonth(r).toString());
  const months = Object.keys(byMonth).map(Number).sort();

  const linhaRecife = months.map((m) => ({
    mes: MESES[m],
    preco: parseFloat(avg(byMonth[m].map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
  }));

  // Gráfico de barra (por produto) é estático: só reage a ano/mês, ignora região/estado/produto/município
  const recifeBars = barRows.filter((r) => r["MUNICÍPIO"]?.includes("Recife") && r.UF === "PE");
  const byProdutoRecife = groupBy(recifeBars, (r) => r.PRODUTO);
  const produtosRecife = Object.entries(byProdutoRecife).map(([produto, rs]) => ({
    produto,
    preco: parseFloat(avg((rs as any[]).map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
  }));

  const recifePrecoMedio = parseFloat(avg(recife.map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2));
  const recifePostos = recife.reduce((s, r) => s + (r["NÚMERO DE POSTOS PESQUISADOS"] || 0), 0);

  let linhaComparativo: any[] = [];
  let produtosComparativo: any[] = [];
  let municipioPrecoMedio: number | undefined;
  let municipioPostos: number | undefined;

  if (municipio) {
    const mun = rows.filter((r) => r["MUNICÍPIO"] === municipio);
    const byMonthMun = groupBy(mun, (r) => getMonth(r).toString());
    const monthsMun = Object.keys(byMonthMun).map(Number).sort();
    linhaComparativo = monthsMun.map((m) => ({
      mes: MESES[m],
      preco: parseFloat(avg(byMonthMun[m].map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
    }));

    const munBars = barRows.filter((r) => r["MUNICÍPIO"] === municipio);
    const byProdutoMun = groupBy(munBars, (r) => r.PRODUTO);
    produtosComparativo = Object.entries(byProdutoMun).map(([produto, rs]) => ({
      produto,
      preco: parseFloat(avg((rs as any[]).map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
    }));

    municipioPrecoMedio = parseFloat(avg(mun.map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2));
    municipioPostos = mun.reduce((s, r) => s + (r["NÚMERO DE POSTOS PESQUISADOS"] || 0), 0);
  }

  return {
    recife: { precoMedio: recifePrecoMedio, postos: recifePostos },
    municipio: { precoMedio: municipioPrecoMedio, postos: municipioPostos },
    linhaRecife,
    produtosRecife,
    linhaComparativo,
    produtosComparativo,
  };
}

function processRegional(rows: any[], allRows: any[]) {
  const byRegiao = groupBy(rows, (r) => r["REGIÃO"]);
  const precoMedio = REGIOES.filter((r) => byRegiao[r]).map((r) => ({
    regiao: r,
    preco: parseFloat(avg(byRegiao[r].map((x: any) => x["PREÇO MÉDIO REVENDA"])).toFixed(2)),
  }));
  const precoMaximo = REGIOES.filter((r) => byRegiao[r]).map((r) => ({
    regiao: r,
    preco: parseFloat(safeMax(byRegiao[r].map((x: any) => x["PREÇO MÁXIMO REVENDA"])).toFixed(2)),
  }));
  const precoMinimo = REGIOES.filter((r) => byRegiao[r]).map((r) => ({
    regiao: r,
    preco: parseFloat(safeMin(byRegiao[r].map((x: any) => x["PREÇO MÍNIMO REVENDA"])).toFixed(2)),
  }));

  // Evolução por ano
  const byYear = groupBy(allRows, getYear);
  const years = Object.keys(byYear).sort();
  const evolucao = years.map((ano) => {
    const byR = groupBy(byYear[ano], (r) => r["REGIÃO"]);
    const entry: any = { ano };
    REGIOES.forEach((reg) => {
      entry[reg] = byR[reg] ? parseFloat(avg(byR[reg].map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)) : null;
    });
    return entry;
  });

  return { precoMedio, precoMaximo, precoMinimo, evolucao };
}

function processEstadual(rows: any[], allRows: any[]) {
  const byEstado = groupBy(rows, (r) => r.UF);
  const estados = Object.keys(byEstado).sort();

  const precoMedio = estados.map((e) => ({
    estado: e,
    preco: parseFloat(avg(byEstado[e].map((r: any) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
  })).sort((a, b) => b.preco - a.preco);

  const precoMaximo = estados.map((e) => ({
    estado: e,
    preco: parseFloat(safeMax(byEstado[e].map((r: any) => r["PREÇO MÁXIMO REVENDA"])).toFixed(2)),
  })).sort((a, b) => b.preco - a.preco);

  const precoMinimo = estados.map((e) => ({
    estado: e,
    preco: parseFloat(safeMin(byEstado[e].map((r: any) => r["PREÇO MÍNIMO REVENDA"])).toFixed(2)),
  })).sort((a, b) => b.preco - a.preco);

  const byYear = groupBy(allRows, getYear);
  const years = Object.keys(byYear).sort();
  const evolucao = years.map((ano) => {
    const byE = groupBy(byYear[ano], (r) => r.UF);
    const entry: any = { ano };
    estados.forEach((e) => {
      entry[e] = byE[e] ? parseFloat(avg(byE[e].map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)) : null;
    });
    return entry;
  });

  return { precoMedio, precoMaximo, precoMinimo, evolucao };
}

function processMunicipal(rows: any[], allRows: any[], estado?: string) {
  const filtered = estado ? rows.filter((r) => r.UF === estado || r.ESTADO === estado) : rows;
  const byMun = groupBy(filtered, (r) => r["MUNICÍPIO"]);
  const municipios = Object.keys(byMun).sort();

  const precoMedio = municipios.map((m) => ({
    municipio: m,
    preco: parseFloat(avg(byMun[m].map((r: any) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)),
  })).sort((a, b) => b.preco - a.preco);

  const precoMaximo = municipios.map((m) => ({
    municipio: m,
    preco: parseFloat(safeMax(byMun[m].map((r: any) => r["PREÇO MÁXIMO REVENDA"])).toFixed(2)),
  })).sort((a, b) => b.preco - a.preco);

  const precoMinimo = municipios.map((m) => ({
    municipio: m,
    preco: parseFloat(safeMin(byMun[m].map((r: any) => r["PREÇO MÍNIMO REVENDA"])).toFixed(2)),
  })).sort((a, b) => b.preco - a.preco);

  const top10 = precoMedio.slice(0, 10).map((m) => m.municipio);
  const byYear = groupBy(allRows, getYear);
  const years = Object.keys(byYear).sort();
  const evolucao = years.map((ano) => {
    const byM = groupBy(byYear[ano], (r) => r["MUNICÍPIO"]);
    const entry: any = { ano };
    top10.forEach((m) => {
      entry[m] = byM[m] ? parseFloat(avg(byM[m].map((r) => r["PREÇO MÉDIO REVENDA"])).toFixed(2)) : null;
    });
    return entry;
  });

  return { precoMedio, precoMaximo, precoMinimo, evolucao };
}

export class CombustiveisDataService {
  private static instance: CombustiveisDataService;
  private currentYear: string = "2026";
  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): CombustiveisDataService {
    if (!CombustiveisDataService.instance) {
      CombustiveisDataService.instance = new CombustiveisDataService();
    }
    return CombustiveisDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Filters): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  public async fetchDataForTab(tab: string, filters: Filters) {
    const cacheKey = this.getCacheKey(tab, filters);
    if (this.dataCache[cacheKey]) return this.dataCache[cacheKey];

    const allRows: any[] = await fetchCombustiveisRaw();
    const f = getFiltersFromState({ ...filters, year: this.currentYear });

    // Linhas filtradas pelo ano (e demais filtros)
    const filtered = applyFilters(allRows, f);

    // Opções de todos os filtros da aba. ESTADO e MUNICÍPIO são extraídos de todo o
    // dataset (não só do filtrado); os demais mantêm a lista fixa original.
    const additionalFiltersOptions = [
      {
        label: "MÊS",
        options: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      },
      {
        label: "REGIÃO",
        options: ["Norte", "Nordeste", "Centro Oeste", "Sudeste", "Sul"],
      },
      {
        label: "ESTADO",
        options: Array.from(
          new Set(allRows.map((r) => r.ESTADO ?? r.UF).filter((v) => v != null))
        ).sort(),
      },
      {
        label: "MUNICÍPIO",
        options: Array.from(
          new Set(allRows.map((r) => r["MUNICÍPIO"]).filter((v) => v != null))
        ).sort(),
      },
      {
        label: "PRODUTO",
        options: ["Etanol Hidratado", "Gasolina Aditivada", "Gasolina Comum", "Glp", "Gnv", "Oleo Diesel", "Oleo Diesel S10"],
      },
    ];

    let processed: any;
    switch (tab) {
      case "comparativo": {
        // O lado de Recife sempre usa o mesmo recorte, ignorando o filtro de município
        // (que aqui serve só para escolher a cidade do outro lado da comparação)
        const comparativoRows = applyFilters(allRows, { ...f, municipios: [] });
        // Gráfico de barra (preço médio por produto) é estático: só muda com ano/mês
        const barRows = applyFilters(allRows, { ...f, regioes: [], estados: [], municipios: [], produtos: [] });
        processed = { id: "combustiveis", comparativo: { ...processComparativo(comparativoRows, barRows, f.municipio), additionalFiltersOptions } };
        break;
      }
      case "regional":
        processed = { id: "combustiveis", regional: { ...processRegional(filtered, allRows), additionalFiltersOptions } };
        break;
      case "estadual":
        processed = { id: "combustiveis", estadual: { ...processEstadual(filtered, allRows), additionalFiltersOptions } };
        break;
      case "municipal": {
        const estadoFilter = filters.additionalFilters?.find((f) => f.label === "ESTADO")?.selected?.[0];
        processed = { id: "combustiveis", municipal: { ...processMunicipal(filtered, allRows, estadoFilter), additionalFiltersOptions } };
        break;
      }
      default: {
        // Sem município selecionado, os cards/linha/dispersão usam Recife como padrão
        const geralRows = f.municipios.length
          ? filtered
          : filtered.filter((r) => r["MUNICÍPIO"]?.includes("Recife"));

        // O gráfico de capitais e o de todos os estados sempre mostram tudo, ignorando o filtro de município
        const capitaisRows = applyFilters(allRows, { ...f, municipios: [] });

        // O treemap por região sempre mostra todas as regiões, ignorando os filtros de município e de estado
        const regiaoRows = applyFilters(allRows, { ...f, municipios: [], estados: [] });

        processed = { id: "combustiveis", geral: { ...processGeral(geralRows, capitaisRows, regiaoRows), additionalFiltersOptions } };
      }
    }

    this.dataCache[cacheKey] = processed;
    return processed;
  }
}

export const combustiveisDataService = CombustiveisDataService.getInstance();
