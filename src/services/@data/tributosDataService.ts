import { fetchItbiRaw } from "@/@api/http/to-charts/tributos/ItbiData";
import { fetchIptuResumo, fetchIptuAmostra } from "@/@api/http/to-charts/tributos/IptuData";
import { Filters } from "@/@types/observatorio/shared";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function parseDecimal(v: any): number {
  if (v == null) return NaN;
  const n = parseFloat(String(v).replace(",", "."));
  return isNaN(n) ? NaN : n;
}

function median(arr: number[]) {
  const valid = arr.filter((v) => !isNaN(v));
  if (!valid.length) return 0;
  const sorted = [...valid].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function simplificarTipoConstrucao(tipo: string): string {
  if (tipo.startsWith("Apartamento")) return "Apartamento";
  if (tipo.startsWith("Sala")) return "Sala";
  if (tipo.startsWith("Loja")) return "Loja";
  return tipo;
}

function groupBy<T>(arr: T[], key: (r: T) => string | null | undefined): Record<string, T[]> {
  return arr.reduce((acc: any, r) => {
    const k = key(r) ?? "Não informado";
    if (!acc[k]) acc[k] = [];
    acc[k].push(r);
    return acc;
  }, {});
}

function formatDateBR(d: any) {
  const date = d instanceof Date ? d : new Date(d);
  return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

// ---------- ITBI (dados reais, granularidade mensal a partir de data_transacao) ----------

function getItbiMonth(row: any) {
  return new Date(row.data_transacao).getMonth();
}

function getItbiFilters(filters: Filters) {
  const get = (label: string) => filters.additionalFilters?.find((f) => f.label === label)?.selected ?? [];
  return {
    year: filters.year ?? filters.years?.[filters.years.length - 1] ?? "2025",
    meses: get("MÊS"),
    bairros: get("BAIRRO"),
    construcoes: get("TIPO DE CONSTRUÇÃO"),
    usos: get("USO DO IMÓVEL"),
    logradouros: get("LOGRADOURO"),
  };
}

function applyItbiFilters(rows: any[], f: ReturnType<typeof getItbiFilters>, yearOverride?: string) {
  const year = yearOverride ?? f.year;
  return rows.filter((r) => {
    if (String(r.ano) !== String(year)) return false;
    if (f.meses.length && !f.meses.includes(String(getItbiMonth(r) + 1).padStart(2, "0"))) return false;
    if (f.bairros.length && !f.bairros.includes(r.bairro)) return false;
    if (f.construcoes.length && !f.construcoes.includes(r.tipo_construcao)) return false;
    if (f.usos.length && !f.usos.includes(r.tipo_ocupacao)) return false;
    if (f.logradouros.length && !f.logradouros.includes(r.logradouro)) return false;
    return true;
  });
}

function processItbiContribuintes(rows: any[], prevYearRows: any[], year: string) {
  const totalAtual = rows.length;
  const totalAnterior = prevYearRows.length;
  const variacao = totalAnterior ? parseFloat((((totalAtual - totalAnterior) / totalAnterior) * 100).toFixed(2)) : 0;

  const cards = [
    { title: "Total de transmissões", value: totalAtual },
    { title: "Total no ano anterior", value: totalAnterior },
    { title: "Variação", value: variacao },
  ];

  const byMonth = groupBy(rows, (r) => String(getItbiMonth(r)));
  const byMonthPrev = groupBy(prevYearRows, (r) => String(getItbiMonth(r)));

  const linhaTransmissoes = MESES.map((mes, i) => ({ mes, quantidade: byMonth[i]?.length ?? 0 }));

  const tabelaAnual = MESES.map((mes, i) => {
    const total = byMonth[i]?.length ?? 0;
    const anoAnterior = byMonthPrev[i]?.length ?? 0;
    const variacaoMes = anoAnterior ? parseFloat((((total - anoAnterior) / anoAnterior) * 100).toFixed(2)) : 0;
    return { ano: year, mes, total, anoAnterior, variacao: variacaoMes };
  });

  const porBairro = Object.entries(groupBy(rows, (r) => r.bairro))
    .map(([bairro, rs]) => ({ bairro, quantidade: rs.length }))
    .sort((a, b) => b.quantidade - a.quantidade);

  const porConstrucao = Object.entries(groupBy(rows, (r) => r.tipo_construcao && simplificarTipoConstrucao(r.tipo_construcao)))
    .map(([tipo, rs]) => ({ tipo, quantidade: rs.length }))
    .sort((a, b) => b.quantidade - a.quantidade);

  const porUso = Object.entries(groupBy(rows, (r) => r.tipo_ocupacao)).map(([uso, rs]) => ({ uso, quantidade: rs.length }));

  return { cards, linhaTransmissoes, tabelaAnual, porBairro, porConstrucao, porUso };
}

function processItbiAvaliacoes(rows: any[]) {
  const valores = rows.map((r) => parseDecimal(r.valor_avaliacao)).filter((v) => !isNaN(v));
  const maior = valores.length ? Math.max(...valores) : 0;
  const menor = valores.length ? Math.min(...valores) : 0;

  const cards = [
    { title: "Maior avaliação", value: parseFloat(maior.toFixed(2)) },
    { title: "Menor avaliação", value: parseFloat(menor.toFixed(2)) },
    { title: "Total de transmissões", value: rows.length },
  ];

  const byMonth = groupBy(rows, (r) => String(getItbiMonth(r)));
  const medianaAvaliacoes = MESES.map((mes, i) => ({
    mes,
    mediana: parseFloat(median((byMonth[i] ?? []).map((r: any) => parseDecimal(r.valor_avaliacao))).toFixed(2)),
  }));

  // Amostra das transações mais recentes (a tabela renderiza tudo no cliente, então não manda o dataset inteiro)
  const tabelaTransacoes = [...rows]
    .sort((a, b) => new Date(b.data_transacao).getTime() - new Date(a.data_transacao).getTime())
    .slice(0, 50)
    .map((r) => ({
      data: formatDateBR(r.data_transacao),
      logradouro: r.logradouro,
      bairro: r.bairro,
      tipoImovel: r.tipo_imovel,
      valorAvaliacao: parseDecimal(r.valor_avaliacao),
    }));

  const medianaPorBairro = Object.entries(groupBy(rows, (r) => r.bairro))
    .map(([bairro, rs]) => ({
      bairro,
      mediana: parseFloat(median((rs as any[]).map((r: any) => parseDecimal(r.valor_avaliacao))).toFixed(2)),
    }))
    .sort((a, b) => b.mediana - a.mediana);

  return { cards, medianaAvaliacoes, tabelaTransacoes, medianaPorBairro };
}

function processItbiPesquisa(rows: any[]) {
  // Amostra das transações mais recentes que batem com o filtro (tabela renderiza tudo no cliente)
  const registros = [...rows]
    .sort((a, b) => new Date(b.data_transacao).getTime() - new Date(a.data_transacao).getTime())
    .slice(0, 500)
    .map((r) => ({
      data: formatDateBR(r.data_transacao),
      logradouro: r.logradouro,
      bairro: r.bairro,
      tipoImovel: r.tipo_imovel,
      valorAvaliacao: parseDecimal(r.valor_avaliacao),
    }));
  return { registros };
}

// ---------- IPTU ----------
// O IPTU.parquet bruto tem ~2 milhões de linhas (1 por imóvel por ano do exercício) — grande
// demais pra baixar e processar inteiro no navegador (trava a thread de renderização). Por isso
// o backend serve duas versões pré-agregadas via DuckDB (ver scratchpad/build_iptu_summary.js):
// - resumo: 1 linha por (ano, bairro, uso), com quantidade e soma de valor — alimenta os cards,
//   linhas de evolução e agrupamentos por bairro/uso.
// - amostra: até 30 imóveis por (ano, bairro), ordenados pelo maior valor de IPTU — alimenta a
//   tabela de pesquisa (que não é uma busca exaustiva sobre os 2M de registros, e sim uma amostra).
// Sem granularidade mensal nos dados reais: a "linha" e a "tabela" usam evolução por ano fiscal.

function getIptuFilters(filters: Filters) {
  const get = (label: string) => filters.additionalFilters?.find((f) => f.label === label)?.selected ?? [];
  return {
    year: filters.year ?? filters.years?.[filters.years.length - 1] ?? "2025",
    bairros: get("BAIRRO"),
    usos: get("USO DO IMÓVEL"),
    logradouros: get("LOGRADOURO"),
  };
}

function applyIptuResumoFilters(rows: any[], f: ReturnType<typeof getIptuFilters>, yearOverride?: string) {
  const year = yearOverride ?? f.year;
  return rows.filter((r) => {
    if (String(r.ano) !== String(year)) return false;
    if (f.bairros.length && !f.bairros.includes(r.bairro)) return false;
    if (f.usos.length && !f.usos.includes(r.uso)) return false;
    return true;
  });
}

function applyIptuAmostraFilters(rows: any[], f: ReturnType<typeof getIptuFilters>) {
  return rows.filter((r) => {
    if (String(r.ano) !== String(f.year)) return false;
    if (f.bairros.length && !f.bairros.includes(r.bairro)) return false;
    if (f.logradouros.length && !f.logradouros.includes(r.logradouro)) return false;
    return true;
  });
}

function processIptuContribuintes(rows: any[], prevYearRows: any[], allRows: any[]) {
  const totalAtual = rows.reduce((s, r) => s + r.quantidade, 0);
  const totalAnterior = prevYearRows.reduce((s, r) => s + r.quantidade, 0);
  const variacao = totalAnterior ? parseFloat((((totalAtual - totalAnterior) / totalAnterior) * 100).toFixed(2)) : 0;

  const cards = [
    { title: "Total de contribuintes", value: totalAtual },
    { title: "Total no ano anterior", value: totalAnterior },
    { title: "Variação", value: variacao },
  ];

  const byYear = groupBy(allRows, (r) => String(r.ano));
  const anos = Object.keys(byYear).sort();
  const linhaContribuintes = anos.map((ano) => ({ mes: ano, total: byYear[ano].reduce((s, r) => s + r.quantidade, 0) }));

  const tabelaVariacao = anos.slice(1).map((ano, i) => {
    const anoAnterior = anos[i];
    const total = byYear[ano].reduce((s, r) => s + r.quantidade, 0);
    const totalAnt = byYear[anoAnterior].reduce((s, r) => s + r.quantidade, 0);
    const variacaoAno = totalAnt ? parseFloat((((total - totalAnt) / totalAnt) * 100).toFixed(2)) : 0;
    return { ano, mes: "—", atual: total, anterior: totalAnt, variacao: variacaoAno };
  });

  const porBairro = Object.entries(groupBy(rows, (r) => r.bairro))
    .map(([bairro, rs]) => ({ bairro, quantidade: rs.reduce((s, r) => s + r.quantidade, 0) }))
    .sort((a, b) => b.quantidade - a.quantidade);

  const porUso = Object.entries(groupBy(rows, (r) => r.uso)).map(([uso, rs]) => ({
    uso,
    quantidade: rs.reduce((s, r) => s + r.quantidade, 0),
  }));

  return { cards, linhaContribuintes, tabelaVariacao, porBairro, porUso };
}

function processIptuValores(rows: any[], prevYearRows: any[], allRows: any[]) {
  const somaValor = (rs: any[]) => rs.reduce((s, r) => s + (r.valor_iptu_total || 0), 0);

  const totalAtual = somaValor(rows);
  const totalAnterior = somaValor(prevYearRows);
  const variacao = totalAnterior ? parseFloat((((totalAtual - totalAnterior) / totalAnterior) * 100).toFixed(2)) : 0;

  const cards = [
    { title: "Total do IPTU", value: parseFloat(totalAtual.toFixed(2)) },
    { title: "Total no ano anterior", value: parseFloat(totalAnterior.toFixed(2)) },
    { title: "Variação", value: variacao },
  ];

  const byYear = groupBy(allRows, (r) => String(r.ano));
  const anos = Object.keys(byYear).sort();
  const linhaValorTotal = anos.map((ano) => ({ mes: ano, valor: parseFloat(somaValor(byYear[ano]).toFixed(2)) }));

  const tabelaEvolucao = anos.slice(1).map((ano, i) => {
    const anoAnterior = anos[i];
    const valor = somaValor(byYear[ano]);
    const valorAnt = somaValor(byYear[anoAnterior]);
    const variacaoAno = valorAnt ? parseFloat((((valor - valorAnt) / valorAnt) * 100).toFixed(2)) : 0;
    return { ano, mes: "—", valorTotal: parseFloat(valor.toFixed(2)), anoAnterior: parseFloat(valorAnt.toFixed(2)), variacao: variacaoAno };
  });

  const porUso = Object.entries(groupBy(rows, (r) => r.uso)).map(([uso, rs]) => ({
    uso,
    valor: parseFloat(somaValor(rs).toFixed(2)),
  }));

  const porBairro = Object.entries(groupBy(rows, (r) => r.bairro))
    .map(([bairro, rs]) => ({ bairro, valor: parseFloat(somaValor(rs).toFixed(2)) }))
    .sort((a, b) => b.valor - a.valor);

  return { cards, tabelaEvolucao, linhaValorTotal, porUso, porBairro };
}

function processIptuPesquisa(rows: any[]) {
  const registros = rows.slice(0, 500).map((r) => ({
    ano: r.ano,
    logradouro: r.logradouro,
    bairro: r.bairro,
    iptu: r.valor_iptu,
    m2Construcao: r.area_construida,
    m2Terreno: r.area_terreno,
    valorEstimado: r.valor_estimado,
  }));
  return { registros };
}

export class TributosDataService {
  private static instance: TributosDataService;
  private currentYear: string = "2025";
  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): TributosDataService {
    if (!TributosDataService.instance) {
      TributosDataService.instance = new TributosDataService();
    }
    return TributosDataService.instance;
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

    let processed: any;

    if (tab.startsWith("itbi")) {
      const allRows = await fetchItbiRaw();
      const f = getItbiFilters({ ...filters, year: this.currentYear });
      const rows = applyItbiFilters(allRows, f);

      const additionalFiltersOptions = [
        { label: "MÊS", options: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] },
        { label: "BAIRRO", options: Array.from(new Set(allRows.map((r) => r.bairro).filter((v) => v != null))).sort() },
        { label: "TIPO DE CONSTRUÇÃO", options: Array.from(new Set(allRows.map((r) => r.tipo_construcao).filter((v) => v != null))).sort() },
        { label: "USO DO IMÓVEL", options: Array.from(new Set(allRows.map((r) => r.tipo_ocupacao).filter((v) => v != null))).sort() },
        { label: "LOGRADOURO", options: Array.from(new Set(allRows.map((r) => r.logradouro).filter((v) => v != null))).sort() },
      ];

      switch (tab) {
        case "itbi-avaliacoes":
          processed = { id: "tributos", itbiAvaliacoes: { ...processItbiAvaliacoes(rows), additionalFiltersOptions } };
          break;
        case "itbi-pesquisa":
          processed = { id: "tributos", itbiPesquisa: { ...processItbiPesquisa(rows), additionalFiltersOptions } };
          break;
        default: {
          const prevYearRows = applyItbiFilters(allRows, f, String(Number(this.currentYear) - 1));
          processed = {
            id: "tributos",
            itbiContribuintes: { ...processItbiContribuintes(rows, prevYearRows, this.currentYear), additionalFiltersOptions },
          };
        }
      }
    } else if (tab === "iptu-pesquisa") {
      const allRows = await fetchIptuAmostra();
      const f = getIptuFilters({ ...filters, year: this.currentYear });
      const rows = applyIptuAmostraFilters(allRows, f);

      const additionalFiltersOptions = [
        { label: "BAIRRO", options: Array.from(new Set(allRows.map((r) => r.bairro).filter((v) => v != null))).sort() },
        { label: "LOGRADOURO", options: Array.from(new Set(allRows.map((r) => r.logradouro).filter((v) => v != null))).sort() },
      ];

      processed = { id: "tributos", iptuPesquisa: { ...processIptuPesquisa(rows), additionalFiltersOptions } };
    } else {
      const allRows = await fetchIptuResumo();
      const f = getIptuFilters({ ...filters, year: this.currentYear });
      const rows = applyIptuResumoFilters(allRows, f);
      const prevYearRows = applyIptuResumoFilters(allRows, f, String(Number(this.currentYear) - 1));

      const additionalFiltersOptions = [
        { label: "BAIRRO", options: Array.from(new Set(allRows.map((r) => r.bairro).filter((v) => v != null))).sort() },
        { label: "USO DO IMÓVEL", options: Array.from(new Set(allRows.map((r) => r.uso).filter((v) => v != null))).sort() },
      ];

      switch (tab) {
        case "iptu-valores":
          processed = { id: "tributos", iptuValores: { ...processIptuValores(rows, prevYearRows, allRows), additionalFiltersOptions } };
          break;
        default:
          processed = { id: "tributos", iptuContribuintes: { ...processIptuContribuintes(rows, prevYearRows, allRows), additionalFiltersOptions } };
      }
    }

    this.dataCache[cacheKey] = processed;
    return processed;
  }
}

export const tributosDataService = TributosDataService.getInstance();
