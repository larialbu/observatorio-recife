import { readParquetFromBuffer } from "@/@api/config/parquetReader";

const PARQUET_URL = `${process.env.NEXT_PUBLIC_API_BASE_LOGIN}/data/ITBI.parquet`;

let _cache: any[] | null = null;
let _fetching: Promise<any[]> | null = null;

export async function fetchItbiRaw(): Promise<any[]> {
  if (_cache) return _cache;
  if (_fetching) return _fetching;

  _fetching = (async () => {
    const res = await fetch(PARQUET_URL);
    if (!res.ok) throw new Error(`Erro ao buscar parquet: ${res.status}`);
    const buf = await res.arrayBuffer();
    const rawRows: any[] = await readParquetFromBuffer(buf);
    // Normaliza campos BigInt (hyparquet retorna colunas Int64 como BigInt)
    const rows = rawRows.map((row) => {
      const normalized: any = {};
      for (const key of Object.keys(row)) {
        const v = row[key];
        normalized[key] = typeof v === "bigint" ? Number(v) : v;
      }
      return normalized;
    });
    _cache = rows;
    return rows;
  })();

  return _fetching;
}

export function clearItbiCache() {
  _cache = null;
  _fetching = null;
}
