import { readParquetFromBuffer } from "@/@api/config/parquetReader";

// Arquivo ainda não foi enviado — quando chegar, basta colocar em
// {backend}/static/data/capag.parquet que esse fetch passa a funcionar.
const PARQUET_URL = `${process.env.NEXT_PUBLIC_API_BASE_LOGIN}/data/capag.parquet`;

let _cache: any[] | null = null;
let _fetching: Promise<any[] | null> | null = null;

export async function fetchCapagRaw(): Promise<any[] | null> {
  if (_cache) return _cache;
  if (_fetching) return _fetching;

  _fetching = (async () => {
    try {
      const res = await fetch(PARQUET_URL);
      if (!res.ok) return null;
      const buf = await res.arrayBuffer();
      const rawRows: any[] = await readParquetFromBuffer(buf);
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
    } catch {
      return null;
    }
  })();

  return _fetching;
}

export function clearCapagCache() {
  _cache = null;
  _fetching = null;
}
