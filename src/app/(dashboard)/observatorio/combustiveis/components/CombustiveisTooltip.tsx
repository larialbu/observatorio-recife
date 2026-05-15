"use client";

type TooltipPayloadItem = {
  name?: string;
  value?: number | string;
  dataKey?: string;
  color?: string;
  payload?: Record<string, unknown>;
};

type TooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
};

const AZUL = "#2563eb";
const LARANJA = "#f26522";
const AZUL_ESCURO = "#0057a8";

export function formatarNumeroTooltip(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "--";
  }

  return number.toLocaleString("pt-BR");
}

export function formatarMoedaTooltip(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "--";
  }

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarPrecoTooltip(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "--";
  }

  return number.toFixed(2).replace(".", ",");
}

function normalizarLabel(value: unknown) {
  const text = String(value ?? "").trim();

  if (!text) {
    return "--";
  }

  return text;
}

function TooltipBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-[150px] rounded-md border-l-4 border-blue-600 bg-white px-5 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.18)]">
      <p className="mb-3 text-xl font-black leading-none text-blue-600">
        {title}
      </p>

      <div className="space-y-2 text-sm font-semibold text-slate-500">
        {children}
      </div>
    </div>
  );
}

export function TooltipLinhaCombustiveis({
  active,
  payload,
  label,
}: TooltipProps) {
  if (!active || !payload?.length) return null;

  const validPayload = payload.filter(
    (item) => item.value !== undefined && item.value !== null && item.value !== ""
  );

  if (validPayload.length === 0) return null;

  return (
    <TooltipBox title={normalizarLabel(label)}>
      {validPayload.map((item, index) => (
        <div key={`${item.name}-${index}`} className="flex items-baseline justify-between gap-4">
          <span>{item.name || "Preço"}:</span>
          <span
            className="font-black"
            style={{ color: item.color || AZUL_ESCURO }}
          >
            {formatarPrecoTooltip(item.value)}
          </span>
        </div>
      ))}
    </TooltipBox>
  );
}

export function TooltipBarraCombustiveis({
  active,
  payload,
  label,
}: TooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  if (!item) return null;

  return (
    <TooltipBox title={normalizarLabel(label)}>
      <div>
        <p>Preço:</p>
        <p className="mt-1 text-sm font-black text-orange-600">
          {formatarPrecoTooltip(item.value)}
        </p>
      </div>
    </TooltipBox>
  );
}

export function TooltipBarraComPostosCombustiveis({
  active,
  payload,
  label,
}: TooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const postos = item?.payload?.postos;

  if (!item) return null;

  return (
    <TooltipBox title={normalizarLabel(label)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Preço:</p>
          <p className="mt-1 text-sm font-black text-orange-600">
            {formatarPrecoTooltip(item.value)}
          </p>
        </div>

        <div>
          <p>Postos:</p>
          <p className="mt-1 text-sm font-black text-blue-700">
            {formatarNumeroTooltip(postos)}
          </p>
        </div>
      </div>
    </TooltipBox>
  );
}

export function TooltipColunaCombustiveis({
  active,
  payload,
  label,
}: TooltipProps) {
  if (!active || !payload?.length) return null;

  const validPayload = payload.filter(
    (item) => item.value !== undefined && item.value !== null && item.value !== ""
  );

  if (validPayload.length === 0) return null;

  return (
    <TooltipBox title={normalizarLabel(label).toUpperCase()}>
      <div className="grid grid-cols-2 gap-5">
        {validPayload.map((item, index) => (
          <div key={`${item.name}-${index}`}>
            <p>{item.name || "Valor"}:</p>
            <p
              className="mt-1 text-sm font-black"
              style={{ color: item.color || (index === 0 ? LARANJA : AZUL_ESCURO) }}
            >
              {formatarPrecoTooltip(item.value)}
            </p>
          </div>
        ))}
      </div>
    </TooltipBox>
  );
}

export function TooltipDispersaoCombustiveis({
  active,
  payload,
}: TooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0]?.payload || {};
  const title =
    data.regiao ||
    data.estado ||
    data.municipio ||
    data.nome ||
    data.periodo ||
    "Dados";

  return (
    <TooltipBox title={normalizarLabel(title)}>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p>Preço médio:</p>
          <p className="mt-1 text-sm font-black text-orange-600">
            {formatarPrecoTooltip(data.preco ?? data.valor)}
          </p>
        </div>

        <div>
          <p>Postos:</p>
          <p className="mt-1 text-sm font-black text-blue-700">
            {formatarNumeroTooltip(data.postos)}
          </p>
        </div>
      </div>
    </TooltipBox>
  );
}
