"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { buscarCombustiveisRapido } from "./combustiveisFastClient";
import { TooltipBarraCombustiveis as PowerBiBarraTooltip, TooltipLinhaCombustiveis as PowerBiLinhaTooltip } from "./CombustiveisTooltip";
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

type SelectOption = {
  label: string;
  value: string;
};

type SeriePeriodo = {
  periodo: string;
  valor: number;
  ordem: number;
};

type ProdutoBar = {
  produto: string;
  valor: number;
};

const API_URL = "/api/data/combustiveis/comparativo";
const LARANJA = "#ff7043";
const AZUL = "#0057a8";

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

function formatarMoedaSemEspaco(value: number | null | undefined) {
  return formatarMoeda(value).replace(/\s/g, "");
}

function formatarNumero(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";
  return value.toLocaleString("pt-BR");
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

  if (numeroDireto > 0) {
    return numeroDireto;
  }

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
  const possibleKeys = ["data", "rows", "items", "results", "combustiveis", "dados"];

  for (const key of possibleKeys) {
    const value = obj[key];

    if (Array.isArray(value)) return value as RawRow[];
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

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
}

function isRecife(row: CombustivelRow) {
  const municipio = normalizarTexto(row.municipio);
  const estado = normalizarTexto(row.estado);

  // O parquet pode vir como "Recife", "RECIFE", "Recife - PE" ou com variações.
  // Antes estava muito rígido e por isso os cards/gráficos de Recife ficavam vazios.
  return municipio === "recife" || municipio.includes("recife") || (
    estado === "pe" && municipio.replace(/[^a-z]/g, "") === "recife"
  );
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

function contarPostos(rows: CombustivelRow[]) {
  // Igual ao Power BI:
  // se a base já vier agregada com uma coluna de quantidade/total de postos,
  // somamos essa coluna. Se não existir, usamos a quantidade de linhas.
  const totalDaColuna = rows.reduce((sum, row) => {
    return sum + (row.totalPostos && row.totalPostos > 0 ? row.totalPostos : 0);
  }, 0);

  if (totalDaColuna > 0) {
    return totalDaColuna;
  }

  return rows.length;
}

function nomeMesCurto(mes: number) {
  const meses = [
    "",
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return meses[mes] || String(mes);
}

function seriePorPeriodo(
  rows: CombustivelRow[],
  produto: string,
  anoSelecionado: string
): SeriePeriodo[] {
  const map = new Map<
    string,
    {
      label: string;
      ordem: number;
      total: number;
      peso: number;
    }
  >();

  rows
    .filter((row) => {
      const matchProduto = row.produto === produto;
      const matchAno =
        anoSelecionado === "todos" || String(row.ano) === anoSelecionado;

      return matchProduto && matchAno;
    })
    .forEach((row) => {
      const key =
        anoSelecionado === "todos"
          ? String(row.ano)
          : String(row.mes).padStart(2, "0");

      const label =
        anoSelecionado === "todos" ? String(row.ano) : nomeMesCurto(row.mes);

      const ordem = anoSelecionado === "todos" ? row.ano : row.mes;

      const atual =
        map.get(key) ||
        {
          label,
          ordem,
          total: 0,
          peso: 0,
        };

      const peso = pesoLinha(row);

      atual.total += row.valorVenda * peso;
      atual.peso += peso;

      map.set(key, atual);
    });

  return Array.from(map.values())
    .filter((item) => item.peso > 0)
    .map((item) => ({
      periodo: item.label,
      ordem: item.ordem,
      valor: Number((item.total / item.peso).toFixed(2)),
    }))
    .sort((a, b) => a.ordem - b.ordem);
}

function barrasPorProduto(rows: CombustivelRow[]): ProdutoBar[] {
  const map = new Map<string, { total: number; peso: number }>();

  rows.forEach((row) => {
    const atual = map.get(row.produto) || { total: 0, peso: 0 };
    const peso = pesoLinha(row);

    atual.total += row.valorVenda * peso;
    atual.peso += peso;

    map.set(row.produto, atual);
  });

  return Array.from(map.entries())
    .filter(([, item]) => item.peso > 0)
    .map(([produto, item]) => ({
      produto,
      valor: Number((item.total / item.peso).toFixed(2)),
    }))
    .sort((a, b) => b.valor - a.valor);
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-900 bg-white shadow-sm">
      <div className="bg-[#0057a8] px-4 py-2 text-center">
        <h3 className="text-[16px] font-black tracking-wide text-white">
          {title}
        </h3>
      </div>

      <div className="p-3">{children}</div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-[92px] flex-1 border border-slate-300 bg-white p-4">
      <p className="text-[17px] font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-[30px] font-medium text-slate-800">{value}</p>
    </div>
  );
}

function EmptyPanel({ title }: { title: string }) {
  return (
    <Panel title={title}>
      <div className="flex h-[210px] items-center justify-center text-center text-sm font-semibold text-slate-400">
        Selecione um município para exibir o gráfico.
      </div>
    </Panel>
  );
}

export default function ComparativoCombustiveis() {
  const [dados, setDados] = useState<CombustivelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [ano, setAno] = useState("todos");
  const [produtoLinha, setProdutoLinha] = useState("");
  const [estadoComparado, setEstadoComparado] = useState("PE");
  const [municipioComparado, setMunicipioComparado] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setLoading(true);
        setErro("");

        const rawRows = await buscarCombustiveisRapido([API_URL]);
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

        const produtos = uniqueSorted(normalizados.map((row) => row.produto));

        const produtoInicial =
          produtos.find((item) => normalizarTexto(item) === "glp") ||
          produtos.find((item) => normalizarTexto(item) === "gasolina comum") ||
          produtos[0] ||
          "";

        setDados(normalizados);
        setAno("todos");
        setProdutoLinha(produtoInicial);
      } catch (error) {
        if (!ativo) return;

        setErro(
          error instanceof Error
            ? error.message
            : "Erro ao carregar o comparativo."
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

  const anosOptions = useMemo<SelectOption[]>(() => {
    const anos = Array.from(new Set(dados.map((row) => row.ano))).sort(
      (a, b) => b - a
    );

    return [
      { label: "Todos", value: "todos" },
      ...anos.map((item) => ({ label: String(item), value: String(item) })),
    ];
  }, [dados]);

  const produtosOptions = useMemo<SelectOption[]>(() => {
    return uniqueSorted(dados.map((row) => row.produto)).map((item) => ({
      label: item,
      value: item,
    }));
  }, [dados]);

  const estadosOptions = useMemo<SelectOption[]>(() => {
    return uniqueSorted(dados.map((row) => row.estado)).map((item) => ({
      label: item,
      value: item,
    }));
  }, [dados]);

  const municipiosOptions = useMemo<SelectOption[]>(() => {
    const municipios = uniqueSorted(
      dados
        .filter((row) => row.estado === estadoComparado && !isRecife(row))
        .map((row) => row.municipio)
    );

    return [
      { label: "Selecione", value: "" },
      ...municipios.map((item) => ({ label: item, value: item })),
    ];
  }, [dados, estadoComparado]);

  useEffect(() => {
    const municipioExiste = municipiosOptions.some(
      (option) => option.value === municipioComparado
    );

    if (!municipioExiste) setMunicipioComparado("");
  }, [estadoComparado, municipiosOptions, municipioComparado]);

  const dadosAno = useMemo(() => {
    return dados.filter((row) => {
      if (ano === "todos") return true;
      return String(row.ano) === ano;
    });
  }, [dados, ano]);

  const recifeRowsAno = useMemo(() => {
    return dadosAno.filter((row) => isRecife(row));
  }, [dadosAno]);

  const recifeRowsTodos = useMemo(() => {
    return dados.filter((row) => isRecife(row));
  }, [dados]);

  const recifeRows = useMemo(() => {
    if (recifeRowsAno.length > 0) return recifeRowsAno;
    return recifeRowsTodos;
  }, [recifeRowsAno, recifeRowsTodos]);

  const municipioRows = useMemo(() => {
    if (!municipioComparado) return [];

    return dadosAno.filter((row) => {
      return (
        row.estado === estadoComparado &&
        normalizarTexto(row.municipio) === normalizarTexto(municipioComparado)
      );
    });
  }, [dadosAno, estadoComparado, municipioComparado]);

  const municipioRowsTodos = useMemo(() => {
    if (!municipioComparado) return [];

    return dados.filter((row) => {
      return (
        row.estado === estadoComparado &&
        normalizarTexto(row.municipio) === normalizarTexto(municipioComparado)
      );
    });
  }, [dados, estadoComparado, municipioComparado]);

  // Cards superiores:
  // O preço médio e a quantidade de postos devem considerar o PRODUTO selecionado,
  // não a média geral de todos os combustíveis.
  const recifeRowsProduto = useMemo(() => {
    return recifeRows.filter((row) => row.produto === produtoLinha);
  }, [recifeRows, produtoLinha]);

  const municipioRowsProduto = useMemo(() => {
    return municipioRows.filter((row) => row.produto === produtoLinha);
  }, [municipioRows, produtoLinha]);

  const mediaRecife = useMemo(() => media(recifeRowsProduto), [recifeRowsProduto]);
  const mediaMunicipio = useMemo(() => media(municipioRowsProduto), [municipioRowsProduto]);

  const totalPostosRecife = useMemo(
    () => contarPostos(recifeRowsProduto),
    [recifeRowsProduto]
  );

  const totalPostosMunicipio = useMemo(
    () => contarPostos(municipioRowsProduto),
    [municipioRowsProduto]
  );

  const serieRecife = useMemo(() => {
    return seriePorPeriodo(recifeRowsTodos, produtoLinha, ano);
  }, [recifeRowsTodos, produtoLinha, ano]);

  const serieMunicipio = useMemo(() => {
    return seriePorPeriodo(municipioRowsTodos, produtoLinha, ano);
  }, [municipioRowsTodos, produtoLinha, ano]);

  const barrasRecife = useMemo(() => {
    return barrasPorProduto(recifeRows);
  }, [recifeRows]);

  const barrasMunicipio = useMemo(() => {
    return barrasPorProduto(municipioRows);
  }, [municipioRows]);

  if (loading) {
    return (
      <section className="rounded-md bg-white p-6 shadow-sm">
        <p className="text-sm font-black text-slate-700">
          Carregando gráficos do comparativo...
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
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SelectField
            label="Ano"
            value={ano}
            options={anosOptions}
            onChange={setAno}
          />

          <SelectField
            label="Produto do gráfico"
            value={produtoLinha}
            options={produtosOptions}
            onChange={setProdutoLinha}
          />

          <SelectField
            label="Estado"
            value={estadoComparado}
            options={estadosOptions}
            onChange={(value) => {
              setEstadoComparado(value);
              setMunicipioComparado("");
            }}
          />

          <SelectField
            key={estadoComparado}
            label="Município"
            value={municipioComparado}
            options={municipiosOptions}
            onChange={setMunicipioComparado}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Preço médio pesquisado - Recife - PE">
          <div className="grid gap-3 md:grid-cols-2">
            <MetricBox
              label="Preço médio recife"
              value={formatarMoedaSemEspaco(mediaRecife)}
            />
            <MetricBox
              label="Total postos recife"
              value={formatarNumero(totalPostosRecife)}
            />
          </div>
        </Panel>

        <Panel
          title={
            municipioComparado
              ? `Preço médio pesquisado - ${municipioComparado} - ${estadoComparado}`
              : "Selecione um município para comparar com o Recife - PE"
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            <MetricBox
              label={municipioComparado ? "Preço médio município" : "Preço médio em branco"}
              value={municipioComparado ? formatarMoedaSemEspaco(mediaMunicipio) : "--"}
            />

            <MetricBox
              label={municipioComparado ? "Total postos município" : "Total postos em branco"}
              value={municipioComparado ? formatarNumero(totalPostosMunicipio) : "--"}
            />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Preço médio de revenda - Recife - PE">
          <div className="mb-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-600">
            <span>PRODUTO</span>
            <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
            <span>{produtoLinha || "-"}</span>
          </div>

          <div className="h-[235px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={serieRecife}
                margin={{ top: 20, right: 25, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `R$${Number(value).toFixed(0)}`}
                />
                <Tooltip content={<PowerBiLinhaTooltip />} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  name={produtoLinha || "Preço médio"}
                  stroke={LARANJA}
                  strokeWidth={4}
                  dot={{ r: 3 }}
                >
                  <LabelList
                    dataKey="valor"
                    position="top"
                    formatter={(value: number) => formatarMoedaSemEspaco(value)}
                    style={{ fontSize: 11, fill: "#666" }}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {municipioComparado ? (
          <Panel title={`Preço médio de revenda - ${municipioComparado} - ${estadoComparado}`}>
            <div className="mb-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-600">
              <span>PRODUTO</span>
              <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
              <span>{produtoLinha || "-"}</span>
            </div>

            <div className="h-[235px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={serieMunicipio}
                  margin={{ top: 20, right: 25, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" tick={{ fontSize: 11 }} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `R$${Number(value).toFixed(0)}`}
                  />
                  <Tooltip content={<PowerBiLinhaTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    name={produtoLinha || "Preço médio"}
                    stroke={LARANJA}
                    strokeWidth={4}
                    dot={{ r: 3 }}
                  >
                    <LabelList
                      dataKey="valor"
                      position="top"
                      formatter={(value: number) => formatarMoedaSemEspaco(value)}
                      style={{ fontSize: 11, fill: "#666" }}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        ) : (
          <EmptyPanel title="Selecione um município para comparar com o Recife - PE" />
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Preço médio pesquisado - Recife - PE">
          <div className="h-[310px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barrasRecife}
                layout="vertical"
                margin={{ top: 10, right: 55, left: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `R$${Number(value).toFixed(0)}`}
                />
                <YAxis type="category" dataKey="produto" width={125} tick={{ fontSize: 12 }} />
                <Tooltip content={<PowerBiBarraTooltip />} />
                <Bar dataKey="valor" name="Preço médio">
                  <LabelList
                    dataKey="valor"
                    position="right"
                    formatter={(value: number) => formatarMoedaSemEspaco(value)}
                    style={{ fontSize: 12, fill: "#666" }}
                  />
                  {barrasRecife.map((entry) => (
                    <Cell key={`recife-${entry.produto}`} fill={LARANJA} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {municipioComparado ? (
          <Panel title={`Preço médio pesquisado - ${municipioComparado} - ${estadoComparado}`}>
            <div className="h-[310px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barrasMunicipio}
                  layout="vertical"
                  margin={{ top: 10, right: 55, left: 30, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `R$${Number(value).toFixed(0)}`}
                  />
                  <YAxis type="category" dataKey="produto" width={125} tick={{ fontSize: 12 }} />
                  <Tooltip content={<PowerBiBarraTooltip />} />
                  <Bar dataKey="valor" name="Preço médio">
                    <LabelList
                      dataKey="valor"
                      position="right"
                      formatter={(value: number) => formatarMoedaSemEspaco(value)}
                      style={{ fontSize: 12, fill: "#666" }}
                    />
                    {barrasMunicipio.map((entry) => (
                      <Cell key={`municipio-${entry.produto}`} fill={LARANJA} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        ) : (
          <EmptyPanel title="Selecione um município para comparar com o Recife - PE" />
        )}
      </div>
    </section>
  );
}
