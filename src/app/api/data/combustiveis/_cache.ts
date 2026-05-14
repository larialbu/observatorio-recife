import { readCombustiveisData } from "@/services/observatorio/combustiveis/readCombustiveisData";

export type CombustivelFastRow = {
  estado: string;
  municipio: string;
  produto: string;
  ano: number;
  mes: number;
  valorVenda: number;
  revenda: string;
  totalPostos: number;
};

type RawRow = Record<string, unknown>;
type RowMap = Map<string, unknown>;

let cachedRows: CombustivelFastRow[] | null = null;
let cachedPromise: Promise<CombustivelFastRow[]> | null = null;
let cachedAt = 0;

const CACHE_TTL_MS = 1000 * 60 * 30;

const ESTADO_POR_NOME: Record<string, string> = {
  "acre": "AC",
  "alagoas": "AL",
  "amapa": "AP",
  "amazonas": "AM",
  "bahia": "BA",
  "ceara": "CE",
  "distrito federal": "DF",
  "espirito santo": "ES",
  "goias": "GO",
  "maranhao": "MA",
  "mato grosso": "MT",
  "mato grosso do sul": "MS",
  "minas gerais": "MG",
  "para": "PA",
  "paraiba": "PB",
  "parana": "PR",
  "pernambuco": "PE",
  "piaui": "PI",
  "rio de janeiro": "RJ",
  "rio grande do norte": "RN",
  "rio grande do sul": "RS",
  "rondonia": "RO",
  "roraima": "RR",
  "santa catarina": "SC",
  "sao paulo": "SP",
  "sergipe": "SE",
  "tocantins": "TO",
};

