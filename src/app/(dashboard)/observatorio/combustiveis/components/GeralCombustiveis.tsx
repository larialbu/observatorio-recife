"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { buscarCombustiveisRapido } from "./combustiveisFastClient";
import { TooltipBarraComPostosCombustiveis as PowerBiBarraPostosTooltip, TooltipLinhaCombustiveis as PowerBiLinhaTooltip, TooltipDispersaoCombustiveis as PowerBiDispersaoTooltip } from "./CombustiveisTooltip";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

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

type SerieTemporal = {
  periodo: string;
  ordem: number;
  valor: number;
  postos: number;
};

type RankingItem = {
  nome: string;
  valor: number;
  postos: number;
};

type GlobalFilters = {
  ano: string;
  mes: string;
  produto: string;
  estado: string;
  municipio: string;
};

const API_URLS = [
  "/api/data/combustiveis/geral",
  "/api/data/combustiveis/comparativo",
];

const AZUL = "#0057a8";
const VERDE = "#22c55e";
const LARANJA = "#ff7043";
const ROXO = "#8b00b5";
const ROSA = "#d63bb2";

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

const ESTADO_NOME: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso Do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio De Janeiro",
  RN: "Rio Grande Do Norte",
  RS: "Rio Grande Do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "Sao Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

const ESTADO_REGIAO: Record<string, string> = {
  AC: "Norte",
  AP: "Norte",
  AM: "Norte",
  PA: "Norte",
  RO: "Norte",
  RR: "Norte",
  TO: "Norte",
  AL: "Nordeste",
  BA: "Nordeste",
  CE: "Nordeste",
  MA: "Nordeste",
  PB: "Nordeste",
  PE: "Nordeste",
  PI: "Nordeste",
  RN: "Nordeste",
  SE: "Nordeste",
  DF: "Centro Oeste",
  GO: "Centro Oeste",
  MT: "Centro Oeste",
  MS: "Centro Oeste",
  ES: "Sudeste",
  MG: "Sudeste",
  RJ: "Sudeste",
  SP: "Sudeste",
  PR: "Sul",
  RS: "Sul",
  SC: "Sul",
};

