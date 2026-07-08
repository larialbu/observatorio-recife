import { readParquetFromBuffer } from "@/@api/config/parquetReader";

// O IPTU.parquet bruto tem ~2 milhões de linhas: grande demais pra baixar e
// parsear inteiro no navegador (trava a thread de renderização). Por isso o
// backend serve duas versões pré-agregadas via DuckDB:
// - IPTU_resumo: 1 linha por (ano do exercício, bairro, uso), com contagem e soma de valor.
// - IPTU_amostra: até 30 imóveis por (ano, bairro), pra tabela de pesquisa.
const RESUMO_URL = `${process.env.NEXT_PUBLIC_API_BASE_LOGIN}/data/IPTU_resumo.parquet`;
const AMOSTRA_URL = `${process.env.NEXT_PUBLIC_API_BASE_LOGIN}/data/IPTU_amostra.parquet`;

function normalizeBigInt(rows: any[]) {
  return rows.map((row) => {
    const normalized: any = {};
    for (const key of Object.keys(row)) {
      const v = row[key];
      normalized[key] = typeof v === "bigint" ? Number(v) : v;
    }
    return normalized;
  });
}

let _resumoCache: any[] | null = null;
let _resumoFetching: Promise<any[]> | null = null;

export async function fetchIptuResumo(): Promise<any[]> {
  if (_resumoCache) return _resumoCache;
  if (_resumoFetching) return _resumoFetching;

  _resumoFetching = (async () => {
    const res = await fetch(RESUMO_URL);
    if (!res.ok) throw new Error(`Erro ao buscar parquet: ${res.status}`);
    const buf = await res.arrayBuffer();
    const rows = normalizeBigInt(await readParquetFromBuffer(buf));
    _resumoCache = rows;
    return rows;
  })();

  return _resumoFetching;
}

let _amostraCache: any[] | null = null;
let _amostraFetching: Promise<any[]> | null = null;

export async function fetchIptuAmostra(): Promise<any[]> {
  if (_amostraCache) return _amostraCache;
  if (_amostraFetching) return _amostraFetching;

  _amostraFetching = (async () => {
    const res = await fetch(AMOSTRA_URL);
    if (!res.ok) throw new Error(`Erro ao buscar parquet: ${res.status}`);
    const buf = await res.arrayBuffer();
    const rows = normalizeBigInt(await readParquetFromBuffer(buf));
    _amostraCache = rows;
    return rows;
  })();

  return _amostraFetching;
}

export function clearIptuCache() {
  _resumoCache = null;
  _resumoFetching = null;
  _amostraCache = null;
  _amostraFetching = null;
}
