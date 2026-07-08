"use client";

import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

import { yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import CustomLegend from "../features/CustomLegend";

const ScatterChart = ({
  data,
  title,
  xKey,
  yKey,
  zKey,
  xLabel,
  yLabel,
  colors = [],
  series,
  tooltipEntry,
}: any) => {
  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const point = payload[0].payload;
    const color = payload[0].fill;
    return (
      <div className="bg-white dark:bg-[#11273D] p-4 rounded-lg shadow-md max-w-[220px] text-sm border-l-4 border-blue-600">
        <h4 className="font-bold text-blue-600 mb-3 text-[13px] leading-5">
          {point.produto ?? tooltipEntry}
        </h4>
        <div className="flex flex-col gap-2">
          {xLabel && (
            <p className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 font-medium">{xLabel}:</span>
              <span style={{ color }} className="font-bold">
                {point[xKey] != null
                  ? `R$ ${point[xKey].toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`
                  : "—"}
              </span>
            </p>
          )}
          {yLabel && (
            <p className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 font-medium">{yLabel}:</span>
              <span style={{ color }} className="font-bold">
                {point[yKey] != null ? point[yKey].toLocaleString("pt-BR") : "—"}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-white w-full h-full dark:bg-[#0C1B2B]">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center font-semibold w-[90%] text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <RechartsScatterChart margin={{ top: 10, right: 30, left: 30, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color, #e5e7eb)" />
          <XAxis
            dataKey={xKey}
            type="number"
            name={xLabel}
            tickFormatter={yAxisFormatter}
            tick={{ fontSize: 12, fill: "var(--yaxis-tick-color)" }}
            label={{
              value: xLabel,
              position: "insideBottom",
              offset: -20,
              fontSize: 12,
              fill: "var(--yaxis-tick-color)",
            }}
          />
          <YAxis
            dataKey={yKey}
            type="number"
            name={yLabel}
            tickFormatter={yAxisFormatter}
            tick={{ fontSize: 11, fill: "var(--yaxis-tick-color)" }}
            width={60}
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              offset: -10,
              fontSize: 12,
              fill: "var(--yaxis-tick-color)",
            }}
          />
          <ZAxis range={zKey ? [40, 400] : [90, 90]} dataKey={zKey} />
          <Tooltip content={<CustomScatterTooltip />} />
          <Legend
            verticalAlign="top"
            align="center"
            content={({ payload }) => <CustomLegend payload={payload} />}
            iconSize={20}
          />
          {series
            ? series.map((s: any, i: number) => (
                <Scatter key={i} name={s.name} data={s.data} fill={colors[i] || "#EC6625"} />
              ))
            : <Scatter name={tooltipEntry || "Dados"} data={data} fill={colors[0] || "#EC6625"} />}
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChart;