const CAPITAIS: Record<string, string> = {
  AC: "Rio Branco",
  AL: "Maceió",
  AP: "Macapá",
  AM: "Manaus",
  BA: "Salvador",
  CE: "Fortaleza",
  DF: "Brasília",
  ES: "Vitória",
  GO: "Goiânia",
  MA: "São Luís",
  MT: "Cuiabá",
  MS: "Campo Grande",
  MG: "Belo Horizonte",
  PA: "Belém",
  PB: "João Pessoa",
  PR: "Curitiba",
  PE: "Recife",
  PI: "Teresina",
  RJ: "Rio de Janeiro",
  RN: "Natal",
  RS: "Porto Alegre",
  RO: "Porto Velho",
  RR: "Boa Vista",
  SC: "Florianópolis",
  SP: "São Paulo",
  SE: "Aracaju",
  TO: "Palmas",
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

function formatarMoeda(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarMoedaCard(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";
  return `R$${value.toFixed(2).replace(".", ",")}`;
}

function formatarMoedaCurta(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function formatarNumero(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";
  return value.toLocaleString("pt-BR");
}

function formatarPercentual(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";
  return `${value.toFixed(2).replace(".", ",")}%`;
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

function pesoLinha(row: CombustivelRow) {
  return row.totalPostos && row.totalPostos > 0 ? row.totalPostos : 1;
}

function media(rows: CombustivelRow[]) {
  if (rows.length === 0) return null;

  const totalPeso = rows.reduce((sum, row) => sum + pesoLinha(row), 0);

  if (totalPeso <= 0) return null;

  const total = rows.reduce(
    (sum, row) => sum + row.valorVenda * pesoLinha(row),
    0
  );

  return total / totalPeso;
}

function totalPostos(rows: CombustivelRow[]) {
  const totalDaColuna = rows.reduce((sum, row) => {
    return sum + (row.totalPostos && row.totalPostos > 0 ? row.totalPostos : 0);
  }, 0);

  if (totalDaColuna > 0) return totalDaColuna;

  return rows.length;
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
}

function isCapital(row: CombustivelRow) {
  const capital = CAPITAIS[row.estado];

  if (!capital) return false;

  const municipioNorm = normalizarTexto(row.municipio);
  const capitalNorm = normalizarTexto(capital);

  return (
    municipioNorm === capitalNorm ||
    municipioNorm.includes(capitalNorm) ||
    capitalNorm.includes(municipioNorm)
  );
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

function serieTemporal(rows: CombustivelRow[], anoSelecionado: string): SerieTemporal[] {
  const map = new Map<
    string,
    {
      periodo: string;
      ordem: number;
      total: number;
      peso: number;
      postos: number;
    }
  >();

  rows.forEach((row) => {
    const key =
      anoSelecionado === "todos"
        ? String(row.ano)
        : String(row.mes).padStart(2, "0");

    const periodo =
      anoSelecionado === "todos" ? String(row.ano) : nomeMesCurto(row.mes);

    const ordem = anoSelecionado === "todos" ? row.ano : row.mes;

    const atual =
      map.get(key) ||
      {
        periodo,
        ordem,
        total: 0,
        peso: 0,
        postos: 0,
      };

    const peso = pesoLinha(row);

    atual.total += row.valorVenda * peso;
    atual.peso += peso;
    atual.postos += peso;

    map.set(key, atual);
  });

  return Array.from(map.values())
    .filter((item) => item.peso > 0)
    .map((item) => ({
      periodo: item.periodo,
      ordem: item.ordem,
      valor: Number((item.total / item.peso).toFixed(2)),
      postos: item.postos,
    }))
    .sort((a, b) => a.ordem - b.ordem);
}

function rankingPor(rows: CombustivelRow[], getNome: (row: CombustivelRow) => string) {
  const map = new Map<string, { total: number; peso: number; postos: number }>();

  rows.forEach((row) => {
    const nome = getNome(row);

    if (!nome) return;

    const atual = map.get(nome) || { total: 0, peso: 0, postos: 0 };
    const peso = pesoLinha(row);

    atual.total += row.valorVenda * peso;
    atual.peso += peso;
    atual.postos += peso;

    map.set(nome, atual);
  });

  return Array.from(map.entries())
    .filter(([, item]) => item.peso > 0)
    .map(([nome, item]) => ({
      nome,
      valor: Number((item.total / item.peso).toFixed(2)),
      postos: item.postos,
    }))
    .sort((a, b) => b.valor - a.valor);
}

function DashboardPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">
      <div className="flex items-center justify-center bg-[#0057a8] px-4 py-2">
        <h3 className="text-[15px] font-black tracking-wide text-white">
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
}

function TopStat({
  label,
  value,
  helper,
  color,
}: {
  label: string;
  value: string;
  helper: string;
  color: string;
}) {
  return (
    <div
      className="min-h-[76px] border-l-4 bg-white px-4 py-3 shadow-sm"
      style={{ borderLeftColor: color }}
    >
      <p className="text-xs font-black text-slate-900">{label}</p>
      <p className="mt-1 text-[20px] font-black text-slate-900">{value}</p>
      <p className="text-[11px] font-medium text-slate-500">{helper}</p>
    </div>
  );
}

function RegionBlocks({ data }: { data: RankingItem[] }) {
  const cores: Record<string, string> = {
    Norte: LARANJA,
    Nordeste: VERDE,
    Sul: ROXO,
    "Centro Oeste": ROSA,
    Sudeste: AZUL,
  };

  const ordem = ["Norte", "Nordeste", "Sul", "Centro Oeste", "Sudeste"];

  const ordenado = [...data].sort((a, b) => {
    const indexA = ordem.indexOf(a.nome);
    const indexB = ordem.indexOf(b.nome);

    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  if (ordenado.length === 0) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm font-bold text-slate-500">
        Sem dados para região.
      </div>
    );
  }

  return (
    <div className="grid h-[260px] grid-cols-3 grid-rows-2 gap-0 p-3 text-white">
      {ordenado.map((item) => (
        <div
          key={item.nome}
          className="flex min-h-[110px] flex-col justify-between p-3"
          style={{
            backgroundColor:
              item.nome === "Nordeste" ? LARANJA : cores[item.nome] || AZUL,
          }}
        >
          <span className="text-[14px] font-black">{item.nome}</span>

          <span className="text-[14px] font-black">
            {item.valor.toFixed(2).replace(".", ",")}
          </span>
        </div>
      ))}
    </div>
  );
}

function itemDeDestaque(nome: string) {
  const nomeNormalizado = normalizarTexto(nome);

  return (
    nomeNormalizado.includes("recife") ||
    nomeNormalizado.includes("pernambuco") ||
    nomeNormalizado === "pe" ||
    nomeNormalizado.endsWith(" pe")
  );
}

function calcularDominioRanking(data: RankingItem[]) {
  if (data.length === 0) return [0, 10] as [number, number];

  let menor = Number.POSITIVE_INFINITY;
  let maior = Number.NEGATIVE_INFINITY;

  for (const item of data) {
    menor = Math.min(menor, item.valor);
    maior = Math.max(maior, item.valor);
  }

  if (!Number.isFinite(menor)) menor = 0;
  if (!Number.isFinite(maior)) maior = 10;

  if (!Number.isFinite(menor) || !Number.isFinite(maior)) {
    return [0, 10] as [number, number];
  }

  if (menor === maior) {
    return [
      Math.max(0, Number((menor - 0.5).toFixed(2))),
      Number((maior + 0.5).toFixed(2)),
    ] as [number, number];
  }

  const folga = Math.max((maior - menor) * 0.25, 0.15);

  return [
    Math.max(0, Number((menor - folga).toFixed(2))),
    Number((maior + folga).toFixed(2)),
  ] as [number, number];
}

function RankingChart({ data }: { data: RankingItem[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm font-bold text-slate-500">
        Sem dados para o filtro.
      </div>
    );
  }

  const height = Math.max(300, data.length * 38);
  const domain = calcularDominioRanking(data);

  return (
    <div className="max-h-[310px] overflow-y-auto px-3 py-3">
      <div style={{ height }} className="min-w-[700px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 70, left: 34, bottom: 8 }}
            barCategoryGap={12}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />

            <XAxis
              type="number"
              domain={domain}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `R$ ${Number(value).toFixed(2)}`}
            />

            <YAxis
              type="category"
              dataKey="nome"
              width={190}
              interval={0}
              tick={{ fontSize: 11, fill: "#555" }}
            />

            <Tooltip content={<PowerBiBarraPostosTooltip />} />

            <Bar dataKey="valor" name="Preço médio" barSize={20}>
              <LabelList
                dataKey="valor"
                position="right"
                formatter={(value: number) => value.toFixed(2).replace(".", ",")}
                style={{ fontSize: 11, fill: "#444", fontWeight: 700 }}
              />

              {data.map((entry) => (
                <Cell
                  key={`ranking-${entry.nome}`}
                  fill={itemDeDestaque(entry.nome) ? LARANJA : AZUL}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export default function GeralCombustiveis() {
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
            : "Erro ao carregar a página geral de combustíveis."
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

  const ano = filtrosGlobais.ano;
  const mes = filtrosGlobais.mes;
  const produto = filtrosGlobais.produto;
  const estado = filtrosGlobais.estado;
  const municipio = filtrosGlobais.municipio;

  const dadosFiltrados = useMemo(() => {
    const filtroPrincipal = filtrarBase(dados, ano, mes, produto, estado, municipio);

    if (filtroPrincipal.length > 0) {
      return filtroPrincipal;
    }

    // Segurança para o caso do filtro global mandar MUNICÍPIO preenchido,
    // mas ESTADO como "Todos". Exemplo: Fortaleza com Estado Todos.
    // Aqui tentamos encontrar o município sem depender do estado.
    if (municipio !== "todos" && estado === "todos") {
      const filtroPorMunicipio = filtrarBase(
        dados,
        ano,
        mes,
        produto,
        "todos",
        municipio
      );

      if (filtroPorMunicipio.length > 0) {
        return filtroPorMunicipio;
      }
    }

    return filtroPrincipal;
  }, [dados, ano, mes, produto, estado, municipio]);

  const mediaAtual = useMemo(() => media(dadosFiltrados), [dadosFiltrados]);
  const precoMinimo = useMemo(() => {
    if (dadosFiltrados.length === 0) return null;

    let menor = Number.POSITIVE_INFINITY;

    for (const row of dadosFiltrados) {
      if (row.valorVenda < menor) {
        menor = row.valorVenda;
      }
    }

    return Number.isFinite(menor) ? menor : null;
  }, [dadosFiltrados]);

  const precoMaximo = useMemo(() => {
    if (dadosFiltrados.length === 0) return null;

    let maior = Number.NEGATIVE_INFINITY;

    for (const row of dadosFiltrados) {
      if (row.valorVenda > maior) {
        maior = row.valorVenda;
      }
    }

    return Number.isFinite(maior) ? maior : null;
  }, [dadosFiltrados]);

  const serie = useMemo(() => {
    return serieTemporal(dadosFiltrados, ano);
  }, [dadosFiltrados, ano]);

  const periodoAnterior = useMemo(() => {
    if (serie.length < 2) return null;
    return serie[serie.length - 2].valor;
  }, [serie]);

  const variacao = useMemo(() => {
    if (mediaAtual === null || periodoAnterior === null || periodoAnterior === 0) {
      return null;
    }

    return ((mediaAtual - periodoAnterior) / periodoAnterior) * 100;
  }, [mediaAtual, periodoAnterior]);

  const totalAtual = useMemo(() => totalPostos(dadosFiltrados), [dadosFiltrados]);

  const scatterData = useMemo(() => {
    if (dadosFiltrados.length === 0) return [];

    return [
      {
        periodo: ano === "todos" ? "Todos" : ano,
        preco: Number((mediaAtual || 0).toFixed(2)),
        postos: totalAtual,
      },
    ];
  }, [dadosFiltrados, ano, mediaAtual, totalAtual]);

  const rankingRegiao = useMemo(() => {
    return rankingPor(dadosFiltrados, (row) => ESTADO_REGIAO[row.estado] || "Sem região");
  }, [dadosFiltrados]);

  const rankingEstado = useMemo(() => {
    return rankingPor(dadosFiltrados, (row) => ESTADO_NOME[row.estado] || row.estado);
  }, [dadosFiltrados]);

  const estadoInferido = useMemo(() => {
    if (estado !== "todos") return estado;

    if (municipio === "todos") return "Todos";

    const rowEncontrada = dados.find((row) => municipioBate(row.municipio, municipio));

    return rowEncontrada?.estado || "";
  }, [dados, estado, municipio]);

  const rankingCapital = useMemo(() => {
    const capitalDoFiltroAtual = rankingPor(
      dadosFiltrados.filter((row) => isCapital(row)),
      (row) => {
        const capitalNome = CAPITAIS[row.estado] || row.municipio;
        return `${capitalNome} - ${row.estado}`;
      }
    );

    if (capitalDoFiltroAtual.length > 0) {
      return capitalDoFiltroAtual;
    }

    // Quando o filtro global vem com MUNICÍPIO preenchido, o conjunto filtrado
    // pode ficar muito estreito. Para o gráfico "por capital" não ficar vazio,
    // usamos as capitais do estado selecionado ou do estado inferido pelo município.
    const estadoParaCapital =
      estado !== "todos"
        ? estado
        : estadoInferido && estadoInferido !== "Todos"
        ? estadoInferido
        : "todos";

    const baseCapitais = filtrarBase(
      dados,
      ano,
      mes,
      produto,
      estadoParaCapital,
      "todos"
    ).filter((row) => isCapital(row));

    return rankingPor(baseCapitais, (row) => {
      const capitalNome = CAPITAIS[row.estado] || row.municipio;
      return `${capitalNome} - ${row.estado}`;
    });
  }, [dados, dadosFiltrados, ano, mes, produto, estado, estadoInferido]);

  const tituloLocal =
    municipio !== "todos"
      ? estadoInferido
        ? `${municipio} - ${estadoInferido}`
        : municipio
      : estado !== "todos"
      ? estado
      : "Todos - Todos";

  if (loading) {
    return (
      <section className="rounded-md bg-white p-6 shadow-sm">
        <p className="text-sm font-black text-slate-700">
          Carregando página geral de combustíveis...
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
          Se o município estiver preenchido com Estado Todos, o sistema tenta localizar automaticamente.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <TopStat
          label="Preço médio"
          value={formatarMoedaCard(mediaAtual)}
          helper="Preço médio de revenda"
          color={LARANJA}
        />

        <TopStat
          label="Mês anterior"
          value={formatarMoedaCard(periodoAnterior)}
          helper="Preço médio do mês anterior"
          color="#2563eb"
        />

        <TopStat
          label="Variação"
          value={formatarPercentual(variacao)}
          helper="Variação em relação ao mês anterior"
          color={VERDE}
        />

        <TopStat
          label="Preço mínimo"
          value={formatarMoedaCard(precoMinimo)}
          helper="Menor preço encontrado"
          color={LARANJA}
        />

        <TopStat
          label="Preço máximo"
          value={formatarMoedaCard(precoMaximo)}
          helper="Maior preço encontrado"
          color="#2563eb"
        />

        <TopStat
          label="Postos pesquisados"
          value={formatarNumero(totalAtual)}
          helper="Quantidade de postos analisados"
          color={VERDE}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <DashboardPanel title="Preço médio de revenda">
          <div className="mb-1 mt-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-600">
            <span className="uppercase">Preço médio</span>
            <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div className="h-[310px] px-5 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serie} margin={{ top: 24, right: 24, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `R$ ${Number(value).toFixed(2)}`}
                />
                <Tooltip content={<PowerBiLinhaTooltip />} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  name="Preço médio"
                  stroke={VERDE}
                  strokeWidth={4}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardPanel>

        <DashboardPanel title={`Preço médio x Qtd de postos - ${tituloLocal}`}>
          <div className="mb-1 mt-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-600">
            <span>Postos</span>
            <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div className="h-[310px] px-5 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 28, bottom: 15, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="preco"
                  name="Preço médio"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `R$ ${Number(value).toFixed(2)}`}
                />
                <YAxis
                  type="number"
                  dataKey="postos"
                  name="Postos"
                  tick={{ fontSize: 11 }}
                />
                <ZAxis range={[100, 180]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<PowerBiDispersaoTooltip />} />
                <Scatter name="Postos" data={scatterData} fill={VERDE} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </DashboardPanel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <DashboardPanel title="Preço médio por região">
          <RegionBlocks data={rankingRegiao} />
        </DashboardPanel>

        <DashboardPanel title="Preço médio por estado">
          <RankingChart data={rankingEstado} />
        </DashboardPanel>

        <DashboardPanel title="Preço médio por capital">
          <RankingChart data={rankingCapital} />
        </DashboardPanel>
      </div>
    </section>
  );
}