function normalizarTexto(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizarChave(value: unknown) {
  return normalizarTexto(value).replace(/[^a-z0-9]/g, "");
}

function criarMapaLinha(row: RawRow) {
  const map = new Map<string, unknown>();

  for (const key of Object.keys(row)) {
    map.set(normalizarChave(key), row[key]);
  }

  return map;
}

function pegarValor(map: RowMap, possibleNames: string[]) {
  for (const name of possibleNames) {
    const value = map.get(normalizarChave(name));

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
}

function pegarValorPorContem(map: RowMap, termos: string[]) {
  const termosNormalizados = termos.map((termo) => normalizarChave(termo));

  for (const [key, value] of map.entries()) {
    const encontrou = termosNormalizados.some((termo) => key.includes(termo));

    if (
      encontrou &&
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return "";
}

function parseNumero(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;

  const clean = String(value ?? "")
    .replace("R$", "")
    .replace(/\s/g, "")
    .trim();

  if (!clean) return 0;

  if (clean.includes(",")) {
    const parsed = Number(clean.replace(/\./g, "").replace(",", "."));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const parsed = Number(clean);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseMes(value: unknown) {
  const numeric = Number(value);

  if (Number.isFinite(numeric) && numeric >= 1 && numeric <= 12) {
    return numeric;
  }

  const text = normalizarTexto(value);

  const meses: Record<string, number> = {
    janeiro: 1,
    jan: 1,
    fevereiro: 2,
    fev: 2,
    marco: 3,
    mar: 3,
    abril: 4,
    abr: 4,
    maio: 5,
    mai: 5,
    junho: 6,
    jun: 6,
    julho: 7,
    jul: 7,
    agosto: 8,
    ago: 8,
    setembro: 9,
    set: 9,
    outubro: 10,
    out: 10,
    novembro: 11,
    nov: 11,
    dezembro: 12,
    dez: 12,
  };

  return meses[text] || 1;
}

function normalizarEstado(value: unknown) {
  const raw = String(value ?? "").trim();

  if (!raw) return "";

  const upper = raw.toUpperCase();

  if (/^[A-Z]{2}$/.test(upper)) return upper;

  const text = normalizarTexto(raw);

  return ESTADO_POR_NOME[text] || upper.slice(0, 2);
}

function pegarEstado(map: RowMap) {
  const direto = pegarValor(map, [
    "Estado - Sigla",
    "Estado Sigla",
    "Sigla Estado",
    "UF",
    "uf",
    "Estado",
    "estado",
    "SG_UF",
    "sigla_uf",
    "estado_sigla",
  ]);

  if (direto) return normalizarEstado(direto);

  const porContem = pegarValorPorContem(map, ["uf", "estado"]);
  return normalizarEstado(porContem);
}

function pegarMunicipio(map: RowMap) {
  const direto = pegarValor(map, [
    "Município",
    "Municipio",
    "municipio",
    "Cidade",
    "cidade",
    "Nome Município",
    "Nome Municipio",
    "nome_municipio",
    "municipio_nome",
    "NM_MUNICIPIO",
  ]);

  if (direto) return String(direto).trim();

  const porContem = pegarValorPorContem(map, ["municipio", "cidade"]);
  return String(porContem || "").trim();
}

function pegarProduto(map: RowMap) {
  const direto = pegarValor(map, [
    "Produto",
    "produto",
    "Combustível",
    "Combustivel",
    "combustivel",
    "Tipo de Combustível",
    "Tipo de Combustivel",
    "tipo_combustivel",
    "produto_nome",
    "NM_PRODUTO",
  ]);

  if (direto) return String(direto).trim();

  const porContem = pegarValorPorContem(map, ["produto", "combustivel"]);
  return String(porContem || "Produto não informado").trim();
}

function pegarRevenda(map: RowMap) {
  const direto = pegarValor(map, [
    "Revenda",
    "revenda",
    "Nome da Revenda",
    "Nome Revenda",
    "Posto",
    "posto",
    "Estabelecimento",
    "estabelecimento",
    "razao_social",
    "RAZAO SOCIAL",
  ]);

  if (direto) return String(direto).trim();

  const porContem = pegarValorPorContem(map, [
    "revenda",
    "posto",
    "estabelecimento",
  ]);

  return String(porContem || "").trim();
}

function pegarPreco(map: RowMap) {
  const direto = pegarValor(map, [
    "Valor de Venda",
    "Valor Venda",
    "valor_venda",
    "valorVenda",
    "Preço de Venda",
    "Preco de Venda",
    "preco_venda",
    "Preço Médio de Revenda",
    "Preco Medio de Revenda",
    "preco_medio_revenda",
    "precoMedioRevenda",
    "Preço Médio",
    "Preco Medio",
    "preco_medio",
    "precoMedio",
    "preco",
    "Preço",
    "valor",
    "media",
    "vlr_venda",
  ]);

  const precoDireto = parseNumero(direto);

  if (precoDireto > 0) return precoDireto;

  const porContem = pegarValorPorContem(map, [
    "preco",
    "valor",
    "venda",
    "revenda",
    "media",
  ]);

  return parseNumero(porContem);
}

function pegarTotalPostos(map: RowMap) {
  const direto = pegarValor(map, [
    "Total postos",
    "Total Postos",
    "total_postos",
    "totalPostos",
    "Postos pesquisados",
    "postos pesquisados",
    "Postos Pesquisados",
    "Quantidade de postos",
    "Quantidade de Postos",
    "Qtd postos",
    "Qtd Postos",
    "qtd_postos",
    "qtdPostos",
    "Qtd. postos",
    "Qtd. Postos",
    "Quantidade de revendas",
    "Quantidade de Revendas",
    "qtd_revendas",
    "qtdRevendas",
    "Total revendas",
    "Total Revendas",
    "total_revendas",
    "contagem",
    "Contagem",
    "count",
    "Count",
    "registros",
    "Registros",
  ]);

  const numeroDireto = parseNumero(direto);

  if (numeroDireto > 0) return numeroDireto;

  const porContem = pegarValorPorContem(map, [
    "totalpostos",
    "postos",
    "qtdpostos",
    "quantidadepostos",
    "revendas",
    "qtdrevendas",
    "totalrevendas",
    "registros",
    "contagem",
    "count",
  ]);

  return parseNumero(porContem);
}

function pegarData(map: RowMap) {
  const dataValue = pegarValor(map, [
    "Data da Coleta",
    "Data Coleta",
    "data_coleta",
    "Data",
    "data",
    "date",
    "dt_coleta",
    "DT_COLETA",
  ]);

  const anoValue = pegarValor(map, ["Ano", "ano", "year", "ANO"]);

  const mesValue = pegarValor(map, [
    "Mês",
    "Mes",
    "mes",
    "month",
    "MES",
    "mes_numero",
    "numero_mes",
  ]);

  let ano = Number(anoValue);
  let mes = parseMes(mesValue);

  const dataString = String(dataValue || "").trim();

  if (dataString) {
    const brDate = dataString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);

    if (brDate) {
      mes = Number(brDate[2]);
      ano = Number(brDate[3]);
    } else {
      const isoDate = dataString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

      if (isoDate) {
        ano = Number(isoDate[1]);
        mes = Number(isoDate[2]);
      } else {
        const parsed = new Date(dataString);

        if (!Number.isNaN(parsed.getTime())) {
          mes = parsed.getMonth() + 1;
          ano = parsed.getFullYear();
        }
      }
    }
  }

  if (!mes || mes < 1 || mes > 12) mes = 1;

  return {
    ano: Number.isFinite(ano) ? ano : 0,
    mes,
  };
}

function normalizarLinha(row: RawRow): CombustivelFastRow | null {
  const map = criarMapaLinha(row);

  const estado = pegarEstado(map);
  const municipio = pegarMunicipio(map);
  const produto = pegarProduto(map);
  const valorVenda = pegarPreco(map);
  const revenda = pegarRevenda(map);
  const totalPostos = pegarTotalPostos(map);
  const data = pegarData(map);

  if (!estado || !municipio || !produto || valorVenda <= 0 || data.ano <= 0) {
    return null;
  }

  return {
    estado,
    municipio,
    produto,
    valorVenda,
    revenda,
    ano: data.ano,
    mes: data.mes,
    totalPostos,
  };
}

function normalizarDados(rows: RawRow[]) {
  const normalizados: CombustivelFastRow[] = [];

  for (const row of rows) {
    const normalizado = normalizarLinha(row);

    if (normalizado) normalizados.push(normalizado);
  }

  return normalizados;
}

export async function getCombustiveisFastData(forceRefresh = false): Promise<CombustivelFastRow[]> {
  const now = Date.now();
  const cacheValido =
    cachedRows && !forceRefresh && now - cachedAt < CACHE_TTL_MS;

  if (cacheValido) return cachedRows ?? [];

  if (!cachedPromise || forceRefresh) {
    cachedPromise = Promise.resolve(readCombustiveisData()).then((data) => {
      const rows = Array.isArray(data) ? (data as RawRow[]) : [];
      const normalizados = normalizarDados(rows);

      cachedRows = normalizados;
      cachedAt = Date.now();
      cachedPromise = null;

      return normalizados;
    });
  }

  return cachedPromise ?? [];
}

export function clearCombustiveisFastCache() {
  cachedRows = null;
  cachedPromise = null;
  cachedAt = 0;
}
