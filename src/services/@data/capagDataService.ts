import { fetchCapagRaw } from "@/@api/http/to-charts/capag/CapagData";
import { CapagHistoricoAno, CapagIndicador, CapagMunicipioData } from "@/@types/observatorio/@data/capagData";
import { Filters } from "@/@types/observatorio/shared";

type CapagRawRow = {
  municipio: string;
  cod_ibge: number;
  uf: string;
  capag_oficial: string;
  ano: number;
  nota: string;
  indicador: string;
  valor: number;
};

type CampoHistorico = "endividamento" | "liquidez" | "poupancaCorrente";

const CAMPO_POR_INDICADOR: Record<string, CampoHistorico> = {
  "Endividamento": "endividamento",
  "Liquidez": "liquidez",
  "Poupança Corrente": "poupancaCorrente",
};

// O "Município" do CSV vem como "Jaboatão dos Guararapes - PE"; a UF já é uma coluna à parte.
function limparNomeMunicipio(municipioComUf: string): string {
  return municipioComUf.replace(/\s*-\s*[A-Z]{2}$/, "").trim();
}

// Normaliza acentos/caixa pra casar o nome vindo do mapa (API do IBGE) com o nome do CSV.
function normalizarChave(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

// Nomes de município não são únicos no Brasil (várias "Nova Olinda", "Bom Jesus" etc.),
// então o filtro guarda município+UF combinados num só valor ("Olinda - PE") em vez de
// dois campos separados — dois campos independentes deixavam fácil selecionar só um dos dois.
function separarMunicipioUf(valor: string): { municipio: string; uf: string } | null {
  const match = valor.match(/^(.*?)\s*-\s*([A-Z]{2})$/);
  if (!match) return null;
  return { municipio: match[1].trim(), uf: match[2] };
}

function montarMunicipioData(
  rows: CapagRawRow[],
  municipioAlvo: string,
  ufAlvo: string,
  anoPreferido?: string
): CapagMunicipioData | null {
  const alvo = normalizarChave(municipioAlvo);
  const linhasMunicipio = rows.filter(
    (r) => r.uf === ufAlvo && normalizarChave(limparNomeMunicipio(r.municipio)) === alvo
  );
  if (linhasMunicipio.length === 0) return null;

  const porAno = new Map<number, CapagRawRow[]>();
  for (const row of linhasMunicipio) {
    if (!porAno.has(row.ano)) porAno.set(row.ano, []);
    porAno.get(row.ano)!.push(row);
  }

  const anosDisponiveis = [...porAno.keys()].sort((a, b) => a - b);
  if (anosDisponiveis.length === 0) return null;

  const anoNumeroPreferido = anoPreferido ? parseInt(anoPreferido, 10) : NaN;
  const anoAtual = anosDisponiveis.includes(anoNumeroPreferido)
    ? anoNumeroPreferido
    : anosDisponiveis[anosDisponiveis.length - 1];

  const historico: CapagHistoricoAno[] = anosDisponiveis.map((ano) => {
    const entry: CapagHistoricoAno = { ano: String(ano), endividamento: 0, liquidez: 0, poupancaCorrente: 0 };
    for (const row of porAno.get(ano)!) {
      const campo = CAMPO_POR_INDICADOR[row.indicador];
      if (campo) entry[campo] = Number.isFinite(row.valor) ? row.valor : 0;
    }
    return entry;
  });

  const linhasAnoAtual = porAno.get(anoAtual)!;
  const indicadorAtual = (nomeIndicador: string): CapagIndicador => {
    const row = linhasAnoAtual.find((r) => r.indicador === nomeIndicador);
    return {
      valor: row && Number.isFinite(row.valor) ? row.valor : 0,
      nota: row?.nota ?? "n.d.",
    };
  };

  return {
    municipio: limparNomeMunicipio(linhasAnoAtual[0].municipio),
    uf: ufAlvo,
    notaGeral: linhasAnoAtual[0]?.capag_oficial ?? "n.d.",
    endividamento: indicadorAtual("Endividamento"),
    liquidez: indicadorAtual("Liquidez"),
    poupancaCorrente: indicadorAtual("Poupança Corrente"),
    historico,
  };
}

function construirOpcoes(rows: CapagRawRow[]) {
  const municipios = [...new Set(rows.map((r) => `${limparNomeMunicipio(r.municipio)} - ${r.uf}`))].sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
  return { municipios };
}

export class CapagDataService {
  private static instance: CapagDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, any> = {};
  private opcoesCache: { municipios: string[] } | null = null;

  private constructor() {}

  public static getInstance(): CapagDataService {
    if (!CapagDataService.instance) {
      CapagDataService.instance = new CapagDataService();
    }
    return CapagDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  public async fetchDataForTab(tab: string, filters: Filters) {
    const municipioSelecionado = filters.additionalFilters?.find((f) => f.label === "MUNICÍPIO")?.selected?.[0];
    const ano = filters.year ?? this.currentYear;

    const cacheKey = `${ano}-${municipioSelecionado ?? ""}`;
    if (this.dataCache[cacheKey]) return this.dataCache[cacheKey];

    const rawRows = (await fetchCapagRaw()) as CapagRawRow[] | null;

    if (rawRows && !this.opcoesCache) {
      this.opcoesCache = construirOpcoes(rawRows);
    }

    const municipioParaComparar = municipioSelecionado ? separarMunicipioUf(municipioSelecionado) : null;

    const recife = rawRows ? montarMunicipioData(rawRows, "Recife", "PE", ano) : null;
    const comparado =
      rawRows && municipioParaComparar
        ? montarMunicipioData(rawRows, municipioParaComparar.municipio, municipioParaComparar.uf, ano)
        : null;

    const processed = {
      id: "capag",
      geral: {
        recife,
        comparado,
        additionalFiltersOptions: [
          { label: "MUNICÍPIO", options: this.opcoesCache?.municipios ?? [], selected: [], allowMultiple: false },
        ],
      },
    };

    this.dataCache[cacheKey] = processed;
    return processed;
  }
}

export const capagDataService = CapagDataService.getInstance();
