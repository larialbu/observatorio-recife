"use client";

type RawRow = Record<string, unknown>;

declare global {
  interface Window {
    __combustiveisRowsCache?: RawRow[];
    __combustiveisRowsPromise?: Promise<RawRow[]>;
  }
}

const FAST_API_URL = "/api/data/combustiveis/fast";
const FETCH_TIMEOUT_MS = 60000;

function extrairRowsDeJson(data: unknown): RawRow[] {
  if (Array.isArray(data)) return data as RawRow[];
  if (!data || typeof data !== "object") return [];

  const obj = data as Record<string, unknown>;

  const possibleKeys = [
    "data",
    "rows",
    "items",
    "results",
    "combustiveis",
    "dados",
    "result",
    "records",
    "values",
  ];

  for (const key of possibleKeys) {
    const value = obj[key];

    if (Array.isArray(value)) return value as RawRow[];

    if (value && typeof value === "object") {
      const nested = extrairRowsDeJson(value);
      if (nested.length > 0) return nested;
    }
  }

  return [];
}

async function fetchComTimeout(url: string) {
  const controller = new AbortController();

  const timeout = window.setTimeout(() => {
    controller.abort();
  }, FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    return response;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function baixarDados(urls: string[]) {
  const errors: string[] = [];
  const urlsUnicas = Array.from(new Set([FAST_API_URL, ...urls]));

  for (const url of urlsUnicas) {
    try {
      const response = await fetchComTimeout(url);

      if (!response.ok) {
        errors.push(`${url} retornou ${response.status}`);
        continue;
      }

      const json = await response.json();
      const rows = extrairRowsDeJson(json);

      if (rows.length > 0) return rows;

      errors.push(`${url} retornou JSON sem lista de dados`);
    } catch (error) {
      errors.push(
        `${url}: ${
          error instanceof Error
            ? error.name === "AbortError"
              ? "tempo limite excedido"
              : error.message
            : "erro desconhecido"
        }`
      );
    }
  }

  throw new Error(
    `Nenhuma rota retornou linhas válidas. Detalhes: ${errors.join(" | ")}`
  );
}

export async function buscarCombustiveisRapido(urls: string[]) {
  if (typeof window === "undefined") {
    return baixarDados(urls);
  }

  if (window.__combustiveisRowsCache?.length) {
    return window.__combustiveisRowsCache;
  }

  if (!window.__combustiveisRowsPromise) {
    window.__combustiveisRowsPromise = baixarDados(urls).then((rows) => {
      window.__combustiveisRowsCache = rows;
      return rows;
    });
  }

  return window.__combustiveisRowsPromise;
}

export function limparCacheCombustiveis() {
  if (typeof window === "undefined") return;

  delete window.__combustiveisRowsCache;
  delete window.__combustiveisRowsPromise;
}
