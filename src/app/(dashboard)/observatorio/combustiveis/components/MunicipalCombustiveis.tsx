"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { buscarCombustiveisRapido } from "./combustiveisFastClient";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  TooltipBarraCombustiveis as PowerBiBarraTooltip,
  TooltipLinhaCombustiveis as PowerBiLinhaTooltip,
} from "./CombustiveisTooltip";

type RawRow = Record<string, unknown>;

type CombustivelRow = {
  estado: string;
  municipio: string;
  produto: string;
  ano: number;
  mes: number;
  valorVenda: number;
  revenda: string;
  totalPostos: number;
};

type GlobalFilters = {
  ano: string;
  mes: string;
  produto: string;
  estado: string;
  municipio: string;
};

type MunicipioBarItem = {
  municipio: string;
  chave: string;
  valor: number;
};

type SerieMunicipio = {
  periodo: string;
  ordem: number;
} & Record<string, string | number>;

const API_URLS = [
  "/api/data/combustiveis/municipal",
  "/api/data/combustiveis/geral",
  "/api/data/combustiveis/comparativo",
];

const AZUL = "#004b8d";
const LARANJA = "#ff7043";
const CINZA_TEXTO = "#666";

const CORES_MUNICIPIOS = [
  "#2f80ed",
  "#27ae60",
  "#9b51e0",
  "#f2994a",
  "#eb5757",
  "#56ccf2",
  "#bb6bd9",
  "#219653",
  "#f2c94c",
  "#6fcf97",
  "#2d9cdb",
  "#f2994a",
  "#4f4f4f",
  "#00a8a8",
  "#ff6b6b",
  "#7b009b",
  "#ff7043",
  "#0057a8",
  "#1abc9c",
  "#34495e",
  "#8e44ad",
  "#16a085",
  "#c0392b",
  "#2980b9",
  "#d35400",
  "#2c3e50",
  "#95a5a6",
];

const MESES = [
  { numero: 1, nome: "Jan" },
  { numero: 2, nome: "Fev" },
  { numero: 3, nome: "Mar" },
  { numero: 4, nome: "Abr" },
  { numero: 5, nome: "Mai" },
  { numero: 6, nome: "Jun" },
  { numero: 7, nome: "Jul" },
  { numero: 8, nome: "Ago" },
  { numero: 9, nome: "Set" },
  { numero: 10, nome: "Out" },
  { numero: 11, nome: "Nov" },
  { numero: 12, nome: "Dez" },
];

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

