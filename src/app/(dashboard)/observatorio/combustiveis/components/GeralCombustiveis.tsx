"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CardData = {
  title: string;
  description?: string;
  value: string | number;
};

type RankingItem = {
  nome?: string;
  name?: string;
  regiao?: string;
  estado?: string;
  municipio?: string;
  preco?: number;
  value?: number;
};

type LinhaItem = {
  mes?: string;
  name?: string;
  preco?: number;
  value?: number;
  postos?: number;
};

type GeralData = {
  id?: string;
  year?: string;
  cards?: CardData[];
  linhaPrecoMedio?: LinhaItem[];
  porRegiao?: RankingItem[];
  porEstado?: RankingItem[];
  porMunicipio?: RankingItem[];
};

type MetricCardData = {
  title: string;
  value: string | number;
  description: string;
  color: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/data";

function toNumber(value: unknown) {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const clean = value
      .replace("R$", "")
      .replace("%", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const parsed = Number(clean);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatPercent(value: number) {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function getName(item: RankingItem | LinhaItem) {
  return (
    item.nome ||
    item.name ||
    item.regiao ||
    item.estado ||
    item.municipio ||
    "Sem nome"
  );
}

function getValue(item?: RankingItem | LinhaItem) {
  if (!item) return 0;

  return Number(item.preco ?? item.value ?? 0);
}

function findCard(cards: CardData[] = [], search: string) {
  return cards.find((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );
}

function downloadChartAsImage(container: HTMLDivElement | null, title: string) {
  if (!container) return;

  const svg = container.querySelector("svg");

  if (!svg) {
    alert("Não foi possível encontrar o gráfico para baixar.");
    return;
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  const blob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")}.svg`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export default function GeralCombustiveis() {
  const [data, setData] = useState<GeralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/combustiveis/geral`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados de combustíveis.");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados de combustíveis.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const processed = useMemo(() => {
    const cards = data?.cards || [];
    const linha = data?.linhaPrecoMedio || [];

    const precoMedioCard = findCard(cards, "preço médio");
    const mesAnteriorCard = findCard(cards, "mês anterior");
    const variacaoCard = findCard(cards, "variação");
    const precoMinimoCard = findCard(cards, "mínimo");
    const precoMaximoCard = findCard(cards, "máximo");
    const postosCard = findCard(cards, "postos");

    const lastLine = linha[linha.length - 1];
    const previousLine = linha[linha.length - 2];

    const precoMedio =
      toNumber(precoMedioCard?.value) || getValue(lastLine) || 0;

    const mesAnterior =
      toNumber(mesAnteriorCard?.value) ||
      getValue(previousLine) ||
      precoMedio ||
      0;

    const variacao =
      variacaoCard?.value !== undefined
        ? toNumber(variacaoCard.value)
        : mesAnterior > 0
        ? ((precoMedio - mesAnterior) / mesAnterior) * 100
        : 0;

    const precoMinimo = toNumber(precoMinimoCard?.value);
    const precoMaximo = toNumber(precoMaximoCard?.value);
    const postos = toNumber(postosCard?.value);

    const linhaFormatada = linha.map((item, index) => ({
      name: item.mes || item.name || `Mês ${index + 1}`,
      preco: getValue(item),
      postos: Number(item.postos ?? 80 + index * 35),
    }));

    return {
      cards: [
        {
          title: "Preço médio",
          value: formatCurrency(precoMedio),
          description: "Preço médio de revenda",
          color: "border-l-orange-500",
        },
        {
          title: "Mês anterior",
          value: formatCurrency(mesAnterior),
          description: "Preço médio do mês anterior",
          color: "border-l-blue-600",
        },
        {
          title: "Variação",
          value: formatPercent(variacao),
          description: "Variação em relação ao mês anterior",
          color: "border-l-green-500",
        },
        {
          title: "Preço mínimo",
          value: formatCurrency(precoMinimo),
          description: "Menor preço encontrado",
          color: "border-l-orange-500",
        },
        {
          title: "Preço máximo",
          value: formatCurrency(precoMaximo),
          description: "Maior preço encontrado",
          color: "border-l-blue-600",
        },
        {
          title: "Postos pesquisados",
          value: postos.toLocaleString("pt-BR"),
          description: "Quantidade de postos analisados",
          color: "border-l-green-500",
        },
      ] as MetricCardData[],

      linha: linhaFormatada,

      porRegiao: (data?.porRegiao || []).map((item) => ({
        name: getName(item),
        preco: getValue(item),
      })),

      porEstado: (data?.porEstado || []).map((item) => ({
        name: getName(item),
        preco: getValue(item),
      })),

      porMunicipio: (data?.porMunicipio || []).map((item) => ({
        name: getName(item),
        preco: getValue(item),
      })),
    };
  }, [data]);

  if (loading) {
    return (
      <div className="w-full rounded-xl bg-white p-8 text-sm text-gray-600 shadow-md dark:bg-[#0b1729] dark:text-gray-300">
        Carregando dados de combustíveis...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-xl bg-white p-8 text-sm text-red-600 shadow-md dark:bg-[#0b1729]">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {processed.cards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-12">
        <ChartCard
          title="Preço médio de revenda"
          legend="Preço médio"
          legendColor="#22c55e"
          className="xl:col-span-9"
        >
          <ResponsiveContainer width="100%" height={360}>
            <LineChart
              data={processed.linha}
              margin={{ top: 14, right: 28, left: 8, bottom: 14 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 13, fill: "#64748b" }}
                axisLine={{ stroke: "#94a3b8" }}
                tickLine={{ stroke: "#94a3b8" }}
              />

              <YAxis
                tick={{ fontSize: 13, fill: "#64748b" }}
                axisLine={{ stroke: "#94a3b8" }}
                tickLine={{ stroke: "#94a3b8" }}
                tickFormatter={(value) => formatCurrency(Number(value))}
              />

              <Tooltip
                content={<LineTooltip />}
                cursor={{ stroke: "#94a3b8", strokeWidth: 1 }}
              />

              <Line
                type="monotone"
                dataKey="preco"
                name="Preço"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{
                  r: 5,
                  strokeWidth: 3,
                  stroke: "#22c55e",
                  fill: "#ffffff",
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Preço médio x Qtd de postos - Recife - PE"
          legend="Postos"
          legendColor="#22c55e"
          className="xl:col-span-3"
        >
          <ResponsiveContainer width="100%" height={360}>
            <ScatterChart margin={{ top: 14, right: 28, left: 8, bottom: 14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" />

              <XAxis
                dataKey="preco"
                name="Preço"
                tick={{ fontSize: 13, fill: "#64748b" }}
                axisLine={{ stroke: "#94a3b8" }}
                tickLine={{ stroke: "#94a3b8" }}
                tickFormatter={(value) => formatCurrency(Number(value))}
              />

              <YAxis
                dataKey="postos"
                name="Postos"
                tick={{ fontSize: 13, fill: "#64748b" }}
                axisLine={{ stroke: "#94a3b8" }}
                tickLine={{ stroke: "#94a3b8" }}
              />

              <Tooltip content={<ScatterTooltip />} />

              <Scatter data={processed.linha} fill="#22c55e" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard
          title="Preço médio por região"
          legend="Preço médio"
          legendColor="#0b5aa0"
        >
          <HorizontalBarChart data={processed.porRegiao} />
        </ChartCard>

        <ChartCard
          title="Preço médio por estado"
          legend="Preço médio"
          legendColor="#0b5aa0"
        >
          <HorizontalBarChart data={processed.porEstado} highlight="PE" />
        </ChartCard>

        <ChartCard
          title="Preço médio por município"
          legend="Preço médio"
          legendColor="#0b5aa0"
        >
          <HorizontalBarChart data={processed.porMunicipio} highlight="Recife" />
        </ChartCard>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  color,
}: {
  title: string;
  value: string | number;
  description: string;
  color: string;
}) {
  return (
    <div
      className={`min-h-[122px] rounded-xl border-l-[6px] ${color} bg-white px-5 py-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[#0b1729]`}
    >
      <h3 className="text-3xl font-extrabold tracking-tight text-[#04122b] dark:text-white">
        {value}
      </h3>

      <p className="mt-2 text-base font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </p>

      <p className="mt-1 text-sm leading-snug text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

function ChartCard({
  title,
  legend,
  legendColor,
  children,
  className = "",
}: {
  title: string;
  legend?: string;
  legendColor?: string;
  children: ReactNode;
  className?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  async function handleFullscreen() {
    setMenuOpen(false);

    if (!cardRef.current) return;

    if (cardRef.current.requestFullscreen) {
      await cardRef.current.requestFullscreen();
    }
  }

  function handleDownload() {
    setMenuOpen(false);
    downloadChartAsImage(cardRef.current, title);
  }

  function handleHide() {
    setMenuOpen(false);
    setHidden(true);
  }

  function handleAddToBoard() {
    setMenuOpen(false);

    window.dispatchEvent(
      new CustomEvent("add-chart-to-board", {
        detail: {
          title,
        },
      })
    );

    alert(`"${title}" foi adicionado ao quadro.`);
  }

  if (hidden) {
    return (
      <div
        className={`rounded-xl border border-dashed border-gray-300 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#0b1729] ${className}`}
      >
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-center">
          <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
            Gráfico oculto
          </p>

          <button
            type="button"
            onClick={() => setHidden(false)}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Mostrar gráfico novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-visible rounded-xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-[#0b1729] ${className}`}
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setMenuOpen((current) => !current);
        }}
        className="absolute right-5 top-4 z-[999] rounded-md px-2 text-2xl font-bold leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-[#13243a] dark:hover:text-white"
        aria-label="Abrir menu do gráfico"
      >
        ...
      </button>

      {menuOpen && (
        <div className="absolute right-5 top-12 z-[1000] w-[230px] rounded-lg border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-600 dark:bg-[#0b1729]">
          <button
            type="button"
            onClick={handleDownload}
            className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#13243a]"
          >
            Baixar como imagem
          </button>

          <button
            type="button"
            onClick={handleFullscreen}
            className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#13243a]"
          >
            Tela cheia
          </button>

          <button
            type="button"
            onClick={handleHide}
            className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#13243a]"
          >
            Esconder gráfico
          </button>

          <button
            type="button"
            onClick={handleAddToBoard}
            className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#13243a]"
          >
            Adicionar ao Quadro
          </button>
        </div>
      )}

      <div className="mb-3 pr-10 text-center">
        <h2 className="text-xl font-extrabold text-[#04122b] dark:text-white">
          {title}
        </h2>

        {legend && (
          <div className="mx-auto mt-3 flex max-w-[520px] items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 dark:border-gray-500">
            <span
              className="mr-2 h-3 w-3 rounded-full"
              style={{ backgroundColor: legendColor || "#ff6b3a" }}
            />

            <span
              className="text-xs font-bold"
              style={{ color: legendColor || "#ff6b3a" }}
            >
              {legend}
            </span>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

function HorizontalBarChart({
  data,
  highlight,
}: {
  data: { name: string; preco: number }[];
  highlight?: string;
}) {
  const sorted = [...data].sort((a, b) => b.preco - a.preco).slice(0, 8);

  const maxValue = Math.max(...sorted.map((item) => item.preco), 0);
  const niceMax = Math.max(8, Math.ceil(maxValue + 1));

  return (
    <div className="h-[280px] w-full overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{
            top: 20,
            right: 24,
            left: 4,
            bottom: 10,
          }}
          barCategoryGap={18}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#b7c3d4"
            horizontal
            vertical
          />

          <XAxis
            type="number"
            orientation="top"
            domain={[0, niceMax]}
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={{ stroke: "#94a3b8" }}
            tickLine={{ stroke: "#94a3b8" }}
            tickFormatter={(value) => formatCurrency(Number(value))}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={112}
            tick={{ fontSize: 11, fill: "#334155" }}
            axisLine={{ stroke: "#94a3b8" }}
            tickLine={false}
          />

          <Tooltip content={<BarTooltip />} />

          <Bar
            dataKey="preco"
            barSize={18}
            maxBarSize={18}
            radius={[0, 5, 5, 0]}
          >
            {sorted.map((entry) => (
              <Cell
                key={entry.name}
                fill={
                  highlight &&
                  entry.name.toLowerCase().includes(highlight.toLowerCase())
                    ? "#ff6b3a"
                    : "#0b5aa0"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LineTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-white px-4 py-3 text-sm shadow-xl dark:bg-[#10233a]">
      <p className="mb-2 font-bold text-[#2563eb]">Mês: {label}</p>

      <p className="font-medium text-gray-700 dark:text-gray-200">
        Preço:{" "}
        <span className="font-extrabold text-[#22c55e]">
          {formatCurrency(Number(payload[0].value))}
        </span>
      </p>
    </div>
  );
}

function ScatterTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  return (
    <div className="rounded-lg bg-white px-4 py-3 text-sm shadow-xl dark:bg-[#10233a]">
      <p className="mb-2 font-bold text-[#2563eb]">{item?.name}</p>

      <p className="font-medium text-gray-700 dark:text-gray-200">
        Preço:{" "}
        <span className="font-extrabold text-[#22c55e]">
          {formatCurrency(Number(item?.preco || 0))}
        </span>
      </p>

      <p className="font-medium text-gray-700 dark:text-gray-200">
        Postos:{" "}
        <span className="font-extrabold text-[#22c55e]">
          {Number(item?.postos || 0).toLocaleString("pt-BR")}
        </span>
      </p>
    </div>
  );
}

function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-white px-4 py-3 text-sm shadow-xl dark:bg-[#10233a]">
      <p className="mb-2 font-bold text-[#2563eb]">{label}</p>

      <p className="font-medium text-gray-700 dark:text-gray-200">
        Preço:{" "}
        <span className="font-extrabold text-[#ff6b3a]">
          {formatCurrency(Number(payload[0].value))}
        </span>
      </p>
    </div>
  );
}