function abreviarNome(value: string, max = 15) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3)}...`;
}

function isRecifeOuPernambuco(value: string) {
  const normalizado = normalizarTexto(value);

  return (
    normalizado.includes("recife") ||
    normalizado.includes("pernambuco") ||
    normalizado.endsWith(" pe") ||
    normalizado.includes(" - pe")
  );
}

function corMunicipio(chave: string, index: number) {
  if (isRecifeOuPernambuco(chave)) return LARANJA;
  return CORES_MUNICIPIOS[index % CORES_MUNICIPIOS.length] || AZUL;
}

function formatarMoeda(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarNumero(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";
  return value.toLocaleString("pt-BR");
}

function formatarRotulo(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "";
  return value.toFixed(2).replace(".", ",");
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

  if (Number.isFinite(numeric) && numeric >= 1 && numeric <= 12) return numeric;

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

function nomeMesCurto(mes: number) {
  return MESES.find((item) => item.numero === mes)?.nome || String(mes);
}

function criarMapaLinha(row: RawRow) {
  const map = new Map<string, unknown>();

  Object.keys(row).forEach((key) => {
    map.set(normalizarChave(key), row[key]);
  });

  return map;
}

function pegarValor(row: RawRow, possibleNames: string[]) {
  const map = criarMapaLinha(row);

  for (const name of possibleNames) {
    const value = map.get(normalizarChave(name));

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
}

function pegarValorPorContem(row: RawRow, termos: string[]) {
  for (const [key, value] of Object.entries(row)) {
    const keyNormalizada = normalizarChave(key);

    const encontrou = termos.some((termo) =>
      keyNormalizada.includes(normalizarChave(termo))
    );

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

function pegarEstado(row: RawRow) {
  const direto = pegarValor(row, [
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

  if (direto) return String(direto).trim().toUpperCase();

  const porContem = pegarValorPorContem(row, ["uf", "estado"]);
  return String(porContem || "").trim().toUpperCase();
}

function pegarMunicipio(row: RawRow) {
  const direto = pegarValor(row, [
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

  const porContem = pegarValorPorContem(row, ["municipio", "cidade"]);
  return String(porContem || "").trim();
}

function pegarProduto(row: RawRow) {
  const direto = pegarValor(row, [
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

  const porContem = pegarValorPorContem(row, ["produto", "combustivel"]);
  return String(porContem || "Produto não informado").trim();
}

function pegarRevenda(row: RawRow) {
  const direto = pegarValor(row, [
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

  const porContem = pegarValorPorContem(row, [
    "revenda",
    "posto",
    "estabelecimento",
  ]);

  return String(porContem || "").trim();
}

function pegarPreco(row: RawRow) {
  const direto = pegarValor(row, [
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

  const porContem = pegarValorPorContem(row, [
    "preco",
    "valor",
    "venda",
    "revenda",
    "media",
  ]);

  return parseNumero(porContem);
}

function pegarTotalPostos(row: RawRow) {
  const direto = pegarValor(row, [
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

  const porContem = pegarValorPorContem(row, [
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

function pegarData(row: RawRow) {
  const dataValue = pegarValor(row, [
    "Data da Coleta",
    "Data Coleta",
    "data_coleta",
    "Data",
    "data",
    "date",
    "dt_coleta",
    "DT_COLETA",
  ]);

  const anoValue = pegarValor(row, ["Ano", "ano", "year", "ANO"]);

  const mesValue = pegarValor(row, [
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

function normalizarDados(rows: RawRow[]): CombustivelRow[] {
  return rows
    .map((row) => {
      const estado = pegarEstado(row);
      const municipio = pegarMunicipio(row);
      const produto = pegarProduto(row);
      const valorVenda = pegarPreco(row);
      const revenda = pegarRevenda(row);
      const totalPostos = pegarTotalPostos(row);
      const data = pegarData(row);

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
    })
    .filter((row) => {
      return (
        row.estado &&
        row.municipio &&
        row.produto &&
        row.valorVenda > 0 &&
        row.ano > 0
      );
    });
}

async function buscarDados() {
  return buscarCombustiveisRapido(API_URLS);
}

function pesoLinha(_row: CombustivelRow) {
  // Para bater com o Power BI: média simples das linhas.
  return 1;
}

function totalPostos(rows: CombustivelRow[]) {
  const totalDaColuna = rows.reduce((sum, row) => {
    return sum + (row.totalPostos && row.totalPostos > 0 ? row.totalPostos : 0);
  }, 0);

  if (totalDaColuna > 0) return totalDaColuna;

  return rows.length;
}

function valorFiltroGlobal(value: string | undefined | null) {
  let clean = String(value ?? "").replace(/\s+/g, " ").trim();

  const marcadoresDeTextoDaPagina = [
    "Fechar Filtros",
    "Abrir Filtros",
    "Preços de Combustíveis",
    "Precos de Combustiveis",
    "ANP Geral",
    "Comparativo",
    "Regional",
    "Estadual",
    "Municipal",
    "Nenhum dado encontrado",
    "Preço médio",
    "Preco medio",
  ];

  for (const marcador of marcadoresDeTextoDaPagina) {
    const index = normalizarTexto(clean).indexOf(normalizarTexto(marcador));

    if (index > 0) {
      clean = clean.slice(0, index).trim();
    }
  }

  const normalizado = normalizarTexto(clean);

  if (
    !clean ||
    normalizado === "todos" ||
    normalizado === "todo" ||
    normalizado === "all" ||
    normalizado === "undefined" ||
    normalizado === "null"
  ) {
    return "todos";
  }

  return clean;
}

function normalizarMesFiltro(value: string | undefined | null) {
  const clean = valorFiltroGlobal(value);

  if (clean === "todos") return "todos";

  const numeric = Number(clean);

  if (Number.isFinite(numeric) && numeric >= 1 && numeric <= 12) {
    return String(numeric);
  }

  const texto = normalizarTexto(clean);

  const mapaMeses: Record<string, number> = {
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

  return mapaMeses[texto] ? String(mapaMeses[texto]) : "todos";
}

function mesBate(rowMes: number, filtroMes: string) {
  if (filtroMes === "todos") return true;

  return String(rowMes) === filtroMes;
}

type DashboardFilterState = {
  year?: string;
  years?: string[];
  additionalFilters?: {
    label: string;
    selected?: string[];
  }[];
};

function getFiltroAdicional(
  filters: DashboardFilterState,
  labels: string[]
) {
  const labelsNormalizadas = labels.map((label) => normalizarTexto(label));

  const filter = filters.additionalFilters?.find((item) =>
    labelsNormalizadas.includes(normalizarTexto(item.label))
  );

  return valorFiltroGlobal(filter?.selected?.[0]);
}

function useFiltrosGlobaisSelecionados() {
  const { filters } = useDashboard() as { filters: DashboardFilterState };

  return useMemo<GlobalFilters>(() => {
    const ano =
      valorFiltroGlobal(filters.year) !== "todos"
        ? valorFiltroGlobal(filters.year)
        : valorFiltroGlobal(filters.years?.[filters.years.length - 1]);

    const mes = normalizarMesFiltro(
      getFiltroAdicional(filters, ["Mês", "Mes"])
    );

    const produto = valorFiltroGlobal(
      getFiltroAdicional(filters, ["PRODUTO", "Produto"])
    );

    const estadoRaw = valorFiltroGlobal(
      getFiltroAdicional(filters, ["ESTADO", "Estado"])
    );

    const municipio = valorFiltroGlobal(
      getFiltroAdicional(filters, ["MUNICÍPIO", "Municipio"])
    );

    return {
      ano,
      mes,
      produto,
      estado: estadoRaw === "todos" ? "todos" : estadoRaw.toUpperCase(),
      municipio,
    };
  }, [filters]);
}

function municipioBate(rowMunicipio: string, filtroMunicipio: string) {
  if (filtroMunicipio === "todos") return true;

  const rowNorm = normalizarTexto(rowMunicipio);
  const filtroNorm = normalizarTexto(filtroMunicipio);

  if (!rowNorm || !filtroNorm) return false;

  return (
    rowNorm === filtroNorm ||
    rowNorm.includes(filtroNorm) ||
    filtroNorm.includes(rowNorm)
  );
}

function produtoBate(rowProduto: string, filtroProduto: string) {
  if (filtroProduto === "todos") return true;

  const rowNorm = normalizarTexto(rowProduto);
  const filtroNorm = normalizarTexto(filtroProduto);

  return (
    rowNorm === filtroNorm ||
    rowNorm.includes(filtroNorm) ||
    filtroNorm.includes(rowNorm)
  );
}

function filtrarBase(
  dados: CombustivelRow[],
  ano: string,
  mes: string,
  produto: string,
  estado: string,
  municipio: string
) {
  return dados.filter((row) => {
    const matchAno = ano === "todos" || String(row.ano) === ano;
    const matchMes = mesBate(row.mes, mes);
    const matchProduto = produtoBate(row.produto, produto);
    const matchEstado = estado === "todos" || row.estado === estado;
    const matchMunicipio = municipioBate(row.municipio, municipio);

    return matchAno && matchMes && matchProduto && matchEstado && matchMunicipio;
  });
}

function chaveMunicipio(row: CombustivelRow) {
  return `${row.municipio} - ${row.estado}`;
}

function agruparMunicipio(rows: CombustivelRow[], tipo: "media" | "max" | "min") {
  const map = new Map<
    string,
    {
      municipio: string;
      total: number;
      peso: number;
      max: number;
      min: number;
    }
  >();

  rows.forEach((row) => {
    const chave = chaveMunicipio(row);
    const atual =
      map.get(chave) ||
      {
        municipio: chave,
        total: 0,
        peso: 0,
        max: -Infinity,
        min: Infinity,
      };

    const peso = pesoLinha(row);

    atual.total += row.valorVenda * peso;
    atual.peso += peso;
    atual.max = Math.max(atual.max, row.valorVenda);
    atual.min = Math.min(atual.min, row.valorVenda);

    map.set(chave, atual);
  });

  return Array.from(map.entries())
    .filter(([, item]) => item.peso > 0)
    .map(([chave, item]) => {
      let valor = item.total / item.peso;

      if (tipo === "max") valor = item.max;
      if (tipo === "min") valor = item.min;

      return {
        chave,
        municipio: item.municipio,
        valor: Number(valor.toFixed(2)),
      };
    })
    .sort((a, b) => b.valor - a.valor);
}

function seriePorMunicipio(rows: CombustivelRow[], anoSelecionado: string): SerieMunicipio[] {
  const map = new Map<
    string,
    {
      periodo: string;
      ordem: number;
      municipios: Map<string, { total: number; peso: number }>;
    }
  >();

  rows.forEach((row) => {
    const municipio = chaveMunicipio(row);

    const key =
      anoSelecionado === "todos"
        ? `${row.ano}-${String(row.mes).padStart(2, "0")}`
        : String(row.mes).padStart(2, "0");

    const periodo = anoSelecionado === "todos" ? String(row.ano) : nomeMesCurto(row.mes);
    const ordem = anoSelecionado === "todos" ? row.ano * 100 + row.mes : row.mes;

    const atual =
      map.get(key) ||
      {
        periodo,
        ordem,
        municipios: new Map<string, { total: number; peso: number }>(),
      };

    const municipioAtual = atual.municipios.get(municipio) || { total: 0, peso: 0 };
    const peso = pesoLinha(row);

    municipioAtual.total += row.valorVenda * peso;
    municipioAtual.peso += peso;

    atual.municipios.set(municipio, municipioAtual);
    map.set(key, atual);
  });

  return Array.from(map.values())
    .map((item) => {
      const row: SerieMunicipio = {
        periodo: item.periodo,
        ordem: item.ordem,
      };

      item.municipios.forEach((value, municipio) => {
        if (value.peso > 0) {
          row[municipio] = Number((value.total / value.peso).toFixed(2));
        }
      });

      return row;
    })
    .sort((a, b) => a.ordem - b.ordem);
}

function DashboardPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-black bg-white shadow-sm">
      <div className="flex items-center justify-center bg-[#0057a8] px-4 py-1.5">
        <h3 className="text-[17px] font-black tracking-wide text-white">
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
}

function MunicipioBarChart({ data }: { data: MunicipioBarItem[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-[255px] items-center justify-center text-sm font-bold text-slate-500">
        Sem dados para município.
      </div>
    );
  }

  const height = Math.max(255, data.length * 32);
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const item of data) {
    min = Math.min(min, item.valor);
    max = Math.max(max, item.valor);
  }

  if (!Number.isFinite(min)) min = 0;
  if (!Number.isFinite(max)) max = 10;
  const folga = Math.max((max - min) * 0.25, 0.1);
  const domainMin = Math.max(0, Number((min - folga).toFixed(2)));
  const domainMax = Number((max + folga).toFixed(2));

  return (
    <div className="max-h-[255px] overflow-y-auto px-3 py-3">
      <div style={{ height }} className="min-w-[440px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 38, left: 10, bottom: 5 }}
            barCategoryGap={10}
          >
            <XAxis type="number" hide domain={[domainMin, domainMax]} />

            <YAxis
              type="category"
              dataKey="municipio"
              width={115}
              interval={0}
              tick={{ fontSize: 11, fill: CINZA_TEXTO }}
              tickFormatter={(value) => abreviarNome(String(value), 16)}
            />

            <Tooltip content={<PowerBiBarraTooltip />} />

            <Bar dataKey="valor" barSize={18}>
              <LabelList
                dataKey="valor"
                position="insideRight"
                formatter={(value: number) => formatarRotulo(value)}
                style={{ fill: "white", fontSize: 11, fontWeight: 700 }}
              />

              {data.map((entry) => (
                <Cell
                  key={`bar-municipio-${entry.chave}`}
                  fill={isRecifeOuPernambuco(entry.chave) ? LARANJA : AZUL}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CardPostos({ value }: { value: number }) {
  return (
    <div className="flex h-full min-h-[365px] items-center border border-[#0057a8] bg-white px-8">
      <div>
        <p className="text-[24px] font-medium leading-relaxed text-slate-500">
          Quantidade de postos
          <br />
          pesquisados
        </p>

        <p className="mt-7 text-[56px] font-medium tracking-[0.12em] text-[#2f2f2f]">
          {formatarNumero(value)}
        </p>
      </div>
    </div>
  );
}

export default function MunicipalCombustiveis() {
  const filtrosGlobais = useFiltrosGlobaisSelecionados();

  const [dados, setDados] = useState<CombustivelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setLoading(true);
        setErro("");

        const rawRows = await buscarDados();
        const normalizados = normalizarDados(rawRows);

        if (!ativo) return;

        if (normalizados.length === 0) {
          const colunas = rawRows[0]
            ? Object.keys(rawRows[0]).join(", ")
            : "nenhuma coluna";

          throw new Error(
            `Os dados foram carregados, mas nenhuma linha válida foi encontrada. Colunas recebidas: ${colunas}`
          );
        }

        setDados(normalizados);
      } catch (error) {
        if (!ativo) return;

        setErro(
          error instanceof Error
            ? error.message
            : "Erro ao carregar a página municipal de combustíveis."
        );
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  const { ano, mes, produto, estado, municipio } = filtrosGlobais;

  const dadosFiltrados = useMemo(() => {
    const filtroPrincipal = filtrarBase(
      dados,
      ano,
      mes,
      produto,
      estado,
      municipio
    );

    if (filtroPrincipal.length > 0) return filtroPrincipal;

    if (municipio !== "todos" && estado === "todos") {
      const filtroPorMunicipio = filtrarBase(
        dados,
        ano,
        mes,
        produto,
        "todos",
        municipio
      );

      if (filtroPorMunicipio.length > 0) return filtroPorMunicipio;
    }

    return filtroPrincipal;
  }, [dados, ano, mes, produto, estado, municipio]);

  const mediaPorMunicipio = useMemo(() => {
    return agruparMunicipio(dadosFiltrados, "media");
  }, [dadosFiltrados]);

  const maxPorMunicipio = useMemo(() => {
    return agruparMunicipio(dadosFiltrados, "max");
  }, [dadosFiltrados]);

  const minPorMunicipio = useMemo(() => {
    return agruparMunicipio(dadosFiltrados, "min");
  }, [dadosFiltrados]);

  const serie = useMemo(() => {
    return seriePorMunicipio(dadosFiltrados, ano);
  }, [dadosFiltrados, ano]);

  const municipiosVisiveis = useMemo(() => {
    return Array.from(new Set(dadosFiltrados.map((row) => chaveMunicipio(row))))
      .sort((a, b) => a.localeCompare(b, "pt-BR"))
      .slice(0, 60);
  }, [dadosFiltrados]);

  const totalAtual = useMemo(() => totalPostos(dadosFiltrados), [dadosFiltrados]);

  if (loading) {
    return (
      <section className="rounded-md bg-white p-6 shadow-sm">
        <p className="text-sm font-black text-slate-700">
          Carregando página municipal de combustíveis...
        </p>
      </section>
    );
  }

  if (erro) {
    return (
      <section className="rounded-md border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-black text-red-700">{erro}</p>
      </section>
    );
  }

  return (
    <section className="w-full space-y-4">
      {dadosFiltrados.length === 0 && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-800">
          Nenhum dado encontrado para: Ano {ano}, Mês {mes}, Produto {produto}, Estado {estado}, Município {municipio}.
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        <DashboardPanel title="Preço médio por município">
          <MunicipioBarChart data={mediaPorMunicipio} />
        </DashboardPanel>

        <DashboardPanel title="Preço máximo por município">
          <MunicipioBarChart data={maxPorMunicipio} />
        </DashboardPanel>

        <DashboardPanel title="Preço mínimo por município">
          <MunicipioBarChart data={minPorMunicipio} />
        </DashboardPanel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2.55fr_0.9fr]">
        <DashboardPanel title="Preço médio pesquisado por município">
          <div className="mb-1 mt-2 flex max-h-[42px] flex-wrap items-center justify-start gap-2 overflow-hidden px-4 text-sm font-bold text-slate-600">
            <span>MUNICÍPIO</span>

            {municipiosVisiveis.map((municipioNome, index) => (
              <span key={`legenda-${municipioNome}`} className="flex items-center gap-1">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: corMunicipio(municipioNome, index) }}
                />
                <span className="font-medium">{abreviarNome(municipioNome, 10)}</span>
              </span>
            ))}
          </div>

          <div className="h-[340px] px-5 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serie} margin={{ top: 22, right: 32, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="periodo" tick={{ fontSize: 12 }} />

                <YAxis
                  hide
                  domain={[
                    (dataMin: number) => Math.max(0, Number((dataMin - 2).toFixed(2))),
                    (dataMax: number) => Number((dataMax + 2).toFixed(2)),
                  ]}
                />

                <Tooltip content={<PowerBiLinhaTooltip />} />

                {municipiosVisiveis.map((municipioNome, index) => (
                  <Line
                    key={`linha-${municipioNome}`}
                    type="monotone"
                    dataKey={municipioNome}
                    name={municipioNome}
                    stroke={corMunicipio(municipioNome, index)}
                    strokeWidth={isRecifeOuPernambuco(municipioNome) ? 4 : 3}
                    dot={false}
                    connectNulls
                  >
                    <LabelList
                      dataKey={municipioNome}
                      position="top"
                      formatter={(value: number) => formatarRotulo(value)}
                      style={{ fontSize: 9, fill: "#666" }}
                    />
                  </Line>
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardPanel>

        <CardPostos value={totalAtual} />
      </div>
    </section>
  );
}
